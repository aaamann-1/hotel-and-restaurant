import React from 'react';
import {
  CalendarCheck2,
  KeyRound,
  Sparkles,
  CreditCard,
  Compass,
  Package,
  Clock,
  ArrowRight
} from 'lucide-react';
import Card from '../common/Card';
import { recentActivities } from '../../data/dashboardData';
import { useNavigate } from 'react-router-dom';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'booking':
      return { icon: CalendarCheck2, bg: 'bg-amber-50 text-[#C9A36A] border-[#E5D0AB]' };
    case 'checkin':
      return { icon: KeyRound, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
    case 'housekeeping':
      return { icon: Sparkles, bg: 'bg-blue-50 text-blue-600 border-blue-200' };
    case 'payment':
      return { icon: CreditCard, bg: 'bg-teal-50 text-teal-600 border-teal-200' };
    case 'tourism':
      return { icon: Compass, bg: 'bg-purple-50 text-purple-600 border-purple-200' };
    case 'inventory':
      return { icon: Package, bg: 'bg-slate-50 text-slate-600 border-slate-200' };
    default:
      return { icon: Clock, bg: 'bg-gray-50 text-gray-600 border-gray-200' };
  }
};

export const RecentActivities = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#ECE8E1] mb-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-[#18233F]">
            Recent Activities
          </h3>
          <p className="text-xs text-[#7B7D85]">
            Real-time feed of hotel events & operations
          </p>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
      </div>

      {/* Activity Timeline List */}
      <div className="flex-1 divide-y divide-[#ECE8E1]/70">
        {recentActivities.map((act) => {
          const { icon: Icon, bg } = getCategoryIcon(act.category);

          return (
            <div
              key={act.id}
              className="py-3 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors rounded-xl px-2 -mx-2 group"
            >
              {/* Category Circular Icon */}
              <div
                className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform ${bg}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#18233F] truncate">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-[#7B7D85] font-sans flex-shrink-0">
                    {act.time}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#7B7D85]">
                  <span className="font-medium text-[#18233F]">{act.guest}</span>
                  <span>•</span>
                  <span className="text-[#A37E45] font-medium">{act.detail}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-[#ECE8E1] mt-2">
        <button
          onClick={() => navigate('/reports')}
          className="w-full py-1.5 text-xs font-semibold text-[#C9A36A] hover:text-[#B89258] flex items-center justify-center gap-1.5 transition-colors group"
        >
          <span>View Full Activity Audit Log</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </Card>
  );
};

export default RecentActivities;
