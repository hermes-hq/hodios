---
schema: 1
id: plan-move-downmarket
kind: prompt
title: Plan a move downmarket
description: Plans serving smaller customers with a simpler self-serve offer - what to strip out, price points, onboarding without sales, support at low cost and cannibalisation risk.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [downmarket, smb, self-serve, cannibalisation, unit-economics]
pairs_with:
  prompts: [design-free-tier, design-product-led-growth-motion, choose-sales-motion, design-pricing]
args:
  - name: product
    description: What the product does, current customers (size, average contract value), how you sell and onboard today, and cost to serve per customer if known.
    type: text
    required: true
  - name: reason
    description: Why you are considering it - smaller prospects you turn away, a cheaper competitor, slowing enterprise growth, investor pressure - with numbers where possible.
    type: text
    required: true
  - name: economics
    description: Sales and onboarding costs, support costs, gross margin, and what a small customer might pay. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is the move warranted, Target small customer, Offer design, Price and unit economics, Self-serve journey, Support model, Cannibalisation and channel conflict, Phased plan, Stop signals]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has launched SMB editions of sales-led products. Going downmarket fails in predictable ways. The product is too complex to adopt without a human, so activation collapses. The cost to acquire and serve each customer (sales calls, onboarding, support tickets) exceeds what a small customer pays over their lifetime, which is shorter because small businesses churn more. Existing mid-size customers downgrade to the cheaper plan. Sales teams resist because small deals do not pay commission. What works: a narrower offer built around the one job small customers need most, with sensible defaults instead of configuration, onboarding that reaches value in minutes, support through docs and community, price fences that keep larger customers on their plans (seats, limits, admin features), and economics checked before scale: payback period and churn assumptions must hold.

<product>
{{product}}
</product>

<reason>
{{reason}}
</reason>
{{#economics}}

<economics>
{{economics}}
</economics>
{{/economics}}
</context>

<task>
1. Test whether the move is warranted: demand evidence from small prospects, competitor pressure, and whether the core job matters to them.
2. Define the target small customer narrowly: size, buyer, job, and what they use today.
3. Offer design: what to keep, what to strip out or hide, and defaults that replace setup work.
4. Price and unit economics: candidate price points, an estimate of acquisition and serve cost per customer, expected churn and payback, with all arithmetic shown and assumptions labelled.
5. Self-serve journey: signup to first value, with the steps that currently need a human and how to remove them.
6. Support model at low cost: docs, in-product help, community, paid support tiers.
7. Cannibalisation and channel conflict: fences that stop current customers downgrading, sales compensation and partner conflicts.
8. Phased plan with a pilot cohort, success thresholds, and stop signals.
</task>

<constraints>
- Do not invent costs, churn rates or prices; where missing, use clearly labelled assumptions and show sensitivity.
- If unit economics do not work under reasonable assumptions, say so plainly.
- Keep the offer to one core job; resist porting the full product.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is the move warranted
## Target small customer
## Offer design
## Price and unit economics
| Item | Value | Basis |
## Self-serve journey
## Support model
## Cannibalisation and channel conflict
## Phased plan
## Stop signals
</output_format>
