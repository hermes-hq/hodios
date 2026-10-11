---
schema: 1
id: review-supplier-terms
kind: prompt
title: Review a supplier's terms as a business buyer
description: Reviews a supplier's terms and conditions or purchase agreement from a small business buyer's side - price changes, delivery, acceptance, defects, liability, minimums and whose terms apply.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [supplier-contract, purchase-terms, battle-of-forms, defective-goods, procurement]
pairs_with:
  prompts: [redline-contract, build-contract-obligations-register, explain-contract-clause]
args:
  - name: terms
    description: The supplier's terms and conditions, quote terms or supply agreement, with clause numbers.
    type: text
    required: true
  - name: purchase
    description: What you are buying, how often, rough annual spend, how critical it is to your business, and whether you have your own purchase order terms.
    type: text
    required: true
  - name: country
    description: Countries of buyer and supplier and the governing law named. Business buyers usually get fewer protections than consumers, and how much depends on the law.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Clause check, Whose terms apply, What to ask for, Message to the supplier, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small businesses often accept suppliers' standard terms by placing an order, without realising that business buyers usually get far less protection than consumers. The clauses that hurt: prices the supplier can raise between quote and delivery; delivery dates stated as estimates with no remedy for lateness; deemed acceptance after a few days or on delivery, which shortens the window to reject faulty goods; warranties limited to repair or replacement at the supplier's option, excluding the buyer's losses; liability caps at the price of the order; title retention, so goods are not the buyer's until paid for; minimum order or take-or-pay commitments; and automatic renewal of supply contracts. There is also the question of whose terms govern when both sides send their own (often called the battle of the forms): the answer depends on the law and on which document was sent or accepted last, so buyers who care should agree terms expressly. For critical supplies, the buyer's own losses from a failure (lost production, a missed customer deadline) are usually far larger than the order value.
{{#country}}

Countries and law: {{country}}
{{/country}}

<purchase>
{{purchase}}
</purchase>
</context>

<task>
<terms>
{{terms}}
</terms>

1. In brief: what the terms commit the buyer to, and the three most important issues given how critical this purchase is.
2. Clause check, quoting each clause: formation and whose terms apply, price and price changes, payment terms and late interest, delivery and remedies for lateness, risk and title, inspection and acceptance, warranties and defects, liability caps and exclusions, minimums and commitments, term and termination, force majeure, governing law and disputes.
3. Whose terms apply: explain the general issue and how the buyer's own order or acceptance could affect it, and suggest agreeing terms expressly; do not state the legal answer.
4. What to ask for: ranked asks with a reason and a fallback (fixed prices for a period, firm delivery dates with a remedy, a realistic inspection window, a cap tied to annual spend rather than one order, a carve-out for losses from defects).
5. Message to the supplier: short and professional, listing the asks.
6. Get a lawyer if: features of this purchase that warrant it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing.
- Do not say whether an exclusion or cap is enforceable; note that business-to-business rules vary and say what to check.
- Do not assume consumer protections apply to a business purchase.
- Scale the effort to the stakes: a small one-off purchase gets a short review.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## Whose terms apply
Short paragraph.

## What to ask for
Numbered: ask - reason - fallback.

## Message to the supplier
The message.

## Get a lawyer if
Bullets.
</output_format>
