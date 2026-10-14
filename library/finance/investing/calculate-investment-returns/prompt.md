---
schema: 1
id: calculate-investment-returns
kind: prompt
title: Calculate your real investment returns
description: Works out what your investments actually returned from contributions, withdrawals and values - money-weighted and time-weighted, annualised, after fees and after inflation - with the working shown.
category: investing
version: 1.0.0
status: incubating
stage: [review, learn]
role: [individual]
requires: [none]
inputs: [dataset, text]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [investment-returns, money-weighted-return, annualised-return, inflation-adjusted]
pairs_with:
  prompts: [explain-brokerage-statement, calculate-fee-drag, write-investment-decision-journal, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: cash_flows
    description: Dates and amounts of money put in and taken out, the starting value and date, and today's value. Values at year ends help with the time-weighted figure.
    type: text
    required: true
  - name: inflation_and_benchmark
    description: Inflation over the period and a benchmark return to compare with, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The simple picture, Your personal return, The investments' return, After inflation, Against a benchmark, Common mistakes, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people cannot say what their investments returned, and the common shortcuts mislead. "Current value minus what I put in" ignores when the money went in: 10,000 of gain on money invested ten years ago is a very different result from the same gain on money added last year. Two standard measures answer different questions. **Money-weighted return** (internal rate of return, IRR or XIRR in a spreadsheet) is the investor's personal return, affected by the timing of contributions. **Time-weighted return** strips out cash flow timing and measures how the investments themselves did, which is what funds and benchmarks report. Returns over more than a year should be annualised (a 50% gain over five years is about 8.4% a year, not 10%). After inflation, the real return is roughly the nominal return minus inflation, precisely (1 + nominal) / (1 + inflation) - 1.

<cash_flows>
{{cash_flows}}
</cash_flows>
{{#inflation_and_benchmark}}Inflation and benchmark: {{inflation_and_benchmark}}{{/inflation_and_benchmark}}
</context>

<task>
1. The simple picture: total put in, total taken out, current value, gain in money. Explain why this alone is not a return.
2. Your personal return: calculate the money-weighted annual return (IRR) from the dated cash flows, showing the cash flow table and the method; give the spreadsheet formula (XIRR) they can use to check it. If you approximate, say so and give the approximation's range.
3. The investments' return: if values are given at the dates of cash flows or year ends, compute the time-weighted return by chaining sub-period returns and annualise it. If not, explain what values are needed.
4. After inflation: convert to a real annual return if inflation is given, otherwise explain how.
5. Against a benchmark: compare the time-weighted figure with the benchmark if given, and explain why money-weighted should not be compared directly with a fund or index return.
6. Common mistakes: not annualising, ignoring withdrawals, counting dividends twice, comparing personal return with an index, leaving out fees.
7. Questions to check: whether the values are after all fees, and whether dividends were reinvested.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show the arithmetic; for IRR, state the result to one decimal place and the method used. Do not present an approximate figure as exact.
- Do not judge whether the result is good enough or suggest changes to holdings.
- Use only the figures given.
{{> output/uncertainty}}
</constraints>

<output_format>
## The simple picture
Short table.

## Your personal return
Cash flow table, method, the annual figure and the XIRR formula.

## The investments' return
Sub-period table and the annualised figure, or what is needed.

## After inflation
Calculation.

## Against a benchmark
Short paragraph.

## Common mistakes
Bullets.

## Questions to check
Bullets.
</output_format>
