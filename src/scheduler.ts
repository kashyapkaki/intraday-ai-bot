import cron from "node-cron";
import { runLiveSignalEngine } from "./live/liveSignalEngine";

cron.schedule("*/5 9-15 * * 1-5", async () => {
    console.log("Running Live Signal Engine...");
    await runLiveSignalEngine();
});
