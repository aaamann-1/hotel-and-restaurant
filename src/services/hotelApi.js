const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || `Request failed (${response.status})`);
  }

  return response.status === 204 ? null : response.json();
}

const json = (method, body) => ({ method, body: JSON.stringify(body) });

export const hotelApi = {
  getHealth: () => request('/health'),

  getBookings(search = '', status = '') {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status && status !== 'All') params.set('status', status);
    return request(`/bookings${params.size ? `?${params}` : ''}`);
  },
  getBooking: (id) => request(`/bookings/${encodeURIComponent(id)}`),
  createBooking: (booking) => request('/bookings', json('POST', booking)),
  checkInGuest: (id) => request(`/bookings/${encodeURIComponent(id)}/checkin`, { method: 'PUT' }),
  checkOutGuest: (id) => request(`/bookings/${encodeURIComponent(id)}/checkout`, { method: 'PUT' }),
  deleteBooking: (id) => request(`/bookings/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  getRooms(floor = 0, status = '') {
    const params = new URLSearchParams();
    if (floor > 0) params.set('floor', floor);
    if (status && status !== 'All') params.set('status', status);
    return request(`/rooms${params.size ? `?${params}` : ''}`);
  },
  getRoomTypes: () => request('/rooms/types'),
  updateHousekeeping: (roomNo, status) =>
    request(`/rooms/${encodeURIComponent(roomNo)}/housekeeping`, json('PUT', { status })),

  getDashboardStats: () => request('/dashboard/stats'),
  getOccupancy: (range = 'last7Days') => request(`/dashboard/occupancy?range=${encodeURIComponent(range)}`),
  getRoomDistribution: () => request('/dashboard/room-distribution'),

  getRestaurantMenu: (category = '') => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    return request(`/restaurant/menu${params.size ? `?${params}` : ''}`);
  },
  settleRestaurantBill: (tableName, totalAmount, paymentMethod = 'Credit Card', items = []) =>
    request('/restaurant/settle', json('POST', { tableName, totalAmount, paymentMethod, items })),

  getStaff: (department = '', status = '') => {
    const params = new URLSearchParams();
    if (department && department !== 'All') params.set('department', department);
    if (status && status !== 'All') params.set('status', status);
    return request(`/staff${params.size ? `?${params}` : ''}`);
  },
  createStaff: (staff) => request('/staff', json('POST', staff)),
  updateStaffStatus: (id, status) =>
    request(`/staff/${encodeURIComponent(id)}/status`, json('PUT', { status })),

  getInventory: (category = '') => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    return request(`/inventory${params.size ? `?${params}` : ''}`);
  },
  updateInventoryStock: (id, inStock) =>
    request(`/inventory/${encodeURIComponent(id)}/stock`, json('PUT', { inStock })),

  getTourismPackages: () => request('/tourism/packages'),
  getTourismBookings: () => request('/tourism/bookings'),
  createTourismBooking: (booking) => request('/tourism/bookings', json('POST', booking)),
  updateTourismBookingStatus: (id, status) =>
    request(`/tourism/bookings/${encodeURIComponent(id)}/status`, json('PUT', { status })),

  getAccountsSummary: () => request('/accounts/summary'),
  createTransaction: (transaction) => request('/accounts/transaction', json('POST', transaction)),

  getSettings: () => request('/settings'),
  saveSettings: (settings) => request('/settings', json('PUT', settings)),
};

export default hotelApi;
