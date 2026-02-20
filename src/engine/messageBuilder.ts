export function buildMessage(data: any) {

    const expansionMsg = data.expansion
        ? `
📈 *Volatility Outlook:* ${data.expansion}
`
        : "";

    const bias = data.institutionalBias;

    const biasMsg = bias
        ? `
━━━━━━━━━━━━━━━━━━

🏦 *INSTITUTIONAL BIAS*

Score: *${bias.totalScore}*
Direction: *${bias.direction}*

FII Score: ${bias.fiiScore}
PCR Score: ${bias.pcrScore}
OI Score: ${bias.oiScore}
`
        : "";

    const optionMsg = data.option
        ? `
━━━━━━━━━━━━━━━━━━
🚀 *OPTION TRADE SETUP*

Buy: *${data.option.symbol}*
Strike: *${data.option.strike} ${data.option.type}*

SL: 20 pts
Targets: 40 / 70
`
        : data.optionSuggestion ?
            `
        ━━━━━━━━━━━━━━━━━━
🚀 *OPTION TRADE SUGGESTION*

Strategy: *${data.optionSuggestion.strategy}*
Reason: *${data.optionSuggestion.reason}*
        `:
            `
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
${biasMsg}
${expansionMsg}
━━━━━━━━━━━━━━━━━━
⚡ Confidence: ${data.confidence}%
⚡ Real-Time Zerodha Pre-market Alert Built With 💙 By Kashyap
`;
}
