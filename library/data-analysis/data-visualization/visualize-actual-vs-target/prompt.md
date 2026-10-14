---
schema: 1
id: visualize-actual-vs-target
kind: prompt
title: Visualise actual against target
description: Designs charts comparing actuals with targets, budgets or forecasts (bullet charts, variance bars, target lines) with clear colours and status rules. Use for scorecards and monthly reviews.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, financial-analyst, business-analyst, manager]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [bullet-chart, budget-vs-actual, variance, scorecards]
pairs_with:
  prompts: [design-dashboard, explain-budget-variance, design-waterfall-chart]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: metrics
    description: "The metrics with actuals and their targets, budgets or prior-year values, the period (month, year to date), whether higher is better for each, and any tolerance band."
    type: text
    required: true
  - name: setting
    description: "Where the chart appears (dashboard tile, monthly review slide, printed report) and the tool used."
    type: text
output_contract:
  format: markdown
  sections: [Comparison to show, Recommended chart, Status rules, Design spec, Build steps or code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a business-reporting designer. Actual-versus-target charts are everywhere and mostly unclear: clustered bars of actual and target side by side make readers do the subtraction; gauges and speedometers waste space and hide the number; red/amber/green status depends on thresholds nobody wrote down; and "higher is better" flips for costs, churn and defects, so one colour rule across all metrics misleads. You prefer bullet charts for many metrics in little space, variance bars (absolute or percentage) when the gap is the message, and lines with a target band for trends. You also know a target is a choice, not a fact: show its source.
</context>

<task>
Design how to show these actuals against their targets.

<metrics>
{{metrics}}
</metrics>

{{#setting}}
<setting>
{{setting}}
</setting>
{{/setting}}

1. Decide the comparison for each metric: point-in-time against target, year to date against budget, trend against a target path, or several comparisons (budget and prior year). Use a consistent order: actual, then the comparison.
2. Recommend the chart:
   - many metrics in a scorecard: bullet charts (actual bar, target marker, qualitative bands);
   - the gap is the message: variance bars (actual minus target, or %), coloured by favourable or unfavourable, sorted;
   - over time: actual line with a target line or tolerance band, and the cumulative view for year-to-date targets;
   - avoid gauges, side-by-side bars, and dual axes.
3. Write the status rules: for each metric, its direction (higher or lower is better), thresholds for on track, at risk and off track, written as explicit numbers or percentages. If thresholds are not given, propose them and label them as proposals.
4. Design spec: favourable or unfavourable colours that work for colour-blind readers (pair colour with sign or icon), consistent scales per metric, labels showing actual, target and variance with units, and the target source in a note.
5. Give build steps or code for the tool (Excel, Power BI, Tableau, Looker Studio, plotly, ggplot2).
</task>

<constraints>
- Respect the direction of each metric; never colour a cost rise as favourable.
- Do not invent targets or thresholds; label any proposed ones as proposals.
- Do not use gauges or 3D effects.
- Compare like with like: year to date with year-to-date budget, not with the full-year target.
- If a target is missing for a metric, show its trend without a status rather than inventing one.
</constraints>

<output_format>
## Comparison to show
Table: Metric | Actual | Comparison | Direction | Variance.

## Recommended chart
Chart choice and reason.

## Status rules
Table: Metric | On track | At risk | Off track | Source.

## Design spec
Bullets.

## Build steps or code
Numbered steps or one code block.
</output_format>
