import React from 'react';
import { CheckCircle2, Clock, AlertCircle, RefreshCw, UserCheck } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { useHotel } from '../context/HotelContext';

export const Housekeeping = () => {
  const { rooms, updateHousekeeping, refreshRooms, showToast } = useHotel();

  const markClean = (roomNo) => updateHousekeeping(roomNo, 'Clean');
  const markInProgress = (roomNo) => updateHousekeeping(roomNo, 'In Progress');

  const cleanCount = rooms.filter(r => r.housekeeping === 'Clean').length;
  const inProgressCount = rooms.filter(r => r.housekeeping === 'In Progress').length;
  const dirtyCount = rooms.filter(r => r.housekeeping === 'Dirty').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Rooms</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Housekeeping</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Housekeeping & Sanitization Console
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Oversee room turnover, turnover inspections, and staff team assignments
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refreshRooms().then(() => showToast('Room statuses refreshed from the database.', 'success')).catch(error => showToast(error.message, 'error'))}
          icon={RefreshCw}
        >
          Refresh Inspections
        </Button>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#7B7D85]">Clean & Inspected</span>
            <p className="text-2xl font-bold font-serif text-emerald-700">{cleanCount}</p>
          </div>
        </Card>

        <Card padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#7B7D85]">In Progress</span>
            <p className="text-2xl font-bold font-serif text-amber-700">{inProgressCount}</p>
          </div>
        </Card>

        <Card padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#7B7D85]">Pending Cleaning</span>
            <p className="text-2xl font-bold font-serif text-rose-700">{dirtyCount}</p>
          </div>
        </Card>
      </div>

      {/* Housekeeping Tasks Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-[#ECE8E1] bg-white">
          <h3 className="text-base font-serif font-bold text-[#18233F]">
            Room Turnover Status Roster
          </h3>
          <p className="text-xs text-[#7B7D85]">Click action buttons to update live sanitization status</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#7B7D85] uppercase tracking-wider text-[11px] font-semibold border-b border-[#ECE8E1]">
                <th className="py-3 px-6">Room No.</th>
                <th className="py-3 px-6">Room Type</th>
                <th className="py-3 px-6">Occupancy</th>
                <th className="py-3 px-6">Current Status</th>
                <th className="py-3 px-6">Assigned Attendant</th>
                <th className="py-3 px-6 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]/80">
              {rooms.map((room) => (
                <tr key={room.roomNo} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-sm text-[#18233F]">
                    Room #{room.roomNo}
                  </td>
                  <td className="py-3.5 px-6 font-medium text-[#18233F]">{room.type}</td>
                  <td className="py-3.5 px-6">
                    <StatusBadge status={room.status} />
                  </td>
                  <td className="py-3.5 px-6">
                    <StatusBadge status={room.housekeeping} />
                  </td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">
                    <span className="flex items-center gap-1.5 font-medium text-[#18233F]">
                      <UserCheck className="w-3.5 h-3.5 text-[#C9A36A]" /> Team Alpha (Sunil Verma)
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {room.housekeeping !== 'Clean' && (
                        <button
                          onClick={() => markClean(room.roomNo)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                        >
                          Mark Clean
                        </button>
                      )}
                      {room.housekeeping === 'Dirty' && (
                        <button
                          onClick={() => markInProgress(room.roomNo)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
                        >
                          Start Cleaning
                        </button>
                      )}
                      {room.housekeeping === 'Clean' && (
                        <span className="text-xs text-emerald-600 font-medium">Ready for Guest</span>
                      )}
                    </div>
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

export default Housekeeping;
