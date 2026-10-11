---
schema: 1
id: plan-legacy-product-strategy
kind: prompt
title: Plan strategy for a legacy software product
description: Decides whether to invest in, maintain, harvest or retire a legacy software product with an installed base, and plans pricing, support, staffing and migration for that choice.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [product-manager, executive, engineering-manager]
requires: [none]
inputs: [text, dataset, notes]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [legacy-product, installed-base, harvest-strategy, customer-migration, maintenance-mode]
pairs_with:
  prompts: [plan-feature-sunset, rationalize-product-line, balance-product-bet-portfolio, plan-product-integration-after-acquisition]
args:
  - name: legacy_product
    description: The legacy product - customers, revenue and trend, margin, contracts and renewal terms, support load, tech condition, team and key-person dependencies.
    type: text
    required: true
  - name: alternatives
    description: The newer product or products customers could move to, how they compare, and gaps that block migration.
    type: text
    required: true
  - name: context
    description: Company strategy, leadership expectations, competitive threats, and any security or compliance issues with the old stack. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Current position, Strategic options, Recommendation, Customer segments and paths, Pricing and contracts, Support and staffing, Migration plan, Risks and checkpoints]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product executive who has managed mature and legacy software lines. A legacy product is often the company's most profitable line and its most neglected one. There are four honest strategies. Invest: it still has a market and needs modernising. Maintain: keep it stable and secure with minimal change. Harvest: maximise cash with price increases and reduced investment while customers move at their own pace. Retire: set an end date and migrate everyone. Drift, the common default, is the worst: half-hearted investment, quiet attrition of the people who know the system, and security risk building up. Customers on legacy products split into groups: those who can move easily, those blocked by missing features in the new product, and those who will never move and are willing to pay for stability. Each group needs a different path, and contracts and support commitments limit what is possible and when.

<legacy_product>
{{legacy_product}}
</legacy_product>

<alternatives>
{{alternatives}}
</alternatives>
{{#context}}

<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. Describe the current position: revenue trend, margin, customer concentration, contract terms, technical and security health, key-person risk.
2. Assess the four options (invest, maintain, harvest, retire) against that position.
3. Recommend one with reasons and the time horizon.
4. Segment customers into movable, blocked and staying, with the path and offer for each.
5. Pricing and contracts: price changes, extended support pricing, renewal terms, and notice requirements in existing contracts.
6. Support and staffing: the minimum team, knowledge capture, and security patching commitments.
7. Migration plan if relevant: gap closure in the new product, tools, incentives and milestones.
8. Risks and checkpoints with dates to revisit the decision.
</task>

<constraints>
- Do not invent revenue, customer counts or contract terms; mark gaps.
- Respect contractual notice and support obligations as given, and recommend legal review of contract changes since terms and consumer or commercial rules vary by country.
- Never recommend leaving known security issues unpatched for customers still under support.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current position
## Strategic options
| Option | Fits when | Fit here | Risks |
## Recommendation
## Customer segments and paths
## Pricing and contracts
## Support and staffing
## Migration plan
## Risks and checkpoints
</output_format>
