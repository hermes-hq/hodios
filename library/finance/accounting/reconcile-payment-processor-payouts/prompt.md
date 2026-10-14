---
schema: 1
id: reconcile-payment-processor-payouts
kind: prompt
title: Reconcile payment processor payouts
description: Reconciles card processor, PayPal or marketplace payouts back to gross sales, fees, refunds, chargebacks and reserves through a clearing account, and drafts the journal entries.
category: accounting
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [founder, individual]
subject: [ecommerce]
requires: [none]
inputs: [dataset, text]
output: [table, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [clearing-account, merchant-fees, chargebacks, online-sales]
pairs_with:
  prompts: [reconcile-bank-account, prepare-month-end-close, set-up-chart-of-accounts]
  personas: [bookkeeper]
args:
  - name: payout_report
    description: The processor or marketplace payout or settlement report for the period - payout dates and amounts, and per-transaction lines for sales, fees, refunds, chargebacks, reserves and adjustments if you have them. Remove customer names and card details.
    type: text
    required: true
  - name: bank_deposits
    description: The deposits from that processor as they appear on your bank statement for the same period.
    type: text
    required: true
  - name: books
    description: How sales from this channel are currently recorded in your books (for example "each payout booked as sales"), plus the sales total your shop or invoicing system shows for the period. Optional.
    type: text
  - name: tax_context
    description: Country, and whether you charge VAT, GST or sales tax on these sales. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Result, Gross-to-net bridge, Payout matching, Differences explained, Journal entries, Set-up for next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small online sellers reconcile what their payment processors and marketplaces pay out. The most common bookkeeping error in online businesses is recording each bank deposit as sales. A payout is a net figure: gross sales minus processing fees, minus refunds and chargebacks, minus or plus rolling reserves and holds, sometimes minus marketplace commission, advertising, shipping labels or currency conversion, and it often covers sales from several days that straddle a month end. Booking the net payout as revenue understates sales, hides fees as an expense, and makes the tax figures on sales wrong. The fix is a clearing account for each processor: gross sales go in, fees and refunds come out, payouts transfer to the bank, and the clearing balance at month end equals money the processor still holds.

{{#tax_context}}Country and tax: {{tax_context}}{{/tax_context}}
</context>

<task>
Payout or settlement report:

<payout_report>
{{payout_report}}
</payout_report>

Bank deposits from this processor:

<bank_deposits>
{{bank_deposits}}
</bank_deposits>
{{#books}}

Current recording and shop sales total:

<books>
{{books}}
</books>
{{/books}}

1. State the result in one line: reconciled, or the size of the unexplained difference.
2. Build a gross-to-net bridge for the period from the report: gross sales, refunds, chargebacks and dispute fees, processing fees, marketplace commission or other deductions, reserves held and released, currency differences, and net payouts. Show the arithmetic, and compare gross sales with the shop or invoicing total if given.
3. Match each payout in the report to a bank deposit by date and amount. List unmatched payouts and unmatched deposits, and identify timing items (sales made this month, paid out next month, or the reverse).
4. Explain every difference with the most likely cause: payout in transit at period end, reserve or hold, a chargeback taken from a later payout, a currency conversion, a fee charged separately by invoice, or a missing report line. Where the cause is a guess, say so and say which report would confirm it.
5. Draft the journal entries for the period using a clearing account: gross sales (split tax if the person charges it), fees to a merchant fees expense, refunds and chargebacks, reserves as an asset, payouts to the bank. If the books currently record net payouts as sales, show the correcting entry for this period and say that earlier periods may need the same review.
6. Give a short set-up for next time: one clearing account per processor, which report to download each month, and the month-end check (clearing balance equals funds still held by the processor).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures supplied. Never invent transactions, fee rates or balances; mark missing figures as [X] and say which report holds them.
- Do not force a difference to zero with a plug entry. An unexplained amount stays visible with the next check to run.
- Do not decide the tax treatment of fees, marketplace-collected tax or cross-border sales. Describe the common treatments as questions for an accountant, because they differ by country and by marketplace.
- Account names are suggestions; tell the person to map them to their existing chart of accounts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Result
One line.

## Gross-to-net bridge
Table: line | amount | source, ending at net payouts.

## Payout matching
Table: payout date | payout amount | bank date | bank amount | status.

## Differences explained
Bullets, each with amount, likely cause and how to confirm.

## Journal entries
Table: date | account | debit | credit | note.

## Set-up for next time
Three to five bullets.
</output_format>
