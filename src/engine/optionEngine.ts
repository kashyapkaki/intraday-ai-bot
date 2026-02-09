export type Direction = "BUY" | "SELL" | "NEUTRAL";

export function selectOptionStrike(
    spot: number,
    direction: Direction
) {
    const atm = Math.round(spot / 50) * 50;

    if (direction === "BUY") {
        return {
            symbol: `NIFTY${atm}CE`,
            strike: atm,
            type: "CE"
        };
    }

    if (direction === "SELL") {
        return {
            symbol: `NIFTY${atm}PE`,
            strike: atm,
            type: "PE"
        };
    }

    return null;
}
