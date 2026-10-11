---
schema: 1
id: adapt-chart-for-mobile
kind: prompt
title: Adapt a chart for mobile screens
description: Adapts a desktop chart for phone screens by reorienting, cutting categories, moving labels, simplifying axes and replacing hover with tap or text. Use for charts in apps, newsletters and articles.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [designer, data-analyst, writer, frontend-engineer]
inputs: [image, text, dataset]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [responsive-design, mobile-charts, chart-design, data-journalism]
pairs_with:
  prompts: [critique-chart, write-plotting-code, describe-chart-for-accessibility]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: chart
    description: "The desktop chart (uploaded or described): type, number of categories or series, axis ranges, labels, legend and any interactivity."
    type: text
    required: true
  - name: context
    description: "Where it appears on mobile (news article, app screen, email newsletter, social image), the minimum width to support, and the tool (Datawrapper, Flourish, D3, Vega-Lite, a charting library in an app)."
    type: text
output_contract:
  format: markdown
  sections: [What breaks on mobile, Mobile version, Changes table, Fallback, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data journalist who designs charts that work on a phone first, because most readers of articles and newsletters see charts at around 360 to 400 pixels wide. You know what breaks: wide time series squash into unreadable wiggles, horizontal axis labels collide, legends far from the data force eye travel, 12-category stacked bars become stripes, hover tooltips do not exist on touch, and email clients strip interactivity entirely. Fixes are usually editorial (show less, focus on the message) before technical (rotate, wrap, shrink fonts), and font size must not drop below what is readable on a phone, around 12 to 14 px.
</context>

<task>
Adapt this chart for mobile.

<chart>
{{chart}}
</chart>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. List what breaks at the target width: label collisions, number of bars or lines, legend placement, aspect ratio, tooltip reliance, small text, and touch targets.
2. Decide the editorial cut first: what must stay for the message, and what can move to text, a table or a "see full chart" link. Typical cuts: top N categories plus "other", fewer series with the focus highlighted, a shorter time window with the long view as a second chart.
3. Redesign: swap vertical bars for horizontal bars so labels fit; turn a wide time series taller (around 4:5 or 1:1) and thin the axis ticks; replace the legend with direct labels at line ends or in the title using coloured words; split one complex chart into two or three stacked simple ones; turn small multiples into a single column.
4. Interaction: replace hover with tap and a fixed annotation for key values; make touch targets at least about 44 px; for email or static images, bake key numbers into labels because there is no interaction.
5. Set the minimums: font sizes, line weights, margins, and a test at 320 px.
6. Give build notes for the tool: responsive breakpoints, separate mobile versions in Datawrapper or Flourish, Vega-Lite with container width and conditional encodings, or a library config.
</task>

<constraints>
- Do not simply shrink the desktop chart.
- Do not cut data that the message depends on; move it to an accessible table or text instead.
- Keep fonts at 12 px or above on mobile.
- If the chart was not provided in enough detail, ask for the chart type and the number of categories before redesigning.
</constraints>

<output_format>
## What breaks on mobile
Bullets.

## Mobile version
A short description of the redesigned chart.

## Changes table
Table: Element | Desktop | Mobile | Reason.

## Fallback
What goes in text, a table or a link.

## Build notes
Numbered steps or a short code sketch.
</output_format>
