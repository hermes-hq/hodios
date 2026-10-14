---
schema: 1
id: make-report-accessible
kind: prompt
title: Make a data report accessible
description: Reworks a data report or deck so screen reader, low-vision and colour-blind readers get the same findings, with alt text that states the message, accessible tables, colour fixes and reading order.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, business-analyst, researcher, technical-writer]
inputs: [document, text]
output: [checklist, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [inclusive-reports, alt-text, screen-reader, colour-blind, accessible-tables]
pairs_with:
  prompts: [critique-chart, choose-chart-colors, check-report-figures]
args:
  - name: report
    description: "The report content: text, tables, and for each chart its type, the data or values shown, colours used and current caption or alt text."
    type: text
    required: true
  - name: format
    description: The format the report is published in.
    type: enum
    enum: [word, pdf, slides, web-page, email, dashboard]
    default: pdf
output_contract:
  format: markdown
  sections: [Summary, Chart alternatives, Table fixes, Colour and contrast, Structure and reading order, Format-specific steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Data reports are often the least accessible documents an organisation publishes, because the meaning lives in charts. Alt text such as "bar chart of sales by region" tells a screen reader user nothing; useful alt text states the chart's message and the key values in one or two sentences, with the full data available in a table nearby. Tables need real header rows, no merged cells used for layout, and units in headers rather than in every cell. Colour alone must never carry meaning (red and green status, line series told apart only by hue), and text and chart elements need enough contrast against their background. Headings must be real headings so readers can navigate, reading order in PDFs and slides must follow the logic of the page, and abbreviations should be expanded on first use. Accessibility standards such as WCAG set the testable criteria; organisations may have legal duties that vary by country, which this prompt does not assess.

Format: {{format}}
</context>

<task>
<report>
{{report}}
</report>

1. For each chart: write alt text of one or two sentences stating the message and key numbers, a longer description where the chart is complex, and say whether a data table should accompany it.
2. For each table: check header rows and columns, merged cells, empty cells, units, and whether it is a data table or a layout table; give the fix.
3. Check colour use: anything conveyed by colour alone, series that rely on red versus green, and likely low-contrast text or lines; propose fixes such as direct labels, patterns, shapes or a different palette.
4. Check structure: heading levels, link text, lists, abbreviations, reading order, and text inside images.
5. Give the steps to apply the fixes in the chosen format (for example tagging and reading order in a PDF, slide titles and reading order in slides).
6. List what must be tested with a real checker or assistive technology, since this review cannot confirm it.
</task>

<constraints>
- Alt text must state the finding, not describe the chart type alone, and must use only values present in the report.
- Do not claim the report meets any standard or legal requirement; list what to test.
- Keep fixes practical for the stated format.
- Where contrast cannot be measured from the description, say so and name what to measure.
</constraints>

<output_format>
## Summary
The three changes that help most.

## Chart alternatives
For each chart: alt text, long description if needed, data table yes or no.

## Table fixes
Table: Table | Problem | Fix.

## Colour and contrast
Bullets.

## Structure and reading order
Bullets.

## Format-specific steps
Numbered steps, then a short list of what to test with a checker or screen reader.
</output_format>
