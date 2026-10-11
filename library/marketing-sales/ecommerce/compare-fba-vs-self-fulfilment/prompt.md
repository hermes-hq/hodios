---
schema: 1
id: compare-fba-vs-self-fulfilment
kind: prompt
title: Compare marketplace fulfilment, a 3PL and shipping yourself
description: Compares marketplace fulfilment (such as FBA), a 3PL and shipping yourself on cost per order, delivery speed, ranking effects and stock risk, and recommends a model per product group.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [ecommerce, supply-chain]
requires: [none]
inputs: [dataset, notes]
output: [table, report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fba, third-party-logistics, fulfilment-model, shipping-costs, multichannel, inventory-risk]
pairs_with:
  prompts: [calculate-amazon-fba-profit, plan-order-fulfilment, plan-multichannel-inventory-sync]
  personas: [online-store-manager]
args:
  - name: products
    description: The product range with size, weight, price, monthly units by channel, how fast each sells, and anything fragile, bulky, seasonal, regulated or high-value.
    type: text
    required: true
  - name: current_setup
    description: How you fulfil today, your channels (own store, Amazon, eBay, others), countries you ship to, monthly orders, staff time on packing, and any quotes you hold from a 3PL or fee figures from the marketplace.
    type: text
    required: true
  - name: priorities
    description: What matters most (cost, speed badges, branded packaging, cash tied in stock, your time) and any constraints. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Cost per order by model, Non-cost factors, Recommendation by product group, Transition plan, Risks and what to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce operations adviser. The fulfilment choice is rarely all-or-nothing, and the right answer usually differs by product. Marketplace fulfilment (Amazon FBA and its equivalents) tends to win for small, light, fast-selling items on that marketplace: it brings the fast-delivery badge, often lifts conversion and Buy Box share, and handles customer service and returns. It tends to lose for bulky, heavy, slow-moving or seasonal items, because storage, aged-stock surcharges and size-tier fees grow quickly, and for orders from other channels, where multichannel fulfilment fees are higher and packaging is unbranded. Stock sent to the marketplace is also stock you cannot easily sell elsewhere, and capacity limits can cap how much you send.

A 3PL suits sellers whose own-store volume has outgrown the garage, with several channels drawing on one stock pool; it adds receiving, storage, pick and pack, packaging and integration fees and usually a monthly minimum. Shipping yourself keeps control and branded packaging and is cheapest in cash at low volume, but the owner's time is a real cost, and meeting a marketplace's own fast-shipping programme from your premises requires consistent same-day dispatch.

Hybrid set-ups are common: fast movers in marketplace fulfilment, the rest from a 3PL or your own stock, with a backup in case the marketplace stock runs out.
</context>

<task>
Compare fulfilment models for this business.

<products>
{{products}}
</products>

<current_setup>
{{current_setup}}
</current_setup>

{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}

1. If you do not have sizes, weights and monthly units for the main products, ask for them in one message and stop.
2. Group the products by fulfilment profile: small and fast, small and slow, bulky or heavy, fragile or high-value, seasonal.
3. For each group, estimate the cost per order under marketplace fulfilment, a 3PL and self-fulfilment, line by line (storage, pick and pack, packaging, postage, returns handling, monthly minimums spread per order, and the owner's or staff time at a stated hourly rate). Use the supplied fees and quotes; label any placeholder.
4. Weigh the non-cost factors per group: delivery speed and badges, effect on conversion and Buy Box, branded experience on your own store, cash tied in stock and how many weeks of cover each model needs, capacity limits, risk of stock-outs and of stock stranded in one channel, and control over returns.
5. Recommend a model per product group, including a hybrid where it fits, and say what volume or fee change would flip the answer.
6. Outline the transition: a pilot group, inventory split, how stock syncs across channels, and what to measure in the first 60 days.
</task>

<constraints>
- Do not quote marketplace or 3PL fees from memory as current; use the seller's figures or labelled placeholders, and say where to verify.
- Include the owner's time as a cost; do not call self-fulfilment free.
- Do not recommend moving everything at once; start with a pilot group.
- Flag regulated, dangerous-goods or temperature-sensitive products, which marketplace fulfilment and many 3PLs restrict.
</constraints>

<output_format>
## Cost per order by model
A table per product group: Cost line | Marketplace fulfilment | 3PL | Self, with totals and which figures are placeholders.

## Non-cost factors
A table: Factor | Marketplace fulfilment | 3PL | Self, with notes per group where it differs.

## Recommendation by product group
Group, model, why, and the condition that would change it.

## Transition plan
Pilot, inventory split, sync, and a 60-day measure list.

## Risks and what to verify
Quotes and fee figures to confirm, restricted products, and contract terms to read (minimums, notice periods, liability for lost stock).
</output_format>
