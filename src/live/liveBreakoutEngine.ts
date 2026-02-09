import { kite } from "../data/zerodha";
import { sendMessage } from "../bot/telegram";


const NIFTY = 256265;


let lastSignal: "BUY" | "SELL" | null = null;


export async function runLiveBreakoutEngine() {
    console.log("🚀 Live Breakout Engine Started...");


    setInterval(async () => {
        try {
            const to = new Date();
            const from = new Date();
            from.setMinutes(from.getMinutes() - 30);


            const candles = await kite.getHistoricalData(
                NIFTY,
                "5minute",
                from,
                to,
                false,
                false
            );


            if (!candles.length) return;


            const prev = candles[candles.length - 2];
            const curr = candles[candles.length - 1];


            const highBreak = curr.close > prev.high;
            const lowBreak = curr.close < prev.low;


            if (highBreak && lastSignal !== "BUY") {
                lastSignal = "BUY";
                await sendMessage(
                    `🚀 *LIVE BREAKOUT ALERT*\n\nBUY NIFTY ABOVE ${prev.high}\nSL: ${prev.low}\nTargets: +40 / +70`
                );
            }


            if (lowBreak && lastSignal !== "SELL") {
                lastSignal = "SELL";
                await sendMessage(
                    `🚀 *LIVE BREAKDOWN ALERT*\n\nSELL NIFTY BELOW ${prev.low}\nSL: ${prev.high}\nTargets: +40 / +70`
                );
            }
        } catch (err) {
            console.error("Live engine error", err);
        }
    }, 5 * 60 * 1000); // every 5 minutes
}