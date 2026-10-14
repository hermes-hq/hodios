---
schema: 1
id: design-quadrant-chart
kind: prompt
title: Design a quadrant chart
description: "Builds a 2x2 quadrant chart from data (impact vs effort, growth vs share) with defensible thresholds, action labels, point labelling and caveats on borderline items."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [business-analyst, product-manager, data-analyst, consultant]
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
tags: [quadrant-chart, two-by-two, scatter-plot, portfolio-analysis]
pairs_with:
  prompts: [design-scatter-plot, prioritize-features, compare-options-matrix]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: items
    description: "What each point is (products, features, customers, suppliers), the two measures with units and how they were scored or measured, the number of items, and optional size or colour variables."
    type: text
    required: true
  - name: purpose
    description: "The decision the chart supports, for example 'which features to build next quarter' or 'which accounts to invest in'."
    type: text
    required: true
  - name: tool
    description: "Where it will be built: Excel, Sheets, Power BI, Tableau, Python, R or slides."
    type: string
output_contract:
  format: markdown
  sections: [Measure checks, Thresholds, Quadrant names and actions, Design spec, Caveats, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a consultant-turned-visualisation designer who has seen many 2x2 charts mislead. A quadrant chart is a scatter plot with two threshold lines, so everything depends on where the lines go: the median splits items evenly by construction, the mean is pulled by outliers, a business target is meaningful but may leave a quadrant empty, and an arbitrary midpoint of a 1 to 10 scale often puts every item in one box. Items near a line are effectively in two quadrants. Scores from opinion (effort guessed in a workshop) carry wide uncertainty, and two measures that are correlated leave the off-diagonal quadrants empty, which is a finding. Quadrant names should prompt an action, not a cliche.
</context>

<task>
Design a quadrant chart.

<items>
{{items}}
</items>

<purpose>
{{purpose}}
</purpose>

{{#tool}}
Tool: {{tool}}
{{/tool}}

1. Check the measures: units and direction (is higher better on both axes, or is effort "lower is better"; put the desirable corner at top right, reversing an axis if needed and saying so); whether scores are measured or estimated; skew and outliers; correlation between the two measures.
2. Choose thresholds and justify them: a meaningful target or benchmark first; otherwise median (balanced split) or mean; state the value of each line. Show what changes if the line moves by a reasonable amount, and flag items within that band as borderline.
3. Name the quadrants with an action each (for example "Do now", "Plan", "Quick wins if cheap", "Drop or revisit") fitted to the purpose, and assign every item to a quadrant in a table.
4. Specify the design: scatter with the threshold lines in a muted colour, quadrant names in the corners in light text, labelled points (all if under about 20, otherwise the ones the decision depends on), size or colour for a third variable only if needed, borderline items marked.
5. List caveats: estimated scores, borderline items, empty quadrants, missing items.
6. Give build notes for the tool (for example reference lines in Tableau or Power BI, axhline and axvline in matplotlib, a scatter with two extra series for lines in Excel).
</task>

<constraints>
- Do not set thresholds to make a preferred item land in the best quadrant; state the rule before placing items.
- Do not invent scores for items without data; list them as unscored.
- Treat the chart as a prompt for discussion, not a decision; say so if scores are subjective.
</constraints>

<output_format>
## Measure checks
Bullets.

## Thresholds
Table: Axis | Threshold | Rule | Sensitivity.

## Quadrant names and actions
Table: Quadrant | Name | Action | Items.

## Design spec
Table: Element | Choice | Reason.

## Caveats
Bullets.

## Build notes
Numbered steps or one code block.
</output_format>
