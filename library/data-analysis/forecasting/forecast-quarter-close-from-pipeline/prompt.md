---
schema: 1
id: forecast-quarter-close-from-pipeline
kind: prompt
title: Forecast quarter-end sales from pipeline
description: Forecasts quarter-end bookings from open pipeline by stage and age using historical in-quarter win rates and cycle times, adds create-and-close deals, and compares the range with the rep call.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [sales-rep, manager, business-analyst, executive]
subject: [saas]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-pipeline, win-rates, weighted-pipeline, commit, slippage]
pairs_with:
  prompts: [review-sales-pipeline, project-month-end-from-partial-data, present-forecast-uncertainty]
args:
  - name: pipeline
    description: "Open deals or stage totals: amount, stage, created date, expected close date, and closed-won so far this quarter. Plus today's date and quarter end."
    type: text
    required: true
  - name: history
    description: "Past quarters: share of pipeline at each stage (at a similar point in the quarter) that closed in-quarter, typical days from each stage to close, slip rates, and how much was created and closed within the same quarter."
    type: text
    required: true
  - name: rep_call
    description: The sales team's own commit and best-case numbers, if any. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Method, Expected bookings, Range, Versus the call, Deals that decide the quarter]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sales leaders cross-check the rep roll-up with a statistical pipeline forecast. The naive version multiplies each deal by its CRM stage probability, but CRM probabilities are rarely calibrated and ignore time: the right rate is the historical share of pipeline in that stage, at this point in the quarter, that closed before quarter end. Deals that are old for their stage, have pushed their close date more than once, or have no recent activity close far less often. Some bookings come from deals not yet in the pipeline (created and closed in the quarter), which a pipeline-only forecast misses. When a few large deals dominate, the expected value hides a lumpy outcome: the honest range comes from simulating each big deal as win or lose rather than from a percentage band.
</context>

<task>
<pipeline>
{{pipeline}}
</pipeline>

<history>
{{history}}
</history>
{{#rep_call}}

<rep_call>
{{rep_call}}
</rep_call>
{{/rep_call}}

1. Work out the days left in the quarter and, for each stage, whether its typical time to close fits within them.
2. Apply historical in-quarter conversion rates by stage (adjusted for deal age or pushed close dates if the history supports it) to get expected bookings from open pipeline. Show the arithmetic per stage.
3. Add closed-won to date and the expected create-and-close amount for the remaining days, from history.
4. Build the range: treat large deals (for example above 10% of the expected remainder) individually as win or lose with their probability, and the rest as a pooled amount; give a low (about 10th percentile), central and high (about 90th percentile) figure, describing how they were derived.
5. Compare with the rep commit and best case; explain the gap by deal or stage.
6. List the deals that decide the quarter and what evidence would firm each one up.
</task>

<constraints>
- Use historical conversion rates given; if only CRM stage probabilities are available, say they are uncalibrated and treat the result as rough.
- Do not count deals with close dates after quarter end unless history shows such deals often pull in.
- Do not judge individual reps; discuss deals and evidence.
- Show arithmetic and label approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Central forecast, range, and the gap to the call.

## Method
Rates, time left, create-and-close, large-deal handling.

## Expected bookings
Table: source | amount | rate | expected.

## Range
Low, central, high and how each was derived.

## Versus the call
Commit and best case compared with the statistical forecast.

## Deals that decide the quarter
Table: deal | amount | stage | evidence needed.
</output_format>
