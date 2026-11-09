import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Menu,
  ChevronDown,
  User,
  ShieldCheck,
  LogOut,
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import SearchInput from '../common/SearchInput';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    notifications,
    unreadNotificationsCount,
    markAllNotificationsRead,
    setMobileSidebarOpen,
    setActiveModal,
  } = useHotel();

  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-[#ECE8E1] px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left: Mobile hamburger & Wide Search Field */}
      <div className="flex items-center gap-3 sm:gap-6 flex-1 max-w-2xl">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden p-2 text-[#18233F] hover:bg-black/5 rounded-xl transition-colors"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Wide Search Bar */}
        <div className="w-full max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search anything (guests, rooms, bookings)..."
            className="w-full"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications, Separator, Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Node.js Express & PostgreSQL Connection Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border bg-emerald-50/80 text-emerald-800 border-emerald-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-sans font-semibold">Node.js Express • PostgreSQL</span>
        </div>

        {/* Quick New Booking Shortcut button for desktop */}
        <button
          onClick={() => setActiveModal('newBooking')}
          className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF5EC] text-[#A37E45] border border-[#E5D0AB] hover:bg-[#C9A36A] hover:text-white transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Reserve</span>
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-[#18233F] hover:bg-[#F8F6F2] transition-colors border border-transparent hover:border-[#ECE8E1]"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-[#7B7D85]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#ECE8E1] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-4 pb-2.5 border-b border-[#ECE8E1]">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-sm text-[#18233F]">
                    Hotel Notifications
                  </h4>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">
                      {unreadNotificationsCount} new
                    </span>
                  )}
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-[#C9A36A] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#ECE8E1]/60">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3.5 hover:bg-[#FAF8F5] transition-colors text-left flex gap-3 ${
                      notif.unread ? 'bg-[#FAF5EC]/30' : ''
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-[#C9A36A]" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#18233F] flex items-center justify-between">
                        {notif.title}
                        <span className="text-[10px] text-[#7B7D85] font-normal font-sans">
                          {notif.time}
                        </span>
                      </p>
                      <p className="text-[11px] text-[#7B7D85] mt-0.5 leading-relaxed font-sans">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 px-4 border-t border-[#ECE8E1] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/reports');
                  }}
                  className="text-xs text-[#C9A36A] hover:text-[#B89258] font-semibold"
                >
                  View All Operations Logs
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vertical separator */}
        <div className="h-7 w-[1px] bg-[#ECE8E1]" />

        {/* Admin Profile Area */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-[#F8F6F2] transition-colors"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160"
                alt="Rahul Sharma"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#E5D0AB] shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-[#18233F] leading-tight">
                Rahul Sharma
              </p>
              <p className="text-[11px] text-[#C9A36A] font-semibold tracking-wider uppercase font-sans">
                Admin
              </p>
            </div>

            <ChevronDown className="w-4 h-4 text-[#7B7D85] hidden sm:block transition-transform duration-200" />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#ECE8E1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-[#ECE8E1] bg-[#FAF8F5]">
                <p className="text-xs font-semibold text-[#18233F]">
                  Rahul Sharma
                </p>
                <p className="text-[11px] text-[#7B7D85]">
                  rahul.gm@royalstay.com
                </p>
                <span className="inline-block mt-1 text-[10px] font-semibold uppercase bg-[#E5D0AB]/40 text-[#A37E45] px-2 py-0.5 rounded">
                  Super Admin • Shift Active
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#18233F] hover:bg-[#F8F6F2] flex items-center gap-2.5"
                >
                  <User className="w-3.5 h-3.5 text-[#7B7D85]" />
                  <span>Admin Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#18233F] hover:bg-[#F8F6F2] flex items-center gap-2.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#7B7D85]" />
                  <span>Property Configurations</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/reports');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#18233F] hover:bg-[#F8F6F2] flex items-center gap-2.5"
                >
                  <Clock className="w-3.5 h-3.5 text-[#7B7D85]" />
                  <span>Shift Handover Log</span>
                </button>
              </div>

              <div className="pt-1 border-t border-[#ECE8E1]">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/login');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
