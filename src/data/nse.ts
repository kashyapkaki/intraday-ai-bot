import axios from "axios";

export async function fetchPrevDayNifty() {
    const url =
        "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050";

    const response = await axios.get(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "application/json",
            Referer: "https://www.nseindia.com/",
        },
    });

    const data = response.data.data[0];

    return {
        open: data.open,
        high: data.dayHigh,
        low: data.dayLow,
        close: data.previousClose,
    };
}
