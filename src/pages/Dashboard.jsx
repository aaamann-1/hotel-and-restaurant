import React from 'react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatCards from '../components/dashboard/StatCard';
import OccupancyChart from '../components/dashboard/OccupancyChart';
import RoomDistributionChart from '../components/dashboard/RoomDistributionChart';
import RecentActivities from '../components/dashboard/RecentActivities';
import CurrentBookings from '../components/dashboard/CurrentBookings';
import QuickActions from '../components/dashboard/QuickActions';
import { useHotel } from '../context/HotelContext';

export const Dashboard = () => {
  const { kpis, occupancyData, roomDistribution, backendConnected, apiLoading } = useHotel();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        apiLoading
          ? 'bg-amber-50 text-amber-700'
          : backendConnected
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-rose-50 text-rose-700'
      }`}>
        {apiLoading ? 'Connecting to hotel APIs…' : backendConnected ? 'Hotel APIs connected' : 'Some hotel APIs are unavailable'}
      </div>
      {/* C. Welcome Banner */}
      <WelcomeBanner />

      {/* D. 4 KPI Summary Cards */}
      <StatCards kpis={kpis} />

      {/* Multi-column Layout matching desktop reference:
          Left Area (Charts & Current Bookings Table) + Right Area (Recent Activities & Quick Actions) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column (Spans 8 of 12 on extra large screens) */}
        <div className="xl:col-span-8 space-y-6 sm:space-y-8">
          {/* E. Analytics Section: 2 Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OccupancyChart
              data={occupancyData}
            />
            <RoomDistributionChart data={roomDistribution} totalRooms={kpis.totalRooms.value} />
          </div>

          {/* G. Current Bookings Table */}
          <CurrentBookings />
        </div>

        {/* Right Column (Spans 4 of 12 on extra large screens) */}
        <div className="xl:col-span-4 space-y-6 sm:space-y-8">
          {/* F. Recent Activities Panel */}
          <RecentActivities />

          {/* H. Guest Experience and Quick Actions Panel */}
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
