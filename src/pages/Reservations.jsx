import React from 'react';
import { CalendarPlus, Printer, Sparkles, BedDouble, Calendar } from 'lucide-react';
import CurrentBookings from '../components/dashboard/CurrentBookings';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useHotel } from '../context/HotelContext';

export const Reservations = () => {
  const { setActiveModal, bookings } = useHotel();

  const total = bookings.length;
  const inHouse = bookings.filter(b => b.status === 'Checked In').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const arriving = bookings.filter(b => b.status === 'Arriving').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Front Office</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Reservations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Guest Reservations Master Ledger
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Manage incoming guest itineraries, channel bookings, and room blockings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => window.print()}
            icon={Printer}
          >
            Print Reservations
          </Button>
          <Button
            variant="primary"
            onClick={() => setActiveModal('newBooking')}
            icon={CalendarPlus}
          >
            New Reservation
          </Button>
        </div>
      </div>

      {/* Mini metric counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] border border-[#E5D0AB] flex items-center justify-center text-[#C9A36A]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#7B7D85]">Total Bookings</span>
            <p className="text-xl font-bold font-serif text-[#18233F]">{total}</p>
          </div>
        </Card>

        <Card padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <BedDouble className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#7B7D85]">In-House Guests</span>
            <p className="text-xl font-bold font-serif text-emerald-600">{inHouse}</p>
          </div>
        </Card>

        <Card padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#7B7D85]">Confirmed</span>
            <p className="text-xl font-bold font-serif text-[#18233F]">{confirmed}</p>
          </div>
        </Card>

        <Card padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <CalendarPlus className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#7B7D85]">Arriving Today</span>
            <p className="text-xl font-bold font-serif text-blue-600">{arriving}</p>
          </div>
        </Card>
      </div>

      {/* Full Bookings Table */}
      <CurrentBookings />
    </div>
  );
};

export default Reservations;
