---
schema: 1
id: translate-spreadsheet-to-pandas
kind: prompt
title: Translate a spreadsheet workflow to pandas
description: Translates a spreadsheet workflow of filters, lookups, pivots and formulas into a pandas script that produces the same outputs, with checks that totals match. Use to automate a manual routine.
category: data-exploration
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, business-analyst, financial-analyst, data-scientist]
stack: [pandas, excel, google-sheets]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [spreadsheet-to-code, vlookup-to-merge, pivot-table, reconciliation, automation]
pairs_with:
  prompts: [write-dataframe-transformation, automate-recurring-report, reconcile-datasets]
  personas: [data-analyst]
args:
  - name: spreadsheet_steps
    description: The steps you do by hand, in order - which file and sheet you open, filters, lookups (paste the formulas), helper columns, pivots and their settings, copy-paste steps, and what the final output looks like.
    type: text
    required: true
  - name: columns
    description: The columns of each input sheet with their types and a few example values, especially IDs, dates and amounts.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Step mapping, Script, Reconciliation checks, Behaviour differences, How to run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analytics engineer who moves spreadsheet routines into code without changing the answer. The hard part is not syntax but semantics: `VLOOKUP` returns the first match while a merge duplicates rows on repeated keys, Excel matches text case-insensitively while pandas does not, blanks and zeros behave differently, dates arrive as serial numbers or ambiguous text, and Excel's `ROUND` rounds halves away from zero while Python rounds halves to even. You make each of those explicit and prove the script reproduces the spreadsheet before anyone relies on it.
</context>

<task>
Translate this spreadsheet workflow into a pandas script.

<spreadsheet_steps>
{{spreadsheet_steps}}
</spreadsheet_steps>

<columns>
{{columns}}
</columns>

1. Map each manual step to its pandas equivalent in a table, in order. Use these translations, adjusted to the details:
   - Filters: boolean masks with `.loc`; text filters with `.str` methods; say whether matching is case-sensitive.
   - `VLOOKUP`, `XLOOKUP`, `INDEX`/`MATCH`: `merge(how="left", validate="many_to_one", indicator=True)` after normalising the key (strip spaces, consistent case and type), so duplicates on the lookup side raise an error and unmatched rows can be counted. If the spreadsheet relies on first-match behaviour, deduplicate the lookup table explicitly and say which row wins.
   - `SUMIFS`, `COUNTIFS`, `AVERAGEIFS`: `groupby` with `agg`, or masks with `.sum()` for single cells.
   - Pivot tables: `pivot_table` with the same rows, columns, values and aggregation, `fill_value` matching how blanks were shown, and `margins=True` for grand totals.
   - `IF`, nested `IF`, `IFS`: `numpy.where` or `numpy.select` with an explicit default.
   - Text and date functions: `.str` methods; `pd.to_datetime` with an explicit `format` or `dayfirst`, and Excel serial dates converted with origin `1899-12-30`.
   - `ROUND`: a half-away-from-zero helper using `decimal` (or `numpy.floor(x * 10**n + 0.5)` for positive values), not Python's `round`.
2. If a step is ambiguous (a manual judgment, a copy-paste whose source is unclear, a formula not pasted), list it as a question and write the script with a clearly marked placeholder for that step.
3. Write the script: constants for file paths and sheet names at the top, one function per logical stage (load, clean, enrich, aggregate, export), explicit `dtype` for ID columns so leading zeros survive, and output written to a new file, never over the input.
4. Reconciliation checks inside the script: row counts after every merge, the number of unmatched lookups, control totals (sum of amounts before and after each stage), and a final comparison against the spreadsheet's own output if the user can export it (`pandas.testing.assert_frame_equal` with a tolerance for floats, or a merge that lists differing rows).
</task>

<constraints>
- Use pandas and the standard library, plus numpy and openpyxl only where needed. No other dependencies.
- Do not silently drop rows. Every filter states what it removes, and the script logs the count.
- Keep the logic readable for someone who knows the spreadsheet: comments name the original step ("Step 3: VLOOKUP region from Customers").
- If the workflow would be simpler as SQL or Power Query, say so in one line, then write the pandas script anyway.
</constraints>

<output_format>
## Step mapping
Table: Step | Spreadsheet action | pandas equivalent | Behaviour to watch.

## Script
The full script in one Python code block.

## Reconciliation checks
What each check verifies and what to do if it fails.

## Behaviour differences
Bullets on the differences that could change numbers in this workflow (case, blanks, rounding, duplicates, dates).

## How to run
The command, the Python and pandas versions assumed, and the expected output file.
</output_format>
