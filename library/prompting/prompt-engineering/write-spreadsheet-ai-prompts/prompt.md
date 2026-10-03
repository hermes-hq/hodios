---
schema: 1
id: write-spreadsheet-ai-prompts
kind: prompt
title: Write prompts for spreadsheet AI functions
description: Writes prompts for AI functions inside spreadsheet cells that classify, extract or rewrite each row consistently, with fixed outputs, blank handling, cell assembly and a spot-check plan.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, marketer, individual]
requires: [none]
inputs: [dataset, text]
output: [prompt, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [spreadsheet-ai, cell-prompts, row-classification, data-cleanup]
pairs_with:
  prompts: [write-batch-processing-prompt, write-classification-prompt, clean-messy-spreadsheet]
  personas: [spreadsheet-expert]
args:
  - name: task
    description: What the AI column should produce for each row, for example "tag each feedback comment with a theme" or "pull the city out of a free-text address".
    type: text
    required: true
  - name: sample_rows
    description: Five to fifteen real rows with column headers, pasted as text. Remove personal data you do not need.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Output design, Cell prompt, Assembling the formula, Expected results, Before you fill down]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spreadsheet AI functions run a prompt once per cell. That makes consistency everything: one row returning "Billing", the next "billing issue" and a third a full sentence breaks every filter, pivot and count downstream. Cell prompts work when the output is tiny and fixed (one label from a list, one extracted value, a rewrite under a length limit), blanks and junk rows have a defined answer, the row's columns are passed with their headers, and someone checks a sample before filling down a few thousand rows. Results can also change when the sheet recalculates, so finished columns are usually frozen as values.

<task_description>
{{task}}
</task_description>

<sample_rows>
{{sample_rows}}
</sample_rows>
</context>

<task>
1. Work out which columns the prompt needs and what the output column should hold. If the task could mean several outputs (one label or several, extract or normalise), ask one question and stop.
2. Design the output: the exact allowed values (for labels, a closed list with an "Other" or "Unclear" value; for extraction, the format such as ISO dates or a city name only; for rewrites, a word limit), and the fixed values for blank, unreadable or irrelevant rows (for example "N/A").
3. Write the cell prompt: one or two sentences of task, the label definitions or format rule, the blank rule, "Reply with only the [value], nothing else", and slots where each column value is inserted with its header name.
4. Show how to assemble it in a cell: a generic pattern that joins the prompt text with cell references, written as AI_FUNCTION("prompt text", A2, B2) with a note to replace AI_FUNCTION with the actual function name in their spreadsheet. Wrap it so blank rows get the blank value without a model call, for example IF(TRIM(C2)="", "N/A", AI_FUNCTION(...)), which saves cost and keeps blanks consistent. If the prompt text is long, suggest keeping it in one fixed cell and referencing that cell.
5. Run the prompt on each sample row yourself and give the expected output, flagging rows where the right answer is debatable and the rule you used.
6. Give the checks before filling down: test on 20 rows, read every output, count values not in the allowed list with a COUNTIF-style formula, fix the prompt, then fill down; freeze results as values once checked; and a note on cost and rate limits for large sheets.
</task>

<constraints>
- Keep the cell prompt under about 120 words; long prompts multiply cost across every row.
- Do not claim a specific spreadsheet product's function name, syntax or limits as fact; these vary by product and change.
- Never add a value outside the allowed list to the expected results.
- Flag columns holding personal or confidential data and suggest leaving them out of the prompt when the task does not need them.
</constraints>

<output_format>
## Output design
Allowed values or format, and blank handling.
## Cell prompt
One fenced block.
## Assembling the formula
The generic pattern with the blank guard, and the long-prompt tip.
## Expected results
Table: Row | Input summary | Expected output | Note.
## Before you fill down
Numbered checks.
</output_format>
