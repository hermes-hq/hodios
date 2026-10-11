---
schema: 1
id: monitor-forecast-drift
kind: prompt
title: Monitor a live forecast for drift
description: Sets up ongoing monitoring of a forecast in production with tracking signals, bias and error control limits, and triage rules that say when to adjust, re-fit or escalate rather than react to noise.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [data-analyst, data-scientist, operations-manager, ml-engineer]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tracking-signal, forecast-bias, model-monitoring, exception-management]
pairs_with:
  prompts: [measure-forecast-accuracy, forecast-cycle-track, document-forecast-model]
args:
  - name: forecast_setup
    description: "What is forecast, at what level and frequency, how many series, the horizon that matters for decisions, and who uses the forecast."
    type: text
    required: true
  - name: error_history
    description: "Past forecasts and actuals (or errors) for the series, ideally at the decision horizon. Optional; without it the thresholds are provisional."
    type: text
  - name: tool
    description: Tool for any code.
    type: enum
    enum: [python, sql, spreadsheet, none]
    default: none
output_contract:
  format: markdown
  sections: [Summary, What to monitor, Alert rules, Triage playbook, Code, Review cadence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A forecast that was good at launch degrades quietly: demand shifts level, a new competitor appears, a data feed changes, or planners start overriding it. Measuring accuracy once a quarter catches this too late. Demand planners use a tracking signal, the running sum of errors divided by the mean absolute deviation, which flags persistent bias: a value beyond about plus or minus 4 to 6 means errors keep falling on one side. Bias matters more than scatter because it compounds into stock or staffing that is systematically wrong. With thousands of series, alerts must be ranked by business impact (volume or value) or planners drown in noise, and each alert needs a triage path: check the data first, then look for a known event, then adjust the level, and re-fit or escalate only when the change is structural. Monitoring should also watch inputs (missing loads, late data) and the share of forecasts manually overridden.
</context>

<task>
<forecast_setup>
{{forecast_setup}}
</forecast_setup>
{{#error_history}}

<error_history>
{{error_history}}
</error_history>
{{/error_history}}

Tool: {{tool}}

1. Define what to monitor at the decision horizon: bias (mean error and tracking signal), scale-free error (for example scaled or weighted percentage error), interval coverage if intervals are published, input data health, and the override rate.
2. Set alert rules: tracking signal thresholds, error control limits from the historical error distribution, persistence rules, and a minimum impact (volume or value) for an alert to be raised. If history is supplied, compute the thresholds from it and say how many alerts they would have produced.
3. Write the triage playbook: data check, known-event check, level adjustment, re-fit, escalate; who does each and how fast.
4. Rank and route alerts so a planner sees the top few by impact each cycle.
5. Provide code or formulas for the tracking signal and alerts if a tool is chosen.
6. Set a review cadence for the monitoring itself (are alerts being acted on, are thresholds too tight).
</task>

<constraints>
- Compute thresholds only from supplied history; otherwise give provisional values and label them.
- Never recommend re-fitting on every alert; separate noise, events and structural change.
- Keep the number of alerts per cycle manageable and say how the ranking achieves it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
What will be monitored and the expected alert load.

## What to monitor
Table: Measure | Formula | Horizon | Why.

## Alert rules
Table: Rule | Threshold | Persistence | Minimum impact.

## Triage playbook
Numbered steps with owner and time.

## Code
Code or formulas, or "Not requested".

## Review cadence
Bullets.
</output_format>
