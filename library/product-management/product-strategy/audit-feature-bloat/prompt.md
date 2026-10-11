---
schema: 1
id: audit-feature-bloat
kind: prompt
title: Audit a product for feature bloat
description: Audits a product's features on usage, revenue tie, support cost and complexity, and recommends which to cut, merge, hide or keep, with the evidence and the customers affected.
category: product-strategy
version: 1.0.0
status: incubating
stage: [review, plan]
role: [product-manager, designer, executive]
requires: [none]
inputs: [dataset, text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feature-bloat, simplification, product-complexity, feature-usage, maintenance-cost]
pairs_with:
  prompts: [plan-feature-sunset, analyze-feature-adoption, rationalize-product-line, write-product-principles]
args:
  - name: features
    description: The feature list with whatever you have per feature - usage (share of active users or accounts, frequency), which plans include it, revenue or deals tied to it, support tickets, bugs, engineering upkeep.
    type: text
    required: true
  - name: product
    description: What the product does, its core job, target users and the complaint that prompted the audit (complex onboarding, slow delivery, cluttered UI).
    type: text
    required: true
  - name: constraints
    description: Contracts or promises tied to features, regulated features, and appetite for change. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Core job, Feature scorecard, Cut, Merge, Hide or move, Keep and invest, Customer impact, Sequenced plan, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has simplified mature products. Every feature carries an ongoing cost: it adds UI surface that slows new users, test and support load, bugs, and constraints on every future change. Usage alone misleads: a feature used by 2% of accounts may be essential to the largest customers or a compliance need, while a popular feature may be a workaround for a missing one. The useful lens combines reach (share of active users or accounts), depth (frequency, reliance), revenue tie (deals or plans that depend on it), cost (support tickets, bugs, upkeep) and fit with the core job. Options go beyond cut or keep: merge overlapping features, hide advanced ones behind settings or a plan, move niche ones to an integration, or let them freeze. Removing anything needs a plan for affected customers.

<product>
{{product}}
</product>

<features>
{{features}}
</features>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. State the core job and the users the product must serve best.
2. Build a scorecard for every feature: reach, depth, revenue tie, cost, fit with the core job, each rated from the data and marked unknown where missing.
3. Cut: features with low reach, low revenue tie and real cost, with the evidence.
4. Merge: overlapping features to combine, and what the merged version is.
5. Hide or move: advanced or niche features to place behind settings, a higher plan or an integration.
6. Keep and invest: features central to the core job that are under-performing.
7. Customer impact: who is affected by each change, contracts or promises at stake, and the communication needed.
8. Sequenced plan: quick wins first, then larger removals, each with a success measure such as onboarding completion or support volume.
9. Data gaps to close before acting on uncertain items.
</task>

<constraints>
- Do not invent usage or revenue numbers; mark unknowns and do not recommend cutting a feature on missing data alone.
- Check every cut against named large customers, contracts or regulatory needs in the input.
- Recommend changes in an order that can be reversed if the data was wrong.
{{> output/uncertainty}}
</constraints>

<output_format>
## Core job
## Feature scorecard
| Feature | Reach | Depth | Revenue tie | Cost | Core fit | Verdict |
## Cut
## Merge
## Hide or move
## Keep and invest
## Customer impact
## Sequenced plan
## Data gaps
</output_format>
