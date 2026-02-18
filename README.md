# 📊 Intraday AI Breakout Bot — Premarket Edition

A lightweight premarket analysis engine for NIFTY index gap detection and option strike suggestions. Built with TypeScript and Node.js. The bot fetches previous day OHLC, monitors Gift Nifty, calculates gap type and market bias, selects an ATM option strike, and posts a structured trade plan to Telegram.

## What this repo contains

- **Premarket analysis**: gap detection, bias determination, and trade level calculation.
- **Option selection**: ATM strike picker based on direction.
- **Integrations**: Telegram notifications and Zerodha broker connection helpers.
- **Market data**: NSE data fetching and Gift Nifty monitoring.

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

## High-level overview

The codebase is organized under `src/`. All logic is dedicated to premarket planning:

- `preMarket.ts`: main entry point that orchestrates the premarket plan.
- `engine/`: core analysis logic (gap detection, strategy selection, message building).
- `data/`: NSE data fetching and Zerodha broker helpers.
- `bot/`: Telegram notifications.
- `types.ts`: shared TypeScript definitions.

## File map (what each file does)

**Top-level scripts**

- `preMarket.ts` — Premarket engine entry: fetches previous-day OHLC, computes gap and bias, selects ATM option, and sends Telegram plan.
- `types.ts` — Shared TypeScript types and interfaces used across the project.

**Bot integration**

- `bot/telegram.ts` — Telegram client wrapper: formats messages, handles sending to a chat ID.

**Data helpers (`data/`)**

- `data/global.ts` — Gift Nifty fetcher; computes current weekly option expiry.
- `data/nse.ts` — NSE API helpers to fetch previous-day NIFTY OHLC.
- `data/zerodha.ts` — Zerodha broker API client initialization and instrument loader for NFO options.

**Core engines (`engine/`)**

- `engine/intradayEngine.ts` — Orchestrates the premarket plan: calls Gift Nifty fetcher, previous-day data, gap detection, strategy selection, and option strike picker.
- `engine/messageBuilder.ts` — Builds a structured Telegram message from the premarket plan output.

## Design contract (short)

- Input: market OHLC/quotes, configured symbols, and environment credentials.
- Output: structured Telegram messages and in-memory plan objects.
- Error modes: network/data failures are logged; missing credentials disable notifications.

## Risk disclaimer

This project generates alerts only. It does not execute live orders. Trading involves risk; use proper risk management.
