import React from 'react';
import { useHarvesting } from '../context/HarvestingContext';
import { HoldingRow } from './HoldingRow';
import { Checkbox } from './Checkbox';
import { Search, ArrowUpDown, ChevronDown, CheckSquare, XSquare, Eye } from 'lucide-react';
import type { TableFilterOption, TableSortOption } from '../types/harvesting';

export const HoldingsTable: React.FC = () => {
  const {
    holdings,
    filteredAndSortedHoldings,
    selectedCoinKeys,
    toggleSelection,
    selectAll,
    deselectAll,
    isAllSelected,
    searchQuery,
    setSearchQuery,
    filterOption,
    setFilterOption,
    sortOption,
    setSortOption,
    isViewAll,
    setIsViewAll,
  } = useHarvesting();

  const DEFAULT_PAGE_SIZE = 10;
  const displayedHoldings = isViewAll
    ? filteredAndSortedHoldings
    : filteredAndSortedHoldings.slice(0, DEFAULT_PAGE_SIZE);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-12 transition-colors">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title & Selection Count */}
          <div>
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Portfolio Holdings
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {holdings.length} Assets
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select assets to simulate tax loss harvesting and calculate net capital gain reduction.
            </p>
          </div>

          {/* Quick Actions (Select All / Deselect All) */}
          <div className="flex items-center space-x-2 shrink-0">
            {selectedCoinKeys.size > 0 && (
              <button
                type="button"
                onClick={deselectAll}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
              >
                <XSquare className="w-3.5 h-3.5 text-slate-400" />
                Clear Selection ({selectedCoinKeys.size})
              </button>
            )}

            <button
              type="button"
              onClick={isAllSelected ? deselectAll : selectAll}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer transition"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              {isAllSelected ? 'Deselect All' : 'Select All Holdings'}
            </button>
          </div>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coin by symbol or name (e.g. BTC, ETH, Polygon)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition shadow-2xs"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            {/* Filter Tabs */}
            <div className="flex bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs">
              {(['all', 'losses', 'gains'] as TableFilterOption[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilterOption(f)}
                  className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition cursor-pointer ${
                    filterOption === f
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'losses' ? 'Loss Making' : 'Profit Making'}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as TableSortOption)}
                className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-2xs"
              >
                <option value="stcg_desc">Sort: Highest STCG Impact</option>
                <option value="stcg_asc">Sort: Lowest STCG Impact</option>
                <option value="ltcg_desc">Sort: Highest LTCG Impact</option>
                <option value="name_asc">Sort: Asset Name (A-Z)</option>
                <option value="holding_desc">Sort: Highest Balance</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-2xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 w-12">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={isAllSelected ? deselectAll : selectAll}
                    ariaLabel="Select all rows"
                  />
                  <span>Asset</span>
                </div>
              </th>
              <th className="py-3 px-4">Holdings & Avg Price</th>
              <th className="py-3 px-4 text-right">Total Current Value</th>
              <th className="py-3 px-4 text-right">
                <div className="flex items-center justify-end space-x-1 cursor-pointer" onClick={() => setSortOption('stcg_desc')}>
                  <span>Short-Term Gain</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">
                <div className="flex items-center justify-end space-x-1 cursor-pointer" onClick={() => setSortOption('ltcg_desc')}>
                  <span>Long-Term Gain</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {displayedHoldings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <div className="max-w-xs mx-auto text-slate-400 space-y-2">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No holdings found</p>
                    <p className="text-xs">Try adjusting your search term or filter parameters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              displayedHoldings.map((holding) => {
                const origIdx = holdings.indexOf(holding);
                const rowKey = `${holding.coin}_${origIdx}`;
                const isSelected = selectedCoinKeys.has(rowKey);

                return (
                  <HoldingRow
                    key={rowKey}
                    holding={holding}
                    originalIndex={origIdx}
                    isSelected={isSelected}
                    onToggle={toggleSelection}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination / View All Footer */}
      {filteredAndSortedHoldings.length > DEFAULT_PAGE_SIZE && (
        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{displayedHoldings.length}</strong> of{' '}
            <strong className="text-slate-800 dark:text-slate-200">{filteredAndSortedHoldings.length}</strong> assets
          </span>

          <button
            type="button"
            onClick={() => setIsViewAll(!isViewAll)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold rounded-xl transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            {isViewAll ? 'Show Less (Top 10)' : `View All (${filteredAndSortedHoldings.length})`}
          </button>
        </div>
      )}
    </div>
  );
};
