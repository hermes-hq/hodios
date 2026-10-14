---
schema: 1
id: design-waterfall-chart
kind: prompt
title: Design a waterfall chart
description: Designs a waterfall (bridge) chart that walks from one total to another through drivers, checking the steps add up, ordering and labelling them. Use for profit, budget or KPI bridges.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [financial-analyst, data-analyst, business-analyst, executive]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [waterfall-chart, bridge-chart, variance-analysis, finance-reporting]
pairs_with:
  prompts: [compare-period-performance, explain-budget-variance, build-spreadsheet-chart]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: bridge_data
    description: "The starting total, the ending total and the drivers in between with their signed values (for example last year's revenue, price, volume, mix, FX, this year's revenue), with units and period."
    type: text
    required: true
  - name: audience_and_tool
    description: "Who will read it (board, finance team, operations) and where it will be built (Excel, Power BI, Tableau, Python, R, slides)."
    type: text
output_contract:
  format: markdown
  sections: [Reconciliation check, Step order and grouping, Design spec, Wording, Build steps or code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a finance-reporting visualisation specialist. A waterfall (bridge) chart is the standard way to explain why a total moved, and it fails in predictable ways: drivers that do not sum to the change (a hidden "other" or rounding gap), too many tiny steps that bury the two that matter, sign confusion when costs going up are shown as up bars, colour meanings that flip between slides, and a truncated y-axis that makes a 3% change look like a doubling. You know that price-volume-mix bridges depend on the order of decomposition, so the order must be stated, and that a large residual is a finding, not a rounding detail.
</context>

<task>
Design a waterfall chart for this bridge.

<bridge_data>
{{bridge_data}}
</bridge_data>

{{#audience_and_tool}}
<audience_and_tool>
{{audience_and_tool}}
</audience_and_tool>
{{/audience_and_tool}}

1. Reconcile: check that start + sum of drivers = end. Show the arithmetic. If there is a gap, add an explicit "other or unexplained" step with its size, and flag it if it is more than about 5 to 10% of the total change.
2. Fix the sign convention: each step shows its effect on the measure (a cost increase lowers profit, so it is a down step). Say this in the legend or subtitle.
3. Order and group the steps: by the logic of the business (price, volume, mix, then costs) or by size; group drivers under about 2 to 3% of the change into one "other" step and list them in a footnote; keep the total number of steps to about seven or fewer for executives. If the decomposition order affects the values (price-volume-mix), state the order used.
4. Specify the design: start and end totals as full bars anchored at zero in a neutral colour; increases and decreases in two colours with fixed meaning (and not relying on red/green alone, for colour-blind readers); connector lines; data labels with signs and units on each step; optional subtotals; y-axis starting at zero, or, when the changes are tiny relative to the total, a clearly broken axis with a note, or a chart of the change alone starting from zero.
5. Write an action title that states the main driver, and a subtitle with period and units.
6. Give build steps or code for the tool: Excel's built-in waterfall chart (set totals as totals), Power BI's waterfall visual, Tableau with a Gantt bar and running sum, or Python (plotly Waterfall) or R (ggplot2 with geom_rect).
</task>

<constraints>
- Never draw a bridge that does not reconcile; show the gap.
- Do not invent driver values or split a driver into sub-drivers without data.
- Keep colour meanings consistent: the same colour always means a favourable or unfavourable effect, as labelled.
- Do not truncate the axis silently.
- Use the units and rounding given; round labels consistently so they still add up, or note the rounding.
</constraints>

<output_format>
## Reconciliation check
The arithmetic and any gap.

## Step order and grouping
Table: Step | Value | Kept or grouped | Note.

## Design spec
Table: Element | Choice | Reason.

## Wording
Title, subtitle, legend and footnote text.

## Build steps or code
Numbered steps or one code block.
</output_format>
