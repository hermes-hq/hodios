---
schema: 1
id: forecast-with-causal-drivers
kind: prompt
title: Forecast with planned drivers
description: Forecasts sales or volume from drivers the business plans, such as price, marketing spend or store count, using regression with time-series errors and scenario inputs.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [data-analyst, data-scientist, business-analyst, financial-analyst]
subject: [statistics, economics]
inputs: [dataset, text]
output: [code, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [dynamic-regression, price-elasticity, adstock, scenarios, regressors]
pairs_with:
  prompts: [forecast-with-leading-indicators, add-event-adjustments-to-forecast, review-forecast-assumptions]
args:
  - name: history
    description: "The target series and the driver series over the same periods (for example weekly units, average price, media spend, number of stores, distribution), with frequency, length and known events."
    type: text
    required: true
  - name: plans
    description: "Planned future values of each driver, or the scenarios to compare (for example price up 5% in March, spend cut by a third)."
    type: text
    required: true
  - name: tool
    description: Language for the code.
    type: enum
    enum: [python, r]
    default: python
output_contract:
  format: markdown
  sections: [Summary, Drivers, Model, Fit and backtest, Scenarios, Code, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When the business controls the drivers of a series (its own prices, marketing budget, opening hours, store count), a forecast that ignores them cannot answer the questions planners actually ask: what if we raise prices, what if we cut spend. The standard tool is dynamic regression: a regression on the drivers with ARIMA errors (or ETS on the residuals), so seasonality and autocorrelation are not mistaken for driver effects. Experts model price in logs (log units on log price gives an elasticity; a 10% cut at elasticity -1.5 gives 0.9 to the power -1.5, about +17%, not +15%), model media with a carry-over (adstock) and diminishing returns, and use counts like stores as a scaling term. The big traps: drivers set in response to demand (prices cut when sales were weak, spend raised for peak season) bias the estimated effect; a driver that barely varied in history has an unknown effect; and plans outside the historical range are extrapolation.
</context>

<task>
<history>
{{history}}
</history>

<plans>
{{plans}}
</plans>

1. Describe the target and each driver: range covered in history, how often it changed, and whether it was set in response to expected demand (seasonal spend, reactive discounts).
2. Specify the model: transforms (logs for price and volume), seasonality, lags or adstock for marketing with the decay chosen by backtest, a saturation curve if spend levels vary widely, and ARIMA or similar errors. Justify every term; drop drivers with no credible variation.
3. Fit and backtest: rolling-origin windows feeding the actual driver values at each origin (so the test isolates model error from assumption error), compared with a model without drivers. Keep a driver only if it improves the backtest.
4. Report effects in business terms with uncertainty: elasticity with interval, return per unit of spend with carry-over, effect per added store.
5. Forecast each scenario in the plans with prediction intervals, and show the difference between scenarios with its own uncertainty.
6. Flag plans outside the historical range and say how much to discount the result.
7. Write {{tool}} code (Python: statsmodels SARIMAX with exog or statsforecast AutoARIMA with exogenous columns; R: fable ARIMA with xreg).
</task>

<constraints>
- Present estimated effects as associations from observational data unless there was an experiment; say what experiment would confirm them.
- Do not invent elasticities, adstock rates or effects; estimate them from the data or label clearly as assumed inputs.
- Never use a driver in the forecast whose future values are not planned or known.
- If the drivers barely varied, say the effect cannot be estimated and offer an assumption-based scenario instead.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The base forecast, the scenario differences, and how much to trust them.

## Drivers
Table: driver | historical range | variation | endogeneity risk | kept or dropped.

## Model
The specification in plain words and as a formula.

## Fit and backtest
Accuracy with and without drivers.

## Scenarios
Table: scenario | forecast | interval | difference from base.

## Code
One {{tool}} code block.

## Caveats
Bullets.
</output_format>
