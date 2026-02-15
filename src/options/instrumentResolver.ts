import { loadNFOInstruments } from "../data/zerodha";

export async function resolveNiftyOption(
    strike: number,
    type: "CE" | "PE"
) {
    const instruments = await loadNFOInstruments();

    const today = new Date();

    // Get nearest expiry >= today
    const expiries = [...new Set(
        instruments.map((i: any) => i.expiry.toISOString())
    )]
        .map(d => new Date(d))
        .filter(d => d >= today)
        .sort((a, b) => a.getTime() - b.getTime());

    if (!expiries.length) return null;

    const nearestExpiry = expiries[0];

    console.log(
        "📅 Using Expiry:",
        nearestExpiry.toLocaleDateString("en-IN")
    );

    const contract = instruments.find((i: any) =>
        i.strike === strike &&
        i.instrument_type === type &&
        new Date(i.expiry).getTime() === nearestExpiry.getTime()
    );

    if (!contract) return null;

    return contract.tradingsymbol;
}
