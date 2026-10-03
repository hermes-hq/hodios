---
schema: 1
id: explain-options-risks
kind: prompt
title: Explain options and derivatives risks
description: Explains how listed options and other retail derivatives work, with worked payoff tables, what moves prices before expiry, the common ways retail investors lose money and questions to ask first.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student]
requires: [none]
inputs: [topic]
output: [explanation, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [options-trading, derivatives, leverage, cfds, payoff-diagram]
pairs_with:
  prompts: [explain-investment-concept, explain-equity-compensation, spot-investment-scam, evaluate-stock-tip]
  personas: [investing-educator]
args:
  - name: product
    description: The product or strategy to explain, such as buying call options, buying puts, covered calls, selling puts, zero-days-to-expiry options, futures, CFDs, spread bets or leveraged ETFs.
    type: string
    required: true
  - name: experience
    description: What you already know (for example "own index funds, never traded options") and why you are interested. Optional.
    type: text
output_contract:
  format: markdown
  sections: [In one paragraph, How it works, Worked payoff example, What moves the price before expiry, How retail investors lose money, Before you ever place a trade, Terms]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Derivatives are contracts whose value depends on something else (a share, an index, a currency). They are legitimate tools for hedging and income, and they are also where many retail traders lose money fast: leverage magnifies small moves, time decay works against option buyers every day, a short option position can lose far more than the premium collected, and spreads and fees take a large share of small trades. Regulators in several countries require providers of products like CFDs to disclose the percentage of retail accounts that lose money, and that figure is usually a large majority. The aim here is understanding before any money is risked, with numbers the person can follow.

This prompt covers traded options and retail derivatives. Employee stock options from an employer are a different topic (vesting, exercise, tax) and are only mentioned for contrast.

Product: {{product}}
{{#experience}}Experience: {{experience}}{{/experience}}
</context>

<task>
1. In one paragraph: what {{product}} is, what the buyer and seller each get, and the maximum gain and maximum loss for each side.
2. How it works: the mechanics in plain words - underlying, strike, expiry, premium, contract multiplier (often 100 shares for listed equity options), margin or collateral, settlement, early assignment where relevant. For non-option products (futures, CFDs, leveraged ETFs) cover the equivalent mechanics: leverage, margin calls, overnight financing, daily reset.
3. Worked payoff example with round numbers: for example a stock at 100 and a call with a 105 strike costing 2.00 per share (200 per contract). Show a table of the underlying price at expiry (for example 90, 100, 105, 107, 110, 120) against profit or loss per contract for the relevant side, the break-even, and the return as a percentage of money at risk. Adapt the example to the product; for a short position include a sharp adverse move.
4. What moves the price before expiry: time decay, implied volatility (and the drop after earnings), distance to strike, interest rates, and why being right about direction is not enough. Keep it intuitive; name the Greeks only briefly.
5. How retail investors lose money with this product: 5-7 specific mechanisms (for example buying short-dated out-of-the-money options that expire worthless, selling uncovered options with unlimited or very large loss, margin calls forcing a sale at the low, leveraged ETF decay in choppy markets, wide spreads on illiquid contracts, doubling down after a loss, assignment surprises).
6. Before you ever place a trade: a checklist and questions - the broker's options-approval level and what it means, maximum loss in money written down, position size relative to total wealth, whether it is hedging or speculating, tax treatment to check, paper-trading first.
7. Terms: a short glossary.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Teach the mechanics; do not recommend trades, strikes, expiries, tickers, brokers or strategies for this person, and do not suggest that options are a way to make reliable income.
- Use round illustrative numbers, labelled as such; do not quote current market prices.
- State the maximum loss clearly for every position discussed, in money for one contract.
- If the person's experience suggests they are new to investing altogether, say plainly that most educators suggest understanding basic diversified investing first, without lecturing.
- If the product is not a derivative or is unclear, say what it is and ask what they meant.
{{> output/uncertainty}}
</constraints>

<output_format>
## In one paragraph
Plain summary with maximum gain and loss for each side.

## How it works
Short paragraphs or bullets.

## Worked payoff example
Table: price at expiry | profit or loss per contract | return on money at risk. Then break-even.

## What moves the price before expiry
Bullets.

## How retail investors lose money
Numbered.

## Before you ever place a trade
Checklist and questions.

## Terms
Glossary.
</output_format>
