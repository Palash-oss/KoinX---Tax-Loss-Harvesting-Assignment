import React from 'react';
import type { CalculatedCapitalGains } from '../types/harvesting';
import { formatINR } from '../utils/formatters';
import { TrendingUp, TrendingDown, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CapitalGainsCardProps {
  variant: 'pre' | 'post';
  data: CalculatedCapitalGains | null;
  selectedCount?: number;
}

export const CapitalGainsCard: React.FC<CapitalGainsCardProps> = ({ variant, data, selectedCount = 0 }) => {
  const isPre = variant === 'pre';

  if (!data) return null;

  return (
    <div
      className={`rounded-2xl p-6 md:p-7 shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        isPre
          ? 'bg-[#0F172A] text-white border border-slate-800'
          : 'bg-gradient-to-br from-[#0052FF] via-blue-600 to-[#1E40AF] text-white border border-blue-500/30'
      }`}
    >
      {/* Decorative ambient background glows */}
      <div
        className={`absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
          isPre ? 'bg-blue-500/10' : 'bg-white/10'
        }`}
      />

      <div>
        {/* Top Header & Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isPre ? 'bg-slate-800 text-slate-300' : 'bg-white/20 text-white backdrop-blur-xs'
              }`}
            >
              {isPre ? <Layers className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                {isPre ? 'Pre-Harvesting' : 'After Harvesting'}
              </h2>
              <p className={`text-xs ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
                {isPre ? 'Baseline portfolio capital gains' : 'Live estimate based on selected sells'}
              </p>
            </div>
          </div>

          {!isPre && selectedCount > 0 && (
            <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 shadow-xs animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {selectedCount} {selectedCount === 1 ? 'asset' : 'assets'} selected
            </span>
          )}
        </div>

        {/* Capital Gains Grid: Short Term & Long Term */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Short Term Capital Gains (STCG) */}
          <div
            className={`p-4 rounded-xl border backdrop-blur-xs transition-colors ${
              isPre
                ? 'bg-slate-800/60 border-slate-700/60'
                : 'bg-white/10 border-white/15'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
                Short-Term (STCG)
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  data.stcg.net >= 0
                    ? isPre ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-400/25 text-emerald-200'
                    : isPre ? 'bg-red-500/20 text-red-400' : 'bg-red-400/25 text-red-200'
                }`}
              >
                Net: {formatINR(data.stcg.net)}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className={`flex items-center gap-1 ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
                  <TrendingUp className="w-3 h-3 text-emerald-400" /> Profits
                </span>
                <span className="font-semibold text-emerald-400">{formatINR(data.stcg.profits)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`flex items-center gap-1 ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
                  <TrendingDown className="w-3 h-3 text-red-400" /> Losses
                </span>
                <span className="font-semibold text-red-400">{formatINR(data.stcg.losses)}</span>
              </div>
            </div>
          </div>

          {/* Long Term Capital Gains (LTCG) */}
          <div
            className={`p-4 rounded-xl border backdrop-blur-xs transition-colors ${
              isPre
                ? 'bg-slate-800/60 border-slate-700/60'
                : 'bg-white/10 border-white/15'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
                Long-Term (LTCG)
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  data.ltcg.net >= 0
                    ? isPre ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-400/25 text-emerald-200'
                    : isPre ? 'bg-red-500/20 text-red-400' : 'bg-red-400/25 text-red-200'
                }`}
              >
                Net: {formatINR(data.ltcg.net)}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className={`flex items-center gap-1 ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
                  <TrendingUp className="w-3 h-3 text-emerald-400" /> Profits
                </span>
                <span className="font-semibold text-emerald-400">{formatINR(data.ltcg.profits)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`flex items-center gap-1 ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
                  <TrendingDown className="w-3 h-3 text-red-400" /> Losses
                </span>
                <span className="font-semibold text-red-400">{formatINR(data.ltcg.losses)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Realised Capital Gains Footer */}
      <div
        className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
          isPre ? 'border-slate-800' : 'border-white/20'
        }`}
      >
        <div>
          <span className={`text-xs font-semibold uppercase tracking-wider block ${isPre ? 'text-slate-400' : 'text-blue-100'}`}>
            Realised Capital Gains
          </span>
          <span className={`text-2xs ${isPre ? 'text-slate-500' : 'text-blue-200'}`}>
            Sum of Net STCG + Net LTCG
          </span>
        </div>

        <div className="flex items-baseline space-x-1">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono">
            {formatINR(data.realisedGains)}
          </span>
          {isPre && (
            <ArrowUpRight className="w-4 h-4 text-slate-400 self-center" />
          )}
        </div>
      </div>
    </div>
  );
};
