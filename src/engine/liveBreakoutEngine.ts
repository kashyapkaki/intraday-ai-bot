import { get5MinCandles, TOKENS } from "../data/market";
import { selectOptionStrike } from "./optionEngine";
import { sendMessage } from "../bot/telegram";

let triggered = false;

export async function startLiveBreakoutEngine(
  prevHigh: number,
  prevLow: number
) {
  console.log("🚀 Live Breakout Engine Started...");

  setInterval(async () => {
    if (triggered) return;

    const candles = await get5MinCandles(TOKENS.NIFTY);
    const last = candles[candles.length - 1];

    if (!last) return;

    const close = last.close;

    if (close > prevHigh) {
      triggered = true;

      const option = selectOptionStrike(close, "BUY");

      await sendMessage(`🚨 *LIVE BREAKOUT DETECTED — NIFTY*

Direction: *BUY*

🚀 Buy *${option?.symbol}*
Entry: ${close}
SL: 20 pts
Targets: 40 / 70
`);

      console.log("🚀 BUY breakout fired");
    }

    if (close < prevLow) {
      triggered = true;

      const option = selectOptionStrike(close, "SELL");

      await sendMessage(`🚨 *LIVE BREAKDOWN DETECTED — NIFTY*

Direction: *SELL*

🚀 Buy *${option?.symbol}*
Entry: ${close}
SL: 20 pts
Targets: 40 / 70
`);

      console.log("🚀 SELL breakdown fired");
    }

  }, 60 * 1000); // check every 1 min
}