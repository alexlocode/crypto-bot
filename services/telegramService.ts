const TELEGRAM_BOT_TOKEN = process.env.TG_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

interface MessageObj {
  chatId: number | string;
  message: string;
}

export const sendMessage = (messageObj: MessageObj) => {
  return fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: messageObj.chatId,
      text: messageObj.message,
    }),
  });
};
