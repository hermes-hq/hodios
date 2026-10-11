---
schema: 1
id: forecast-cloud-spend
kind: prompt
title: Forecast cloud spend
description: Forecasts monthly cloud bills from billing history by service, splitting committed, steady, usage-driven and project spend, with credits, commitments and a budget alert threshold.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [devops-engineer, sre, financial-analyst, engineering-manager]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [finops, cloud-costs, commitments, budget-alerts, usage-drivers]
pairs_with:
  prompts: [estimate-cloud-costs, reduce-cloud-spend, explain-cloud-bill-to-finance, set-up-cloud-cost-allocation]
args:
  - name: billing_history
    description: "Monthly (or daily) cost by service, account or team for the last 6-24 months, stating whether figures are amortised or cash, and the currency."
    type: text
    required: true
  - name: drivers
    description: "Business drivers that usage tracks (customers, requests, data volume) with their growth plans; commitments or reservations and their end dates; credits and when they expire; planned projects or migrations."
    type: text
    required: true
  - name: horizon
    description: Months to forecast and the budget the forecast is compared against, if any.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Spend breakdown, Forecast, Step changes, Range, Budget alerts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cloud bills are forecast badly when someone extends the total by a growth percentage. FinOps practitioners split the bill: committed spend (reservations, savings plans, committed-use discounts) that is fixed until the term ends; steady baseline (databases, always-on clusters) that moves in steps; usage-driven spend (compute autoscaling, egress, storage growth, requests) that tracks a business driver; and project or one-off spend. They watch for the events that cause the jumps finance remembers: promotional credits expiring, commitments ending and usage reverting to on-demand prices, a migration running old and new environments in parallel, storage that grows every month and is never deleted, and month length (a 31-day month costs about 3% more than a 30-day month at the same daily run rate). They state whether the figures are amortised (commitments spread over the term) or cash (upfront payments when billed), because the two forecasts differ.
</context>

<task>
Forecast cloud spend {{horizon}}.

<billing_history>
{{billing_history}}
</billing_history>

<drivers>
{{drivers}}
</drivers>

1. Check the history: amortised or cash, currency, credits netted or not, anomalies (a runaway job, a one-off data transfer) to exclude, and whether month length explains swings.
2. Split spend into committed, steady baseline, usage-driven and project or one-off lines, by the services and accounts given.
3. Forecast each line: commitments flat until their end date; baseline flat or stepped for known changes; usage-driven as cost per unit of driver times the driver forecast (check the ratio's trend, since efficiency work or growth discounts move it); storage as cumulative growth; projects from their plans, including parallel running during migrations.
4. Add step changes on their dates: credits expiring, commitments ending or starting, price changes the user knows of, projects starting or ending.
5. Convert daily run rates to months using the days in each month.
6. Give low, central and high cases, varying driver growth and project timing.
7. Set budget alerts: monthly thresholds (for example forecast plus 10%) and a daily run-rate trigger that flags a breach early, with what to check first when it fires.
</task>

<constraints>
- Do not invent provider prices, discount rates or credit amounts; use the billing data and drivers given.
- Keep amortised and cash views separate and say which one the forecast is.
- Do not recommend buying commitments as part of the forecast; note opportunities separately as suggestions.
- Show arithmetic for at least one line and label approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Forecast for the horizon, the range, and the biggest step change.

## Spend breakdown
Table: line | current monthly | type | driver.

## Forecast
Table: month | committed | baseline | usage-driven | projects | credits | total.

## Step changes
Table: date | change | monthly effect.

## Range
Low, central and high and what differs.

## Budget alerts
Thresholds, daily trigger, triage checklist.
</output_format>
