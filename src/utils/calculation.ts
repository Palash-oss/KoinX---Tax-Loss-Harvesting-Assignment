import type { CapitalGainsData, CalculatedCapitalGains, Holding } from '../types/harvesting';

/**
 * Calculates net gains and realised gains for a given CapitalGainsData object.
 */
export function calculateNetCapitalGains(data: CapitalGainsData): CalculatedCapitalGains {
  const stcgNet = data.stcg.profits - data.stcg.losses;
  const ltcgNet = data.ltcg.profits - data.ltcg.losses;
  const realisedGains = stcgNet + ltcgNet;

  return {
    stcg: {
      profits: data.stcg.profits,
      losses: data.stcg.losses,
      net: stcgNet,
    },
    ltcg: {
      profits: data.ltcg.profits,
      losses: data.ltcg.losses,
      net: ltcgNet,
    },
    realisedGains,
  };
}

/**
 * Recomputes After-Harvesting Capital Gains based on selected holding indices/coins.
 * For each selected holding:
 * - If stcg.gain > 0, add to stcg.profits. If stcg.gain < 0, add Math.abs(gain) to stcg.losses.
 * - If ltcg.gain > 0, add to ltcg.profits. If ltcg.gain < 0, add Math.abs(gain) to ltcg.losses.
 */
export function computePostHarvestingGains(
  initialGains: CapitalGainsData,
  holdings: Holding[],
  selectedCoinKeys: Set<string>
): CalculatedCapitalGains {
  let stcgProfits = initialGains.stcg.profits;
  let stcgLosses = initialGains.stcg.losses;
  let ltcgProfits = initialGains.ltcg.profits;
  let ltcgLosses = initialGains.ltcg.losses;

  holdings.forEach((holding, idx) => {
    // Unique identifier for each holding row (since coin names can repeat in mock data, e.g., USDC)
    const key = `${holding.coin}_${idx}`;
    if (selectedCoinKeys.has(key)) {
      // Short term gain adjustment
      if (holding.stcg.gain > 0) {
        stcgProfits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        stcgLosses += Math.abs(holding.stcg.gain);
      }

      // Long term gain adjustment
      if (holding.ltcg.gain > 0) {
        ltcgProfits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        ltcgLosses += Math.abs(holding.ltcg.gain);
      }
    }
  });

  const updatedData: CapitalGainsData = {
    stcg: { profits: stcgProfits, losses: stcgLosses },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses },
  };

  return calculateNetCapitalGains(updatedData);
}
