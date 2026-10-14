---
schema: 1
id: visualize-before-after-change
kind: prompt
title: Visualise a before-and-after change
description: Designs a chart comparing two points in time or two conditions across many items (slopegraph, dumbbell or change bars) with ordering, highlighting and honest scales. Use for before-after stories.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, writer, researcher, manager]
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
tags: [slopegraph, dumbbell-chart, change-over-time, chart-design]
pairs_with:
  prompts: [choose-chart-type, compare-period-performance, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: data_description
    description: "The items being compared (countries, products, schools), the two points (years, before and after a change, two conditions), the measure and units, and how many items."
    type: text
    required: true
  - name: message
    description: "The point to make, for example 'Every region improved, but the gap between best and worst widened'."
    type: string
    required: true
  - name: tool
    description: "Tool: Datawrapper, Flourish, ggplot2, matplotlib, plotly, Excel, Tableau or Power BI."
    type: string
output_contract:
  format: markdown
  sections: [Recommended chart, Ordering and highlighting, Scale and labels, Code or build steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer who specialises in comparison charts. Clustered bars for "2020 vs 2025" across 15 items make readers compare pairs of bars one at a time and hide the change. Better forms exist: a slopegraph shows direction and rank changes for up to about 15 to 20 items; a dumbbell (connected dot) plot shows level and gap for many items sorted by one end; arrows show direction on a dumbbell; and a bar chart of the change itself is clearest when only the change matters. You also know the traps: ranking by change rewards small bases, percentage change and percentage-point change are different, and a truncated axis on change bars is fine but a slopegraph must keep both ends on the same scale.
</context>

<task>
Design a before-and-after chart.

<data_description>
{{data_description}}
</data_description>

<message>
{{message}}
</message>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Decide what matters: the levels at both points, the change, the ranks, or the spread between items. Choose the measure of change (absolute, percentage, percentage points) and state it.
2. Recommend the chart:
   - slopegraph when rank changes or crossing lines are the message and items number up to about 15 to 20;
   - dumbbell or arrow plot when levels and gaps matter for many items, sorted by the after value or the change;
   - change bars (diverging around zero) when only the change matters;
   - small multiples or a line chart if there are more than two points in time.
3. Ordering and highlighting: sort by the value that serves the message; colour increases and decreases differently (with a non-colour cue such as arrows), or highlight the focus items and grey the rest; add a reference (average, target).
4. Scale and labels: same scale for both ends; label items directly at the line ends or rows; show values at both ends for the focus items; state units and the two time points in the subtitle.
5. Flag traps for this data: small-base items with huge percentage changes, items missing a value at one point (show them separately rather than dropping silently), and changes in measurement between the two points.
6. Give code or build steps (Datawrapper range plot or slope chart, ggplot2 with geom_segment and geom_point, matplotlib, plotly).
</task>

<constraints>
- Do not use clustered bars as the primary recommendation when the change is the message.
- Do not mix percentage change and percentage-point change.
- Do not drop items that lack one value without saying so.
- If the data were not given, write code with clearly marked placeholder column names.
</constraints>

<output_format>
## Recommended chart
Chart, measure of change and reason in two or three sentences.

## Ordering and highlighting
Bullets.

## Scale and labels
Bullets, including the subtitle text.

## Code or build steps
One code block or numbered steps.
</output_format>
