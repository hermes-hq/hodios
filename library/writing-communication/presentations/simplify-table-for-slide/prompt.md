---
schema: 1
id: simplify-table-for-slide
kind: prompt
title: Simplify a table for a slide
description: Turns a dense spreadsheet table into a readable slide by choosing the rows and columns that carry the point, rounding consistently, ordering and highlighting.
category: presentations
version: 1.0.0
status: incubating
stage: [design, review]
role: [manager, data-analyst, financial-analyst, consultant]
requires: [none]
inputs: [dataset, text]
output: [table, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [data-tables, rounding, slide-text, assertion-evidence, numbers-on-slides]
pairs_with:
  prompts: [rewrite-text-heavy-slide, plan-slide-visuals, proofread-slide-deck]
  personas: [presentation-designer]
args:
  - name: table
    description: The table as pasted from the spreadsheet, with headers and units.
    type: text
    required: true
  - name: point
    description: What the slide should show or the decision it supports, if you know. Optional.
    type: text
  - name: audience
    description: Who sees the slide and whether it is presented live or read. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The point, Slide table, What was removed, Chart alternative, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn spreadsheet tables into slide tables. A table pasted straight from a workbook fails on a slide because the audience has seconds, not minutes: twelve columns of four-decimal figures hide the one comparison that matters. Experts cut a slide table to the rows and columns that prove one point (usually no more than about six rows and five columns), round to two or three significant figures with the same precision in a column, right-align numbers, put units in the header rather than every cell, sort rows by the value that matters rather than alphabetically, and highlight the one row or cell the speaker will talk about. Totals and the comparison column (change, variance, share) often carry the message better than the raw values. Everything removed stays available in an appendix or handout. Sometimes the honest answer is that a chart says it better.

<table>
{{table}}
</table>
{{#point}}Intended point: {{point}}{{/point}}
{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
1. Read the table and state what it can show. If no point was given, propose the most likely one and one alternative, and build for the first.
2. Write an assertion title: a full sentence stating the takeaway, using a number from the table.
3. Choose the rows and columns that prove the point. Group the rest as "Other" only when the total stays correct, or move them to an appendix table.
4. Round consistently within each column and say the rule used. Recompute any derived figure (change, share, total) from the original values, not from rounded ones, and flag where rounded parts no longer add to the rounded total.
5. Order rows by the value that matters, put units and periods in headers, and mark the cells to highlight.
6. If the point is a trend or a ranking across many items, describe the chart that would show it better.
7. List checks for the presenter: any figure that looked inconsistent in the source, any column whose meaning was unclear.
</task>

<constraints>
- Never change a value beyond the stated rounding, and never invent rows, totals or periods.
- Do not hide an inconvenient row that changes the conclusion; if it matters, keep it and say so.
- Keep the source's labels unless a rename is needed for clarity, and show the mapping when you rename.
- If the table has a source or footnote, keep it on the slide.
</constraints>

<output_format>
## The point
The assertion title, plus the alternative point if relevant.

## Slide table
A Markdown table ready for the slide, with highlight marks explained below it, and the source line.

## What was removed
Rows and columns cut or grouped, and where they now live.

## Chart alternative
One short paragraph, or "Not needed".

## Checks
Bullets for the presenter to confirm.
</output_format>
