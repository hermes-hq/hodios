---
schema: 1
id: spec-bulk-import-feature
kind: prompt
title: Specify a bulk import feature
description: Specifies a user-facing CSV or spreadsheet import before build, with template, column mapping, duplicate policy, validation messages, partial success, size limits and undo.
category: product
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, business-analyst, fullstack-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [csv-import, data-onboarding, bulk-actions, requirements]
pairs_with:
  prompts: [implement-csv-import, spec-form-fields-and-validation, list-feature-edge-cases]
args:
  - name: import_goal
    description: What people are importing, from where (another tool, a spreadsheet, an export), and why.
    type: text
    required: true
  - name: data_model
    description: The fields of the records being created or updated, which are required, and which link to other records.
    type: text
  - name: scale
    description: Typical and largest file sizes or row counts, and who runs imports (admins, every user, support).
    type: text
output_contract:
  format: markdown
  sections: [Import scope, Template and mapping, Validation rules, Duplicates and updates, Results and recovery, Limits, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Imports are where real-world data meets a clean data model, and most of the support load comes from decisions the spec skipped. Files arrive from Excel with a byte order mark, a semicolon delimiter from European locales, dates as 03/04/2025 that could be March or April, leading zeros stripped from codes and phone numbers, and merged header rows. The product decisions that matter are: create only or also update, how a row is matched to an existing record, whether one bad row blocks the whole file, how errors are reported so a non-technical person can fix them in the spreadsheet, whether the import can be undone, and what happens to linked records and notifications triggered by thousands of new items at once.
</context>

<task>
<import_goal>
{{import_goal}}
</import_goal>
{{#data_model}}
<data_model>
{{data_model}}
</data_model>
{{/data_model}}
{{#scale}}
<scale>
{{scale}}
</scale>
{{/scale}}

1. State the import scope: who can import, which record types, create only or create and update, and what the import must not touch.
2. Specify the template and mapping: a downloadable template with example rows, accepted file types and encodings, header matching and manual column mapping, ignored columns, and how dates, numbers, booleans and multi-value fields are read, with the locale assumption stated.
3. Write validation rules per field: required, format, allowed values, references to other records, and the exact error message a user sees for each failure, in plain words with the row and column.
4. Decide duplicates and updates: the matching key, what happens on a match (skip, update, ask), blank cells on update (keep or clear), and duplicates inside the same file.
5. Specify results and recovery: preview before commit, all-or-nothing or partial success, an error file with the original rows plus an error column, progress for long imports, undo or rollback window, and whether imported records trigger notifications, automations or webhooks.
6. Set limits: rows, file size, concurrent imports, and what users see when they exceed them.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Do not choose libraries or write code; this is a requirements document.
- Every validation rule needs a user-facing message a non-technical person can act on.
- Never assume a single date or number format; state the locale rule or ask.
- Flag imports of personal data, payment data or passwords and say who should approve handling them.
- If the record fields are not given, list the questions needed instead of inventing a data model.
</constraints>

<output_format>
## Import scope
Bullets.
## Template and mapping
Bullets plus a template example table with two sample rows.
## Validation rules
Table: field, rule, error message.
## Duplicates and updates
Numbered rules.
## Results and recovery
Bullets covering preview, partial success, error file, progress, undo and side effects.
## Limits
Table: limit, value or proposal, message shown.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
