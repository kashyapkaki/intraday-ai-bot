import { fetchPreviousDay, TOKENS } from "./data/market";
import { kite } from "./data/zerodha";
import { startLiveBreakoutEngine } from "./live/liveBreakoutEngine";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

async function run() {
  try {
    const prev = await fetchPreviousDay(TOKENS.NIFTY);
    console.log("Previous Day Levels:", prev);

    await startLiveBreakoutEngine(prev.high, prev.low);

  } catch (error) {
    console.error("Live Engine Failed:", error);
  }
}

run();