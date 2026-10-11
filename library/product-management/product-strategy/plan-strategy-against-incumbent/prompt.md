---
schema: 1
id: plan-strategy-against-incumbent
kind: prompt
title: Plan a challenger strategy against an incumbent
description: Plans how a challenger product wins against a dominant incumbent - the underserved segment, the wedge, where not to fight, switching costs and the incumbent's likely response.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, product-manager, executive]
requires: [none]
inputs: [text, notes]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [challenger-strategy, incumbent, wedge, switching-costs, counter-positioning]
pairs_with:
  prompts: [choose-beachhead-segment, assess-competitive-advantage, plan-competitor-switching-campaign, write-product-strategy]
args:
  - name: our_product
    description: What you build, for whom, your stage, team and funding, and what customers who chose you say they like.
    type: text
    required: true
  - name: incumbent
    description: The dominant player - what you know of its product, customers, pricing, business model, sales motion and weaknesses, with sources.
    type: text
    required: true
  - name: market
    description: Market facts you have - segments, buying process, switching effort, recent shifts (technology, regulation, behaviour). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Incumbent's position, Where they underserve, Our wedge, Where not to fight, Overcoming switching costs, Likely incumbent response, Plan and milestones, Kill signals]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategist who has advised challengers that beat incumbents and many that did not. Challengers rarely win by being a slightly better version of the incumbent for the incumbent's best customers; those customers are well served, locked in and defended. They win by finding customers the incumbent overserves (too complex, too expensive) or underserves (a segment or workflow it ignores), or by counter-positioning: a model the incumbent cannot copy without hurting its own business, such as cheaper self-serve against a field sales force, or usage pricing against seat revenue. The wedge must be narrow enough to win completely, then expand. Switching costs (data migration, retraining, integrations, contracts) are usually the real competitor, not features. Incumbents respond predictably: ignore, bundle a "good enough" version, cut price for at-risk accounts, or lean on procurement relationships.

<our_product>
{{our_product}}
</our_product>

<incumbent>
{{incumbent}}
</incumbent>
{{#market}}

<market>
{{market}}
</market>
{{/market}}
</context>

<task>
1. Incumbent's position: what it is strong at, how it makes money, and what its business model makes it reluctant to change.
2. Where they underserve or overserve: segments, workflows or buyers poorly served, with the evidence given; mark guesses as hypotheses.
3. Our wedge: the one segment and job to win first, why we can win it decisively, and how it expands later.
4. Where not to fight: segments, features and deal types to avoid for now, and why.
5. Overcoming switching costs: what makes switching hard and concrete ways to cut it (import tools, run side by side, start with a new team or project, contract timing).
6. Likely incumbent response to each move, and how we stay viable if they bundle or cut price.
7. Plan and milestones for the next 12 months, with measurable signs the wedge is working.
8. Kill signals: evidence that would mean changing the wedge.
</task>

<constraints>
- Use only the facts given about the incumbent; do not invent its revenue, customers or roadmap.
- Separate evidence from hypotheses, and say how to test each hypothesis.
- Recommend one wedge, not a list of options.
- No advice on disparaging the competitor, misusing confidential information or poaching under non-compete or non-solicit terms; keep tactics lawful.
{{> output/uncertainty}}
</constraints>

<output_format>
## Incumbent's position
## Where they underserve
## Our wedge
## Where not to fight
## Overcoming switching costs
## Likely incumbent response
| Our move | Likely response | How we stay viable |
## Plan and milestones
## Kill signals
</output_format>
