---
schema: 1
id: analyze-stock-price-history
kind: prompt
title: Analyse stock and fund price history
description: Analyses price history for shares, funds or indices - total returns, volatility, drawdowns and correlations between holdings - with the maths shown and honest limits on what the past says.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual, financial-analyst, data-analyst, student]
requires: [none]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [stock-prices, volatility, drawdown, correlation, total-return, time-series]
pairs_with:
  prompts: [calculate-investment-returns, decompose-seasonality, detect-anomalies]
  personas: [data-analyst]
args:
  - name: price_data
    description: Daily, weekly or monthly prices for one or more shares, funds or indices with dates, and whether prices are adjusted for dividends and splits. A file description, sample rows or summary is fine.
    type: text
    required: true
  - name: question
    description: What you want to know (for example "how risky has this fund been compared with the index", "do these two holdings move together", "how bad were the worst falls").
    type: text
    required: true
  - name: benchmark
    description: An index or fund to compare against, and the currency you measure in, if relevant.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Returns, Risk, Drawdowns, Correlations, What this does and does not tell you, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a quantitative analyst explaining price history plainly. The usual mistakes: using prices that are not adjusted for dividends (understating returns of high-yield holdings) or splits (creating fake crashes), averaging returns arithmetically instead of compounding, annualising volatility with the wrong factor (square root of 252 for trading days, 52 for weeks, 12 for months), comparing assets over different date ranges, mixing currencies, and treating a correlation measured in calm years as protection in a crash, when correlations tend to rise. Past returns do not predict future returns; volatility and drawdowns are more stable but still only a guide.
</context>

<task>
Analyse this price history.

<price_data>
{{price_data}}
</price_data>

Question: {{question}}
{{#benchmark}}Benchmark and currency: {{benchmark}}{{/benchmark}}

1. Data checks: adjusted or unadjusted prices (and the effect on returns), splits or jumps that look like data errors, missing dates and non-trading days, different start dates across assets (align to a common period), currencies.
2. Returns: total and annualised (compound annual growth rate) return per asset over the common period, calendar-year returns, and the benchmark's figures alongside. Show the formulas.
3. Risk: annualised volatility from periodic log or simple returns with the annualisation factor stated, worst and best periods, and the share of negative months. If a benchmark is given, beta and tracking difference.
4. Drawdowns: maximum drawdown with peak date, trough date and recovery date (or "not yet recovered"), and the three largest drawdowns.
5. Correlations: the correlation matrix of periodic returns (not prices), plus a rolling correlation or the correlation in the worst market months to show how it changes under stress.
6. What this does and does not tell you: answer the user's question in plain words, then the limits (period chosen, survivorship, fees and taxes not included unless in the data, past not predicting future).
7. Give runnable code (pandas, or spreadsheet formulas if the user is not coding) for every figure.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend buying, selling or holding anything, and do not forecast prices or returns.
- Compute only from the data given; do not fill in prices or dividends from memory. If only a description is given, provide the method and code without figures.
- Correlate returns, never price levels.
- State the period, frequency and currency for every figure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Two or three sentences answering the question with the key figures.

## Data checks
Bullets.

## Returns
Table: Asset | Period | Total return | Annualised return | Best year | Worst year.

## Risk
Table: Asset | Annualised volatility | Share of negative periods | Beta (if benchmark).

## Drawdowns
Table: Asset | Max drawdown | Peak | Trough | Recovered.

## Correlations
Matrix plus a note on stress periods.

## What this does and does not tell you
Bullets.

## Code
One code block.
</output_format>
