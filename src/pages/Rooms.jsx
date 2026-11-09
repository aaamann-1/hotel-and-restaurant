import React, { useState } from 'react';
import { BedDouble, Sparkles, Filter, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { useHotel } from '../context/HotelContext';

export const Rooms = () => {
  const { rooms } = useHotel();
  const [filterFloor, setFilterFloor] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = rooms.filter((r) => {
    const floorMatch = filterFloor === 'All' || r.floor.toString() === filterFloor;
    const statusMatch = filterStatus === 'All' || r.status.toLowerCase() === filterStatus.toLowerCase();
    return floorMatch && statusMatch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Rooms</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">All Rooms Grid</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Hotel Room Inventory Grid
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Real-time status of all 48 rooms across floors 1 to 4
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Floor selector */}
          <div className="flex items-center bg-white border border-[#ECE8E1] rounded-xl p-1 text-xs">
            <span className="px-2 text-[#7B7D85] font-semibold">Floor:</span>
            {['All', '1', '2', '3', '4'].map((fl) => (
              <button
                key={fl}
                onClick={() => setFilterFloor(fl)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterFloor === fl ? 'bg-[#C9A36A] text-white shadow-sm' : 'text-[#7B7D85] hover:text-[#18233F]'
                }`}
              >
                {fl === 'All' ? 'All' : `F${fl}`}
              </button>
            ))}
          </div>

          {/* Status selector */}
          <div className="flex items-center bg-white border border-[#ECE8E1] rounded-xl p-1 text-xs">
            {['All', 'Available', 'Occupied', 'Reserved'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterStatus === st ? 'bg-[#18233F] text-white shadow-sm' : 'text-[#7B7D85] hover:text-[#18233F]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((room) => (
          <Card key={room.roomNo} hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-serif font-bold text-[#18233F]">
                    #{room.roomNo}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-[#7B7D85] bg-[#FAF8F5] border border-[#ECE8E1] px-1.5 py-0.5 rounded">
                    Floor {room.floor}
                  </span>
                </div>
                <StatusBadge status={room.status} />
              </div>

              <p className="text-xs font-semibold text-[#A37E45] mb-1 font-serif">
                {room.type}
              </p>

              <p className="text-base font-bold text-[#18233F] mb-3">
                ₹{room.price.toLocaleString('en-IN')}{' '}
                <span className="text-[11px] font-normal text-[#7B7D85]">/night</span>
              </p>

              {/* Guest / Housekeeping details */}
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE8E1] text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#7B7D85]">Guest:</span>
                  <strong className="text-[#18233F] truncate max-w-[120px]">
                    {room.guest || 'None (Vacant)'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7B7D85]">Housekeeping:</span>
                  <span
                    className={`font-semibold ${
                      room.housekeeping === 'Clean'
                        ? 'text-emerald-700'
                        : room.housekeeping === 'Dirty'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {room.housekeeping}
                  </span>
                </div>
              </div>

              {/* Amenities tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {room.amenities.slice(0, 3).map((am) => (
                  <span
                    key={am}
                    className="text-[10px] bg-white border border-[#ECE8E1] text-[#7B7D85] px-2 py-0.5 rounded-md"
                  >
                    {am}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
