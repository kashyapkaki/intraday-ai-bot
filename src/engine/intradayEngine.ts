import { getNiftyPrevDay } from "../data/market";
import { getGiftNiftyChange } from "../data/global";
import { detectGap } from "./gapDetector";
import { decideStrategy } from "./strategyEngine";
import { buildMessage } from "./messageBuilder";
import { buildOptionTrade } from "../options/optionTradeBuilder";

export type TradeDirection = "BUY" | "SELL" | "NEUTRAL";

export async function generateIntradayPlan() {
    const prev = await getNiftyPrevDay();
    const gift = await getGiftNiftyChange();

    if (!prev) {
        throw new Error("Previous day candle missing. Market closed / holiday / API delay.");
    }
    if (!gift) throw new Error("Global data fetch failed");

    const gap = detectGap(prev.close, gift.last);

    const strategy = decideStrategy(
        gap.type,
        prev.high,
        prev.low,
        gift.last
    );

    const optionTrade = buildOptionTrade(gift.last, strategy);

    const message = buildMessage({
        prev,
        gift,
        gap,
        strategy,
        optionTrade
    });

    return message;
}
