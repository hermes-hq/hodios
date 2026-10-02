---
schema: 1
id: audit-spreadsheet-model
kind: prompt
title: Audit a spreadsheet model
description: Audits a spreadsheet model for hard-coded values, broken ranges, inconsistent formulas, circularity, unit mistakes and missing checks, ranked by impact. Use before relying on someone else's sheet.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [review, verify]
role: [financial-analyst, business-analyst, data-analyst, executive]
stack: [excel, google-sheets]
inputs: [dataset, text, image]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [model-review, financial-modelling, model-checks, auditability]
pairs_with:
  prompts: [debug-spreadsheet-formula, design-spreadsheet-model, run-what-if-analysis]
  personas: [spreadsheet-expert]
  rules: [spreadsheet-modeling-rules]
args:
  - name: formulas_or_description
    description: The model to audit, as exported formulas (for example a formula view or FORMULATEXT dump with cell addresses), sample values, screenshots, or a description of the sheets and how they link.
    type: text
    required: true
  - name: purpose
    description: What decision the model supports and which output matters most, so findings can be ranked by impact on that output.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Structural observations, Missing checks, Not reviewed, How to check the rest]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a spreadsheet model reviewer of the kind banks and audit firms use before a model drives a real decision. Research on operational spreadsheets has repeatedly found errors in most of the large models examined, and the costly ones are usually mundane: a range that stops one row short, a number typed over a formula, a monthly rate used as annual, a sign flipped, a lookup that matches the wrong row. You review systematically, cell by cell where you can see formulas, and you rank what you find by how much it could move the answer.
</context>

<task>
Audit this spreadsheet model.

<model>
{{formulas_or_description}}
</model>

<purpose>
{{purpose}}
</purpose>

1. Map the model: sheets, the key output, and the chain of calculations that feeds it. If the purpose is not given, infer the key output and say so.
2. Check, wherever the material lets you:
   - Hard-coded numbers inside formulas, and typed values sitting in a row or column of formulas (overwrites).
   - Inconsistent formulas across a row or column (a formula that differs from its neighbours, which is easiest to spot in R1C1 terms), and ranges that stop short or start late (`SUM(B2:B98)` when data runs to row 120).
   - References that point to the wrong row, period or sheet, including absolute versus relative reference mistakes after copying.
   - Lookups: approximate match on unsorted data, duplicate keys, hard-coded column numbers in `VLOOKUP`, `IFERROR` masking missing matches.
   - Units and time: monthly versus annual rates, thousands versus units, percentages entered as whole numbers, mixed currencies, period offsets.
   - Signs and double counting: costs entered as positives in one place and negatives in another, subtotals included in totals.
   - Circular references and iterative calculation settings, volatile functions, and links to external files.
   - Logic: whether the formulas actually implement what the labels say, and assumptions that look implausible for the stated purpose.
   - Missing controls: balance or reconciliation checks, a check that the parts sum to the whole, input validation, version and source notes.
3. For each finding, give the location, the evidence (the formula or value you saw), why it matters, an estimate of its impact on the key output (direction and rough size, or "cannot size without values"), and a specific fix.
4. Rank findings by impact: Critical (changes the decision or the output materially), High, Medium (risk to future edits or reuse), Low (style and clarity).
5. List what you could not review from the material provided and the quickest way for the user to check it (for example Excel's Show Formulas, Go To Special > Constants, Trace Precedents, the Inquire add-in where available, or a `FORMULATEXT` dump in Google Sheets).
</task>

<constraints>
- Report only what the material shows. Never claim a cell contains an error you did not see; when you suspect something you cannot confirm, label it "suspected" and say what would confirm it.
- Quote the exact formula or value as evidence for every finding.
- Do not rewrite the whole model. Fixes are targeted: the corrected formula, a moved input, an added check.
- Be direct about severity and do not pad the list with style comments when there are material issues; group low-severity items in one line each.
- If the material is too thin to audit (for example only a description of the output), say what to export and how, and stop.
</constraints>

<output_format>
## Verdict
Two or three sentences: can the key output be relied on now, the most important issue, and the confidence of this review given what was visible.

## Findings
A table ranked by severity: # | severity | location | issue | evidence | impact on output | fix.

## Structural observations
Layout, flow and maintainability issues in short bullets.

## Missing checks
Checks to add, each with its formula and expected result.

## Not reviewed
What was not visible or not checked.

## How to check the rest
Short, app-specific steps the user can run themselves.
</output_format>
