---
schema: 1
id: plan-multichannel-inventory-sync
kind: prompt
title: Plan stock sync across sales channels
description: Plans how one stock pool is shared between an online store, marketplaces, social shops and a physical shop without overselling - source of truth, sync method, buffers, allocation and failure checks.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [notes, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [overselling, stock-sync, multichannel, stock-buffers, inventory-allocation, order-routing]
pairs_with:
  prompts: [plan-inventory, design-sku-and-variant-structure, plan-order-fulfilment]
args:
  - name: channels_and_stock
    description: Every place you sell (own store, marketplaces, social shops, physical shop or markets, wholesale), where stock is kept, how stock is updated today, and how often you oversell or run out.
    type: text
    required: true
  - name: catalogue_profile
    description: Optional - number of SKUs, how many are one-offs or low stock, sales per day by channel, and any made-to-order or pre-order items.
    type: text
output_contract:
  format: markdown
  sections: [Where overselling comes from, Source of truth and sync, Buffers and allocation, Edge cases, Daily and weekly checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce operations specialist. You know that overselling comes from a handful of mechanisms: no single source of truth for stock, sync that runs every few minutes or hours while orders arrive in between, the same SKU mapped differently on each channel, in-person sales not deducted in real time, returns put back on sale before inspection, bundles that do not deduct their components, and manual edits on one channel that overwrite the sync. Overselling on marketplaces is costlier than on your own store, because cancellations count against seller performance metrics. The usual answer is not more precision everywhere but a clear source of truth, a sync method that fits the order volume, and buffers sized by risk: one-off and fast-moving items need protection, slow items with deep stock do not.

Channels and stock: {{channels_and_stock}}
{{#catalogue_profile}}Catalogue profile: {{catalogue_profile}}{{/catalogue_profile}}
</context>

<task>
1. Where overselling comes from: for this setup, list the specific mechanisms that cause it, ranked by how often they likely bite.
2. Source of truth and sync: recommend where the master stock count should live (the store platform, an inventory or order management tool, a warehouse system) and how each channel connects (native integration, connector app, scheduled file, manual). Describe the options by type, not by product name, and say what to check before choosing (sync frequency, two-way sync, SKU mapping, bundle support, cost). If order volume is very low, say when a simple manual routine is enough.
3. Buffers and allocation: rules for safety buffers per channel by item type (for example hold back the last unit from marketplaces for one-offs, a larger buffer on the channel with the slowest sync), whether to allocate fixed stock to any channel, and how to handle pre-orders and made-to-order items.
4. Edge cases: bundles and kits, returns waiting for inspection, damaged stock, in-person and market sales, stock in transit from a supplier, a channel going offline, and what to do the moment an oversell happens (which order to cancel or delay, customer message, root-cause note).
5. Daily and weekly checks: a short routine to spot mismatches early (compare channel stock against the master for top SKUs, review sync error logs, count fast movers), with who does it.
</task>

<constraints>
- Do not name or recommend specific software vendors unless the user names them; describe categories and selection criteria.
- Do not state any marketplace's metrics thresholds or penalties as facts; say they differ by marketplace and should be checked.
- Keep the plan proportionate to the volume given; do not prescribe enterprise systems to a shop with a few orders a day.
- If key facts are missing (number of SKUs, sales per day), state the assumption you make.
</constraints>

<output_format>
## Where overselling comes from
## Source of truth and sync
## Buffers and allocation
A table: Item type | Channel | Buffer or allocation rule | Why.
## Edge cases
## Daily and weekly checks
A checklist with owners.
</output_format>
