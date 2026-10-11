---
schema: 1
id: find-change-points-in-series
kind: prompt
title: Find change points in a time series
description: Finds when a time series shifted to a new level, slope or variability using change-point methods, then checks each shift against known events before anyone reads cause into it.
category: statistics
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [data-analyst, data-scientist, researcher, operations-manager]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-point-detection, structural-break, time-series, level-shift, pelt]
pairs_with:
  prompts: [test-for-trend-in-series, detect-anomalies, build-control-chart]
  personas: [statistician]
args:
  - name: series
    description: "The values in time order with dates, the frequency, the unit, gaps, and any seasonality you know about (weekly cycles, holidays)."
    type: text
    required: true
  - name: events
    description: "Known events with dates that might explain a shift: releases, price changes, policy changes, outages, changes in how the metric is measured."
    type: text
  - name: language
    description: "Python (ruptures), R (changepoint, strucchange) or another tool."
    type: text
output_contract:
  format: markdown
  sections: [Series check, Method, Change points, Event check, Conclusion, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who finds structural breaks in operational and economic series. A change point is a lasting shift in level, slope or variance, which is different from a one-off outlier and from a smooth trend. Detection methods (binary segmentation, PELT, Bayesian online change-point detection, the Chow and Bai-Perron tests for regressions) all depend on a penalty or prior: a low penalty finds many spurious breaks, a high one misses real ones, so the number of breaks is a modelling choice to justify and check for stability. Seasonality and autocorrelation create apparent shifts, so weekly or yearly patterns must be removed first. Breaks are dated with uncertainty, often several periods wide. Testing for a break at a date chosen after looking at the plot inflates false positives; a date set in advance from a known event is a cleaner test. A change in how the metric is collected (tracking code, definition, data source) is the most common cause of a sudden shift and must be ruled out before any business explanation. A break that lines up with an event is a lead, not proof that the event caused it.
</context>

<task>
Find change points in this series.

<series>
{{series}}
</series>

{{#events}}
<events>
{{events}}
</events>
{{/events}}

{{#language}}Tool: {{language}}{{/language}}

1. Check the series: length, frequency, gaps, outliers, seasonality and autocorrelation. Remove or model seasonality (for example a weekly profile or STL decomposition) before detection, and say what was done.
2. Pick the method and what kind of change to look for (mean, variance, slope, or several). Use PELT or binary segmentation with a stated penalty (BIC or similar) for exploration; a Chow or similar test for a pre-specified date; Bai-Perron for breaks in a regression relationship.
3. Report each detected change point: date, the level (or slope or spread) before and after, the size of the shift with a range, and how stable the date is when the penalty changes. Compute simple before and after means and standard deviations from any data given.
4. Event check: for each break, list known events within its uncertainty window, and first check for measurement changes. Mark breaks with no matching event as unexplained, and events with no break as "no detectable effect at this resolution".
5. Conclude: which shifts are robust, which are fragile, what further evidence would confirm a cause (a comparison series that did not get the change, a holdout, a pre-registered date).
6. Give code that deseasonalises if needed, runs the detection with a penalty sweep, and plots the series with the segments.
</task>

<constraints>
- Do not invent dates, levels or shift sizes; compute only from data given.
- Do not present a change point as caused by an event because the dates match.
- Do not run detection on a strongly seasonal series without handling the seasonality.
- Always state the penalty or threshold and show how sensitive the number of breaks is to it.
- Treat single extreme points as outliers, not change points, unless the level stays shifted.
</constraints>

<output_format>
## Series check
Length, seasonality, autocorrelation, preprocessing.

## Method
Method, change type, penalty and why.

## Change points
Table: Date (range) | Before | After | Shift | Stability.

## Event check
Each break against known events and measurement changes.

## Conclusion
Robust shifts, fragile ones, and how to confirm causes.

## Code
One code block.
</output_format>
