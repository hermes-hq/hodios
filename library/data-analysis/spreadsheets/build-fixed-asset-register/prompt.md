---
schema: 1
id: build-fixed-asset-register
kind: prompt
title: Build a fixed asset register with depreciation
description: Builds a fixed asset register in Excel or Google Sheets with straight-line or reducing-balance depreciation by month, disposals, net book value and a period summary that ties to the ledger.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [financial-analyst, founder, operations-manager]
stack: [excel, google-sheets]
advice_risk: [financial]
inputs: [dataset, text]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [depreciation, asset-register, net-book-value, asset-disposals, fixed-assets]
pairs_with:
  prompts: [build-amortization-schedule, write-spreadsheet-formula, prepare-year-end-accounts-pack]
  personas: [bookkeeper]
args:
  - name: assets
    description: Your assets or a sample - description, category, purchase date, cost, expected useful life or rate, residual value, and any disposals with date and proceeds.
    type: text
    required: true
  - name: policy
    description: Your depreciation policy - method per category (straight-line or reducing balance), whether you charge a full month, a full year or pro rata in the year of purchase, the financial year end, and a capitalisation threshold.
    type: text
  - name: tool
    description: Excel or Google Sheets, and version if Excel.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Asset register columns, Depreciation formulas, Disposals, Period summary, Checks, Assumptions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build fixed asset registers in spreadsheets for small businesses and bookkeepers. The register must reproduce, for any period, each asset's cost, depreciation charge, accumulated depreciation and net book value, and those totals must agree with the ledger. The usual spreadsheet errors are: depreciating below residual value, continuing to charge after an asset is fully depreciated or sold, mishandling the first and last partial periods, hardcoding a charge that should be a formula, and mixing policy assumptions into formulas instead of a settings tab. Accounting depreciation policy is a choice the business makes under its accounting framework, and tax depreciation rules are separate and differ by country, so the sheet should hold the policy as inputs, not opinions.
</context>

<task>
Build the register in {{tool}}.

<assets>
{{assets}}
</assets>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Layout: tabs for Settings (financial year start, method and life per category, convention for the first month), Register (one row per asset), Schedule (depreciation by month or period), Summary (by category for a chosen period), and Disposals if needed.
2. Asset register columns: ID, description, category, location or owner, purchase date, cost, residual value, method, life or rate (looked up from Settings by category, overridable), disposal date, proceeds.
3. Depreciation formulas: give the exact formulas for monthly straight-line ((cost - residual) / life in months) and reducing balance (opening NBV x annual rate / 12, or the annual equivalent), with the first-month convention from the policy, a cap so accumulated depreciation never exceeds cost minus residual, and zero after disposal. Use functions available in {{tool}} and name ranges for readability.
4. Disposals: depreciation up to the disposal date per the policy, NBV at disposal, and gain or loss = proceeds - NBV.
5. Period summary: by category: opening cost, additions, disposals, closing cost; opening accumulated depreciation, charge, disposals, closing; opening and closing NBV, using SUMIFS on dates so the user picks a period.
6. Checks: cost minus accumulated depreciation equals NBV; closing balances roll forward; summary totals equal register totals; flags for assets past their life still being charged.
7. Assumptions to confirm: anything in the policy that was missing and what you assumed.
8. Worked example: show the first three months and the year-end figures for two of the user's assets.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Keep every policy choice on the Settings tab; no hardcoded rates inside formulas.
- Use only the user's assets and policy. If no policy is given, use straight-line with a clearly labelled assumption and ask the user to confirm with their accountant.
- Do not state tax depreciation or capital allowance rules; say they differ by country and are calculated separately from accounting depreciation.
- Test formulas against the worked example and show the numbers.
</constraints>

<output_format>
## Layout
## Asset register columns
Table: Column | Content | Formula or input.
## Depreciation formulas
Code blocks with each formula and the cell it goes in.
## Disposals
## Period summary
## Checks
## Assumptions to confirm
End with the worked example table: Asset | Month | Charge | Accumulated | NBV.
</output_format>
