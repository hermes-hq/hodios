---
schema: 1
id: build-driver-based-revenue-forecast
kind: prompt
title: Build a driver-based revenue forecast
description: Forecasts monthly revenue from a driver tree (traffic, conversion, order value, price, volume, customers) so every assumption can be changed, owned and checked against history.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [financial-analyst, business-analyst, founder, data-analyst]
subject: [ecommerce, retail]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [driver-tree, sensitivity, conversion-rate, average-order-value, scenarios]
pairs_with:
  prompts: [build-kpi-tree, design-spreadsheet-model, review-forecast-assumptions, present-forecast-uncertainty]
args:
  - name: business
    description: "How the business makes money (online shop, restaurant, app with purchases, wholesale), and the revenue lines to forecast."
    type: text
    required: true
  - name: history
    description: "Monthly history of revenue and as many drivers as available (sessions or visits, orders, conversion, average order value, units, price, active customers, purchase frequency), ideally 12-24 months."
    type: text
    required: true
  - name: plans
    description: "Known plans that move drivers: marketing, price changes, new products, opening hours, site changes. Optional."
    type: text
  - name: horizon
    description: Months to forecast.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Driver tree, Reconciliation to history, Driver assumptions, Forecast, Sensitivity, Model layout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A driver-based forecast replaces "revenue grows 10%" with an identity such as revenue = sessions x conversion rate x average order value, or customers x purchase frequency x basket, or units x price, so each driver can be forecast by the person who owns it and changed in scenarios. Practitioners first check that the tree reproduces historical revenue (returns, discounts, tax and currency often make the identity miss, and the gap needs its own line), then forecast each driver from its own history and plans rather than growing them all by the same rate. They watch for linked drivers: more paid traffic usually lowers conversion, discounts raise conversion but lower order value, so moving one driver alone overstates the effect. Errors multiply through the tree, so a small optimism in each of three drivers becomes a large optimism in revenue; a sensitivity table showing which driver moves revenue most tells management where to focus.
</context>

<task>
Forecast revenue {{horizon}} ahead for this business.

<business>
{{business}}
</business>

<history>
{{history}}
</history>
{{#plans}}

<plans>
{{plans}}
</plans>
{{/plans}}

1. Choose the driver tree that fits the business and the data available, down to drivers someone can own and measure. Explain why this tree and not another.
2. Reconcile the tree to history: compute revenue from the drivers for past months and compare with booked revenue; add a reconciling line (returns, discounts, timing) if needed.
3. Forecast each driver separately: its seasonality and trend from history, plus the plans, with the link to other drivers stated (for example lower conversion on extra paid traffic).
4. Multiply through to monthly revenue by line, and show one month's arithmetic in full.
5. Run a sensitivity table: revenue change for a plausible change in each driver (for example traffic plus or minus 10%, conversion plus or minus 0.2 points, order value plus or minus 5%), ranked by impact.
6. Give a low, base and high case built from driver ranges, not a flat percentage on revenue.
7. Describe the spreadsheet or model layout: input cells per driver and month, calculation rows, checks, and an owner per driver.
</task>

<constraints>
- Every driver value must trace to history, a plan given, or a labelled assumption; do not invent benchmarks such as industry conversion rates.
- Do not move linked drivers independently without saying so.
- Show the arithmetic; label hand calculations as approximate.
- Keep the forecast honest about seasonality: use each driver's seasonal pattern, not an average month.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Base revenue for the horizon, the range, and the most sensitive driver.

## Driver tree
The identity and its branches, as an indented list.

## Reconciliation to history
Table: month | revenue from drivers | booked revenue | gap and reason.

## Driver assumptions
Table: driver | recent level | forecast basis | owner role.

## Forecast
Table: month | each driver | revenue, with low and high totals.

## Sensitivity
Table: driver change | revenue impact, ranked.

## Model layout
How to lay it out in a spreadsheet so assumptions are easy to change.
</output_format>
