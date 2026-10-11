---
schema: 1
id: design-heatmap
kind: prompt
title: Design a heatmap
description: Designs a heatmap such as a calendar, correlation matrix, cohort grid or hour-by-day pattern, choosing row order, colour scale, normalisation and labels. Use for patterns across two dimensions.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, data-scientist, researcher, product-manager]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [heatmap, colour-scales, correlation-matrix, calendar-heatmap, chart-design]
pairs_with:
  prompts: [choose-chart-colors, build-cohort-analysis, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: data_description
    description: "What the rows, columns and cell values are (for example weekday by hour with order counts, or 20 variables with pairwise correlations), the value range, missing cells and the number of rows and columns."
    type: text
    required: true
  - name: message
    description: "The pattern readers should see, for example 'Orders peak on weekday lunchtimes' or 'Which survey items move together'."
    type: string
    required: true
  - name: tool
    description: "Tool: seaborn, plotly, ggplot2, Vega-Lite, Excel conditional formatting, Tableau or Power BI."
    type: string
output_contract:
  format: markdown
  sections: [Is a heatmap right, Rows and columns, Colour scale, Labels and annotation, Code or build steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer who builds heatmaps for analysts. You know that colour is a weak channel for exact values, so heatmaps are for patterns, not lookups; that the row and column order decides whether a pattern is visible (alphabetical order hides clusters, hierarchical clustering or a natural order reveals them); that raw counts in a grid often just show where volume is, so normalising by row, by column or by expected value changes the story; that a diverging scale needs a meaningful midpoint (zero correlation, the average) and a sequential scale must not be rainbow; and that outliers can wash out the rest of the scale unless it is capped or binned.
</context>

<task>
Design a heatmap for this data.

<data_description>
{{data_description}}
</data_description>

<message>
{{message}}
</message>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Test fit: heatmaps suit two categorical or binned dimensions with a value in each cell and a pattern message. For a few cells or exact comparisons, recommend a table or dot plot; for one dimension over time, a line chart.
2. Order rows and columns: natural order for time (hours, weekdays starting on the reader's convention, months), cohort start for cohort grids, hierarchical clustering or ordering by the first principal component for correlation matrices, and sorting by total for categories. For a correlation matrix, show only the lower triangle.
3. Normalise to the message: raw values, row percentages (share of each row), column percentages, rates, or deviation from expected; say which and why. Handle missing cells with a distinct pattern or colour, not the lowest colour.
4. Colour scale: sequential (single hue or perceptually uniform such as viridis) for magnitude; diverging with the midpoint at zero, the average or a target for signed values; binned classes (five to seven) when readers need groups; capped extremes with a note when outliers dominate. Ensure it works in greyscale and for colour-vision deficiency.
5. Labels and annotation: cell values only when the grid is small (under about 100 cells) and with text colour that switches for contrast; a legend with units; highlight the cells the message is about with an outline; a title stating the pattern.
6. Give code or build steps for the tool (seaborn heatmap or clustermap, ggplot2 geom_tile, plotly imshow, Excel conditional formatting with a three-colour scale set to numbers, Tableau highlight table).
</task>

<constraints>
- No rainbow or jet colour scales.
- Do not use a diverging scale without a meaningful midpoint.
- Do not order categories alphabetically when another order reveals the pattern, unless readers must look up names.
- If the data were not given, keep claims about the pattern conditional.
- For correlation matrices, remind readers that correlations do not show causation and that many cells mean some strong correlations will appear by chance.
</constraints>

<output_format>
## Is a heatmap right
Yes or no and why.

## Rows and columns
Order, normalisation and missing-cell handling.

## Colour scale
Type, palette with hex codes or palette name, midpoint, binning, capping.

## Labels and annotation
Bullets.

## Code or build steps
One code block or numbered steps.
</output_format>
