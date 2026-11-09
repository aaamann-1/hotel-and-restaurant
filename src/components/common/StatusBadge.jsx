import React from 'react';

export const StatusBadge = ({ status }) => {
  const getBadgeStyle = (val) => {
    switch (val?.toLowerCase()) {
      case 'checked in':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80 ring-1 ring-emerald-500/10';
      case 'confirmed':
        return 'bg-[#FAF5EC] text-[#A37E45] border-[#E5D0AB] ring-1 ring-[#C9A36A]/20';
      case 'arriving':
        return 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-500/15';
      case 'checked out':
        return 'bg-slate-100 text-slate-600 border-slate-200 ring-1 ring-slate-400/10';
      case 'occupied':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'available':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reserved':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'clean':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'dirty':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'in progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'partial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDotColor = (val) => {
    switch (val?.toLowerCase()) {
      case 'checked in':
      case 'occupied':
      case 'clean':
      case 'paid':
        return 'bg-emerald-500';
      case 'confirmed':
        return 'bg-[#C9A36A]';
      case 'arriving':
      case 'reserved':
      case 'partial':
      case 'in progress':
        return 'bg-amber-500';
      case 'checked out':
        return 'bg-slate-400';
      case 'dirty':
        return 'bg-rose-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${getBadgeStyle(
        status
      )}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(status)} animate-pulse`} />
      {status}
    </span>
  );
};

export default StatusBadge;
