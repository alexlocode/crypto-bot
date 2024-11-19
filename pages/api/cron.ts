import { NextApiRequest, NextApiResponse } from "next";

const TELEGRAM_BOT_TOKEN = process.env.TG_TOKEN; // 從 BotFather 獲取
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

interface MessageObj {
  chatId: number | string;
  message: string;
}

// const testCornTGMessage = async () => {
//   await fetch("/api/telegram", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       message: {
//         chat: {
//           id: process.env.NEXT_PUBLIC_CHAT_ID,
//         },
//         text: "測試排程",
//       },
//     }),
//   });
// };

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
  // 檢查 HTTP 方法
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let taskResult = "任務執行成功!";
  try {
    sendMessage({
      chatId: process.env.NEXT_PUBLIC_CHAT_ID as string,
      message: "測試排程",
    });
  } catch (error) {
    console.log(`error: ${error}`);
    taskResult = "任務執行失敗!";
  }

  res.status(200).json({ message: taskResult });
}
