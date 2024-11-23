export interface TelegramMessage {
  message: {
    chat: { id: number };
    text: string;
  };
}

export interface MessageObj {
  chatId: number;
  message: string;
}

export interface OriginKline extends Array<string | number> {
  0: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: number;
  7: string;
  8: number;
  9: string;
  10: string;
  11: string;
}

export interface klineObj {
  openTime: string;
  closeTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CombinedKline extends klineObj {
  macd: number;
  signal: number;
  histogram: number;
}

export interface GetKlineProps {
  symbol: string;
  interval?: string;
  limit?: string;
}

export interface CalculateReversalsProps {
  combinedData: CombinedKline[];
  takeProfit?: number;
  stopLoss?: number;
}

export interface CoinAnalytics {
  symbol: string;
  interval?: string;
  limit?: string;
  reversalCount?: number;
  profitHitCount?: number;
  lossHitCount?: number;
  downwardProfitHitCount?: number;
  downwardLossHitCount?: number;
  ignoredReversalCount?: number;
}
