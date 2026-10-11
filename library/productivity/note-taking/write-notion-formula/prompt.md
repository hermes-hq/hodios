---
schema: 1
id: write-notion-formula
kind: prompt
title: Write a Notion formula
description: Writes a Notion formula property from a plain request, such as days until due, overdue flags or a progress bar, using your exact property names and types, with a test plan for blank and edge values.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, project-manager, student, operations-manager]
stack: [notion]
requires: [none]
inputs: [text]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [notion-formulas, formula-property, date-math, progress-bar, notion-databases]
pairs_with:
  prompts: [set-up-notion-workspace, write-note-templates]
args:
  - name: request
    description: What the formula should show, for example "days until the Due date, or 'Overdue' in red if past", "a 10-block progress bar from completed subtasks".
    type: text
    required: true
  - name: properties
    description: The properties the formula uses, each with its exact name and type, for example "Due (date), Status (status with options Not started, In progress, Done), Subtasks (relation to Tasks)".
    type: text
    required: true
  - name: problem
    description: Optional - a formula you tried and the error or wrong result.
    type: text
output_contract:
  format: markdown
  sections: [Formula, How it works, Returns, Test it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notion formulas read other properties of the same database row and return text, a number, a date, a checkbox or a list. The current formula language (often called Formulas 2.0) supports `prop("Name")` or the property token, `if`, `ifs`, `let` and `lets` for named steps, `dateBetween`, `dateAdd`, `now()`, `today()`, `format`, `style` for coloured text, list functions such as `map`, `filter` and `length`, and reading through relations directly. The common failures are: property names that do not match exactly, mixing types (adding text to a number without `format` or `toNumber`), blank values (an empty date makes date maths fail or show nonsense, so test with `empty()` first), comparing a status or select with the wrong option spelling, `now()` including the time so "days until" is off by one, and timezone shifts on dates without times. Older formulas and tutorials use functions that have changed; if the person pastes an old formula, update it.

Request: {{request}}
Properties: {{properties}}
{{#problem}}
What went wrong: {{problem}}
{{/problem}}
</context>

<task>
1. Check the properties: confirm every property the request needs is listed with a type. If one is missing or its type would change the formula (for example a select versus a status, a rollup versus a relation), ask and stop.
2. Write the formula, handling blank values first, then the main case. Use `let` or `lets` when it makes a long formula readable.
3. Give a multi-line, commented explanation of what each part does.
4. Say what type the formula returns and how that affects sorting and filtering in views.
5. Give a test table of four to six rows: typical, blank, boundary (due today, zero subtasks) and an unusual value, with the expected output.
6. If a previous attempt failed, name the cause and show the fix.
</task>

<constraints>
- Use the exact property names given; never invent a property.
- Only use functions you are confident exist in the current formula language; if unsure, say so.
- Do not use `now()` where `today()` or date-only comparison is meant, and explain the choice.
- Keep it to one formula unless a helper property clearly simplifies it; say why if so.
</constraints>

<output_format>
## Formula
A fenced code block ready to paste.
## How it works
## Returns
## Test it
Table: Example row | Expected output.
</output_format>
