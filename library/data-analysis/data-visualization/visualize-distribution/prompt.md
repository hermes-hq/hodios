---
schema: 1
id: visualize-distribution
kind: prompt
title: Visualise a distribution
description: Picks and specifies the chart for one or several distributions (histogram, box, violin, beeswarm, ECDF) with bin widths, scales and outlier handling. Use to show spread, not only averages.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, data-scientist, researcher, student]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [distributions, histogram, box-plot, ecdf, chart-design]
pairs_with:
  prompts: [choose-chart-type, write-plotting-code, explore-dataset]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: data_description
    description: "The variable(s): what is measured, units, number of observations, rough range and shape if known (skewed, many zeros, rounded values), and the groups to compare."
    type: text
    required: true
  - name: message
    description: "What the reader should see, for example 'Most delivery times are short but there is a long tail' or 'Team B is more variable, not slower'."
    type: string
    required: true
  - name: tool
    description: "Plotting tool: matplotlib, seaborn, plotly, ggplot2, Vega-Lite, Excel or a BI tool."
    type: string
output_contract:
  format: markdown
  sections: [Recommended chart, Design spec, Pitfalls for this data, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data visualisation designer who insists on showing spread, not just averages. You know the choices and their traps: a histogram's shape depends on bin width and the starting point; density curves smooth over gaps and spill below zero for positive data; box plots hide bimodality and sample size; violins are hard for lay readers; strip and beeswarm plots show every point but stop working past a few thousand; ECDFs compare many groups and read percentiles exactly but need explaining; and long right tails (incomes, response times, delivery days) often need a log scale or a clipped view with the tail reported. The right chart depends on the number of points, the number of groups, the audience and the message.
</context>

<task>
Design a chart for this distribution.

<data_description>
{{data_description}}
</data_description>

<message>
{{message}}
</message>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Characterise the data: sample size per group, skew, zeros, rounding or heaping (values clustering at round numbers), discreteness, and outliers. If these are unknown, list the quick checks to run first.
2. Choose the chart from the message and size:
   - one variable, general audience: histogram with a stated bin width, or a dot plot for small samples;
   - a few groups, under about 200 points each: strip or beeswarm with a median marker;
   - several groups, many points: box plots with points overlaid or a raincloud plot, or ridgeline densities for many groups;
   - comparing percentiles or many groups precisely: ECDF;
   - long tail: log scale, or a main view clipped at a high percentile with the tail summarised.
3. Specify the details: bin width chosen from the data's units (for example 1 day, 5 minutes) and checked against a second width; bandwidth for densities and boundary handling for positive data; whether box whiskers are 1.5 × IQR; group order by median; shared axes when groups are compared; sample sizes in labels; the summary to mark (median, mean, a target).
4. List pitfalls for this data and how the design avoids them.
5. Give code in the user's tool (seaborn or ggplot2 by default) with a title stating the message.
</task>

<constraints>
- Do not show only means or a bar of means when the message is about spread or shape.
- State the bin width or bandwidth in the chart or caption.
- Do not let density curves imply values that cannot exist (below zero, between integers for counts).
- Show group sample sizes when they differ a lot.
- If the data was not provided, do not describe its shape as fact; make the recommendation conditional.
</constraints>

<output_format>
## Recommended chart
The chart and the reason, in two or three sentences, plus a fallback for a non-technical audience.

## Design spec
Table: Element | Choice | Reason.

## Pitfalls for this data
Bullets.

## Code
One code block.
</output_format>
