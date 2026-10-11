---
schema: 1
id: forecast-billable-utilisation
kind: prompt
title: Forecast billable utilisation and fee income
description: Forecasts billable hours, utilisation and fee income for a consultancy, agency or practice from booked work, weighted pipeline, capacity, leave and holidays, flagging bench and overload weeks.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, operations-manager, founder, manager]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [utilisation, professional-services, resource-forecast, fee-income]
pairs_with:
  prompts: [forecast-headcount, review-sales-pipeline, write-forecast-commentary]
args:
  - name: people_and_capacity
    description: "People or roles with contracted hours, bill rates, target utilisation, planned leave, public holidays, start and end dates."
    type: text
    required: true
  - name: work
    description: "Booked projects with hours by person or role and week or month, and the pipeline of unsigned work with value, hours, probability and expected start."
    type: text
    required: true
  - name: horizon
    description: How many weeks or months ahead.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Capacity, Forecast utilisation, Fee income, Bench and overload, Actions to consider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In professional services, income is people's time sold, so the forecast is a capacity forecast. Firms that forecast well compute available hours properly (contracted hours minus leave, public holidays, training and internal time), not a flat 40 hours a week; they distinguish booked work, which is near certain, from pipeline, which is weighted by probability and often slips in start date; and they look at utilisation by role and week, because a firm can be 75% utilised on average while seniors are overloaded and juniors sit on the bench. Fee income follows billable hours times realised rate, which is often below the rate card because of discounts, write-offs and fixed-price overruns. Project start dates slip far more often than they come forward, so near-term forecasts should assume some delay on pipeline starts. The useful output names the weeks and roles where action is needed while there is still time to sell, hire contractors or move people.

Horizon: {{horizon}}
</context>

<task>
<people_and_capacity>
{{people_and_capacity}}
</people_and_capacity>

<work>
{{work}}
</work>

1. Compute available hours per person or role per period: contracted hours minus leave, public holidays and non-billable commitments; state any assumption for missing items.
2. Lay booked hours against capacity per period.
3. Add pipeline hours weighted by probability, with a delay assumption on start dates (state it), shown separately from booked work.
4. Compute utilisation per role and period for booked-only and booked-plus-weighted-pipeline, against target.
5. Compute fee income: billable hours times rate, adjusted for realisation if supplied; separate booked and pipeline income.
6. Flag bench periods (utilisation well below target) and overload periods (above about 100% of available hours or above a sustainable level), by role and week.
7. Suggest actions to consider for each flag, with the lead time each needs.
</task>

<constraints>
- Compute only from figures supplied; show the capacity arithmetic for one person or role in full.
- Never add unweighted pipeline to booked work as if certain.
- Do not judge individuals' performance; utilisation is used for planning.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Overall utilisation and fee income for the horizon, booked versus pipeline, and the biggest risk.

## Capacity
Table: Person or role | Contracted | Leave and holidays | Non-billable | Available.

## Forecast utilisation
Table: Role | Period | Available | Booked | Weighted pipeline | Utilisation booked | Utilisation with pipeline | Target.

## Fee income
Table: Period | Booked | Weighted pipeline | Total.

## Bench and overload
Bullets: role, period, gap in hours.

## Actions to consider
Bullets with lead time.
</output_format>
