export function generateSignalPlan(data: any) {
    return `
📊 INTRADAY TRADE PLAN — NIFTY

Gap Status: ${data.gap ? data.gap.type + " (" + data.gap.gapPercent + "%)" : "NO GAP"}

Opening Range:
High: ${data.orb.buyAbove.toFixed(2)}
Low: ${data.orb.sellBelow.toFixed(2)}

VWAP: ${data.vwap.toFixed(2)}

Buy Setup:
Buy above ${data.orb.buyAbove.toFixed(2)}
SL: ${data.orb.slBuy.toFixed(2)}
Targets: +40 / +70 / +100

Sell Setup:
Sell below ${data.orb.sellBelow.toFixed(2)}
SL: ${data.orb.slSell.toFixed(2)}
Targets: -40 / -70 / -100

Trade only after 9:30 AM candle close.
`;
}
