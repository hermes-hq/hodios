---
schema: 1
id: analyze-working-capital
kind: prompt
title: Analyse working capital
description: Analyses a business's working capital with DSO, DIO, DPO and the cash conversion cycle from supplied figures, and recommends ways to free cash tied up in receivables and stock.
category: accounting
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [working-capital, cash-conversion-cycle, receivables, inventory, payment-terms]
pairs_with:
  prompts: [forecast-cash-flow, chase-late-payment, review-small-business-pnl]
  personas: [fractional-cfo]
args:
  - name: financial_figures
    description: Revenue and cost of sales for the period (say which period), trade receivables, inventory and trade payables at the period end (ideally opening too), customer and supplier payment terms, and any aged receivables or stock breakdown you have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The answer, Metrics, What the numbers say, Ways to free cash, Cash released, Watch-outs, Data to collect next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse working capital for a small or mid-sized business the way a turnaround-minded finance director would: find where cash is stuck between paying for things and getting paid, put a money figure on each day of improvement, and recommend practical changes in the order they pay off. Profitable businesses run out of cash when customers pay slowly, stock sits on shelves and suppliers are paid early. The metrics are simple; the value is in measuring them correctly and turning them into actions.
</context>

<task>
Figures:

<financial_figures>
{{financial_figures}}
</financial_figures>

1. Check the inputs: the period length in days, whether revenue includes sales tax while receivables do (adjust or flag), and whether average balances (opening plus closing, divided by two) can be used rather than period-end balances. State which you used.
2. Metrics, with formulas and numbers:
   - DSO (days sales outstanding) = trade receivables / revenue x days in period.
   - DIO (days inventory outstanding) = inventory / cost of sales x days.
   - DPO (days payables outstanding) = trade payables / cost of sales x days (note if purchases or total supplier spend would be a better base, for example when payables include overheads).
   - Cash conversion cycle = DSO + DIO - DPO.
   - Net working capital = receivables + inventory - payables.
   Compare DSO with the stated customer terms and DPO with supplier terms. If there is no inventory (a service business), skip DIO and say so.
3. What the numbers say: in plain words, where cash is stuck and how many days of revenue or cost it represents.
4. Ways to free cash, ranked by cash released and ease:
   - Receivables: invoice on delivery, clear terms, deposits or milestone billing, automated reminders and a chasing sequence, direct debit or card on file, fixing the oldest debts in the aged list. If early-payment discounts are considered, compute their annualised cost (for example 2% for paying 20 days early is roughly 2/98 x 365/20, about 37% a year) and show it is usually expensive.
   - Inventory: slow-moving and dead stock from any breakdown given, reorder points, smaller more frequent orders, clearing obsolete stock.
   - Payables: using the full agreed terms rather than paying early, negotiating terms with key suppliers without damaging relationships, aligning payment runs.
   - Financing options (invoice finance, overdraft) only as last-resort bridges, noting their cost.
5. Cash released: for each recommended improvement, the cash freed = days improved x daily revenue (for DSO) or x daily cost of sales (for DIO and DPO). Show a realistic and a stretch target.
6. Watch-outs: customers or suppliers this could strain, concentration in one large customer, seasonality distorting period-end balances.
7. Data to collect next to sharpen the analysis.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show every formula with numbers substituted; all arithmetic must be correct. State the day count used (365 or the period's days).
- Use only figures given. If a figure is missing, say which metric cannot be computed and ask for it; do not estimate a balance silently.
- Do not recommend specific lenders, factoring firms or software.
- Do not suggest paying suppliers later than agreed or anything that breaches contracts or prompt-payment laws; describe negotiation within agreed terms.
- Do not quote "industry benchmark" days as fact; if comparing, say benchmarks vary widely by sector and should come from a reliable source.
{{> output/uncertainty}}
</constraints>

<output_format>
## The answer
Cash conversion cycle in days, net working capital, and the single biggest lever with its cash value, in three lines.

## Metrics
Table: metric | formula with numbers | result | terms | gap.

## What the numbers say
One short paragraph.

## Ways to free cash
Ranked table: action | area | effort | expected days improvement | notes.

## Cash released
Table: action | realistic cash freed | stretch cash freed, with arithmetic.

## Watch-outs
Bullets.

## Data to collect next
Bullets.
</output_format>
