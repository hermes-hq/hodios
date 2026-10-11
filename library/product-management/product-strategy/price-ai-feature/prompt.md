---
schema: 1
id: price-ai-feature
kind: prompt
title: Price an AI feature
description: Prices an AI feature whose cost grows with usage, choosing between bundling, credits, usage limits and add-ons, with margin per user, heavy-user risk and abuse controls.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder]
requires: [none]
inputs: [text, dataset, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ai-pricing, usage-credits, cost-to-serve, gross-margin, fair-use]
pairs_with:
  prompts: [estimate-llm-feature-cost, design-pricing, evaluate-ai-feature-opportunity, define-ai-feature-metrics]
args:
  - name: feature
    description: What the AI feature does, who uses it, and how it fits the existing product and plans.
    type: text
    required: true
  - name: costs
    description: Cost per action or per user (model and infrastructure), expected usage per user and how skewed it is, and how costs may change.
    type: text
    required: true
  - name: current_pricing
    description: Your current plans and prices, gross margin target, and what competitors do for similar features if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Cost to serve, Value to the customer, Pricing options, Margin by user type, Recommendation, Limits and abuse controls, How to communicate it, What to monitor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing strategist for software products with AI features. Unlike most software features, an AI feature has a real marginal cost per use, and usage is highly skewed: a small share of users can generate most of the cost, so a flat price that looks profitable on the average user can lose money on the heavy ones. The options each trade simplicity against cost risk. Bundling into existing plans drives adoption but exposes margin; a fair-use cap protects it. Credits or usage tiers tie price to cost but add friction and anxiety. A paid add-on isolates the cost but limits adoption. Outcome pricing (per resolved ticket, per document processed) matches value but needs a measurable outcome. Model costs tend to fall over time, so lock-in to a price that only works at today's cost, or to one that is too cheap to raise later, are both mistakes.

<feature>
{{feature}}
</feature>

<costs>
{{costs}}
</costs>
{{#current_pricing}}

<current_pricing>
{{current_pricing}}
</current_pricing>
{{/current_pricing}}
</context>

<task>
1. Cost to serve: cost per action and per user per month for light, typical and heavy users, with arithmetic. Label assumptions.
2. Value to the customer: what the feature saves or earns, and whether that value tracks usage.
3. Pricing options: bundle with fair-use limit, credits, usage tiers, add-on, outcome-based; pros and cons here.
4. Margin by user type for the two strongest options, showing gross margin for light, typical and heavy users.
5. Recommend one approach, with the limits, price points to test, and how it changes as costs fall.
6. Limits and abuse controls: rate limits, caps, overage handling, account sharing, automated misuse.
7. How to communicate it so users understand what they get and what happens at a limit.
8. What to monitor: cost per user distribution, margin, adoption, limit hits and complaints, with thresholds that trigger a review.
</task>

<constraints>
- Do not invent model prices, costs or competitor prices; use given figures and label assumptions.
- Show every margin calculation.
- Limits must be stated plainly to users; no hidden throttling.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cost to serve
| User type | Actions per month | Cost per month |
## Value to the customer
## Pricing options
## Margin by user type
| Option | Light | Typical | Heavy |
## Recommendation
## Limits and abuse controls
## How to communicate it
## What to monitor
</output_format>
