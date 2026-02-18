# 📊 Intraday AI Breakout Bot

A fully automated **Intraday NIFTY Breakout + Option Alert Engine**
built using **TypeScript**, **Node.js**, and Telegram integration.

This system generates:

-   📈 Premarket trade plans\
-   🚨 Live breakout alerts\
-   🎯 Auto-selected option strikes\
-   🤖 Telegram trade notifications

------------------------------------------------------------------------

# 🧠 System Overview

The bot operates in two main phases:

------------------------------------------------------------------------

## 1️⃣ Premarket Engine (`preMarket.ts`)

Runs before market open.

### What it does:

-   Fetches previous day OHLC
-   Reads Gift Nifty
-   Calculates gap percentage
-   Detects Gap Up / Gap Down / Range Day
-   Determines market bias
-   Generates index trade levels
-   Selects ATM option strike
-   Sends structured Telegram plan

------------------------------------------------------------------------

## 2️⃣ Live Breakout Engine (`live.ts`)

Runs during market hours.

### What it does:

-   Monitors 5-minute candles
-   Watches previous day high & low
-   Detects breakout or breakdown
# 📊 Intraday AI Breakout Bot

An automated intraday alert engine for NIFTY index breakouts and option strike suggestions. Built with TypeScript and Node.js. The bot analyzes premarket gaps, computes bias and levels, watches live candles for breakouts, selects an ATM option strike, and posts structured alerts to Telegram.

## What this repo contains

- Premarket analysis: gap detection, bias, levels and an actionable plan.
- Live engines: detect breakouts on live candles and send alerts.
- Option helpers: resolve instruments, pick ATM strikes, and build trade payloads.
- Integrations: Telegram notifications and (placeholder) market data helpers.

## Quick start

1. Install dependencies:

```powershell
npm install
```

2. Create a `.env` in the project root with at least:

```text
TELEGRAM_TOKEN=your_bot_token
CHAT_ID=your_chat_id
```

3. Run the premarket engine (generates plan and sends Telegram message):

```powershell
npm run premarket
```

4. Run the live engine (monitor market and send live alerts):

```powershell
npm run live
```

## High-level overview

The codebase is organized under `src/`. The main responsibilities are split into small engines and helpers:

- `preMarket.ts`: builds premarket plan using previous day data and bias logic.
- `live.ts`: orchestrates live breakout detection during market hours.

Internally the logic is implemented across `engine/`, `strategies/`, `options/`, `indicators/`, `live/`, `data/`, and `bot/` folders.

## File map (what each file does)

Top-level scripts

- `app.ts` — App bootstrapper and shared startup logic used by CLI or process managers.
- `index.ts` — Project entry (may wire commands or exports used by other tools).
- `preMarket.ts` — Premarket engine: fetches previous-day OHLC, computes gap and bias, selects ATM option, and sends Telegram plan.
- `live.ts` — Live orchestration: starts live engines that monitor candles and emit breakout alerts.
- `login.ts` — Auth/login helpers for broker or data provider sessions (placeholders for integration).
- `scheduler.ts` — Task scheduler utilities (cron-like triggers used to run premarket or live at specific times).
- `testTelegram.ts` — Small script to validate Telegram integration and message formatting.
- `types.ts` — Shared TypeScript types and interfaces used across the project.

Bot integration

- `bot/telegram.ts` — Telegram client wrapper: formats messages, handles sending and simple retries.

Data helpers (`data/`)

- `data/global.ts` — Global constants and environment helpers (symbol mappings, config defaults).
- `data/market.ts` — Market data helpers and small caches used by engines.
- `data/nse.ts` — Convenience helpers for NSE-specific symbols, OHLC parsing, and utility conversions.
- `data/zerodha.ts` — (Optional) Zerodha broker API adapter or payload helpers (if broker integration exists).

Core engines (`engine/`)

- `engine/gapDetector.ts` — Logic for detecting gap-up/gap-down/range days using previous-session OHLC.
- `engine/intradayEngine.ts` — Central intraday orchestration, ties strategies and signal generators together.
- `engine/messageBuilder.ts` — Builds structured Telegram messages and human-readable plans from raw engine output.
- `engine/strategyEngine.ts` — Evaluates configured strategies and returns actionable signals.

Indicators (`indicators/`)

- `indicators/ema.ts` — Exponential moving average calculator.
- `indicators/vwap.ts` — VWAP (volume-weighted average price) implementation used as a filter in strategies.

Live-specific (`live/`)

- `live/liveBreakoutEngine.ts` — Watches live candles and previous-day levels for breakout/breakdown events.
- `live/liveSignalEngine.ts` — Smaller live signal runner that produces signal events used by the notifier.

Option helpers (`options/`)

- `options/instrumentResolver.ts` — Resolve instrument tokens and nearest strikes for a given symbol and expiry.
- `options/optionEngine.ts` — High-level option-selection logic (select ATM strikes, filters by premium/IV if available).
- `options/optionTradeBuilder.ts` — Build option trade payloads (strike, leg, expiry, size) for notifications or execution.
- `options/pricingEngine.ts` — (Optional) pricing helpers to fetch/estimate option premiums.

Signals & strategies (`signals/`, `strategies/`)

- `signals/signalGenerator.ts` — Converts engine outputs and indicator values into normalized signal objects.
- `strategies/gapStrategy.ts` — Implements the gap-based entry rules used in premarket plans.
- `strategies/orbStrategy.ts` — Opening Range Breakout (ORB) strategy implementation.
- `strategies/vwapStrategy.ts` — Strategy that uses VWAP as a primary filter for entries/exits.
- `strategies/strategyEngine.ts` — A small orchestrator that loads and runs the active strategy set.

Testing & local tools

- `scripts/` — Local scripts and helpers (used for building, testing, or environment setup).

## Design contract (short)

- Input: market OHLC/quotes, configured symbols, and environment credentials.
- Output: structured Telegram messages and in-memory signal objects.
- Error modes: network/data failures are logged and (where applicable) retried; missing credentials disable notifications.

## Notes & next steps

- The repo uses TypeScript; run a type check if you change core logic: `npm run build` or `tsc --noEmit`.
- Add automated tests for strategy edge cases (gap sizes around threshold, missing data, repeated triggers).
- If you want, I can add a minimal CONTRIBUTING or developer README with how to run the engines locally and stub data for offline testing.

## Risk disclaimer

This project generates alerts only. It does not execute live orders unless you wire a broker API. Trading involves risk; use proper risk management.
