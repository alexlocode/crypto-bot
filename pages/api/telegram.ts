import { NextApiRequest, NextApiResponse } from "next";
import type { TelegramMessage, MessageObj } from "@/interfaces";
import { getCoinAnalytics } from "@/services/cryptoService";

const TELEGRAM_BOT_TOKEN = process.env.TG_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const BOT_USERNAME = "@w04ru6_bot";

const sendMessage = (messageObj: MessageObj) => {
  return fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: messageObj.chatId,
      text: messageObj.message,
    }),
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed", req });
  }

  try {
    const body: TelegramMessage = req.body;
    const message = body?.message;
    if (message) {
      const chatId = message.chat.id;
      const text = message.text;

      const messageText = text || "";

      // 根據指令回應
      if (messageText.charAt(0) === "/") {
        const command = messageText.substr(1);

        switch (command) {
          case "test":
          case `test${BOT_USERNAME}`:
            await sendMessage({
              chatId,
              message: "里長測試!!!!!",
            });
            break;
          case "get_NOTUSDT_30m_500":
          case `get_NOTUSDT_30m_500${BOT_USERNAME}`:
            const NOTUSDT = await getCoinAnalytics({
              symbol: "NOTUSDT",
              interval: "30m",
              limit: "500",
            });
            await sendMessage({
              chatId,
              message: NOTUSDT,
            });
            break;
          case "get_WIFUSDT_30m_500":
          case `get_WIFUSDT_30m_500${BOT_USERNAME}`:
            const WIFUSDT = await getCoinAnalytics({
              symbol: "WIFUSDT",
              interval: "30m",
              limit: "500",
            });
            await sendMessage({
              chatId,
              message: WIFUSDT,
            });
            break;
          case "get_BOMEUSDT_30m_500":
          case `get_BOMEUSDT_30m_500${BOT_USERNAME}`:
            const BOMEUSDT = await getCoinAnalytics({
              symbol: "BOMEUSDT",
              interval: "30m",
              limit: "500",
            });
            await sendMessage({
              chatId,
              message: BOMEUSDT,
            });
            break;

          default:
            break;
        }
      }
    }

    res.status(200).json({ messageText: "success!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    await sendMessage({
      chatId: req.body.message.chat.id,
      message: `Error: ${error.message}`,
    });
    return res.status(200).json({ success: false, message: error.message });
  }
}
