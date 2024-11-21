import { MACD } from "technicalindicators";
import dayjs from "dayjs";
import {
  GetKlineProps,
  CalculateReversalsProps,
  OriginKline,
  klineObj,
  CombinedKline,
} from "@/interfaces";

const TAKEPROFIT: number = 0.005;
const STOPLOSS: number = 0.0015;

const calculateReversals = ({
  combinedData,
  takeProfit = TAKEPROFIT,
  stopLoss = STOPLOSS,
}: CalculateReversalsProps) => {
  let reversalCount = 0;
  let profitHitCount = 0;
  let lossHitCount = 0;
  let downwardProfitHitCount = 0;
  let downwardLossHitCount = 0;
  let ignoredReversalCount = 0;

  for (let i = 1; i < combinedData.length; i++) {
    const currentData = combinedData[i];
    const previousData = combinedData[i - 1];

    // 檢測 MACD 反轉條件：MACD Histogram 從負轉正（上升反轉）或從正轉負（下降反轉）
    if (
      (previousData.histogram < 0 && currentData.histogram > 0) ||
      (previousData.histogram > 0 && currentData.histogram < 0)
    ) {
      let recentReversal = false;

      // 檢查過去 6 根 K 線內是否已經有反轉
      for (let k = Math.max(0, i - 6); k < i; k++) {
        const pastData = combinedData[k];
        const earlierData = combinedData[k - 1];
        if (
          earlierData &&
          ((earlierData.histogram < 0 && pastData.histogram > 0) ||
            (earlierData.histogram > 0 && pastData.histogram < 0))
        ) {
          recentReversal = true;
          break;
        }
      }

      if (recentReversal) {
        ignoredReversalCount++;
        continue; // 不計算這次反轉
      }

      reversalCount++;

      // 如果是上升反轉，計算後續價格達到止盈或止損的次數
      if (previousData.histogram < 0 && currentData.histogram > 0) {
        const entryPrice = currentData.close;

        // 從反轉點向後遍歷，檢查是否碰到止盈或止損
        for (let j = i + 2; j < combinedData.length; j++) {
          const futureData = combinedData[j];
          const priceChange = (futureData.high - entryPrice) / entryPrice;
          const priceDrop = (entryPrice - futureData.low) / entryPrice;

          if (priceChange >= takeProfit) {
            profitHitCount++;
            break;
          } else if (priceDrop >= stopLoss) {
            lossHitCount++;
            break;
          }
        }
      }

      // 如果是下降反轉，計算後續價格達到止盈或止損的次數
      if (previousData.histogram > 0 && currentData.histogram < 0) {
        const entryPrice = currentData.close;

        // 從反轉點向後遍歷，檢查是否碰到止盈或止損
        for (let j = i + 2; j < combinedData.length; j++) {
          const futureData = combinedData[j];
          const priceChange = (entryPrice - futureData.low) / entryPrice;
          const priceDrop = (futureData.high - entryPrice) / entryPrice;

          if (priceChange >= takeProfit) {
            downwardProfitHitCount++;
            break;
          } else if (priceDrop >= stopLoss) {
            downwardLossHitCount++;
            break;
          }
        }
      }
    }
  }

  return {
    reversalCount,
    profitHitCount,
    lossHitCount,
    downwardProfitHitCount,
    downwardLossHitCount,
    ignoredReversalCount,
  };

  // console.log(`總反轉次數: ${reversalCount}`);
  // console.log(`上升止盈次數: ${profitHitCount}`);
  // console.log(`上升止損次數: ${lossHitCount}`);
  // console.log(`下降止盈次數: ${downwardProfitHitCount}`);
  // console.log(`下降止損次數: ${downwardLossHitCount}`);
  // console.log(`忽略的反轉次數: ${ignoredReversalCount}`);
};

// symbol=NOTUSDT&interval=30m&limit=500
const getKline = async ({
  symbol,
  interval = "30m",
  limit = "500",
}: GetKlineProps): Promise<CombinedKline[]> => {
  const res = await fetch(
    `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  );

  const data = await res.json();

  const klineData: klineObj[] = data.map((kline: OriginKline) => {
    return {
      openTime: dayjs(kline[0]).format("YYYY-MM-DD HH:mm"), // 開盤時間
      open: parseFloat(kline[1]), // 開盤
      high: parseFloat(kline[2]), // 高點
      low: parseFloat(kline[3]), //  低點
      close: parseFloat(kline[4]), //  收盤
      volume: parseFloat(kline[5]), //  成交量
      closeTime: dayjs(kline[6]).format("YYYY-MM-DD HH:mm"), //  收盤時間
    };
  });

  //  收盤價計算macd
  const closePrice = data.map((kline: OriginKline) => parseFloat(kline[4]));

  const macdResult = MACD.calculate({
    values: closePrice,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });

  //  因為macd計算關係，最開頭幾筆資料算不出來，所以進行切片
  const offset = klineData.length - macdResult.length;
  const alignedKlineData = klineData.slice(offset); // 從 offset 開始切片 klineData

  //  組合原始kline data + macd data
  const combinedData = alignedKlineData
    .map((kline: klineObj, index: number) => {
      const macd = macdResult[index] || {
        MACD: 0,
        signal: 0,
        histogram: 0,
      }; // 確保不會出現 undefined

      return {
        ...kline, // 將 kline 的屬性合併到這個物件中
        macd: macd.MACD as number,
        signal: macd.signal as number,
        histogram: macd.histogram as number,
      };
    })
    .filter((data) => data.histogram !== null);

  return combinedData;
};

const getCoinAnalytics = async ({ symbol, interval, limit }: GetKlineProps) => {
  const kline = await getKline({
    symbol,
    interval: interval,
    limit: limit,
  });

  const {
    reversalCount,
    profitHitCount,
    lossHitCount,
    downwardProfitHitCount,
    downwardLossHitCount,
    ignoredReversalCount,
  } = calculateReversals({
    combinedData: kline,
  });

  return `🚀🚀🚀 ${symbol} 🚀🚀🚀
  時間：${interval}
  筆數：${limit}
  
  總反轉次數：${reversalCount}
  上升止盈次數：${profitHitCount}
  上升止損次數：${lossHitCount}
  下降止盈次數：${downwardProfitHitCount}
  下降止損次數：${downwardLossHitCount}
  忽略的反轉次數：${ignoredReversalCount}
  `;
};

export { getKline, calculateReversals, getCoinAnalytics };
