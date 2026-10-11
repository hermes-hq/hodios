---
schema: 1
id: design-sankey-diagram
kind: prompt
title: Design a Sankey diagram
description: Designs a Sankey or alluvial diagram for flows such as budgets, energy, user journeys or status changes, checking flows balance, limiting nodes and ordering them. Use when showing where quantities go.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, product-manager, researcher, financial-analyst]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sankey, alluvial, flows, user-journeys, chart-design]
pairs_with:
  prompts: [choose-chart-type, write-plotting-code, analyze-conversion-funnel]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: flows
    description: "The flows: source, target and amount for each link (or a description of the data), the unit (money, people, kWh, sessions), the stages, and whether the same entity can appear more than once."
    type: text
    required: true
  - name: message
    description: "What the reader should see, for example 'Most of the budget goes to two programmes' or 'Most trial users drop out before setup'."
    type: string
    required: true
  - name: tool
    description: "Tool: plotly, D3, Flourish, Power BI, Tableau, R (ggalluvial or networkD3) or another."
    type: string
output_contract:
  format: markdown
  sections: [Is a Sankey right, Flow table check, Node plan, Design spec, Code or build steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer who builds flow diagrams. Sankey diagrams are striking and often unreadable: too many nodes produce a hairball of crossing links; flows that do not balance (more out of a node than in) look like errors; loops (a user returning to an earlier step) break the layout; widths encode quantity, so mixed units or percentages of different bases make them meaningless; and colour by source versus by target changes what readers follow. For many questions a simpler chart, such as a funnel bar chart or a stacked bar of destinations, says the same thing more clearly. You check that first.
</context>

<task>
Design a Sankey diagram for these flows, or recommend something better.

<flows>
{{flows}}
</flows>

<message>
{{message}}
</message>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Test fit: a Sankey is right when the message is about how a quantity splits and recombines across two or more stages. If it is a simple linear drop-off, recommend a funnel or bar chart; if it is a single split, a sorted bar or stacked bar; offer the Sankey only as a companion.
2. Check the flow table: same unit throughout; inflow equals outflow at every intermediate node (or show the gap as an explicit "unaccounted" or "other" flow); no double counting when entities appear in several stages; loops removed by unrolling stages (step 1, step 2, return visit) or by counting first visits only.
3. Plan the nodes: keep to about 5 to 7 nodes per stage and 25 to 30 links in total; group small flows (under about 2 to 3% of the total) into "other"; order nodes in each stage to minimise crossings and keep the main path on top or straight.
4. Design spec: colour by the dimension the message follows (source for "where does it go", target for "where does it come from"), with the focus flow highlighted and the rest muted; node labels with values and shares; consistent node width and padding; a title that states the message.
5. Give the flow table in source, target, value format and code or build steps for the tool (plotly Sankey, D3 sankey, Flourish, Power BI custom visual, ggalluvial).
</task>

<constraints>
- Do not draw a Sankey with mixed units or with percentages of different bases.
- Do not invent flows; if only stage totals are given, say that link-level data is needed and what it looks like.
- Never hide an imbalance between inflow and outflow; show it.
- Keep personal data aggregated; flows for very small groups should be grouped.
</constraints>

<output_format>
## Is a Sankey right
Yes or no, with the reason and any companion chart.

## Flow table check
Balance checks per node and any fixes.

## Node plan
Table: Stage | Nodes | Grouping | Order.

## Design spec
Bullets.

## Code or build steps
The flow table and one code block or numbered steps.
</output_format>
