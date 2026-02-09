import { getGiftNiftyChange } from "../data/global";
import { fetchPrevDayNifty } from "../data/nse";
import { selectOptionStrike } from "./optionEngine";
import { decideStrategy } from "./strategyEngine";

export async function generateIntradayPlan() {
    const gift = await getGiftNiftyChange();
    if (!gift) throw new Error("Gift Nifty data unavailable");

    const prev = await fetchPrevDayNifty();

    const gapPercent =
        ((gift.last - prev.close) / prev.close) * 100;

    let gapType = "FLAT";

    if (gapPercent > 0.5) gapType = "GAP_UP";
    else if (gapPercent < -0.5) gapType = "GAP_DOWN";

    const strategy = decideStrategy(
        gapType,
        prev.high,
        prev.low,
        gift.last
    );

    const option = selectOptionStrike(
        gift.last,
        strategy.direction
    );

    return {
        prev,
        gift,
        gap: {
            type: gapType,
            percent: gapPercent,
        },
        strategy,
        option
    };
}
