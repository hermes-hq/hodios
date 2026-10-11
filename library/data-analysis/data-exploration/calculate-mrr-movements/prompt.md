---
schema: 1
id: calculate-mrr-movements
kind: prompt
title: Calculate MRR movements
description: Builds a monthly MRR bridge from subscription or billing data (new, expansion, contraction, churn, reactivation) with code, and reconciles opening plus movements to closing MRR.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, financial-analyst, founder, business-analyst]
stack: [sql]
requires: [none]
inputs: [schema, dataset, text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [mrr, saas-metrics, revenue-bridge, churn, subscriptions]
pairs_with:
  prompts: [explain-saas-metrics, forecast-subscription-revenue, decompose-revenue-change]
args:
  - name: billing_data
    description: The subscription or invoice tables (columns, types, sample rows), the billing system it came from, and how plans, discounts, annual plans, trials, taxes, credits and currencies appear.
    type: text
    required: true
  - name: rules
    description: Any rules you already use, for example "annual plans count as one-twelfth per month", "a customer who returns within 3 months is reactivation", "exclude tax". Optional.
    type: text
  - name: tool
    description: Where the calculation runs.
    type: enum
    enum: [postgres, bigquery, snowflake, redshift, mysql, sql-server, duckdb, pandas]
    default: postgres
output_contract:
  format: markdown
  sections: [Rules, Code, MRR bridge layout, Reconciliation, Questions to settle]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a SaaS finance analyst who builds MRR bridges that the board and the finance team both accept. The method is simple once the base table is right: compute MRR per customer per month, compare each month with the previous month for the same customer, and classify the change as new (no MRR ever before), reactivation (zero last month but not new), expansion, contraction or churn (MRR to zero). The hard part is the base table. Invoices are not MRR: annual and multi-year prepayments must be spread to a monthly value, one-off fees, usage overages, taxes and refunds are usually excluded, discounts should be netted where they are recurring, trials and paused subscriptions count as zero, and foreign currency needs a fixed rate or the bridge will show "expansion" that is really exchange-rate movement. Customer identity matters too: a merged or re-created account looks like churn plus new.
</context>

<task>
Build an MRR bridge in {{tool}}.

<billing_data>
{{billing_data}}
</billing_data>

{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}

1. Write the rules: what counts as MRR, how annual and multi-year contracts are normalised, discounts, trials, pauses, taxes and credits, currency handling, the month in which a change counts (effective date versus invoice date), and the customer key. Mark each rule as given or proposed.
2. Build a customer-month MRR table covering every month from each customer's first month to the last month of data, with zero where they paid nothing, so churn and reactivation can be detected.
3. Compare each customer-month with the previous month and classify the movement into new, expansion, contraction, churn or reactivation; keep the amount signed.
4. Aggregate into a bridge per month: opening MRR, each movement, closing MRR, plus customer counts for new, churned and reactivated.
5. Reconcile: opening plus the sum of movements must equal closing for every month, and closing MRR must equal the sum of customer MRR. Show the query for both.
6. List decisions the finance owner must confirm.
</task>

<constraints>
- Use only syntax valid in {{tool}}.
- Never treat invoice amounts as MRR without normalising multi-month billing; say how each billing period is converted.
- Convert currencies at a stated fixed rate (or report per currency) so exchange movements are not counted as expansion or contraction; if no rate is given, ask or report per currency.
- Do not invent prices, plan names or customer counts; use only what is in the data.
- Do not present the bridge as audited or as accounting revenue; MRR is a management metric, and recognised revenue follows accounting rules the finance team owns.
- Read-only: no DDL or writes.
</constraints>

<output_format>
## Rules
A numbered list, each marked given or proposed.

## Code
Code blocks with named steps: normalised MRR, customer-month table, movement classification, bridge.

## MRR bridge layout
The output table columns with a short example of two months using placeholder figures clearly marked as illustrative.

## Reconciliation
The reconciliation queries and what a failure usually means.

## Questions to settle
Numbered decisions for the finance owner.
</output_format>
