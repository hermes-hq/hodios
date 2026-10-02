---
schema: 1
id: forecast-cash-flow
kind: prompt
title: Forecast 13-week cash flow
description: Builds a 13-week direct cash flow forecast from receivables, payables and recurring costs, flags the weeks where cash runs short, and lists the levers to close each gap early.
category: accounting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, financial-analyst, executive]
requires: [none]
inputs: [dataset, text]
output: [table, plan, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cash-forecast, thirteen-week, liquidity, working-capital]
pairs_with:
  prompts: [prepare-month-end-close, set-up-chart-of-accounts]
args:
  - name: cash_data
    description: Open receivables (customer, amount, due date, how late they usually pay), open payables and upcoming bills, payroll dates and amounts, rent, loan repayments, tax payments, expected new sales, and the forecast start date.
    type: text
    required: true
  - name: starting_balance
    description: Cash available in the bank on the forecast start date (all operating accounts combined).
    type: number
    required: true
  - name: minimum_balance
    description: The lowest cash balance you are comfortable holding. Optional; without it, a threshold of about two weeks of fixed outgoings is proposed.
    type: number
output_contract:
  format: markdown
  sections: [Headline, 13-week forecast, Shortfall weeks, Levers, Assumptions, Weekly update routine]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build a 13-week cash flow forecast the way a turnaround or treasury professional does: direct method (actual receipts and payments by week, not profit), conservative on timing of cash in, realistic on cash out, and updated weekly. Thirteen weeks is a quarter: long enough to see payroll, rent, tax and loan cycles collide, short enough to forecast from known invoices and bills. The point is to spot a shortfall six or eight weeks out, while there is still time to chase customers, move a payment or arrange financing, rather than discovering it the week payroll bounces.

Starting cash: {{starting_balance}}
{{#minimum_balance}}Minimum comfortable balance: {{minimum_balance}}{{/minimum_balance}}
</context>

<task>
Data:

<cash_data>
{{cash_data}}
</cash_data>

1. Set week 1 from the stated start date (or ask for it), and lay out weeks 1 to 13 with week-ending dates.
2. Receipts: place each receivable in the week it is likely to arrive, not when it is due. Apply each customer's known payment behaviour; if unknown, assume a lag (for example, 15 days after due) and say so. Put uncertain new sales in a separate line so they can be switched off.
3. Payments: payroll and payroll taxes on their actual dates, rent, loan repayments, supplier payments on their terms, recurring software and utilities, sales tax or VAT and income tax payments, and any known one-offs.
4. Compute net cash flow and closing balance each week. Opening balance of week 1 = starting cash.
5. Mark every week where the closing balance falls below the minimum balance (or zero), and the lowest point in the 13 weeks.
6. Run a downside case: the largest customer pays 30 days late and uncertain sales do not arrive. Report the lowest balance in that case.
7. List levers to close each gap, with the amount and the week it would help: collect specific overdue invoices, invoice earlier or ask for deposits, negotiate supplier timing, defer discretionary spend, and financing options in general terms.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the data given; any amount you had to estimate is labelled "est." and listed in the assumptions. Never invent customers, bills or dates.
- Arithmetic must be exact: each week's opening balance equals the previous week's closing balance.
- Do not recommend specific lenders or financing products, and do not advise on whether to delay tax or payroll payments; if those look necessary, say this needs urgent advice from an accountant or insolvency professional, since rules and penalties are serious.
- If a shortfall is within the next four weeks, put it in the headline and say so plainly.
- If the start date or a key element (payroll, receivables) is missing, ask for it before building the forecast.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Three lines: lowest balance and week, first shortfall week (or none), downside-case lowest balance.

## 13-week forecast
Table with weeks as columns (W1 to W13 with dates) and rows: opening balance, each receipt line, total receipts, each payment line, total payments, net flow, closing balance, below minimum (yes or blank).

## Shortfall weeks
Bullets: week, amount short, cause.

## Levers
Table: lever | amount | week it helps | effort or risk.

## Assumptions
Bullets.

## Weekly update routine
Short checklist: replace forecast with actuals, roll forward a week, compare variance.
</output_format>
