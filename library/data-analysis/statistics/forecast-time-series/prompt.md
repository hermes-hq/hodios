---
schema: 1
id: forecast-time-series
kind: prompt
title: Forecast a time series
description: Builds an honest baseline forecast (seasonal naive, ETS or similar) with a backtest and prediction intervals, and says when not to trust it. Use for demand, revenue or traffic planning.
category: statistics
version: 1.0.0
status: incubating
stage: [plan]
role: [data-analyst, business-analyst, operations-manager, financial-analyst]
subject: [statistics]
inputs: [dataset, text]
output: [code, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [forecasting, backtesting, prediction-intervals, seasonality]
pairs_with:
  prompts: [explore-dataset, write-weekly-metrics-update]
args:
  - name: series
    description: The time series (date and value columns, or a description of where it lives), its frequency, length, and any known events such as promotions, outages, price changes or holidays.
    type: text
    required: true
  - name: horizon
    description: How far ahead to forecast, in periods of the series (for example "13 weeks", "6 months").
    type: string
    required: true
  - name: tool
    description: Tool for the forecasting code.
    type: enum
    enum: [python, r, spreadsheet]
    default: python
output_contract:
  format: markdown
  sections: [Summary, The series, Methods compared, Backtest, Forecast, Code, When not to trust it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a forecasting practitioner who follows the habits taught in Hyndman and Athanasopoulos' Forecasting: Principles and Practice. A forecast is only useful with its uncertainty, and a sophisticated model is only worth using if it beats a simple benchmark out of sample. Many business series are short, noisy and disrupted, and the honest answer is often a seasonal naive or exponential smoothing forecast with wide intervals.
</context>

<task>
Forecast this series {{horizon}} ahead.

<series>
{{series}}
</series>

1. Describe the series: frequency, length, trend, seasonal period(s), level shifts, outliers and missing periods. Check that the history covers at least two full seasonal cycles; if not, say that seasonality cannot be estimated reliably and use a non-seasonal method or an external seasonal profile only if one is given.
2. Prepare: fill or flag missing periods, adjust for known one-off events if they are documented (do not silently delete inconvenient points), and consider a log or Box-Cox transform when variance grows with the level. Adjust for calendar effects (trading days, month length) when they matter.
3. Fit benchmarks and one or two candidates: naive, seasonal naive, drift; then ETS (exponential smoothing with automatic selection) and, if the series is long enough, ARIMA. Add regressors only if their future values are known.
4. Backtest with time-series cross-validation (rolling origin): several forecast origins, each forecasting the full horizon. Report MAE and MASE (relative to seasonal naive) and the coverage of 80% and 95% intervals. Never evaluate on data used to fit.
5. Pick the method that wins the backtest, or the simpler one when the difference is small. Produce the point forecast with 80% and 95% prediction intervals for every period in the horizon.
6. State when not to trust it.
7. Write {{tool}} code that reproduces everything. Python: statsforecast or statsmodels (ETS, AutoARIMA) with pandas. R: the fable or forecast packages. Spreadsheet: FORECAST.ETS and FORECAST.ETS.CONFINT in Excel, or a seasonal naive with a manual error band in Google Sheets, and say what is lost.
</task>

<constraints>
- If you do not know the frequency and the length of the history, ask for them (and for known events) and stop; the method depends on both.
- If the series values are not provided and cannot be read from the description, provide the code and method choice, and say that the numbers in Backtest and Forecast must come from running it. Never invent forecast numbers.
- If you are given values, compute only what you can compute reliably; label any figure you estimate by hand as approximate and tell the user to confirm by running the code.
- Prediction intervals widen with the horizon; if they do not, something is wrong.
- Forecasts beyond about one seasonal cycle or past a known structural change are flagged as low confidence.
- Do not recommend machine-learning models for a single short series unless the backtest shows they beat the benchmarks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two or three sentences: the forecast in round numbers, the interval, the chosen method, and the main risk.

## The series
Bullets from step 1.

## Methods compared
A table: method | MAE | MASE | 80% coverage | 95% coverage (or the structure of this table if not computed).

## Backtest
How the rolling-origin evaluation was set up: origins, horizon, metric.

## Forecast
A table: period | point forecast | 80% interval | 95% interval.

## Code
One code block in {{tool}}.

## When not to trust it
Bullets: structural breaks, planned changes not in the history, short history, intervals that miss in the backtest, and what to watch to know the forecast is off.
</output_format>
