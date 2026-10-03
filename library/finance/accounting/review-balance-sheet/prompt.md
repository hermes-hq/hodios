---
schema: 1
id: review-balance-sheet
kind: prompt
title: Review a balance sheet
description: Reviews a small business balance sheet in plain language for liquidity, debt, working capital and red flags, with the ratios worked out and questions to take to the accountant.
category: accounting
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, operations-manager]
requires: [none]
inputs: [document, dataset]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [balance-sheet, liquidity, solvency, financial-statements]
pairs_with:
  prompts: [review-small-business-pnl, analyze-working-capital, explain-accounting-concept]
  personas: [fractional-cfo]
args:
  - name: balance_sheet
    description: The balance sheet as pasted text or a table, with the date, and the previous year's comparative figures if shown. Annual revenue and costs help with some ratios.
    type: text
    required: true
  - name: business_type
    description: What the business does (for example a retailer with stock, a consultancy, a construction firm). Optional; used to judge what is normal.
    type: string
output_contract:
  format: markdown
  sections: [In plain words, Does it add up, Liquidity, Debt and solvency, Working capital, Red flags, Questions for your accountant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read a small business balance sheet for an owner who understands their business but not accounting statements. The balance sheet is a snapshot: what the business owns, what it owes, and what is left for the owners on one date. Read well, it answers the questions owners care about: can we pay our bills over the next year, how much do we depend on debt, how much cash is tied up in customers and stock, and is anything drifting in the wrong direction. Small business balance sheets also hide specific problems: tax owed but not set aside, overdrawn owner or director loan accounts, negative equity, and old receivables that will never be collected.

{{#business_type}}Business: {{business_type}}{{/business_type}}
</context>

<task>
Balance sheet:

<balance_sheet>
{{balance_sheet}}
</balance_sheet>

1. Summarise in three or four plain sentences what the business owns, owes and is worth on paper, and how that changed from last year if comparatives are given.
2. Check that assets equal liabilities plus equity and that subtotals add up. Report any mismatch rather than correcting it.
3. Liquidity: compute the current ratio and quick ratio, and cash compared with a month of costs if costs are given. Explain each in one sentence and what range is normal for this kind of business.
4. Debt and solvency: total debt, debt to equity, the split between debt due within a year and later, and whether equity is negative.
5. Working capital: receivables, stock and payables, and days figures if revenue and costs are given; say which number is tying up cash.
6. Red flags: anything unusual, such as tax liabilities large relative to cash, owner or director loans, related-party balances, receivables much larger than last year, stock growing faster than sales, intangible assets carrying most of the value, or big unexplained balances.
7. Questions for the accountant, each tied to a specific line.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the figures given. If a ratio needs revenue or costs that were not supplied, say what it would show and ask for the figure instead of guessing.
- Show the arithmetic for every ratio.
- Describe what a figure may indicate, not a verdict on whether the business is sound or should borrow, invest or cut. Ranges for "normal" are rules of thumb that vary by industry; say so.
- Explain any accounting term the first time you use it, in one short clause.
{{> output/uncertainty}}
</constraints>

<output_format>
## In plain words
Three or four sentences.

## Does it add up
One or two lines.

## Liquidity
Table: measure | working | result | what it suggests.

## Debt and solvency
Table: measure | working | result | what it suggests.

## Working capital
Table: item | amount | days (if computable) | note.

## Red flags
Bullets, most important first, each with the line it comes from.

## Questions for your accountant
Numbered.
</output_format>
