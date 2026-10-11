---
schema: 1
id: compare-two-workbook-versions
kind: prompt
title: Compare two versions of a sheet
description: Finds every added, deleted and changed row or cell between two versions of the same sheet, keyed by ID rather than row position, and produces a change summary someone can review.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [verify, review]
role: [data-analyst, business-analyst, financial-analyst, project-manager]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [version-diff, change-log, audit-trail, full-outer-join, lookup]
pairs_with:
  prompts: [reconcile-datasets, audit-spreadsheet-model, write-power-query]
args:
  - name: versions
    description: The two versions (old and new file or tab), the sheet layout, which column or columns uniquely identify a row, how many rows, and what kind of changes you expect (prices updated, rows added, status changes).
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365 on Windows, Excel for Mac, Google Sheets.
    type: string
    required: true
  - name: purpose
    description: Optional. Why you need the comparison, for example "send suppliers a list of price changes" or "check what a colleague changed in the budget".
    type: text
output_contract:
  format: markdown
  sections: [Key and method, Comparison build, Change summary, False changes to filter, Built-in alternatives]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You compare versions of the same sheet: last month's and this month's price list, the budget before and after a colleague edited it, a supplier's re-sent catalogue. Comparing cell by cell by position only works if no row was inserted, deleted or re-sorted, which is rarely true; one inserted row makes every row below look changed. Experts compare by a key: build the union of keys from both versions (a full outer join), look up each column in old and new, and classify each key as added, deleted, changed or unchanged, with the changed columns named. They also filter false changes: floating-point noise (0.1+0.2), the same date stored once as a date and once as text, trailing spaces, volatile formulas such as TODAY or RAND that recalculate, and formatting-only edits. Duplicate keys must be found first, because they make lookups return the first match and hide changes. Built-in tools exist but have limits: Microsoft's Spreadsheet Compare (Windows, certain Microsoft 365 and Office editions) compares whole workbooks including formulas; Google Sheets version history shows edits by person and time but not a row-level diff between two separate files.

App: {{app}}

<versions>
{{versions}}
</versions>
{{#purpose}}

Purpose: {{purpose}}
{{/purpose}}
</context>

<task>
1. Confirm the key. If no single column is unique, propose a composite key (for example Supplier & SKU) and a check that it is unique in both versions. If the key is unclear, ask and stop.
2. Give a duplicate-key check for each version, to run first.
3. Build the comparison on a new tab:
   - Excel 365 or Google Sheets: the union of keys with UNIQUE and VSTACK (or array literals in Sheets); for each compared column, old and new values with XLOOKUP; a Status column (Added, Deleted, Changed, Unchanged); and a "Changed columns" column listing which fields differ with TEXTJOIN.
   - Older Excel: stack both key lists in a helper range, remove duplicates, then INDEX/MATCH lookups, or Power Query's Merge Queries with a full outer join.
4. Write the comparison test so that it ignores false changes: compare rounded numbers (to a stated precision), TRIM text, and convert dates consistently; state each tolerance.
5. Produce a change summary: counts by status, and for changed rows a table of key, field, old value, new value, and difference for numbers.
6. Give one or two built-in alternatives with what they can and cannot show, so the user can choose.
</task>

<constraints>
- Never compare by row position unless the user confirms rows were not inserted, deleted or sorted.
- Do not modify either version; build the comparison on a separate tab or file.
- Use only functions available in {{app}}; VSTACK, UNIQUE, XLOOKUP and TEXTJOIN-heavy formulas need Microsoft 365 or Google Sheets; give the fallback.
- State every tolerance you apply, so a real small change is not hidden without the user knowing.
- Do not invent column names; use those given and mark assumptions.
</constraints>

<output_format>
## Key and method
The key, the uniqueness check, and the method.

## Comparison build
Numbered steps with each formula in a code block.

## Change summary
The summary formulas and the layout of the changes table.

## False changes to filter
Table: cause | how it is handled | tolerance.

## Built-in alternatives
Up to two, with limits.
</output_format>
