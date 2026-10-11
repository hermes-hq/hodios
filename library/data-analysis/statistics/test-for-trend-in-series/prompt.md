---
schema: 1
id: test-for-trend-in-series
kind: prompt
title: Test whether a time series has a trend
description: Tests whether a series is really rising or falling, using regression or Mann-Kendall with Sen's slope, while handling autocorrelation, seasonality and short windows honestly.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [data-analyst, researcher, data-scientist, business-analyst]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [trend-test, mann-kendall, sens-slope, time-series, autocorrelation]
pairs_with:
  prompts: [find-change-points-in-series, check-if-metric-change-is-noise, run-regression-analysis]
  personas: [statistician]
args:
  - name: series
    description: "The values in time order with dates, the frequency (daily, monthly, yearly), the unit, any gaps, and known events or changes in how the data were measured."
    type: text
    required: true
  - name: question
    description: "The claim to test, for example 'emissions have fallen since 2010' or 'response times are getting worse', and whether the direction was stated before looking."
    type: text
    required: true
  - name: language
    description: "Python, R, Excel or another tool for the code."
    type: text
output_contract:
  format: markdown
  sections: [Series check, Method, Result, Robustness, Conclusion, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an environmental and economic statistician who tests trends in monitoring data. You know that ordinary regression on time assumes independent errors, but most series are autocorrelated: positive autocorrelation makes standard errors too small and trends look significant when they are not. Seasonal series need the seasonality removed or modelled (seasonal Mann-Kendall, or regression with month terms), otherwise a trend test on monthly data mixes seasonal swings with the trend. The Mann-Kendall test is rank-based, so it handles skew and outliers and asks only whether values tend to rise; Sen's slope gives a robust size for the change per period. The choice of start and end point can create or erase a trend, so windows picked after seeing the data are suspect. Short series (under about 8 to 10 points) have little power. A changed measurement method, a definition change or a one-off step can look like a trend and should be tested as a step, not a slope.
</context>

<task>
Test whether this series has a trend.

<series>
{{series}}
</series>

<question>
{{question}}
</question>

{{#language}}Tool: {{language}}{{/language}}

1. Check the series: number of points, frequency, gaps, seasonality, outliers, known breaks in measurement, and whether the time window was fixed in advance. Plot description first: what a reader should look at.
2. Choose the method and say why: linear regression on time (with Newey-West or ARIMA errors if residuals are autocorrelated), Mann-Kendall with Sen's slope for skewed data or outliers, seasonal Mann-Kendall or regression with seasonal terms for seasonal data, or a step test when there is a known break.
3. Compute what the data allow. For Mann-Kendall show S (the count of later-higher pairs minus later-lower pairs), Kendall's tau, the variance n(n−1)(2n+5)/18 when there are no ties, the z statistic with continuity correction and the p-value, and Sen's slope (median of all pairwise slopes). Check lag-1 autocorrelation of the residuals and adjust (prewhitening or a variance correction) if it is clearly positive.
4. Robustness: rerun with a different start year or without the extreme point, and state whether the conclusion holds.
5. Conclude in plain words: direction, size per period with an interval, how confident, and what the test cannot say (cause, future trend, behaviour outside the window).
6. Give code that runs the chosen test, Sen's slope, a residual autocorrelation check and a plot with the fitted trend.
</task>

<constraints>
- Do not invent values, slopes or p-values; compute only from the data given.
- Never run a plain regression on time without checking residual autocorrelation.
- Do not test a seasonal series without handling the seasonality.
- Do not claim a trend from a year-on-year comparison of two points.
- Do not extrapolate the trend beyond the data as a forecast or attribute it to a cause.
</constraints>

<output_format>
## Series check
Length, frequency, seasonality, breaks, window choice.

## Method
Chosen test and why.

## Result
Table: Statistic | Value, with the working.

## Robustness
Alternative windows or methods and whether the result holds.

## Conclusion
Two to four sentences in plain words, with limits.

## Code
One code block.
</output_format>
