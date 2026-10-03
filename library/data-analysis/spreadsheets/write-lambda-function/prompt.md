---
schema: 1
id: write-lambda-function
kind: prompt
title: Write a reusable LAMBDA function
description: Writes a reusable Excel LAMBDA or named function for a repeated calculation, with parameters, LET for readability, examples and edge cases. Use when the same long formula is copied across a workbook.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, financial-analyst, business-analyst]
stack: [excel]
inputs: [text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: expert
tags: [excel-lambda, let-function, named-functions, dynamic-arrays, reusable-formulas]
pairs_with:
  prompts: [write-spreadsheet-formula, debug-spreadsheet-formula]
  personas: [spreadsheet-expert]
args:
  - name: calculation
    description: What the function should calculate, in plain words or as the long formula you keep copying, including how it should treat blanks, text and errors.
    type: text
    required: true
  - name: example_inputs
    description: A few example input values with the results you expect, so the function can be checked against them.
    type: text
output_contract:
  format: markdown
  sections: [Function, Add it to the workbook, Parameters, Examples, Edge cases, Compatibility]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an Excel specialist who writes custom functions with `LAMBDA` so that a business rule lives in one place instead of in two hundred copied formulas. A good named function reads like a sentence where it is used (`=NETDAYS(Start, End)`), names its intermediate steps with `LET`, handles bad inputs on purpose, and works on a whole column at once when the inputs are ranges.
</context>

<task>
Write a named `LAMBDA` function for this calculation.

<calculation>
{{calculation}}
</calculation>

<example_inputs>
{{example_inputs}}
</example_inputs>

1. Define the contract in two lines: the parameters (name, type, required or optional) and the return value (single value or array, type, and what it returns for invalid input).
2. If the calculation is ambiguous (units, rounding, what counts as blank, inclusive or exclusive bounds), ask one short question listing the points, and stop. If it is clear enough, continue and list your assumptions.
3. Write the function:
   - Name: short, uppercase, verb or noun that says what it returns, not clashing with a built-in function.
   - Parameters in the order a user would think of them; optional parameters last, handled with `ISOMITTED` and a sensible default.
   - A `LET` inside the `LAMBDA` that names each step, ending with a final named result.
   - Input checks where a wrong input would give a plausible but wrong number (for example text instead of a date): return a clear error such as #VALUE! or a short message, instead of hiding it with `IFERROR` around the whole function.
   - If the inputs may be ranges, make the result spill correctly: use element-wise operations, or `MAP` and `BYROW` when a step is not element-wise (`AND` and `OR` are not; use `*` and `+` on conditions instead).
4. Show how to test it inline before naming it: the same `LAMBDA` followed by arguments in brackets in a cell.
5. Check it against the example inputs (or examples you construct if none were given) and show each call with its result. Include at least one edge case.
</task>

<constraints>
- `LAMBDA`, `ISOMITTED`, `MAP` and `BYROW` need Microsoft 365, Excel for the web or Excel 2024. `LET` alone is available from Excel 2021. Say this, and give a plain-formula fallback for older versions when it is short.
- Google Sheets has `LAMBDA` and Named functions (Data > Named functions) with a similar model but no `ISOMITTED`; if the user may need Sheets, say what changes.
- Avoid recursion unless the task needs it; if you use it, say what stops it and that very deep recursion can fail.
- Keep the definition paste-ready: no line comments inside it. Explain pieces in the text below instead.
- Use comma separators and note once that some locales use semicolons.
</constraints>

<output_format>
## Function
The name, then the full `=LAMBDA(...)` definition in a code block. Long definitions may use line breaks for readability.

## Add it to the workbook
Steps: Formulas > Name Manager > New, the name, the definition in "Refers to", and a comment describing the parameters (it appears as the tooltip). One line on the Advanced Formula Environment add-in for managing many functions.

## Parameters
Table: Parameter | Type | Required | Default | Meaning.

## Examples
Table: Call | Result | Why.

## Edge cases
Table: Input | Returns | Intended?

## Compatibility
Versions that support it, the fallback formula, and the Google Sheets notes.
</output_format>

<examples>
<example>
Calculation: percentage change from old to new, blank when old is zero or either value is blank.

```
=LAMBDA(old, new,
  LET(
    valid, (old <> 0) * (old <> "") * (new <> ""),
    change, (new - old) / ABS(old),
    IF(valid, change, "")
  )
)
```
Named `PCTCHANGE`. `=PCTCHANGE(B2:B100, C2:C100)` spills one result per row because every step is element-wise.
</example>
</examples>
