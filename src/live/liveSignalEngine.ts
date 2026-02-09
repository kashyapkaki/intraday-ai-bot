import { get5MinCandles, TOKENS } from "../data/market";
import { sendMessage } from "../bot/telegram";

let lastSignalTime = 0;

export async function runLiveSignalEngine() {
    const candles = await get5MinCandles(TOKENS.NIFTY);

    const latest = candles[candles.length - 1];
    const prev = candles[candles.length - 2];

    if (!latest || !prev) return;

    // Breakout detection
    if (latest.close > prev.high && Date.now() - lastSignalTime > 15 * 60 * 1000) {
        lastSignalTime = Date.now();

        await sendMessage(`🚀 *LIVE BREAKOUT SIGNAL — NIFTY*

Buy above: ${prev.high}
Current Price: ${latest.close}

SL: ${latest.close - 40}
Targets: ${latest.close + 60} / ${latest.close + 100}
`);
    }

    if (latest.close < prev.low && Date.now() - lastSignalTime > 15 * 60 * 1000) {
        lastSignalTime = Date.now();

        await sendMessage(`🔻 *LIVE BREAKDOWN SIGNAL — NIFTY*

Sell below: ${prev.low}
Current Price: ${latest.close}

SL: ${latest.close + 40}
Targets: ${latest.close - 60} / ${latest.close - 100}
`);
    }
}
