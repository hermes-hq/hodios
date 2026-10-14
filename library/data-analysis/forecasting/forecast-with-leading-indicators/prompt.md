---
schema: 1
id: forecast-with-leading-indicators
kind: prompt
title: Forecast with leading indicators
description: Tests whether candidate leading indicators really lead a target series, at what lag and how stably, and keeps them only if they beat a forecast without them out of sample.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan, review]
role: [data-analyst, data-scientist, financial-analyst, business-analyst]
subject: [statistics, economics]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [leading-indicators, cross-correlation, regression-forecast, spurious-correlation, lag-analysis]
pairs_with:
  prompts: [forecast-time-series, decompose-seasonality, estimate-causal-effect]
args:
  - name: target_series
    description: The series to forecast - values, frequency, history length and known breaks.
    type: text
    required: true
  - name: candidate_indicators
    description: "Each candidate indicator, its frequency, when each value is published (and whether it gets revised), and why you think it leads the target (for example web quotes lead bookings, permits lead construction spend)."
    type: text
    required: true
  - name: tool
    description: Tool for the code.
    type: enum
    enum: [python, r]
    default: python
output_contract:
  format: markdown
  sections: [Summary, Candidate indicators, Lead tests, Out-of-sample comparison, How to use it, Code, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Two trending or seasonal series will look correlated whether or not one leads the other, so correlations of raw levels prove nothing. A useful leading indicator moves before the target after trend and seasonality are removed, at a lag that stays stable over time, is available early enough to use (published before the forecast is needed, and not heavily revised later), and has a believable mechanism. The only test that matters in the end is whether a forecast using the indicator beats the same forecast without it out of sample. If the forecast horizon is longer than the lead, the indicator itself must be forecast, and its usefulness drops sharply. Testing many indicators at many lags will find something by chance; fewer, better-motivated candidates beat a data-mining search.

Tool: {{tool}}
</context>

<task>
<target>
{{target_series}}
</target>

<indicators>
{{candidate_indicators}}
</indicators>

1. For each candidate, record the mechanism, publication delay, revisions and frequency. Drop any candidate that is published after the forecast would be needed, and say so.
2. Make the series comparable: same frequency, aligned dates, and transformed to remove trend and seasonality (differences, growth rates or seasonal differences).
3. Lead tests: cross-correlation of the transformed series at a range of lags, the lag with the strongest relationship, and whether that lag holds in the first and second half of the history. A Granger-type test may be used as a screen only. Correct for the number of candidates and lags tried, or say how many were tried.
4. Out-of-sample comparison: a rolling-origin backtest of a baseline model without indicators (for example ETS or ARIMA) against the same model with the surviving indicators at their lags (ARIMAX or dynamic regression). Compare MASE and interval coverage at the horizon that matters.
5. How to use it: keep only indicators that improve the backtest; state the usable horizon (up to the lead, or longer only with a forecast of the indicator), and how to monitor whether the relationship breaks.
6. Write {{tool}} code for the alignment, transformation, cross-correlation, and backtest. Python: pandas, statsmodels (ccf, SARIMAX with exog) and a rolling-origin loop. R: fable with ARIMA and xreg, and feasts CCF.
7. Caveats: structural breaks, publication changes, and reverse causation.
</task>

<constraints>
- Never use correlation of untransformed trending levels as evidence of a lead.
- Never include future values of an indicator that would not be known at forecast time (look-ahead leakage); use vintage data if the indicator is revised.
- Compute only from data supplied; if values are not given, provide the method and code and say the numbers must come from running it.
- If no candidate beats the baseline, say so plainly and recommend the baseline.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Which indicators earn a place, at what lag, and how much they improve the forecast.

## Candidate indicators
Table: indicator | mechanism | publication delay | revised? | kept for testing?

## Lead tests
Table: indicator | best lag | correlation after transformation | stable across halves?

## Out-of-sample comparison
Table: model | MASE | 80% coverage | 95% coverage.

## How to use it
Bullets.

## Code
One code block in {{tool}}.

## Caveats
Bullets.
</output_format>
