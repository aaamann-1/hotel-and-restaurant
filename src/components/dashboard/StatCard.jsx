import React from 'react';
import { BedDouble, CalendarCheck, IndianRupee, Users, TrendingUp } from 'lucide-react';
import Card from '../common/Card';

export const StatCards = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* Card 1 — Total Rooms */}
      <Card hoverEffect className="relative flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider font-sans">
              Total Rooms
            </span>
            <div className="w-10 h-10 rounded-full bg-[#FAF5EC] border border-[#E5D0AB]/60 flex items-center justify-center text-[#C9A36A] shadow-sm">
              <BedDouble className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-3xl font-serif font-bold text-[#18233F]">
              {kpis.totalRooms.value}
            </h3>
            <span className="text-xs font-medium text-[#7B7D85]">
              rooms total
            </span>
          </div>

          {/* Sub metrics */}
          <div className="flex items-center justify-between text-xs text-[#7B7D85] mb-3">
            <span>Occupied: <strong className="text-[#18233F] font-semibold">{kpis.totalRooms.occupied}</strong></span>
            <span>Available: <strong className="text-emerald-600 font-semibold">{kpis.totalRooms.available}</strong></span>
          </div>
        </div>

        {/* Gold Progress Bar */}
        <div className="pt-2 border-t border-[#ECE8E1]/80">
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
            <span className="text-[#7B7D85]">Occupancy Rate</span>
            <span className="text-[#A37E45] font-semibold">{kpis.totalRooms.occupancyRate}%</span>
          </div>
          <div className="w-full bg-[#FAF5EC] h-2 rounded-full overflow-hidden border border-[#E5D0AB]/30">
            <div
              className="bg-gradient-to-r from-[#C9A36A] to-[#DFBE82] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${kpis.totalRooms.occupancyRate}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Card 2 — Today's Bookings */}
      <Card hoverEffect className="relative flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider font-sans">
              Today's Bookings
            </span>
            <div className="w-10 h-10 rounded-full bg-[#FAF5EC] border border-[#E5D0AB]/60 flex items-center justify-center text-[#C9A36A] shadow-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2.5 mb-2">
            <h3 className="text-3xl font-serif font-bold text-[#18233F]">
              {kpis.todayBookings.value}
            </h3>
            {/* Green trend indicator */}
            {kpis.todayBookings.trend && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                {kpis.todayBookings.trend}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-[#7B7D85]">
            <span>Check-ins: <strong className="text-[#18233F] font-semibold">{kpis.todayBookings.checkIns}</strong></span>
            <span>Check-outs: <strong className="text-[#18233F] font-semibold">{kpis.todayBookings.checkOuts}</strong></span>
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-[#ECE8E1]/80 text-[11px] text-[#7B7D85]">
          Counts from today's booking records
        </div>
      </Card>

      {/* Card 3 — Today's Revenue */}
      <Card hoverEffect className="relative flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider font-sans">
              Today's Revenue
            </span>
            <div className="w-10 h-10 rounded-full bg-[#FAF5EC] border border-[#E5D0AB]/60 flex items-center justify-center text-[#C9A36A] shadow-sm">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
              {kpis.todayRevenue.value}
            </h3>
            {kpis.todayRevenue.trend && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                {kpis.todayRevenue.trend}
              </span>
            )}
          </div>

          <p className="text-xs text-[#7B7D85] mb-2 font-sans">
            {kpis.todayRevenue.subtitle}
          </p>
        </div>

        <div className="pt-2 border-t border-[#ECE8E1]/80 text-[11px] text-[#7B7D85]">
          Sum of recorded income transactions
        </div>
      </Card>

      {/* Card 4 — Total Guests */}
      <Card hoverEffect className="relative flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider font-sans">
              Total Guests
            </span>
            <div className="w-10 h-10 rounded-full bg-[#FAF5EC] border border-[#E5D0AB]/60 flex items-center justify-center text-[#C9A36A] shadow-sm">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2.5 mb-2">
            <h3 className="text-3xl font-serif font-bold text-[#18233F]">
              {kpis.totalGuests.value}
            </h3>
            {kpis.totalGuests.trend && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                {kpis.totalGuests.trend}
              </span>
            )}
          </div>

          <p className="text-xs text-[#7B7D85] mb-2 font-sans">
            {kpis.totalGuests.subtitle}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-[#ECE8E1]/80 text-[11px] text-[#7B7D85]">
          Sum of guests on checked-in reservations
        </div>
      </Card>
    </div>
  );
};

export default StatCards;
