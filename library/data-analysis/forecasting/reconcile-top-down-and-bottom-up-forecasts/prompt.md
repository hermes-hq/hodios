---
schema: 1
id: reconcile-top-down-and-bottom-up-forecasts
kind: prompt
title: Reconcile top-down and bottom-up forecasts
description: Reconciles forecasts made at different levels (total versus regions, products or reps) so they add up, explains where the gap comes from, and picks a reconciliation method with code.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan, review]
role: [financial-analyst, data-analyst, business-analyst, operations-manager]
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
tags: [hierarchical-forecasting, forecast-reconciliation, top-down, bottom-up, consensus-forecast]
pairs_with:
  prompts: [forecast-time-series, review-forecast-assumptions, write-forecast-commentary]
args:
  - name: forecasts
    description: "The forecasts at each level and who made them (for example finance's company total, sales' bottom-up by region, the statistical forecast by product), for the same periods and units."
    type: text
    required: true
  - name: hierarchy
    description: How the levels nest (company, region, store, product) and any cross-cutting groupings, plus history at each level if available.
    type: text
  - name: tool
    description: Tool for the code.
    type: enum
    enum: [python, r, spreadsheet]
    default: python
output_contract:
  format: markdown
  sections: [Summary, The gap, Where it comes from, Reconciliation method, Reconciled forecast, Code, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Forecasts made at different levels rarely add up. Totals are smoother and easier to forecast; low-level series are noisy but carry local knowledge. When the bottom-up sum and the top-down total disagree, the gap is usually a difference in assumptions (sales teams sandbag or inflate, finance applies a growth target, a statistical model misses a new store), not arithmetic, and reconciling it blindly hides the argument the business needs to have. The mechanical options are bottom-up (sum the lowest level), top-down (split the total by historical or forecast proportions, which breaks when the mix is changing), middle-out, and optimal reconciliation such as MinT, which combines forecasts from all levels using their error covariance and usually beats any single level. After reconciliation, integer quantities and non-negative values may need fixing.

Tool: {{tool}}
{{#hierarchy}}Hierarchy: {{hierarchy}}{{/hierarchy}}
</context>

<task>
<forecasts>
{{forecasts}}
</forecasts>

1. Line the forecasts up by level and period in the same units; state the gap between the top-down total and the bottom-up sum, in absolute and percentage terms, per period.
2. Explain where the gap comes from: break it down by child series (which regions or products account for most of it) and by likely cause (different growth assumptions, a missing new item, a target embedded in the total, timing differences, definitions). Separate what the numbers show from what you infer.
3. Choose a reconciliation method and say why: bottom-up when low-level forecasts are good and the mix is shifting, top-down when low-level series are too noisy, middle-out when one level is most reliable, MinT or similar when history allows. If the gap is a business disagreement, say the method cannot settle it and list the decision needed.
4. Produce the reconciled forecast at every level, adding up exactly, and show how much each series moved from its original forecast.
5. Write {{tool}} code. Python: hierarchicalforecast (with statsforecast) for BottomUp, TopDown and MinTrace. R: fable with aggregate_key and reconcile(). Spreadsheet: proportional allocation formulas with a check row, saying what is lost.
6. Open decisions: the assumptions owners must agree on, and how to measure which level was more accurate after the fact.
</task>

<constraints>
- Compute only from the figures supplied; label any hand calculation as approximate.
- Never silently force the bottom-up numbers to a target total; if the total is a target, say so and show the forecast and the target separately.
- Flag negative or fractional allocations and say how they are handled.
- Keep units and periods identical across levels before comparing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The gap, its main cause, the method chosen and the reconciled total.

## The gap
Table: period | top-down | bottom-up sum | gap | gap %.

## Where it comes from
Table: child series | share of gap | likely cause | evidence or inference.

## Reconciliation method
Bullets with the reason.

## Reconciled forecast
Table by level and period, with original versus reconciled.

## Code
One code block in {{tool}}.

## Open decisions
Numbered.
</output_format>
