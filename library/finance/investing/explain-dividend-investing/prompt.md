---
schema: 1
id: explain-dividend-investing
kind: prompt
title: Explain dividend investing and its traps
description: Explains how dividends work, why a high yield can be a warning sign, total return versus income, payout ratio and dividend cover, and the tax and concentration questions, using the user's examples.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dividends, dividend-yield, total-return, income-investing]
pairs_with:
  prompts: [read-company-financials, explain-tax-on-investments, check-portfolio-diversification, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: question
    description: What you want to understand, and any shares or funds you are looking at with their yield, payout ratio or dividend history.
    type: text
    required: true
  - name: goal
    description: Why dividends appeal to you (income now, feeling of safety, reinvesting) and your horizon. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How dividends work, Total return, not just yield, Reading the numbers, Yield traps, Income without a dividend focus, Tax and concentration, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A dividend is a cash payment from company profits. On the day a share goes ex-dividend, its price typically drops by about the dividend, so a dividend is not free money: value moves from the share price into the investor's pocket, and may then be taxed. What matters to an investor is **total return** (price change plus dividends). Dividend yield is dividend divided by price, so a yield can jump because the price has collapsed, often because the market expects a cut: the classic "yield trap". Experienced investors look at dividend cover or payout ratio (how much of earnings or free cash flow is paid out), whether dividends are funded by borrowing, the dividend history through bad years, and sector concentration, since high-yield stocks cluster in a few sectors such as banks, energy, utilities, tobacco and property. A focus on dividend income is a legitimate preference for some people, but income can also be produced by selling a portion of holdings, which can be more flexible and sometimes more tax-efficient depending on the country.

<question>
{{question}}
</question>
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. How dividends work: ex-dividend date, record and payment dates, and the price adjustment, with a small worked example.
2. Total return, not just yield: compare two illustrative shares, one high yield with falling price, one low yield with rising price, in money over a few years.
3. Reading the numbers: compute or explain yield, payout ratio and dividend cover for the examples they gave, showing the arithmetic; say what figures are missing.
4. Yield traps: the warning signs (yield far above peers, payout ratio over 100% of earnings or free cash flow, rising debt, falling earnings, a recent price collapse), applied to their examples where possible.
5. Income without a dividend focus: explain the idea of total-return investing with planned withdrawals, as a comparison, not a recommendation.
6. Tax and concentration: how dividend taxation and withholding tax on foreign dividends can differ by country and account type (as questions to check), and the sector concentration of high-yield portfolios.
7. Questions to check with a provider, tax adviser or licensed adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say whether to buy, hold or sell any share or fund, or predict dividends.
- Use only figures the user gives for named companies; do not state current yields or financials from memory.
- Tax points are questions to verify, not rules.
{{> output/uncertainty}}
</constraints>

<output_format>
## How dividends work
Short explanation and worked example.

## Total return, not just yield
Table: year | share A value + dividends | share B value + dividends.

## Reading the numbers
Table: measure | figure | what it suggests.

## Yield traps
Bullets.

## Income without a dividend focus
Short paragraph.

## Tax and concentration
Bullets.

## Questions to check
Bullets.
</output_format>
