---
schema: 1
id: explain-spreadsheet-formula
kind: prompt
title: Explain a spreadsheet formula
description: Explains a pasted Excel or Google Sheets formula piece by piece in plain words, evaluates it on a worked example row, and lists the inputs where it silently breaks or returns the wrong answer.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [learn, review]
role: [data-analyst, financial-analyst, operations-manager, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [formula-walkthrough, nested-functions, lookup-functions, learn-by-example]
pairs_with:
  prompts: [debug-spreadsheet-formula, simplify-nested-formula, explain-inherited-spreadsheet]
  personas: [spreadsheet-expert]
args:
  - name: formula
    description: The formula exactly as it appears, including the equals sign.
    type: text
    required: true
  - name: context
    description: What the referenced cells or columns hold (headers and two or three sample rows), and which app and version. Optional but makes the example far more accurate.
    type: text
output_contract:
  format: markdown
  sections: [In one sentence, Piece by piece, Worked example, Where it breaks, Plain-language version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain spreadsheet formulas to people who need to understand, trust or maintain one they did not write. A good explanation works from the inside out, in evaluation order, naming what each function returns at each step, not just what the function is called. Things that confuse people most: absolute and relative references (a `$` before the column letter or the row number fixes it, so `$B2` keeps column B when copied across) and what happens when the formula is copied; lookup match modes (an approximate match in `VLOOKUP` or `MATCH` that silently returns the wrong row when data is unsorted); `IFERROR` hiding real errors; implicit intersection and dynamic array spill; text that looks like numbers; dates stored as serial numbers; whole-column references; named ranges and structured table references (`Table1[Amount]`); and functions that differ between Excel and Google Sheets or between Excel versions (`XLOOKUP`, `LET`, `LAMBDA`, `FILTER`, `ARRAYFORMULA`, `QUERY`). Locale matters too: some regions use semicolons as argument separators and commas as decimal points.

<formula>
{{formula}}
</formula>
{{#context}}

<context_data>
{{context}}
</context_data>
{{/context}}
</context>

<task>
1. Say in one sentence what the formula does in business terms (for example "finds the price for this product code and applies the customer's discount").
2. Break it down from the innermost part outwards: for each function or operator, what it does here, what each argument refers to, and what it returns. Explain any `$` anchors, named ranges, table references and array behaviour.
3. Evaluate it on one worked example row, using the sample data if given or a clearly labelled invented example, showing the intermediate value at each step.
4. List where it breaks or misleads: inputs that cause errors, inputs that give a wrong answer without an error (unsorted data with approximate match, blanks treated as zero, text numbers, duplicates in the lookup range, errors swallowed by `IFERROR`), and behaviour when copied or when rows are inserted. Mark each as confirmed from the formula or possible depending on data.
5. Rewrite the logic as plain-language pseudocode a non-expert can check.
6. If the formula would not work in the stated app or version, or uses a locale-specific separator, say so.
</task>

<constraints>
- Explain the formula as written; do not silently change it. If you see a bug, describe it in "Where it breaks" and suggest a fix there.
- Label invented example data as illustrative.
- If a referenced range or name cannot be inferred, say what it probably contains and ask.
- Keep explanations in plain words; define any technical term the first time.
</constraints>

<output_format>
## In one sentence
## Piece by piece
Numbered steps from the inside out, each with the fragment in backticks.
## Worked example
Table: Step | Fragment | Value.
## Where it breaks
Table: Situation | What happens | Confirmed or possible | Fix.
## Plain-language version
</output_format>
