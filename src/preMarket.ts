import { generateIntradayPlan } from "./engine/intradayEngine";
import { buildMessage } from "./engine/messageBuilder";
import { sendMessage } from "./bot/telegram";

async function run() {
    try {
        console.log("ENV CHECK", {
            TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN ? "SET" : "MISSING",
            CHAT_ID: process.env.CHAT_ID ? "SET" : "MISSING"
        });

        const plan = await generateIntradayPlan();
        const msg = buildMessage(plan);
        await sendMessage(msg);
        console.log("✅ Telegram message sent successfully");
    } catch (err: any) {
        console.error("⚠️ Bot aborted:", err.message);
    }
}

run();
