---
schema: 1
id: design-revenue-model
kind: prompt
title: Design a revenue model
description: Compares revenue models - subscription, usage-based, transaction, marketplace, advertising or hybrid - against how a product creates value and how customers buy, and recommends one.
category: business-strategy
version: 1.0.0
status: incubating
aliases: [monetize-revenue-model]
stage: [plan, design]
role: [founder, product-manager, executive, business-analyst]
requires: [none]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [monetization, revenue-model, subscriptions, usage-based-pricing]
pairs_with:
  prompts: [design-pricing, model-unit-economics, analyze-business-model, design-free-tier]
  personas: [management-consultant]
args:
  - name: product
    description: What the product does, who uses it and who pays, the value it creates (time or money saved, revenue gained), how usage varies between customers, and its cost to serve.
    type: text
    required: true
  - name: market
    description: How customers buy today (self-serve, sales-led, procurement), budgets, what competitors and substitutes charge for if known, and any constraints such as app-store rules or regulation.
    type: text
  - name: current_model
    description: How the product makes money today, with numbers if any.
    type: text
output_contract:
  format: markdown
  sections: [Value chain, Model comparison, Recommendation, Tests before committing, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A revenue model decides what the company charges for, who pays and when, before any price is set. The right model charges along the axis on which customers get more value, fits how they buy and budget, and keeps revenue predictable enough to plan with. A model copied from another company often charges for the wrong thing: per seat when value grows with usage, or per transaction when buyers need a fixed budget.
{{#market}}
Market: {{market}}
{{/market}}
{{#current_model}}
Current model: {{current_model}}
{{/current_model}}
</context>

<task>
Product:
<product>
{{product}}
</product>

1. Map the value chain: who gets value, who pays, at which moment value is created, and what grows as a customer gets more value (seats, usage, transactions, outcomes, audience).
2. Compare the models that could fit: subscription, usage-based, transaction or take-rate, marketplace, advertising, licensing, services, and hybrids such as a base subscription with usage overage. Drop clearly unfit ones in one line each.
3. Score each remaining model on: alignment with value, revenue predictability, ease for the buyer to understand and budget, fit with the sales motion, implementation complexity (metering, billing, invoicing), and gross margin given cost to serve. Explain each score in a few words.
4. Recommend a primary model and, if justified, a secondary one, with the reasoning tied to the value chain and buying behaviour. Say what would make you choose differently.
5. Propose cheap tests before committing: customer interviews about budgets and procurement, a pilot with a few accounts, a pricing page variant, a usage analysis of existing customers.
6. List risks: revenue volatility, bill shock, gaming the metric, channel or app-store fees, migration of existing customers, and how to mitigate each.
</task>

<constraints>
- Do not quote competitor prices or market sizes from memory; use only what is given and list what to collect.
- Treat every estimate as an assumption and label it.
- Do not set price points here; hand off to pricing work once the model is chosen.
- If who pays or what value is created is unclear, ask that first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Value chain
Who gets value, who pays, when, and the value axis.
## Model comparison
A table: model, value alignment, predictability, buyer clarity, sales fit, complexity, margin, with short reasons.
## Recommendation
Primary and secondary model, why, and what would change the call.
## Tests before committing
Numbered tests with the decision each informs.
## Risks
Bullets with mitigations.
</output_format>
