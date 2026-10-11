---
schema: 1
id: visualize-conversion-funnel
kind: prompt
title: Visualise a conversion funnel
description: "Designs a funnel chart showing step counts, step and overall conversion, segments and change over time, without distorted tapered shapes. Use for signup or checkout funnels."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, marketer, data-analyst, sales-rep]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [funnel-chart, conversion-rate, product-analytics, chart-design]
pairs_with:
  prompts: [analyze-conversion-funnel, visualize-ranking, design-kpi-cards]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: funnel_data
    description: "The steps in order, counts per step (users, sessions or deals), the time window, how a user enters each step (strict sequence or any order), and any segments or periods to compare."
    type: text
    required: true
  - name: message_and_tool
    description: "What the reader should see (for example 'mobile loses twice as many users at payment') and where it will be built (Amplitude, Mixpanel, GA4, Power BI, Tableau, Python, slides)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Funnel checks, Conversion table, Recommended chart, Design spec, Wording, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analytics designer. The classic tapered funnel graphic distorts: its width is decorative, its area exaggerates drops, and it cannot compare segments or periods. Horizontal bars from a common baseline, ordered by step, with step conversion and overall conversion labelled, are easier to read; a line or slope of conversion by step works for comparing segments; and a small multiple or line chart of step conversion over time shows whether a change helped. You know the data traps that make funnel charts lie: counts that are not a strict sequence (users reaching step 3 without step 2), steps measured in different units (sessions at the top, users below), different time windows per step, mixing users who are still in progress with those who dropped, and comparing segments whose top-of-funnel mix differs.
</context>

<task>
Design the funnel chart.

<funnel_data>
{{funnel_data}}
</funnel_data>

<message_and_tool>
{{message_and_tool}}
</message_and_tool>

1. Check the funnel: same unit at every step; strict ordered funnel or "ever reached"; conversion window; counts that increase between steps (a sign of a non-strict funnel or tracking issue); users still in progress. Say what each issue does to the chart.
2. Compute a table: step, count, step conversion from previous, overall conversion from the first step, and drop-off count. Show the arithmetic for one row.
3. Choose the chart: horizontal bars from a common baseline with labels for a single funnel; grouped bars or a dot plot of step conversion for segment comparison; a line of step conversion over time for before-and-after; mark the largest absolute drop and the largest relative drop, which may differ.
4. Specify the design: step names as plain-language actions, bars in one colour with the step that matters highlighted, labels with count and both conversion rates, no tapered shapes or 3D, segment colours consistent across charts.
5. Write an action title, subtitle with unit, window and period, and a note on the funnel definition.
6. Give build notes for the tool.
</task>

<constraints>
- Do not draw a tapered funnel shape whose widths are not proportional to the counts.
- Do not mix units (sessions and users) in one funnel; say which to use.
- Do not claim why users drop off; the chart shows where, and causes need research.
- Do not invent counts for steps that are not tracked; show them as missing.
</constraints>

<output_format>
## Funnel checks
Bullets.

## Conversion table
Table: Step | Count | Step conversion | Overall conversion | Drop-off.

## Recommended chart
Form, why, and the alternative rejected.

## Design spec
Table: Element | Choice | Reason.

## Wording
Title, subtitle, definition note.

## Build notes
Numbered steps or one code block.
</output_format>
