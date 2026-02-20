import { kite } from "../data/zerodha";
import { getCurrentWeeklyExpiry } from "../data/global";
import { startKiteStream } from "./kiteStream";
import { evaluateStrength } from "./strengthEngine";
import { handleSignal, managePosition } from "./positionManager";

export async function runExpiryGammaBot() {

    // 🔹 Fetch NIFTY Spot
    const ltp = await kite.getLTP(["NSE:NIFTY 50"]);
    const spot = ltp["NSE:NIFTY 50"].last_price;

    const atmStrike = Math.round(spot / 50) * 50;
    const expiry = getCurrentWeeklyExpiry();

    const ceSymbol = `NFO:NIFTY${expiry}${atmStrike}CE`;
    const peSymbol = `NFO:NIFTY${expiry}${atmStrike}PE`;

    console.log("🎯 ATM Strike:", atmStrike);
    console.log("📡 Subscribing:", ceSymbol, peSymbol);

    startKiteStream(ceSymbol, peSymbol, (ceData, peData) => {

        const ceScore = evaluateStrength(ceData, "CE");
        const peScore = evaluateStrength(peData, "PE");

        const now = new Date();
        const minutesNow = now.getHours() * 60 + now.getMinutes();

        const start = 12 * 60 + 15;
        const end = 14 * 60 + 45;

        if (minutesNow < start || minutesNow > end) return;

        if (ceScore >= 4 && peScore <= 1) {
            handleSignal("CE", ceData.price, atmStrike);
        }

        if (peScore >= 4 && ceScore <= 1) {
            handleSignal("PE", peData.price, atmStrike);
        }

        // Manage active position
        if (ceData.price) managePosition(ceData.price);
        if (peData.price) managePosition(peData.price);

    });
}

function isThursday() {
    const today = new Date().getDay();
    return today === 4; // Thursday
}

// Allow direct execution
if (require.main === module) {
    if (!isThursday()) {
        console.log("⛔ Not Expiry Day — Bot Stopped");
        process.exit(0);
    }
    runExpiryGammaBot().catch(console.error);
}