---
schema: 1
id: convert-chart-between-libraries
kind: prompt
title: Convert a chart between libraries
description: "Ports a chart between tools or libraries (Excel, matplotlib, plotly, ggplot2, Vega-Lite) keeping encodings, order, scales and style, with a parity checklist."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, software-engineer, researcher]
stack: [python, r, javascript]
inputs: [file, text, image]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [matplotlib, plotly, ggplot2, code-translation]
pairs_with:
  prompts: [write-plotting-code, debug-plotting-code, create-chart-style-guide]
  rules: [chart-design-rules]
args:
  - name: source_chart
    description: "The existing chart: its code, or for a GUI tool (Excel, Tableau, Power BI) a description or screenshot of the chart and its settings, plus the data structure."
    type: text
    required: true
  - name: target
    description: "The target library or tool and version if known (matplotlib, seaborn, plotly, ggplot2, Vega-Lite, Observable Plot, Chart.js), and whether it must stay static or become interactive."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Encoding inventory, Mapping notes, Code, Parity checklist, Differences that remain]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You port charts between plotting systems. A literal line-by-line translation usually fails because the libraries think differently: ggplot2 and Vega-Lite are grammar-of-graphics (data in long format, mappings declared, statistics computed by layers), matplotlib is imperative (you draw what you computed), plotly sits between (express for tidy data, graph objects for control). What silently changes in a port: category order (alphabetical by default in many libraries), default statistics (seaborn barplot shows means with error bars, ggplot2 geom_bar counts rows, Excel plots what is in the cells), axis limits and zero baselines, date parsing and time zones, stacking and dodge defaults, colour mapping order, legend and facet ordering, number formats, and font sizes in points versus pixels. You inventory the encodings first, then map them.
</context>

<task>
Convert this chart.

<source_chart>
{{source_chart}}
</source_chart>

<target>
{{target}}
</target>

1. Inventory the source chart's encodings and settings: data shape, mark type, x, y, colour, size, facet, any statistic or aggregation, sort order, axis ranges and scale types, labels and number formats, colours, annotations, size and theme.
2. Note how each maps to the target, including the data reshaping needed (wide to long, pre-aggregation when the target does not compute statistics), and any feature that has no direct equivalent with the closest workaround.
3. Write the target code: data preparation first, then the chart, with explicit category orders, explicit axis limits where the source had them, explicit colours in the source order, and the same titles and formats.
4. Give a parity checklist the user can tick by comparing the two outputs side by side (values, order, scales, colours, labels, legend, size).
5. List differences that remain and why (for example a default font, hover behaviour added in an interactive target).
</task>

<constraints>
- Do not change what the chart shows; keep aggregations, filters and order identical unless the user asks for a redesign, and point out any defect in the source separately.
- Make every default that could differ explicit in the target code.
- If the source is a screenshot without data, say the data must be supplied or estimated and mark estimates.
</constraints>

<output_format>
## Encoding inventory
Table: Element | Source setting.

## Mapping notes
Table: Element | Target equivalent | Note.

## Code
One code block.

## Parity checklist
Checklist.

## Differences that remain
Bullets, or "None".
</output_format>
