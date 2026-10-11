---
schema: 1
id: design-product-team-topology
kind: prompt
title: Design product team boundaries
description: Designs how to split product teams - by customer journey, segment, platform or capability - with ownership boundaries, dependencies, metrics per team and when to change it.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, executive]
requires: [none]
inputs: [text, notes]
output: [report, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [team-topology, product-ownership, squad-design, dependencies, team-missions]
pairs_with:
  prompts: [align-architecture-with-teams, plan-team-restructure, write-product-strategy, consolidate-team-roadmaps]
args:
  - name: product
    description: The product, its users and segments, the main user journeys, and the strategy for the next year.
    type: text
    required: true
  - name: teams
    description: Current teams, their size and what each owns, plus the pain - for example duplicated work, slow cross-team delivery, unclear ownership, teams with nothing important to do.
    type: text
    required: true
  - name: constraints
    description: Headcount plans, system architecture limits, locations and time zones, and anything leadership has fixed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Problems with today's split, Split options, Recommended structure, Team missions and metrics, Ownership boundaries, Dependencies and how to manage them, Transition plan, When to revisit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has designed product team structures at several stages of growth. The goal of a team split is that most valuable work can be delivered by one team without waiting on others, and that each team has an outcome it can move. The main options each have a cost. Splitting by customer journey or stage (acquire, activate, retain) aligns teams to metrics but cuts across code. Splitting by segment or persona keeps teams close to customers but duplicates shared capabilities. Splitting by product area or capability matches the code but can lose sight of end-to-end experience. Platform teams reduce duplication but become bottlenecks if they serve requests instead of offering self-service capabilities. Structure should follow strategy: the area of most strategic importance deserves a team with clear ownership. Team boundaries also need to fit the system architecture or the dependencies will dominate; re-organising too often costs more than a slightly imperfect structure.

<product>
{{product}}
</product>

<teams>
{{teams}}
</teams>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Diagnose problems with the current split, linking each pain to a cause (unclear ownership, cross-team dependency, mismatch with strategy or architecture).
2. Lay out two or three split options for this product, with the trade-offs of each.
3. Recommend one structure, showing which strategic priority each team serves.
4. Team missions and metrics: a mission statement and one or two outcome metrics per team.
5. Ownership boundaries: what each team owns (journeys, surfaces, services, data) and explicit rules for shared areas.
6. Dependencies: the remaining cross-team dependencies and how to manage them (platform self-service, interface agreements, joint planning).
7. Transition plan: sequence, communication, and how to avoid pausing delivery.
8. When to revisit: signals that the structure no longer fits.
</task>

<constraints>
- Use only the teams and sizes given; do not invent headcount.
- Do not decide individual people's roles or performance; refer people changes to managers and HR processes.
- Note where architecture would need to change for a boundary to work, rather than assuming it will.
{{> output/uncertainty}}
</constraints>

<output_format>
## Problems with today's split
## Split options
| Option | How it splits | Strengths | Costs |
## Recommended structure
## Team missions and metrics
## Ownership boundaries
## Dependencies and how to manage them
## Transition plan
## When to revisit
</output_format>
