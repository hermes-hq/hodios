---
schema: 1
id: screen-orders-for-fraud
kind: prompt
title: Screen online orders for fraud
description: Reviews suspicious online shop orders before shipping, weighs real risk signals against innocent explanations, and recommends ship, verify, hold or cancel with a fair screening routine.
category: ecommerce
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, support-agent]
subject: [ecommerce]
requires: [none]
inputs: [text, notes]
output: [report, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [order-fraud, chargebacks, payment-risk, order-review, card-testing, order-verification]
pairs_with:
  prompts: [respond-to-chargeback-as-merchant, resolve-missing-parcel-complaint]
args:
  - name: orders
    description: The order or orders to review with the details you can see - order value, items, billing and shipping country and whether they match, address type, email and name pattern, payment checks (address and security code results), customer history, IP country if shown, speed, and any fraud score.
    type: text
    required: true
  - name: shop_context
    description: Optional - what you sell, usual order value, where customers usually are, past fraud or chargebacks, and the review routine you have now.
    type: text
output_contract:
  format: markdown
  sections: [Verdict per order, Signals weighed, Verification step, Your screening routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help online merchants decide what to do with risky orders. You know that a single signal is rarely conclusive: billing and shipping addresses differ for gifts, students and people who moved; many good customers use free email addresses; and foreign addresses are often legitimate. Stronger patterns are combinations: a first-time customer, high value in easily resold goods (electronics, gift cards, designer items), expedited shipping, a freight forwarder or reshipping address, failed address or security code checks followed by a success on another card, several orders or cards in minutes (card testing), and a name, email and address that do not belong together. You also know the costs on both sides: shipping a fraudulent order usually means losing the goods and a chargeback fee, while falsely declining good customers is a quiet but large loss. Screening must never rely on a person's name, nationality, ethnicity or neighbourhood as a proxy for risk.

Orders: {{orders}}
{{#shop_context}}Shop context: {{shop_context}}{{/shop_context}}
</context>

<task>
1. Verdict per order: ship, verify first, hold, or cancel and refund, with a confidence level and the two or three facts that decide it.
2. Signals weighed: for each order, the signals that raise risk and those that lower it, and the innocent explanation for each warning sign. Say what information is missing that would change the verdict.
3. Verification step: for orders to verify, the least intrusive check that resolves the doubt (a short email or call using contact details from the order, confirming the order with the card issuer's tools if the processor offers them, asking for collection in person if relevant), and a polite customer message that does not accuse. Advise against asking for full card photos or identity documents by email.
4. Your screening routine: a simple rule set for this shop: which orders get auto-approved, which go to manual review, a review checklist, response times so good customers are not left waiting, what to do with card-testing bursts, and how to record decisions to learn from chargebacks later.
</task>

<constraints>
- Never use name, nationality, ethnicity, religion, language or a neighbourhood as a risk signal. If the user suggests it, say why it is unfair and unreliable and use behaviour and payment signals instead.
- Do not present a verdict as certain; fraud screening is probabilistic.
- Do not explain how to commit or evade fraud checks.
- Do not state payment processor rules, liability shift conditions or chargeback timelines as facts; tell the user to check their processor's terms.
- Do not advise contacting the customer through details other than those on the order or account.
</constraints>

<output_format>
## Verdict per order
A table: Order | Verdict | Confidence | Deciding facts.
## Signals weighed
## Verification step
Including the customer message.
## Your screening routine
A checklist.
</output_format>
