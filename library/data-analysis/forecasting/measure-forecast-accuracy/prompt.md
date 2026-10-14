---
schema: 1
id: measure-forecast-accuracy
kind: prompt
title: Measure forecast accuracy
description: Measures how good past forecasts were against actuals with the right error metric, bias and forecast value added, and shows where the errors come from and what to change.
category: forecasting
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, business-analyst, operations-manager, financial-analyst]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [forecast-error, bias, wape, mase, forecast-value-added]
pairs_with:
  prompts: [forecast-time-series, add-event-adjustments-to-forecast, write-forecast-commentary]
args:
  - name: forecasts_and_actuals
    description: "Past forecasts and the actuals they predicted: item or series, period, the forecast as made at a stated lag (for example \"made 4 weeks before\"), the actual, and if you have them the statistical forecast before any manual changes and a naive forecast. A file description or pasted table."
    type: text
    required: true
  - name: purpose
    description: What the forecast is used for (stock ordering with a known lead time, staffing, budget, revenue guidance), so accuracy is judged at the lag and level that drive the decision.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Data checks, Accuracy by metric, Bias, Forecast value added, Where the errors are, What to change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review forecast performance the way a demand planning lead does at a monthly accuracy meeting. Most teams measure accuracy badly. MAPE explodes on small or zero actuals and punishes over-forecasts and under-forecasts unequally, so it ranks items wrongly; WAPE (sum of absolute errors divided by sum of actuals) is better for totals, and MASE (error scaled by a naive forecast's error) lets you compare series of different sizes and tells you whether the forecast beat doing nothing clever. Accuracy alone hides bias: a forecast that is always 8% high can score well and still fill the warehouse. Accuracy must be judged at the lag that matters (an order placed with a 6-week lead time depends on the forecast made 6 weeks out, not last week's) and at the level the decision is made. Actuals during stock-outs understate demand. Forecast value added compares each step (naive, statistical, after manual overrides) to see whether the work done on the forecast improves it; often the overrides make it worse.

{{#purpose}}Purpose: {{purpose}}{{/purpose}}
</context>

<task>
<data>
{{forecasts_and_actuals}}
</data>

1. Data checks: confirm what lag each forecast was made at, whether forecasts and actuals use the same units and periods, and flag periods with stock-outs, outages or definition changes that make the actual unreliable. If the lag is unknown, ask for it and say how it changes the reading.
2. Choose metrics for this data and purpose: WAPE for aggregate accuracy, MASE against a naive or seasonal naive benchmark, and MAPE only if no actual is near zero (say why if you drop it). Define each in one line.
3. Compute accuracy overall, by item or segment, and over time, at the decision lag. Show the arithmetic for at least one row so it can be checked.
4. Measure bias: mean error and mean percentage error (signed), and a tracking signal (cumulative error divided by mean absolute deviation) per item; flag items with persistent over- or under-forecasting.
5. Forecast value added: if naive, statistical and final forecasts are given, compare their errors and say which step added or removed accuracy. If they are not given, compute a naive benchmark from the actuals and explain what the team would need to record to measure value added next time.
6. Locate the errors: rank items or segments by their share of total absolute error (a few usually cause most of it), and separate errors from known events, structural changes and noise.
7. Recommend changes: method, process (which overrides to stop), data fixes, and the two or three numbers to track monthly.
</task>

<constraints>
- Compute only from the data given. If values are described but not supplied, give the method and formulas or code to compute them and say the numbers must come from running it; never invent error figures.
- Never compare accuracy across items using MAPE when actuals vary a lot in size; use WAPE or MASE.
- Do not judge a forecast by a single period. Say how many periods the conclusion rests on.
- Treat stock-out periods as censored demand; do not count them as forecast errors without saying so.
- Keep recommendations proportionate to the evidence; a method change needs a backtest, not one bad month.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three or four sentences: overall accuracy, direction of bias, whether the forecast beats naive, and the top fix.

## Data checks
Bullets.

## Accuracy by metric
Table: level or item | WAPE | MASE | MAPE (if valid) | periods.

## Bias
Table: item | mean error | mean % error | tracking signal | verdict.

## Forecast value added
Table: step | error | change versus previous step.

## Where the errors are
Bullets ranked by share of total error, with cause where known.

## What to change
Numbered actions, then the metrics to track.
</output_format>
