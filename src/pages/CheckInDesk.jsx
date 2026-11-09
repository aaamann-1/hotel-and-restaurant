import React, { useState } from 'react';
import { LogIn, CheckCircle2, Search, Sparkles, Key, Bell, ShieldCheck } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { useHotel } from '../context/HotelContext';

export const CheckInDesk = () => {
  const { bookings, handleCheckIn, viewBookingDetails } = useHotel();
  const [searchTerm, setSearchTerm] = useState('');

  const arrivingBookings = bookings.filter((b) => {
    const isTarget = b.status === 'Confirmed' || b.status === 'Arriving';
    const matches =
      !searchTerm ||
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.roomNo.includes(searchTerm);
    return isTarget && matches;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-[#ECE8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Front Office</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Check-in Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Guest Arrival & Key Issuance Desk
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Verify guest credentials, confirm payment methods, and issue RFID smart keys
          </p>
        </div>

        <div className="w-full sm:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7B7D85] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by guest name, room, ID..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl outline-none focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Pending Arrivals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arrivingBookings.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-[#ECE8E1] p-8">
            <CheckCircle2 className="w-12 h-12 text-[#15966A] mx-auto mb-3" />
            <h4 className="text-base font-serif font-bold text-[#18233F]">All Today's Guests Checked In!</h4>
            <p className="text-xs text-[#7B7D85] mt-1">There are no pending check-ins remaining in the queue.</p>
          </div>
        ) : (
          arrivingBookings.map((b) => (
            <Card key={b.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.avatar}
                      alt={b.guestName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#E5D0AB]"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120';
                      }}
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#18233F]">{b.guestName}</h4>
                      <p className="text-xs text-[#7B7D85]">{b.id}</p>
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE8E1] space-y-1.5 text-xs text-[#7B7D85] mb-4">
                  <div className="flex justify-between">
                    <span>Assigned Room:</span>
                    <strong className="text-[#18233F] font-mono text-sm">Room #{b.roomNo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="text-[#A37E45] font-semibold">{b.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stay Period:</span>
                    <span className="text-[#18233F]">{b.checkIn} – {b.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Request:</span>
                    <span className="text-[#18233F] truncate max-w-[150px]">{b.specialRequest || 'None'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between gap-2">
                <button
                  onClick={() => viewBookingDetails(b)}
                  className="text-xs text-[#7B7D85] hover:text-[#18233F] font-semibold underline"
                >
                  View Folio
                </button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleCheckIn(b.id)}
                  icon={Key}
                >
                  Issue Key & Check In
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckInDesk;
