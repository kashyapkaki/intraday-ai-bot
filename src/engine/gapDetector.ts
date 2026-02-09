export function detectGap(prevClose: number, gift: number) {
    const diff = gift - prevClose;
    const percent = (diff / prevClose) * 100;

    if (percent > 0.35)
        return { type: "GAP_UP", percent };

    if (percent < -0.35)
        return { type: "GAP_DOWN", percent };

    return { type: "FLAT", percent };
}
