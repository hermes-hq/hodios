---
schema: 1
id: export-chart-for-print-and-web
kind: prompt
title: Export a chart for print and web
description: "Sets chart export settings per destination (slides, web, print, journal): vector or raster, DPI and pixel size, fonts and colour. Use when exported charts look blurry or wrong."
category: data-visualization
version: 1.0.0
status: incubating
stage: [ship]
role: [data-analyst, researcher, designer, data-scientist]
inputs: [text, file]
output: [plan, code, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [image-export, dpi, svg, print-ready]
pairs_with:
  prompts: [lay-out-multi-panel-figure, design-scientific-figures, create-chart-style-guide]
  rules: [chart-design-rules]
args:
  - name: chart_source
    description: "How the chart is made (matplotlib, ggplot2, plotly, Excel, Power BI, Tableau, Datawrapper, Figma) and the current export code or steps."
    type: text
    required: true
  - name: destinations
    description: "Where the chart will be used: slides, web page, email, printed report, journal submission (with its stated requirements), social post. Include known sizes or rules."
    type: text
    required: true
  - name: problem
    description: "What is going wrong now, if anything (blurry on slides, huge PDF, fonts replaced, colours dull in print)."
    type: text
output_contract:
  format: markdown
  sections: [Settings per destination, Export code or steps, Fonts and colour, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You fix chart exports. The rules are simple and widely misunderstood. Vector formats (SVG, PDF, EPS) stay sharp at any size and suit line charts, bars and text; they get heavy with tens of thousands of points, where a raster (PNG) or rasterising only the point layer is better. DPI only means something together with a physical size: a 3.5 inch wide figure at 300 DPI is 1050 pixels; screens care about pixels, so for slides and web export at the pixel size of the placement (times two for high-density screens). JPEG blurs text and lines; use PNG for raster charts. Fonts change when the receiving machine lacks them, so embed fonts in PDF (matplotlib pdf.fonttype 42 keeps them editable) or convert text in SVG only when editing is not needed. Journals state widths, minimum DPI (often 300 for halftones, 600 to 1200 for line art), accepted formats and fonts: their rules win. Colours look duller in CMYK print than on screen; use the print provider's profile when it matters.
</context>

<task>
Set export settings for this chart.

<chart_source>
{{chart_source}}
</chart_source>

<destinations>
{{destinations}}
</destinations>

{{#problem}}
<problem>
{{problem}}
</problem>
{{/problem}}

1. If there is a problem, name its likely cause first (for example exporting at screen size then stretching, JPEG compression, missing fonts, a figure built small and scaled up).
2. For each destination, set format, physical size or pixel size, DPI where relevant, transparency, and file-size expectation. Build the figure at its final size so fonts stay legible, and state the font size range that holds at that size.
3. Give export code or app steps for the source tool (for example fig.savefig with dpi, bbox_inches and format; ggsave with width, height, units and dpi; plotly write_image with width, height and scale; Excel or PowerPoint copy as picture versus save as SVG; Power BI and Tableau export options and their limits).
4. Cover fonts and colour: font embedding, fallback fonts, colour profile for print, and checking that colours still distinguish series in greyscale if the report may be printed in black and white.
5. Give checks to run before sending: open at 100% on the target, zoom to 200%, check file size, check fonts in the PDF, compare colours on paper if printed.
</task>

<constraints>
- When a journal or publisher states requirements, follow them over general advice and say so.
- Do not recommend JPEG for charts with text or lines.
- Do not quote destination-specific pixel sizes as official unless the user gave them; label them as common practice.
</constraints>

<output_format>
## Settings per destination
Table: Destination | Format | Size | DPI or scale | Notes.

## Export code or steps
One code block or numbered steps per tool.

## Fonts and colour
Bullets.

## Checks
Checklist.
</output_format>
