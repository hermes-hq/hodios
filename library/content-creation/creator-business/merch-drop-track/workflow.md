---
schema: 1
id: merch-drop-track
kind: workflow
title: Merch drop track
description: Takes a creator's merch from idea to shipped - testing demand, choosing print-on-demand or bulk stock, pricing from real unit costs, running a time-limited drop, then fulfilment and a post-mortem.
category: creator-business
version: 1.0.0
status: incubating
stage: [discover, plan, build, ship, review]
role: [content-creator, founder]
requires: [none]
inputs: [notes, preferences, dataset]
output: [plan, table, checklist, report]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [merch, print-on-demand, preorders, unit-economics, product-drop]
pairs_with:
  prompts: [design-merch-concepts, plan-creator-monetization]
  personas: [creator-business-manager]
args:
  - name: idea
    description: What merch you are thinking of, the in-jokes or designs your audience asks for, and why now.
    type: text
    required: true
  - name: audience
    description: Audience size and engagement per platform, email list size, where your audience lives (countries), and any past sales (products, units, prices).
    type: text
    required: true
  - name: constraints
    description: Optional. Budget you can risk on stock, storage space, time you can give, and your country.
    type: text
steps:
  - {id: demand, file: steps/01-test-demand.md, stage: discover, gate: approve, artifact: "merch/01-demand.md"}
  - {id: model, file: steps/02-choose-the-model.md, stage: plan, gate: approve, artifact: "merch/02-model.md"}
  - {id: price, file: steps/03-price-the-range.md, stage: plan, gate: approve, artifact: "merch/03-pricing.md"}
  - {id: drop, file: steps/04-run-the-drop.md, stage: build, gate: approve, artifact: "merch/04-drop-plan.md"}
  - {id: close, file: steps/05-fulfil-and-review.md, stage: review, gate: none, artifact: "merch/05-post-mortem.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a merch drop the way a careful creator business would: prove people will buy before spending on stock, pick the production model that fits the risk, price from real landed costs, sell in a time-limited window, then deliver what was promised and learn from the numbers. Each step writes one artifact and waits for approval.

<idea>
{{idea}}
</idea>

<audience>
{{audience}}
</audience>

{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

Rules for every step:
{{> guardrails/professional-limits}}
- Use only figures the user gives or gets from suppliers. Never invent supplier prices, platform fees, shipping rates or conversion rates; where a number is needed, show the formula and mark the input [X] or as a stated assumption.
- Designs must be the creator's own or properly licensed: no game logos, film characters, brand marks or fan art without permission.
- Consumer rules (returns, delivery promises, product safety and labelling, especially for children's items) and sales tax or VAT differ by country. Flag them as checks with an accountant or local guidance, not conclusions.
- Promise delivery times only from the supplier's stated times plus a buffer.
- End each artifact with open questions.
