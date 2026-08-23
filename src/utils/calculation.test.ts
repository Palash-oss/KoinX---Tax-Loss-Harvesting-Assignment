import { calculateNetCapitalGains, computePostHarvestingGains } from './calculation';
import type { CapitalGainsData, Holding } from '../types/harvesting';

// Worked Example Test from prompt requirement
const initialGains: CapitalGainsData = {
  stcg: { profits: 100, losses: 500 },
  ltcg: { profits: 1200, losses: 100 },
};

const preResult = calculateNetCapitalGains(initialGains);
console.log('Pre-harvesting realized gains (expected 700):', preResult.realisedGains);
if (preResult.realisedGains !== 700) {
  throw new Error(`Expected pre-harvesting 700, got ${preResult.realisedGains}`);
}

const mockEthHolding: Holding = {
  coin: 'ETH',
  coinName: 'Ethereum',
  logo: '',
  currentPrice: 2000,
  totalHolding: 1,
  averageBuyPrice: 1500,
  stcg: { balance: 1, gain: 500 },
  ltcg: { balance: 0, gain: -1000 },
};

const selectedSet = new Set<string>(['ETH_0']);
const postResult = computePostHarvestingGains(initialGains, [mockEthHolding], selectedSet);

console.log('Post-harvesting STCG Profits (expected 600):', postResult.stcg.profits);
console.log('Post-harvesting STCG Losses (expected 500):', postResult.stcg.losses);
console.log('Post-harvesting LTCG Profits (expected 1200):', postResult.ltcg.profits);
console.log('Post-harvesting LTCG Losses (expected 1100):', postResult.ltcg.losses);
console.log('Post-harvesting Realized Gains (expected 200):', postResult.realisedGains);

if (postResult.realisedGains !== 200) {
  throw new Error(`Expected post-harvesting 200, got ${postResult.realisedGains}`);
}

console.log('✅ Worked Example Verification Passed Perfectly!');
