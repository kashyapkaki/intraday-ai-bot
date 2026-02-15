import { KiteConnect, KiteTicker } from "kiteconnect";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.KITE_API_KEY!;
const apiSecret = process.env.KITE_API_SECRET!;
const accessToken = process.env.KITE_ACCESS_TOKEN!;

export const kite = new KiteConnect({ api_key: apiKey });

if (accessToken) {
    kite.setAccessToken(accessToken);
}

export async function generateSession(requestToken: string) {
    const session = await kite.generateSession(requestToken, apiSecret);
    kite.setAccessToken(session.access_token);
    return session;
}

export function setAccessToken(token: string) {
    kite.setAccessToken(token);
}

export function createTicker() {
    return new KiteTicker({
        api_key: apiKey,
        access_token: accessToken,
    });
}
