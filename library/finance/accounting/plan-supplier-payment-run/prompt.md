---
schema: 1
id: plan-supplier-payment-run
kind: prompt
title: Plan a supplier payment run
description: Plans this week's supplier payment run from unpaid bills and available cash, ranking by due date, criticality, discounts and penalties, with what to defer and how to tell suppliers.
category: accounting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager]
requires: [none]
inputs: [dataset, text]
output: [table, plan, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [accounts-payable, payment-run, cash-management, supplier-relations]
pairs_with:
  prompts: [forecast-cash-flow, calculate-cash-runway, analyze-working-capital, prepare-month-end-close]
  personas: [bookkeeper, fractional-cfo]
args:
  - name: bills
    description: Unpaid supplier bills - supplier (or a code), amount, invoice date, due date, what it is for, and any early-payment discount, late fee or overdue reminders.
    type: text
    required: true
  - name: cash
    description: Cash available for this run, and money expected in and out over the next few weeks (customer receipts, payroll, tax payments, rent, loan repayments).
    type: text
    required: true
  - name: context
    description: Country, which suppliers you cannot trade without, and any payment arrangements already agreed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Cash position, Payment run, Deferred bills, Supplier messages, Controls, Watch next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small business owners decide which supplier bills to pay and when. A good payment run protects three things in order: obligations with legal or survival consequences (payroll, tax authorities, rent, secured loans, insurance), suppliers the business cannot operate without, and then everyone else by due date. Paying the loudest supplier first is the common mistake. Early-payment discounts are worth taking only when cash allows: a 2% discount for paying 20 days early is worth roughly 36% a year, which beats most borrowing costs. Deferring a bill is safer when it is agreed in advance than when a supplier discovers it, and stretching suppliers is a short-term tool, not a funding strategy. Paying on a fixed weekly or fortnightly run, with bank details verified, also prevents duplicate and fraudulent payments.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
Unpaid bills:

<bills>
{{bills}}
</bills>

Cash available and expected:

<cash>
{{cash}}
</cash>

1. Cash position: cash available now, committed outflows before the next run that must be protected (payroll, tax, rent, loan repayments), and the amount actually free for suppliers. Show the arithmetic.
2. Build the payment run: rank bills by consequence (legal or survival), then critical suppliers, then overdue bills, then due before the next run, then discounts worth taking. Fit them within the free cash and show the running total.
3. List deferred bills with a proposed pay date tied to expected receipts, and the risk of deferring each (late fees, stopped supply, interest, credit rating).
4. Draft a short, honest message to each supplier whose bill is deferred or part-paid, proposing a date or an instalment. One template plus any supplier-specific line.
5. Note payment controls for this run: bank details checked against the original record for any changed or new supplier, no duplicates against last run, and approval by a second person where possible.
6. Say what to watch before the next run, and flag if the pattern points to a cash shortfall that needs more than rescheduling (for example, talking to the bank, an accountant or a business adviser).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the bills and figures given; mark gaps as [X]. Do not invent due dates, discounts or penalties.
- Never recommend skipping payroll or tax payments to pay trade suppliers. If cash cannot cover them, say so plainly and recommend speaking to the tax authority and an accountant or insolvency adviser early.
- Do not suggest misleading suppliers about payment status (for example claiming a payment was sent when it was not).
- Late-payment interest and statutory rules vary by country; mention them only as something to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cash position
Short calculation.

## Payment run
Table: priority | supplier | amount | due | reason | running total.

## Deferred bills
Table: supplier | amount | proposed date | risk.

## Supplier messages
A template message plus supplier-specific lines.

## Controls
Checklist.

## Watch next
Bullets.
</output_format>
