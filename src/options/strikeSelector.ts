export function getNearestStrike(price: number, step = 50) {
    return Math.round(price / step) * step;
}

export function selectOptionStrike(
    niftyPrice: number,
    direction: "BUY" | "SELL" | "NEUTRAL"
) {
    const atm = getNearestStrike(niftyPrice);

    if (direction === "BUY") {
        return {
            strike: atm,
            type: "CE",
            symbol: `NIFTY${atm}CE`,
        };
    }

    if (direction === "SELL") {
        return {
            strike: atm,
            type: "PE",
            symbol: `NIFTY${atm}PE`,
        };
    }

    return null;
}
