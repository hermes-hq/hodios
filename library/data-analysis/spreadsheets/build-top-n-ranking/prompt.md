---
schema: 1
id: build-top-n-ranking
kind: prompt
title: Build a top-N ranking
description: Builds a ranked top-N list overall or per group that updates automatically and handles ties honestly, using RANK, SORTBY, SORTN, LARGE or FILTER for your Excel or Sheets version.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, sales-rep, teacher]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: intermediate
tags: [top-n, ranking, ties, leaderboard, dynamic-arrays]
pairs_with:
  prompts: [write-spreadsheet-formula, build-sheets-dashboard, build-pivot-analysis]
args:
  - name: data_layout
    description: The sheet, the columns (name or item, the value to rank by, any group such as region or class), whether the data has one row per item or needs totalling first, and a few sample rows.
    type: text
    required: true
  - name: ranking_wanted
    description: What to show - top 5 overall, top 3 per region, bottom 10 - which columns to show, highest or lowest first, and how ties should behave if you know.
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365, Excel 2016, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Tie rule, Formulas, Test with ties, Older version fallback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build leaderboards and top-N tables that update themselves. The classic approach, LARGE(values,k) with INDEX/MATCH to fetch the name, returns the same name twice when two items tie, which is the most common bug in top-10 sheets. Experts decide the tie rule first: show exactly N rows and break ties by a second column; show every item tied at the cut-off (so "top 5" may have 6 rows); or use dense ranks. They also total first when there are several rows per item, because ranking raw transactions ranks rows, not items. In Excel 365, SORTBY with TAKE, or FILTER on values greater than or equal to LARGE(values,N), handle ties cleanly. Google Sheets has SORTN, whose third argument controls ties (0 exactly N rows, 1 include all ties at the cut-off, 2 and 3 for duplicates). RANK.EQ gives competition ranks (1, 2, 2, 4); a dense rank (1, 2, 2, 3) needs a COUNTIFS or UNIQUE-based formula.

App: {{app}}

<data_layout>
{{data_layout}}
</data_layout>

<ranking_wanted>
{{ranking_wanted}}
</ranking_wanted>
</context>

<task>
1. Decide the tie rule. If the user did not state one, choose "include everyone tied at the cut-off" for recognition lists and "exactly N, ties broken by a named second column" for fixed-size layouts such as dashboards, and say which you chose and why.
2. If items appear on several rows, total them first (SUMIFS on a UNIQUE list, GROUPBY in current Microsoft 365, or QUERY group by in Google Sheets) and rank the totals.
3. Write the formula for the top-N list with the requested columns, highest or lowest first. Put N in a cell so it can be changed.
4. For per-group rankings, write one formula per group block, or one formula using a group cell, or a rank-within-group column (COUNTIFS of same group with a larger value, plus 1) that can be filtered.
5. Exclude blanks, zeros or errors from the ranking when they should not compete, and say so.
6. Test with a small set that includes a tie at the cut-off, a tie above it, a blank and a group with fewer than N items. Show the output rows expected.
</task>

<constraints>
- Never use LARGE plus MATCH alone to fetch names when ties are possible; if the user's app forces that approach, add a tie-breaker (for example a tiny row-based offset in a helper column) and explain it.
- Use only functions available in {{app}}: SORTBY and FILTER need Microsoft 365, Excel 2021 or later; TAKE needs Microsoft 365 or Excel 2024; SORTN is Google Sheets only. Give an older Excel fallback where needed.
- Use English-locale commas and note that some locales use semicolons.
- Do not hide the tie rule; state it in a note beside the table so readers know why there are six names in a top five.
</constraints>

<output_format>
## Tie rule
One or two lines.

## Formulas
Each formula with its target cell in a code block, including any totalling or rank-within-group column.

## Test with ties
Table: input rows, then the expected top-N output.

## Older version fallback
A helper-column approach for older Excel, or "Not needed".
</output_format>
