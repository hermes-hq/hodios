---
schema: 1
id: design-portfolio-tracker
kind: prompt
title: Design a portfolio tracking spreadsheet
description: Designs a portfolio tracking spreadsheet with a transactions log, holdings, allocation against targets, money-weighted returns, dividends and rebalancing bands, with working formulas.
category: investing
version: 1.0.0
status: incubating
stage: [build, operate]
role: [individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [portfolio-tracking, spreadsheet-template, xirr, asset-allocation, rebalancing-bands]
pairs_with:
  prompts: [calculate-investment-returns, explain-rebalancing, write-investment-policy-statement]
  personas: [investing-educator]
args:
  - name: portfolio
    description: What you hold and where - accounts, roughly how many holdings, asset types (funds, shares, bonds, cash), currencies. Names and amounts are optional; no account numbers needed.
    type: text
    required: true
  - name: tool
    description: Which spreadsheet you use (Excel, Google Sheets, LibreOffice) and how comfortable you are with formulas.
    type: string
    required: true
  - name: wants
    description: What you want the tracker to show - for example allocation against targets, returns, dividends, fees, tax lots, net worth. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How the tracker is organised, Sheet layouts, Key formulas, Returns done right, Allocation and rebalancing bands, Prices and upkeep, Checks and pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most homemade trackers break for the same reasons: holdings are typed in by hand so they drift from reality, returns are calculated as current value over money paid in (which ignores timing of contributions and withdrawals), dividends and fees are forgotten, currency is mixed, and the sheet grows into something nobody can audit. A sturdy design keeps one transactions log as the single source of truth (date, account, ticker or fund, type, units, price, fees, currency) and derives holdings, cost and income from it with lookup and sum-if formulas. Money-weighted return comes from the dated cash flows with XIRR; time-weighted return needs valuations at each cash flow. Allocation is compared with targets using bands (for example an absolute band such as plus or minus 5 percentage points, or a relative band such as 25% of the target), so rebalancing triggers only when it matters. Live price functions (such as GOOGLEFINANCE in Google Sheets or the Stocks data type in Excel) are convenient but delayed, can fail or not cover every fund, so a manual price column with a date is a good fallback. Account numbers and passwords never belong in the sheet.

Portfolio: {{portfolio}}

Spreadsheet: {{tool}}
{{#wants}}Wanted views: {{wants}}{{/wants}}
</context>

<task>
1. Propose the sheet structure: Transactions, Prices, Holdings, Allocation, Returns, Income (and Lots if they want tax lots), with what each holds and how they link.
2. Give the column layout for each sheet as a table, with a few example rows using made-up tickers and numbers clearly labelled as examples.
3. Give the key formulas in their tool's syntax: units held per holding from transactions, average or lot cost, current value, unrealised gain, allocation percentage by asset class, drift from target, rebalancing flag, dividend income by year, fees by year, currency conversion. Explain each formula in one line.
4. Returns done right: how to build the cash-flow column for XIRR (contributions negative, withdrawals positive, current value as the final flow), the sign conventions, and when time-weighted return is needed instead.
5. Allocation and rebalancing bands: set up target and band columns and a flag that shows how much to buy or sell to get back to target.
6. Prices and upkeep: live price functions for their tool and their limits, a manual fallback, and a short monthly routine.
7. Checks and pitfalls: reconciliation against statements, units that do not match, stock splits, currency, double counting, and keeping personal identifiers out of the file.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Formulas must be valid for the stated tool; if a function differs between Excel and Google Sheets, give both. Do not invent functions.
- Use made-up example data only, labelled as examples. Do not suggest holdings or targets; if they have no targets yet, leave target cells for them to fill in.
- Do not ask for or include account numbers, logins or other sensitive identifiers.
- Keep it buildable in an hour by someone comfortable with basic formulas; put advanced extras last.
{{> output/uncertainty}}
</constraints>

<output_format>
## How the tracker is organised
Short paragraph and a list of sheets with their purpose.

## Sheet layouts
One table per sheet: column | contents | example.

## Key formulas
Table: what it calculates | formula | explanation.

## Returns done right
Short paragraph and the XIRR set-up.

## Allocation and rebalancing bands
Table and formulas.

## Prices and upkeep
Bullets and a monthly routine.

## Checks and pitfalls
Bullets.
</output_format>
