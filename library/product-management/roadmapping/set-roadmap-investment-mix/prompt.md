---
schema: 1
id: set-roadmap-investment-mix
kind: prompt
title: Set the roadmap investment mix
description: Sets how team capacity splits between new features, improvements, tech debt and bugs, with guardrails, how the mix shifts by product stage, and how to track it against reality.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, tech-lead, executive]
requires: [none]
inputs: [text, dataset, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [capacity-allocation, tech-debt, work-types, keep-the-lights-on, guardrails]
pairs_with:
  prompts: [balance-product-bet-portfolio, run-quarterly-planning, critique-roadmap, set-roadmap-change-rules]
args:
  - name: situation
    description: The product and its stage (new, growing, mature, being wound down), team size, and the main pains, for example rising incidents, slow delivery or no new features shipping.
    type: text
    required: true
  - name: current_split
    description: Optional. How time actually went last quarter or two by type of work, from your tracker or a rough estimate.
    type: text
  - name: goals
    description: Optional. The product or company goals for the coming period.
    type: text
output_contract:
  format: markdown
  sections: [Where time goes now, Recommended mix, Why this mix, Guardrails, How the mix shifts, Tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set an explicit split of a team's capacity between types of work: new capabilities, improvements to what exists, technical debt and platform health, and bugs and support. Without an agreed split, feature work wins every planning meeting, debt piles up until delivery slows, and then a dramatic "stabilisation quarter" stops everything. With a split, debt and quality work stop needing a fresh argument each time. The right mix depends on stage: an early product leans heavily to new capability, a mature product with many customers needs more for quality and debt, and a product being wound down mostly needs maintenance. Many teams also find their real split is far from what they believe, because unplanned work hides in "features".
{{#goals}}
Goals: {{goals}}
{{/goals}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

{{#current_split}}
Current split:

<current_split>
{{current_split}}
</current_split>
{{/current_split}}

1. Define the work types in plain words so items can be classified consistently, with an example of each from the user's situation. Say where grey cases go (for example a performance fix customers ask for).
2. Describe where time goes now from the user's data. If no data is given, say the first step is to classify the last one or two quarters of finished work, and explain how.
3. Recommend a target mix as percentages with a range, fitted to the product stage and pains. State the reasoning in terms of the situation, not generic ratios.
4. Set guardrails: a floor for debt and quality work that is not traded away for features, a cap on unplanned work before it triggers a conversation, and who can approve going outside the range.
5. Say how the mix should shift as the situation changes, for example after a major launch, when incidents rise, or when the product matures.
6. Set up tracking: how each item is tagged, how often the actual split is reviewed against the target, and what happens when they diverge.
</task>

<constraints>
- Present any percentages as a starting point with a range, not an industry law. Do not cite benchmarks or studies unless the user provided them.
- Use the user's numbers when given and show how you derived the current split.
- Do not recommend stopping all feature work unless the situation clearly calls for it, and if so give exit criteria.
- Keep the policy short enough for a team to remember.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where time goes now
Table: work type | definition | example | current share (or "unknown").

## Recommended mix
Table: work type | target share | range.

## Why this mix
Short paragraph tied to the situation.

## Guardrails
Bullets.

## How the mix shifts
Bullets: trigger and new mix.

## Tracking
Bullets: tagging, review rhythm, response to drift.
</output_format>
