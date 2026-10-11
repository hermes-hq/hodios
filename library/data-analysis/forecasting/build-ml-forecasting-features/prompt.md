---
schema: 1
id: build-ml-forecasting-features
kind: prompt
title: Build features for an ML forecasting model
description: Designs and codes leakage-free features for a gradient-boosting or other ML forecast over many series - lags valid at the horizon, rolling stats, calendar, events, prices - with time-based checks.
category: forecasting
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, ml-engineer, data-analyst]
stack: [pandas]
subject: [statistics]
inputs: [dataset, schema, text]
output: [code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [feature-engineering, data-leakage, gradient-boosting, global-models, backtesting]
pairs_with:
  prompts: [forecast-time-series, measure-forecast-accuracy, clean-demand-history]
args:
  - name: data_description
    description: "The tables and columns available (target series with ids and dates, prices, promotions, calendar, store or product attributes), frequency, number of series and history length."
    type: text
    required: true
  - name: forecast_setup
    description: "Horizon, how often forecasts are produced, what data is available at the moment of forecasting (data latency), and the level forecast (item, store, item-store)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Leakage rules, Feature list, Validation design, Code, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Global ML models (gradient boosting such as LightGBM or XGBoost) trained across many series often beat per-series statistical models, and they fail mostly through features rather than algorithms. The classic mistake is leakage: a lag-1 feature looks powerful in training but is not available when forecasting 8 weeks ahead, so either features are built per horizon (direct strategy, lags no shorter than the horizon plus data latency) or the model is applied recursively with its own predictions. Rolling means must be computed on data shifted past the cutoff, target encodings must be fitted on training folds only, and future-known features (calendar, planned prices, planned promotions) are allowed only if they will truly be known at forecast time. Validation must be time-based (rolling origin), never random K-fold, and must be compared with a seasonal naive baseline. Zero-heavy series may need a Tweedie or Poisson objective, and scale differences between series argue for normalising the target or the features per series.
</context>

<task>
<data_description>
{{data_description}}
</data_description>

<forecast_setup>
{{forecast_setup}}
</forecast_setup>

1. Write the leakage rules for this setup: the forecast cutoff, data latency, minimum lag per horizon, and which inputs are known in the future versus only up to the cutoff.
2. Choose the strategy (direct per horizon, recursive, or multi-output) and justify it.
3. Design the features: lags and rolling statistics valid for the horizon, calendar and holiday features, price and promotion features (actual and relative to the item's usual price), series attributes, and hierarchy aggregates. For each, say whether it is known at forecast time.
4. Design the validation: rolling origin folds that mimic production, the metric matched to the business (for example weighted scaled error), and a seasonal naive baseline to beat.
5. Write pandas code that builds the features from a long table with a cutoff argument, so the same function serves training and production, plus a check that fails if any feature uses data after the cutoff.
6. List risks: cold-start series, regime changes, promotions without history, and overfitting to the validation window.
</task>

<constraints>
- No feature may use target values after the cutoff minus the latency; the code must enforce it.
- Never use random K-fold cross-validation for this time series problem.
- Use only the columns described; mark any feature that needs data not described.
- Keep code runnable with pandas and numpy; the model library is optional and named, not required.
- Do not report accuracy figures you did not compute; say the code has not been run unless it has.
</constraints>

<output_format>
## Summary
Strategy, number of features, and how validation works.

## Leakage rules
Bullets.

## Feature list
Table: Feature | Definition | Known at forecast time | Valid for horizons.

## Validation design
Folds, metric, baseline.

## Code
Python code with the feature function and the leakage check.

## Risks
Bullets.
</output_format>
