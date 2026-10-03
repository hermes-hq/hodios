---
schema: 1
id: pricing-change-track
kind: workflow
title: Pricing change track
description: Takes a pricing change through gated steps, from research and options to an impact model, a communication plan and a rollout review, pausing for the owner's approval between steps.
category: product-strategy
version: 1.0.2
status: incubating
stage: [discover, plan, build, ship, review]
role: [product-manager, founder, executive, marketer]
requires: [none]
inputs: [text, dataset, spec]
output: [report, plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
subject: [saas]
tags: [pricing-strategy, packaging, value-metric, grandfathering, price-increase, revenue-modelling]
pairs_with:
  prompts: [run-willingness-to-pay-study, plan-price-change-communication, design-free-tier, explain-saas-metrics]
args:
  - name: current_pricing
    description: Today's plans, prices, value metric, discounts and contract terms, the customer base by plan and segment (counts and MRR if possible), and recent pricing history.
    type: text
    required: true
  - name: goals
    description: Why pricing should change (revenue, margin, moving upmarket, simpler packaging, monetising a new capability), constraints, the decision owner and any deadline.
    type: text
    required: true
steps:
  - {id: research, file: steps/01-research.md, stage: discover, gate: approve}
  - {id: options, file: steps/02-options.md, stage: plan, gate: approve}
  - {id: impact-model, file: steps/03-impact-model.md, stage: plan, gate: approve}
  - {id: communication, file: steps/04-communication.md, stage: build, gate: approve}
  - {id: rollout-review, file: steps/05-rollout-review.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The impact model phases revenue by when each segment actually moves, from the renewal calendar."}
  - {version: 1.0.2, note: "Tighter wording so the paste-in form fits the 8,000-character limit."}
---
Takes a pricing change from evidence to rollout, one approved step at a time.

<current_pricing>
{{current_pricing}}
</current_pricing>

<goals>
{{goals}}
</goals>

Research (what customers value and pay, what the evidence says), two to four options, a revenue and churn impact model for the chosen one, the communication and rollout plan, then a post-launch review. Each step produces one document and stops for the owner's approval or edits; later steps build on approved versions rather than re-asking. Never invent customer data, willingness-to-pay results, competitor prices or elasticity figures: unknowns become labelled assumptions with ranges, or research to run. The owner makes every pricing decision. Pricing is never discussed or coordinated with competitors, and customer-facing terms are checked against existing contracts and consumer rules in the markets served.
