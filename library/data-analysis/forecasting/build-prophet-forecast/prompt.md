---
schema: 1
id: build-prophet-forecast
kind: prompt
title: Build a Prophet forecast in Python
description: Writes a Prophet forecast in Python with holidays, changepoint and seasonality tuning, Prophet's own cross-validation and a check against seasonal naive and ETS baselines.
category: forecasting
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, data-analyst, ml-engineer]
stack: [pandas]
subject: [statistics]
inputs: [dataset, text]
output: [code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prophet, holidays, changepoints, cross-validation, baselines]
pairs_with:
  prompts: [forecast-time-series, clean-demand-history, add-event-adjustments-to-forecast]
args:
  - name: series
    description: "The series: where it lives, date and value columns, frequency, length, and known events (promotions, outages, launches, holidays that matter)."
    type: text
    required: true
  - name: horizon
    description: How far ahead to forecast, in periods of the series.
    type: string
    required: true
  - name: country
    description: Country or region whose public holidays matter, if any. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Setup choices, Code, Validation, Tuning, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prophet (the `prophet` package, formerly `fbprophet`) fits a piecewise trend plus Fourier seasonalities plus holiday effects. It is easy to run and handles missing dates and multiple seasonalities, which is why people reach for it, but on many benchmark series it loses to seasonal naive or ETS, and its default prediction intervals tend to be too narrow because they only simulate trend changes and noise, not seasonality or holiday uncertainty. Its common traps: the default `changepoint_prior_scale` of 0.05 can make the trend chase recent noise or miss real breaks; changepoints are only placed in the first 80% of history (`changepoint_range`), so a break in the last months is ignored; additive seasonality is wrong when swings grow with the level (`seasonality_mode="multiplicative"`); weekly seasonality on monthly data is meaningless; `growth="logistic"` needs a `cap` column in both the history and the future frame; extra regressors need known future values; and outliers distort the fit unless set to missing (Prophet tolerates NaN in `y`). The built-in `cross_validation` and `performance_metrics` give a rolling-origin backtest.
</context>

<task>
Build a Prophet forecast {{horizon}} ahead{{#country}} using public holidays for {{country}}{{/country}}.

<series>
{{series}}
</series>

1. Describe the series: frequency, length, seasonal periods present, level shifts, outliers. Prophet needs a dataframe with columns `ds` (datetime) and `y`.
2. Decide the setup and say why: which seasonalities to keep (yearly, weekly, daily, or a custom one with `add_seasonality`), additive or multiplicative mode, linear or logistic growth (with a cap and why), holidays via `add_country_holidays` and/or a custom holidays dataframe with `lower_window` and `upper_window` for pre- and post-event effects, and outliers set to NaN with the reason logged.
3. Write the code: load, clean, fit, `make_future_dataframe` with the right `freq`, predict, plot components.
4. Validate with `cross_validation(model, initial=..., period=..., horizon=...)` choosing `initial` of at least one year for yearly seasonality and `horizon` equal to the business horizon; report MAE, MAPE only if values are never near zero, and interval coverage from `performance_metrics`.
5. Run the same rolling-origin windows for a seasonal naive and an ETS model (statsforecast or statsmodels) and compare. If Prophet does not beat them, say so and recommend the simpler model.
6. Tune on the cross-validation score only: a small grid over `changepoint_prior_scale` (for example 0.001 to 0.5) and `seasonality_prior_scale` (0.01 to 10), and `seasonality_mode`. Report the chosen values.
7. Fix the intervals: report backtest coverage of the 80% interval; if it covers well under 80%, widen them (for example with `mcmc_samples` or empirical backtest errors) and say how.
</task>

<constraints>
- Never tune or select on the final test period; tuning uses cross-validation windows only.
- Do not invent accuracy or forecast numbers; if the data is not provided, give the code and say the numbers come from running it.
- Regressors only when their future values are known or planned; otherwise leave them out.
- Do not promise Prophet handles structural breaks automatically; check the last 20% of history for breaks and handle them.
- Keep the code runnable: imports, versions noted as tested assumptions, no placeholder functions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two or three sentences: the setup, whether Prophet beat the baselines, and the main risk.

## Setup choices
Bullets: each modelling choice and why.

## Code
One Python code block, end to end.

## Validation
Table: model | MAE | coverage of 80% interval (or its structure with how to fill it).

## Tuning
The grid, the score used, the chosen values.

## Caveats
Bullets: interval width, recent breaks, events not in history.
</output_format>
