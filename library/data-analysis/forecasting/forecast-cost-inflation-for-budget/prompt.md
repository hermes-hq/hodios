---
schema: 1
id: forecast-cost-inflation-for-budget
kind: prompt
title: Forecast cost inflation for a budget
description: Projects next year's cost increases line by line - pay, energy, materials, rent, software, contracts - from contract terms, indices the user supplies and timing, with a range for the budget.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [financial-analyst, operations-manager, founder, executive]
inputs: [dataset, document, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cost-inflation, budget-assumptions, price-indices, contract-escalators]
pairs_with:
  prompts: [build-annual-operating-plan, explain-budget-variance, review-forecast-assumptions]
args:
  - name: cost_base
    description: "Current annual costs by line, with for each: contract terms (fixed price until a date, index-linked, annual review), renewal dates, and quantity changes expected next year."
    type: text
    required: true
  - name: indices
    description: "Any inflation or price indices and forecasts you want used (official inflation forecasts, wage settlement data, energy futures, supplier notices), with sources and dates. Optional; without them rates are assumptions to confirm."
    type: text
  - name: budget_year
    description: The budget year and its start month.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Line by line, Timing effects, Range, Assumptions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Budget holders often apply one headline inflation rate to the whole cost base. Experienced finance teams do not, because cost lines inflate differently and at different times. Pay follows settlements and pay reviews, plus drift from promotions and grade changes, and pay rises take effect on a set date, so only part of the year carries the increase. Contracts may be fixed until renewal, rise by a stated escalator, or be linked to a named index with a lag (often last year's index applied this year). Energy and commodities move with markets and are often partly hedged or fixed. Software subscriptions rise at renewal, frequently by more than general inflation. Rent reviews happen on set dates and may be upward-only. The difference between price inflation and volume change also matters: more staff or more usage is not inflation. A good cost inflation forecast works line by line, separates price from volume, applies increases from their effective dates, and shows a range for the volatile lines.

Budget year: {{budget_year}}
</context>

<task>
<cost_base>
{{cost_base}}
</cost_base>
{{#indices}}

<indices>
{{indices}}
</indices>
{{/indices}}

1. Classify each line by its price mechanism: fixed until a date, contractual escalator, index-linked (which index, which lag), market-priced, annual review or pay settlement.
2. Separate volume changes from price changes for each line.
3. Apply each price change from its effective date, so the budget-year cost reflects only the months after the change (full-year effect noted for the following year).
4. Use the indices supplied; where none is supplied, state an assumption clearly marked to confirm, rather than quoting a current rate from memory.
5. Give a range for volatile lines (energy, commodities, pay where settlement is not agreed) and the total.
6. Sum to total cost growth split into price and volume, and show which lines drive most of the increase.
</task>

<constraints>
- Never apply one blanket rate to all lines.
- Do not quote current inflation figures, index values or market prices from memory; use supplied figures or labelled assumptions.
- Do not interpret contract wording beyond what is quoted; flag ambiguous clauses for the contract owner.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Total cost growth, split into price and volume, with range and top three drivers.

## Line by line
Table: Line | Current cost | Mechanism | Effective date | Price change | Volume change | Budget-year cost | Full-year effect next year.

## Timing effects
Bullets on part-year effects.

## Range
Table: Line | Low | Central | High.

## Assumptions to confirm
Bullets with owner.
</output_format>
