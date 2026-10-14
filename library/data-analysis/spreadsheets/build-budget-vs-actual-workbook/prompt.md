---
schema: 1
id: build-budget-vs-actual-workbook
kind: prompt
title: Build a budget versus actual workbook
description: Builds a business workbook that maps a ledger export to budget lines and shows monthly and year-to-date budget, actual and variance with thresholds flagged, refreshed by pasting each month's export.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [financial-analyst, founder, manager, operations-manager]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [variance-report, management-accounts, ledger-mapping, year-to-date, month-end]
pairs_with:
  prompts: [explain-budget-variance, write-power-query, build-small-business-budget]
args:
  - name: ledger_export
    description: What the accounting system exports - columns (date or period, account code, account name, department, debit, credit or net amount), sign convention, and a few sample rows.
    type: text
    required: true
  - name: budget
    description: How the budget is held - lines, months, departments - and how budget lines relate to ledger accounts.
    type: text
    required: true
  - name: needs
    description: Who reads the report, the variance thresholds that matter (amount and percent), the financial year start, and Excel or Google Sheets.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Layout, Mapping, Actuals by line and month, Variance report, Thresholds and flags, Monthly refresh, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build budget-versus-actual workbooks for small finance teams and managers who own a budget. The mechanics fail in the same places: ledger accounts that are not mapped to any budget line, so spending silently disappears; sign conventions where costs come out positive and income negative (or the reverse), so variances flip; actuals pulled by account name instead of code; variance colours that treat higher income and higher cost the same way; year-to-date sums that include months not yet closed; and monthly refreshes done by retyping. The robust design keeps the raw export untouched on its own tab, maps every account code to a budget line in a mapping table, adds the line to each ledger row with a lookup, and builds actuals with SUMIFS by line and period. A variance is favourable when income is above budget or cost is below it, so the sign must depend on the line type. Small variances in percent on tiny lines and large ones in amount on big lines both matter, so flag only when both an amount and a percent threshold are passed.
</context>

<task>
Build the workbook.

<ledger_export>
{{ledger_export}}
</ledger_export>

<budget>
{{budget}}
</budget>

<needs>
{{needs}}
</needs>

1. Layout: tabs for Export (pasted raw each month), Mapping (account code to budget line, line type income or cost, report order), Budget (lines by month), Actuals (lines by month, formulas only), Report (selected month and YTD), and Settings (financial year start, selected month, thresholds, last closed month).
2. Mapping: the mapping table and the helper columns added beside the export: budget line by XLOOKUP or INDEX/MATCH on account code, period (first of month from the date), and signed amount converted to a single convention (for example costs positive, income positive by line type).
3. Actuals by line and month: `=SUMIFS(Export[SignedAmount], Export[Line], line, Export[Period], month)` or the range equivalent, laid out to match the Budget tab exactly.
4. Variance report: for the selected month and YTD (months from year start to the selected month, never past the last closed month): budget, actual, variance and variance percent, with the sign set so favourable is positive (income: actual - budget; cost: budget - actual), subtotals by section, and a full-year budget column.
5. Thresholds and flags: a flag when ABS(variance) is at least the amount threshold AND ABS(variance percent) at least the percent threshold, with conditional formatting for favourable and unfavourable, and a short column for the owner's explanation.
6. Monthly refresh: the exact steps: paste the export over the old one (or refresh Power Query if used), set the selected month, check unmapped codes, review flags. Suggest Power Query in Excel if the export layout is stable.
7. Checks: count of unmapped account codes (must be zero), total of mapped actuals equal to the export total for the same periods, Budget and Actuals line lists identical, and report totals equal to the Actuals tab.
</task>

<constraints>
- Never key in actual figures; everything comes from the export through formulas.
- Map by account code, not name; show any code without a mapping in a check list.
- No hard-coded thresholds, months or year start inside formulas.
- Use functions available in the user's tool, with an alternative where Excel and Google Sheets differ.
- Do not write the variance commentary; leave space for owners and point to a separate step for explaining variances.
- Test with three sample ledger rows, including one income line and one unmapped code, and show the results.
</constraints>

<output_format>
## Layout
## Mapping
Table: Column | Formula.
## Actuals by line and month
## Variance report
Table: Column | Formula | Sign rule.
## Thresholds and flags
## Monthly refresh
Numbered steps.
## Checks
</output_format>
