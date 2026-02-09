export function decideStrategy(
    gap: string,
    prevHigh: number,
    prevLow: number,
    gift: number
) {
    if (gap === "GAP_UP") {
        return {
            bias: "Bearish Fade",
            direction: "SELL" as const,
            trade: `Sell below ${prevHigh}`,
            sl: prevHigh + 60,
            t1: prevLow + 50,
            t2: prevLow,
        };
    }

    if (gap === "GAP_DOWN") {
        return {
            bias: "Bullish Reversal",
            direction: "BUY" as const,
            trade: `Buy above ${prevLow}`,
            sl: prevLow - 60,
            t1: prevHigh - 50,
            t2: prevHigh,
        };
    }

    return {
        bias: "Range Breakout",
        direction: "NEUTRAL" as const,
        trade: `Buy above ${prevHigh} / Sell below ${prevLow}`,
        sl: 60,
        t1: 80,
        t2: 120,
    };
}
