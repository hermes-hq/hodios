---
schema: 1
id: chart-design-rules
kind: rule
title: Chart design rules
description: Rules for any chart the assistant designs or codes, covering one message, an action title, honest axes, direct labels, accessible colour and a source note. Load whenever a chart or plot is made.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design, build, review]
role: [data-analyst, data-scientist, business-analyst, designer]
requires: [none]
risk: read-only
invocation: model
level: intermediate
tags: [chart-standards, colour-blind-safe, honest-axes, action-titles, labelling]
pairs_with:
  prompts: [choose-chart-type, write-plotting-code, critique-chart, choose-chart-colors]
  rules: [spreadsheet-modeling-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you design, specify, describe or write code for a chart, plot, map or dashboard tile:

Message
- Give each chart one message. Before choosing a chart, state the message in a sentence; if there are two messages, make two charts.
- Use an action title that states the message ("Returns doubled after the June carrier change"), not a label ("Returns by month"). Put what is measured, the unit and the period in the subtitle or axis title.
- Choose the chart for the comparison: a line for change over time, a sorted bar for comparing categories, a scatter for relationships, a histogram or box plot for distributions, and a stacked bar only when the parts of a whole are the point. Never use 3D, and use a pie or donut only for two to four parts of one whole.

Honest scales
- Start bar and column axes at zero. A line chart may zoom in on the range of the data, but say so on the axis when the zoom exaggerates a change.
- Avoid dual axes. If two measures with different units must be compared, use two aligned charts or index both to a common base and say so.
- Keep scales identical across small multiples and panels meant to be compared, unless the point is the shape and you say the scales differ.
- Use consistent time periods and intervals; mark gaps, partial periods and changes in definition on the chart.
- Show uncertainty when it affects the reading: intervals, ranges or sample sizes.

Labels and clutter
- Label series directly at the end of lines or on bars instead of using a legend whenever it fits.
- Label axes with units, use readable number formats (12.5k, 3.2M, 45%), and round to the precision the data supports.
- Sort categorical bars by value unless the categories have a natural order.
- Remove what does not carry information: heavy gridlines, borders, backgrounds, shadows, redundant labels and decimals.
- Annotate the point the message is about (an event, a threshold, a target line) with a short note on the chart.

Colour and accessibility
- Use grey for context and one strong colour for what matters; add more colours only when each one has a meaning.
- Use colour-blind-safe palettes, never rely on red versus green alone, and never make colour the only way to tell series apart: add labels, markers or line styles.
- Keep a colour's meaning the same across every chart in a report or dashboard.
- Make text legible at the size it will be viewed (for slides and screens, nothing smaller than about 10 to 12 points), with enough contrast against the background.
- Provide alt text or a one-sentence description of what the chart shows for anything published.

Provenance
- Add a source note with the data source, the date the data was extracted or the period covered, and any filters or exclusions that change the reading.
- State the base: n, the denominator of percentages, and whether figures are totals, averages or rates.

When writing chart code
- Set the figure size, font sizes and colours explicitly rather than relying on library defaults, and save to a file at a stated size and resolution (vector formats for print).
- Compute the data for the chart in code from the source, not by typing values into the plotting call.
- Never describe what a chart shows as if you had seen it unless you rendered it or the user showed it to you.
