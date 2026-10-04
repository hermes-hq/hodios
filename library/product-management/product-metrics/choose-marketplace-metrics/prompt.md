---
schema: 1
id: choose-marketplace-metrics
kind: prompt
title: Choose metrics for a two-sided marketplace
description: Chooses metrics for a two-sided marketplace by stage, such as liquidity, match rate, time to first transaction and take rate, with definitions, balance checks and health measures for both sides.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, data-analyst, executive]
inputs: [notes, text]
output: [table, explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketplace, liquidity, two-sided, metric-definitions, supply-and-demand]
pairs_with:
  prompts: [define-north-star-metric, write-tracking-plan, diagnose-metric-drop, explain-saas-metrics]
args:
  - name: marketplace
    description: What is exchanged, who the buyers and sellers are, how a match happens (search, booking, bidding, assignment), how the marketplace earns money, and the geography or categories it covers.
    type: text
    required: true
  - name: stage
    description: pre-launch has no transactions yet; early has some transactions in a few markets or categories; scaling is growing across many markets.
    type: enum
    enum: [pre-launch, early, scaling]
    default: early
output_contract:
  format: markdown
  sections: [Marketplace model, North star, Metric set, Side health, Balance checks, Not yet, Data needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analytics lead who has worked on marketplaces for services, goods, rentals and labour. Marketplaces fail on liquidity: the chance that a buyer who arrives finds what they want, and that a seller who lists gets a transaction, within a reasonable time. Gross volume can grow while liquidity falls, for example by expanding into new cities faster than supply can follow. The right metrics depend on how matching works (a buyer searching a catalogue, a booking request a provider accepts, a job assigned to the nearest worker) and on which side is the constraint. Metrics also differ by stage: before launch, the questions are about seeding one side; when scaling, they are about balance, quality and economics in each market.
</context>

<task>
Choose metrics for this {{stage}} marketplace.

<marketplace>
{{marketplace}}
</marketplace>

1. If the description does not say who the two sides are and what is exchanged, ask and stop.
2. Marketplace model: the two sides, the unit of transaction, how a match happens, how money flows, which side is likely the constraint now and why, and the unit to measure liquidity in (a market is usually a city, category or category-in-city, not the whole platform).
3. North star: one candidate that reflects value to both sides (for example successful transactions where both sides are satisfied, or matched hours), with why it suits the model and what it can hide.
4. Metric set: for this stage, choose the metrics that matter, typically from: liquidity (share of searches or requests that lead to a transaction within a set time), match or fill rate, time to match, time to first transaction for new buyers and for new sellers, repeat rate per side, gross merchandise value, take rate, net revenue, and contribution per transaction once costs are known. For each: a precise definition with numerator, denominator and time window, the segment to cut by, the review cadence, and how it can be gamed or misread.
5. Side health: for supply, utilisation (share of listings or providers with a transaction in a period), earnings or sales concentration (how dependent the market is on a few top sellers), and churn; for demand, cohort retention, repeat purchase interval and failed searches. Say which of these to watch closely given the constraint side.
6. Balance checks: two or three signals that one side is outrunning the other in a market (for example rising time to match, falling seller utilisation), and the action each would prompt.
7. Not yet: metrics teams often track that are premature or misleading at this stage, with the reason.
8. Data needed: the events and fields required to compute the set (search, request, offer, accept, cancel, complete, review), and any metric that cannot be computed until those exist.
9. Before replying, check that every metric has a numerator, denominator and window, and that the set is small enough to review weekly (about six to eight metrics, plus side health).
</task>

<constraints>
- Do not give benchmark values or targets as fact; explain how to set targets from the marketplace's own baseline or by comparing markets within it.
- Tie every metric to the model described; drop generic metrics that do not fit how matching works here.
- Plain language with formulas written out in words.
</constraints>

<output_format>
## Marketplace model
## North star
## Metric set
A table: Metric | Definition (numerator / denominator / window) | Cut by | Cadence | Watch out for.
## Side health
## Balance checks
## Not yet
## Data needed
</output_format>
