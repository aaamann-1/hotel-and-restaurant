import React from 'react';
import {
  Calendar,
  BedDouble,
  CreditCard,
  Mail,
  Phone,
  User,
  Sparkles,
  Printer,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import { useHotel } from '../../context/HotelContext';

export const BookingDetailModal = () => {
  const {
    activeModal,
    setActiveModal,
    selectedBooking,
    handleCheckIn,
    handleCheckOut,
    showToast,
  } = useHotel();

  if (activeModal !== 'bookingDetail' || !selectedBooking) return null;

  const b = selectedBooking;

  return (
    <Modal
      isOpen={activeModal === 'bookingDetail'}
      onClose={() => setActiveModal(null)}
      title={`Reservation Folio #${b.id}`}
      subtitle={`Created on ${b.createdAt || '20 Apr 2025'} via ${b.bookingSource || 'Direct Reservation'}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Guest Profile Summary Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FAF8F5] rounded-xl border border-[#ECE8E1] gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={b.avatar}
              alt={b.guestName}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#E5D0AB] shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-lg text-[#18233F]">
                  {b.guestName}
                </h4>
                <StatusBadge status={b.status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7B7D85] mt-1 font-sans">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#C9A36A]" /> {b.guestEmail}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#C9A36A]" /> {b.guestPhone}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-[#ECE8E1] sm:pl-4">
            <span className="text-[10px] uppercase font-bold text-[#7B7D85] tracking-wider">
              Room Number
            </span>
            <p className="text-2xl font-serif font-bold text-[#18233F]">
              #{b.roomNo}
            </p>
            <span className="text-xs text-[#A37E45] font-semibold">{b.roomType}</span>
          </div>
        </div>

        {/* Itinerary Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white rounded-xl border border-[#ECE8E1]">
            <span className="text-[11px] text-[#7B7D85] flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#C9A36A]" /> Check-In
            </span>
            <p className="font-semibold text-sm text-[#18233F] mt-1">{b.checkIn}</p>
            <span className="text-[10px] text-[#7B7D85]">Standard 2:00 PM</span>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-[#ECE8E1]">
            <span className="text-[11px] text-[#7B7D85] flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#C9A36A]" /> Check-Out
            </span>
            <p className="font-semibold text-sm text-[#18233F] mt-1">{b.checkOut}</p>
            <span className="text-[10px] text-[#7B7D85]">Standard 11:00 AM</span>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-[#ECE8E1]">
            <span className="text-[11px] text-[#7B7D85] flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#C9A36A]" /> Duration
            </span>
            <p className="font-semibold text-sm text-[#18233F] mt-1">
              {b.nights || 2} Nights • {b.guests || 2} Guests
            </p>
            <span className="text-[10px] text-emerald-600 font-medium">Breakfast Included</span>
          </div>
        </div>

        {/* Special Requests */}
        <div className="p-3.5 bg-[#FAF5EC]/60 rounded-xl border border-[#E5D0AB]/60">
          <span className="text-xs font-semibold text-[#A37E45] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A36A]" /> Concierge & Guest Special Notes
          </span>
          <p className="text-xs text-[#18233F] leading-relaxed">
            {b.specialRequest || 'No special dietary or setup requests recorded for this booking.'}
          </p>
        </div>

        {/* Financial Billing Breakdown */}
        <div className="border border-[#ECE8E1] rounded-xl overflow-hidden">
          <div className="bg-[#FAF8F5] px-4 py-2.5 border-b border-[#ECE8E1] flex justify-between items-center">
            <span className="text-xs font-bold text-[#18233F] flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#C9A36A]" /> Financial Summary
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {b.paymentStatus || 'Paid'}
            </span>
          </div>
          <div className="p-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#7B7D85]">
              <span>Base Room Tariff ({b.nights || 2} Nights)</span>
              <span>₹{((b.totalAmount || 18400) * 0.82).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between text-[#7B7D85]">
              <span>Luxury Hospitality GST (18%)</span>
              <span>₹{((b.totalAmount || 18400) * 0.18).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="pt-2 border-t border-[#ECE8E1] flex justify-between font-bold text-sm text-[#18233F]">
              <span>Total Folio Amount</span>
              <span className="text-[#A37E45]">₹{(b.totalAmount || 18400).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-[#7B7D85]">
              <span>Payment Mode</span>
              <span className="font-medium text-[#18233F]">{b.paymentMethod || 'Credit Card'}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#ECE8E1]">
          <button
            onClick={() => showToast(`Invoice #${b.id} sent to reception thermal printer.`, 'info')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#18233F] border border-[#ECE8E1] rounded-xl hover:bg-[#FAF8F5] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#7B7D85]" />
            Print Guest Folio
          </button>

          <div className="flex items-center gap-2">
            {b.status !== 'Checked In' && b.status !== 'Checked Out' && (
              <Button
                variant="primary"
                onClick={() => handleCheckIn(b.id)}
                icon={CheckCircle2}
              >
                Perform Check-in
              </Button>
            )}

            {b.status === 'Checked In' && (
              <Button
                variant="secondary"
                onClick={() => handleCheckOut(b.id)}
              >
                Perform Check-out
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => setActiveModal(null)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingDetailModal;
