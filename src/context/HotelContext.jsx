import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { notificationsList as initialNotifications } from '../data/dashboardData';
import hotelApi from '../services/hotelApi';

const HotelContext = createContext(null);

export const HotelProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [staff, setStaff] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [tourismPackages, setTourismPackages] = useState([]);
  const [tourismBookings, setTourismBookings] = useState([]);
  const [accounts, setAccounts] = useState({
    monthlyRevenue: '₹0',
    monthlyExpenses: '₹0',
    netProfit: '₹0',
    profitMargin: '0%',
    recentTransactions: [],
  });
  const [dashboardStats, setDashboardStats] = useState({
    totalRooms: { value: 0, occupied: 0, available: 0, occupancyRate: 0 },
    todayBookings: { value: 0, checkIns: 0, checkOuts: 0, trend: '' },
    todayRevenue: { value: '₹0', subtitle: 'Recorded income today', trend: '' },
    totalGuests: { value: 0, subtitle: 'In-house guests', trend: '' },
  });
  const [occupancyData, setOccupancyData] = useState([]);
  const [roomDistribution, setRoomDistribution] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chartRange, setChartRange] = useState('last7Days');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  const refreshBookings = async () => {
    const data = await hotelApi.getBookings();
    setBookings(data);
    return data;
  };

  const refreshRooms = async () => {
    const data = await hotelApi.getRooms();
    setRooms(data);
    return data;
  };

  const refreshInventory = async () => {
    const data = await hotelApi.getInventory();
    setInventory(data);
    return data;
  };

  const refreshAccounts = async () => {
    const data = await hotelApi.getAccountsSummary();
    setAccounts(data);
    return data;
  };

  const refreshDashboard = async () => {
    const data = await hotelApi.getDashboardStats();
    setDashboardStats(data);
    return data;
  };

  const refreshOccupancy = async (range = chartRange) => {
    const data = await hotelApi.getOccupancy(range);
    setOccupancyData(data);
    return data;
  };

  const refreshAfterMutation = async (label, refreshers) => {
    const results = await Promise.allSettled(refreshers);
    const failed = results.some(result => result.status === 'rejected');
    if (failed) {
      results.forEach(result => {
        if (result.status === 'rejected') console.error(`${label} saved, but refreshing data failed:`, result.reason);
      });
    }
    return !failed;
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      const requests = [
        ['bookings', hotelApi.getBookings()],
        ['rooms', hotelApi.getRooms()],
        ['dashboard', hotelApi.getDashboardStats()],
        ['occupancy', hotelApi.getOccupancy()],
        ['room distribution', hotelApi.getRoomDistribution()],
        ['menu', hotelApi.getRestaurantMenu()],
        ['staff', hotelApi.getStaff()],
        ['inventory', hotelApi.getInventory()],
        ['tourism packages', hotelApi.getTourismPackages()],
        ['tourism bookings', hotelApi.getTourismBookings()],
        ['accounts', hotelApi.getAccountsSummary()],
        ['room types', hotelApi.getRoomTypes()],
      ];
      const results = await Promise.allSettled(requests.map(([, request]) => request));
      if (!active) return;

      const setters = [
        setBookings, setRooms, setDashboardStats, setOccupancyData, setRoomDistribution,
        setMenuItems, setStaff, setInventory, setTourismPackages, setTourismBookings, setAccounts,
        setRoomTypes,
      ];
      const failures = [];
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          setters[index](result.value);
        } else {
          failures.push(requests[index][0]);
          console.error(`Failed to load ${requests[index][0]} from the API:`, result.reason);
        }
      });
      setBackendConnected(results.every(result => result.status === 'fulfilled'));
      setApiLoading(false);
      if (failures.length) {
        showToast(`Could not load: ${failures.join(', ')}. Check the backend and try again.`, 'error');
      }
    };
    load();
    return () => { active = false; };
  }, [showToast]);

  const kpis = useMemo(() => ({
    ...dashboardStats,
    totalRooms: {
      ...dashboardStats.totalRooms,
      available: dashboardStats.totalRooms.available ?? 0,
    },
  }), [dashboardStats]);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter(n => n.unread).length,
    [notifications]
  );

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleCheckIn = async (bookingId) => {
    try {
      await hotelApi.checkInGuest(bookingId);
      const booking = bookings.find(item => item.id === bookingId);
      const refreshed = await refreshAfterMutation('Check-in', [refreshBookings(), refreshRooms(), refreshDashboard()]);
      if (booking) showToast(
        refreshed
          ? `Guest ${booking.guestName} checked into Room ${booking.roomNo}.`
          : `Check-in saved for ${booking.guestName}, but some dashboard data could not refresh.`,
        refreshed ? 'success' : 'info'
      );
      setActiveModal(null);
      return true;
    } catch (error) {
      showToast(`Check-in failed: ${error.message}`, 'error');
      return false;
    }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      const booking = bookings.find(item => item.id === bookingId);
      await hotelApi.checkOutGuest(bookingId);
      const refreshed = await refreshAfterMutation('Check-out', [refreshBookings(), refreshRooms(), refreshDashboard()]);
      if (booking) showToast(
        refreshed
          ? `Guest ${booking.guestName} checked out. Room ${booking.roomNo} is marked dirty.`
          : `Check-out saved for ${booking.guestName}, but some dashboard data could not refresh.`,
        refreshed ? 'info' : 'error'
      );
      setActiveModal(null);
      return true;
    } catch (error) {
      showToast(`Check-out failed: ${error.message}`, 'error');
      return false;
    }
  };

  const handleCreateBooking = async (newBookingData) => {
    try {
      const booking = await hotelApi.createBooking({
        ...newBookingData,
        status: 'Confirmed',
        paymentStatus: Number(newBookingData.paidAmount) >= Number(newBookingData.totalAmount) ? 'Paid' : 'Partial',
        bookingSource: 'Front Desk Direct',
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
      setBookings(prev => [booking, ...prev]);
      const refreshed = await refreshAfterMutation('Booking', [refreshRooms(), refreshDashboard()]);
      showToast(
        refreshed
          ? `Reservation ${booking.id} confirmed for ${booking.guestName}.`
          : `Reservation ${booking.id} was saved, but some dashboard data could not refresh.`,
        refreshed ? 'success' : 'error'
      );
      setActiveModal(null);
      return true;
    } catch (error) {
      showToast(`Booking could not be saved: ${error.message}`, 'error');
      return false;
    }
  };

  const updateHousekeeping = async (roomNo, status) => {
    try {
      const updated = await hotelApi.updateHousekeeping(roomNo, status);
      setRooms(prev => prev.map(room => room.roomNo === roomNo ? updated : room));
      showToast(`Room ${roomNo} housekeeping status changed to ${status}.`, 'success');
      return true;
    } catch (error) {
      showToast(`Housekeeping update failed: ${error.message}`, 'error');
      return false;
    }
  };

  const updateInventoryStock = async (id, inStock) => {
    try {
      const updated = await hotelApi.updateInventoryStock(id, inStock);
      setInventory(prev => prev.map(item => item.id === id ? updated : item));
      showToast(`Stock for ${updated.name} was updated.`, 'success');
      return true;
    } catch (error) {
      showToast(`Inventory update failed: ${error.message}`, 'error');
      return false;
    }
  };

  const addStaff = async (staffMember) => {
    try {
      const created = await hotelApi.createStaff(staffMember);
      setStaff(prev => [...prev, created]);
      showToast(`${created.name} was added to staff.`, 'success');
      return true;
    } catch (error) {
      showToast(`Staff could not be added: ${error.message}`, 'error');
      return false;
    }
  };

  const updateStaffStatus = async (id, status) => {
    try {
      const updated = await hotelApi.updateStaffStatus(id, status);
      setStaff(prev => prev.map(member => member.id === id ? updated : member));
      showToast(`${updated.name} is now ${updated.status}.`, 'success');
      return true;
    } catch (error) {
      showToast(`Staff status update failed: ${error.message}`, 'error');
      return false;
    }
  };

  const settleRestaurantBill = async (tableName, totalAmount, paymentMethod, items) => {
    try {
      const result = await hotelApi.settleRestaurantBill(tableName, totalAmount, paymentMethod, items);
      const refreshed = await refreshAfterMutation('Restaurant settlement', [refreshAccounts(), refreshDashboard()]);
      showToast(
        refreshed ? result.message : `${result.message} Some dashboard data could not refresh.`,
        refreshed ? 'success' : 'warning'
      );
      return true;
    } catch (error) {
      showToast(`Bill settlement failed: ${error.message}`, 'error');
      return false;
    }
  };

  const createTourismBooking = async (booking) => {
    try {
      const created = await hotelApi.createTourismBooking(booking);
      setTourismBookings(prev => [created, ...prev]);
      showToast(`Tour booking ${created.id} was created.`, 'success');
      return true;
    } catch (error) {
      showToast(`Tour booking failed: ${error.message}`, 'error');
      return false;
    }
  };

  const updateTourismBookingStatus = async (id, status) => {
    try {
      const updated = await hotelApi.updateTourismBookingStatus(id, status);
      setTourismBookings(prev => prev.map(booking => booking.id === id ? updated : booking));
      showToast(`Tour booking ${id} status changed to ${status}.`, 'success');
      return true;
    } catch (error) {
      showToast(`Tour booking update failed: ${error.message}`, 'error');
      return false;
    }
  };

  const createTransaction = async (transaction) => {
    try {
      await hotelApi.createTransaction(transaction);
      const refreshed = await refreshAfterMutation('Transaction', [refreshAccounts(), refreshDashboard()]);
      showToast(
        refreshed ? 'Transaction saved to the financial ledger.' : 'Transaction saved, but some dashboard data could not refresh.',
        refreshed ? 'success' : 'warning'
      );
      return true;
    } catch (error) {
      showToast(`Transaction could not be saved: ${error.message}`, 'error');
      return false;
    }
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setActiveModal('bookingDetail');
  };

  return (
    <HotelContext.Provider
      value={{
        bookings, setBookings, rooms, setRooms, staff, setStaff, inventory, menuItems,
        tourismPackages, tourismBookings, accounts, dashboardStats, occupancyData, roomTypes,
        roomDistribution, kpis, notifications, unreadNotificationsCount,
        markAllNotificationsRead, selectedBooking, setSelectedBooking, activeModal,
        setActiveModal, searchQuery, setSearchQuery, chartRange, setChartRange,
        mobileSidebarOpen, setMobileSidebarOpen, toast, showToast, handleCheckIn,
        handleCheckOut, handleCreateBooking, updateHousekeeping, updateInventoryStock,
        addStaff, updateStaffStatus, settleRestaurantBill, createTourismBooking, updateTourismBookingStatus,
        createTransaction, refreshBookings, refreshRooms, refreshInventory, refreshAccounts,
        refreshDashboard, refreshOccupancy,
        viewBookingDetails, backendConnected, apiLoading,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
