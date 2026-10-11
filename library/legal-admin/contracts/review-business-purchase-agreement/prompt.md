---
schema: 1
id: review-business-purchase-agreement
kind: prompt
title: Review a small business purchase agreement
description: Reviews the agreement for buying or selling a small business - price mechanics, deferred and earn-out payments, warranties, indemnities, claim limits, restrictive covenants - from your side.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, individual]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [business-sale, asset-purchase, share-purchase, earn-out, warranties-and-indemnities]
pairs_with:
  prompts: [evaluate-buying-a-business, review-letter-of-intent, check-contracts-for-change-of-control]
  workflows: [contract-review-track]
args:
  - name: agreement
    description: The sale and purchase agreement or asset purchase agreement, with schedules if available, and clause numbers. Remove names and personal details.
    type: text
    required: true
  - name: your_side
    description: "buyer or seller."
    type: enum
    enum: [buyer, seller]
    default: buyer
  - name: deal
    description: What is being bought (shares or assets), the price and how it is paid, what was agreed in the letter of intent, and your biggest concerns.
    type: text
    required: true
  - name: country
    description: Country of the business and governing law. Tax, employee transfer and consumer rules on business sales vary.
    type: string
output_contract:
  format: markdown
  sections: [In brief, The price and how it is paid, Warranties and indemnities, Limits on claims, After completion, Gaps against what was agreed, Questions for your lawyer and accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reading from the {{your_side}}'s side. In a small business sale the headline price is only the start; the agreement decides how much is actually paid, when, and how much can be clawed back. Share purchases take the company with all its history; asset purchases pick what transfers but need each contract, lease and licence moved, and employees may transfer automatically in some countries. Price mechanics that move money: completion accounts or a locked box, working capital and debt adjustments, deferred consideration that depends on the buyer paying later, and earn-outs based on future profits the seller no longer controls. Risk sits in the warranties (statements about the business), the disclosure letter that qualifies them, specific indemnities for known problems, and the limits on claims: financial caps, a minimum claim size, a basket, time limits and exclusions. Restrictive covenants stop the seller competing or poaching. Buyers want broad warranties, long claim periods and security for payment (escrow, retention); sellers want tight warranties, full disclosure, low caps, short periods and security for deferred payments.
{{#country}}

Country and law: {{country}}
{{/country}}

<deal>
{{deal}}
</deal>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: share or asset deal, parties by role, price, structure, completion date, and the three most important issues for the user's side.
2. The price and how it is paid: each payment, when, conditions, adjustments, deferred amounts and earn-out terms (metrics, accounting rules, who controls the business, disputes), and any security. Show the minimum and maximum total the seller could receive using the agreement's own figures.
3. Warranties and indemnities: what is warranted, how disclosure works, specific indemnities, and gaps or overreach for the user's side.
4. Limits on claims: caps, de minimis, basket, time limits, exclusions, and how they interact, with a short example.
5. After completion: restrictive covenants, transition or handover duties, employees, contracts and premises transfer, consents, insurance.
6. Gaps against what was agreed: compare with the deal as described and the letter of intent.
7. Questions for the user's lawyer and accountant, specific to this agreement.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where missing.
- Do not say whether a term is enforceable, give tax advice, or value the business.
- Rate from the user's side; a long warranty period helps a buyer and hurts a seller.
- Always recommend a lawyer and an accountant for a business purchase or sale; this review prepares the user for those conversations.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Five bullets.

## The price and how it is paid
Table: payment | amount | when | conditions | security. Then minimum and maximum totals.

## Warranties and indemnities
Bullets.

## Limits on claims
Table: limit | clause | effect | example.

## After completion
Bullets.

## Gaps against what was agreed
Table: agreed | in the agreement | gap.

## Questions for your lawyer and accountant
Grouped by adviser.
</output_format>
