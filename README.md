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
-   Auto-selects option strike
-   Sends live Telegram alert
-   Stops after first trigger

------------------------------------------------------------------------

# 🏗️ Project Structure

    src/
    │
    ├── bot/
    │   └── telegram.ts
    │
    ├── data/
    │   └── market.ts
    │
    ├── engine/
    │   ├── strategyEngine.ts
    │   ├── optionEngine.ts
    │   ├── intradayEngine.ts
    │   ├── liveBreakoutEngine.ts
    │   └── messageBuilder.ts
    │
    ├── preMarket.ts
    └── live.ts

------------------------------------------------------------------------

# ⚙️ Setup

## Install dependencies

    npm install

## Create `.env` file

    TELEGRAM_TOKEN=your_bot_token
    CHAT_ID=your_chat_id

------------------------------------------------------------------------

# ▶️ Run Commands

## Premarket

    npm run premarket

## Live Engine

    npm run live

------------------------------------------------------------------------

# 📌 Implemented Features

-   Gap detection logic
-   Bias engine
-   ATM option strike selection
-   Telegram alerts
-   Live breakout detection
-   Single-trigger protection
-   Modular TypeScript architecture

------------------------------------------------------------------------

# 🚀 Future Scope

## Phase 1 --- Smart Option Engine

-   Real-time premium fetching
-   Pullback entries
-   Dynamic stop-loss
-   Risk-reward filtering

## Phase 2 --- Advanced Trade Management

-   Trailing stop-loss
-   Partial profit booking
-   Volatility-based targets

## Phase 3 --- Institutional Filters

-   VWAP filter
-   Opening range breakout
-   Volume confirmation

## Phase 4 --- Deployment & Automation

-   VPS deployment
-   Automated premarket cron
-   Trade logs
-   P&L reporting dashboard

## Phase 5 --- Full Algo Upgrade

-   Broker API integration
-   Auto order execution
-   Risk-based position sizing
-   Max daily loss control

------------------------------------------------------------------------

# ⚠ Risk Disclaimer

This bot generates alerts only.\
It does not execute trades automatically.

Trading involves risk. Use proper risk management.
