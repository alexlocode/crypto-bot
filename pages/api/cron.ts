import { NextApiRequest, NextApiResponse } from "next";
import { sendMessage } from "@/services/telegramService";
import { handleAnalyticsAlert } from "@/services/cronService";

const TELEGRAM_GROUP_ID = "-4575240548";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 檢查 HTTP 方法
  // if (req.method !== "GET") {
  //   return res.status(405).json({ message: "Method Not Allowed" });
  // }

  let taskResult = "任務執行成功!";
  try {
    const { isReverse, message } = await handleAnalyticsAlert();

    if (isReverse) {
      await sendMessage({
        chatId: TELEGRAM_GROUP_ID,
        message: `價格觸發!
        幣種: NOTUSDT
        ${message}`,
      });
    } else {
      console.log(`${message}`);
    }
  } catch (error) {
    console.log(`error: ${error}`);
    taskResult = "任務執行失敗!";
    await sendMessage({
      chatId: TELEGRAM_GROUP_ID,
      message: "觸發錯誤，請檢查主控台log",
    });
  }

  res.status(200).json({ message: taskResult });
}
