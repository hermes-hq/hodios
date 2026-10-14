---
schema: 1
id: explain-cloud-bill-to-finance
kind: prompt
title: Explain a cloud bill to finance
description: Explains a cloud bill to finance in business terms - what drives the cost, why it changed, a forecast, and which costs engineering can control and which it cannot.
category: writing
version: 1.0.0
status: incubating
stage: [operate]
role: [devops-engineer, engineering-manager, tech-lead]
requires: [none]
inputs: [dataset, notes]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cloud-costs, finops, cost-forecast, unit-economics, cost-drivers]
pairs_with:
  prompts: [reduce-cloud-spend, investigate-cloud-cost-spike, explain-tech-to-executives]
args:
  - name: bill
    description: Cost breakdown by service, account, team or tag for this period and earlier ones, and any commitments (reserved capacity, savings plans, credits).
    type: text
    required: true
  - name: question
    description: What finance asked, or what you need them to understand (a spike, a forecast, a budget request).
    type: text
    required: true
  - name: business_context
    description: Usage numbers that drive cost - customers, traffic, data volume, launches.
    type: text
output_contract:
  format: markdown
  sections: [Answer, Where the money goes, Why it changed, Unit costs, Forecast, What we can and cannot control, Glossary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Finance reads a cloud bill as a supplier invoice and expects it to be stable; engineers read it as usage. The translation that works is unit economics: cost per customer, per thousand requests or per terabyte, so growth in the bill can be compared to growth in the business. Finance also needs to know which lines are fixed, which scale with usage, which come from one-off events (a migration running two systems at once, a load test), and how commitments and credits distort the monthly numbers. Explanations fail when they list service names finance cannot map to anything, or promise savings engineering has not scoped.
</context>

<task>
Explain this cloud bill to finance.

<bill>
{{bill}}
</bill>

<question>
{{question}}
</question>
{{#business_context}}
<business_context>
{{business_context}}
</business_context>
{{/business_context}}

1. Answer the question in the first two sentences.
2. Group the cost into a few business categories (for example serving customers, storing data, internal development and testing, one-off projects) and show each with this period, previous period and change.
3. Explain the main drivers of change in plain words, separating usage growth, price or commitment changes, one-off events and waste.
4. Compute unit costs (cost per customer, per transaction or per terabyte) from any usage figures given and compare them to the previous period. If no usage figures are given, say which ones would make this possible.
5. Forecast the next periods with stated assumptions, as a range.
6. Separate what engineering can reduce (with rough effort and only if supported) from what is driven by business growth or contracts.
7. Define the cloud terms you had to use in a short glossary.
</task>

<constraints>
- Use only the figures given; show arithmetic; do not invent savings estimates, prices or discounts.
- Keep commitments, credits and taxes visible and say how they affect month-to-month comparison.
- Do not blame teams; describe drivers.
- Under one page plus tables.
</constraints>

<output_format>
## Answer
## Where the money goes
Table by business category with change.

## Why it changed
## Unit costs
## Forecast
## What we can and cannot control
## Glossary
</output_format>
