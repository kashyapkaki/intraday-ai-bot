export function gapStrategy(prevClose: number, todayOpen: number) {
    const gapPercent = ((todayOpen - prevClose) / prevClose) * 100;

    if (Math.abs(gapPercent) < 0.3) return null;

    return {
        type: gapPercent > 0 ? "GAP_UP" : "GAP_DOWN",
        gapPercent: gapPercent.toFixed(2)
    };
}
