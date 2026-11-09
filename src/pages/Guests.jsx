import React, { useState } from 'react';
import { Search, Mail, Phone } from 'lucide-react';
import Card from '../components/common/Card';
import { useHotel } from '../context/HotelContext';

export const Guests = () => {
  const { bookings, viewBookingDetails } = useHotel();
  const [searchTerm, setSearchTerm] = useState('');

  const guestMap = bookings.reduce((guests, booking) => {
    const key = (booking.guestEmail || booking.guestName).toLowerCase();
    const guest = guests.get(key) || {
      id: booking.id,
      name: booking.guestName,
      email: booking.guestEmail || '—',
      phone: booking.guestPhone || '—',
      avatar: booking.avatar || '/images/luxury-suite.jpg',
      tier: 'Guest',
      stays: 0,
      spend: 0,
      currentRoom: '—',
      notes: 'No guest preferences recorded.',
      latestBooking: booking,
    };
    guest.stays += 1;
    guest.spend += Number(booking.totalAmount) || 0;
    if (booking.status === 'Checked In') guest.currentRoom = booking.roomNo;
    if (booking.specialRequest) guest.notes = booking.specialRequest;
    guests.set(key, guest);
    return guests;
  }, new Map());
  const guestsList = [...guestMap.values()].map(guest => ({
    ...guest,
    totalSpend: `₹${guest.spend.toLocaleString('en-IN')}`,
  }));

  const filteredGuests = guestsList.filter(g =>
    !searchTerm ||
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Hospitality</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Guests Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Guest Relationship & VIP Directory
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Guest profiles and stay history derived from saved reservations
          </p>
        </div>

        <div className="w-full sm:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7B7D85] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guests by name or loyalty..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl outline-none focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A]"
            />
          </div>
        </div>
      </div>

      {/* Guest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuests.map((guest) => (
          <Card key={guest.id} hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={guest.avatar}
                    alt={guest.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#E5D0AB] shadow-sm"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#18233F]">
                      {guest.name}
                    </h4>
                    <span className="text-xs text-[#7B7D85]">{guest.id}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5EC] text-[#A37E45] border border-[#E5D0AB]">
                  {guest.tier}
                </span>
              </div>

              {/* Guest Details */}
              <div className="space-y-2 text-xs text-[#7B7D85] mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C9A36A]" />
                  <span className="text-[#18233F]">{guest.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C9A36A]" />
                  <span className="text-[#18233F]">{guest.phone}</span>
                </div>
              </div>

              {/* Stats pill */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE8E1] text-center text-xs mb-3">
                <div>
                  <span className="text-[10px] text-[#7B7D85]">Stays</span>
                  <p className="font-bold text-[#18233F]">{guest.stays}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7B7D85]">Total Spend</span>
                  <p className="font-bold text-[#A37E45]">{guest.totalSpend}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#7B7D85]">Current Room</span>
                  <p className="font-bold text-emerald-600">#{guest.currentRoom}</p>
                </div>
              </div>

              {/* Concierge Notes */}
              <p className="text-[11px] text-[#7B7D85] bg-[#FAF5EC]/40 p-2 rounded-lg border border-[#E5D0AB]/40 italic">
                "{guest.notes}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#ECE8E1] mt-4 flex items-center justify-between">
              <button
                onClick={() => viewBookingDetails(guest.latestBooking)}
                className="text-xs text-[#C9A36A] hover:underline font-semibold"
              >
                View Stay History
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Guests;
