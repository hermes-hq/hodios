---
schema: 1
id: visualize-hierarchy
kind: prompt
title: Visualise a hierarchy
description: "Visualises nested categories as a treemap, icicle, sunburst or indented tree with depth limits, sizing and labels, and says when a table is better. Use for budgets or catalogues."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, business-analyst, financial-analyst, software-engineer]
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
tags: [treemap, sunburst, hierarchical-data, chart-design]
pairs_with:
  prompts: [visualize-part-to-whole, design-sankey-diagram, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: hierarchy
    description: "The levels (for example department > team > cost line, or category > subcategory > product), the measure and units, approximate number of nodes per level, and a sample of rows."
    type: text
    required: true
  - name: question
    description: "What the reader must find out, for example 'where most of the spend sits' or 'which subcategories grew'."
    type: text
    required: true
  - name: tool
    description: "Where it will be built: Power BI, Tableau, plotly, D3, ggplot2 (treemapify), Excel or Flourish."
    type: string
output_contract:
  format: markdown
  sections: [Data checks, Recommended form, Levels and depth, Design spec, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer for hierarchical data. Treemaps are good at showing where most of a total sits across many nested items and poor at comparing similar-sized rectangles; sunbursts look striking but distort outer rings and make angle comparisons hard; icicle charts (a rectangular sunburst) read better and keep labels horizontal; indented trees and collapsible tables are often the most useful for lookup; node-link tree diagrams suit structure (who reports to whom) rather than size. You know that size-based layouts need a measure that is positive and additive up the tree, that showing more than two or three levels at once becomes unreadable, that colour should encode one thing (top-level group or a change measure on a diverging scale, not both), and that labels only fit in large tiles.
</context>

<task>
Design a visualisation for this hierarchy.

<hierarchy>
{{hierarchy}}
</hierarchy>

<question>
{{question}}
</question>

{{#tool}}
Tool: {{tool}}
{{/tool}}

1. Check the data: is the measure additive and non-negative (negative values or rates such as margins cannot size tiles); do children sum to parents; is the tree balanced or ragged (some branches deeper); are there many tiny leaves.
2. Pick the form for the question: treemap for "where is most of it"; icicle or sunburst for showing the full path, only with few levels; indented tree or a collapsible table for lookup and exact values; node-link tree for structure without size; a sorted bar chart of one level when only one level matters. Name the rejected alternative.
3. Set levels and depth: show at most two levels at once, with drill-down or small multiples for deeper levels; group tiny leaves into "Other within parent"; choose a sort (by size, with a stable order for comparison over time).
4. Specify the design: what size encodes, what colour encodes (top-level group with hue, or a change measure on a diverging scale, not both), borders between parents thicker than between children, label rules (show label and value only when the tile is large enough), tooltips with the full path and value for interactive tools.
5. Give build notes for the tool, including how to set the hierarchy order and drill behaviour.
</task>

<constraints>
- Do not size tiles by a non-additive measure (rates, averages, percentages); size by the additive base and colour by the rate.
- Do not show more than about three levels in a single static view.
- If the reader needs exact values or comparisons between similar items, say a table or bar chart is better and give that instead.
</constraints>

<output_format>
## Data checks
Bullets.

## Recommended form
Form, why, and the alternative rejected.

## Levels and depth
Levels shown, grouping and drill-down.

## Design spec
Table: Element | Choice | Reason.

## Build notes
Numbered steps or one code block.
</output_format>
