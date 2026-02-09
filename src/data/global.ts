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
