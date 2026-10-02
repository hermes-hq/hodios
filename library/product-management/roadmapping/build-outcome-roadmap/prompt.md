---
schema: 1
id: build-outcome-roadmap
kind: prompt
title: Build an outcome roadmap
description: Builds a now, next, later roadmap organised by outcomes rather than features, showing the bets, evidence and confidence behind each and what is deliberately left off.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive, tech-lead]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [now-next-later, outcome-based-roadmap, bets, product-planning]
pairs_with:
  prompts: [prioritize-features, write-roadmap-update, write-product-strategy]
args:
  - name: goals
    description: The company or product goals and outcomes for the period, with metrics and targets where known.
    type: text
    required: true
  - name: initiatives
    description: The candidate initiatives, requests and ideas, with any evidence, size estimates and dependencies.
    type: text
    required: true
  - name: horizon
    description: How far the roadmap looks ahead.
    type: string
    default: 2 quarters
output_contract:
  format: markdown
  sections: [Outcomes, Roadmap, Bets and evidence, Not on the roadmap, Dependencies and risks, How to read this roadmap]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head of product who replaces feature-and-date roadmaps with outcome roadmaps. A now, next, later roadmap commits firmly to what is being worked on now, less firmly to what comes next, and only to problems, not solutions, for later. Each column is organised by the outcome it serves, so stakeholders can see why work is there and the team keeps room to change solutions as it learns. Precision falls with distance: dates and scope belong in "now" only.

Horizon: {{horizon}}
</context>

<task>
Goals:

<goals>
{{goals}}
</goals>

Candidate initiatives:

<initiatives>
{{initiatives}}
</initiatives>

1. Turn the goals into two to four outcomes, each a measurable change in customer or business behaviour with a metric and, where given, a target. If a goal is an output ("launch X"), rewrite it as the outcome it is meant to drive and say so.
2. Map every initiative to the outcome it serves. Initiatives that serve no outcome go to "Not on the roadmap" with a reason, unless they are committed work (legal, security, contractual), which you list separately.
3. Place each mapped initiative in now, next or later, based on how strongly it moves the outcome, the evidence behind it, dependencies, and capacity if given:
   - now: in progress or starting this cycle; scoped, with an owner placeholder and a confidence level.
   - next: likely to start once now items finish; described as a bet with the problem and a candidate solution.
   - later: described as the problem or opportunity only, without a solution or a date.
4. For each item, state the bet: "We believe [initiative] will move [metric] because [evidence]", with confidence (high, medium, low) and how you will know early whether it is working.
5. List dependencies across items and teams, and the main risks to the plan.
6. Fit the roadmap to the {{horizon}} horizon. Anything beyond it is later by definition.
</task>

<constraints>
- No dates or delivery promises in next or later.
- Keep "now" realistic: if capacity is given, do not exceed it; if not, keep now to the items one team could reasonably run at once and say that capacity was not given.
- Use only the evidence provided; where you infer a link to an outcome, say so and lower the confidence.
- At most about 12 items across the roadmap; group small items.
</constraints>

<output_format>
## Outcomes
Numbered outcomes with metric and target.

## Roadmap
A table with columns Now, Next and Later and one row per outcome. Each cell lists items briefly.

## Bets and evidence
Table: item | outcome | bet statement | evidence | confidence | early signal.

## Not on the roadmap
Bullets with reasons, then committed work, if any.

## Dependencies and risks
Bullets.

## How to read this roadmap
Three to four sentences for stakeholders on what is committed and what can change.
</output_format>
