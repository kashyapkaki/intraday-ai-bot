export type TradeDirection = "BUY" | "SELL" | "NEUTRAL";

export type OptionType = "CE" | "PE";

export interface StrategyResult {
    bias: string;
    direction: TradeDirection;
    trade: string;
    sl: number;
    t1: number;
    t2: number;
}

export interface OptionTrade {
    symbol: string;
    strike: number;
    type: OptionType;
    entry: number;
    sl: number;
    t1: number;
    t2: number;
}
