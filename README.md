# intraday-ai-bot

![TypeScript](https://img.shields.io/badge/language-TypeScript-blue?style=flat-square)

## Overview

`intraday-ai-bot` is a TypeScript-based automation framework for intraday trading operations and analysis. It integrates with platforms such as Zerodha Kite and Telegram to fetch market data, implement trading strategies, manage positions, and send notifications. The bot schedules tasks, processes institutional activity, and supports expiry and options trading workflows.

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Key Libraries:**
  - [`axios`](https://github.com/axios/axios) (HTTP requests)
  - [`dotenv`](https://github.com/motdotla/dotenv) (environment variable management)
  - [`kiteconnect`](https://github.com/zerodhatech/kiteconnectjs) (Zerodha API integration)
  - [`node-cron`](https://github.com/node-cron/node-cron) (task scheduling)
  - [`node-telegram-bot-api`](https://github.com/yagop/node-telegram-bot-api) (Telegram bot integration)
- **Development Tools:**
  - [`typescript`](https://www.typescriptlang.org/)
  - [`ts-node`](https://github.com/TypeStrong/ts-node)
  - [`nodemon`](https://github.com/remy/nodemon)
  - [`@types/node`, `@types/node-telegram-bot-api`] (Type definitions)

## Prerequisites

- **Node.js** (version 14 or above recommended)
- **npm** (comes with Node.js)
- Zerodha Kite API credentials (for trading functionalities)
- Telegram Bot token (for Telegram integration)
- `.env` file configured with required environment variables

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kashyapkaki/intraday-ai-bot.git
   cd intraday-ai-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add required credentials, API keys, and settings.

## Usage

### Common Commands

- **Start Pre-Market Bot**
  ```bash
  npm run start
  ```
  Runs `src/preMarket.ts` for pre-market analysis and notifications.

- **Login to Zerodha Kite**
  ```bash
  npm run login
  ```
  Runs `src/login.ts` for authentication with Zerodha Kite.

- **Run Expiry Engine**
  ```bash
  npm run expiry
  ```
  Executes expiry management logic via `src/expiry/expiryEngine.ts`.

- **Run Tests**
  ```bash
  npm test
  ```

> All scripts use `ts-node` for direct TypeScript execution.

## Project Structure

```
intraday-ai-bot/
│
├── .github/
│   └── workflows/
│       └── readme-ai.yml
├── src/
│   ├── bot/
│   │   └── telegram.ts               # Telegram bot integration logic
│   ├── data/
│   │   ├── global.ts                 # Global data definitions
│   │   ├── institutionalFetcher.ts   # Fetches institutional trading data
│   │   ├── nse.ts                    # NSE data utilities
│   │   └── zerodha.ts                # Zerodha data utilities
│   ├── engine/
│   │   ├── institutionalBias.ts      # Analyzes institutional bias
│   │   ├── intradayEngine.ts         # Main intraday trading engine
│   │   ├── messageBuilder.ts         # Constructs messages/notifications
│   │   └── strategyEngine.ts         # Implements trading strategies
│   ├── expiry/
│   │   ├── capitalManager.ts         # Manages capital during expiry
│   │   ├── expiryEngine.ts           # Core expiry logic
│   │   ├── hedgeManager.ts           # Manages hedging strategies
│   │   ├── kiteStream.ts             # Zerodha Kite streaming utilities
│   │   ├── positionManager.ts        # Position management
│   │   ├── riskManager.ts            # Risk assessment and controls
│   │   └── strengthEngine.ts         # Market strength analysis
│   ├── options/
│   │   └── optionEngine.ts           # Options trading engine
│   ├── login.ts                      # Zerodha Kite login script
│   ├── preMarket.ts                  # Pre-market analysis
│   └── types.ts                      # Type definitions
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Contributing

We welcome contributions!

1. **Fork** the repository.
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b my-feature
   ```
3. **Commit** your changes and push to your fork.
4. **Open a Pull Request** describing your changes.

Please ensure your code adheres to project conventions and includes appropriate tests.

## License

License information has not been specified. Please refer to the repository or contact the owner for details.

---
[![README powered by ReadmeAI](https://img.shields.io/badge/README-powered%20by%20ReadmeAI-4c9be8?style=flat-square&logo=markdown)](https://www.readmeai.in)
