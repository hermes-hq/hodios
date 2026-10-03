---
schema: 1
id: build-commission-calculator
kind: prompt
title: Build a sales commission calculator
description: Builds a sales commission calculator with tiers, accelerators, caps and clawbacks from a written plan, with test cases that prove the formulas. Use when turning a comp plan into a spreadsheet.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build, verify]
role: [sales-rep, operations-manager, financial-analyst, manager]
stack: [excel, google-sheets]
inputs: [document, text]
output: [table, code, tests]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-commission, comp-plan, tiered-rates, accelerators, clawbacks]
pairs_with:
  prompts: [write-spreadsheet-formula, audit-spreadsheet-model]
  rules: [spreadsheet-modeling-rules]
args:
  - name: commission_plan
    description: The plan as written - quota and period, base rate, tiers or accelerators, caps, thresholds, draws, splits, clawback terms, and when commission is earned (booking, invoice or payment). Paste the actual wording if you can.
    type: text
    required: true
  - name: app
    description: Spreadsheet application to build it in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Plan as rules, Ambiguities, Workbook layout, Formulas, Test cases, Audit notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sales compensation analyst. Commission disputes almost always come from the same places: whether a tier rate applies only to the slice of sales inside the tier (marginal) or to every sale once the tier is reached (retroactive), what happens exactly at a boundary, whether a cap limits attainment or payout, and how a clawback interacts with a later period. You make those choices explicit, put every rate in a table rather than a formula, and prove the calculator with test cases computed by hand.
</context>

<task>
Turn this plan into a commission calculator in {{app}}.

<commission_plan>
{{commission_plan}}
</commission_plan>

1. Rewrite the plan as numbered rules: the measure (bookings, revenue, gross margin), the period and any true-up, quota, base rate, tiers with their lower and upper bounds, whether tiers are marginal or retroactive, accelerators and decelerators, thresholds below which nothing is paid, caps (on attainment or on payout), splits, draws (recoverable or not), clawbacks (trigger, look-back window, amount), and when commission is earned.
2. List every ambiguity, with the interpretation you will build and its effect in one example. Do not resolve material ambiguities silently: the plan owner decides. Typical ones: marginal versus retroactive tiers, whether a boundary value belongs to the lower or upper tier, whether a clawback uses the rate paid at the time or the current rate.
3. Workbook layout:
   - Plan sheet: an input table of tiers (lower bound, upper bound, rate) plus named cells for quota, cap, threshold, draw and clawback window. No rate appears in any formula.
   - Deals sheet: one row per deal with rep, close date, amount, split percentage, status (booked, cancelled), cancellation date.
   - Calculation sheet: one row per rep per period, with credited amount, attainment, payout before cap, payout after cap, clawbacks, draw recovery, amount due.
4. Formulas:
   - Marginal tiers: the sum over tiers of the amount falling inside each tier times its rate, with `SUMPRODUCT` over the tier table (amount above each lower bound, limited to the tier width) or a `LET` that names each piece.
   - Retroactive tiers: the rate found with `XLOOKUP` in next-smaller match mode (or `VLOOKUP` approximate match on an ascending table) times the whole credited amount.
   - Caps, thresholds and clawbacks as separate visible columns, not folded into one formula.
5. Write test cases computed by hand from the plan text, independent of the formulas: zero sales, just below the threshold, exactly at each tier boundary, just above it, a large amount that hits the cap, a split deal, and a deal cancelled inside and just outside the clawback window. The person can then type each case in and compare.
</task>

<constraints>
- Use only functions available in {{app}}; give an older-Excel fallback where you use dynamic-array functions. Comma separators; note once that some locales use semicolons.
- Every number from the plan lives in the Plan sheet. Formulas reference names or the tier table.
- Hand calculations in the test cases show their arithmetic, so a reviewer can follow them without the spreadsheet.
- Do not invent plan terms. If something needed for a calculation is not in the plan (for example the clawback window), mark it as an open question and use a clearly labelled placeholder.
- The written plan is the authority. If the sheet and the plan ever disagree, the sheet is wrong; say this once in the audit notes.
</constraints>

<output_format>
## Plan as rules
Numbered rules in plain language.

## Ambiguities
Table: Question | Interpretation used | Effect on one example | Who should decide.

## Workbook layout
Each sheet, its columns and the named cells.

## Formulas
Table: Column | Formula for the first row | What it does. Formulas ready to paste.

## Test cases
Table: Case | Inputs | Hand calculation | Expected payout.

## Audit notes
Three to five bullets: locking the Plan sheet, versioning the plan per period, reconciling payouts with payroll, and checking the test cases after any change.
</output_format>
