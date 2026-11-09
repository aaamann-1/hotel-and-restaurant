import React from 'react';
import {
  CalendarPlus,
  LogIn,
  LogOut,
  ReceiptText,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import Card from '../common/Card';
import { useHotel } from '../../context/HotelContext';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const { setActiveModal } = useHotel();
  const navigate = useNavigate();

  const actions = [
    {
      id: 'booking',
      title: 'New Booking',
      desc: 'Reserve luxury suites',
      icon: CalendarPlus,
      onClick: () => setActiveModal('newBooking'),
    },
    {
      id: 'checkin',
      title: 'Check-in',
      desc: 'Guest arrival & keys',
      icon: LogIn,
      onClick: () => setActiveModal('checkIn'),
    },
    {
      id: 'checkout',
      title: 'Check-out',
      desc: 'Folio billing & departure',
      icon: LogOut,
      onClick: () => setActiveModal('checkOut'),
    },
    {
      id: 'pos',
      title: 'POS Billing',
      desc: 'F&B & dining terminal',
      icon: ReceiptText,
      onClick: () => navigate('/restaurant/pos'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Premium Promotional Card: Upgrade Your Guest Experience */}
      <div className="relative rounded-2xl overflow-hidden border border-[#ECE8E1] shadow-luxury group bg-white">
        {/* Luxury Hotel Suite Image */}
        <div className="h-44 sm:h-48 w-full overflow-hidden relative">
          <img
            src="/images/luxury-suite.jpg"
            alt="Presidential Suite Experience"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18233F]/90 via-[#18233F]/50 to-transparent flex flex-col justify-end p-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C9A36A] text-[#18233F] text-[10px] font-bold uppercase tracking-wider mb-2 w-fit shadow-sm">
              <Sparkles className="w-3 h-3" />
              ROYAL PRIVILEGE
            </span>
            <h4 className="text-lg font-serif font-bold text-white tracking-wide">
              Upgrade Your Guest Experience
            </h4>
            <p className="text-xs text-slate-200 mt-1 font-sans line-clamp-2">
              Manage rooms, dining, and services — all in one place.
            </p>
            <div className="mt-3">
              <button
                onClick={() => navigate('/rooms/room-types')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5D0AB] hover:text-white transition-colors group/link"
              >
                <span>Explore More</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Action Buttons */}
      <Card className="p-4 sm:p-5">
        <div className="mb-3.5 pb-2.5 border-b border-[#ECE8E1] flex items-center justify-between">
          <h4 className="text-sm font-serif font-bold text-[#18233F]">
            Quick Actions
          </h4>
          <span className="text-[11px] text-[#7B7D85]">Fast Desk Execution</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                type="button"
                onClick={act.onClick}
                className="flex flex-col items-start p-3 rounded-xl border border-[#ECE8E1] hover:border-[#C9A36A] bg-white hover:bg-[#FAF8F5] transition-all text-left group shadow-sm hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF5EC] border border-[#E5D0AB]/60 flex items-center justify-center text-[#C9A36A] group-hover:bg-[#C9A36A] group-hover:text-white transition-colors mb-2.5 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#18233F] group-hover:text-[#C9A36A] transition-colors">
                  {act.title}
                </span>
                <span className="text-[10px] text-[#7B7D85] mt-0.5 font-sans line-clamp-1">
                  {act.desc}
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default QuickActions;
