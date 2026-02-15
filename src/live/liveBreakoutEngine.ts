import { createTicker, kite } from "../data/zerodha";
import { sendMessage } from "../bot/telegram";
import { TOKENS } from "../data/market";
import { buildOptionSymbol, selectOptionStrike } from "../options/optionEngine";
import { resolveNiftyOption } from "../options/instrumentResolver";

let triggered = false;

let breakoutStartTime: number | null = null;
let breakdownStartTime: number | null = null;

const SUSTAIN_DURATION = 10 * 1000; // 10 seconds


export async function startLiveBreakoutEngine(
    prevHigh: number,
    prevLow: number
) {
    console.log("🚀 Live Breakout Engine (WebSocket Mode) Started");

    setTimeout(async () => {
        console.log("Simulating breakout...");
        await handleBreakout("BUY", prevHigh + 20);
    }, 5000);

    const ticker = createTicker();

    ticker.on("ticks", async (ticks: any[]) => {
        if (triggered) return;

        const niftyTick = ticks.find(
            (t) => t.instrument_token === TOKENS.NIFTY
        );

        if (!niftyTick) return;

        const spot = niftyTick.last_price;
        const now = Date.now();

        // 🔥 BREAKOUT (Above PDH)
        if (spot > prevHigh) {

            if (!breakoutStartTime) {
                breakoutStartTime = now;
                console.log("Breakout detected, waiting sustain...");
            }

            if (now - breakoutStartTime >= SUSTAIN_DURATION) {
                triggered = true;
                await handleBreakout("BUY", spot);
            }

        } else {
            breakoutStartTime = null;
        }

        // 🔥 BREAKDOWN (Below PDL)
        if (spot < prevLow) {

            if (!breakdownStartTime) {
                breakdownStartTime = now;
                console.log("Breakdown detected, waiting sustain...");
            }

            if (now - breakdownStartTime >= SUSTAIN_DURATION) {
                triggered = true;
                await handleBreakout("SELL", spot);
            }

        } else {
            breakdownStartTime = null;
        }
    });

    ticker.on("connect", () => {
        console.log("✅ WebSocket Connected");
        ticker.subscribe([TOKENS.NIFTY]);
        ticker.setMode(ticker.modeFull, [TOKENS.NIFTY]);
    });

    ticker.connect();
}

async function handleBreakout(direction: "BUY" | "SELL", spot: number) {

    const option = selectOptionStrike(spot, direction);
    if (!option) return;

    const tradingsymbol = await resolveNiftyOption(
        option.strike,
        option.type
    );

    if (!tradingsymbol) {
        console.error("❌ Option contract not found");
        return;
    }

    const symbol = `NFO:${tradingsymbol}`;

    console.log("Symbol built:", symbol);

    try {
        const ltpData = await kite.getLTP([symbol]);

        if (!ltpData || !ltpData[symbol]) {
            console.error("No LTP data returned for", symbol);
            return;
        }

        const premium = ltpData[symbol].last_price;

        console.log("Premium:", premium);

        // Risk model (25% SL, 40% & 80% targets)
        const sl = Math.round(premium * 0.75);
        const t1 = Math.round(premium * 1.4);
        const t2 = Math.round(premium * 1.8);

        await sendMessage(`
🚨 LIVE BREAKOUT ALERT — NIFTY

Direction: ${direction}
Spot: ${spot}

Strike: ${option.strike} ${option.type}
Symbol: ${symbol}

Entry: ${premium}
Stop Loss: ${sl}

Target 1: ${t1}
Target 2: ${t2}

⚡ Real-Time Zerodha Premium Based Alert Built With 💙 By Kashyap
    `);

        console.log("🔥 Breakout Alert Sent:", symbol);

    } catch (err) {
        console.error("Error fetching LTP:", err);
    }
}

function buildOptionTradePlan(premium: number) {
    return {
        sl: Math.round(premium * 0.75),       // 25% SL
        t1: Math.round(premium * 1.4),        // 40% gain
        t2: Math.round(premium * 1.8),        // 80% gain
    };
}

