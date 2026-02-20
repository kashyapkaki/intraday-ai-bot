import { getGiftNiftyChange } from "../data/global";
import { fetchPrevDayNifty } from "../data/nse";
import { selectOptionStrike } from "../options/optionEngine";
import { computeInstitutionalBias } from "./institutionalBias";
import { decideStrategy } from "./strategyEngine";

export async function generateIntradayPlan() {
    const gift = await getGiftNiftyChange();
    if (!gift) throw new Error("Gift Nifty data unavailable");

    const prev = await fetchPrevDayNifty();

    // 🔹 Step 1: Institutional Bias
    const institutionalBias = await computeInstitutionalBias();

    // 🔹 Step 2: Gap Calculation
    const gapPercent =
        ((gift.last - prev.close) / prev.close) * 100;

    let gapType: "GAP_UP" | "GAP_DOWN" | "FLAT" = "FLAT";

    if (gapPercent > 0.5) gapType = "GAP_UP";
    else if (gapPercent < -0.5) gapType = "GAP_DOWN";

    // 🔹 Step 3: Base Strategy
    const baseStrategy = decideStrategy(
        gapType,
        prev.high,
        prev.low,
        gift.last
    );

    // 🔹 Step 4: Adjust Strategy Based On Institutional Bias
    let adjustedStrategy = { ...baseStrategy };

    if (institutionalBias.totalScore >= 2) {
        adjustedStrategy.direction = "BUY";
        adjustedStrategy.bias = "Bullish Breakout";
    }
    else if (institutionalBias.totalScore <= -2) {
        adjustedStrategy.direction = "SELL";
        adjustedStrategy.bias = "Bearish Breakdown";
    }

    // 🔹 Step 5: Option Selection (Directional Only)
    let option = null;

    if (
        adjustedStrategy.direction === "BUY" ||
        adjustedStrategy.direction === "SELL"
    ) {
        option = selectOptionStrike(
            gift.last,
            adjustedStrategy.direction
        );
    }

    // 🔹 Step 6: Range Premium Sell Logic
    let optionSuggestion = null;

    if (
        gapType === "FLAT" &&
        institutionalBias.totalScore >= -2 &&
        institutionalBias.totalScore <= 2
    ) {
        optionSuggestion = {
            type: "RANGE_PREMIUM_SELL",
            strategy: "Sell ATM Straddle or Iron Condor",
            reason:
                "Low gap + Neutral institutional bias → High probability range day"
        };
    }

    // 🔹 Step 7: Expansion Model
    const prevRange = prev.high - prev.low;

    let expansion = "Normal Volatility";

    if (
        institutionalBias.totalScore >= 3 &&
        gapPercent > 0.4 &&
        prevRange < 250
    ) {
        expansion = "High Upside Expansion Day";
    }
    else if (
        institutionalBias.totalScore <= -3 &&
        gapPercent < -0.4 &&
        prevRange < 250
    ) {
        expansion = "High Downside Expansion Day";
    }
    else if (institutionalBias.totalScore >= 3) {
        expansion = "Moderate Upside Expansion";
    }
    else if (institutionalBias.totalScore <= -3) {
        expansion = "Moderate Downside Expansion";
    }

    // 🔹 Step 8: Confidence Scaling
    let confidence = 60 + (Math.abs(institutionalBias.totalScore) * 5);

    if (institutionalBias.totalScore >= 4) confidence = 90;
    else if (institutionalBias.totalScore >= 3) confidence = 85;
    else if (institutionalBias.totalScore <= -4) confidence = 90;
    else if (institutionalBias.totalScore <= -3) confidence = 85;

    return {
        prev,
        gift,
        gap: {
            type: gapType,
            percent: gapPercent,
        },
        strategy: adjustedStrategy,
        option,
        optionSuggestion,
        institutionalBias,
        confidence,
        expansion
    };
}
