export function buildMessage(data: any) {
    const optionMsg = data.option
        ? `
━━━━━━━━━━━━━━━━━━

🚀 *OPTION TRADE SETUP*

Buy: *${data.option.symbol}*
Strike: *${data.option.strike} ${data.option.type}*

SL: 20 pts
Targets: 40 / 70
`
        : `
━━━━━━━━━━━━━━━━━━

⚠ *No Option Trade Today — Market Range Bound*
`;

    return `📊 *Intraday AI Trade Plan — NIFTY*

Prev Close: ${data.prev.close}
Gift Nifty: ${data.gift.last} (${data.gift.percent}%)

Gap: *${data.gap.type}* (${data.gap.percent.toFixed(2)}%)

Bias: *${data.strategy.bias}*

Index Trade:
${data.strategy.trade}

${optionMsg}

━━━━━━━━━━━━━━━━━━

⚡ Confidence: 80%
⚡ Real-Time Zerodha Pre-market Alert Built With 💙 By Kashyap
`;
}
