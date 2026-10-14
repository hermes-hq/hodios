---
schema: 1
id: evaluate-trading-strategy
kind: prompt
title: Stress-test a trading strategy or backtest
description: Puts a trading strategy or backtest through the checks professionals use - costs and slippage, overfitting, look-ahead and survivorship bias, sample size, drawdowns - and estimates realistic returns.
category: investing
version: 1.0.0
status: incubating
stage: [review, verify]
role: [individual, data-analyst]
subject: [statistics]
requires: [none]
inputs: [text, dataset]
output: [checklist, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [backtesting, overfitting, look-ahead-bias, trading-costs, drawdown]
pairs_with:
  prompts: [evaluate-stock-tip, explain-margin-and-leverage, explain-options-risks]
  personas: [investing-educator]
args:
  - name: strategy
    description: The strategy rules (entry, exit, position size, instruments, timeframe) and any backtest results - period, number of trades, returns, win rate, drawdown, costs assumed, how parameters were chosen. Paste code or a summary.
    type: text
    required: true
  - name: capital
    description: The account size you would trade it with, the broker's commission and typical spread, and your country. Optional, but needed to estimate costs.
    type: text
output_contract:
  format: markdown
  sections: [The strategy in plain words, Red flags found, Costs re-estimated, Robustness checks to run, Realistic expectations, Before risking money]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most backtests that look great fail live, for well-known reasons. Overfitting: trying many rules or parameter values on the same data until one works, so the result fits noise; the more variants tried, the higher the bar a result must clear. Look-ahead bias: using information not available at the time, such as trading at a close price that was used to generate the signal, revised economic data, or index membership known only later. Survivorship bias: testing only on assets that still exist today. Costs: commissions, spreads, slippage, borrowing fees for shorts, financing on leverage and taxes on short-term gains, which can erase high-turnover edges. Small samples: a few dozen trades or one market regime prove little. Risk understated: maximum drawdown in the backtest is a floor, not a ceiling, and leverage turns drawdowns into account wipe-outs. Benchmarks: the right comparison is buy-and-hold of the same market at the same risk. Studies of retail day traders in several markets have found that most lose money over time, which is the base rate a new strategy is up against.

<strategy>
{{strategy}}
</strategy>
{{#capital}}Capital and costs: {{capital}}{{/capital}}
</context>

<task>
1. Restate the strategy rules precisely, and list anything ambiguous (exact entry price, order type, what happens on gaps, position sizing).
2. Red flags: check for overfitting (number of parameters, how chosen, number of variants tried), look-ahead bias, survivorship bias, unrealistic fills, missing costs, small sample, a single regime, leverage. Quote the part of the input that raises each.
3. Re-estimate costs: from the number of trades and their capital and costs (or illustrative costs, labelled), compute yearly cost as a share of capital and the return after costs. Show working.
4. Robustness checks to run: out-of-sample or walk-forward testing, parameter sensitivity (do neighbouring values also work), different periods and markets, Monte Carlo reshuffling of trades, random-entry comparison, and the benchmark comparison at equal risk.
5. Realistic expectations: what the evidence and the checks suggest about live results, drawdowns to expect, and the probability-weighted downside if the edge is not real.
6. Before risking money: paper trading or small size for a set number of trades, written stop rules for the strategy itself, maximum loss they accept, and record keeping.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say the strategy will make money or recommend trading it. Judge the evidence presented.
- Do not invent backtest statistics. If a figure is missing (number of trades, cost assumptions), mark it as missing and explain why it matters.
- If the strategy uses leverage, options, CFDs or shorting, state the possible loss in money at their stated size, including losses larger than the deposit where that is possible.
- If they share code, point out specific lines that cause look-ahead or cost errors, but do not rewrite the strategy to improve its backtest.
{{> output/uncertainty}}
</constraints>

<output_format>
## The strategy in plain words
Short paragraph and a list of ambiguities.

## Red flags found
Table: issue | evidence from the input | why it matters | severity.

## Costs re-estimated
Table with working.

## Robustness checks to run
Numbered list.

## Realistic expectations
Short paragraph.

## Before risking money
Checklist.
</output_format>
