# intraday-ai-bot

A CLI tool for automated intraday trading with Telegram bot integration, built in TypeScript.

![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)
![CLI Tool](https://img.shields.io/badge/tool-CLI-green.svg)

## Overview

**intraday-ai-bot** is a command-line tool designed for automated intraday trading operations. It integrates with the Kite Connect API for trading execution, analyzes market data using institutional bias and strategy engines, and manages expiry and risk through dedicated modules. The project features a Telegram bot for real-time notifications and command handling, and automates key trading processes with scheduled tasks using `node-cron`.

## Tech Stack

- **Language:** TypeScript
- **Frameworks & Libraries:**
  - [axios](https://www.npmjs.com/package/axios) – HTTP requests
  - [dotenv](https://www.npmjs.com/package/dotenv) – Environment variable management
  - [kiteconnect](https://www.npmjs.com/package/kiteconnect) – Kite Connect API integration
  - [node-cron](https://www.npmjs.com/package/node-cron) – Scheduled task automation
  - [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) – Telegram bot integration

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- Access credentials for [Kite Connect API](https://kite.trade/)
- Telegram bot token (for bot integration)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kashyapkaki/intraday-ai-bot.git
   cd intraday-ai-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or, if using yarn:
   # yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the project root.
   - Add your Kite Connect and Telegram bot credentials.
   - Example:
     ```
     KITE_API_KEY=your_kite_api_key
     KITE_API_SECRET=your_kite_api_secret
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token
     # ...other environment variables as needed
     ```

## Usage

Typical workflow:

1. **Login to Kite Connect:**
   ```bash
   npm run login
   # or
   npx ts-node src/login.ts
   ```

2. **Start pre-market data processing:**
   ```bash
   npm start
   # or
   npx ts-node src/preMarket.ts
   ```

3. **Run expiry engine for option expiry strategies:**
   ```bash
   npm run expiry
   # or
   npx ts-node src/expiry/expiryEngine.ts
   ```

4. **Interact via Telegram Bot:**
   - Start your Telegram bot and communicate using your configured bot token.
   - Receive real-time notifications or send commands.

5. **Automate Tasks:**
   - Scheduled trading strategies are managed internally using `node-cron`.

## Project Structure

```
intraday-ai-bot/
├── .github/
│   └── workflows/
│       └── readme-ai.yml
├── src/
│   ├── bot/
│   │   └── telegram.ts            # Telegram bot integration
│   ├── data/
│   │   ├── global.ts
│   │   ├── institutionalFetcher.ts
│   │   ├── nse.ts
│   │   └── zerodha.ts
│   ├── engine/
│   │   ├── institutionalBias.ts
│   │   ├── intradayEngine.ts
│   │   ├── messageBuilder.ts
│   │   └── strategyEngine.ts
│   ├── expiry/
│   │   ├── capitalManager.ts
│   │   ├── expiryEngine.ts
│   │   ├── hedgeManager.ts
│   │   ├── kiteStream.ts
│   │   ├── positionManager.ts
│   │   ├── riskManager.ts
│   │   └── strengthEngine.ts
│   ├── options/
│   │   └── optionEngine.ts
│   ├── login.ts                   # Trading API login
│   ├── preMarket.ts               # Pre-market processing entry point
│   └── types.ts                   # Type definitions
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Contributing

We welcome contributions! To get started:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'Add new feature'`
4. **Push** to your fork: `git push origin feature/your-feature-name`
5. **Open a Pull Request** describing your changes

## License

License not specified. Please contact the repository owner for licensing information.

---
[![README powered by ReadmeAI](https://img.shields.io/badge/README-powered%20by%20ReadmeAI-4c9be8?style=flat-square&logo=markdown)](https://readme-ai.com)
