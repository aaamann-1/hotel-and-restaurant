import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../common/Card';

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#18233F] text-white p-2.5 rounded-xl shadow-xl border border-[#C9A36A]/40 text-xs font-sans">
        <p className="font-semibold text-[#E5D0AB]">{data.name}</p>
        <p className="text-white mt-0.5">
          {data.count} rooms ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export const RoomDistributionChart = ({ data = [], totalRooms = 0 }) => {
  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="pb-4 border-b border-[#ECE8E1] mb-2">
        <h3 className="text-lg font-serif font-bold text-[#18233F]">
          Room Type Distribution
        </h3>
        <p className="text-xs text-[#7B7D85]">
          Inventory allocation across luxury room tiers
        </p>
      </div>

      {/* Chart and Legend row */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
        {/* Left: Donut Chart with Center Text */}
        <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center mx-auto sm:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-serif font-bold text-[#18233F] leading-tight">
              {totalRooms}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#7B7D85] font-bold">
              Total Rooms
            </span>
          </div>
        </div>

        {/* Right: Legend with metrics */}
        <div className="flex-1 w-full space-y-2">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs py-1 border-b border-[#ECE8E1]/50 last:border-b-0 hover:bg-[#FAF8F5] px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-[#18233F] text-xs">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#7B7D85] text-[11px]">{item.count} rms</span>
                <span className="font-semibold text-[#18233F] text-xs w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-[#ECE8E1] mt-auto flex items-center justify-between text-xs text-[#7B7D85]">
        <span>Categories from room inventory</span>
        <span className="text-[#C9A36A] font-medium">{totalRooms} rooms</span>
      </div>
    </Card>
  );
};

export default RoomDistributionChart;
