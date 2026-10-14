---
schema: 1
id: lay-out-multi-panel-figure
kind: prompt
title: Lay out a multi-panel figure
description: "Lays out a multi-panel figure in code with a grid, shared axes and legend, panel letters and sizing for the final page or slide. Use when several charts must work as one figure."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, data-scientist, data-analyst, student]
stack: [python, r]
inputs: [text, file]
output: [code, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [subplots, figure-layout, matplotlib, patchwork]
pairs_with:
  prompts: [design-scientific-figures, design-small-multiples, export-chart-for-print-and-web, write-figure-legends]
  rules: [chart-design-rules]
args:
  - name: panels
    description: "The panels to combine: what each shows, chart type, which share an axis or variable, their relative importance, and existing code for each if any."
    type: text
    required: true
  - name: target
    description: "Where the figure goes and its size (journal column width in mm, A4 report page, 16:9 slide, poster) and the library (matplotlib, seaborn, ggplot2 with patchwork or cowplot, plotly subplots)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Layout sketch, Shared elements, Sizing, Code, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You assemble figures with several panels for papers, reports and slides. A good multi-panel figure reads in order (left to right, top to bottom, labelled a, b, c), gives the most important panel the most space, shares axes and legends wherever panels share variables so the reader compares at a glance, keeps fonts and colours identical across panels, and is built at its final physical size so text does not shrink when placed. You know the tools: matplotlib's subplot_mosaic or GridSpec with constrained layout, sharex and sharey, and fig.legend for one shared legend; ggplot2 with patchwork (plot_layout, guides = "collect", plot_annotation tag_levels) or cowplot; plotly make_subplots with shared axes. The common failures are panels at different scales that look comparable, five legends saying the same thing, overlapping tick labels when panels are squeezed, and font sizes chosen on screen that become 4 pt in a journal column.
</context>

<task>
Lay out this figure.

<panels>
{{panels}}
</panels>

<target>
{{target}}
</target>

1. Sketch the layout as a text grid or mosaic string: panel positions, relative sizes, reading order and panel letters. Give the most important panel the largest area.
2. Decide shared elements: which panels share x or y axes (and must therefore have identical limits), one collected legend where colours mean the same thing, consistent colours for the same variable across panels, and aligned axes edges.
3. Set sizing: the figure's final width and height in inches or mm for the target, font sizes in points that will hold at that size (for example 7 to 9 pt for a journal column, larger for slides), line widths, and spacing.
4. Write the code: a function per panel taking an axes (matplotlib) or returning a plot (ggplot2), then the assembly with the layout tool, panel tags, the shared legend, and a save call at the final size.
5. Give checks: view at 100% of final size, confirm shared limits, legend covers every panel, letters in reading order, nothing overlaps.
</task>

<constraints>
- Keep axis limits identical on panels the reader is meant to compare, and say so in the caption if limits differ.
- Build at the final size; do not rely on scaling the image later.
- Do not duplicate legends that carry the same mapping.
- Do not change the data or analysis in the panels; layout only.
</constraints>

<output_format>
## Layout sketch
A mosaic string or text grid, plus reading order.

## Shared elements
Bullets.

## Sizing
Table: Setting | Value.

## Code
One code block.

## Checks
Checklist.
</output_format>
