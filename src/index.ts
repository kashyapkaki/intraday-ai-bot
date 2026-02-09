import { fetchPreviousDay, get5MinCandles, TOKENS } from "./data/market";
import { strategyEngine } from "./strategies/strategyEngine";
import { generateSignalPlan } from "./signals/signalGenerator";
import { sendMessage } from "./bot/telegram";

async function main() {
    const prev = await fetchPreviousDay(TOKENS.NIFTY);
    const candles = await get5MinCandles(TOKENS.NIFTY);

    if (!candles || candles.length === 0) {
        console.log("⚠️ Market closed / No 5-min candles available yet.");
        return;
    }

    const plan = strategyEngine({
        prevClose: prev.close,
        todayOpen: candles[candles.length - 1].open,
        candles
    });

    const msg = generateSignalPlan(plan);

    console.log(msg);
    await sendMessage(msg);
}

main();
