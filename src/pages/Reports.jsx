import React from 'react';
import { Download, BedDouble, Users, IndianRupee, CalendarCheck } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';
import OccupancyChart from '../components/dashboard/OccupancyChart';

export const Reports = () => {
  const { kpis, occupancyData, accounts } = useHotel();
  const latestOccupancy = occupancyData[occupancyData.length - 1];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Executive Analytics</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Hospitality Reports</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">Hotel Operations Report</h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Live occupancy, booking counts, and recorded financial transactions
          </p>
        </div>
        <Button variant="primary" onClick={() => window.print()} icon={Download}>
          Print / Save Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Current Occupancy', value: `${latestOccupancy?.occupancy ?? kpis.totalRooms.occupancyRate}%`, icon: BedDouble },
          { label: 'Occupied Rooms', value: kpis.totalRooms.occupied, icon: BedDouble },
          { label: "Today's Check-ins", value: kpis.todayBookings.checkIns, icon: CalendarCheck },
          { label: 'In-house Guests', value: kpis.totalGuests.value, icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} hoverEffect padding="p-5">
            <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider">{label}</span>
            <p className="flex items-center gap-2 text-2xl font-serif font-bold text-[#18233F] mt-2">
              <Icon className="w-5 h-5 text-[#C9A36A]" /> {value}
            </p>
          </Card>
        ))}
      </div>

      <OccupancyChart data={occupancyData} />

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-[#ECE8E1] bg-white flex justify-between items-center">
          <h3 className="text-base font-serif font-bold text-[#18233F]">Recorded Financial Transactions</h3>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#7B7D85]">
            <IndianRupee className="w-3.5 h-3.5" /> {accounts.recentTransactions.length} records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#7B7D85] uppercase tracking-wider text-[11px] font-semibold border-b border-[#ECE8E1]">
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]/80">
              {accounts.recentTransactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-[#FAF8F5]/60">
                  <td className="py-3.5 px-6 text-[#7B7D85]">{transaction.date}</td>
                  <td className="py-3.5 px-6 font-semibold text-[#18233F]">{transaction.type}</td>
                  <td className="py-3.5 px-6 text-[#18233F]">{transaction.category}</td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">{transaction.description}</td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">{transaction.method}</td>
                  <td className="py-3.5 px-6 text-right font-semibold text-[#18233F]">
                    ₹{transaction.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
              {!accounts.recentTransactions.length && (
                <tr><td colSpan="6" className="py-8 text-center text-[#7B7D85]">No transactions recorded.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
