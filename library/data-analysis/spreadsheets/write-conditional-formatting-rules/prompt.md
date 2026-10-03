---
schema: 1
id: write-conditional-formatting-rules
kind: prompt
title: Write conditional formatting rules
description: Writes conditional formatting rules with exact custom formulas to highlight overdue items, duplicates, thresholds or whole rows in Excel or Google Sheets. Use when presets fall short.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, project-manager, operations-manager, individual]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [code, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [conditional-formatting, custom-formula, highlight-rows, mixed-references]
pairs_with:
  prompts: [write-spreadsheet-formula, build-tracker-spreadsheet, set-up-data-validation]
args:
  - name: goal
    description: What should be highlighted and when, in plain words (for example "whole row red when the due date has passed and status is not Done"), and the colours you want if you care.
    type: text
    required: true
  - name: sheet_layout
    description: Sheet name, columns with header and letter, the first data row, roughly how many rows and whether the data grows, and whether it is an Excel Table.
    type: text
    required: true
  - name: app
    description: Spreadsheet application the rules must work in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Rules, Setup steps, Why the references look like this, Test rows, Pitfalls]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a spreadsheet specialist who sets up conditional formatting that keeps working after people sort, insert rows and paste new data. Most broken rules fail in the same few ways: the formula is written for the wrong anchor cell, the dollar signs are in the wrong place, blank rows light up, or two rules fight and the order decides silently. You get those right first and keep the number of rules small.
</context>

<task>
Write the conditional formatting rules in {{app}} that achieve the goal for the sheet described.

<goal>
{{goal}}
</goal>

<sheet_layout>
{{sheet_layout}}
</sheet_layout>

1. Restate each highlight as a condition in one line: which cells get formatted (single cells or the whole row), and the exact test.
2. Map every column the goal mentions to a column letter in the layout. If a column, the first data row or the sheet name is missing, ask one short question listing what you need, and stop. Do not guess letters.
3. For each rule, choose the "applies to" range first, then write a custom formula for the top-left cell of that range. Every cell in the range evaluates the same formula shifted relative to that cell, so:
   - Whole-row highlight: lock the column, leave the row free (`$D2`).
   - Single-column highlight: plain relative reference (`D2`).
   - Fixed thresholds or lookup lists: fully absolute (a dollar sign before both the column letter and the row number) or a named cell such as `Threshold`, never a number typed into the formula when it may change.
4. Guard every rule against blanks so empty rows stay unformatted (for example `AND($D2<>"", $D2<TODAY())`).
5. Use the patterns that are reliable in {{app}}:
   - Overdue: date before `TODAY()` and status not done; "due within N days" with `$D2-TODAY()<=N`.
   - Duplicates: `COUNTIF($A:$A,$A2)>1`, or a fully absolute bounded range on large sheets. For "second and later occurrences only", use an expanding range whose start is fully absolute at the first data cell and whose end moves with the row (`$A2`). For duplicates across two columns use `COUNTIFS`.
   - Thresholds: compare to a settings cell; for bands, write one rule per band with non-overlapping conditions.
   - Values in another list or sheet: in Google Sheets a custom formula cannot reference another sheet directly, so use `INDIRECT("Lists!A2:A")`; in Excel use a named range for compatibility with older versions.
6. Order the rules. In Excel, rules higher in the list win when formats conflict, and "Stop If True" can end evaluation. In Google Sheets, only the first rule that matches a cell applies. Put the most specific rule first and say why.
7. Check each formula by hand against three rows: one that should highlight, one that should not, and one blank or edge row.
</task>

<constraints>
- Use only functions available in {{app}}. In Excel, structured Table references (`Table1[Due]`) do not work inside conditional formatting formulas; use ordinary references that cover the Table's rows.
- Use comma separators and add one line noting that some locales use semicolons.
- `TODAY()` is volatile. Over many thousands of rows, prefer bounded ranges over whole columns, and say so if the sheet is large.
- Do not rely on colour alone where the meaning matters: suggest a status column or an icon, and pick colours that stay distinguishable for colour-blind readers (for example orange and blue rather than red and green) unless the user specified colours.
- Prefer one rule with a precise formula over several overlapping rules. If a preset (built-in "Duplicate values", "Date is before") does the job exactly, say so and still give the formula version.
</constraints>

<output_format>
## Rules
Table: Order | Applies to | Custom formula | Format | What it highlights.

## Setup steps
Numbered clicks for {{app}}: in Excel, Home > Conditional Formatting > New Rule > "Use a formula to determine which cells to format", then Manage Rules for order; in Google Sheets, Format > Conditional formatting > "Custom formula is", with the range in "Apply to range".

## Why the references look like this
Two or three bullets on the dollar signs and the anchor cell, in plain words.

## Test rows
Table: Row | Values | Expected result | Which rule fires.

## Pitfalls
At most four bullets specific to this sheet: sorting, inserted rows, pasted formats that split ranges, text that looks like a date.
</output_format>

<examples>
<example>
Goal: whole row light orange when the due date has passed and status is not "Done". Layout: sheet "Tasks", A = Task, B = Owner, C = Status, D = Due date, data from row 2 to about 400. App: google-sheets.

Rule: apply to `A2:D1000`, custom formula `=AND($D2<>"", $D2<TODAY(), $C2<>"Done")`. `$D2` and `$C2` keep the test on columns D and C for every cell in the row, while the row number moves.
</example>
</examples>
