import { kite, generateSession } from "./data/zerodha";

console.log("Login here:");
console.log(kite.getLoginURL());
console.log("\nPaste request_token below:");

process.stdin.on("data", async (data) => {
    const token = data.toString().trim();
    const session = await generateSession(token);
    console.log("\nAccess Token:\n", session.access_token);
    process.exit(0);
});