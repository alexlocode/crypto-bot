import { NextApiRequest, NextApiResponse } from "next";

const testCornTGMessage = async () => {
  await fetch("/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        chat: {
          id: process.env.NEXT_PUBLIC_CHAT_ID,
        },
        text: "阿是在點什麼拉",
      },
    }),
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 檢查 HTTP 方法
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 執行任務邏輯
  console.log(`[${new Date().toISOString()}] Running scheduled task...`);

  let taskResult = "任務執行成功!";
  try {
    testCornTGMessage();
  } catch (error) {
    console.log(`error: ${error}`);
    taskResult = "任務執行失敗!";
  }

  res.status(200).json({ message: taskResult });
}
