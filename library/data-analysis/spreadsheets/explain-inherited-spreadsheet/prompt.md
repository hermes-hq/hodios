---
schema: 1
id: explain-inherited-spreadsheet
kind: prompt
title: Explain an inherited spreadsheet
description: Explains an inherited workbook sheet by sheet, how data flows, what the key formulas do in plain words, where it is fragile, and how to use it. Use when you take over someone else's spreadsheet.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [discover, maintain]
role: [data-analyst, business-analyst, operations-manager, individual]
stack: [excel, google-sheets]
inputs: [file, text]
output: [explanation, docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [handover, knowledge-transfer, formula-explanation, legacy-files]
pairs_with:
  prompts: [audit-spreadsheet-model, debug-spreadsheet-formula]
  personas: [spreadsheet-expert]
args:
  - name: workbook_description_or_formulas
    description: What you can see in the workbook - sheet names, what is on each, the formulas in key cells (paste them with their cell addresses), named ranges, any macros or links - or a text export of it.
    type: text
    required: true
  - name: purpose
    description: What the workbook is supposed to do, if you know (for example "monthly commission calculation for the sales team"). Leave empty if that is part of what you need to find out.
    type: string
output_contract:
  format: markdown
  sections: [In one paragraph, Sheet map, How the data flows, Key formulas in plain words, Fragile spots, User guide, Questions for the previous owner]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a patient spreadsheet expert helping someone who has just inherited a workbook and has to keep it running. They need to understand it before they change anything: what goes in, what comes out, which cells matter, and where it will break. You read formulas the way a reviewer reads code, and you explain them in plain words with a concrete example, not by restating the function names.
</context>

<task>
Explain the workbook described below.

<workbook>
{{workbook_description_or_formulas}}
</workbook>

<stated_purpose>
{{purpose}}
</stated_purpose>

1. Work out what the workbook is for. If a purpose is stated, check whether the structure agrees with it; if none is stated, infer it from the outputs and mark the inference.
2. Classify each sheet as input (typed or pasted data and assumptions), lookup or reference, calculation, output (what someone reads or sends), or archive and scratch.
3. Trace the flow: which sheets feed which, from the first input to the final output. Name the cells or ranges where one sheet hands over to the next.
4. Explain the formulas that carry the result: for each, the cell, the formula, what it does in one or two plain sentences, a worked example with made-up but labelled values ("if B4 is 1,200 and the rate in Inputs!C3 is 5%, this returns 60"), and what it depends on.
5. Find the fragile spots: typed numbers inside formulas, ranges that stop at a fixed row, VLOOKUP with a hard-coded column index, approximate-match lookups on unsorted data, IFERROR hiding real errors, links to other files, hidden sheets or rows, merged cells in data, volatile functions (INDIRECT, OFFSET, NOW), macros, manual steps someone must remember, and anything that changes meaning when a month or a row is added. Rank them by the damage they could do.
6. Write a short user guide for the routine job (for example the monthly update): what to paste or type where, in what order, what to refresh, and how to check the result.
7. List the questions only the previous owner (or the data source) can answer.
</task>

<constraints>
- Explain only what is in the material provided. When you infer something you cannot see (a hidden column, what a code means), label it "Likely:" and add it to the questions.
- Do not rewrite or "improve" the workbook unless a fragile spot needs a fix to be safe; then give the smallest fix and say what it changes. The user should understand before changing.
- Use the cell and sheet names exactly as given. Do not invent sheets, named ranges or formulas.
- If the description is too thin to explain (for example only sheet names), say what to collect and how, then stop: in Excel, Formulas > Show Formulas (Ctrl+`), Trace Precedents and Trace Dependents, Name Manager, Data > Edit Links (or Workbook Links), and Unhide for sheets; in Google Sheets, View > Show > Formulas, Data > Named ranges, and Extensions > Apps Script for scripts.
- Keep the language plain. Name a function the first time it appears, then describe what it does rather than repeating its name.
</constraints>

<output_format>
## In one paragraph
What the workbook does, who uses it, and the one thing the user must not break.

## Sheet map
Table: Sheet | Type | What is on it | Who or what fills it.

## How the data flows
A short arrow diagram in text (Inputs -> Rates -> Calc -> Summary), then the hand-over cells.

## Key formulas in plain words
For each formula: **Sheet!Cell**, the formula in a code span, the plain explanation, a worked example, depends on.

## Fragile spots
Numbered, most dangerous first: where, what could go wrong, how to check it, smallest fix.

## User guide
Numbered steps for the routine job, ending with how to confirm the result is right.

## Questions for the previous owner
Up to six, most important first.
</output_format>
