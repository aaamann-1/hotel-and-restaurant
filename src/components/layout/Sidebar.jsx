import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ConciergeBell,
  BedDouble,
  Users,
  UtensilsCrossed,
  Boxes,
  Receipt,
  Compass,
  UserCog,
  FileBarChart2,
  Settings,
  ChevronDown,
  X,
  Sparkles,
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const navigationItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    name: 'Front Office',
    icon: ConciergeBell,
    path: '/front-office',
    subItems: [
      { name: 'Reservations', path: '/front-office/reservations' },
      { name: 'New Booking', path: '/front-office/new-booking' },
      { name: 'Check-in Desk', path: '/front-office/check-in' },
      { name: 'Check-out Desk', path: '/front-office/check-out' },
    ],
  },
  {
    name: 'Rooms',
    icon: BedDouble,
    path: '/rooms',
    subItems: [
      { name: 'All Rooms', path: '/rooms' },
      { name: 'Room Types', path: '/rooms/room-types' },
      { name: 'Housekeeping', path: '/housekeeping' },
    ],
  },
  {
    name: 'Guests',
    icon: Users,
    path: '/guests',
  },
  {
    name: 'Restaurant & POS',
    icon: UtensilsCrossed,
    path: '/restaurant',
    subItems: [
      { name: 'POS Terminal', path: '/restaurant/pos' },
      { name: 'Menu & Orders', path: '/restaurant' },
    ],
  },
  {
    name: 'Inventory',
    icon: Boxes,
    path: '/inventory',
  },
  {
    name: 'Accounts',
    icon: Receipt,
    path: '/accounts',
  },
  {
    name: 'Tourism',
    icon: Compass,
    path: '/tourism',
    subItems: [
      { name: 'Luxury Packages', path: '/tourism/packages' },
      { name: 'Tour Bookings', path: '/tourism/bookings' },
    ],
  },
  {
    name: 'Staff & Admin',
    icon: UserCog,
    path: '/staff',
  },
  {
    name: 'Reports',
    icon: FileBarChart2,
    path: '/reports',
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useHotel();
  
  // Track open submenu states
  const [openGroups, setOpenGroups] = useState({
    'Front Office': location.pathname.startsWith('/front-office'),
    'Rooms': location.pathname.startsWith('/rooms') || location.pathname.startsWith('/housekeeping'),
    'Restaurant & POS': location.pathname.startsWith('/restaurant'),
    'Tourism': location.pathname.startsWith('/tourism'),
  });

  const toggleGroup = (name) => {
    setOpenGroups(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isItemActive = (item) => {
    if (item.path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    if (item.subItems) {
      return item.subItems.some(sub => location.pathname === sub.path) || location.pathname.startsWith(item.path);
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[246px] bg-[#202123] text-[#C8CCD0] flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#2C2D30] lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Logo & Brand */}
        <div className="flex-shrink-0">
          <div className="h-20 px-5 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              {/* Luxury Lotus Emblem */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5D0AB] via-[#C9A36A] to-[#997339] p-[1.5px] shadow-md shadow-[#C9A36A]/20 flex-shrink-0">
                <div className="w-full h-full bg-[#202123] rounded-[10px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9A36A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 drop-shadow-[0_0_8px_rgba(201,163,106,0.6)]"
                  >
                    {/* Stylized Lotus Petals */}
                    <path d="M12 2.5C12 2.5 8.5 7 8.5 11.5C8.5 13.5 10 15 12 15C14 15 15.5 13.5 15.5 11.5C15.5 7 12 2.5 12 2.5Z" fill="#C9A36A" fillOpacity="0.25" />
                    <path d="M5 8.5C5 8.5 4 12 5.5 14C7 16 9.5 16 11 15" />
                    <path d="M19 8.5C19 8.5 20 12 18.5 14C17 16 14.5 16 13 15" />
                    <path d="M7 16.5C4 17.5 2.5 20 2.5 20C4.5 20.5 8.5 20 11.5 18" />
                    <path d="M17 16.5C20 17.5 21.5 20 21.5 20C19.5 20.5 15.5 20 12.5 18" />
                    <circle cx="12" cy="18" r="1.5" fill="#C9A36A" />
                  </svg>
                </div>
              </div>

              <div>
                <h1 className="font-serif tracking-[0.16em] text-white font-bold text-[15px] leading-tight">
                  ROYAL STAY
                </h1>
                <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-[#C9A36A] font-semibold mt-0.5">
                  HOTEL MANAGEMENT SYSTEM
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center: Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 sidebar-scrollbar space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);
            const hasSub = !!item.subItems;
            const isExpanded = openGroups[item.name];

            if (hasSub) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.name)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all group ${
                      active
                        ? 'text-white bg-white/[0.08]'
                        : 'text-[#C8CCD0] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-[18px] h-[18px] transition-colors ${
                          active ? 'text-[#C9A36A]' : 'text-[#8E9297] group-hover:text-white'
                        }`}
                      />
                      <span className="font-sans">{item.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8E9297] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#C9A36A]' : ''
                      }`}
                    />
                  </button>

                  {/* Submenu */}
                  {isExpanded && (
                    <div className="pl-9 pr-1 py-1 space-y-1 border-l border-white/[0.08] ml-5">
                      {item.subItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setMobileSidebarOpen(false)}
                            className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isSubActive
                                ? 'bg-[#C9A36A] text-[#18233F] font-semibold shadow-sm'
                                : 'text-[#8E9297] hover:text-white hover:bg-white/[0.04]'
                            }`}
                          >
                            {sub.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all group ${
                    isActive
                      ? 'bg-[#C9A36A] text-[#18233F] font-semibold shadow-md shadow-[#C9A36A]/20'
                      : 'text-[#C8CCD0] hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors ${
                        isActive ? 'text-[#18233F]' : 'text-[#8E9297] group-hover:text-white'
                      }`}
                    />
                    <span className="font-sans">{item.name}</span>
                    {item.name === 'Front Office' && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9A36A]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom: Luxury Hotel Image & Footer */}
        <div className="flex-shrink-0 p-3 pt-1 border-t border-white/[0.08] bg-[#1B1C1E]">
          {/* Hotel Photo Card */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 group mb-2.5">
            <img
              src="/images/sidebar-hotel.jpg"
              alt="Royal Stay Heritage Grand"
              className="w-full h-24 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=350';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-black/40 to-transparent flex flex-col justify-end p-2.5">
              <span className="text-[10px] font-serif text-[#E5D0AB] font-semibold tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#C9A36A]" />
                ROYAL STAY PALACE
              </span>
              <p className="text-[9px] text-white/70 font-sans truncate">
                5-Star Heritage Sanctuary
              </p>
            </div>
          </div>

          <div className="px-1 flex items-center justify-between text-[11px] text-[#8E9297]">
            <span className="italic font-serif text-[#C9A36A]/90 text-[10.5px]">
              Better Stays. Happier Guests.
            </span>
            <span className="font-mono text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded text-white/60">
              v1.0.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
