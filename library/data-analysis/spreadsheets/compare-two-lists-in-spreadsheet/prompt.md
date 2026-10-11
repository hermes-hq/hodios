---
schema: 1
id: compare-two-lists-in-spreadsheet
kind: prompt
title: Compare two lists in a spreadsheet
description: Compares two lists to show what is in both, only in A and only in B, catching false misses from spaces, case, numbers stored as text, long IDs and wildcard characters.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, business-analyst, operations-manager, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [list-comparison, matching, find-missing, lookup, data-quality]
pairs_with:
  prompts: [reconcile-datasets, clean-messy-spreadsheet, deduplicate-records]
args:
  - name: lists
    description: Where each list is (sheet, column, rows), what the values are (emails, product codes, names, invoice numbers), and a few samples from each, including ones you think should match but do not.
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365, Excel 2016, Google Sheets.
    type: string
    required: true
  - name: output_wanted
    description: Optional. Flags next to each list, separate lists of in-both and only-in-one, or highlighted cells.
    type: text
output_contract:
  format: markdown
  sections: [Normalise first, Formulas, Why matches were missed, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You compare lists for people checking who is missing from a mailing list, which codes are in the catalogue but not in stock, or which invoices were not paid. The formulas are easy; the false results are the real problem, and experts know where they come from. Trailing spaces and non-breaking spaces (CHAR(160)) from web or PDF copies make identical-looking values differ. XLOOKUP, MATCH and VLOOKUP treat the number 123 and the text "123" as different, while COUNTIF treats them as equal, so the two methods disagree. COUNTIF also treats `*`, `?` and `~` in a value as wildcards, and compares values of more than 15 digits stored as text as numbers, so long card or account numbers that share their first 15 digits look like matches. Most lookups ignore case; EXACT does not. Duplicates within one list make "in both" counts larger than the list. Excel 365 and Google Sheets can produce the three result lists with FILTER and UNIQUE; older Excel needs flag columns and a filter.

App: {{app}}

<lists>
{{lists}}
</lists>
{{#output_wanted}}

Output wanted: {{output_wanted}}
{{/output_wanted}}
</context>

<task>
1. Decide what counts as the same value for these lists: case-sensitive or not, ignore spaces and punctuation or not, numbers and text equal or not. For emails, compare lower-cased and trimmed. State the rule, and ask only if the samples make it ambiguous.
2. Give a normalising helper column for each list (TRIM, SUBSTITUTE CHAR(160), LOWER or UPPER, and TEXT or VALUE to make types consistent), or the same steps inside the formula.
3. Write the comparison: a flag next to each list using XMATCH or MATCH on the normalised keys (ISNUMBER of MATCH, or COUNTIF only where wildcard and 15-digit traps cannot occur); and, where the app supports it, spilling lists of in both, only in A and only in B with FILTER and UNIQUE. Give an older-Excel fallback.
4. Check the user's examples of values that should match but did not, and name the reason for each.
5. Report duplicates within each list separately, with a COUNTIF-based or UNIQUE-based check.
6. Give checks: counts of in both plus only in A equal the distinct count of A, and the same for B.
</task>

<constraints>
- Do not use COUNTIF for keys that can contain `*`, `?` or `~`, or for long numeric IDs stored as text, without a warning and an alternative.
- Do not change the original lists; normalise in helper columns.
- Use only functions available in {{app}}; FILTER, UNIQUE and XMATCH need Microsoft 365, Excel 2021 or Google Sheets. Use English-locale commas and note that some locales use semicolons.
- For fuzzy matches (spelling variations in names), say that formulas give exact matches only and point to a fuzzy approach, rather than claiming a match.
</constraints>

<output_format>
## Normalise first
The rule and the helper formulas.

## Formulas
Flag formulas and result-list formulas in code blocks, each with its target cell.

## Why matches were missed
Table: sample value A | sample value B | reason | fixed by.

## Checks
The count checks and the duplicates check.
</output_format>
