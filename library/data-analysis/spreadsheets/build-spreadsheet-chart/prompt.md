---
schema: 1
id: build-spreadsheet-chart
kind: prompt
title: Build a chart in a spreadsheet
description: Gives exact click-by-click steps to lay out data for, build and format a chart in Excel or Google Sheets that carries one message. Use when you know the point and need the chart built right.
category: spreadsheets
version: 1.0.1
status: incubating
stage: [build]
role: [data-analyst, business-analyst, manager, individual]
stack: [excel, google-sheets]
inputs: [dataset, text]
output: [checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [chart-formatting, action-titles, step-by-step]
pairs_with:
  prompts: [choose-chart-type, critique-chart, choose-chart-colors]
  rules: [chart-design-rules]
args:
  - name: data_layout
    description: How the data sits in the sheet now - the cell range, header row, what each column holds, a few sample rows, and how many categories or periods there are.
    type: text
    required: true
  - name: message
    description: The one point the chart must make (for example "Returns in the North region doubled after the carrier change in June").
    type: string
    required: true
  - name: app
    description: Spreadsheet application the chart is built in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Chart choice, Data layout, Build steps, Formatting steps, Check before sharing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Pie rule aligned with the chart design rules (two to four parts)."}
---
<context>
You build charts in spreadsheets for people who are not chart specialists. Most spreadsheet charts go wrong before the first click: the data is laid out the wrong way round, so the app guesses the series wrongly, and the defaults (legend far from the lines, rainbow colours, a vague title) bury the point. You fix the layout first, pick the chart that carries the message, and give steps a beginner can follow without hunting for menus.
</context>

<task>
Build a chart in {{app}} that makes this point:

<message>
{{message}}
</message>

The data as it sits now:

<data_layout>
{{data_layout}}
</data_layout>

1. Pick the chart type that carries the message: a line for change over time, a sorted bar for comparing categories, a stacked or 100% bar only when the parts-of-a-whole is the point, a scatter for a relationship, a column with a highlighted bar for one standout. Name the runner-up and why you did not pick it in one line.
2. Decide the exact data range the chart needs. If the current layout does not suit the chart (series in rows instead of columns, totals mixed into the data, dates stored as text, too many categories), give a small helper range: where to put it, its headers, and the formulas that fill it from the original data, so the chart updates when the data does.
3. Write the build steps for {{app}} with its real menu names. Excel: select the range, Insert > the chart group, Chart Design > Select Data or Switch Row/Column, the Chart Elements (+) button, and the Format pane (Ctrl+1 on any element). Google Sheets: Insert > Chart, then the Chart editor's Setup tab (Chart type, Data range, X-axis, Series, Switch rows/columns, Use row 1 as headers) and Customize tab (Chart & axis titles, Series, Legend, Horizontal and Vertical axis, Gridlines and ticks).
4. Write the formatting steps that make the message obvious: a title that states the message in words, the series or bar that matters in a strong colour and the rest in grey, direct data labels instead of a legend where possible, axis titles with units, lighter or no gridlines, sorted bars, and an annotation (a text box or data label) on the point the message refers to.
5. List the checks to do before sharing.
</task>

<constraints>
- Bars and columns start at zero. If the message needs a zoomed axis, use a line chart and say so on the axis.
- No 3D effects, a pie or donut only for two to four parts of one whole, no dual axes unless both series share a unit; if the message seems to need two units, propose two aligned charts instead.
- One click or action per step, naming the button or menu exactly. Where menus differ between versions, name the version you assume (Excel for Microsoft 365, Google Sheets on the web) once.
- Use colours that work for colour-blind readers (for example a dark blue highlight against grey) and never make colour the only way to tell series apart.
- If the data cannot support the message (for example it has no June data, or no region column), say so plainly, suggest the closest honest message, and do not build a chart that implies the claim.
- If the layout description is too vague to name a range, ask for the headers and three sample rows and stop.
</constraints>

<output_format>
## Chart choice
The chart type, why it carries the message, the runner-up.

## Data layout
The exact range to chart, as a small Markdown table showing headers and two sample rows. If a helper range is needed: where it goes and its formulas.

## Build steps
Numbered steps in {{app}}.

## Formatting steps
Numbered steps, ending with the final title text in quotes.

## Check before sharing
Four to six checkboxes: axis start, labels and units, the highlighted point matches the message, source and date note, colour-blind check, the chart updates when a new row is added.
</output_format>
