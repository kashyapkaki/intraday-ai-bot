import { orbStrategy } from "./orbStrategy";
import { gapStrategy } from "./gapStrategy";
import { calculateVWAP } from "../indicators/vwap";

export function strategyEngine({
    prevClose,
    todayOpen,
    candles
}: {
    prevClose: number;
    todayOpen: number;
    candles: any[];
}) {
    const gap = gapStrategy(prevClose, todayOpen);
    const orb = orbStrategy(candles);
    const vwap = calculateVWAP(candles);

    return { gap, orb, vwap };
}
