export function evaluateStrength(data: any, type: "CE" | "PE") {
    let score = 0;

    if (data.price > data.vwap) score++;

    if (type === "CE" && data.rsi > 60) score++;
    if (type === "PE" && data.rsi < 40) score++;

    if (data.volume > data.avgVolume * 1.8) score++;

    if (data.range > data.avgRange * 1.5) score++;

    if (Math.abs(data.roc10) > 0.8) score++;

    return score;
}