import React from 'react';
import { useHarvesting } from '../context/HarvestingContext';
import { formatINR } from '../utils/formatters';
import { Sparkles, PiggyBank, ArrowRight } from 'lucide-react';

export const SavingsBanner: React.FC = () => {
  const { taxSavings, selectedCoinKeys } = useHarvesting();

  if (taxSavings <= 0) {
    return (
      <div className="mt-4 bg-slate-100 border border-slate-200 rounded-xl p-3 text-center text-xs text-slate-500 font-medium">
        {selectedCoinKeys.size === 0
          ? 'Select holdings in the table below to see your potential tax savings.'
          : 'Selected holdings currently increase overall taxable gains or have neutral impact.'}
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-xl p-4 text-white shadow-md shadow-emerald-500/15 border border-emerald-400/40 relative overflow-hidden transition-all duration-300 animate-fadeIn">
      {/* Decorative background flare */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between relative z-10 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <PiggyBank className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-100 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Tax Optimization Strategy
            </div>
            <div className="text-base sm:text-lg font-bold text-white tracking-tight flex items-baseline gap-1">
              You&apos;re going to save{' '}
              <span className="text-xl sm:text-2xl font-extrabold text-yellow-300 underline underline-offset-4 decoration-yellow-300/60">
                {formatINR(taxSavings)}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 bg-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-xs">
          <span>Harvest Losses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
