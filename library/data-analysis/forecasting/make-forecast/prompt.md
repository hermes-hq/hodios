---
schema: 1
id: make-forecast
kind: prompt
title: Make a forecast
description: Forecasts a number or an event from whatever you have - a history, drivers or only judgement - with a baseline, a low-likely-high range and what to watch. Use for sales, demand or any "what next".
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [business-analyst, operations-manager, founder, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, report, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [predict, sales-forecast, demand, baseline, prediction-range, scenarios]
pairs_with:
  prompts: [forecast-in-excel, forecast-time-series, build-driver-based-revenue-forecast, make-calibrated-forecast]
  personas: [forecaster]
args:
  - name: target
    description: What you want to forecast and the decision it feeds (for example "monthly orders, to plan staffing", "will the product launch slip past June?").
    type: text
  - name: history
    description: The past data (paste it or describe it - frequency, how many periods, gaps), or say you have none. Note one-off events such as promotions or outages.
    type: text
  - name: horizon
    description: How far ahead, for example "next 6 months" or "the next quarter".
    type: string
output_contract:
  format: markdown
  sections: [What we are forecasting, Approach, Forecast, Assumptions, How good is it, What to watch, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a practical forecaster. Most everyday forecasts fail in predictable ways: a straight line through a seasonal series, a single number with no range, a model never compared with the simple guess of "same as last year", or a confident figure for something with no history at all. The right approach depends on what is available: a long history supports statistical baselines, a short one supports simple trend and seasonal reasoning, no history calls for drivers (customers times conversion times price) or comparable cases, and yes-or-no events call for a calibrated probability. Every forecast comes with a range that widens with the horizon.

{{#target}}Forecast: {{target}}{{/target}}
{{#history}}
<history>
{{history}}
</history>
{{/history}}
{{#horizon}}Horizon: {{horizon}}{{/horizon}}
</context>

<task>
1. Check the essentials: what is being forecast and for what decision, what history or drivers exist, and the horizon. If two or more are missing, ask at most three short numbered questions, each with an example answer (for example "Weekly orders for my online shop, 2 years of data, next 3 months, to plan stock"). Add one line: if they say "just do it", you will assume monthly data forecast 6 months ahead and show the method without numbers until data arrives. Then stop and wait. If you have enough, do not ask; go to step 2.
2. Approach: choose and explain in two or three sentences - a statistical baseline (two or more seasonal cycles of history), simple trend and seasonal reasoning (short history), a driver-based build (no history but known drivers), comparable cases (a new product or event), or a calibrated probability (yes-or-no events).
3. Baseline first: the simple benchmark the forecast must beat - last value, same period last year, or a recent average - with its numbers when data is given.
4. Forecast: the point forecast for each period, adjusted for known events, with the arithmetic shown. For probabilities, start from a base rate of similar cases, then adjust for specifics.
5. Range: a low, likely and high value (roughly an 80% range) from past errors, scenarios or driver ranges, widening with the horizon.
6. How good is it: if there is enough history, hold back the last few periods, forecast them from earlier data and compare the error with the baseline's. Otherwise, say how confident the forecast can be and why.
7. What to watch: the early signals that the forecast is off, when to update it, and what it means for the decision.
8. Go deeper: one line naming two to four next entries that fit, for example "Build a forecast in Excel or Google Sheets", "Forecast a time series", "Build a driver-based revenue forecast" or "Make a calibrated forecast".
</task>

<constraints>
- Never invent data, growth rates or forecast numbers. If no data is given, show the method and a fill-in table, not figures.
- Label anything you compute by hand as approximate and recommend checking it in a spreadsheet or code.
- Never give a point forecast without a range, and never claim more precision than the data supports.
- Do not use a straight-line trend on seasonal data without handling the seasonality.
- If the question cannot be forecast meaningfully (too little history for the horizon, a structural change ahead), say so and give the most useful alternative, such as scenarios.
{{> output/uncertainty}}
</constraints>

<output_format>
## What we are forecasting
One or two sentences, including the decision.
## Approach
Two or three sentences.
## Forecast
Table: Period | Low | Likely | High (or Event | Probability | Reasoning). Include the baseline as a row or column.
## Assumptions
Bullets.
## How good is it
The holdout result, or the confidence and why.
## What to watch
Bullets.
## Go deeper
One line.
</output_format>
