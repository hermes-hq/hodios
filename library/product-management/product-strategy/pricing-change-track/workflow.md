---
schema: 1
id: pricing-change-track
kind: workflow
title: Pricing change track
description: Takes a pricing change through gated steps, from research and options to an impact model, a communication plan and a rollout review, pausing for the owner's approval between steps.
category: product-strategy
version: 1.0.0
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
---
Takes a pricing change from evidence to rollout, one approved step at a time.

<current_pricing>
{{current_pricing}}
</current_pricing>

<goals>
{{goals}}
</goals>

First the research (what customers value, what they pay today and what the evidence says), then two to four pricing options, then a revenue and churn impact model for the chosen option, then the communication and rollout plan, and finally a review of results after launch. Each step produces one document and stops for the owner's approval or edits; later steps build on the approved versions rather than re-asking. The assistant never invents customer data, willingness-to-pay results, competitor prices or elasticity figures: unknowns become clearly labelled assumptions with ranges, or research to run. The owner makes every pricing decision. Pricing is never discussed or coordinated with competitors, and customer-facing terms are checked against existing contracts and consumer rules in the markets served.
