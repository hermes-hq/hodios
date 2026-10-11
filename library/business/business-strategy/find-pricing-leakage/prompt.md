---
schema: 1
id: find-pricing-leakage
kind: prompt
title: Find pricing leakage
description: Audits how a business quotes, bills and renews to find revenue leaking away - ad-hoc discounts, unbilled extras, legacy prices, missed rises - and ranks the fixes by value.
category: business-strategy
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, operations-manager, business-analyst]
requires: [none]
inputs: [text, dataset, notes]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [revenue-leakage, quote-to-cash, unbilled-work, legacy-prices, margin-recovery]
pairs_with:
  prompts: [analyze-price-realisation, set-discount-policy, plan-owner-led-price-rise, design-pricing]
args:
  - name: business
    description: What you sell and how - how prices are set and quoted, contracts and renewals, how extra work or usage is billed, payment terms, who can change prices. Mention anything that feels loose.
    type: text
    required: true
  - name: evidence
    description: Any figures or samples - price list versus invoices, customers on old prices, write-offs, credit notes, unbilled hours, contract terms with index clauses, late payments. Optional but makes sizing possible.
    type: text
output_contract:
  format: markdown
  sections: [Where to look, Leaks found, Sizing, Fixes ranked, Controls to keep it fixed, Data to pull]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing and commercial-operations auditor. Most businesses lose 1 to 5 percent of revenue between the price they think they charge and the cash they collect, and it rarely shows up in any report. The common leaks are: discounts given without approval or never removed; customers left on prices from years ago; contractual price rises (index or annual uplift clauses) not applied; extra work, usage, rush jobs or change requests done but not billed; free delivery or setup beyond policy; credit notes and write-offs used to settle disputes; and late payment that is never charged for. Leaks are found by following the path from quote to cash and comparing what should have been billed with what was.
</context>

<task>
Find the pricing leakage in this business:

<business>
{{business}}
</business>
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Map the quote-to-cash path for this business (price list, quote, contract, delivery or usage, invoice, renewal, collection) and mark where control is weak, using the description given.
2. Check each common leak against the material: unapproved or permanent discounts, legacy prices, missed contractual increases, unbilled extras and scope creep, free services beyond policy, credit notes and write-offs, uncharged late payment, billing errors. For each say: found (with evidence), suspected (with the reason), or not indicated.
3. Size each found or suspected leak where the evidence allows, showing arithmetic, as an annual amount. Where it does not, give the formula and the data needed.
4. Rank fixes by value and ease: quick wins (apply missed rises at next renewal, start billing change requests), structural fixes (approval rules, contract clauses, billing automation) and customer-sensitive fixes (moving long-standing customers off legacy prices with notice).
5. For customer-sensitive fixes, suggest how to handle the conversation and the notice period, and which customers to treat individually.
6. Define controls that stop leaks returning: a monthly check, an owner, and a simple metric (for example billed versus list price, unbilled hours, share of customers on old prices).
7. List the data to pull to confirm the suspected leaks.
</task>

<constraints>
- Use only the figures given; never invent customer names, amounts or contract terms. Mark estimates as `assumption`.
- Price changes to existing customers must follow their contracts and local consumer and commercial law; tell the user to check notice and contract terms before acting.
- Do not suggest billing for work that was not agreed or done.
- For a transaction-level list versus net price waterfall, point to a dedicated price realisation analysis rather than guessing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where to look
The quote-to-cash path with weak points marked.

## Leaks found
Table: Leak | Status (found, suspected, not indicated) | Evidence.

## Sizing
Table: Leak | Annual value | Working.

## Fixes ranked
Numbered: fix, value, effort, risk to customer relationships.

## Controls to keep it fixed
Bullets with owner, frequency and metric.

## Data to pull
Bullets.
</output_format>
