---
schema: 1
id: build-sales-budget-forecast
kind: prompt
title: Build next year's sales budget
description: Builds next year's monthly sales budget by product or region from history, a bridge of growth assumptions and a seasonal phasing, with a floor, a base and a stretch case.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [financial-analyst, business-analyst, founder, executive]
subject: [economics]
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
tags: [annual-budget, phasing, sales-bridge, price-volume-mix, stretch-target]
pairs_with:
  prompts: [build-annual-operating-plan, reconcile-top-down-and-bottom-up-forecasts, review-forecast-assumptions, forecast-cost-inflation-for-budget]
args:
  - name: history
    description: "Monthly sales for the last two or three years by product, region or channel (whatever the budget is split by), in value and ideally units."
    type: text
    required: true
  - name: assumptions
    description: "What is expected next year: price changes and their dates, customers won or lost, new products or locations, market growth, capacity limits, any top-down target."
    type: text
    required: true
  - name: split
    description: "How the budget must be broken down (product, region, channel, rep) and the fiscal year start."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Baseline, Bridge to budget, Monthly phasing, Floor base and stretch, Assumptions register]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A sales budget is the number a business plans costs, hiring and cash against, so it must be explainable line by line. Finance teams build it as a bridge from a clean baseline (last twelve months, adjusted for one-offs and lost customers) through separate steps for volume, price (only from the month it takes effect), mix, new products or sites (with ramp-up) and won or lost customers, then phase each line by month using its own seasonal shape and working days. The classic errors: applying a price rise to the full year when it starts in April; growing a baseline that still contains a customer who has left; spreading the annual number evenly across months so every month shows a false variance; and mixing up a budget (a committed plan) with a target (a stretch) and a forecast (the best estimate). A floor and a stretch case alongside the base give management a range to plan costs against.
</context>

<task>
Build the sales budget split by {{split}}.

<history>
{{history}}
</history>

<assumptions>
{{assumptions}}
</assumptions>

1. Build the baseline: last twelve months (or the latest fiscal year) per line, removing one-offs and revenue from customers or products that will not continue, and show the adjustments.
2. Build the bridge from baseline to budget, one step per assumption: volume growth, price (pro-rated from its effective month), mix, new products or sites with a ramp-up, customers won or lost. Apply steps in a stated order and avoid double counting (a market growth assumption and a rep-by-rep growth assumption are not both added).
3. Phase each line by month from its own seasonal shape (average share of the year per month over two or three years) adjusted for working days and dated events such as a price change or launch.
4. Produce floor, base and stretch: change only the uncertain assumptions, and say which ones and by how much.
5. If there is a top-down target, compare it with the bottom-up base and show the gap and what would have to be true to close it; do not quietly force the numbers to match.
6. Check sense: implied growth versus history, implied units versus capacity, average price trend.
7. List every assumption with an owner role and the evidence behind it.
</task>

<constraints>
- Show arithmetic for each bridge step; label approximations.
- Do not invent market growth rates, customer wins or prices; use those given or mark a placeholder for the user to fill.
- Keep budget, target and forecast distinct in wording.
- If history is shorter than a year or seasonality is unclear, say how phasing was done and the risk.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Base budget total, growth versus last year, floor and stretch, and the main assumptions.

## Baseline
Table: line | last twelve months | adjustments | baseline.

## Bridge to budget
Table: step | amount | basis.

## Monthly phasing
Table: line by month, with totals.

## Floor base and stretch
Table and which assumptions change.

## Assumptions register
Table: assumption | value | owner role | evidence | risk.
</output_format>
