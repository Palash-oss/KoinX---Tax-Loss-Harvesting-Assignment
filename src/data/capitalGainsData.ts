import type { CapitalGainsApiResponse } from '../types/harvesting';

export const MOCK_CAPITAL_GAINS: CapitalGainsApiResponse = {
  "capitalGains": {
    "stcg": {
      "profits": 70200.88,
      "losses": 1548.53
    },
    "ltcg": {
      "profits": 5020,
      "losses": 3050
    }
  }
};
