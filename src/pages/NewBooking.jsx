import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, Sparkles, BedDouble, User } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';

export const NewBooking = () => {
  const navigate = useNavigate();
  const { rooms, handleCreateBooking } = useHotel();

  const [form, setForm] = useState({
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
    paymentMethod: 'Credit Card (Visa)',
    specialRequest: 'Corner room with unobstructed sunset views.',
    addOnAirportTransfer: true,
    addOnChampagne: false,
    addOnSpa: true,
  });

  const availableRooms = rooms.filter(r => r.status === 'Available');

  const onRoomSelect = (room) => {
    setForm(prev => ({
      ...prev,
      roomNo: room.roomNo,
      roomType: room.type,
      totalAmount: room.price * prev.nights + (prev.addOnAirportTransfer ? 3500 : 0) + (prev.addOnSpa ? 4500 : 0),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.guestName.trim() || !form.roomNo) return;
    const created = await handleCreateBooking(form);
    if (created) navigate('/front-office/reservations');
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Breadcrumb & Title */}
      <div className="pb-4 border-b border-[#ECE8E1]">
        <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
          <span>Front Office</span>
          <span>/</span>
          <span className="text-[#C9A36A] font-semibold">New Booking</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
          Create Luxury Reservation
        </h2>
        <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
          Select preferred suite, enter guest identity details, and finalize folio charges
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Guest Information */}
          <Card>
            <h3 className="text-base font-serif font-bold text-[#18233F] mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#C9A36A]" /> 1. Guest Identification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sir Alistair Campbell"
                  value={form.guestName}
                  onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 20 7946 0912"
                  value={form.guestPhone}
                  onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="guest@luxurytravel.org"
                  value={form.guestEmail}
                  onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A]"
                />
              </div>
            </div>
          </Card>

          {/* 2. Room Selection */}
          <Card>
            <h3 className="text-base font-serif font-bold text-[#18233F] mb-4 flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#C9A36A]" /> 2. Available Room Selection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {availableRooms.map((r) => (
                <div
                  key={r.roomNo}
                  onClick={() => onRoomSelect(r)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.roomNo === r.roomNo
                      ? 'border-[#C9A36A] bg-[#FAF5EC] shadow-sm'
                      : 'border-[#ECE8E1] bg-white hover:border-[#C9A36A]/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-[#18233F]">Room #{r.roomNo}</span>
                    <span className="text-xs font-bold text-[#A37E45]">₹{r.price}/night</span>
                  </div>
                  <p className="text-xs text-[#7B7D85]">{r.type}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#ECE8E1]">
              <div>
                <label className="block text-xs font-semibold text-[#18233F] mb-1">Check-in</label>
                <input
                  type="text"
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#18233F] mb-1">Check-out</label>
                <input
                  type="text"
                  value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#18233F] mb-1">Nights</label>
                <input
                  type="number"
                  min="1"
                  value={form.nights}
                  onChange={(e) => setForm({ ...form, nights: Number(e.target.value) })}
                  className="w-full p-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl"
                />
              </div>
            </div>
          </Card>

          {/* 3. Luxury Add-ons & Requests */}
          <Card>
            <h3 className="text-base font-serif font-bold text-[#18233F] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A36A]" /> 3. Luxury Concierge Add-Ons
            </h3>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.addOnAirportTransfer}
                  onChange={(e) => setForm({ ...form, addOnAirportTransfer: e.target.checked })}
                  className="w-4 h-4 text-[#C9A36A] rounded"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#18233F]">Airport Mercedes Limousine Chauffeur</p>
                  <p className="text-[11px] text-[#7B7D85]">Airport transfer with private chilled towels & bottled water</p>
                </div>
                <span className="text-xs font-bold text-[#A37E45]">+₹3,500</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.addOnSpa}
                  onChange={(e) => setForm({ ...form, addOnSpa: e.target.checked })}
                  className="w-4 h-4 text-[#C9A36A] rounded"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#18233F]">Ayurvedic Herbal Couple Spa Voucher</p>
                  <p className="text-[11px] text-[#7B7D85]">60-minute therapeutic massage at Royal Pavilion</p>
                </div>
                <span className="text-xs font-bold text-[#A37E45]">+₹4,500</span>
              </label>
            </div>
          </Card>
        </div>

        {/* Right Col: Bill Summary Card & Submit */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <h3 className="text-base font-serif font-bold text-[#18233F] pb-3 border-b border-[#ECE8E1] mb-4">
              Booking Folio Estimate
            </h3>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between text-[#7B7D85]">
                <span>Room No.</span>
                <strong className="text-[#18233F]">#{form.roomNo}</strong>
              </div>
              <div className="flex justify-between text-[#7B7D85]">
                <span>Room Tier</span>
                <span className="text-[#18233F] font-medium">{form.roomType}</span>
              </div>
              <div className="flex justify-between text-[#7B7D85]">
                <span>Stay Duration</span>
                <span>{form.nights} Nights ({form.checkIn} - {form.checkOut})</span>
              </div>
              {form.addOnAirportTransfer && (
                <div className="flex justify-between text-[#7B7D85]">
                  <span>Limousine Transfer</span>
                  <span>₹3,500</span>
                </div>
              )}
              {form.addOnSpa && (
                <div className="flex justify-between text-[#7B7D85]">
                  <span>Couples Spa Package</span>
                  <span>₹4,500</span>
                </div>
              )}
              <div className="pt-3 border-t border-[#ECE8E1] flex justify-between text-base font-bold text-[#18233F]">
                <span>Grand Total</span>
                <span className="text-[#A37E45] font-serif text-lg">
                  ₹{form.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              icon={CalendarPlus}
            >
              Complete Reservation
            </Button>
            <p className="text-[11px] text-center text-[#7B7D85] mt-2.5">
              Room will be immediately blocked in hotel inventory.
            </p>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default NewBooking;
