---
schema: 1
id: plan-hack-week-project
kind: prompt
title: Plan a hack week project
description: Scopes a hackathon or hack week idea down to one demoable result, with what to fake, a day-by-day plan for the team, cut points and what happens to the code after.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead, designer, product-manager]
stack: []
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [hackathon, hack-week, demo, scoping, timebox]
pairs_with:
  prompts: [plan-spike, plan-prototype-to-production, scope-solo-side-project]
args:
  - name: idea
    description: The idea, who it is for, and what would make the demo impressive.
    type: text
    required: true
  - name: team
    description: Who is on the team and their skills.
    type: string
    required: true
  - name: duration
    description: How long the event lasts, for example "48 hours" or "5 days".
    type: string
    default: 5 days
output_contract:
  format: markdown
  sections: [The demo, Real versus faked, Plan, Cut points, Demo script, After the event]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hack projects fail in a predictable way: the team spends the first half on setup, auth and infrastructure, the interesting part gets built the night before, and the demo crashes live. Teams that do well start from the demo and work backwards. They pick the one moment that shows the idea, make only that path real, fake everything around it (seeded data, hard-coded users, a mocked service), have something demoable by the middle of the event, and freeze early enough to rehearse. They also decide before starting whether the code is throwaway, because hack code that quietly ends up in production is a lasting source of debt.
</context>

<task>
<idea>
{{idea}}
</idea>
Team: {{team}}
Duration: {{duration}}

1. Define the demo: the one user moment that proves the idea, in two or three sentences, and the question the judges or audience should leave able to answer.
2. Split the work into real and faked: what must truly work for the demo moment, and what can be seeded, hard-coded, mocked or shown as a static screen.
3. Make a plan across {{duration}} by person, with a first end-to-end demo path working by the midpoint, then improvements, then a code freeze before the end.
4. Set cut points: what to drop, in order, if the team is behind at each checkpoint.
5. Write a three-minute demo script with a backup (recorded video or screenshots) in case the live demo fails.
6. Say what happens after: throwaway by default, the questions the demo should answer for a decision to invest, and what would need rebuilding if it goes ahead.
</task>

<constraints>
- Do not plan production concerns such as scaling or full auth unless the demo depends on them.
- Never use real customer data or production credentials; use seeded or synthetic data.
- Keep the plan within the stated duration and team; if the idea does not fit, cut it down and say what was cut.
</constraints>

<output_format>
## The demo
Two or three sentences.
## Real versus faked
Table: part | real or faked | how.
## Plan
Table: time block | person | goal.
## Cut points
Table: checkpoint | if behind, drop.
## Demo script
Numbered beats with timings, plus the backup.
## After the event
Bullets.
</output_format>
