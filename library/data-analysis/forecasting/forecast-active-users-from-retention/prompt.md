---
schema: 1
id: forecast-active-users-from-retention
kind: prompt
title: Forecast active users from retention
description: Forecasts daily or monthly active users by stacking acquisition cohorts on retention curves, and shows how much better retention or more sign-ups would move the total.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, data-analyst, founder, data-scientist]
subject: [saas]
inputs: [dataset, text]
output: [table, code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cohort-retention, mau, dau, user-growth, layer-cake]
pairs_with:
  prompts: [calculate-active-users-in-sql, forecast-subscription-revenue, present-forecast-uncertainty]
args:
  - name: retention
    description: "Retention by cohort age (for example share of a sign-up month's users active in month 1, 2, 3...), how 'active' is defined, and whether returning lapsed users are counted."
    type: text
    required: true
  - name: acquisition
    description: "New users per period so far and planned (by channel if possible), and the current active user count."
    type: text
    required: true
  - name: horizon
    description: How far ahead, and whether daily or monthly active users are needed.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Retention curve, Cohort stack, Forecast, What moves the total, Code or sheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Active users are the sum of surviving users from every past sign-up cohort plus the newest cohort: active in period t equals the sum over cohorts c of new users in c times retention at age t minus c. Product analysts build this "layer cake" because a top-line trend hides what drives it: a product can grow MAU with poor retention as long as acquisition keeps rising, and stall the moment acquisition flattens. The shape of the retention curve decides the long run: if it decays to zero, MAU plateaus at roughly new users per period times the sum of the retention curve; if it flattens at a positive level, MAU keeps growing even with flat acquisition. Fitting the tail matters, since young cohorts have only a few observed ages; a power-law or flattening fit extrapolates better than assuming the last observed rate. Definitions matter: retention measured as "active in exactly month k" and "active in month k or later" give different numbers, and reactivated users must be counted once.
</context>

<task>
Forecast active users {{horizon}}.

<retention>
{{retention}}
</retention>

<acquisition>
{{acquisition}}
</acquisition>

1. Check definitions: what counts as active, whether retention is measured in exactly that period, and whether reactivated users are included. Ask if unclear, since the model must use the same definition as the reported active-user number.
2. Build the retention curve: average by age weighted by cohort size, look at whether recent cohorts retain better or worse, and extrapolate the tail with a flattening or power-law fit. State the assumed long-run floor.
3. Reconstruct the current active total from past cohorts and compare with the reported figure; the gap is reactivation, definition differences or data issues, and needs its own line.
4. Stack planned acquisition on the curve to forecast active users per period. For DAU, use daily or weekly retention, or a DAU-to-MAU ratio from history with its weekday pattern.
5. Show what moves the total: the effect of plus or minus 10% acquisition, of better early retention (for example month-1 retention up 5 points), and of a higher long-run floor, at the end of the horizon.
6. Give low, central and high cases and the arithmetic for one period.
7. Provide a short Python (pandas) or spreadsheet layout for the cohort matrix.
</task>

<constraints>
- Do not invent retention rates or acquisition plans; use the inputs or label assumptions.
- Do not extrapolate a flat retention floor from cohorts that have not been observed long enough; say how uncertain the tail is.
- Keep active-user definitions consistent between history and forecast.
- Show arithmetic and label approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Active users at the end of the horizon, the range, and the biggest lever.

## Retention curve
Table: age | retention | source (observed or fitted).

## Cohort stack
How each cohort contributes in one forecast period, with arithmetic.

## Forecast
Table: period | new users | returning from past cohorts | active total | low | high.

## What moves the total
Table: change | active users at horizon end | difference.

## Code or sheet
A short pandas code block or a spreadsheet layout.
</output_format>
