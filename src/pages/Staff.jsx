import React from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';

export const Staff = () => {
  const { staff: hotelStaff, addStaff, updateStaffStatus } = useHotel();
  const handleAddStaff = async () => {
    const name = window.prompt('Staff member full name');
    if (!name?.trim()) return;
    const role = window.prompt('Staff role');
    if (!role?.trim()) return;
    const department = window.prompt('Department', 'Front Office');
    if (!department?.trim()) return;
    await addStaff({ name: name.trim(), role: role.trim(), department: department.trim() });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Administration</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Staff & HR Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Hotel Personnel & Shift Rostering
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Executive leadership, front desk agents, culinary artists, and housekeeping staff
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleAddStaff}
          icon={Plus}
        >
          Add New Staff Member
        </Button>
      </div>

      {/* Staff Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelStaff.map(emp => (
          <Card key={emp.id} hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EC] border border-[#E5D0AB] flex items-center justify-center font-serif font-bold text-lg text-[#A37E45]">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#18233F]">{emp.name}</h4>
                    <span className="text-xs text-[#A37E45] font-semibold">{emp.role}</span>
                  </div>
                </div>

                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    emp.status === 'On Duty'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {emp.status}
                </span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#ECE8E1] space-y-1.5 text-xs text-[#7B7D85] mb-3">
                <div className="flex justify-between">
                  <span>Department:</span>
                  <strong className="text-[#18233F]">{emp.department}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Shift:</span>
                  <span className="text-[#18233F] font-medium">{emp.shift}</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Contact:</span>
                  <span className="text-[#18233F]">{emp.contact}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#ECE8E1] flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#7B7D85]">{emp.id}</span>
              <button
                onClick={() => updateStaffStatus(emp.id, emp.status === 'On Duty' ? 'Off Duty' : 'On Duty')}
                className="text-xs text-[#C9A36A] hover:underline font-semibold"
              >
                Toggle Duty Status
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Staff;
