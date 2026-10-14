---
schema: 1
id: review-aged-receivables
kind: prompt
title: Review an aged receivables report
description: Reviews an aged receivables report to rank who to chase first, spot concentration and disputed or doubtful balances, and prepare bad-debt questions for the accountant.
category: accounting
version: 1.0.0
status: incubating
stage: [review, operate]
role: [founder, operations-manager]
requires: [none]
inputs: [dataset, text]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [aged-debtors, credit-control, days-sales-outstanding, bad-debt]
pairs_with:
  prompts: [chase-late-payment, write-credit-control-policy, forecast-cash-flow, analyze-working-capital]
  personas: [bookkeeper]
args:
  - name: aged_report
    description: The aged receivables or aged debtors report - customer, total owed, and amounts current, 1-30, 31-60, 61-90 and over 90 days overdue. Use customer codes or first names if you prefer.
    type: text
    required: true
  - name: notes
    description: What you know about the bigger or older balances - disputes, promises to pay, payment plans, customers in trouble, credit notes not yet issued, unapplied payments. Optional.
    type: text
  - name: context
    description: Your usual payment terms, monthly sales, and the cash pressure you are under. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Chase list, Risks spotted, Clean-up items, Questions for your accountant, Next month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small business owners turn an aged receivables report into action. An aged report is only useful if it is clean and if it changes what happens this week. Before chasing, a good credit controller checks the report itself: unapplied payments and credit notes sitting as separate lines, invoices already disputed, duplicates, and old balances that are really small differences nobody wrote off. Then they prioritise by value times age, not by who is easiest to call, because collection odds fall sharply as debt ages, and they watch concentration: one customer owing a large share of receivables is a business risk even if they pay. Writing a debt off or providing for it in the accounts is a judgement with tax and accounting rules behind it, so it belongs with the accountant.
</context>

<task>
Aged receivables report:

<aged_report>
{{aged_report}}
</aged_report>
{{#notes}}

Notes on balances:

<notes>
{{notes}}
</notes>
{{/notes}}
{{#context}}

Business context:

<context_details>
{{context}}
</context_details>
{{/context}}

1. Headline: total owed, the share overdue, the share over 60 and over 90 days, and the largest single customer as a share of the total. If terms and monthly sales are given, estimate days sales outstanding and show the arithmetic.
2. Build a chase list ranked by value and age, with the next action for each customer (reminder, call, statement, stop supply, payment plan, formal demand) and who should make it. Put customers with disputes in a separate group: the dispute has to be resolved before chasing works.
3. Name the risks: concentration, customers whose balance keeps growing, customers who pay older invoices late but new ones on time (or the reverse), and anything that suggests a customer is in financial trouble.
4. List clean-up items: possible unapplied payments or credit notes (negative or round-number lines), likely duplicates, tiny residual balances, and invoices too old to be realistic. Say what to check in the ledger for each.
5. Prepare questions for the accountant on balances that may be doubtful or uncollectable: whether to provide for or write off, and any tax relief or sales-tax adjustment on bad debts, as questions only.
6. Suggest what to watch next month and one or two process fixes (terms, deposits, credit limits) that the report points to.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures supplied; do not invent customers, dates or amounts. If the ageing buckets do not add up to the totals, say so first.
- Do not decide write-offs, provisions or tax adjustments; frame them as questions for the accountant.
- Do not suggest threatening, public naming or any collection step that may be unlawful. Formal steps (interest on late payment, demand letters, small claims) are "check the rules in your country".
- Keep the tone toward customers firm and professional; long relationships matter.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Four to six lines with figures.

## Chase list
Table: priority | customer | amount | oldest bucket | next action | owner. Disputed balances in a separate short table.

## Risks spotted
Bullets.

## Clean-up items
Table: item | why it looks wrong | what to check.

## Questions for your accountant
Bullets.

## Next month
Bullets.
</output_format>
