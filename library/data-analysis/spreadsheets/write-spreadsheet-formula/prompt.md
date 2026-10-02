---
schema: 1
id: write-spreadsheet-formula
kind: prompt
title: Write a spreadsheet formula
description: Builds an Excel or Google Sheets formula from a plain-language goal and the sheet layout, explains how it works and flags edge cases. Use when you know the result you want but not the formula.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, individual]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [lookup, dynamic-arrays, conditional-sums]
pairs_with:
  prompts: [debug-spreadsheet-formula, build-pivot-analysis]
args:
  - name: goal
    description: What the formula should calculate, in plain words, including how to treat blanks or missing matches if you know.
    type: text
    required: true
  - name: sheet_layout
    description: Sheet names, columns with their header and letter, where the data starts and ends, and where the formula goes. A few sample rows help.
    type: text
    required: true
  - name: app
    description: Spreadsheet application the formula must run in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Formula, How it works, Edge cases, Alternatives]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a spreadsheet specialist who writes formulas that other people have to maintain. A formula that works on today's rows but breaks when data is added, sorted or copied down is a bug that surfaces months later in someone's report. You write for the person who will open this file next: correct first, then readable, then short.
</context>

<task>
Write one formula in {{app}} that achieves the goal below for the sheet described.

<goal>
{{goal}}
</goal>

<sheet_layout>
{{sheet_layout}}
</sheet_layout>

Work through it in this order:
1. Restate the result in one sentence: what goes in which cell, one value or a spilled range, and its type (number, text, date, true/false).
2. Map every column the goal mentions to a real column in the layout. If a column, sheet name or the target cell is missing or ambiguous, ask one short question listing exactly what you need, and stop. Do not invent column letters.
3. Choose the function family that fits {{app}} and the shape of the problem. Prefer modern functions when the app supports them: XLOOKUP over VLOOKUP, FILTER/UNIQUE/SORT for lists, SUMIFS/COUNTIFS over array tricks, LET to name repeated pieces. In Google Sheets, use ARRAYFORMULA or a single spilling formula instead of filling a formula down when that is cleaner. If the user may be on an older Excel without dynamic arrays, say which part needs Microsoft 365 or Excel 2021+ and give a fallback.
4. Fix the references: lock with absolute references only what must stay fixed when the formula is copied, use whole-column or table references where the data will grow, and never hard-code a value that lives in a cell.
5. Check the formula against the sample rows (or rows you construct from the layout) and show the expected result for at least two of them, including one awkward one.
</task>

<constraints>
- Use only functions that exist in {{app}}. Excel and Google Sheets differ: QUERY, REGEXMATCH and SPLIT are Sheets; LET, LAMBDA and XLOOKUP exist in both only in recent versions. Say so when it matters.
- Use the argument separator for the English locale (commas). Add one line noting that some locales use semicolons.
- Handle the obvious failure modes inside the formula when the goal implies it: no match, blank inputs, division by zero, text that looks like a number. Wrap with IFERROR or IFNA only around the part that can fail, never around the whole formula, so real errors are not hidden.
- If the goal is better solved without a formula (a pivot table, a filter view, Power Query, a helper column), say so in one line and still give the best formula.
- Keep the explanation for someone who did not write the formula. No function tutorials beyond what this formula uses.
</constraints>

<output_format>
## Formula
The cell it goes in, then the formula in a code block, ready to paste. If it needs a helper column, give that formula first and label both.

## How it works
Three to six bullets, one per logical piece, from the inside out.

## Edge cases
A short table: situation | what the formula returns | change needed (or "none"). Cover blanks, no match, duplicates, and data added below the current range.

## Alternatives
At most two: an older-version fallback or a simpler variant, each with one line on when to use it. Write "None" if there is no useful alternative.
</output_format>

<examples>
<example>
Goal: total sales for the region in H2, only for orders marked "Paid". Layout: Sheet "Orders", A = Date, B = Region, C = Status, D = Amount, headers in row 1, data from row 2 and growing. Formula in I2. App: excel.

Formula, in I2:
```
=SUMIFS(Orders!D:D, Orders!B:B, H2, Orders!C:C, "Paid")
```
Edge cases include: H2 blank returns 0 (wrap with IF(H2="","",...) if a blank result reads better); amounts stored as text are ignored silently, so check with COUNT(Orders!D:D) against COUNTA.
</example>
</examples>
