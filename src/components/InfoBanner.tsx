import React from 'react';
import { TrendingDown, Sparkles } from 'lucide-react';

export const InfoBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 dark:from-[#111827] dark:via-[#131D31] dark:to-[#17233B] border border-blue-100 dark:border-slate-800 rounded-2xl p-5 md:p-6 mb-6 shadow-xs relative overflow-hidden transition-colors">
      {/* Decorative background blur */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border border-blue-200/60 dark:border-blue-800">
              <Sparkles className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" />
              Tax Loss Harvesting
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Updated Real-time</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Optimize Your Capital Gains Tax
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Sell underperforming assets to realize capital losses, offset against your capital gains, and minimize overall tax liability before the end of the financial year.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs p-3 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs self-start md:self-auto shrink-0">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Strategy</div>
            <div className="text-xs font-bold text-slate-800 dark:text-white">Offset Losses Against Profits</div>
          </div>
        </div>
      </div>
    </div>
  );
};
