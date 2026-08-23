import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type {
  Holding,
  CapitalGainsData,
  CalculatedCapitalGains,
  TableFilterOption,
  TableSortOption,
} from '../types/harvesting';
import { getHoldings, getCapitalGains } from '../api/mockApi';
import { calculateNetCapitalGains, computePostHarvestingGains } from '../utils/calculation';

interface HarvestingContextType {
  holdings: Holding[];
  initialCapitalGains: CapitalGainsData | null;
  preHarvestingGains: CalculatedCapitalGains | null;
  postHarvestingGains: CalculatedCapitalGains | null;
  selectedCoinKeys: Set<string>;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  simulatedErrorActive: boolean;
  isLiveTickerActive: boolean;
  toggleLiveTicker: () => void;
  toggleSelection: (key: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  isAllSelected: boolean;
  taxSavings: number;
  refetchData: () => Promise<void>;
  setSimulatedError: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterOption: TableFilterOption;
  setFilterOption: (f: TableFilterOption) => void;
  sortOption: TableSortOption;
  setSortOption: (s: TableSortOption) => void;
  isViewAll: boolean;
  setIsViewAll: (v: boolean) => void;
  filteredAndSortedHoldings: Holding[];
}

const HarvestingContext = createContext<HarvestingContextType | undefined>(undefined);

export const HarvestingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [initialCapitalGains, setInitialCapitalGains] = useState<CapitalGainsData | null>(null);
  const [selectedCoinKeys, setSelectedCoinKeys] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [simulatedErrorActive, setSimulatedErrorActive] = useState<boolean>(false);
  const [isLiveTickerActive, setIsLiveTickerActive] = useState<boolean>(false);

  // Filters and Sorting
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOption, setFilterOption] = useState<TableFilterOption>('all');
  const [sortOption, setSortOption] = useState<TableSortOption>('stcg_desc');
  const [isViewAll, setIsViewAll] = useState<boolean>(false);

  const fetchData = useCallback(async (forceError = false) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    try {
      const [holdingsRes, capitalGainsRes] = await Promise.all([
        getHoldings(forceError),
        getCapitalGains(forceError),
      ]);

      setHoldings(holdingsRes);
      setInitialCapitalGains(capitalGainsRes.capitalGains);
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.message || 'An error occurred while loading data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(simulatedErrorActive);
  }, [fetchData, simulatedErrorActive]);

  // Simulated Live Price Ticker
  useEffect(() => {
    if (!isLiveTickerActive || holdings.length === 0) return;

    const interval = setInterval(() => {
      setHoldings((prevHoldings) =>
        prevHoldings.map((h) => {
          const factor = 1 + (Math.random() * 0.004 - 0.002); // ±0.2% fluctuation
          return {
            ...h,
            currentPrice: Number((h.currentPrice * factor).toFixed(6)),
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveTickerActive, holdings.length]);

  const toggleLiveTicker = useCallback(() => {
    setIsLiveTickerActive((prev) => !prev);
  }, []);

  const preHarvestingGains = useMemo(() => {
    if (!initialCapitalGains) return null;
    return calculateNetCapitalGains(initialCapitalGains);
  }, [initialCapitalGains]);

  const postHarvestingGains = useMemo(() => {
    if (!initialCapitalGains) return null;
    return computePostHarvestingGains(initialCapitalGains, holdings, selectedCoinKeys);
  }, [initialCapitalGains, holdings, selectedCoinKeys]);

  const taxSavings = useMemo(() => {
    if (!preHarvestingGains || !postHarvestingGains) return 0;
    const diff = preHarvestingGains.realisedGains - postHarvestingGains.realisedGains;
    return diff > 0 ? diff : 0;
  }, [preHarvestingGains, postHarvestingGains]);

  const toggleSelection = useCallback((key: string) => {
    setSelectedCoinKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    const allKeys = new Set<string>();
    holdings.forEach((h, idx) => allKeys.add(`${h.coin}_${idx}`));
    setSelectedCoinKeys(allKeys);
  }, [holdings]);

  const deselectAll = useCallback(() => {
    setSelectedCoinKeys(new Set());
  }, []);

  const isAllSelected = useMemo(() => {
    if (holdings.length === 0) return false;
    return selectedCoinKeys.size === holdings.length;
  }, [holdings, selectedCoinKeys]);

  const setSimulatedError = useCallback((val: boolean) => {
    setSimulatedErrorActive(val);
  }, []);

  const refetchData = useCallback(async () => {
    await fetchData(simulatedErrorActive);
  }, [fetchData, simulatedErrorActive]);

  // Filtered & Sorted Holdings
  const filteredAndSortedHoldings = useMemo(() => {
    let result = holdings.map((holding, originalIndex) => ({
      holding,
      originalKey: `${holding.coin}_${originalIndex}`,
    }));

    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.holding.coin.toLowerCase().includes(q) ||
          item.holding.coinName.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filterOption === 'losses') {
      result = result.filter((item) => item.holding.stcg.gain < 0 || item.holding.ltcg.gain < 0);
    } else if (filterOption === 'gains') {
      result = result.filter((item) => item.holding.stcg.gain > 0 || item.holding.ltcg.gain > 0);
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'stcg_desc') {
        return Math.abs(b.holding.stcg.gain) - Math.abs(a.holding.stcg.gain);
      } else if (sortOption === 'stcg_asc') {
        return Math.abs(a.holding.stcg.gain) - Math.abs(b.holding.stcg.gain);
      } else if (sortOption === 'ltcg_desc') {
        return Math.abs(b.holding.ltcg.gain) - Math.abs(a.holding.ltcg.gain);
      } else if (sortOption === 'name_asc') {
        return a.holding.coin.localeCompare(b.holding.coin);
      } else if (sortOption === 'holding_desc') {
        return b.holding.totalHolding - a.holding.totalHolding;
      }
      return 0;
    });

    return result.map((item) => item.holding);
  }, [holdings, searchQuery, filterOption, sortOption]);

  return (
    <HarvestingContext.Provider
      value={{
        holdings,
        initialCapitalGains,
        preHarvestingGains,
        postHarvestingGains,
        selectedCoinKeys,
        isLoading,
        isError,
        errorMessage,
        simulatedErrorActive,
        isLiveTickerActive,
        toggleLiveTicker,
        toggleSelection,
        selectAll,
        deselectAll,
        isAllSelected,
        taxSavings,
        refetchData,
        setSimulatedError,
        searchQuery,
        setSearchQuery,
        filterOption,
        setFilterOption,
        sortOption,
        setSortOption,
        isViewAll,
        setIsViewAll,
        filteredAndSortedHoldings,
      }}
    >
      {children}
    </HarvestingContext.Provider>
  );
};

export const useHarvesting = () => {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error('useHarvesting must be used within a HarvestingProvider');
  }
  return context;
};
