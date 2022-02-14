export interface Commit {
  authorName: string;
  body: string;
  authorDate: any;
  hash: string;
}

interface PairData {
  count: number;
  lastPair: Date | -1;
}

interface PairPartners {
  [key: string]: PairData;
}

export type Matrix = Record<string, PairPartners>;
