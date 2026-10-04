---
schema: 1
id: plan-expansion-revenue
kind: prompt
title: Plan expansion revenue
description: Builds a ranked menu of expansion plays - seat growth, tier upgrades, add-ons, usage overage and services - each with trigger, segment, message and expected impact, plus an NRR target.
category: product-strategy
version: 1.0.0
status: incubating
aliases: [monetize-expansion-revenue]
stage: [plan, design]
role: [product-manager, founder, sales-rep, marketer]
requires: [none]
inputs: [text, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [expansion-revenue, upsell, net-revenue-retention, product-led-growth]
pairs_with:
  prompts: [prepare-renewal-conversation, design-pricing, explain-saas-metrics, map-subscription-lifecycle]
  personas: [customer-success-manager]
args:
  - name: product
    description: The product, its plans and prices, add-ons, how usage grows inside an account, and the sales motion (self-serve, sales-assisted, account managers).
    type: text
    required: true
  - name: customers
    description: Customer base facts - segments, account sizes, current net and gross revenue retention, usage against plan limits, common upgrade paths and reasons customers give for not upgrading.
    type: text
output_contract:
  format: markdown
  sections: [Expansion levers, Ranked plays, In-product and sales handoffs, NRR target, Guardrails]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Expansion revenue comes from customers who get more value and pay for it: more seats, a higher tier, an add-on, more usage, or services. The best plays fire at the moment the customer feels the need (hitting a limit, a new team joining, a compliance requirement) rather than on a sales calendar, and they never punish the customer for using the product.
{{#customers}}
Customers: {{customers}}
{{/customers}}
</context>

<task>
Product:
<product>
{{product}}
</product>

1. List the expansion levers that exist or could exist for this product: seat growth, tier upgrades, add-on modules, usage overage or higher usage tiers, and professional services. Say which already exist.
2. For each lever, design one or more plays with: the trigger event (product signal or account event), the target segment, the message in one or two sentences from the customer's point of view, the channel (in-product, email, account manager), and the expected revenue impact with the arithmetic and assumptions.
3. Rank the plays by expected impact against implementation effort, and mark quick wins.
4. Design the in-product upgrade prompts for the top plays (where they appear, what they say, what happens on click) and the handoff to sales or success for accounts above a size threshold.
5. Set a net revenue retention target: show current NRR if the data allows, the contribution each top play could add, and a realistic target with the assumptions.
6. Set guardrails: limits that degrade gracefully instead of breaking work, no surprise charges, and signals that a play is hurting satisfaction or retention.
</task>

<constraints>
- Show the arithmetic behind every revenue estimate and label assumptions.
- Do not recommend plays that hold customer data or work hostage, or charges the customer did not agree to.
- Use only the customer data given; say what to measure when it is missing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Expansion levers
Each lever, whether it exists today, and what is missing.
## Ranked plays
A table: play, trigger, segment, message, channel, expected impact, effort, rank.
## In-product and sales handoffs
Prompt designs for the top plays and the sales handoff rule.
## NRR target
Current NRR, contributions, target and assumptions.
## Guardrails
Bullets.
</output_format>
