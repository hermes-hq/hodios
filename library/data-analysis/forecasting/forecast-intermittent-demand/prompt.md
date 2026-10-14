---
schema: 1
id: forecast-intermittent-demand
kind: prompt
title: Forecast intermittent demand
description: Forecasts slow-moving and lumpy items such as spare parts by classifying the demand pattern, using Croston-type or bootstrap methods and turning the result into lead-time demand for stocking.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, data-analyst, business-analyst]
subject: [supply-chain, retail]
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
tags: [spare-parts, croston, lumpy-demand, safety-stock, slow-movers]
pairs_with:
  prompts: [plan-inventory, measure-forecast-accuracy, forecast-time-series]
args:
  - name: demand_history
    description: Demand by period for one or more items, including the zero periods, the period length, and whether zeros could be stock-outs rather than no demand.
    type: text
    required: true
  - name: lead_time_and_service
    description: Replenishment lead time, review period, the service level you aim for, and item cost, so the forecast can be turned into a stocking decision.
    type: text
  - name: tool
    description: Tool for the code.
    type: enum
    enum: [python, r, spreadsheet]
    default: python
output_contract:
  format: markdown
  sections: [Summary, Demand pattern, Method choice, Forecast and lead-time demand, Stocking implication, Code, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Items that sell in most periods can be forecast with ordinary methods. Spare parts, slow movers and B2B items often sell nothing most weeks and then a few, or a lot, at once. Ordinary methods fail on them: exponential smoothing chases each spike, percentage errors are undefined when actuals are zero, and a forecast of "0.3 a week" is useless for deciding stock. Practitioners classify each item by the average interval between demands (ADI) and the squared coefficient of variation of non-zero demand sizes (CV²), using the Syntetos-Boylan cut-offs of 1.32 and 0.49 to label it smooth, erratic, intermittent or lumpy. Croston's method forecasts demand size and interval separately; the SBA correction removes its known upward bias; TSB updates the probability of demand every period, so it handles items going obsolete. For stocking, what matters is the distribution of total demand over the lead time, which a bootstrap of past demand can estimate directly. Accuracy is judged on scaled errors and on the service level actually achieved, not MAPE.

Tool: {{tool}}
{{#lead_time_and_service}}Lead time and service: {{lead_time_and_service}}{{/lead_time_and_service}}
</context>

<task>
<history>
{{demand_history}}
</history>

1. Check the data: confirm zeros are recorded, flag zeros that might be stock-outs, and note items with too few demand occurrences to estimate anything (fewer than about five non-zero periods).
2. Classify each item by ADI and CV² with the calculation shown, and give its class.
3. Choose a method per class: smooth items can use ordinary methods; intermittent and lumpy items use SBA or TSB (TSB if demand is declining or the item may be phased out); very sparse items use a bootstrap of lead-time demand or a simple rule. Say why.
4. Produce the per-period forecast and, more importantly, the lead-time demand distribution: mean, and the quantile matching the service level.
5. Stocking implication: reorder point or order-up-to level from that quantile, and the stock cost it implies. Flag items where the cost of holding stock outweighs the service level target and a make-to-order or supplier-stock option is worth discussing.
6. Write {{tool}} code that reproduces the classification, the forecast and a backtest using scaled error (MASE or similar) and achieved fill rate. Python: statsforecast (CrostonSBA, TSB, ADIDA) with pandas. R: tsintermittent or fable extensions. Spreadsheet: ADI and CV² formulas and a simple Croston with SBA factor, saying what is lost.
7. Caveats: obsolescence, changes in installed base, and why the forecast should be reviewed with the people who know upcoming maintenance or projects.
</task>

<constraints>
- Never use MAPE on intermittent series.
- Compute only from the data supplied; label hand calculations as approximate and tell the user to confirm by running the code.
- Do not present a fractional per-period forecast as the answer for stocking; translate it into lead-time demand and a stock level.
- If lead time or service level is missing, show the method with stated example values and ask for the real ones.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Per item: class, method, stocking level, in one table or a few lines.

## Demand pattern
Table: item | non-zero periods | ADI | CV² | class.

## Method choice
Bullets with reasons.

## Forecast and lead-time demand
Table: item | per-period forecast | lead-time demand mean | service-level quantile.

## Stocking implication
Table: item | reorder point | stock value | note.

## Code
One code block in {{tool}}.

## Caveats
Bullets.
</output_format>
