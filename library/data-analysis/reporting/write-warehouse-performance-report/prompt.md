---
schema: 1
id: write-warehouse-performance-report
kind: prompt
title: Write a warehouse performance report
description: Writes a weekly or monthly warehouse and fulfilment report with on-time dispatch, order accuracy, OTIF, productivity, cost per order, inventory accuracy, backlog and actions.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [operations-manager, manager, executive]
subject: [supply-chain, ecommerce]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [warehouse-kpis, otif, order-accuracy, fulfilment, inventory-accuracy]
pairs_with:
  prompts: [plan-order-fulfilment, analyze-inventory-data, set-scorecard-status-thresholds, write-sla-performance-report]
args:
  - name: warehouse_data
    description: "Orders received and shipped, orders shipped by cut-off, mis-picks and damages, customer-reported errors, delivered on time and in full, labour hours and units picked, operating cost, cycle count results, receipts and dock-to-stock time, backlog by age, returns processed."
    type: text
    required: true
  - name: context
    description: "Site or sites, B2B or B2C, dispatch cut-off and service targets, peak periods, staffing or system changes, carrier issues, and who reads the report. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Service, Accuracy and quality, Productivity and cost, Inventory, Backlog and capacity, Actions, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A warehouse report tells the business whether orders are leaving on time and correct, at what cost, and whether stock records can be trusted. Operations managers know which measures carry weight. Service is measured as orders shipped by the dispatch cut-off they were promised, and further downstream as on time in full (OTIF), which also captures short shipments and carrier delays; the two are reported separately so warehouse and carrier performance are not confused. Order accuracy is best taken from customer-reported errors as well as internal checks, because internal checks find only what they look at. Productivity is units or lines per labour hour, which moves with order profile (single-item parcels versus multi-line pallets), so changes in order mix are checked before blaming staff. Cost per order or per unit combines labour, packaging and overheads, and agency staff during peaks raise it. Inventory record accuracy comes from cycle counts: the share of locations where the system matched the physical count, with value of adjustments; poor accuracy causes mis-picks and phantom stock. Dock-to-stock time and backlog by age show whether inbound or outbound is the constraint.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<warehouse_data>
{{warehouse_data}}
</warehouse_data>

1. Report service: orders received, shipped, shipped by cut-off and OTIF, separating warehouse-caused from carrier-caused failures where the data allows, against targets and the previous period.
2. Report accuracy and quality: mis-picks, damages and customer-reported errors per 1,000 orders, with the main error types.
3. Report productivity (units or lines per labour hour) and cost per order, and check whether order mix, peaks or agency labour explain changes.
4. Report inventory record accuracy from cycle counts, adjustment value, and dock-to-stock time.
5. Report backlog by age and whether capacity matched demand.
6. List three to five actions tied to the figures, with owners.
</task>

<constraints>
- Compute only from the data given; show counts behind every rate.
- Keep warehouse and carrier failures apart; do not blame either without the data.
- Do not compare productivity across periods with different order profiles without saying so.
- Do not name or rank individual operatives in a management report.
- Do not invent targets or industry benchmarks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: service, accuracy, cost, the main constraint, the top action.

## Service
Table: Measure | Actual | Target | Previous period. Measures: shipped by cut-off, OTIF, warehouse-caused failures, carrier-caused failures.

## Accuracy and quality
Table: Measure | Count | Per 1,000 orders | Previous period. Main error types.

## Productivity and cost
Table: Measure | Actual | Previous period | Note on order mix or labour.

## Inventory
Inventory record accuracy, adjustment value, dock-to-stock time.

## Backlog and capacity
Backlog by age and capacity comment.

## Actions
Table: Action | Figure behind it | Owner | By when.

## Data notes
Bullets: definitions, mix changes, gaps.
</output_format>
