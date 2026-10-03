---
schema: 1
id: prepare-vat-return-workpaper
kind: prompt
title: Prepare a VAT return workpaper
description: Organises a period's figures for a VAT, GST or sales tax return into a workpaper with sales and purchases by rate, adjustments, reconciliation to the books and checks before filing.
category: taxes
version: 1.0.0
status: incubating
stage: [build, verify]
role: [founder, operations-manager, consultant]
requires: [none]
inputs: [dataset, text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vat, gst, sales-tax, tax-return]
pairs_with:
  prompts: [check-sales-tax-obligations, prepare-month-end-close, plan-business-tax-calendar]
  personas: [bookkeeper]
args:
  - name: transactions_summary
    description: Sales and purchases for the period with net amounts and tax by rate or jurisdiction, exports and imports, reverse-charge or cross-border items, credit notes, bad debts, your accounting scheme (invoice, cash, flat rate) and the tax control account balance if you have one.
    type: text
    required: true
  - name: country
    description: Country (and state or province for sales tax) where you are registered.
    type: string
    required: true
  - name: period
    description: The return period, for example Q2 2026 or July 2026.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Output tax, Input tax, Adjustments, Return figures, Reconciliation, Checks before filing, Open items]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare the workpaper a careful bookkeeper builds before a VAT, GST or sales tax return is submitted: every figure on the return traced to the books, every unusual item explained, and the checks done that catch the classic errors. Those errors are predictable: reverse-charge items recorded on one side only, input tax claimed without a valid tax invoice or on blocked items, credit notes missed, exempt and zero-rated sales mixed up, imports double-counted, and a return that does not agree with the tax control account.

For US-style sales tax, the same discipline applies by jurisdiction: taxable versus exempt sales, exemption certificates on file, and marketplace sales where the platform already collected.

Country: {{country}}
Period: {{period}}
</context>

<task>
Figures for the period:

<transactions_summary>
{{transactions_summary}}
</transactions_summary>

1. Summarise the period: accounting scheme, totals, and anything unusual. Ask for anything essential that is missing (the scheme, credit notes, the control account balance).
2. Build the output tax schedule: sales by rate category (standard, reduced, zero-rated, exempt, outside scope) or by jurisdiction for sales tax, with net and tax amounts, and recompute the tax from net times rate to catch rate errors.
3. Build the input tax schedule: purchases by type, tax claimed, and items to exclude or check (missing tax invoices, blocked or restricted items, private use, partial exemption if exempt sales exist).
4. List adjustments: reverse charge (both sides), imports and postponed accounting, cross-border acquisitions, credit and debit notes, bad debt relief, and corrections of earlier periods with the threshold above which a separate disclosure may be needed (verify).
5. Map to the return: the figures for each box or line. Use box numbers only if you are confident of the current form for {{country}}; otherwise use descriptive line names.
6. Reconcile: return net tax against the tax control account movement, sales on the return against sales in the profit and loss for the period, and this period's tax-to-sales ratio against earlier periods if given.
7. Give a pre-filing checklist and list open items with who must answer them.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the figures given. Never invent transactions or balances; if a total is missing, leave the line blank and list it as an open item.
- Mark country-specific rules, rates, thresholds and box numbers "verify" unless you are confident they are current for {{country}}.
- Do not decide borderline treatments (whether a supply is exempt or zero-rated, whether a cost is blocked); flag them for the accountant with the reason.
- Show all arithmetic and make sure the schedules add up to the return figures.
- If you do not know the country's system, say "I don't know" for the specifics and use the general structure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Four to six bullets.

## Output tax
Table: category or jurisdiction | net | rate | tax recorded | tax recomputed | difference.

## Input tax
Table: type | net | tax claimed | include? | note.

## Adjustments
Table: item | effect on output tax | effect on input tax | evidence.

## Return figures
Table: box or line | description | amount | source.

## Reconciliation
Table: check | figure A | figure B | difference | explanation.

## Checks before filing
Checklist.

## Open items
Table: question | why it matters | who answers.
</output_format>
