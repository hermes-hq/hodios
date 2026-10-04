---
schema: 1
id: move-spreadsheet-to-database
kind: prompt
title: Move a spreadsheet to a database
description: Turns a business-critical spreadsheet into a small relational database, finding hidden entities, keys and cleaning rules, with an import script and a simple data entry path for non-developers.
category: data
version: 1.0.0
status: incubating
stage: [plan, design, build]
role: [software-engineer, founder, operations-manager]
subject: [nonprofit, retail]
stack: [excel, google-sheets]
requires: [none]
inputs: [dataset, text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [normalisation, data-cleaning, data-import, data-entry, lookup-tables, schema-design]
pairs_with:
  prompts: [design-database-schema, write-data-dictionary]
args:
  - name: sheet_description
    description: The sheet's tabs and column headers, 10 to 20 sample rows (anonymised), formulas or colour-coding that carry meaning, how many rows, and what the sheet is used for.
    type: text
    required: true
  - name: users
    description: Optional. Who enters and reads the data, how many people, their comfort with tools, and what reports or exports they need.
    type: text
  - name: database
    description: The database to target, or "recommend" for a simple choice that fits the team.
    type: string
    default: recommend
output_contract:
  format: markdown
  sections: [What the sheet really holds, Schema, Cleaning rules, Import script, Data entry and reports, Cutover, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A small business, nonprofit or the developer helping them wants to move a business-critical spreadsheet (orders, inventory, members, bookings) into a database. Spreadsheets hide several entities in one grid: a customer's name and address repeated on every order row, "Item 1 / Item 2 / Item 3" columns, status carried in cell colour, notes columns that contain dates and amounts, and totals typed by hand. The move succeeds when the entities are separated with real keys, the dirty data is cleaned by explicit rules (not by hand during import), and the people who typed into the sheet still have an easy way to enter data. It fails when the developer builds a database nobody can use, so the team goes back to the sheet.

Database: {{database}}
{{#users}}
Users:
{{users}}
{{/users}}
</context>

<task>
<sheet_description>
{{sheet_description}}
</sheet_description>

1. Find the entities in the sheet: repeated groups of columns (customer details on every order), numbered columns (line items), lookup values typed freely (status, category, location), and meaning carried in formatting or notes. Name each entity and its natural identifier, and decide surrogate keys.
2. Design the schema: tables, columns with types (money as decimal, dates as dates, never text), primary and foreign keys, unique constraints that stop duplicates (for example member email), check constraints for allowed values or a lookup table, and computed values that should be queries, not stored columns. Keep it as small as the job allows.
3. If the database is "recommend": choose from what the team can run and afford, such as SQLite for one user on one machine, a managed Postgres or MySQL for several users, or a low-code database tool with forms when nobody will maintain code. Give the reasons and what would change the choice.
4. Cleaning rules: one rule per issue seen in the sample (trimming, case, date formats, duplicate people with spelling variations, merged cells, totals rows, blank rows, values like "TBC" or "n/a"), each stating what happens to rows that fail (fix, map, or send to a rejects list for a human).
5. Import script: a script in a common language (Python with the csv module or pandas, or SQL load commands) that reads an export of each tab, applies the rules, loads parents before children, writes rejects to a file with the reason, and can be re-run safely (idempotent, upsert on natural keys). Include counts printed at the end for reconciliation. If the recommended home is a low-code tool with its own import, the script instead writes one clean CSV per table (parents first, with keys) for that tool's importer.
6. Data entry and reports: forms or a simple admin screen for the people who enter data, the views or saved queries that replace the sheet's summaries, and an export back to a spreadsheet for anyone who still needs one.
7. Cutover: freeze the sheet (read-only with a note), final import, reconcile row counts and totals against the sheet, run both for a short period only if needed, and keep the final sheet as an archive. Plan backups from day one.
</task>

<constraints>
- If no column headers or sample rows are given, ask for the tab names, headers, 10 to 20 anonymised rows and what the sheet is used for, and stop; do not design a schema for an imagined sheet.
- Work only from the columns and samples given; mark guesses about meaning as questions.
- If the users are not described and the database is "recommend", state the assumption (who enters data, how many people) as [X] beside the recommendation.
- If the sample contains personal data (names, emails, phone numbers, health or payment details), do not repeat it in the output; use made-up placeholders, and include access control and backups in the plan.
- Do not invent product prices or plan limits; say what to check.
- Keep the solution maintainable by the people named; avoid infrastructure they cannot run.
</constraints>

<output_format>
## What the sheet really holds
Table: entity | where it hides in the sheet | identifier.

## Schema
DDL or a table list with columns, types, keys and constraints, plus a one-line reason for each table.

## Cleaning rules
Table: issue seen | rule | rows that fail go to.

## Import script
One code block with comments, and how to run it.

## Data entry and reports
Bullets: how each user group enters and reads data.

## Cutover
Checklist with the reconciliation checks.

## Open questions
Bullets.
</output_format>
