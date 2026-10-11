---
schema: 1
id: forecast-many-series-in-python
kind: prompt
title: Forecast thousands of series in Python
description: Builds a pipeline that forecasts thousands of SKU, store or account series with statsforecast or similar, segmented by history and demand pattern, with backtests and fallbacks.
category: forecasting
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, data-analyst, ml-engineer, data-engineer]
stack: [pandas]
subject: [statistics, supply-chain, retail]
inputs: [dataset, schema, text]
output: [code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [statsforecast, sku-level, backtesting, cold-start, wape]
pairs_with:
  prompts: [clean-demand-history, forecast-intermittent-demand, reconcile-top-down-and-bottom-up-forecasts, build-ml-forecasting-features]
args:
  - name: data_description
    description: "The data: table and columns (series id, date, value), frequency, number of series, typical and minimum history length, how zero sales are recorded, and attributes such as category or store."
    type: text
    required: true
  - name: horizon
    description: Forecast horizon in periods, and how often the forecast is refreshed.
    type: string
    required: true
  - name: constraints
    description: Runtime limits, where it runs (laptop, scheduled job, cluster), and what consumes the output. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Data preparation, Segmentation, Models and fallbacks, Backtest, Code, Operating it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Forecasting many series is a pipeline problem more than a model problem. Experienced practitioners segment before modelling: series with long, smooth history get a statistical model per series (AutoETS, AutoTheta, AutoARIMA, as in Nixtla's statsforecast, which fits them fast in parallel); intermittent series get Croston-type or ADIDA/IMAPA methods (Syntetos-Boylan classification: average inter-demand interval of about 1.32 and squared coefficient of variation of about 0.49 are the usual cut-offs); short series inherit a seasonal profile from their category or fall back to a simple average or naive; brand-new series need a cold-start rule. The silent killers are data issues: in long-format sales tables a missing row usually means zero sales, not missing data, so dates must be completed per series from its first sale; discontinued items must be dropped; and stockouts look like zero demand. Accuracy is judged across the portfolio with volume-weighted measures such as WAPE and against a seasonal naive benchmark, because average MAPE is dominated by tiny series.
</context>

<task>
Design and code a pipeline that forecasts every series {{horizon}} ahead.

<data>
{{data_description}}
</data>
{{#constraints}}

<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}

1. Prepare the data in long format (`unique_id`, `ds`, `y`): complete the date grid per series from its first non-zero date to the last date, fill absent rows with zero only where absence means no sales (ask if unclear), drop or flag discontinued series, and flag known stockout periods rather than treating them as demand.
2. Segment series by history length (shorter than two seasonal cycles, longer) and demand pattern (smooth, erratic, intermittent, lumpy by ADI and CV squared). Report the count and volume share of each segment.
3. Assign models per segment: for example AutoETS and SeasonalNaive for long smooth series, CrostonOptimized or ADIDA for intermittent ones, a category-level seasonal profile or HistoricAverage for short ones, and a rule for new series. Set a `fallback_model` so one failing series does not stop the run.
4. Backtest with `cross_validation` over several windows (`n_windows`, `step_size` equal to the refresh cadence, `h` equal to the horizon). Report WAPE and bias overall and per segment, and accuracy relative to seasonal naive; choose per segment, not per series, unless history is long enough to make per-series selection stable.
5. Produce forecasts with `level=[80, 95]`, clip negatives at zero, and write a tidy output with model used and segment.
6. Write the Python code end to end with statsforecast (or an equivalent library if the user names one), pandas, and parallel fitting; note the expected runtime driver (series count times models times windows).
7. Describe how to run it on a schedule: input checks (row counts, date coverage), drift monitoring per segment, and what to log.
</task>

<constraints>
- Ask how missing rows should be read before filling with zeros if the description does not say.
- Do not report average MAPE across series as the headline; use WAPE or MASE and say why.
- Do not drop poorly forecast series from the evaluation to make the numbers look better.
- Do not invent accuracy or runtime figures; give code that produces them.
- Keep deep-learning or global ML models as an optional next step only if the user's scale and data support it, and only if they beat the statistical backtest.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The pipeline in three sentences: segments, models, how it is judged.

## Data preparation
Bullets: grid completion, zero handling, stockouts, discontinued items.

## Segmentation
Table: segment | rule | models | fallback.

## Models and fallbacks
Why each model fits its segment; cold-start rule.

## Backtest
Windows, metrics, and the results table structure (segment | WAPE | bias | vs seasonal naive).

## Code
One Python code block.

## Operating it
Bullets: schedule, input checks, monitoring, logging.
</output_format>
