export interface GainBalance {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainBalance;
  ltcg: GainBalance;
}

export interface GainsDetail {
  profits: number;
  losses: number;
}

export interface CapitalGainsData {
  stcg: GainsDetail;
  ltcg: GainsDetail;
}

export interface CapitalGainsApiResponse {
  capitalGains: CapitalGainsData;
}

export interface CalculatedCapitalGains {
  stcg: GainsDetail & { net: number };
  ltcg: GainsDetail & { net: number };
  realisedGains: number;
}

export type TableFilterOption = 'all' | 'losses' | 'gains';
export type TableSortOption = 'stcg_desc' | 'stcg_asc' | 'ltcg_desc' | 'name_asc' | 'holding_desc';
