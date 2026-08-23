import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Top Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pre harvesting card skeleton */}
        <div className="bg-slate-900/80 rounded-2xl p-6 h-64 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-6 bg-slate-800 rounded-md w-1/3" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-slate-800/60 rounded-xl" />
              <div className="h-24 bg-slate-800/60 rounded-xl" />
            </div>
          </div>
          <div className="h-8 bg-slate-800 rounded-lg w-2/3" />
        </div>

        {/* After harvesting card skeleton */}
        <div className="bg-blue-900/60 rounded-2xl p-6 h-64 border border-blue-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-6 bg-blue-800/80 rounded-md w-1/3" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-blue-800/50 rounded-xl" />
              <div className="h-24 bg-blue-800/50 rounded-xl" />
            </div>
          </div>
          <div className="h-8 bg-blue-800/80 rounded-lg w-2/3" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="h-6 bg-slate-200 rounded-md w-1/4" />
          <div className="h-8 bg-slate-200 rounded-xl w-32" />
        </div>

        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-100 rounded-xl w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
