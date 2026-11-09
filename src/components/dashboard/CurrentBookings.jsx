import React, { useState, useMemo } from 'react';
import {
  Eye,
  MoreVertical,
  LogIn,
  LogOut,
  FileText,
  Mail,
  Filter,
} from 'lucide-react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { useHotel } from '../../context/HotelContext';

export const CurrentBookings = () => {
  const {
    bookings,
    searchQuery,
    viewBookingDetails,
    handleCheckIn,
    handleCheckOut,
    showToast,
  } = useHotel();

  const [statusFilter, setStatusFilter] = useState('All');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Filter bookings based on active tab and global search query
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === 'All' || booking.status.toLowerCase() === statusFilter.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        booking.id.toLowerCase().includes(q) ||
        booking.guestName.toLowerCase().includes(q) ||
        booking.roomNo.toLowerCase().includes(q) ||
        booking.roomType.toLowerCase().includes(q) ||
        booking.status.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, statusFilter, searchQuery]);

  const toggleRowMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <Card className="p-0 overflow-hidden" id="current-bookings-section">
      {/* Table Header and Filter Tabs */}
      <div className="p-4 sm:p-6 border-b border-[#ECE8E1] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-serif font-bold text-[#18233F]">
              Current Bookings
            </h3>
            <span className="text-xs bg-[#FAF5EC] text-[#A37E45] font-semibold px-2.5 py-0.5 rounded-full border border-[#E5D0AB]">
              {filteredBookings.length} Active
            </span>
          </div>
          <p className="text-xs text-[#7B7D85] mt-1 font-sans">
            Comprehensive overview of current room allocations and guest itineraries
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-xl border border-[#ECE8E1]">
          {['All', 'Checked In', 'Confirmed', 'Arriving', 'Checked Out'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === tab
                  ? 'bg-white text-[#18233F] shadow-sm border border-[#ECE8E1]'
                  : 'text-[#7B7D85] hover:text-[#18233F]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Horizontal Scroll Container */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse text-xs sm:text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-[#FAF8F5] text-[#7B7D85] uppercase tracking-wider text-[11px] font-semibold border-b border-[#ECE8E1]">
              <th className="py-3 px-5">Booking ID</th>
              <th className="py-3 px-5">Guest Name</th>
              <th className="py-3 px-4">Room No.</th>
              <th className="py-3 px-4">Check-in</th>
              <th className="py-3 px-4">Check-out</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECE8E1]/80">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-[#7B7D85]">
                  <p className="text-sm font-medium">No bookings match the current filter.</p>
                  <p className="text-xs text-slate-400 mt-1">Try resetting the search query or status filter.</p>
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-[#FAF8F5]/80 transition-colors group cursor-pointer"
                  onClick={() => viewBookingDetails(b)}
                >
                  {/* Booking ID */}
                  <td className="py-3.5 px-5 font-mono font-semibold text-[#18233F] text-xs">
                    <span className="group-hover:text-[#C9A36A] transition-colors">
                      {b.id}
                    </span>
                  </td>

                  {/* Guest Name */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={b.avatar}
                        alt={b.guestName}
                        className="w-8 h-8 rounded-full object-cover border border-[#ECE8E1] flex-shrink-0"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120';
                        }}
                      />
                      <div>
                        <p className="font-semibold text-[#18233F] text-xs sm:text-sm leading-tight">
                          {b.guestName}
                        </p>
                        <p className="text-[11px] text-[#7B7D85] font-sans">
                          {b.roomType}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Room No. */}
                  <td className="py-3.5 px-4 font-semibold text-[#18233F]">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] border border-[#ECE8E1] font-mono text-xs text-[#18233F]">
                      {b.roomNo}
                    </span>
                  </td>

                  {/* Check-in */}
                  <td className="py-3.5 px-4 text-[#18233F] text-xs">
                    {b.checkIn}
                  </td>

                  {/* Check-out */}
                  <td className="py-3.5 px-4 text-[#18233F] text-xs">
                    {b.checkOut}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={b.status} />
                  </td>

                  {/* Actions */}
                  <td
                    className="py-3.5 px-5 text-right relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {/* View Details Eye Icon */}
                      <button
                        type="button"
                        onClick={() => viewBookingDetails(b)}
                        className="p-1.5 text-[#7B7D85] hover:text-[#C9A36A] hover:bg-[#FAF5EC] rounded-lg transition-colors"
                        title="View Full Booking Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Three-Dot Menu Button */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => toggleRowMenu(b.id, e)}
                          className="p-1.5 text-[#7B7D85] hover:text-[#18233F] hover:bg-[#F8F6F2] rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuId === b.id && (
                          <div className="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-xl border border-[#ECE8E1] py-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-150">
                            <button
                              type="button"
                              onClick={() => {
                                viewBookingDetails(b);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#18233F] hover:bg-[#FAF8F5] flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#C9A36A]" />
                              <span>View Itinerary</span>
                            </button>

                            {b.status !== 'Checked In' && b.status !== 'Checked Out' && (
                              <button
                                type="button"
                                onClick={() => {
                                  handleCheckIn(b.id);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 font-medium"
                              >
                                <LogIn className="w-3.5 h-3.5" />
                                <span>Check-in Guest</span>
                              </button>
                            )}

                            {b.status === 'Checked In' && (
                              <button
                                type="button"
                                onClick={() => {
                                  handleCheckOut(b.id);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-xs text-amber-700 hover:bg-amber-50 flex items-center gap-2 font-medium"
                              >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Check-out Guest</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                showToast(`Folio invoice for ${b.guestName} sent to printer.`, 'info');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#18233F] hover:bg-[#FAF8F5] flex items-center gap-2"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#7B7D85]" />
                              <span>Print Invoice</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                showToast(`Concierge message dispatched to ${b.guestEmail}.`, 'success');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#18233F] hover:bg-[#FAF8F5] flex items-center gap-2"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#7B7D85]" />
                              <span>Email Guest</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination / Footer */}
      <div className="p-3 sm:px-6 border-t border-[#ECE8E1] bg-[#FAF8F5] flex items-center justify-between text-xs text-[#7B7D85]">
        <span>
          Showing <strong className="text-[#18233F]">{filteredBookings.length}</strong> of{' '}
          <strong className="text-[#18233F]">{bookings.length}</strong> total bookings
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="px-3 py-1 rounded-lg border border-[#ECE8E1] bg-white text-gray-400 cursor-not-allowed text-xs"
          >
            Previous
          </button>
          <span className="px-2.5 py-0.5 rounded-lg bg-[#C9A36A] text-white font-semibold text-xs shadow-sm">
            1
          </span>
          <button
            disabled
            className="px-3 py-1 rounded-lg border border-[#ECE8E1] bg-white text-gray-400 cursor-not-allowed text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CurrentBookings;
