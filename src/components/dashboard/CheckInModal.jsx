import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import { useHotel } from '../../context/HotelContext';
import { LogIn, LogOut, CheckCircle2, UserCheck, Search } from 'lucide-react';

export const CheckInModal = () => {
  const { activeModal, setActiveModal, bookings, handleCheckIn, handleCheckOut } = useHotel();
  const [filterQuery, setFilterQuery] = useState('');

  if (activeModal !== 'checkIn' && activeModal !== 'checkOut') return null;

  const isCheckInMode = activeModal === 'checkIn';

  const relevantBookings = bookings.filter((b) => {
    const isTarget = isCheckInMode
      ? b.status === 'Confirmed' || b.status === 'Arriving'
      : b.status === 'Checked In';

    const matchesQuery =
      !filterQuery ||
      b.guestName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.roomNo.toLowerCase().includes(filterQuery.toLowerCase());

    return isTarget && matchesQuery;
  });

  return (
    <Modal
      isOpen={activeModal === 'checkIn' || activeModal === 'checkOut'}
      onClose={() => setActiveModal(null)}
      title={isCheckInMode ? 'Quick Guest Check-in Desk' : 'Guest Departure & Check-out'}
      subtitle={
        isCheckInMode
          ? 'Verify arrivals, assign digital keycards, and activate guest room'
          : 'Settle final room ledger, collect keycards, and release room to housekeeping'
      }
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Search within arrivals / departures */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#7B7D85] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={isCheckInMode ? 'Filter arriving guests by name or room...' : 'Filter checked-in guests...'}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A]"
          />
        </div>

        {/* List of relevant guests */}
        <div className="max-h-80 overflow-y-auto divide-y divide-[#ECE8E1] border border-[#ECE8E1] rounded-xl bg-white">
          {relevantBookings.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#7B7D85]">
              {isCheckInMode
                ? 'No pending arrivals at this moment. All scheduled guests are checked in!'
                : 'No in-house guests ready for check-out matching your search.'}
            </div>
          ) : (
            relevantBookings.map((b) => (
              <div
                key={b.id}
                className="p-3.5 flex items-center justify-between hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={b.avatar}
                    alt={b.guestName}
                    className="w-10 h-10 rounded-full object-cover border border-[#ECE8E1]"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120';
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#18233F]">{b.guestName}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-[11px] text-[#7B7D85] mt-0.5">
                      Room <strong className="text-[#18233F]">#{b.roomNo}</strong> ({b.roomType}) • Folio #{b.id}
                    </p>
                    <span className="text-[10px] text-[#A37E45] font-medium">
                      Dates: {b.checkIn} - {b.checkOut}
                    </span>
                  </div>
                </div>

                <div>
                  {isCheckInMode ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleCheckIn(b.id)}
                      icon={LogIn}
                    >
                      Check In Now
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleCheckOut(b.id)}
                      icon={LogOut}
                    >
                      Check Out & Clear
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-[#ECE8E1]">
          <Button variant="outline" onClick={() => setActiveModal(null)}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckInModal;
