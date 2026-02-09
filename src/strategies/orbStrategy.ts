export function orbStrategy(candles: any[]) {
    const openingRange = candles.slice(0, 3); // First 15 mins (3 × 5min)

    const high = Math.max(...openingRange.map(c => c.high));
    const low = Math.min(...openingRange.map(c => c.low));

    return {
        buyAbove: high,
        sellBelow: low,
        slBuy: low,
        slSell: high
    };
}
