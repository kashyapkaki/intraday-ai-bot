import { kite } from "../data/zerodha";
import { getCurrentWeeklyExpiry } from "../data/global";

function roundTo50(value: number) {
    return Math.round(value / 50) * 50;
}

function calculateDynamicGap(premium: number): number {

    let multiplier = 1.5;

    if (premium < 80) multiplier = 1.2;
    else if (premium > 150) multiplier = 2.0;

    const rawGap = premium * multiplier;

    return roundTo50(rawGap);
}

export async function convertToHedge(
    position: any,
    currentPrice: number,
    hedgeLots: number
) {
    const dynamicGap = calculateDynamicGap(currentPrice);

    const hedgeStrike =
        position.side === "CE"
            ? position.strike + dynamicGap
            : position.strike - dynamicGap;

    const expiry = getCurrentWeeklyExpiry();

    const hedgeSymbol =
        `NFO:NIFTY${expiry}${hedgeStrike}${position.side}`;

    const quantity = hedgeLots * 50;

    console.log("🛡 Dynamic Partial Hedge");
    console.log("Premium:", currentPrice.toFixed(2));
    console.log("Gap:", dynamicGap);
    console.log("Hedge Strike:", hedgeStrike);
    console.log("Hedge Lots:", hedgeLots);
    console.log("Quantity:", quantity);

    /*
    // 🔴 Uncomment for live orders
    await kite.placeOrder("regular", {
        exchange: "NFO",
        tradingsymbol: hedgeSymbol.replace("NFO:", ""),
        transaction_type: "SELL",
        quantity: hedgeLots * 50,
        order_type: "MARKET",
        product: "MIS"
    });
    */
}