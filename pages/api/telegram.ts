import { NextApiRequest, NextApiResponse } from "next";

const TELEGRAM_BOT_TOKEN = process.env.TG_TOKEN; // 從 BotFather 獲取
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

interface TelegramMessage {
  message: {
    chat: { id: number };
    text: string;
  };
}

interface MessageObj {
  chatId: number;
  message: string;
}

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
  console.log("req", req);
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed", req });
  }

  try {
    const body: TelegramMessage = req.body;
    const chatId = body.message.chat.id;
    const text = body.message.text;

    const messageText = text || "";

    // 根據指令回應
    if (messageText.charAt(0) === "/") {
      const command = messageText.substr(1);

      switch (command) {
        case "test":
          sendMessage({
            chatId,
            message: "里長測試!!!!!",
          });

        default:
          sendMessage({
            chatId,
            message: "沒有這個指令",
          });
      }
    } else {
      sendMessage({
        chatId,
        message: `自動回話: ${messageText}`,
      });
    }

    res.status(200).json({ messageText: "success!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
