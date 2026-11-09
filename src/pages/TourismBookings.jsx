import React from 'react';
import { Compass } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';
import { useNavigate } from 'react-router-dom';

export const TourismBookings = () => {
  const { tourismBookings: tourBookings, updateTourismBookingStatus } = useHotel();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Tourism & Concierge</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Excursion Bookings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Guest Tour Itineraries & Charters
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Active concierge reservations, luxury yacht dispatch schedules, and flight manifests
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/tourism/packages')}
          icon={Compass}
        >
          View All Packages
        </Button>
      </div>

      {/* Bookings Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#7B7D85] uppercase tracking-wider text-[11px] font-semibold border-b border-[#ECE8E1]">
                <th className="py-3.5 px-6">Tour Ref</th>
                <th className="py-3.5 px-6">Guest Name</th>
                <th className="py-3.5 px-6">Room</th>
                <th className="py-3.5 px-6">Package Experience</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Participants</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]/80">
              {tourBookings.map(tb => (
                <tr key={tb.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#18233F]">{tb.id}</td>
                  <td className="py-4 px-6 font-semibold text-[#18233F]">{tb.guest}</td>
                  <td className="py-4 px-6 font-mono text-[#7B7D85]">#{tb.room}</td>
                  <td className="py-4 px-6 font-medium text-[#18233F] max-w-[220px] truncate">{tb.package}</td>
                  <td className="py-4 px-6 text-[#7B7D85]">{tb.date}</td>
                  <td className="py-4 px-6 text-[#7B7D85]">{tb.participants} Persons</td>
                  <td className="py-4 px-6 font-serif font-bold text-sm text-[#A37E45]">
                    ₹{tb.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        tb.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : tb.status === 'Completed'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {tb.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => updateTourismBookingStatus(tb.id, 'Dispatched')}
                      className="text-xs text-[#C9A36A] hover:underline font-semibold"
                    >
                      {tb.status === 'Dispatched' ? 'Dispatched' : 'Dispatch Chauffeur'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TourismBookings;
