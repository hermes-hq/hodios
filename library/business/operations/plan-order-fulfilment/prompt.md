---
schema: 1
id: plan-order-fulfilment
kind: prompt
title: Plan order fulfilment for an online shop
description: Plans order fulfilment for a small online shop - pick and pack flow, packaging, carrier mix, shipping rates to charge, tracking messages and peak capacity, with the numbers behind each choice.
category: operations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, operations-manager]
subject: [ecommerce]
inputs: [notes, dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [fulfilment, shipping-rates, pick-and-pack, carriers, packaging, order-tracking, online-shop]
pairs_with:
  prompts: [design-returns-process, plan-peak-season-operations, plan-inventory, compare-vendors]
args:
  - name: order_volume
    description: Orders per day or week now and expected at peak, for example "20 a day, 80 a day in December".
    type: string
    required: true
  - name: products
    description: What you ship - sizes, weights, fragility, value, any items with shipping restrictions (liquids, batteries, perishables) - and how many SKUs.
    type: text
    required: true
  - name: location
    description: Where you ship from and to (domestic only, which countries), plus your current setup if any (packing at home, current carrier, platform).
    type: string
output_contract:
  format: markdown
  sections: [Fulfilment model, Pick and pack flow, Packaging, Carriers and services, Shipping rates to charge, Customer tracking messages, Capacity and peak, Weekly checks, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up fulfilment for small online shops. Fulfilment is where online margin quietly disappears: shipping charged below cost, packaging that adds a weight band, breakages, mis-picks and nights spent packing. A good setup has a fixed daily cut-off, a pick-pack-check-ship flow anyone can run, two or three packaging sizes that cover most orders, a carrier mix by parcel profile, and customer messages that stop "where is my order" emails before they start. You know carrier prices and services change often, so you design the decision and leave the current prices to be quoted.
</context>

<task>
Plan fulfilment for this shop.

Volume: {{order_volume}}
<products>
{{products}}
</products>
Shipping from and to: {{location}}

1. Fulfilment model: compare doing it in-house, a fulfilment partner (3PL) and print-on-demand or drop-ship where relevant, for this volume, and recommend one with the volume or pain point at which to revisit.
2. Pick and pack flow: storage layout by sales velocity, a daily cut-off time, batch picking, a packing station checklist, a check step before sealing (item, quantity, address), and labelling.
3. Packaging: the fewest box or mailer sizes that fit the range, protection for fragile items, and how packaging affects weight and size bands. Note restricted items from the product list and that their carrier rules must be checked.
4. Carriers and services: group orders into parcel profiles (small and light, standard, heavy or bulky, high value) and say which kind of service fits each (tracked economy, next day, signature, insured). Tell the owner which quotes to get and what to compare: price per band, collection versus drop-off, tracking, claims process, transit times.
5. Shipping rates to charge: options (free over a threshold, flat rate, by weight, real-time) with a worked example using placeholders for carrier costs, so the owner can see the margin effect.
6. Customer tracking messages: order confirmed, shipped with tracking, delayed, delivered, and failed delivery.
7. Capacity and peak: orders one packer can handle per hour (as a measurable estimate to replace with a timed test), staff needed at peak volume, and what to prepare before peak.
8. Weekly checks: on-time dispatch, mis-picks, damage claims, shipping cost as a share of order value.
</task>

<constraints>
- Do not quote carrier prices, transit times or restricted-item rules as fact. Use `[QUOTE: …]` placeholders and say where to get them.
- Recommend a carrier type, not a named carrier, unless the user named carriers to compare.
- Show every calculation with its inputs; label assumed figures "(assumed)".
- Keep the plan sized to the volume: no warehouse systems or staff a shop doing 20 orders a day cannot use.
</constraints>

<output_format>
## Fulfilment model
Table: Option | Fits when | Pros | Cons. Then the recommendation and the revisit trigger.
## Pick and pack flow
Numbered steps plus a packing station checklist.
## Packaging
Table: Size | Fits | Protection.
## Carriers and services
Table: Parcel profile | Share of orders | Service type | Quotes to get.
## Shipping rates to charge
Options and a worked example.
## Customer tracking messages
Five short messages.
## Capacity and peak
## Weekly checks
Table: Measure | Target | Action if missed.
## Questions
At most four.
</output_format>
