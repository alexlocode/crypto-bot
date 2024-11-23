import { getKline } from "@/services/cryptoService";
import { CombinedKline } from "@/interfaces";

const isOppositeSigns = (num1: number, num2: number): boolean => {
  return (num1 > 0 && num2 < 0) || (num1 < 0 && num2 > 0);
};

const checkReverse = (kline: CombinedKline[]) => {
  const arr = [...kline];
  arr.pop();

  const isReverse = isOppositeSigns(
    arr[arr.length - 1].histogram,
    arr[arr.length - 2].histogram
  );

  if (isReverse) {
    return {
      isReverse,
      message: arr[arr.length - 1].histogram > 0 ? "做多反轉" : "做空反轉",
    };
  }

  return {
    isReverse,
    message: "目前暫無反轉",
  };
};

export const handleAnalyticsAlert = async () => {
  const res = await getKline({
    symbol: "NOTUSDT",
    interval: "30m",
    limit: "50",
  });

  console.log("res", res);

  const { isReverse, message } = checkReverse(res);

  return { isReverse, message };
};
