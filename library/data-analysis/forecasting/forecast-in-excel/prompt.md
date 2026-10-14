---
schema: 1
id: forecast-in-excel
kind: prompt
title: Build a forecast in Excel or Google Sheets
description: Builds a forecast with spreadsheet formulas (FORECAST.ETS, TREND or seasonal indices), tests it on a held-out stretch against a seasonal naive and adds a range, for people who do not code.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [business-analyst, operations-manager, financial-analyst, founder]
stack: [excel, google-sheets]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [spreadsheet-formulas, seasonality, holdout-test, prediction-intervals]
pairs_with:
  prompts: [forecast-time-series, present-forecast-uncertainty, design-spreadsheet-model]
args:
  - name: data
    description: "What the history looks like: the date column and value column (or the values themselves), the frequency (daily, weekly, monthly), how many periods there are, gaps, and any known one-off events."
    type: text
    required: true
  - name: horizon
    description: How far ahead to forecast, in periods (for example "6 months", "13 weeks").
    type: string
    required: true
  - name: app
    description: The spreadsheet app in use.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Summary, Sheet layout, Formulas, Holdout check, Range, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most business forecasts live in spreadsheets, and most spreadsheet forecasts are a trendline dragged forward with no test and no range. Excel (2016 and later, desktop and web) has exponential smoothing built in: FORECAST.ETS fits the additive error, trend and seasonality (AAA) version of triple exponential smoothing, FORECAST.ETS.CONFINT gives the half-width of a prediction interval, and FORECAST.ETS.SEASONALITY reports the season length it detected. These need a timeline with a constant step; ETS seasonality is additive, so a series whose seasonal swings grow with its level is better forecast on its logarithm and converted back with EXP. Google Sheets has no ETS functions; there the honest options are a seasonal naive (same period last year, times a growth factor), TREND or FORECAST.LINEAR on deseasonalised values with seasonal indices, or GROWTH for steady percentage growth. Whatever the method, the forecast is only credible if it beats a seasonal naive on data it was not fitted to.
</context>

<task>
Build a forecast {{horizon}} ahead in {{app}}.

<data>
{{data}}
</data>

1. Check the data: frequency, number of periods, gaps, duplicates and one-offs. Seasonality needs at least two full cycles (24 months for monthly data with a yearly pattern); with less, say so and use a non-seasonal method.
2. Lay out the sheet: one row per period, dates in column A with a constant step and no blanks, values in column B, a flag column for one-off events, and a separate block for the forecast. Use named ranges or absolute references so formulas can be filled down.
3. Choose the method for {{app}}:
   - Excel: FORECAST.ETS(target_date, values, timeline, seasonality, data_completion, aggregation), with seasonality set to the known period (12 for monthly with a yearly pattern, 7 for daily with a weekly one) or 1 for auto-detect, checked with FORECAST.ETS.SEASONALITY. Mention the Forecast Sheet button (Data tab) as the point-and-click route for desktop Excel.
   - Google Sheets: seasonal indices (average of each period's ratio to its centred moving average, normalised to average 1), a TREND or FORECAST.LINEAR on the deseasonalised series, then multiply back; or seasonal naive times growth for short or noisy data.
   - If seasonal swings grow with the level, work on LN(value) and convert back with EXP.
4. Holdout check: hide the last stretch (one horizon, or at least 6 periods), forecast it using only earlier rows, and compute MAE and the MAE of a seasonal naive (value one season earlier) over the same stretch with formulas. Keep the method only if it wins or ties; otherwise use the seasonal naive.
5. Add a range: in Excel, FORECAST.ETS.CONFINT at 80% and 95%; in Sheets, an empirical band from the holdout errors (for example the 10th and 90th percentile of past errors added to the point forecast), widening with the horizon.
6. Refit on the full history and give the final forecast table.
7. If values were given, compute what you reliably can and label hand-computed figures as approximate; tell the user to trust the sheet's results over yours.
</task>

<constraints>
- Give exact formulas with cell references matching the layout in step 2; do not describe them vaguely.
- Never use a linear trendline on a seasonal series without removing seasonality first.
- Do not invent data or forecast figures you could not compute; show how the sheet will produce them.
- Missing periods must be filled or flagged before using ETS; say which choice FORECAST.ETS's data_completion argument makes (0 treats missing as zero, 1 interpolates).
- If the history is too short for the requested horizon (for example 10 periods to forecast 24 ahead), say the forecast is low confidence or decline the long end.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The method chosen, why, and what the holdout showed, in two or three sentences.

## Sheet layout
Columns and rows, with what goes where.

## Formulas
Each formula in a code block with the cell it goes in and how to fill it down.

## Holdout check
How the test is set up and the two MAE figures (or the formulas that produce them).

## Range
How the 80% and 95% band is built and how to read it.

## Pitfalls
Bullets: gaps, one-offs, short history, changes the history does not contain.
</output_format>
