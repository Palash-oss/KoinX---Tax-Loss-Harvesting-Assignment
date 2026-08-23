import React from 'react';
import { HarvestingProvider, useHarvesting } from './context/HarvestingContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { InfoBanner } from './components/InfoBanner';
import { DisclaimersBanner } from './components/DisclaimersBanner';
import { CapitalGainsCard } from './components/CapitalGainsCard';
import { SavingsBanner } from './components/SavingsBanner';
import { HoldingsTable } from './components/HoldingsTable';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ErrorState } from './components/ErrorState';

const MainContent: React.FC = () => {
  const {
    preHarvestingGains,
    postHarvestingGains,
    selectedCoinKeys,
    isLoading,
    isError,
  } = useHarvesting();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <InfoBanner />
      <DisclaimersBanner />

      {isLoading ? (
        <SkeletonLoader />
      ) : isError ? (
        <ErrorState />
      ) : (
        <>
          {/* Capital Gains Comparison Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <CapitalGainsCard variant="pre" data={preHarvestingGains} />
            </div>
            <div>
              <CapitalGainsCard
                variant="post"
                data={postHarvestingGains}
                selectedCount={selectedCoinKeys.size}
              />
              <SavingsBanner />
            </div>
          </section>

          {/* Holdings Table Section */}
          <section>
            <HoldingsTable />
          </section>
        </>
      )}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HarvestingProvider>
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0E14] flex flex-col font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-500 selection:text-white">
          <Header />
          <div className="flex-1">
            <MainContent />
          </div>

          {/* Minimal Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>KoinX Frontend Internship Assignment — Tax Loss Harvesting Tool</span>
              <span className="text-slate-400 dark:text-slate-500">Built with React, TypeScript & Tailwind CSS</span>
            </div>
          </footer>
        </div>
      </HarvestingProvider>
    </ThemeProvider>
  );
};

export default App;
