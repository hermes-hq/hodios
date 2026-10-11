---
schema: 1
id: build-three-statement-model
kind: prompt
title: Build a linked three-statement model
description: Builds a linked income statement, balance sheet and cash flow model in Excel or Google Sheets that balances every period, driven by revenue, cost, working-capital, capex and financing assumptions.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build, verify]
role: [financial-analyst, founder, business-analyst, student]
stack: [excel, google-sheets]
advice_risk: [financial]
inputs: [text, dataset]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [financial-model, balance-sheet, cash-flow, working-capital, balance-check]
pairs_with:
  prompts: [build-three-year-projections, build-cash-flow-statement, audit-spreadsheet-model, run-what-if-analysis]
  personas: [fractional-cfo]
args:
  - name: business
    description: What the business sells, how revenue is driven (units x price, customers x spend, contracts), cost structure, and the model period and frequency (monthly or annual, how many years).
    type: text
    required: true
  - name: opening_position
    description: The opening balance sheet (cash, receivables, inventory, fixed assets, payables, debt, equity) or say it is a new business starting from zero.
    type: text
    required: true
  - name: assumptions
    description: Growth, margins, overheads, collection and payment days, inventory days, capex and depreciation lives, tax rate as you understand it, debt terms, equity raises, dividends - and Excel or Google Sheets.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Structure, Assumptions tab, Income statement, Supporting schedules, Balance sheet, Cash flow statement, Balance check and debugging, Assumptions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build integrated three-statement models. The statements are linked by a small set of rules: net income flows to retained earnings; depreciation is a cost on the income statement, reduces fixed assets on the balance sheet and is added back in operating cash flow; every balance sheet movement other than cash appears once in the cash flow (an increase in receivables or inventory uses cash, an increase in payables provides it); capex, debt draws and repayments, equity raised and dividends appear in investing or financing; and closing cash on the balance sheet comes from the cash flow, never from a plug. If those links are complete, assets equal liabilities plus equity every period. Errors that break balance: sign mistakes in working-capital changes, a balance sheet item with no cash flow line, depreciation counted twice, opening balances not taken from the prior period, and retained earnings not rolling forward. A difference that is exactly twice an item usually means a sign error on that item. Interest on average debt or cash creates a circular reference; calculating interest on opening balances avoids it, or a circularity switch with iterative calculation keeps it controllable. Working-capital balances come from days: receivables = revenue x DSO / days in the period, inventory = COGS x DIO / days, payables = COGS (or purchases) x DPO / days.
</context>

<task>
Build the model.

<business>
{{business}}
</business>

<opening_position>
{{opening_position}}
</opening_position>

<assumptions>
{{assumptions}}
</assumptions>

1. Structure: tabs for Assumptions, Income Statement, Balance Sheet, Cash Flow, Schedules (fixed assets, working capital, debt, equity), and Checks; periods across in the same columns on every tab; inputs in one colour and formulas in another.
2. Assumptions tab: each driver by period with units and source, including days in period, and a scenario switch if the user wants more than one case.
3. Income statement: revenue from the user's drivers, cost of sales, gross profit, overheads, EBITDA, depreciation from the fixed-asset schedule, EBIT, interest from the debt schedule, tax (a simple rate on positive profit, labelled as a simplification), net income.
4. Supporting schedules: fixed assets (opening, capex, depreciation by the user's lives, closing); working capital (receivables, inventory, payables from days); debt (opening, draws, repayments, interest on opening balance, closing); equity (opening, net income, dividends, new equity, closing).
5. Balance sheet: every line linked to a schedule or the cash flow, opening column from the opening position.
6. Cash flow statement: indirect method: net income, add back depreciation, minus increases in receivables and inventory, plus increase in payables (and any other working-capital lines), operating cash flow; capex; debt and equity movements and dividends; net change; opening and closing cash, with closing cash linked to the balance sheet.
7. Balance check and debugging: a check row of assets minus liabilities minus equity rounded to the cent for every period, a summary check cell, a negative-cash flag (and a revolver or funding line if the user wants one), and a debugging routine: find the first period that fails, compare the difference with each balance sheet movement, and check signs.
8. Assumptions to confirm: tax, depreciation and anything simplified, and a note that tax and accounting treatment should be checked with an accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never force balance with a plug figure; if it does not balance, find the missing link.
- No hard-coded numbers inside formulas; every driver is on the Assumptions tab.
- Avoid circular references by default; if the user wants interest on average balances, add a switch and explain iterative calculation.
- Use the user's numbers; label every assumption you had to add.
- Show the first two periods with numbers and confirm the balance check is zero for them.
</constraints>

<output_format>
## Structure
## Assumptions tab
Table: Driver | Unit | Period values | Source.
## Income statement
Table: Line | Formula.
## Supporting schedules
## Balance sheet
Table: Line | Linked from.
## Cash flow statement
Table: Line | Formula.
## Balance check and debugging
## Assumptions to confirm
End with the first two periods' statements in figures.
</output_format>
