import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import Card from '../common/Card';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#18233F] text-white p-3 rounded-xl shadow-xl border border-[#C9A36A]/40 text-xs font-sans">
        <p className="font-semibold text-[#E5D0AB] mb-1">{label}</p>
        <p className="flex justify-between gap-4 text-white">
          <span>Occupancy:</span>
          <strong className="text-emerald-400 font-bold">{data.occupancy}%</strong>
        </p>
        <p className="flex justify-between gap-4 text-slate-300">
          <span>Occupied Rooms:</span>
          <strong className="text-white">{data.rooms} / {data.totalRooms}</strong>
        </p>
        <p className="flex justify-between gap-4 text-slate-300">
          <span>Daily Revenue:</span>
          <strong className="text-[#C9A36A]">{data.revenue}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export const OccupancyChart = ({ data = [] }) => {
  const latest = data[data.length - 1];

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#ECE8E1] mb-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-[#18233F]">
            Room Occupancy
          </h3>
          <p className="text-xs text-[#7B7D85]">
            Current percentage of rooms occupied across the resort
          </p>
        </div>

        <span className="text-xs font-semibold text-[#A37E45]">Live snapshot</span>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full h-[260px] min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 15, right: 15, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="luxuryGoldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A36A" stopOpacity={0.65} />
                <stop offset="60%" stopColor="#E5D0AB" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#FAF5EC" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECE8E1" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#7B7D85"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#ECE8E1' }}
              dy={6}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              stroke="#7B7D85"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#ECE8E1' }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="#C9A36A"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#luxuryGoldFill)"
              dot={{ fill: '#C9A36A', r: 4, strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#18233F', stroke: '#C9A36A', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Summary Bar */}
      <div className="pt-3 border-t border-[#ECE8E1] mt-2 flex items-center justify-between text-xs text-[#7B7D85]">
        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>Live data from the room inventory</span>
        </div>
        <span className="font-medium text-[#18233F]">
          {latest ? `Current: ${latest.occupancy}% (${latest.rooms}/${latest.totalRooms} rooms)` : 'No occupancy data available'}
        </span>
      </div>
    </Card>
  );
};

export default OccupancyChart;
