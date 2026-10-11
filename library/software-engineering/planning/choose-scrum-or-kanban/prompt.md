---
schema: 1
id: choose-scrum-or-kanban
kind: prompt
title: Choose Scrum or Kanban for a team
description: Recommends Scrum, Kanban or a hybrid for a team from its work mix, interruptions and release model, with the minimum set of rituals to start and how to review the choice.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [notes, text]
output: [report, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [scrum, agile, team-process, sprints, work-in-progress-limits]
pairs_with:
  prompts: [design-kanban-workflow, plan-sprint, design-interrupt-rotation]
args:
  - name: team
    description: Team size, what kind of work it does (features, platform, support, maintenance), how much is unplanned, how it releases, who sets priorities and how often they change.
    type: text
    required: true
  - name: current_process
    description: What the team does today and what is not working.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Why, Starter setup, What to drop, How to tell it is working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The choice between Scrum and Kanban matters less than people argue, but a bad fit hurts. Scrum's fixed sprints suit a team building planned product work with a stakeholder who can hold priorities steady for two weeks, and who benefits from a regular review rhythm. Kanban suits work that arrives continuously and unpredictably (platform, operations, support, maintenance) and teams that release continuously; it lives or dies on work-in-progress limits and explicit policies, without which it is just a to-do list. Teams with a large share of interrupts usually do better with Kanban or with Scrum plus a rotating interrupt handler. Many teams copy rituals without their purpose; the minimum useful set is whatever creates a planning moment, a daily coordination point, a way to show work to stakeholders, and a regular improvement loop.
</context>

<task>
Team: {{team}}
{{#current_process}}Current process: {{current_process}}{{/current_process}}

1. Summarise the deciding facts: share of planned versus unplanned work, how often priorities change, release cadence, whether stakeholders need forecast dates, and team size. If the share of unplanned work is unknown, ask for it or estimate from the description and say so.
2. Recommend Scrum, Kanban or a named hybrid, and give the two or three facts that decide it.
3. Starter setup: the minimum rituals and artefacts with their purpose and length (for Scrum: sprint length, planning, daily, review, retro; for Kanban: board columns, WIP limits per column with a starting number, replenishment, daily, a service-level expectation, retro). Include how interrupts are handled.
4. What to drop from the current process, and why.
5. How to tell it is working after six to eight weeks: two or three signals (for example predictability of sprint goals, cycle time trend, fewer items aged over N days), and when to revisit the choice.
</task>

<constraints>
- No dogma; acknowledge that either can work and say what would flip the recommendation.
- Do not prescribe certifications, tools or roles the team does not need.
- Keep the starter setup small enough to start next week.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
One sentence.
## Why
Three bullets, plus what would change it.
## Starter setup
Table: Ritual or artefact | Purpose | Cadence and length. Then interrupt handling.
## What to drop
## How to tell it is working
</output_format>
