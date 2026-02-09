import { generateIntradayPlan } from "./engine/intradayEngine";
import { buildMessage } from "./engine/messageBuilder";
import { sendMessage } from "./bot/telegram";

async function run() {
    try {
        const plan = await generateIntradayPlan();
        const msg = buildMessage(plan);
        await sendMessage(msg);
        console.log("✅ Telegram message sent successfully");
    } catch (err: any) {
        console.error("⚠️ Bot aborted:", err.message);
    }
}

run();
