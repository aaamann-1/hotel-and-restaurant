import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HotelProvider } from './context/HotelContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import NewBooking from './pages/NewBooking';
import CheckInDesk from './pages/CheckInDesk';
import CheckOutDesk from './pages/CheckOutDesk';
import Rooms from './pages/Rooms';
import RoomTypes from './pages/RoomTypes';
import Housekeeping from './pages/Housekeeping';
import Guests from './pages/Guests';
import RestaurantMenu from './pages/RestaurantMenu';
import RestaurantPOS from './pages/RestaurantPOS';
import Inventory from './pages/Inventory';
import Accounts from './pages/Accounts';
import Tourism from './pages/Tourism';
import TourismBookings from './pages/TourismBookings';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export function App() {
  return (
    <HotelProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Front Office Routes */}
            <Route path="/front-office" element={<Navigate to="/front-office/reservations" replace />} />
            <Route path="/front-office/reservations" element={<Reservations />} />
            <Route path="/front-office/new-booking" element={<NewBooking />} />
            <Route path="/front-office/check-in" element={<CheckInDesk />} />
            <Route path="/front-office/check-out" element={<CheckOutDesk />} />

            {/* Room Management */}
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/room-types" element={<RoomTypes />} />
            <Route path="/housekeeping" element={<Housekeeping />} />

            {/* Guests */}
            <Route path="/guests" element={<Guests />} />

            {/* Restaurant & Dining */}
            <Route path="/restaurant" element={<RestaurantMenu />} />
            <Route path="/restaurant/pos" element={<RestaurantPOS />} />

            {/* Operations & Finance */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/accounts" element={<Accounts />} />

            {/* Tourism */}
            <Route path="/tourism" element={<Navigate to="/tourism/packages" replace />} />
            <Route path="/tourism/packages" element={<Tourism />} />
            <Route path="/tourism/bookings" element={<TourismBookings />} />

            {/* Administration */}
            <Route path="/staff" element={<Staff />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fallback to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HotelProvider>
  );
}

export default App;
