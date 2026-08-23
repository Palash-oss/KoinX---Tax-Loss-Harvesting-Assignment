import React from 'react';
import type { Holding } from '../types/harvesting';
import { Checkbox } from './Checkbox';
import { CoinIcon } from './CoinIcon';
import { formatINR, formatTokenAmount } from '../utils/formatters';

interface HoldingRowProps {
  holding: Holding;
  originalIndex: number;
  isSelected: boolean;
  onToggle: (key: string) => void;
}

export const HoldingRow: React.FC<HoldingRowProps> = ({
  holding,
  originalIndex,
  isSelected,
  onToggle,
}) => {
  const rowKey = `${holding.coin}_${originalIndex}`;

  const isStcgPositive = holding.stcg.gain >= 0;
  const isLtcgPositive = holding.ltcg.gain >= 0;
  const totalCurrentValue = holding.totalHolding * holding.currentPrice;

  return (
    <tr
      onClick={() => onToggle(rowKey)}
      className={`group border-b border-slate-100 dark:border-slate-800 transition-colors duration-150 cursor-pointer ${
        isSelected
          ? 'bg-blue-50/80 dark:bg-blue-950/50 hover:bg-blue-50 dark:hover:bg-blue-950/70 border-l-4 border-l-blue-600'
          : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/60 border-l-4 border-l-transparent'
      }`}
    >
      {/* Checkbox + Asset (Logo/Badge, Symbol, Name) */}
      <td className="py-3.5 px-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isSelected}
            onChange={() => onToggle(rowKey)}
            ariaLabel={`Select ${holding.coinName}`}
          />

          <div className="flex items-center space-x-2.5 min-w-0">
            <CoinIcon coin={holding.coin} logoUrl={holding.logo} />

            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {holding.coin}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px] sm:max-w-[180px]" title={holding.coinName}>
                {holding.coinName}
              </p>
            </div>
          </div>
        </div>
      </td>

      {/* Holdings & Avg Buy Price */}
      <td className="py-3.5 px-4 text-right sm:text-left">
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {formatTokenAmount(holding.totalHolding)} {holding.coin}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Avg: <span className="font-medium text-slate-600 dark:text-slate-300">{formatINR(holding.averageBuyPrice)}</span>
        </div>
      </td>

      {/* Total Current Value */}
      <td className="py-3.5 px-4 text-right">
        <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
          {formatINR(totalCurrentValue)}
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500">
          @{formatINR(holding.currentPrice)}
        </div>
      </td>

      {/* Short-Term Gain (gain + balance) */}
      <td className="py-3.5 px-4 text-right">
        <div className={`text-sm font-bold ${isStcgPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
          {isStcgPositive ? '+' : ''}
          {formatINR(holding.stcg.gain)}
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500">
          Bal: <span className="text-slate-600 dark:text-slate-300 font-medium">{formatTokenAmount(holding.stcg.balance)}</span>
        </div>
      </td>

      {/* Long-Term Gain (gain + balance) */}
      <td className="py-3.5 px-4 text-right">
        <div
          className={`text-sm font-bold ${
            holding.ltcg.gain === 0
              ? 'text-slate-400 dark:text-slate-500'
              : isLtcgPositive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-500 dark:text-red-400'
          }`}
        >
          {holding.ltcg.gain > 0 ? '+' : ''}
          {formatINR(holding.ltcg.gain)}
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500">
          Bal: <span className="text-slate-600 dark:text-slate-300 font-medium">{formatTokenAmount(holding.ltcg.balance)}</span>
        </div>
      </td>

      {/* Amount to Sell (Populated when selected) */}
      <td className="py-3.5 px-4 text-right">
        {isSelected ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
            {formatTokenAmount(holding.totalHolding)} {holding.coin}
          </span>
        ) : (
          <span className="text-slate-300 dark:text-slate-600 font-mono text-sm">—</span>
        )}
      </td>
    </tr>
  );
};
