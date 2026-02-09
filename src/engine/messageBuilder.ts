export function buildMessage(data: any) {
    const option = data.optionTrade;

    return `📊 *Intraday AI Trade Plan — NIFTY*

Prev Close: ${data.prev?.close ?? "N/A"}
Gift Nifty: ${data.gift?.last ?? "N/A"} (${data.gift.percent}%)

Gap: *${data.gap.type}* (${data.gap.percent.toFixed(2)}%)

Bias: *${data.strategy.bias}*

Index Trade:
${data.strategy.trade}

━━━━━━━━━━━━━━━━━━

🚀 *OPTION TRADE SETUP*

${option
            ? `BUY ${option.symbol} ${option.strike} ${option.type}
Entry: ${option.entry}
SL: ${option.sl}
Targets: ${option.t1} / ${option.t2}`
            : `⚠ No Option Trade Today — Market Range Bound`}

━━━━━━━━━━━━━━━━━━

⚡ Confidence: 80%
`;
}
