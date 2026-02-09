import { fetchPreviousDay, TOKENS } from "./data/market";
import { startLiveBreakoutEngine } from "./engine/liveBreakoutEngine";

async function run() {
  const prev = await fetchPreviousDay(TOKENS.NIFTY);

  console.log("📊 Previous Day Levels:", prev);

  await startLiveBreakoutEngine(prev.high, prev.low);
}

run();