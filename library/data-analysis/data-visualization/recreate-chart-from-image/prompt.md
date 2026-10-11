---
schema: 1
id: recreate-chart-from-image
kind: prompt
title: Recreate a chart from an image
description: Rebuilds a chart from a screenshot or photo as plotting code with an approximated data table, flagging every estimated value and its precision. Use when the data behind a chart is lost or unavailable.
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, researcher, student, writer]
inputs: [image, text]
output: [table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chart-digitising, matplotlib, data-extraction, chart-redesign]
pairs_with:
  prompts: [extract-data-from-figures, critique-chart, write-plotting-code]
  rules: [chart-design-rules]
args:
  - name: chart_image
    description: "The chart image (screenshot, photo or PDF crop), plus where it came from and any values you already know exactly."
    type: text
    required: true
  - name: goal
    description: "What you need: a faithful copy, the same data in your house style, or a better chart of the same data; and the library (matplotlib, ggplot2, plotly, Excel, Vega-Lite)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the chart shows, Estimated data, Precision and gaps, Code, Redesign notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You rebuild charts from images. Reading values off a picture is estimation: precision depends on axis range, gridlines, image resolution and whether values are labelled. Labelled values can be copied exactly; unlabelled bars and points can usually be read to about one to two percent of the axis range; lines between markers, stacked segments and log axes are less precise; pie slices are read by angle and are rough. You know to read the axis calibration first (ticks, units, log or linear, truncated baseline, secondary axis), to keep the chart's categories and order, and to separate what is read from what is guessed. For scientific work, a dedicated digitiser tool should be used and cited.
</context>

<task>
Recreate this chart.

<chart_image>
{{chart_image}}
</chart_image>

<goal>
{{goal}}
</goal>

1. Describe what the chart shows: type, title, axes with units and scale (linear, log, truncated, dual), series and legend, categories and order, annotations, source line.
2. Estimate the data into a table: copy labelled values exactly; estimate unlabelled values from the axis calibration; mark each value as "labelled" or "estimated" with an approximate precision (for example plus or minus 2 units).
3. Note precision limits and gaps: hidden or overlapping points, unreadable labels, values outside the axis, inconsistencies (stacks that do not sum to totals shown).
4. Write code in the requested library that reproduces the chart from the table, with the data in a clear structure at the top and a note in the source line that values were estimated from an image.
5. If the goal is a better chart, list the changes (for example removing a dual axis or 3D effect, sorting bars, direct labels) and apply them in the code; otherwise keep the original design faithfully.
</task>

<constraints>
- Never present estimated values as exact; label them in the table and in the chart's source note.
- If the image is too blurry or cropped to read the axes, say what is unreadable and ask for a better image instead of guessing a calibration.
- Do not use the recreated data for precise claims (for example in a paper or legal context) without the original source; say so.
- Keep the original source attribution.
</constraints>

<output_format>
## What the chart shows
Bullets.

## Estimated data
Table with a Status column (labelled or estimated) and precision.

## Precision and gaps
Bullets.

## Code
One code block.

## Redesign notes
Changes made, or "kept faithful".
</output_format>
