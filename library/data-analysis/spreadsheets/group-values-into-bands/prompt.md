---
schema: 1
id: group-values-into-bands
kind: prompt
title: Group values into bands
description: Groups numbers such as ages, prices, sizes or days overdue into bands with a band table and formulas or pivot grouping, clear boundary rules, honest labels and a frequency table.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, researcher, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [binning, age-bands, frequency-table, lookup-table, boundaries]
pairs_with:
  prompts: [build-pivot-analysis, write-spreadsheet-formula, build-spreadsheet-chart]
args:
  - name: values
    description: What the values are (ages, order values, days overdue), their range and units, whether they can be decimals, blanks or negative, and where they are on the sheet.
    type: text
    required: true
  - name: bands
    description: The bands you want, or the purpose so bands can be suggested (for example "standard 10-year age groups" or "aged-debt buckets 0-30, 31-60, 61-90, 90+").
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365, Excel 2019, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Band table, Band formula, Frequency table, Boundary tests, Pivot option]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You group values into bands for reports. Most banding errors are at the edges: labels like "18-24" and "25-34" leave a gap for 24.5 when values are decimals; ">= 30" and "<= 30" in neighbouring bands double-count 30; a value above the top band or below the bottom one silently falls into the wrong bucket or returns #N/A. You define each band by its lower bound, include the lower bound and exclude the upper, and make labels say exactly that. You keep the band table on the sheet, sorted ascending, so a band can be changed without touching formulas. Ages computed from dates of birth need a whole-years calculation (DATEDIF with "Y" in Excel and Google Sheets, or INT(YEARFRAC(...))), not days divided by 365.

App: {{app}}

<values>
{{values}}
</values>

<bands>
{{bands}}
</bands>
</context>

<task>
1. Propose the band table: lower bound, label, and an explicit rule (lower bound included, next lower bound excluded). Include an open-ended top band and a band or flag for values below the first bound, blanks and invalid entries. If the requested bands overlap or leave gaps, point it out and fix the table.
2. Write the band formula using an approximate lookup on the sorted lower bounds: XLOOKUP with match_mode -1, or VLOOKUP/LOOKUP with approximate match in older versions. Handle blanks and out-of-range values explicitly, not by IFERROR around everything.
3. Write the frequency table: COUNTIFS with ">=" lower and "<" next lower for each band (or COUNTIF on the band column), a percentage column, and a total row that must equal the count of valid values. Mention FREQUENCY only if useful, noting it counts values up to and including each bin (the opposite edge rule).
4. Test boundaries: each lower bound, just below it, a decimal between bands, the maximum, a blank, a negative and text.
5. Describe the pivot-table route: Group Field in Excel pivots (with the same start, end and interval) or the grouping rule in Google Sheets pivots, and the edge rule each uses, so the user can choose.
</task>

<constraints>
- Labels must match the rule. For decimal values use labels like "25 to under 35" or "25-34.99"; for whole numbers "25-34" is fine. Say which applies.
- Do not choose bands that hide the story (for example one band holding 80% of values) without saying so; suggest a better split if the data range shows it.
- Use only functions available in {{app}} and English-locale commas; note that some locales use semicolons.
- Lock the band table references so the formula fills down.
- Use standard bands only when the user names a standard; do not claim a band set is official unless the user supplied it.
</constraints>

<output_format>
## Band table
Markdown table: lower bound | label | rule, and where it goes on the sheet.

## Band formula
The target cell and formula in a code block, with an older-version fallback if needed.

## Frequency table
Formulas for count, percentage and the total check.

## Boundary tests
Table: value | expected band | why.

## Pivot option
Three to five lines.
</output_format>
