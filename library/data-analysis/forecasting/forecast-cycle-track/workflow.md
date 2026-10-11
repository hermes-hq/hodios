---
schema: 1
id: forecast-cycle-track
kind: workflow
title: Run a monthly forecast cycle
description: Runs one monthly or quarterly forecast cycle from data checks and last cycle's accuracy, through a statistical baseline and logged adjustments, to an agreed forecast published with its uncertainty.
category: forecasting
version: 1.0.0
status: incubating
stage: [review, plan, ship]
role: [data-analyst, operations-manager, financial-analyst, business-analyst]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-and-operations-planning, consensus-forecast, forecast-process, reforecast]
pairs_with:
  prompts: [measure-forecast-accuracy, forecast-time-series, add-event-adjustments-to-forecast, reconcile-top-down-and-bottom-up-forecasts, write-forecast-commentary, present-forecast-uncertainty]
  personas: [forecaster]
args:
  - name: scope
    description: What is being forecast (metric, units, items or regions, level of detail), the horizon, the cycle (monthly or quarterly), and who uses the result for what decision.
    type: text
    required: true
  - name: data
    description: History of actuals, last cycle's forecast, any statistical and final versions, and known upcoming events. Describe files if they are large.
    type: text
    required: true
  - name: stakeholders
    description: Who contributes or signs off (sales, finance, operations, marketing), so the step that gathers input knows whom to ask.
    type: text
steps:
  - {id: data-and-last-cycle, file: steps/01-data-and-last-cycle.md, stage: review, gate: approve, artifact: "forecast-cycle/01-data-and-last-cycle.md"}
  - {id: baseline, file: steps/02-baseline.md, stage: plan, gate: approve, artifact: "forecast-cycle/02-baseline.md"}
  - {id: adjustments, file: steps/03-adjustments.md, stage: plan, gate: approve, artifact: "forecast-cycle/03-adjustments.md"}
  - {id: agree, file: steps/04-agree.md, stage: review, gate: approve, artifact: "forecast-cycle/04-agree.md"}
  - {id: publish, file: steps/05-publish.md, stage: ship, gate: none, artifact: "forecast-cycle/05-publish.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one forecast cycle the way a disciplined demand or finance planning team does: check the data and learn from last cycle's errors, build a statistical baseline, add only evidence-based adjustments with a log, agree one number across functions without hiding disagreements, and publish it with its uncertainty and what to watch. Each step writes one artifact and stops for approval; later steps reuse approved figures.

Scope:
{{scope}}

<data>
{{data}}
</data>
{{#stakeholders}}

Stakeholders: {{stakeholders}}
{{/stakeholders}}

Rules for every step:
- Compute only from the data supplied or confirmed. Never invent actuals, accuracy figures or uplifts; when a number is an assumption, label it and say what would replace it.
- Keep the forecast, the target and the plan separate. If a target is involved, show the gap; do not bend the forecast to meet it.
- Every forecast figure carries a range.
- Keep the baseline, each adjustment and the final number as separate columns so the cycle can be audited.
- Keep a running list of open questions and owners, carried into step 5.
