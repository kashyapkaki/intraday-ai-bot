import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN!;
const chatId = process.env.TELEGRAM_CHAT_ID!;

const bot = new TelegramBot(token, { polling: false });

export async function sendMessage(message: string) {
    await bot.sendMessage(chatId, message, {
        parse_mode: "Markdown"
    });
}
