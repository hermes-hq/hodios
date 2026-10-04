---
schema: 1
id: make-data-visualization-accessible
kind: prompt
title: Make in-app charts accessible
description: Fixes app charts (SVG, canvas or a chart library) with a text summary, data table fallback, keyboard exploration, non-colour encodings and contrast. Code fixes, not design critique.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, data-engineer]
requires: [none]
inputs: [file, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [svg, canvas, chart-libraries, text-alternatives, colorblind, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [review-color-contrast, write-alt-text, fix-data-table-accessibility]
  rules: [chart-design-rules]
args:
  - name: chart_code
    description: The chart component, its configuration and a sample of the data it renders. Say what the chart is meant to show if the code does not make it obvious.
    type: text
    required: true
  - name: chart_library
    description: The rendering library, for example "Chart.js 4", "Recharts", "D3", "Highcharts", "ECharts", "Vega-Lite", or "hand-written SVG". Leave empty to infer.
    type: string
output_contract:
  format: markdown
  sections: [Barriers, Fixed code, Text alternative, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A chart in a dashboard is often the only place a number appears. For a screen-reader user, a canvas chart is a blank, and an SVG chart is either silent or a flood of hundreds of unlabelled paths and tick labels read in source order. For colour-blind users, five series in red, green and orange blend together, and the legend is the only key. For keyboard users, tooltips appear only on hover. The fix has layers: a short text summary of the insight (what a sighted reader takes away in five seconds), the full data in an accessible table, non-colour encodings, and, for exploratory charts, keyboard access to points. Some chart libraries have accessibility modules or options; use them when present, and do not rebuild what the library already does well.
</context>

<task>
Make this chart accessible. Library: {{chart_library}} (infer it from the code if empty).

<chart_code>
{{chart_code}}
</chart_code>

1. Identify the chart's purpose: the one message (trend, comparison, distribution, part-to-whole) and whether users explore individual values or only read the overview.
2. Find the barriers: no text alternative; canvas with no fallback; SVG paths and ticks exposed as noise; colour as the only series distinction; series contrast below 3:1 against the background (1.4.11); text below 4.5:1; hover-only tooltips (1.4.13, 2.1.1); legend toggles that are not buttons; animation without reduced-motion handling; and live-updating charts that announce every tick.
3. Text alternative: wrap the chart in a `figure` with a `figcaption` containing a title and a one to three sentence summary of the key insight with the main figures, generated from the data so it stays true. The graphic itself gets `role="img"` with an `aria-label` that names the chart type and title, or is hidden from assistive technology when the summary and table carry everything.
4. Data table: provide the underlying data as a real `table` (visible, in a "Show data" disclosure, or linked), with header cells and units, and offer CSV download if the dashboard already has exports.
5. Non-colour encoding: direct labels on lines or bars where space allows, distinct marker shapes or dash patterns per series, and a palette that stays distinguishable for common colour-vision deficiencies. Keep 3:1 between adjacent series fills or separate them with borders.
6. Keyboard exploration (only when users need individual values): one Tab stop for the chart, arrow keys move between points or series, each point announces "Series, x label, value with unit", Escape leaves; tooltips appear on focus as well as hover and can be dismissed. Use the library's built-in keyboard module if it has one.
7. Interactions: legend toggles are buttons with `aria-pressed`; filters and zoom have keyboard equivalents; updates announce a summary change politely, not every data point.
8. Respect `prefers-reduced-motion` for entry animations.
</task>

<constraints>
- Do not redesign the chart type or message unless it blocks access; mention design issues in one line each.
- Generate summary text from the data at runtime; never hard-code numbers that will go stale.
- Do not invent library options; if unsure an option exists in this version, say [check docs] and show a library-independent fallback.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Barriers
Table: Barrier | Who is affected | WCAG SC | Fix.

## Fixed code
The updated component with the figure, summary, table fallback, encodings and keyboard support as needed, with comments.

## Text alternative
The example summary sentence this code would produce for the sample data, and the table headers.

## Checks
Numbered: screen reader pass over the figure and table, keyboard pass, a colour-vision simulator check, 200% zoom, and reduced-motion setting.
</output_format>
