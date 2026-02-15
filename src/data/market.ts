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

    if (!data || data.length === 0) {
        throw new Error("No historical data received");
    }

    const lastCandle = data[data.length - 1];
    const today = new Date();

    const isToday =
        new Date(lastCandle.date).toDateString() ===
        today.toDateString();

    return isToday
        ? data[data.length - 2]
        : lastCandle;
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
