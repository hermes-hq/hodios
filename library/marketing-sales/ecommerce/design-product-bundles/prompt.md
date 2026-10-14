---
schema: 1
id: design-product-bundles
kind: prompt
title: Design product bundles for an online shop
description: Designs product bundles, kits and multipacks for an online shop - which products, why customers would buy them together, pricing that protects margin, stock handling and how to test them.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [bundles, kits, multipacks, bundle-pricing, average-order-value, slow-stock]
pairs_with:
  prompts: [plan-cross-sells-and-upsells, design-sku-and-variant-structure, plan-multichannel-inventory-sync]
args:
  - name: catalogue
    description: Products with price, unit cost or margin, stock levels and sales rate; which items are often bought together if you know; slow sellers you want to move.
    type: text
    required: true
  - name: goals
    description: What bundles are for (raise order value, clear slow stock, gift season, starter kit for new customers, price anchoring) and your platform. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Bundle ideas, Pricing table, Stock and listing setup, Copy, Test and review, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce merchandiser who builds bundles that sell. Bundles work when they solve a whole job for the customer ("everything you need to start"), make a gift easy, or offer a clear saving on things bought together anyway. They fail when they hide slow stock inside an unappealing set, when the discount gives away the margin the bundle was meant to protect, or when stock is tracked badly and a bundle sells while a component is out. Different types serve different goals: a starter kit for new customers, a "complete the set" for existing ones, a multipack for consumables, a gift set for seasons, a mix-and-match "any three for" offer. Some platforms and marketplaces have specific rules for bundles, such as needing their own product code or barcode.

<catalogue>
{{catalogue}}
</catalogue>
{{#goals}}

Goals: {{goals}}
{{/goals}}
</context>

<task>
1. Bundle ideas: propose three to six bundles. For each: type, contents, the customer and the job it does, why they would want it now, and evidence from the catalogue data (bought together, complementary use, slow stock to move).
2. Pricing table: sum of individual prices, bundle price, discount percentage, cost of goods, margin in money and percent versus selling items separately, and the minimum price that keeps target margin. Flag any bundle that loses margin overall.
3. Stock and listing setup: tracking components versus a pre-packed bundle, what happens when a component runs out, product codes, marketplace rules to check, and packing notes.
4. Copy: a name and short description for each bundle that leads with the job it does, and a line showing the saving honestly.
5. Test and review: what to measure (bundle take rate, AOV, margin per order, cannibalisation of full-price sales, returns), for how long, and when to drop a bundle.
6. Assumptions.
</task>

<constraints>
- Use only prices, costs and stock figures given; mark any assumption.
- Savings claims must be calculated from the real individual prices; no inflated "worth" values or invented reference prices.
- Do not bundle items that are unsafe or regulated to sell together without flagging what to check (for example age-restricted items).
</constraints>

<output_format>
## Bundle ideas
## Pricing table
| Bundle | Separate price | Bundle price | Discount | Cost | Margin | Minimum price |
## Stock and listing setup
## Copy
## Test and review
## Assumptions
</output_format>
