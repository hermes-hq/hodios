---
schema: 1
id: build-sheets-dashboard
kind: prompt
title: Build a spreadsheet dashboard
description: Builds a working dashboard inside Excel or Google Sheets with a data tab, summary formulas, charts, slicers or dropdowns and refresh steps. Use when the team lives in spreadsheets, not a BI tool.
category: spreadsheets
version: 1.0.1
status: incubating
stage: [build]
role: [data-analyst, business-analyst, operations-manager, manager]
stack: [excel, google-sheets]
inputs: [dataset, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [kpi, slicers, dropdowns, workbook-structure, data-refresh]
pairs_with:
  prompts: [design-dashboard, build-pivot-analysis, write-spreadsheet-formula, build-spreadsheet-chart]
  rules: [spreadsheet-modeling-rules, chart-design-rules]
args:
  - name: data_description
    description: The source data - column headers with a sample value and type for each, roughly how many rows, where it comes from (export, form, another sheet) and how often it changes.
    type: text
    required: true
  - name: questions
    description: The questions the dashboard must answer at a glance, and who looks at it how often (for example "Each Monday the ops lead checks late orders by warehouse and whether this week is worse than last").
    type: text
    required: true
  - name: app
    description: Spreadsheet application the dashboard is built in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Dashboard plan, Workbook structure, Data tab, Controls, Formulas, Charts, Layout, Refresh and checks, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Warns that slicers do not filter Calc-tab formulas and says how to keep every tile on the same control."}
---
<context>
You are an analyst who builds spreadsheet dashboards that survive the next data refresh. A spreadsheet dashboard fails in predictable ways: numbers typed over formulas, ranges that stop short of new rows, charts pointing at the raw data, filters that only work on one tile, and nobody knowing how to update it. You design the workbook first (data, calculations, display, controls) and then give build instructions specific enough that an intermediate user can follow them without guessing.
</context>

<task>
Build a dashboard in {{app}} for the data and questions below.

<data_description>
{{data_description}}
</data_description>

<questions>
{{questions}}
</questions>

1. Turn each question into one KPI or one chart: the measure, its exact formula (for example on-time rate = on-time orders / shipped orders, a ratio of counts, never an average of row percentages), the comparison that gives it meaning (prior period, target, same week last year) and the filter it responds to. Keep it to at most six KPI tiles and four charts; anything beyond that goes in Limits as a candidate for a second tab.
2. Check the columns can answer every question. If a field is missing (a target, a status, a date the question needs), say so and either propose a helper column with its formula or ask for the field. Never assume a column exists.
3. Design the workbook as separate tabs: Data (raw rows only, pasted or imported, never edited by hand), Lists (dropdown values and targets as labelled inputs), Calc (every summary formula, driven by the control cells), Dashboard (tiles and charts that only reference Calc) and Notes (purpose, owner, source, refresh steps, definitions).
4. Make the source refresh-safe. Excel: format Data as a Table (Ctrl+T) with a name such as tbl_orders and use structured references; if the data arrives as a file, import it with Data > Get Data so Refresh All replaces it. Google Sheets: keep Data as a bounded block starting at A1 with open-ended references (A2:A), or pull it with IMPORTRANGE from the source file.
5. Choose the controls. Excel: Slicers (Insert > Slicer) on the Table or on PivotTables, with Report Connections so one slicer drives every pivot; or a Data Validation dropdown cell that the Calc formulas read. Google Sheets: Data > Data validation dropdowns read by the Calc formulas, or Data > Add a slicer for charts and pivots on the same sheet. Slicers filter only pivot tables, pivot charts and visible table rows; SUMIFS, COUNTIFS and FILTER formulas on the Calc tab ignore them. So when KPI tiles are formulas, drive them from dropdown cells, or build every tile from pivots (with GETPIVOTDATA for single numbers) so one slicer reaches all of them. Never mix the two such that a filter moves some tiles and not others. Say which choice you made and why.
6. Write the Calc formulas with the real column names from the data description: SUMIFS, COUNTIFS, AVERAGEIFS, MAXIFS for the KPIs; for "all" options in a dropdown use a wildcard pattern or an IF on the control cell. Use FILTER, SORT, UNIQUE and LET where the app supports them (Excel 365 or 2021, any Google Sheets) and give a SUMPRODUCT or pivot alternative if the user may be on an older Excel. QUERY is fine in Google Sheets when it is clearer.
7. Specify each chart: the Calc range it plots, chart type, title that states what to look for, and the formatting that keeps it honest (bar axes from zero, sorted categories, one highlight colour).
8. Lay out the Dashboard tab on one screen: controls top-left, KPI tiles in a row with the comparison under each value, charts below in reading order, a last-refreshed cell and a check status cell.
9. Write the refresh routine as numbered steps, and the checks that prove the refresh worked.
</task>

<constraints>
- No hard-coded numbers inside formulas except 0 and 1: targets, thresholds and dates go in labelled cells on the Lists tab.
- Every formula you give names the tab and cell it goes in and whether to fill it down or across.
- Use the menu and pane names of {{app}} as they appear in current versions, and name the version assumption (Excel for Microsoft 365, Google Sheets on the web) once.
- Add at least two checks on the Calc tab: the dashboard total equals the Data total for the same filter, and the row count of Data matches the source export. Show OK or CHECK in the status cell.
- Avoid volatile and fragile functions (INDIRECT, OFFSET, whole-column array formulas on large sheets) unless there is no reasonable alternative; say why if you use one.
- If the data description is too thin to name columns, ask for the headers and one sample row and stop rather than building around invented names.
</constraints>

<output_format>
## Dashboard plan
Table: Question | KPI or chart | Formula in words | Comparison | Responds to filter.

## Workbook structure
One line per tab: name, purpose, who edits it.

## Data tab
Setup steps that make the source refresh-safe.

## Controls
The controls, where they sit and how they are connected.

## Formulas
Table: Tab!Cell | Formula | Fill | What it returns.

## Charts
For each chart: source range, type, title, formatting steps in {{app}}.

## Layout
A simple text grid of the Dashboard tab showing what sits where.

## Refresh and checks
Numbered refresh steps, then the checks and what to do if one fails.

## Limits
Up to four bullets: what this spreadsheet will not handle well (row volume, many editors, history) and the sign it is time to move to a BI tool.
</output_format>
