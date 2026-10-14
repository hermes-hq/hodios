---
schema: 1
id: design-interrupt-rotation
kind: prompt
title: Design an interrupt rotation
description: Designs a rotating interrupt or shield role that absorbs questions, small requests and support escalations for an engineering team, with intake rules, handoffs and load tracking.
category: planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [interrupt-rotation, team-process, focus-time, support-escalations, request-intake]
pairs_with:
  prompts: [plan-team-capacity, design-on-call-rotation, design-kanban-workflow]
args:
  - name: team
    description: Team size, skills, time zones and any existing on-call rotation.
    type: string
    required: true
  - name: interrupts
    description: What interrupts the team today - kinds of requests, where they arrive (chat, tickets, direct messages), rough volume and who usually answers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Role definition, Intake, Triage rules, Rotation, Handoff, Load tracking, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Unplanned requests (questions from other teams, support escalations, small data fixes, access requests) fragment a team's focus and fall unevenly on whoever answers fastest, usually the most senior people. An interrupt rotation (also called shield, goalie or support hero) gives one person per period the job of absorbing them so everyone else can focus. It is separate from on-call for production alerts, though small teams sometimes combine them. It fails when requests still arrive in private messages, when the person on rotation is also expected to deliver full sprint work, or when the volume is never measured, so the team never learns which interrupts to eliminate. The best rotations leave behind a record that drives automation, docs and self-service.
</context>

<task>
Team: {{team}}
<interrupts>
{{interrupts}}
</interrupts>

1. Define the role: what it covers and what it does not (for example, not production alerts if on-call exists), expected response times, and that the person carries little or no planned work during the rotation.
2. Design intake: one channel or queue where requests must arrive, a short request template, and how to redirect direct messages politely.
3. Write triage rules: answer now, turn into a ticket for planning, hand to an expert with a time limit, or decline with a pointer to self-service. Include when to escalate to the rest of the team.
4. Set the rotation: length (often one week), order, how juniors are supported, how time zones are covered, and how the role interacts with on-call.
5. Define the handoff: a short note on open items and patterns noticed, at a fixed time.
6. Track load: count requests by type and time spent, and review monthly to remove the top recurring interrupts with docs, tooling or fixes.
7. Plan the rollout: announcement to requesting teams, a trial period and the measure that decides whether it worked.
</task>

<constraints>
- Do not prescribe a specific chat or ticket tool; describe the channel generically.
- Keep the person on rotation off committed sprint work, or state the small share allowed.
- Do not assume time zones or an on-call setup that was not described.
- Keep the request template to five fields or fewer.
</constraints>

<output_format>
## Role definition
Bullets: covers, does not cover, response times, planned work allowed.
## Intake
Bullets plus the request template in a code block.
## Triage rules
Table: request type | action | time limit.
## Rotation
Bullets.
## Handoff
Template in a code block.
## Load tracking
Bullets.
## Rollout
Numbered steps and the success measure.
</output_format>
