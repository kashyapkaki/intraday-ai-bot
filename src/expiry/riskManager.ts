let tradesToday = 0;
let consecutiveLosses = 0;
let dailyPnl = 0;
let tradingLocked = false;

const MAX_TRADES_PER_DAY = 5;
const MAX_CONSECUTIVE_LOSS = 3;
const DAILY_MAX_LOSS = -20000;
const DAILY_PROFIT_TARGET = 15000;   // 🔥 CHANGE THIS VALUE

export function canEnterTrade(): boolean {

    if (tradingLocked) {
        console.log("⛔ Trading Locked For Today");
        return false;
    }

    if (tradesToday >= MAX_TRADES_PER_DAY) {
        console.log("⛔ Max Trades Reached");
        return false;
    }

    if (consecutiveLosses >= MAX_CONSECUTIVE_LOSS) {
        console.log("⛔ Too Many Consecutive Losses");
        tradingLocked = true;
        return false;
    }

    if (dailyPnl <= DAILY_MAX_LOSS) {
        console.log("⛔ Daily Max Loss Hit");
        tradingLocked = true;
        return false;
    }

    if (dailyPnl >= DAILY_PROFIT_TARGET) {
        console.log("🏆 Daily Profit Target Achieved");
        tradingLocked = true;
        return false;
    }

    return true;
}

export function registerTradeEntry() {
    tradesToday++;
}

export function registerTradeExit(pnlPercent: number) {

    // Convert % to rupees handled from positionManager
    // So we do nothing here with %

    if (pnlPercent < 0) {
        consecutiveLosses++;
    } else {
        consecutiveLosses = 0;
    }
}

// 🔥 NEW FUNCTION — register actual rupee pnl
export function registerRupeePnl(pnl: number) {

    dailyPnl += pnl;

    console.log(`📊 Daily PnL: ₹${dailyPnl.toFixed(0)}`);

    if (dailyPnl >= DAILY_PROFIT_TARGET) {
        console.log("🏆 Daily Target Hit — Locking Trading");
        tradingLocked = true;
    }

    if (dailyPnl <= DAILY_MAX_LOSS) {
        console.log("🛑 Daily Loss Limit Hit — Locking Trading");
        tradingLocked = true;
    }
}

export function resetDailyStats() {
    tradesToday = 0;
    consecutiveLosses = 0;
    dailyPnl = 0;
    tradingLocked = false;
}