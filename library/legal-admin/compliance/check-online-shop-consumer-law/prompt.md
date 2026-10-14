---
schema: 1
id: check-online-shop-consumer-law
kind: prompt
title: Audit an online shop against consumer law
description: Audits an online shop's product pages, checkout and order emails against consumer rules - pre-contract information, price display, order button, cancellation rights and returns - with a fix list.
category: compliance
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, marketer]
subject: [law, ecommerce, retail]
requires: [none]
inputs: [text]
output: [report, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [consumer-law, distance-selling, cancellation-rights, checkout, price-display, online-shop]
pairs_with:
  prompts: [write-refund-policy, write-shipping-policy-page, audit-website-privacy-compliance, write-online-store-terms-of-sale]
args:
  - name: shop
    description: What you sell and a walk-through of the shop - product page text, how prices and delivery costs are shown, the checkout steps and the final button label, the order confirmation email, your returns and cancellation text, and contact details shown. Paste text where you can.
    type: text
    required: true
  - name: markets
    description: Countries where your customers are, and where the business is based.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Findings by page, Missing information, Checkout and order button, Cancellation and returns, Pricing, Fix list, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit an online shop selling to consumers against distance-selling and consumer protection rules. In the EU and UK, the trader must give clear information before the order (identity and geographic address, main characteristics, total price including taxes and all delivery charges, payment and delivery arrangements, the right to cancel and how, who pays return costs, the legal guarantee, and any minimum contract duration), confirm the contract on a durable medium such as an email, and label the final button so it is clear the customer is committing to pay (strict in some countries such as Germany). Consumers usually have a 14-day right to cancel for goods from delivery, with exceptions for items such as personalised, perishable, unsealed hygiene goods and digital content where the customer agreed to immediate supply and acknowledged losing the right. Refunds, including standard outbound delivery, are due within a set period. Pre-ticked boxes for paid extras, hidden fees revealed late (drip pricing), fake countdown timers, fake scarcity and fake reviews are banned in many places. Statutory rights for faulty goods cannot be removed by a "no refunds" policy. In the US, rules are more fragmented: federal rules on shipping times and delays, the ban on unfair and deceptive practices, fee disclosure rules that cover some sectors only, and state laws on refund policy and fee disclosure, so posted policies must be honoured and clear.
</context>

<task>
Shop:
<shop>
{{shop}}
</shop>

Markets: {{markets}}

1. Findings by page: for product pages, basket, checkout, confirmation email and policy pages, list what is compliant, what is missing and what is risky.
2. Missing information: the pre-contract information items not shown or shown too late.
3. Checkout and order button: button wording, pre-ticked boxes, add-ons, account creation forced before price is clear, and pressure tactics.
4. Cancellation and returns: whether the right to cancel is explained correctly, the model form or equivalent, exceptions used correctly, refund timing, return costs, and any wording that wrongly limits statutory rights for faulty goods.
5. Pricing: tax-inclusive display, delivery and fees shown early, unit prices where needed, discount and reference price claims.
6. Fix list: each fix with priority (high for anything that could void terms or extend cancellation periods), effort, and suggested wording.
7. Points to verify for each market.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent time limits, fines or legal references; describe the typical rule and mark it "confirm for [market]". You may state the commonly known 14-day cancellation period for EU and UK distance sales of goods.
- Judge only what the user described; mark anything not described as "not checked".
- Do not suggest wording that removes or obscures consumer rights.
{{> output/uncertainty}}
</constraints>

<output_format>
## Findings by page
Table: page | compliant | missing | risky.

## Missing information
Checklist.

## Checkout and order button
Bulleted list.

## Cancellation and returns
Bulleted list.

## Pricing
Bulleted list.

## Fix list
Table: fix | priority | effort | suggested wording.

## Points to verify
Numbered list by market.
</output_format>
