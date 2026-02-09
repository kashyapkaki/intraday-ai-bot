import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.KITE_API_KEY!;
const apiSecret = process.env.KITE_API_SECRET!;

export const kite = new KiteConnect({ api_key: apiKey });

export async function generateSession(requestToken: string) {
    const session = await kite.generateSession(requestToken, apiSecret);
    kite.setAccessToken(session.access_token);
    return session;
}

export function setAccessToken(token: string) {
    kite.setAccessToken(token);
}