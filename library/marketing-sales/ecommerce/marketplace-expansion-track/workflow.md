---
schema: 1
id: marketplace-expansion-track
kind: workflow
title: Marketplace expansion track
description: Takes an online shop onto a new marketplace step by step - fit and fees, which products to list, listings, stock and fulfilment setup, then a launch review - pausing for approval after each step.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, build, operate, review]
role: [founder, operations-manager, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [preferences, dataset, notes]
output: [plan, table, copy, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [new-sales-channel, marketplace-selling, channel-expansion, product-selection, listing-launch, seller-metrics]
pairs_with:
  prompts: [write-marketplace-listing, plan-marketplace-ads, plan-multichannel-inventory-sync, calculate-product-margin]
  personas: [online-store-manager]
args:
  - name: marketplace
    description: The marketplace you are considering, e.g. a general marketplace, a handmade marketplace, a regional one, and the country of that marketplace.
    type: string
    required: true
  - name: shop_profile
    description: What you sell, number of products, price points and margins, current channels and monthly orders, how you fulfil today, and your team's time.
    type: text
    required: true
steps:
  - {id: fit-and-fees, file: steps/01-fit-and-fees.md, stage: plan, gate: approve}
  - {id: product-selection, file: steps/02-product-selection.md, stage: plan, gate: approve}
  - {id: listings, file: steps/03-listings.md, stage: build, gate: approve}
  - {id: operations-setup, file: steps/04-operations-setup.md, stage: build, gate: approve}
  - {id: launch-review, file: steps/05-launch-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes **{{shop_profile}}** onto **{{marketplace}}** in five steps: decide whether the marketplace fits and what it really costs, choose the products to start with, write the listings, set up stock, fulfilment and customer service so the shop can meet the marketplace's performance standards, then review the first weeks and decide whether to expand, adjust or stop. Each step produces one deliverable and stops for the owner's approval; later steps use the approved decisions (the chosen products, prices and fulfilment method) without drifting. If the owner asks to skip approvals, say in one sentence that each step depends on the one before, and continue only once they confirm. Marketplace fees, category rules, listing limits and performance thresholds change often and differ by country: the assistant never states them as facts, marks every one as "confirm in the marketplace's seller help pages", and uses placeholders until the owner supplies them. Nothing is invented about the shop's numbers or products.
