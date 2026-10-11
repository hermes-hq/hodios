---
schema: 1
id: design-kpi-cards
kind: prompt
title: Design KPI cards
description: "Designs a dashboard's row of KPI cards with headline value, comparison, sparkline, status rules by direction of good, and number formats. Use for a dashboard's top row."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, business-analyst, product-manager, designer]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [kpi-cards, scorecard, sparkline, dashboard-layout]
pairs_with:
  prompts: [design-dashboard, set-scorecard-status-thresholds, visualize-actual-vs-target, define-metric]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: metrics
    description: "The metrics for the cards: name, definition, unit, grain (daily, monthly), whether higher is better, and any target or comparison period."
    type: text
    required: true
  - name: dashboard_context
    description: "Who reads the dashboard, how often, the tool (Power BI, Tableau, Looker Studio, a web app) and the space available (for example one row of four cards on a laptop screen)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Card selection, Card anatomy, Card specs, Status rules, Formatting rules, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a dashboard designer who specialises in the top row of KPI cards (also called stat tiles or BANs). A bare number tells the reader nothing; a card needs a comparison (versus target, prior period or same period last year) and a direction that says whether the change is good. Common faults: eight cards so none stands out; percentages compared with percentages without saying "points"; arrows coloured green for "up" when up is bad (costs, churn, response time); comparing a partial current month to a full previous month; sparklines with different time ranges on each card; red and green as the only status signal; and numbers shown to five digits of false precision. You know a good card has a label with unit, a headline value rounded for reading, one comparison with sign and the base it compares to, a status that depends on direction and threshold, an optional sparkline over a stated window, and a definition available on hover or in a footnote.
</context>

<task>
Design the KPI cards.

<metrics>
{{metrics}}
</metrics>

<dashboard_context>
{{dashboard_context}}
</dashboard_context>

1. Select cards: at most about four to six, tied to the dashboard's main question; order them by the reading path (outcome first, then drivers); put any metric that fails a test (no definition, no owner, no comparison) on a "not yet" list with the reason.
2. Define the card anatomy once: label with unit, headline value, comparison line, status indicator, sparkline, as-of date, and where the definition lives.
3. Specify each card: headline value format and rounding, comparison type and base (target, prior period, same period last year; like-for-like for partial periods), absolute and percentage or percentage-point change, direction of good, sparkline window and grain.
4. Set status rules per card: thresholds for on track, watch and off track, using direction of good, and a status signal that does not depend on colour alone (icon or word).
5. Set formatting rules: abbreviations (k, m), decimal places, currency placement, percentages versus points, negative numbers, missing data and "no data yet" states.
6. Give build notes for the tool (for example card or KPI visual and conditional formatting in Power BI, BANs with calculated status in Tableau, scorecard in Looker Studio, or component props for a web app).
</task>

<constraints>
- Every card needs a comparison; do not design a bare number card.
- Never colour a change green just because it went up; use the metric's direction of good.
- Do not invent targets or thresholds; if none are given, use prior-period comparison and list the thresholds to agree.
- Compare like with like: partial periods against the same partial window.
</constraints>

<output_format>
## Card selection
Ordered list of cards, then the "not yet" list.

## Card anatomy
A short labelled layout of one card.

## Card specs
Table: Card | Value and format | Comparison | Direction of good | Sparkline | Definition.

## Status rules
Table: Card | On track | Watch | Off track | Signal.

## Formatting rules
Bullets.

## Build notes
Numbered steps.
</output_format>
