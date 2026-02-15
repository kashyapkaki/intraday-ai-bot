import { getCurrentWeeklyExpiry } from "../data/global";
import { TradeDirection, OptionType } from "../types";

export function selectOptionStrike(
    spot: number,
    direction: TradeDirection
): { symbol: string, strike: number; type: OptionType } | null {

    const strike = Math.round(spot / 50) * 50;
    const expiry = getCurrentWeeklyExpiry();
    const type = direction === "BUY" ? "CE" : "PE";

    return {
        symbol: `NIFTY${expiry}${strike}${type}`,
        strike,
        type,
    };
}

export function buildOptionSymbol(
    strike: number,
    type: OptionType
): string {
    const expiry = getCurrentWeeklyExpiry();
    return `NFO:NIFTY${expiry}${strike}${type}`;
}
