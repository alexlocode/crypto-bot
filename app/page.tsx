"use client";
import { getKline, calculateReversals } from "@/services/cryptoService";

const Home = () => {
  const sendMessage = async () => {
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            chat: {
              id: process.env.NEXT_PUBLIC_CHAT_ID,
            },
            text: "testing....",
          },
        }),
      });
    } catch (error) {
      console.log("Failed to send message", error);
    }
  };

  const getKlineAnalytics = async () => {
    const kline = await getKline({
      symbol: "NOTUSDT",
      interval: "30m",
      limit: "1500",
    });

    calculateReversals({
      combinedData: kline,
    });
  };

  return (
    <div className="bg-[#323232] min-h-screen">
      <div className="flex flex-col gap-5 pt-3 pl-3">
        <div className="bg-white p-5 rounded w-[200px] text-center">
          <div className="pb-4">telegram測試發訊息 0.1</div>
          <button
            className="py-1 px-3 border rounded bg-black text-white"
            onClick={sendMessage}
          >
            點點
          </button>
        </div>

        <div className="bg-white p-5 rounded w-[200px] text-center">
          <div className="pb-4">測試NOTUSDT</div>
          <button
            className="py-1 px-3 border rounded bg-black text-white"
            onClick={getKlineAnalytics}
          >
            click
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
