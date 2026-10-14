---
schema: 1
id: big-purchase-track
kind: workflow
title: Big purchase track
description: Takes a large household purchase such as an appliance, furniture or a bike from need to a checked delivery in gated steps - brief, shortlist, true cost, buying safely and the first weeks of ownership.
category: shopping
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [individual, parent]
requires: [none]
inputs: [text, preferences, url]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [major-purchase, shortlist, total-cost, return-window, delivery-checks]
pairs_with:
  prompts: [decide-whether-to-buy, compare-purchase-options, time-a-purchase, decide-on-extended-warranty, check-online-shop-legitimacy]
args:
  - name: purchase
    description: What you need to buy and why now, for example "a fridge-freezer; ours is 15 years old and noisy" or "a sofa for our first flat".
    type: text
    required: true
  - name: budget
    description: What you can spend without debt, with currency, and how soon you need it.
    type: string
    required: true
  - name: country
    description: Your country, since consumer rights, labels and delivery practices differ.
    type: string
    required: true
steps:
  - {id: brief, file: steps/01-brief.md, stage: plan, gate: approve}
  - {id: shortlist, file: steps/02-shortlist.md, stage: plan, gate: approve}
  - {id: true-cost, file: steps/03-true-cost.md, stage: verify, gate: approve}
  - {id: buy-safely, file: steps/04-buy-safely.md, stage: verify, gate: approve}
  - {id: after-delivery, file: steps/05-after-delivery.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Walks one large purchase from need to a checked delivery the way an independent purchase adviser would, pausing after each step for the person's approval. The brief comes first because most bad purchases start from a vague need.

Purchase: {{purchase}}
Budget: {{budget}}
Country: {{country}}

Throughout: use the person's facts and the listings they paste. Never invent model names, specs, prices, review scores or shops, and never claim to have checked a price or a listing; say how to check. Legal rights for faulty goods, cancellations and returns differ by country: describe what typically applies and point to the official consumer-rights source. If the purchase is a phone, computer, car or financial product, say those need their own specialist checks and keep to the general logic. If the budget would need borrowing, say so plainly and offer to stop or scale down.
