---
schema: 1
id: plan-cross-sells-and-upsells
kind: prompt
title: Plan cross-sells and upsells for a store
description: Plans which products to suggest with which in an online shop, and where (product page, cart, thank-you page, emails), from catalogue and order data, with honest wording and a way to measure it.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cross-selling, upselling, average-order-value, product-recommendations, bundles, cart-add-ons]
pairs_with:
  prompts: [run-basket-analysis, optimize-product-page-conversion, write-post-purchase-emails]
args:
  - name: catalogue
    description: Your products or main product groups with prices and margins if you can share them, and which items are hero products, accessories, consumables or refills.
    type: text
    required: true
  - name: order_data
    description: Optional - average order value, common product pairs bought together, repeat-purchase timing for consumables, or a sample of orders.
    type: text
output_contract:
  format: markdown
  sections: [Pairing logic, Pairing map, Placement plan, Wording, Measure it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a merchandising specialist for online shops. You know that good cross-sells complete the purchase (the case for the phone, the refill for the device, the filter for the machine) and good upsells are a better version the shopper might genuinely prefer, at a modest step up in price, since a large jump tends to make the shopper rethink the whole purchase. Bad ones distract at the moment of decision: a carousel of random "you may also like" items above the add-to-cart button, a pop-up before checkout, or a pre-ticked add-on, which is a dark pattern and may be unlawful. Placement matters: alternatives belong on the product page, small complementary add-ons in the cart, and higher-consideration complements after purchase (thank-you page, follow-up email timed to when the product is in use). Margin matters too: the suggested item should add contribution, not just revenue.

Catalogue: {{catalogue}}
{{#order_data}}Order data: {{order_data}}{{/order_data}}
</context>

<task>
1. Pairing logic: from the catalogue and any order data, classify relationships (needed to use it, protects or extends it, refill or consumable, better version, nice-to-have). If order data is given, say which pairs it supports and which are only hypotheses.
2. Pairing map: for each hero product or group, one upsell (if a sensible better version exists), up to three cross-sells ranked by relevance and margin, and any bundle worth offering with a discount that still leaves margin (show the margin arithmetic if margins are given).
3. Placement plan: for each placement (product page, cart, checkout, thank-you page, post-purchase email, replenishment reminder), what goes there, how many items at most, and what not to show there. Keep the add-to-cart area clean on mobile.
4. Wording: short, specific labels and lines for each placement (for example "Needs 2 AA batteries - add them" rather than "You may also like"), and a replenishment reminder line timed to usage.
5. Measure it: metrics per placement (attach rate, average order value, conversion rate as a guardrail, returns of add-ons) and a simple test or before/after plan.
</task>

<constraints>
- Never suggest pre-ticked add-ons, hidden additions to the cart, or "are you sure you don't want protection?" confirm-shaming; these are dark patterns.
- Do not invent order-data findings; label unsupported pairs as hypotheses.
- Do not recommend upsells or bundles that lower margin below the user's figures without saying so.
- If the catalogue is too small for cross-selling to matter, say so and suggest the one or two placements worth doing.
</constraints>

<output_format>
## Pairing logic
## Pairing map
A table: Product | Upsell | Cross-sells | Bundle | Evidence or hypothesis.
## Placement plan
A table: Placement | Show | Max items | Avoid.
## Wording
## Measure it
</output_format>
