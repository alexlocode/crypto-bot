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

export type { TelegramMessage, MessageObj };
