---
schema: 1
id: plan-product-drop-launch
kind: prompt
title: Plan a limited product drop
description: Plans the operations of a limited product drop on an online store - stock allocation, purchase limits, waitlist, bot and oversell protection, site readiness and a launch-hour run sheet.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, operations-manager, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [spec, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-drop, limited-edition, bot-protection, overselling, launch-day, purchase-limits]
pairs_with:
  prompts: [write-collection-drop-emails, plan-multichannel-inventory-sync, screen-orders-for-fraud]
  personas: [online-store-manager]
args:
  - name: drop
    description: What is dropping, units per variant or size, price, the date and time with timezone, channels (own store, app, marketplace, physical shop), and how much demand you expect (waitlist size, past drops).
    type: text
    required: true
  - name: setup
    description: Store platform and key apps, fulfilment set-up and packing capacity per day, team available on the day, and anything that went wrong in past drops. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Drop setup, Stock and limits, Bot and fraud protection, Site readiness, Launch-hour run sheet, After the drop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run launches for brands that sell in limited drops (streetwear, sneakers, collectibles, small-batch goods). A drop that sells out in minutes fails in predictable ways: bots and resellers buy most of the stock; stock shared across channels oversells and the brand has to cancel paid orders; the site slows or apps fail under load; staff do not know who decides what when something breaks; and the brand's customer service is flooded afterwards with "I had it in my cart" messages.

What experienced teams do: decide the allocation per size and channel in advance; set purchase limits per customer, per address and per payment card; use the platform's bot protection and checkout challenges, and screen orders afterwards for duplicate addresses, card and account patterns before shipping; give the waitlist or loyal customers early or exclusive access; consider a raffle or draw when demand far exceeds stock; remove heavy apps and scripts from the product and checkout pages; check with the platform or host about expected traffic; reserve stock for the drop so no other channel can sell it; and publish clear rules (limits, cancellation of duplicate or bot orders, no restocks or restocks planned) before the drop, not after.
</context>

<task>
Plan the drop.

<drop>
{{drop}}
</drop>

{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

1. If units per variant, the date and time, or the channels are missing, ask for them and stop.
2. Choose the drop format (first come first served, early access for the waitlist, raffle or draw) based on expected demand versus stock, and say why.
3. Allocate stock per variant and channel, set per-customer limits, and decide what to hold back for replacements and errors.
4. Plan bot and fraud protection: platform settings, checkout challenges, limits by address and card, and the order screening rules to apply before shipping, with the published rule that allows cancelling such orders.
5. Plan site readiness: what to switch off, what to test with a hidden product, inventory reserved from other channels, and who to tell about the traffic.
6. Write the launch-hour run sheet: times relative to the drop, who watches what, decision owners, and messages ready to post if the site fails, the drop sells out, or it is delayed.
7. Plan after the drop: order screening, packing capacity versus orders, customer service replies, and the review of what to change next time.
</task>

<constraints>
- Do not promise that bots can be fully stopped; describe layers and screening.
- Publish limits and cancellation rules before the drop; never cancel orders on rules customers were not told about.
- Do not recommend fake scarcity or false sell-out claims.
- Keep tool and app names generic unless the user named their platform; say which features to confirm with the platform.
</constraints>

<output_format>
## Drop setup
Format, time with timezone, access rules and published terms.

## Stock and limits
A table: Variant | Units | Channel allocation | Per-customer limit | Held back.

## Bot and fraud protection
Settings, checkout measures and the screening rules as a checklist.

## Site readiness
A checklist with owners and the test date.

## Launch-hour run sheet
A table: Time | Action | Owner | Decision if it goes wrong.

## After the drop
Screening, packing plan, customer service replies and the review questions.
</output_format>
