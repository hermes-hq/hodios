---
schema: 1
id: build-kpi-tree
kind: prompt
title: Build a KPI driver tree
description: Decomposes a top-line metric into a driver tree with exact formulas, definitions and owners, so a change in the metric can be traced to the input that moved. Use for metric design and reviews.
category: reporting
version: 1.0.0
status: experimental
stage: [design]
role: [data-analyst, product-manager, founder, business-analyst]
requires: [none]
inputs: [text, topic]
output: [diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [driver-tree, metric-design, variance-analysis, business-reviews]
pairs_with:
  prompts: [analyze-ab-test-results, run-what-if-analysis]
args:
  - name: metric
    description: The top-line metric to decompose, for example "monthly recurring revenue" or "weekly orders".
    type: string
    required: true
  - name: business_model
    description: How the business makes money and the data you have, for example "B2B SaaS, seat-based pricing, self-serve and sales-led, data in Stripe and our product database".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Metric definition, Tree, Nodes, Tracing a change, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A KPI tree (driver tree) breaks an outcome metric into the inputs that produce it, so when the metric moves the team can say which input moved and who owns it. It only works if every split is an identity: the children multiply or add up exactly to the parent, with no gaps and no overlaps. Trees fail when they mix correlated "influences" with arithmetic drivers, when branches overlap (double counting), when ratio metrics hide mix shifts, or when the leaves are things no team can act on.
</context>

<task>
Build a KPI tree for "{{metric}}" in this business:
<business_model>
{{business_model}}
</business_model>

1. Define the metric precisely: formula, unit, time grain, what counts and what does not.
2. Decompose it with mathematical identities, choosing the split that matches how the business works: additive splits (new + expansion − churn; by segment or channel) and multiplicative splits (traffic × conversion × average order value; customers × frequency × basket).
3. Continue three to five levels down until each leaf is an input metric that one team can influence directly.
4. For each node give: formula, definition, data source, owning team, and whether it is a leading or lagging indicator.
5. Check the tree: every level reconciles exactly to its parent; branches are mutually exclusive and together exhaustive; flag ratio nodes where a change in mix (for example more traffic from a low-converting channel) can move the parent while every segment is flat.
6. Show how to trace a change: walk through a worked example with clearly labelled hypothetical numbers, attributing a change in the top metric to its drivers with a stated method (sequential substitution, or a log decomposition for multiplicative trees), and note that the order of substitution changes the split.
</task>

<constraints>
- Every edge is an identity, not a correlation. Put non-arithmetic influences (for example marketing campaigns, seasonality, NPS) in a separate list of "levers that act on" a node, not in the tree.
- Use the business's own terms and data sources when given. Where a data source is not mentioned, mark it "[source?]" instead of guessing a system.
- Label all example numbers "hypothetical". Never present them as the business's data.
- Keep the tree readable: at most about 25 nodes; collapse detail into a node table when needed.
- If the metric is ambiguous (for example "revenue" with no indication of bookings, billings or recognised revenue), state the definition you chose and the alternatives.
</constraints>

<output_format>
## Metric definition
Formula, unit, grain, inclusions and exclusions.
## Tree
A Mermaid `flowchart TD` diagram in a fenced block, with the operator (+, −, ×, ÷) on each split, followed by the same tree as an indented list with formulas.
## Nodes
A table: node | formula | definition | data source | owner | leading or lagging.
## Tracing a change
The hypothetical worked example with its arithmetic.
## Data gaps
Nodes you cannot measure yet, and what to instrument.
</output_format>
