---
schema: 1
id: simplify-nested-formula
kind: prompt
title: Simplify a long nested formula
description: Rewrites a working but unreadable nested IF or copy-pasted formula into LET, IFS, SWITCH or a lookup table, with test rows proving the new version returns identical results.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-analyst, business-analyst, financial-analyst, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [refactor-formula, nested-if, let-function, lookup-table, equivalence-test]
pairs_with:
  prompts: [debug-spreadsheet-formula, write-lambda-function, explain-inherited-spreadsheet]
  personas: [spreadsheet-expert]
args:
  - name: formula
    description: The formula as it is now, pasted exactly, with the cell it lives in.
    type: text
    required: true
  - name: context
    description: What the formula is meant to do, what the referenced cells hold, and a few rows of real inputs with the results the current formula gives.
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365, Excel 2019, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the formula does now, Suspected bugs, Rewritten formula, Equivalence test, How to swap it in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You refactor spreadsheet formulas the way a careful engineer refactors code: first understand exactly what the current formula returns in every case, then make it readable, then prove the new one gives the same answers. Long nested IFs usually hide three things: thresholds or codes hard-coded in the formula that belong in a table, the same sub-expression repeated several times, and an unintended gap or overlap between conditions (a value equal to a boundary, a blank, text where a number was expected). A rewrite that "cleans up" those gaps silently changes results, so you report them separately and let the user decide.

App: {{app}}

<formula>
{{formula}}
</formula>

<context_and_rows>
{{context}}
</context_and_rows>
</context>

<task>
1. Translate the current formula into a plain decision list: each condition in evaluation order and what it returns, including the final fallback. Note what happens for blanks, text, errors and exact boundary values.
2. List suspected bugs separately: unreachable branches, overlapping or missing ranges, a comparison against a number stored as text, a fallback that hides errors. Do not fix them inside the equivalent rewrite.
3. Choose the rewrite that fits {{app}} and the shape of the logic:
   - Thresholds or code mappings: a small lookup table on the sheet with XLOOKUP (approximate match with match_mode -1 on sorted lower bounds) or VLOOKUP with TRUE in older Excel.
   - Ordered conditions: IFS, ending with `TRUE, fallback` because IFS has no default; or SWITCH for exact values.
   - Repeated sub-expressions: LET with descriptive names.
   - The same formula repeated across many cells with small changes: one formula with locked references, or a LAMBDA if the app supports it.
4. Write the rewritten formula, laid out on several lines with line breaks (Alt+Enter in Excel, Ctrl+Enter in Google Sheets) when it is long, and the lookup table if any, with its location.
5. Build an equivalence test: at least eight test inputs covering each branch, each boundary value on both sides, a blank and a text value. Show old result and new result for each. Then give a check column formula (`=old_cell=new_cell`, with an error-safe comparison) and a COUNTIF to count mismatches across the real data.
6. If a bug from step 2 should be fixed, give the fixed version as a separate, clearly labelled formula after the equivalent one.
</task>

<constraints>
- The main rewrite must return exactly what the old formula returns for every input, including odd ones. Any intentional change goes in a separate version.
- Use only functions that exist in {{app}}: LET and XLOOKUP need Excel 2021 or Microsoft 365; IFS and SWITCH need Excel 2019 or later; Google Sheets supports all of these plus LAMBDA. Give a fallback for older Excel if needed.
- Do not claim a test result you have not worked through.
- Keep numbers that business people change (rates, thresholds) in cells or a table, not inside the formula.
- Use English-locale commas and note that some locales use semicolons.
</constraints>

<output_format>
## What the formula does now
Numbered decision list.

## Suspected bugs
Bullets, or "None found".

## Rewritten formula
Code block, plus the lookup table if used.

## Equivalence test
Table: input | old result | new result | match. Then the check formulas.

## How to swap it in
Three to five steps: keep the old column, add the new one, run the check, replace, delete the check.
</output_format>
