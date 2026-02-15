import axios from "axios";

export async function getGiftNiftyChange() {
    try {
        const res = await axios.get(
            "https://www.nseindia.com/api/allIndices",
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                },
            }
        );

        const nifty = res.data.data.find((x: any) =>
            x.index.includes("NIFTY 50")
        );

        return {
            last: nifty.last,
            change: nifty.change ?? 0,
            percent: nifty.pChange ?? 0
        };

    } catch (err) {
        return null;
    }
}

export function getCurrentWeeklyExpiry(): string {
    const now = new Date();

    // Find next Thursday
    const day = now.getDay();
    const diff = (4 - day + 7) % 7; // 4 = Thursday
    const nextThursday = new Date(now);
    nextThursday.setDate(now.getDate() + diff);

    const year = nextThursday.getFullYear().toString().slice(-2);
    const month = nextThursday.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const date = nextThursday.getDate().toString().padStart(2, "0");

    return `${year}${month}`;
}

