import { kite, setAccessToken } from "./zerodha";
import dotenv from "dotenv";

dotenv.config();
setAccessToken(process.env.KITE_ACCESS_TOKEN!);

export const TOKENS = {
    NIFTY: 256265,
    BANKNIFTY: 260105
};

export async function fetchPreviousDay(token: number) {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 7);

    const data = await kite.getHistoricalData(
        token,
        "day",
        from,
        to,
        false,
        false
    );

    if (!data || data.length < 2) {
        throw new Error("Not enough historical candle data received from Zerodha");
    }

    return data[data.length - 2]; // confirmed previous trading day candle
}

/* ✅ ADD THIS */
export async function getNiftyPrevDay() {
    return fetchPreviousDay(TOKENS.NIFTY);
}

/* (optional future use) */
export async function getBankNiftyPrevDay() {
    return fetchPreviousDay(TOKENS.BANKNIFTY);
}

export async function get5MinCandles(token: number) {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 2);

    return kite.getHistoricalData(
        token,
        "5minute",
        from,
        to,
        false,
        false
    );
}
