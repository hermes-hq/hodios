---
schema: 1
id: run-value-chain-analysis
kind: prompt
title: Run a value chain analysis
description: Runs a value chain analysis of a business - where cost and differentiation are created across activities - and which activities to strengthen, simplify or outsource.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, review]
role: [executive, consultant, business-analyst, operations-manager]
requires: [none]
inputs: [text, dataset, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [value-chain, porter, cost-drivers, differentiation, activity-analysis]
pairs_with:
  prompts: [decide-in-house-or-outsource, assess-competitive-advantage, analyze-business-model, draft-wardley-map]
args:
  - name: business
    description: What the business sells and to whom, how it works end to end (sourcing, making, selling, delivering, servicing), cost breakdown if available, and what customers value.
    type: text
    required: true
  - name: competitors
    description: How main competitors run the same activities differently, if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Activities mapped, Cost profile, Sources of differentiation, Linkages, "Strengthen, simplify or outsource", Evidence gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run value chain analyses. The point is not to fill in Porter's diagram but to find, activity by activity, where the business spends money and where it creates something customers pay for, and to compare that with how rivals do it. Primary activities (inbound logistics, operations, outbound logistics, marketing and sales, service) and support activities (procurement, technology, people, infrastructure) are adapted to the business: a software firm has no warehouse, and a services firm's "operations" is delivery by people. The insights usually sit in three places: a large cost activity that adds little perceived value, a small activity that drives most of what customers value, and linkages between activities (better design cutting service costs, for example).
</context>

<task>
Analyse this business:

<business>
{{business}}
</business>
{{#competitors}}

<competitors>
{{competitors}}
</competitors>
{{/competitors}}

1. Map the value chain using activity names that fit this business, primary and support, with a one-line description of how each is done today.
2. Cost profile: allocate costs to activities where figures exist (as amount and share of total), and estimate the rest as low, medium or high with reasons. Identify the main cost drivers (scale, utilisation, location, complexity, labour mix).
3. Sources of differentiation: for each activity, what it contributes to what customers value, based on the material. Mark activities that are parity (must be done, not a reason to buy).
4. Compare with competitors where information is given: activities they do differently and the effect on their cost or offer.
5. Linkages: where improving one activity would reduce cost or improve value in another.
6. Recommendations: for each activity, strengthen (source of advantage), simplify or standardise (parity, high cost), or consider outsourcing or partnering (parity, not core, specialists can do it better), with the expected effect and the first step.
7. List the evidence gaps.
</task>

<constraints>
- Use the figures given; mark estimates and never invent cost shares as facts.
- Do not recommend outsourcing an activity that drives differentiation without stating the risk.
- Adapt activities to the business type rather than forcing a manufacturing template.
{{> output/uncertainty}}
</constraints>

<output_format>
## Activities mapped
Table: Activity | Type (primary or support) | How it is done today.

## Cost profile
Table: Activity | Cost (amount or estimate) | Share | Main driver.

## Sources of differentiation
Table: Activity | Value to customer | Parity or differentiator | Competitor comparison.

## Linkages
Bullets.

## Strengthen, simplify or outsource
Table: Activity | Recommendation | Expected effect | First step.

## Evidence gaps
Bullets.
</output_format>
