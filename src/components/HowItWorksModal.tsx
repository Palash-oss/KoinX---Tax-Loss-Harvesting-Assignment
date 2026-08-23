import React from 'react';
import { X, HelpCircle } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              How Tax Loss Harvesting Works
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3 bg-blue-50 dark:bg-slate-800/80 rounded-xl border border-blue-100 dark:border-slate-700">
            <p className="font-semibold text-slate-900 dark:text-white mb-1">
              What is Tax Loss Harvesting?
            </p>
            <p>
              Tax Loss Harvesting is a strategic method of selling crypto assets currently at a loss to offset capital gains realized from other profitable investments, thereby reducing your overall net tax liability.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-2xs">
                1
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Select Loss-Making Assets</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Pick holdings in your portfolio where current price is lower than buy price.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-2xs">
                2
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Offset Capital Gains</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Realized losses are deducted from your realized gains (Short-Term & Long-Term).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold text-2xs">
                3
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Save on Taxes</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Your taxable capital gain drops, saving money before the end of the tax year.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-sm"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
