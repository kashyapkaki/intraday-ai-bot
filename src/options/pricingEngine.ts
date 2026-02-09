export function estimateOptionPrice(
    spot: number,
    strike: number,
    type: "CE" | "PE"
) {
    const intrinsic =
        type === "CE"
            ? Math.max(0, spot - strike)
            : Math.max(0, strike - spot);

    const timeValue = 90; // intraday premium base

    return Math.round(intrinsic + timeValue);
}
