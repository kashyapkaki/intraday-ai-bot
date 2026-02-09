export function calculateVWAP(candles: any[]) {
    let cumulativeTPV = 0;
    let cumulativeVolume = 0;

    for (const c of candles) {
        const typicalPrice = (c.high + c.low + c.close) / 3;
        cumulativeTPV += typicalPrice * (c.volume || 1);
        cumulativeVolume += c.volume || 1;
    }

    return cumulativeTPV / cumulativeVolume;
}
