import axios from "axios";

export async function fetchInstitutionalData() {
    try {
        // NSE Option Chain API
        const response = await axios.get(
            "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY",
            {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "application/json"
                }
            }
        );

        const data = response.data;

        const pcr = data.records?.totalPutOI / data.records?.totalCallOI;

        return {
            indexPCR: pcr
        };
    } catch (error) {
        console.error("Failed to fetch institutional data:", error);
        return {
            indexPCR: 1
        };
    }
}
