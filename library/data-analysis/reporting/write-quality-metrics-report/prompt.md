---
schema: 1
id: write-quality-metrics-report
kind: prompt
title: Write a monthly quality metrics report
description: Writes a monthly quality report with defect rates, first pass yield, cost of poor quality, customer complaints, supplier quality and corrective action status for management review.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [operations-manager, manager, executive, consultant]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [quality-management, cost-of-poor-quality, first-pass-yield, capa, management-review]
pairs_with:
  prompts: [build-control-chart, write-8d-report, write-supplier-nonconformance-report, set-scorecard-status-thresholds]
args:
  - name: quality_data
    description: "Units produced and shipped, defects found internally by type, scrap and rework quantities and costs, first pass yield, customer complaints and returns by cause, supplier rejects, and corrective actions with status and dates, for this month and previous months."
    type: text
    required: true
  - name: context
    description: "Product or service, quality targets, inspection or test changes this month, quality standard followed (for example ISO 9001), and who reads the report. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Key quality measures, Defects and cost of poor quality, Customer complaints, Supplier quality, Corrective actions, Focus for next month, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A monthly quality report tells management whether quality is under control, what it is costing, and whether problems are being fixed for good. Quality managers normalise everything: defects per million units (ppm) or per thousand, complaints per million units shipped, because raw counts rise with volume. First pass yield, the share of units right first time without rework, shows hidden factory waste that final yield hides. Cost of poor quality (scrap, rework, returns, warranty, concessions) puts the problem in money that leadership acts on. A Pareto of defect and complaint causes shows that a few causes drive most of the cost. Measurement changes are a classic trap: a new inspection step or a tighter test finds more defects, so a jump may mean better detection rather than worse quality. Corrective action (CAPA) status matters as much as the defect rate: overdue actions, containment without root cause, and repeat issues that come back after closure are the signs of a weak quality system. Month-to-month noise is normal, so a control chart or rolling trend separates real shifts from variation.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<quality_data>
{{quality_data}}
</quality_data>

1. Compute the key measures normalised by volume: internal defect rate, first pass yield, scrap and rework rate, complaint rate per million shipped, and compare with target and the previous months.
2. Note any change in inspection, testing or complaint logging that affects comparability before interpreting trends.
3. Build a Pareto of defect causes and of complaint causes, and compute cost of poor quality by category.
4. Report supplier quality: rejects or ppm by supplier and open supplier issues.
5. Report corrective actions: open, overdue, closed this month, effectiveness checks done, and any repeat issues.
6. Set three to five focus items for next month tied to the Pareto and the cost figures.
</task>

<constraints>
- Normalise by volume before comparing periods; show the counts behind each rate.
- Do not call a single month's movement a trend without a control chart or a run of points; say when movement is within normal variation.
- Do not treat a closed action as effective without an effectiveness check.
- Do not invent costs, targets or root causes; mark causes still under investigation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: quality against target, cost of poor quality, the top cause, corrective action health, the main focus.

## Key quality measures
Table: Measure | This month | Target | Last month | Three-month average.

## Defects and cost of poor quality
Pareto table: Cause | Count | Share | Cumulative share | Cost. Total cost of poor quality by category.

## Customer complaints
Table: Cause | Complaints | Per million shipped | Trend.

## Supplier quality
Table: Supplier | Rejects or ppm | Open issues | Status.

## Corrective actions
Table: Open | Overdue | Closed | Effectiveness checked | Repeat issues. List the overdue and repeat items.

## Focus for next month
Numbered focus items with the figure behind each.

## Data notes
Bullets: measurement changes, gaps, definitions.
</output_format>
