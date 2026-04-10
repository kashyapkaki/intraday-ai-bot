# intraday-ai-bot

[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
![CLI Tool](https://img.shields.io/badge/tool-CLI-green.svg)
[![Build Status](https://img.shields.io/github/workflow/status/kashyapkaki/intraday-ai-bot/readme-ai.yml?label=CI)](../../actions)

## Overview

`intraday-ai-bot` is a modular TypeScript CLI tool designed to automate and optimize intraday trading strategies. It integrates with the Kite Connect API for trading operations, processes pre-market and real-time market data, manages expiry and risk, and provides real-time notifications and command capabilities via a Telegram bot. Institutional bias analysis, scheduled tasks, and robust strategy engines are core features, making this tool suitable for sophisticated trading automation workflows.

## Tech Stack

- **Language:** TypeScript
- **Key Libraries:**
  - [axios](https://github.com/axios/axios) – HTTP client
  - [dotenv](https://github.com/motdotla/dotenv) – Environment variable management
  - [kiteconnect](https://github.com/zerodhatech/kiteconnectjs) – Kite Connect trading API integration
  - [node-cron](https://github.com/node-cron/node-cron) – Task scheduling
  - [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) – Telegram bot integration

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (Node Package Manager)
- Access to [Kite Connect API](https://kite.trade/)
- Telegram bot token (for bot integration)
- `.env` file with necessary environment variables (e.g., API keys, secrets)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kashyapkaki/intraday-ai-bot.git
cd intraday-ai-bot
npm install
```

## Usage

1. **Set up environment variables:**

   Create a `.env` file in the project root and add your configuration (Kite Connect API keys, Telegram bot token, etc.).

2. **Authenticate with Kite Connect:**

   ```bash
   npm run login
   # or
   npx ts-node src/login.ts
   ```

3. **Start pre-market data processing:**

   ```bash
   npm start
   # or
   npx ts-node src/preMarket.ts
   ```

4. **Manage expiry-related strategies:**

   ```bash
   npm run expiry
   # or
   npx ts-node src/expiry/expiryEngine.ts
   ```

5. **Use the Telegram bot:**

   - Receive real-time notifications.
   - Send commands as per bot's capabilities (see `src/bot/telegram.ts` for implementation details).

6. **Develop and test:**

   ```bash
   npm run test
   ```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── readme-ai.yml     # GitHub Actions workflow
├── src/
│   ├── bot/
│   │   └── telegram.ts       # Telegram bot integration
│   ├── data/
│   │   ├── global.ts         # Global data utilities
│   │   ├── institutionalFetcher.ts # Institutional data fetching
│   │   ├── nse.ts            # NSE data handling
│   │   └── zerodha.ts        # Zerodha API integration
│   ├── engine/
│   │   ├── institutionalBias.ts # Institutional bias analysis
│   │   ├── intradayEngine.ts    # Core intraday trading engine
│   │   ├── messageBuilder.ts    # Message formatting
│   │   └── strategyEngine.ts    # Strategy implementation
│   ├── expiry/
│   │   ├── capitalManager.ts    # Capital management for expiry
│   │   ├── expiryEngine.ts      # Expiry management engine
│   │   ├── hedgeManager.ts      # Hedging strategies
│   │   ├── kiteStream.ts        # Kite Connect streaming
│   │   ├── positionManager.ts   # Position management
│   │   ├── riskManager.ts       # Risk management
│   │   └── strengthEngine.ts    # Strength analysis
│   ├── options/
│   │   └── optionEngine.ts      # Options strategy engine
│   ├── login.ts                 # Authentication script
│   ├── preMarket.ts             # Pre-market data processing
│   └── types.ts                 # TypeScript types
├── package.json
├── tsconfig.json
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/my-feature`)
3. **Commit** your changes (`git commit -am 'Add new feature'`)
4. **Push** to the branch (`git push origin feature/my-feature`)
5. **Open a Pull Request**

## License

License information is not specified in this repository. Please contact the repository owner for details regarding usage and distribution.

---
[![README powered by ReadmeAI](https://img.shields.io/badge/README-powered%20by%20ReadmeAI-4c9be8?style=flat-square&logo=markdown)](https://readme-ai.com)

