import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useHotel } from '../../context/HotelContext';
import { CalendarPlus, Sparkles } from 'lucide-react';

export const NewBookingModal = () => {
  const { activeModal, setActiveModal, rooms, handleCreateBooking } = useHotel();

  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    roomNo: '103',
    roomType: 'Deluxe Ocean View',
    checkIn: '25 Apr 2025',
    checkOut: '28 Apr 2025',
    nights: 3,
    guests: 2,
    totalAmount: 27600,
    paidAmount: 27600,
    paymentMethod: 'Credit Card (Visa/Mastercard)',
    specialRequest: '',
  });

  if (activeModal !== 'newBooking') return null;

  const availableRooms = rooms.filter(r => r.status === 'Available');

  const handleRoomChange = (e) => {
    const rNo = e.target.value;
    const room = rooms.find(r => r.roomNo === rNo);
    if (room) {
      const nights = Number(formData.nights) || 1;
      setFormData(prev => ({
        ...prev,
        roomNo: rNo,
        roomType: room.type,
        totalAmount: room.price * nights,
        paidAmount: room.price * nights,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;
    handleCreateBooking(formData);
  };

  return (
    <Modal
      isOpen={activeModal === 'newBooking'}
      onClose={() => setActiveModal(null)}
      title="Create New Luxury Reservation"
      subtitle="Front Desk reservation folio creation with automatic inventory lock"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Guest Information */}
        <div>
          <h4 className="text-xs font-bold text-[#A37E45] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A36A]" /> Primary Guest Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#18233F] mb-1">
                Guest Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="e.g. Maharani Gayatri Devi"
                className="w-full px-3.5 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#18233F] mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.guestPhone}
                onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#18233F] mb-1">
                Guest Email Address
              </label>
              <input
                type="email"
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                placeholder="guest@royalstay.com"
                className="w-full px-3.5 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Room Selection & Dates */}
        <div className="pt-2 border-t border-[#ECE8E1]">
          <h4 className="text-xs font-bold text-[#A37E45] uppercase tracking-wider mb-2">
            Room Selection & Dates
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#18233F] mb-1">
                Available Room
              </label>
              <select
                value={formData.roomNo}
                onChange={handleRoomChange}
                className="w-full px-3 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              >
                {availableRooms.map((r) => (
                  <option key={r.roomNo} value={r.roomNo}>
                    Room {r.roomNo} — {r.type} (₹{r.price}/nt)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#18233F] mb-1">
                Check-in Date
              </label>
              <input
                type="text"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#18233F] mb-1">
                Check-out Date
              </label>
              <input
                type="text"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Special Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#ECE8E1]">
          <div>
            <label className="block text-xs font-medium text-[#18233F] mb-1">
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
            >
              <option value="Credit Card (Visa/Mastercard)">Credit Card (Visa/Mastercard)</option>
              <option value="Credit Card (Amex)">Credit Card (Amex)</option>
              <option value="UPI / QR Payment">UPI / QR Payment</option>
              <option value="Cash at Front Desk">Cash at Front Desk</option>
              <option value="Direct Bank Wire">Direct Bank Wire</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#18233F] mb-1">
              Calculated Total (₹)
            </label>
            <input
              type="number"
              value={formData.totalAmount}
              onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs bg-[#FAF5EC] border border-[#E5D0AB] rounded-xl font-bold text-[#A37E45] outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#18233F] mb-1">
              Special Requests or Dietary Requirements
            </label>
            <textarea
              rows={2}
              value={formData.specialRequest}
              onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
              placeholder="e.g. Quiet floor, early arrival around 11 AM, floral arrangement in suite..."
              className="w-full px-3 py-2 text-xs bg-white border border-[#ECE8E1] rounded-xl focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none resize-none"
            />
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ECE8E1]">
          <Button variant="outline" onClick={() => setActiveModal(null)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={CalendarPlus}>
            Confirm Reservation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewBookingModal;
