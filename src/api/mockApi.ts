import type { Holding, CapitalGainsApiResponse } from '../types/harvesting';
import { MOCK_HOLDINGS } from '../data/holdingsData';
import { MOCK_CAPITAL_GAINS } from '../data/capitalGainsData';

const LATENCY_MS = 500;

export async function getHoldings(forceError = false): Promise<Holding[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check query param ?error=true or forceError flag
      const urlParams = new URLSearchParams(window.location.search);
      const isParamError = urlParams.get('error') === 'true';

      if (forceError || isParamError) {
        reject(new Error('Failed to fetch holdings data from server. (Simulated Error)'));
      } else {
        resolve(MOCK_HOLDINGS);
      }
    }, LATENCY_MS);
  });
}

export async function getCapitalGains(forceError = false): Promise<CapitalGainsApiResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const isParamError = urlParams.get('error') === 'true';

      if (forceError || isParamError) {
        reject(new Error('Failed to fetch capital gains data from server. (Simulated Error)'));
      } else {
        resolve(MOCK_CAPITAL_GAINS);
      }
    }, LATENCY_MS);
  });
}
