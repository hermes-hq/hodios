---
schema: 1
id: analyze-customer-profitability
kind: prompt
title: Analyse customer profitability
description: Analyses profit by customer or client after discounts, service time and other costs to serve, ranks them on a profit curve, and suggests pricing, terms or service changes for the worst.
category: accounting
version: 1.0.0
status: incubating
stage: [review]
role: [founder, financial-analyst, operations-manager, executive]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-profitability, cost-to-serve, activity-based-costing, whale-curve]
pairs_with:
  prompts: [set-up-job-costing, calculate-product-margin, review-small-business-pnl]
  personas: [fractional-cfo]
args:
  - name: customer_data
    description: Per customer or client for a period - revenue, discounts, rebates and credit notes, direct costs or cost of goods, and, where you have them, hours spent, order count, returns, support tickets and payment days.
    type: text
    required: true
  - name: cost_to_serve
    description: Costs not yet assigned to customers (account management, support, delivery, admin) with totals and how they might be driven (hours, orders, tickets). Optional; without it, gross profit only is shown with a note.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Method, Customer profit table, Profit curve, Patterns, Actions, Data gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You work out which customers actually make the business money. Revenue rankings mislead: a big client with deep discounts, many small orders, heavy support and slow payment can earn less than a quiet mid-sized one. Customer profitability analysis takes net revenue (after discounts, rebates and credits), subtracts the direct costs, then assigns the cost to serve using the activity that drives it: hours, orders, deliveries, tickets, returns, and the financing cost of late payment. Ranking customers by that profit usually shows a curve where a minority generate more than all the profit and a tail destroys some of it.
</context>

<task>
Customer data:

<customer_data>
{{customer_data}}
</customer_data>

{{#cost_to_serve}}Costs to serve:

<cost_to_serve>
{{cost_to_serve}}
</cost_to_serve>{{/cost_to_serve}}

1. State the method: the period, how net revenue is calculated, which costs are direct, and how each shared cost is assigned (rate per hour, per order, per ticket), with the rate calculation shown. If shared costs were not given, show gross profit only and say what is missing.
2. Calculate profit per customer: net revenue, direct costs, gross profit, cost to serve by driver, customer profit and margin. Add a financing cost for slow payers if payment days are given (receivable balance times an annual rate, stated).
3. Rank customers and describe the profit curve: what share of customers generates what share of profit, and the total profit lost in the unprofitable tail.
4. Identify patterns: by size, segment, channel, discount level, order frequency or service intensity.
5. Suggest actions for the weakest customers, each with the estimated profit effect: price changes, minimum order sizes or delivery charges, service tiers, payment terms, renegotiating discounts, or, as a last resort, ending the relationship gracefully.
6. List data gaps that would most change the result.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the figures given; label any allocation assumption and show the arithmetic.
- Make sure assigned costs add back to the total shared costs given.
- Treat the results as a basis for conversations, not verdicts: some unprofitable customers have strategic value (reference, growth potential, fixed costs they help cover). Note where that may apply.
- Refer to customers as they are named in the data; do not invent customer details.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Three bullets: the share of profit from the top customers, the profit lost in the tail, the single biggest opportunity.

## Method
Short bullets and the cost driver rates.

## Customer profit table
Table: customer | net revenue | direct costs | gross profit | cost to serve | customer profit | margin | rank.

## Profit curve
Short description with cumulative percentages, or a small table.

## Patterns
Bullets.

## Actions
Table: customer or segment | action | estimated profit effect | risk.

## Data gaps
Bullets.
</output_format>
