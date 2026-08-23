import React from 'react';
import { useHarvesting } from '../context/HarvestingContext';
import { AlertOctagon, RefreshCw, CheckCircle } from 'lucide-react';

export const ErrorState: React.FC = () => {
  const { errorMessage, refetchData, setSimulatedError, isLoading } = useHarvesting();

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-xl mx-auto my-12 text-center shadow-md">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-200">
        <AlertOctagon className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Failed to Load API Data
      </h3>

      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        {errorMessage || 'Unable to fetch capital gains or portfolio holdings from the server.'}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={refetchData}
          disabled={isLoading}
          className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Retry API Call
        </button>

        <button
          type="button"
          onClick={() => {
            setSimulatedError(false);
          }}
          className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          Disable Simulated Error Mode
        </button>
      </div>
    </div>
  );
};
