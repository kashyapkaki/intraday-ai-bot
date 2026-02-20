import { getCurrentWeeklyExpiry } from "../data/global";
import { kite } from "../data/zerodha";
import { calculatePositionSize } from "./capitalManager";
import { convertToHedge } from "./hedgeManager";
import {
    canEnterTrade,
    registerTradeEntry,
    registerTradeExit,
    registerRupeePnl
} from "./riskManager";

type PositionSide = "CE" | "PE";

interface Position {
    side: PositionSide;
    entryPrice: number;
    stopLoss: number;
    entryTime: number;
    lots: number;
    hedgedLots: number;
    strike: number;
}

let activePosition: Position | null = null;
let cooldownUntil = 0;

const TIME_STOP_MIN = 20;
const COOLDOWN_MIN = 10;

export async function handleSignal(
    side: PositionSide,
    price: number,
    strike: number
) {
    const now = Date.now();

    if (activePosition) return;
    if (now < cooldownUntil) return;
    if (!canEnterTrade()) return;

    const sizing = calculatePositionSize(price);
    const stopLoss = price - sizing.stopDistance;

    activePosition = {
        side,
        entryPrice: price,
        stopLoss,
        entryTime: now,
        lots: sizing.lots,
        hedgedLots: 0,
        strike
    };

    console.log(`🚀 ENTRY ${side}`);
    console.log(`Price: ${price.toFixed(2)}`);
    console.log(`Lots: ${sizing.lots}`);
    console.log(`🛑 StopLoss: ${stopLoss.toFixed(2)}`);

    const expiry = getCurrentWeeklyExpiry();

    const entrySymbol =
        `NFO:NIFTY${expiry}${strike}${side}`;

    // await kite.placeOrder("regular", {
    //     exchange: "NFO",
    //     tradingsymbol: entrySymbol.replace("NFO:", ""),
    //     transaction_type: "BUY",
    //     quantity: sizing.lots * 50,
    //     order_type: "MARKET",
    //     product: "MIS"
    // });

    // console.log("✅ Entry Order Placed:", entrySymbol);

    registerTradeEntry();
}

export async function managePosition(currentPrice: number) {
    if (!activePosition) return;

    const now = Date.now();

    const pnlPercent =
        (currentPrice - activePosition.entryPrice) /
        activePosition.entryPrice;

    // 🔹 First Hedge (80%)
    if (pnlPercent >= 0.8 && activePosition.hedgedLots === 0) {

        const hedgeLots = Math.max(1, Math.floor(activePosition.lots * 0.5));

        await convertToHedge(activePosition, currentPrice, hedgeLots);

        activePosition.hedgedLots += hedgeLots;
        activePosition.stopLoss = activePosition.entryPrice;

        console.log("🔒 Stop moved to Breakeven");
    }

    // 🔹 Second Hedge (120%)
    if (
        pnlPercent >= 1.2 &&
        activePosition.hedgedLots < activePosition.lots
    ) {
        const remaining =
            activePosition.lots - activePosition.hedgedLots;

        const hedgeLots = Math.max(1, Math.floor(remaining * 0.5));

        await convertToHedge(activePosition, currentPrice, hedgeLots);

        activePosition.hedgedLots += hedgeLots;
    }

    // 🔹 Hard Stop
    if (currentPrice <= activePosition.stopLoss) {
        exitPosition("StopLoss Hit", currentPrice);
        return;
    }

    // 🔹 Time Stop
    const minutesHeld =
        (now - activePosition.entryTime) / (1000 * 60);

    if (minutesHeld >= TIME_STOP_MIN) {
        exitPosition("Time Exit", currentPrice);
        return;
    }
}

async function exitPosition(reason: string, exitPrice: number) {
    if (!activePosition) return;

    const totalQty = activePosition.lots * 50;

    const pnl =
        (exitPrice - activePosition.entryPrice) * totalQty;

    console.log(`❌ EXIT ${activePosition.side} | ${reason}`);
    console.log(`💰 PnL: ₹${pnl.toFixed(0)}`);

    registerRupeePnl(pnl);

    const pnlPercent =
        pnl / (activePosition.entryPrice * totalQty);

    registerTradeExit(pnlPercent);

    cooldownUntil =
        Date.now() + COOLDOWN_MIN * 60 * 1000;

    const expiry = getCurrentWeeklyExpiry();

    const exitSymbol =
        `NFO:NIFTY${expiry}${activePosition.strike}${activePosition.side}`;

    // await kite.placeOrder("regular", {
    //     exchange: "NFO",
    //     tradingsymbol: exitSymbol.replace("NFO:", ""),
    //     transaction_type: "SELL",
    //     quantity: activePosition.lots * 50,
    //     order_type: "MARKET",
    //     product: "MIS"
    // });

    // console.log("✅ Exit Order Placed:", exitSymbol);

    activePosition = null;
}