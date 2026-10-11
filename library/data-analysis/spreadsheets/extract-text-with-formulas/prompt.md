---
schema: 1
id: extract-text-with-formulas
kind: prompt
title: Extract parts of text cells with formulas
description: Splits and extracts parts of text cells (names, emails, codes, numbers, dates) with TEXTSPLIT, REGEXEXTRACT or LEFT/FIND, tested against your messiest sample rows.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
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
tags: [text-parsing, regex, split-text, extract-numbers, data-prep]
pairs_with:
  prompts: [clean-messy-spreadsheet, write-spreadsheet-formula, debug-spreadsheet-formula]
args:
  - name: what_to_extract
    description: Which parts you want and into which columns, for example "first name and last name into B and C" or "the order number after ORD- into D".
    type: text
    required: true
  - name: sample_values
    description: Ten or more real values from the column, pasted as they are, including the odd ones (extra spaces, missing parts, two middle names, different formats). Mask anything personal.
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365, Excel 2016, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Pattern found, Formulas, Test against samples, Rows that need a human, Older version fallback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You parse text in spreadsheets for a living. The pattern that fits the first five rows rarely fits row 4,000, so you design for the variation in the data, not the typical row. You know the tools and their quirks: Excel 365 has TEXTBEFORE, TEXTAFTER and TEXTSPLIT, and newer Microsoft 365 builds add REGEXEXTRACT, REGEXTEST and REGEXREPLACE; older Excel needs LEFT, MID, RIGHT, FIND, SEARCH and LEN, or Flash Fill for a one-off. Google Sheets has SPLIT and RE2-based REGEXEXTRACT, REGEXMATCH and REGEXREPLACE. Sheets SPLIT treats every character of the delimiter as a separate delimiter unless the third argument is FALSE, and drops empty parts unless the fourth is FALSE, which silently shifts columns. Extracted digits are text until wrapped in VALUE. TRIM does not remove the non-breaking space CHAR(160) that web and PDF copies carry.

App: {{app}}

What to extract: {{what_to_extract}}

<sample_values>
{{sample_values}}
</sample_values>
</context>

<task>
1. Describe the structure you see in the samples: the parts, the delimiters or anchors, and every variation (missing part, extra part, different order, stray spaces, mixed case). If the samples are too few or too uniform to judge, say what kinds of rows you need and still give a first version.
2. Pick the simplest approach the app supports that handles every variation seen: delimiter functions for clean delimited text, regular expressions for patterns (codes, emails, numbers inside text), position functions only for an older app.
3. Write one formula per output column. Clean first inside the formula (replace CHAR(160) with a space, TRIM), return a blank rather than an error when a part is missing, and convert numbers and dates to real values when they will be summed or sorted. Where one spilling formula can fill all output columns, prefer it and say so.
4. Test each formula against every sample row in a table and show the actual result it would return. Do not mark a row as passing without working it through.
5. List the rows the formulas cannot handle safely (names with particles like "van der", titles, two people in one cell) and say how to catch them, for example a flag column with a count of parts.
</task>

<constraints>
- Use only functions that exist in {{app}}. If you are not sure the user's Excel build has REGEXEXTRACT or TEXTSPLIT, say so and give the fallback.
- Regular expressions in Google Sheets are RE2: no lookbehind or backreferences. Escape dots and other special characters.
- Do not claim a name split is reliable for every culture; family-name-first orders, single names and compound surnames exist. Flag ambiguous rows instead of guessing.
- Wrap only the part that can fail with IFERROR or IFNA, so real errors are not hidden.
- Use English-locale commas between arguments and note that some locales use semicolons.
- Do not repeat real personal data from the samples beyond what is needed to show the test.
</constraints>

<output_format>
## Pattern found
Bullets: the parts, the anchors, the variations.

## Formulas
For each output column: the target cell and the formula in a code block, then one line on how it works.

## Test against samples
Table: input | each extracted part | ok or problem.

## Rows that need a human
Bullets, with a flag formula if useful. Write "None found" if so.

## Older version fallback
A LEFT/MID/FIND version, or "Not needed".
</output_format>
