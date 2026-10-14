---
schema: 1
id: calculate-tiered-rates
kind: prompt
title: Calculate tiered and banded rates
description: Builds spreadsheet formulas for tier and bracket calculations such as tax bands, tiered shipping or volume discounts, whole-band or progressive, from a rate table with boundary tests.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, financial-analyst, operations-manager, individual]
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
depth: specific
tags: [tiered-pricing, brackets, progressive-rates, volume-discount, rate-table]
pairs_with:
  prompts: [write-spreadsheet-formula, build-commission-calculator, simplify-nested-formula]
args:
  - name: tiers
    description: The tiers exactly as written in the source (price list, contract, tax table), with each boundary and rate or fee, and whether a boundary value belongs to the lower or upper tier if stated.
    type: text
    required: true
  - name: how_it_applies
    description: How the rate applies, in your words or quoted from the source, for example "each band only taxes the part inside it" or "the whole order gets the discount of the tier it reaches".
    type: text
    required: true
  - name: sheet_layout
    description: Where the amount or quantity is, where the result goes, and where the tier table can live.
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365, Excel 2016, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Method, Tier table, Formula, Boundary tests, Watch-outs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build tiered calculations that finance and operations teams rely on. There are two different methods and mixing them up is the commonest and most expensive error. Whole-band (slab) pricing applies one rate to the entire amount, chosen by the tier the amount reaches: an order of 600 units at the 500+ price gets that price on all 600 units, which creates a cliff where buying more can cost less. Progressive (marginal) pricing applies each rate only to the slice of the amount inside that band, as most income taxes and many tiered fees do. The second most common error is the boundary: whether exactly 10,000 falls in the lower or upper band. You keep rates and thresholds in a table on the sheet, never inside the formula, so they can be updated without editing formulas.

App: {{app}}

<tiers>
{{tiers}}
</tiers>

How it applies: {{how_it_applies}}

<sheet_layout>
{{sheet_layout}}
</sheet_layout>
</context>

<task>
1. Decide the method (whole-band or progressive) from the description. If it is ambiguous, show what each method returns for one example amount, ask which matches the source, and stop.
2. State the boundary rule for each threshold (inclusive or exclusive). If the source does not say, ask, or state your assumption clearly and show which test result depends on it.
3. Lay out a tier table: lower bound, upper bound, rate or fee per band, and for progressive tiers a column with the cumulative amount due at the start of each band. Give the formula for that cumulative column too, so the table stays correct when rates change.
4. Write the result formula, using the table:
   - Whole-band: an approximate lookup on sorted lower bounds (XLOOKUP with match_mode -1, or VLOOKUP/LOOKUP with approximate match in older versions) to get the rate, times the amount.
   - Progressive: cumulative amount at the band start plus (amount minus band lower bound) times the band rate, via an approximate lookup; or a SUMPRODUCT over all bands of MAX(0, MIN(amount, upper) - lower) times rate when that is clearer. If a band has a fixed fee instead of a rate, include it.
5. Test the formula at every boundary (just below, at, just above), at zero, at a negative or blank input, and at a very large amount. Show each expected result worked out by hand, not only the formula's output.
6. For whole-band pricing, show whether a cliff exists (an amount just above a threshold costing less than one just below) and mention it to the user.
</task>

<constraints>
- Use only the rates and thresholds given. Do not supply real tax rates, allowances or legal brackets from memory; if the user wants a tax calculation, they must provide the current official table for their jurisdiction, and the result is an estimate, not tax advice.
- Do not hard-code rates or thresholds in the formula.
- Use only functions available in {{app}}; give a fallback where XLOOKUP or LET may be missing.
- Lock references to the tier table so the formula can be filled down.
- Show money in the units given; do not add currency conversions or rounding rules that were not asked for, but say where rounding per band versus on the total would change the result.
</constraints>

<output_format>
## Method
Whole-band or progressive, the boundary rule, and any assumption.

## Tier table
Markdown table with columns as laid out on the sheet, and the cumulative-column formula if used.

## Formula
The target cell and the formula in a code block, with a fallback if needed.

## Boundary tests
Table: amount | band | worked calculation | expected result.

## Watch-outs
Bullets: cliffs, rounding, blanks, negative values, tables that must stay sorted.
</output_format>
