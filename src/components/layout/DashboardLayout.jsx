import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useHotel } from '../../context/HotelContext';
import BookingDetailModal from '../dashboard/BookingDetailModal';
import NewBookingModal from '../dashboard/NewBookingModal';
import CheckInModal from '../dashboard/CheckInModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const DashboardLayout = () => {
  const { toast } = useHotel();

  return (
    <div className="min-h-screen bg-[#F8F6F2] font-sans antialiased text-[#18233F]">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-[246px] flex flex-col min-h-screen transition-all duration-300">
        {/* Top Header */}
        <Header />

        {/* Page Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Interactive Modals */}
      <BookingDetailModal />
      <NewBookingModal />
      <CheckInModal />

      {/* Luxury Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#18233F] text-white rounded-xl shadow-2xl border border-[#C9A36A]/40 animate-in slide-in-from-bottom-5 duration-300">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#15966A] flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#C9A36A] flex-shrink-0" />}
          <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
