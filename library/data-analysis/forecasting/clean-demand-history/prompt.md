---
schema: 1
id: clean-demand-history
kind: prompt
title: Clean demand history before forecasting
description: Prepares sales history for forecasting by separating true demand from stockouts, outliers, one-off orders, data errors and structural breaks, logging every change so the baseline is clean.
category: forecasting
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, operations-manager, data-scientist, business-analyst]
subject: [supply-chain, retail]
inputs: [dataset, text]
output: [table, code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [demand-cleansing, stockouts, censored-demand, outliers, structural-breaks]
pairs_with:
  prompts: [forecast-time-series, forecast-intermittent-demand, add-event-adjustments-to-forecast]
args:
  - name: history
    description: "The sales or shipment history by period (and by item or location if relevant), with whatever context exists: stock levels or stockout flags, promotions, price changes, one-off large orders, system migrations, store openings and closures."
    type: text
    required: true
  - name: tool
    description: Tool for the cleaning code.
    type: enum
    enum: [python, r, sql, spreadsheet]
    default: python
output_contract:
  format: markdown
  sections: [Summary, Issues found, Cleaning decisions, Cleaned series, Code, Change log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Forecasts learn from history, and sales history is not demand. Demand planners know the usual distortions: stockouts cap sales below demand (censored demand), so a model trained on them under-forecasts and the item stays understocked; promotions and one-off bulk orders inflate periods that will not recur; returns netted against sales create negative or low spikes; system migrations, store closures and new channels create level shifts; and data errors (duplicate loads, missing weeks recorded as zero) look like real movement. The aim is not to make the series smooth but to separate the baseline pattern from known, explained effects, and to keep the removed effects for separate modelling (promotions get their own uplift estimates). Every adjustment is logged with a reason so the forecast can be audited, and unexplained outliers are investigated, not deleted.

Tool: {{tool}}
</context>

<task>
<history>
{{history}}
</history>

1. Profile the series: length, frequency, zeros, negatives, gaps, duplicated periods, and obvious level changes.
2. Identify issues and classify each: stockout (sales limited by availability), promotion or price effect, one-off order, returns netting, data error, structural break, or unexplained outlier. Use the context supplied; where context is missing, flag the period as a candidate and say what evidence would confirm it.
3. Decide the treatment per issue: estimate unconstrained demand for stockout periods (for example from comparable periods, other locations or the rate before the stockout ran out), separate promotional uplift into its own column, remove or cap one-off orders, fix data errors at source if possible, and for structural breaks decide whether to use only post-break history or add a level adjustment.
4. Produce the cleaned series alongside the original, with a column for each adjustment so the effects can be added back.
5. Provide code in the chosen tool that applies the cleaning reproducibly from a configuration of flagged periods.
6. Write the change log: period, original, cleaned, reason, method, confidence.
</task>

<constraints>
- Never silently delete or smooth a value; every change appears in the change log.
- Do not treat a stockout zero as zero demand.
- Do not invent context (promotions, stockouts) that the user has not given; mark suspected causes as suspected.
- Keep the original series intact; cleaning produces a new column.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
What was found and how much the cleaning changes total history (in units and percent).

## Issues found
Table: Period | Issue type | Evidence | Confirmed or suspected.

## Cleaning decisions
Bullets per issue type with method and reason.

## Cleaned series
Table or description of original, cleaned and adjustment columns.

## Code
Code or formulas.

## Change log
Table: Period | Original | Cleaned | Reason | Method | Confidence.
</output_format>
