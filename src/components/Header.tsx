import React, { useState } from 'react';
import { useHarvesting } from '../context/HarvestingContext';
import { useTheme } from '../context/ThemeContext';
import { HowItWorksModal } from './HowItWorksModal';
import { ShieldCheck, AlertTriangle, RefreshCw, Layers, Sun, Moon, HelpCircle, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    simulatedErrorActive,
    setSimulatedError,
    refetchData,
    isLoading,
    isLiveTickerActive,
    toggleLiveTicker,
  } = useHarvesting();
  const { theme, toggleTheme } = useTheme();
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-[#121824] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Navigation */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl tracking-wider shadow-md shadow-blue-500/20">
                  K
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Koin<span className="text-blue-600">X</span>
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-200 dark:border-slate-800">
                <span className="px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition">
                  Tax Reports
                </span>
                <span className="px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 rounded-lg flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Tax Loss Harvesting
                </span>
                <span className="px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition">
                  Portfolios
                </span>
              </nav>
            </div>

            {/* Controls, Live Ticker, Theme Switcher & Profile */}
            <div className="flex items-center space-x-3">
              {/* How it works button */}
              <button
                type="button"
                onClick={() => setIsHowItWorksOpen(true)}
                className="hidden sm:flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-100 dark:border-blue-900 transition cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                How it works?
              </button>

              {/* Live Ticker Toggle */}
              <button
                type="button"
                onClick={toggleLiveTicker}
                title="Toggle Real-Time Price Fluctuation"
                className={`hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                  isLiveTickerActive
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Activity className={`w-3.5 h-3.5 ${isLiveTickerActive ? 'text-emerald-500' : ''}`} />
                {isLiveTickerActive ? 'Live Ticker ON' : 'Live Ticker OFF'}
              </button>

              {/* Theme Toggle Button (Light/Dark) */}
              <button
                type="button"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-slate-600" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-400" />
                )}
              </button>

              {/* Dev Error Simulator Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => setSimulatedError(false)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1 ${
                    !simulatedErrorActive
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Normal API
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedError(true)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1 ${
                    simulatedErrorActive
                      ? 'bg-red-500 text-white shadow-xs font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Simulate Error
                </button>
              </div>

              {/* Manual Refetch Button */}
              <button
                type="button"
                onClick={refetchData}
                disabled={isLoading}
                title="Refetch API Data"
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
              </button>

              {/* Profile Avatar */}
              <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  M
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
    </>
  );
};
