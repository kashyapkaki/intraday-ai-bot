import { TradeDirection, OptionType } from "../types";

export function selectOptionStrike(
    spot: number,
    direction: TradeDirection
): { strike: number; type: OptionType } | null {

    if (direction === "NEUTRAL") return null;

    const base = Math.round(spot / 50) * 50;

    if (direction === "BUY") {
        return { strike: base + 50, type: "CE" };
    }

    return { strike: base - 50, type: "PE" };
}
