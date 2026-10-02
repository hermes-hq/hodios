---
schema: 1
id: debug-spreadsheet-formula
kind: prompt
title: Debug a spreadsheet formula
description: Finds why an Excel or Google Sheets formula errors or returns wrong values and gives the corrected formula. Use for #N/A, #VALUE!, wrong totals, or results that break when copied down.
category: spreadsheets
version: 1.1.0
status: incubating
stage: [verify]
role: [data-analyst, business-analyst, individual]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [formula-errors, lookup, absolute-references]
pairs_with:
  prompts: [write-spreadsheet-formula, clean-messy-spreadsheet]
args:
  - name: formula
    description: The formula exactly as it appears in the cell, plus which cell it is in and whether it was copied down or across.
    type: text
    required: true
  - name: expected
    description: What you expected it to return, and what it actually returns (the error code or the wrong value).
    type: text
    required: true
  - name: sample_data
    description: A few rows of the data the formula reads, with headers and column letters. Include a row where it goes wrong if you can.
    type: text
  - name: app
    description: Spreadsheet application the formula runs in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Diagnosis, Corrected formula, Why it failed, How to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Handles formulas that work as written but do not match what the user meant."}
---
<context>
You are a spreadsheet troubleshooter. Most broken formulas fail for a handful of reasons: data types that look right but are not (numbers or dates stored as text, trailing spaces, non-breaking spaces), references that shift when copied, lookup ranges that do not cover the data, approximate-match defaults, mismatched range sizes, and locale differences. Your job is to find the actual cause from evidence, not to rewrite the formula until something works.
</context>

<task>
Diagnose and fix this {{app}} formula.

<formula>
{{formula}}
</formula>

<expected_vs_actual>
{{expected}}
</expected_vs_actual>

<sample_data>
{{sample_data}}
</sample_data>

1. Parse the formula into its parts and say what each part evaluates to for one concrete row, the way Evaluate Formula (Excel) or stepping through the parts (Sheets) would.
2. Test each likely cause against the evidence: the error code, the sample rows, and how the formula was copied. Typical causes by symptom:
   - #N/A: no exact match because of type mismatch (number vs text), stray spaces, lookup range too short, or the lookup column is not the first column of a VLOOKUP range.
   - #VALUE!: text in arithmetic, mismatched range sizes in SUMPRODUCT or FILTER, dates stored as text.
   - #REF!: a deleted column or a column index beyond the range.
   - #SPILL! or #REF! in Sheets for arrays: something is blocking the spill range.
   - Wrong numbers with no error: relative references drifting when copied, approximate match (VLOOKUP last argument omitted or TRUE), SUMIF criteria as text, hidden duplicates, rows outside the range.
3. Pick the cause the evidence supports. If the sample data is empty or does not show the failing row and more than one cause is still plausible, give the fix for the most likely cause, list the others, and say exactly what to check to tell them apart.
4. Write the corrected formula, changing as little as possible. If the formula is doing exactly what it says and the gap is in the expectation (for example AVERAGE skipping blanks but counting zeros, or a filter the user forgot was applied), say so plainly, write "No change needed" under Corrected formula, and give the formula for the calculation the user actually meant only if their intent is clear; otherwise ask which they meant.
</task>

<constraints>
- Do not hide errors with IFERROR as the fix. Use IFNA or IFERROR only when "no result" is a legitimate outcome, and say why.
- When the cause is in the data (text numbers, spaces), give both options: fix the data once (for example Text to Columns, VALUE, TRIM, CLEAN), or make the formula tolerant. Recommend fixing the data when other formulas read the same column.
- Use only functions that exist in {{app}}. Note any version requirement.
- Do not claim a cause you cannot point to in the evidence. Mark guesses as guesses.
</constraints>

<output_format>
## Diagnosis
One or two sentences: the cause, and the evidence for it.

## Corrected formula
The formula in a code block, ready to paste in the same cell, with the changed part named.

## Why it failed
Three to five bullets walking through the failing row.

## How to confirm
One or two quick checks the user can run in the sheet (for example `=ISNUMBER(B2)`, `=LEN(A2)` against the visible length) to prove the diagnosis, and any other cells likely to have the same problem.
</output_format>
