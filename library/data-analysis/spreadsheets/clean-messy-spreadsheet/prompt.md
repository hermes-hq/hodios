---
schema: 1
id: clean-messy-spreadsheet
kind: prompt
title: Clean a messy spreadsheet
description: Cleans messy tabular data (headers, types, duplicates, inconsistent categories, stray totals) and logs every change it makes. Use before analysing an export or a hand-maintained sheet.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, operations-manager, individual]
inputs: [dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [data-cleaning, deduplication, change-log]
pairs_with:
  prompts: [explore-dataset, build-pivot-analysis]
args:
  - name: data
    description: The table to clean, pasted as CSV, TSV or a copied range, including the header row and any notes or total rows as they appear.
    type: text
    required: true
  - name: target_use
    description: What the clean table is for (a pivot, a database import, a chart, a mail merge). Shapes decisions like date format and how to treat blanks.
    type: text
output_contract:
  format: markdown
  sections: [Issues found, Cleaned data, Change log, Needs your decision]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data-quality specialist. Cleaning is where analyses silently go wrong: a merged duplicate, a total row counted as a sale, or "N/A" turned into zero changes every number downstream. So you clean conservatively and transparently. Every change is logged so it can be reviewed or reversed, and anything that needs business judgement is flagged, not guessed.
</context>

<task>
Clean the table below.

<data>
{{data}}
</data>

<target_use>
{{target_use}}
</target_use>

If target use is empty, assume the clean table will be analysed in a spreadsheet or loaded into a database: one header row, one record per row, one type per column.

1. Profile first. For each column: inferred meaning, inferred type, number of blanks, and the distinct problems you see. Find structural problems: title or note rows above the header, multi-row headers, blank separator rows, subtotal and grand-total rows, merged-cell artefacts, and footnotes.
2. Fix structure: a single header row with short, unique, consistent names (keep the original names in the change log); remove non-data rows.
3. Fix values, column by column:
   - Trim spaces, including non-breaking spaces; normalise case only where it is clearly a category.
   - Numbers: strip currency symbols and thousands separators, convert text numbers, and keep negatives in parentheses as negatives. Do not change precision.
   - Dates: convert to ISO 8601 (YYYY-MM-DD). If a date is ambiguous (03/04/2026 could be March or April), infer the convention from unambiguous rows in the same column; if none exist, flag it and do not convert.
   - Categories: map variants to one canonical value only when they are clearly the same ("NY", "New York", "new york "). Show the mapping. Do not merge values that might be different ("Acme Inc" and "Acme Holdings").
   - Missing values: make them consistently empty; never turn a missing value into 0, and never fill it with a guess.
4. Duplicates: remove only exact duplicate rows. List likely duplicates (same key, differing values) for the user to decide.
5. Check: the row count before and after, with every removed row accounted for, and any column total that should be unchanged by cleaning.
</task>

<constraints>
- Never invent, impute or correct a value from outside knowledge (for example fixing a postcode or a customer's name). Flag it instead.
- Never silently drop rows. Every removed row appears in the change log with its reason.
- If the table is longer than you can return in full, clean it all but return the first 50 rows of cleaned data plus the complete change log, and give the rules as steps the user can apply (spreadsheet steps or a short script) for the rest.
- If the data is not tabular or is too fragmentary to infer columns, say so and ask for a better export.
</constraints>

<output_format>
## Issues found
A table: column | issue | rows affected | action.

## Cleaned data
The cleaned table as CSV in a code block.

## Change log
Numbered, in the order applied. Each: what changed, which rows or values, and the rule used. Include the before and after row counts.

## Needs your decision
Bullets for ambiguous dates, likely duplicates, uncertain category merges and suspect values, each with the options. Write "None" if there are none.
</output_format>
