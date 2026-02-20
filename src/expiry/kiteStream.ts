import { createTicker, loadNFOInstruments } from "../data/zerodha";

type OptionState = {
    price: number;
    volume: number;

    vwap: number;

    totalValue: number;
    totalQty: number;

    prices: number[];
    volumes: number[];

    candleOpen: number;
    candleHigh: number;
    candleLow: number;
    candleClose: number;
    candleStart: number;

    avgVolume: number;
    avgRange: number;

    range: number;
    roc10: number;
    rsi: number;
};

export async function startKiteStream(
    ceSymbol: string,
    peSymbol: string,
    onTick: (ce: OptionState, pe: OptionState) => void
) {
    const instruments = await loadNFOInstruments();

    const ceInstrument = instruments.find(
        (i: any) => `NFO:${i.tradingsymbol}` === ceSymbol
    );

    const peInstrument = instruments.find(
        (i: any) => `NFO:${i.tradingsymbol}` === peSymbol
    );

    if (!ceInstrument || !peInstrument) {
        console.error("❌ Instrument not found");
        return;
    }

    const ticker = createTicker();

    const ceToken = ceInstrument.instrument_token;
    const peToken = peInstrument.instrument_token;

    console.log("✅ CE Token:", ceToken);
    console.log("✅ PE Token:", peToken);

    const ceState = createState();
    const peState = createState();

    ticker.on("connect", () => {
        console.log("📡 WebSocket Connected");
        ticker.subscribe([ceToken, peToken]);
        ticker.setMode(ticker.modeFull, [ceToken, peToken]);
    });

    ticker.on("ticks", (ticks: any[]) => {

        ticks.forEach((tick: any) => {

            if (tick.instrument_token === ceToken) {
                updateState(ceState, tick);
            }

            if (tick.instrument_token === peToken) {
                updateState(peState, tick);
            }

        });

        onTick(ceState, peState);
    });

    ticker.connect();
}

function createState(): OptionState {
    return {
        price: 0,
        volume: 0,
        vwap: 0,
        totalValue: 0,
        totalQty: 0,
        prices: [],
        volumes: [],
        candleOpen: 0,
        candleHigh: 0,
        candleLow: 0,
        candleClose: 0,
        candleStart: Date.now(),
        avgVolume: 0,
        avgRange: 0,
        range: 0,
        roc10: 0,
        rsi: 50
    };
}

function updateState(state: OptionState, tick: any) {

    const now = Date.now();
    const price = tick.last_price;
    const qty = tick.last_quantity || 1;

    state.price = price;
    state.volume = tick.volume;

    // VWAP
    state.totalValue += price * qty;
    state.totalQty += qty;
    state.vwap = state.totalValue / state.totalQty;

    // Price history (for ROC & RSI)
    state.prices.push(price);
    if (state.prices.length > 50) state.prices.shift();

    // 10-min ROC (~120 ticks approx depending on liquidity)
    if (state.prices.length > 10) {
        const old = state.prices[state.prices.length - 10];
        state.roc10 = ((price - old) / old) * 100;
    }

    // Simple RSI (lightweight)
    if (state.prices.length > 14) {
        let gains = 0;
        let losses = 0;

        for (let i = state.prices.length - 14; i < state.prices.length - 1; i++) {
            const diff = state.prices[i + 1] - state.prices[i];
            if (diff > 0) gains += diff;
            else losses -= diff;
        }

        const rs = gains / (losses || 1);
        state.rsi = 100 - 100 / (1 + rs);
    }

    // 5-min Candle Builder
    const fiveMin = 5 * 60 * 1000;

    if (now - state.candleStart > fiveMin) {
        state.avgRange = (state.avgRange * 4 + state.range) / 5;
        state.avgVolume = (state.avgVolume * 4 + state.volume) / 5;

        state.candleStart = now;
        state.candleOpen = price;
        state.candleHigh = price;
        state.candleLow = price;
    }

    state.candleHigh = Math.max(state.candleHigh, price);
    state.candleLow = Math.min(state.candleLow, price);
    state.candleClose = price;

    state.range = state.candleHigh - state.candleLow;
}