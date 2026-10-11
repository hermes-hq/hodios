---
schema: 1
id: reconcile-daily-takings
kind: prompt
title: Reconcile daily takings
description: Sets up and runs a daily cash-up and takings reconciliation for a shop, cafe or venue - till report, card terminal, cash counted, float and banking - with variance limits and records.
category: accounting
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text, dataset]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [daily-takings, cash-handling, till-variance, card-terminal, point-of-sale]
pairs_with:
  prompts: [reconcile-payment-processor-payouts, reconcile-bank-account, set-up-internal-controls]
  personas: [bookkeeper]
args:
  - name: business
    description: The kind of business, number of tills and card terminals, other payment methods (vouchers, delivery apps, accounts), cash float size, who cashes up, and how often cash is banked.
    type: text
    required: true
  - name: days
    description: One or more days of figures to reconcile now - till or point-of-sale report by payment type, card terminal totals, cash counted, refunds, paid-outs, and cash banked. Optional; without it, you get the template and routine only.
    type: text
output_contract:
  format: markdown
  sections: [Daily cash-up sheet, Reconciliation of the days given, Variances and what to check, Weekly and monthly checks, Controls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up takings reconciliations the way an experienced retail or hospitality operator does. Every day, what the till says was sold, by payment type, should equal what was collected: card terminal batch totals, cash counted minus the float, vouchers and other tenders, after recorded refunds and paid-outs. Card and cash are reconciled separately because they go wrong differently: card differences usually come from manual terminal entries not rung through the till, split payments or a second terminal; cash differences come from wrong change, unrecorded paid-outs, refunds without a receipt, float errors and theft. Small variances happen; what matters is a set tolerance, a reason recorded for each variance over it, and a pattern check by person and day. Cash should be banked intact (not used to pay bills) so the bank deposit can be matched to the daily sheets, and the float should be counted and restored to the same amount each day.
</context>

<task>
Business:

<business>
{{business}}
</business>

{{#days}}Figures to reconcile:

<days>
{{days}}
</days>{{/days}}

1. Design a one-page daily cash-up sheet for this business: till report totals by tender, card terminal batch totals per terminal, cash count by denomination, float retained, paid-outs with receipts, refunds, cash to bank, variance per tender, signatures of the counter and a checker.
2. If figures were given, reconcile each day by tender: expected versus actual, variance in amount and percent, and whether it is within a tolerance (suggest one, for example a small fixed amount per till per day, labelled as a suggestion).
3. For each variance over tolerance, list the likely causes to check for that tender, in order of likelihood.
4. Give weekly checks (cash banked against the sheets and the bank statement, card settlements against terminal totals, refund and void volumes by staff member) and monthly checks (takings in the books against the till reports, float counted by a second person).
5. Recommend controls sized to the team: blind counts, two-person counts at close, banking cash intact, no cash paid-outs without a receipt, separate floats per till, and review of voids and no-sales.
6. Recompute every total before answering.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Do not invent sales or explanations.
- Describe variances neutrally. Do not accuse any person of theft; recommend checks and, for serious or repeated shortfalls, taking advice before acting.
- Do not give employment advice on deducting shortages from pay; say it is restricted in many countries and to check local rules.
- Keep the sheet printable and fast to fill at closing time.
</constraints>

<output_format>
## Daily cash-up sheet
A table template with blank cells.

## Reconciliation of the days given
Table: day | tender | expected | actual | variance | within tolerance. Write "No figures given" if none.

## Variances and what to check
Bullets per variance.

## Weekly and monthly checks
Checklist.

## Controls
Bullets.
</output_format>
