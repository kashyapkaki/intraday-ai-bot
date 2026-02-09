import { StrategyResult, OptionTrade } from "../types";
import { selectOptionStrike } from "./optionEngine";
import { estimateOptionPrice } from "./pricingEngine";

export function buildOptionTrade(
    spot: number,
    strategy: StrategyResult
): OptionTrade | null {

    const selected = selectOptionStrike(spot, strategy.direction);

    if (!selected) return null;

    const entry = estimateOptionPrice(
        spot,
        selected.strike,
        selected.type
    );

    return {
        symbol: "NIFTY",
        strike: selected.strike,
        type: selected.type,
        entry,
        sl: entry - 20,
        t1: entry + 30,
        t2: entry + 60,
    };
}
