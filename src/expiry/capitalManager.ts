const CAPITAL = 20000;      // 🔥 Only 20k
const RISK_PER_TRADE = 0.02; // 2% risk (₹400 per trade)
const LOT_SIZE = 50;
const STOP_PERCENT = 0.5;   // 50% SL

export function calculatePositionSize(entryPrice: number) {

    const riskAmount = CAPITAL * RISK_PER_TRADE;

    const stopPrice = entryPrice * (1 - STOP_PERCENT);
    const stopDistance = entryPrice - stopPrice;

    const lossPerLot = stopDistance * LOT_SIZE;

    const calculatedLots = Math.floor(riskAmount / lossPerLot);

    const lots = Math.max(1, calculatedLots);

    return {
        lots: Math.max(lots, 1),
        riskAmount,
        stopDistance,
        lossPerLot
    };
}