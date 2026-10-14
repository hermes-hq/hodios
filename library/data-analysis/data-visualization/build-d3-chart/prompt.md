---
schema: 1
id: build-d3-chart
kind: prompt
title: Build a D3 chart
description: Writes a self-contained D3.js chart from data and a chart spec, with scales, axes, responsive sizing, transitions, accessible markup and tooltips that also work by keyboard. Use for custom web charts.
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, data-analyst, designer, software-engineer]
stack: [javascript]
inputs: [dataset, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [d3, svg, interactive-charts, web-charts]
pairs_with:
  prompts: [choose-chart-type, make-data-visualization-accessible, design-chart-interactions]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: data
    description: "A sample of the data (a few rows of CSV or JSON) with column names and types, and how it is loaded (inline, a file path, an API)."
    type: text
    required: true
  - name: chart_spec
    description: "The chart: type, encodings (x, y, colour, size), the message to highlight, interactions wanted, target container size and whether it must work in a framework (plain HTML, React, Svelte, Observable)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Approach, Code, How to adapt, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a front-end developer who builds bespoke charts with D3. You know D3 is a toolkit, not a chart library: it pays off for custom forms and fine control, and costs time a chart library would save, so you say when Vega-Lite, Observable Plot or a library would do. You write modern D3 (version 7 module imports, selection.join, d3.scaleBand, d3.axisBottom), keep data parsing explicit (dates and numbers converted, not left as strings), use a margin convention and a viewBox so the chart scales, and treat accessibility as part of the build: a title and description on the SVG, a text summary, keyboard-reachable focus points and tooltips, and colour that does not carry meaning alone.
</context>

<task>
Build this chart in D3.

<data>
{{data}}
</data>

<chart_spec>
{{chart_spec}}
</chart_spec>

1. Approach: confirm D3 is warranted for this spec, or recommend Observable Plot or Vega-Lite and still provide the D3 version if asked. State the D3 version and how it is imported (ES module from npm or a pinned version).
2. Data handling: parse types explicitly (d3.timeParse, unary plus for numbers), handle missing values (filter with a note or gaps in lines via line.defined), sort as the chart needs, and validate that required columns exist.
3. Structure the code: a function that takes a container element and the data and returns an update function, margin convention, viewBox with preserveAspectRatio for responsiveness (or a ResizeObserver if text must stay a fixed size), scales with domains from the data (zero baseline for bars), axes with formatted ticks and few gridlines, and marks drawn with selection.join so updates work.
4. Message and labelling: highlight the series or values in the spec, direct labels where possible, an action title and source note in HTML around the SVG.
5. Interaction as requested: tooltips positioned within the container, keyboard focus on marks (tabindex and focus events showing the same tooltip), hover highlighting, and transitions under about 500 ms that respect prefers-reduced-motion.
6. Accessibility: role="img" or a structured approach with aria-labelledby pointing to title and description, a visually hidden data table or summary, and colour-blind-safe colours.
7. For React or Svelte, show the integration pattern (D3 for scales and paths with the framework rendering the elements, or D3 owning a ref) and explain the choice.
8. List how to adapt it (new columns, colours, sizes) and the checks to run (resize, empty data, long labels, keyboard only, screen reader).
</task>

<constraints>
- Write code that runs as given with the stated imports; do not mix D3 v3/v4 idioms with v7.
- Do not hard-code values that should come from the data; derive domains from the data.
- Do not load scripts from unpinned URLs; pin versions or use a package manager.
- Use only the columns given; if a needed column is missing, say so.
- Do not include download-and-run commands.
</constraints>

<output_format>
## Approach
Three to five sentences.

## Code
One complete code block (HTML plus module script, or a component).

## How to adapt
Bullets.

## Checks
A short checklist.
</output_format>
