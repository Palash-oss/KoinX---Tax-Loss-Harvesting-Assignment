import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const DisclaimersBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-blue-50/90 dark:bg-slate-900/90 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-4 sm:p-5 mb-6 text-xs transition-all shadow-xs">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-200 font-bold">
          <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Important Notes & Disclaimers</span>
        </div>

        <button
          type="button"
          aria-label={isExpanded ? 'Collapse disclaimers' : 'Expand disclaimers'}
          className="text-blue-700 dark:text-blue-300 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-100/50 dark:hover:bg-slate-800 transition"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed pl-6 list-disc">
          <li>
            Tax loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.
          </li>
          <li>
            Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.
          </li>
          <li>
            Price and market value data is fetched from CoinGecko, not from individual exchanges. As a result, values may slightly differ from the price on your exchange.
          </li>
          <li>
            Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.
          </li>
          <li>
            Only realized losses are considered for harvesting. Unrealized losses in wallets/account are not counted.
          </li>
        </ul>
      )}
    </div>
  );
};
