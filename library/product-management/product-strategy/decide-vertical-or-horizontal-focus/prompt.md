---
schema: 1
id: decide-vertical-or-horizontal-focus
kind: prompt
title: Decide between vertical and horizontal focus
description: Decides whether a product should specialise for one industry or stay general, from win rates, retention and needs by segment, and spells out what the choice changes in roadmap and sales.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, dataset, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [vertical-strategy, horizontal-strategy, segment-focus, market-focus, specialisation]
pairs_with:
  prompts: [prioritize-market-expansion, assess-product-market-fit, write-product-strategy, define-mvp-scope]
args:
  - name: product
    description: What the product does, its customers by industry or segment, and how you sell.
    type: text
    required: true
  - name: segment_data
    description: By segment, whatever you have - number of customers, revenue, win rate, sales cycle, retention or churn, feature requests that are specific to that industry, and customer acquisition cost.
    type: text
    required: true
  - name: context
    description: Competitors in each segment, team size, funding and runway, and what prompted the question. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Segment evidence, Vertical case, Horizontal case, Hybrid options, Recommendation, What changes, Reversal triggers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who has helped companies choose a focus. Going vertical means building for one industry's workflow, language, integrations and regulations: it raises win rates, pricing power and word of mouth inside a community, but caps the market and makes the product less useful elsewhere. Staying horizontal serves a common job across many industries: larger market, but more competition, weaker differentiation and a harder sales story. The evidence is usually already in the data: segments with much higher retention, shorter sales cycles and lower acquisition cost are where the product already fits. Many companies go vertical first to win, then widen. The decision changes the roadmap, the sales team, marketing channels, partnerships and hiring, so it is worth making explicitly.

<product>
{{product}}
</product>

<segment_data>
{{segment_data}}
</segment_data>
{{#context}}

<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. Segment evidence: compare segments on the metrics given; identify where fit is strongest and whether differences are large enough to matter given sample sizes.
2. Vertical case: which vertical, why, the specific needs to build (workflows, integrations, compliance, terminology), market size questions to answer, and the main risks.
3. Horizontal case: what the common job is across segments, how to differentiate, and the risks of staying general.
4. Hybrid options: vertical editions on a shared core, vertical go-to-market with a horizontal product, or sequence (vertical first, widen later), with costs.
5. Recommendation: one option with reasons from the evidence, and what you would stop doing.
6. What changes: concrete effects on roadmap, sales, marketing, support, partnerships and hiring over the next two quarters.
7. Reversal triggers: measurable signs that the choice is wrong, with dates to review.
</task>

<constraints>
- Use only the data given; note when sample sizes are too small to conclude.
- Do not invent market sizes or competitor positions; list them as questions to research.
- A recommendation must include what the company will stop or deprioritise.
{{> output/uncertainty}}
</constraints>

<output_format>
## Segment evidence
| Segment | Customers | Win rate | Sales cycle | Retention | CAC | Specific needs |
## Vertical case
## Horizontal case
## Hybrid options
## Recommendation
## What changes
## Reversal triggers
</output_format>
