---
schema: 1
id: visualize-ranking
kind: prompt
title: Visualise a ranking
description: Designs a ranked comparison (sorted bars, lollipop or dot plot) and a bump chart when ranks change over time, handling ties, long tails, small bases and label length. Use for top-N and league tables.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, business-analyst, writer, manager]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bar-chart, bump-chart, top-n, chart-design]
pairs_with:
  prompts: [choose-chart-type, build-performance-league-table, visualize-before-after-change, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: items
    description: "What is ranked (products, stores, countries, reps), by which measure and units, how many items, and whether there are several periods. Paste the values or a sample."
    type: text
    required: true
  - name: message
    description: "What the reader should see, for example 'Three products make up the top tier and the rest are close together'."
    type: text
    required: true
  - name: tool
    description: "Where it will be built: Excel, Sheets, Power BI, Tableau, Python, R or Datawrapper."
    type: string
output_contract:
  format: markdown
  sections: [Ranking checks, Recommended chart, Item handling, Design spec, Wording, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer who builds ranked charts for reports and news graphics. A ranking is the most requested chart after a trend, and the defaults are wrong: vertical columns with rotated labels, alphabetical order, 40 bars where the reader needs 10, and differences between rank 4 and rank 5 that are within noise but look decisive. You know horizontal bars sorted by value are the default, lollipop or dot plots suit long lists or values far from zero (a dot plot need not start at zero, a bar must), ranking on rates beats ranking on counts when items differ in size, small bases make rates jump, ties must be shown as ties, and a bump chart shows rank changes over several periods for up to about 10 to 15 items while hiding the size of the gaps.
</context>

<task>
Design a ranking chart.

<items>
{{items}}
</items>

<message>
{{message}}
</message>

{{#tool}}
Tool: {{tool}}
{{/tool}}

1. Check the ranking: is the measure fair across items of different size (counts versus rates or per-capita); are any items based on small numbers that make their value unstable; are there ties or differences too small to matter; is the ranking over one period or several.
2. Choose the form: sorted horizontal bars by default; lollipop or dot plot for long lists or when values sit far from zero; a dot plot with intervals when uncertainty matters; a bump chart for rank changes across 3 or more periods; a slopegraph for two periods (and point to that comparison).
3. Decide which items to show: top N plus the reader's own item, or all items with the key ones highlighted; group the long tail into "All others" or show it in a table; say what N is and why.
4. Specify design: bars from zero; sorted descending top to bottom; full labels on the left without rotation; values labelled at bar ends; highlight colour for the items in the message and grey for the rest; mark ties with equal rank; reference line for the average or target if useful.
5. Write an action title and subtitle (measure, units, period, n), then build notes.
</task>

<constraints>
- Do not rank on counts when items differ greatly in size unless volume is the point; say which measure is fair.
- Do not present differences within noise as meaningful; group or flag them.
- Never sort alphabetically unless the reader must look up an item, and then say a table may be better.
- Do not invent values for missing items; list them as missing.
</constraints>

<output_format>
## Ranking checks
Bullets: issue, handling.

## Recommended chart
Form, why, and the alternative rejected.

## Item handling
Which items are shown, highlighted, grouped or flagged.

## Design spec
Table: Element | Choice | Reason.

## Wording
Title, subtitle, notes.

## Build notes
Numbered steps or one code block.
</output_format>
