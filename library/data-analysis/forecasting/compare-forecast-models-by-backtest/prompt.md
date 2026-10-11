---
schema: 1
id: compare-forecast-models-by-backtest
kind: prompt
title: Compare forecast models by backtest
description: Runs a rolling-origin backtest of candidate forecast models on the user's series and picks one on error, bias, interval coverage and stability across windows, with code.
category: forecasting
version: 1.0.0
status: incubating
stage: [verify]
role: [data-scientist, data-analyst, business-analyst, ml-engineer]
subject: [statistics]
inputs: [dataset, text]
output: [code, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [backtesting, model-selection, rolling-origin, mase, bias]
pairs_with:
  prompts: [choose-forecasting-method, measure-forecast-accuracy, forecast-time-series]
args:
  - name: series
    description: "The series or series set: frequency, length, where it lives, and known events. Or a table of backtest results already computed per model and window."
    type: text
    required: true
  - name: candidates
    description: "Models to compare (for example seasonal naive, ETS, ARIMA, Prophet, gradient boosting). Optional; a sensible set is proposed if blank."
    type: text
  - name: decision
    description: What the forecast is used for and its horizon, so the backtest matches the real use (for example "order stock 6 weeks ahead every Monday").
    type: text
    required: true
  - name: tool
    description: Language for the code.
    type: enum
    enum: [python, r]
    default: python
output_contract:
  format: markdown
  sections: [Summary, Backtest design, Results, Choice, Code, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Picking a forecast model by in-sample fit, or by a single train/test split, routinely picks the wrong one: complex models fit history better and forecast worse, and one test window can be a lucky or unlucky stretch. Practitioners use rolling-origin evaluation (time-series cross-validation): many forecast origins, each forecasting the real decision horizon with only data available at that origin, mirroring how the forecast will be used. They compare against a seasonal naive benchmark (MASE scales errors by it), look at bias as well as error because a consistently high forecast costs differently from a noisy one, check that 80% intervals actually cover about 80%, and look at how much each model's error swings between windows. When the difference between models is within the window-to-window noise, the simpler model or a simple average of the top two (forecast combination often beats any single model) is the safer pick.
</context>

<task>
Compare forecast models for this decision: {{decision}}

<series>
{{series}}
</series>
{{#candidates}}

<candidates>
{{candidates}}
</candidates>
{{/candidates}}

1. Design the backtest to match the decision: horizon, refresh cadence (step between origins), the minimum training window, and the number of origins (aim for at least 5 where history allows). State what information is available at each origin; drivers or regressors must use values known at that time.
2. Candidates: always include naive and seasonal naive; add the user's candidates, an ETS model and, where history is long enough, ARIMA. Add a simple combination (mean of the best two).
3. Metrics per model and per window: MAE (or WAPE across series), MASE relative to seasonal naive, bias (mean error and as a percent of actuals), and 80% interval coverage where the model gives intervals. Weight errors at the horizons that matter for the decision.
4. Summarise across windows: mean, spread (standard deviation or range) and the worst window for each model.
5. Choose: the model with the best error and acceptable bias and coverage; if two are within the spread, prefer the simpler or the combination. Say what result would change the choice.
6. If results tables are given instead of data, compute the summary from them and show the arithmetic.
7. Write {{tool}} code that runs the backtest and produces the results table (Python: statsforecast or sktime cross-validation; R: fable with stretch_tsibble).
</task>

<constraints>
- Never use data after an origin to fit, tune or build features for that origin.
- Do not select or tune on the same windows used to report the final comparison without saying so; if tuning is needed, use earlier windows for tuning.
- Do not declare a winner on a difference smaller than the window-to-window spread.
- Do not invent results; when data is not provided, give the code and the table structure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The chosen model, by how much it beat the benchmark, and how confident the choice is.

## Backtest design
Origins, horizon, step, training window, information available at each origin.

## Results
Table: model | mean MAE or WAPE | MASE | bias | 80% coverage | spread across windows | worst window.

## Choice
The pick and the reasoning, plus what would change it.

## Code
One {{tool}} code block.

## Caveats
Bullets: few windows, structural breaks, events in some windows only.
</output_format>
