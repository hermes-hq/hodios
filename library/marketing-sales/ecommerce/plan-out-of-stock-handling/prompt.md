---
schema: 1
id: plan-out-of-stock-handling
kind: prompt
title: Plan how an online shop handles out-of-stock products
description: Sets the selling policy per product when stock runs out - sold out with a waitlist, backorder, pre-order or alternatives - with page and cart wording, customer messages and when to take payment.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, notes]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [out-of-stock, backorders, waitlist, sold-out, restock, product-page]
pairs_with:
  prompts: [write-back-in-stock-emails, plan-multichannel-inventory-sync, decide-discontinued-product-pages]
args:
  - name: products
    description: The products or product types that run out, how often, typical restock lead time and how reliable it is, and whether some are discontinued for good.
    type: text
    required: true
  - name: setup
    description: Store platform, marketplaces you also sell on, whether you can take payment before stock arrives, and what happens today. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Policy by product type, Page and cart wording, Customer messages, Search and ads, Rules to check, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce operations lead. Running out of stock is normal; handling it badly loses customers twice. The options trade off differently: hiding a product loses its search traffic and confuses returning customers; "sold out" with a back-in-stock waitlist keeps demand and tells you how much to reorder; backorders and pre-orders take money now but create a duty to deliver by a promised date, refund on request and keep customers informed; showing alternatives saves the sale only if they are real substitutes. The right choice depends on restock certainty: never take money for stock with no confirmed arrival date. Ads and shopping feeds must stop advertising unavailable items, and marketplaces penalise overselling.

<products>
{{products}}
</products>
{{#setup}}

Setup: {{setup}}
{{/setup}}
</context>

<task>
1. Policy by product type: for each product or group, choose hide, sold out with waitlist, backorder, pre-order, or show alternatives, based on restock frequency and certainty, and say why. For items discontinued for good, mark them as discontinued and leave the keep-or-redirect decision for the page to a separate search review.
2. Page and cart wording: the exact label, the expected date wording ("Expected to ship by [DATE]" only when confirmed), what the cart and checkout say, and a line on what happens if the date slips.
3. Customer messages: waitlist confirmation, back-in-stock notice, backorder confirmation, delay notice with a cancel-and-refund option.
4. Search and ads: keep or remove from shopping feeds, ads paused automatically, and marketplace listings set to zero stock. Keep the page live while a restock is expected.
5. Rules to check: rules on taking payment for goods not in stock, delivery deadlines and refund rights differ by country; list what to confirm.
6. Review: what to track (waitlist sign-ups to orders, backorder cancellations, lost-sale estimate) and when to change the policy.
</task>

<constraints>
- Never recommend taking payment without a confirmed restock date or showing dates that are not confirmed.
- Use only lead times given; mark assumptions.
- Do not state country law as fact; list what to check.
</constraints>

<output_format>
## Policy by product type
| Product or type | Restock certainty | Policy | Reason |
## Page and cart wording
## Customer messages
## Search and ads
## Rules to check
## Review
</output_format>
