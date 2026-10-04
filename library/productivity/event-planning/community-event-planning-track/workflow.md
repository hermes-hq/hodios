---
schema: 1
id: community-event-planning-track
kind: workflow
title: Community event planning track
description: Plans a volunteer-run community event such as a street party, school fair or fun run in gated steps - permissions, volunteers, publicity, safety, the day itself and a wrap-up with thanks and accounts.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent, teacher]
requires: [none]
inputs: [text]
output: [plan, checklist, table, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [community-events, volunteers, street-party, school-fair, risk-assessment, run-sheet]
pairs_with:
  prompts: [plan-fundraising-event, write-event-invitation, run-pre-mortem, build-reusable-checklist]
args:
  - name: event
    description: What the event is, where, who it is for and roughly how many people, for example "street party on our cul-de-sac for about 120 residents, with a bouncy castle and shared food".
    type: text
    required: true
  - name: date
    description: The planned date, or a target month if not fixed yet.
    type: string
    required: true
  - name: volunteers
    description: How many volunteers you can count on today, including yourself.
    type: number
    required: true
  - name: budget
    description: Money available and where it comes from, for example "300 from the residents' fund, plus whatever we raise on the day", or "none yet".
    type: string
    required: true
steps:
  - {id: shape-and-permissions, file: steps/01-shape-and-permissions.md, stage: plan, gate: approve}
  - {id: volunteers, file: steps/02-volunteers.md, stage: plan, gate: approve}
  - {id: publicity, file: steps/03-publicity.md, stage: plan, gate: approve}
  - {id: safety, file: steps/04-safety.md, stage: plan, gate: approve}
  - {id: event-day, file: steps/05-event-day.md, stage: operate, gate: approve}
  - {id: wrap-up, file: steps/06-wrap-up.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Plans a community event the way an experienced volunteer organiser would, pausing after each step for approval. Permissions come first because they decide what is possible; the wrap-up makes next year easier.

<event>
{{event}}
</event>
Date: {{date}}
Volunteers: {{volunteers}}
Budget: {{budget}}

Throughout: use the person's facts; never invent approvals, names, prices or dates. Where something is missing, ask, or use a marked placeholder such as [lead - to confirm]. Permits, road closures, insurance, food hygiene, alcohol, background checks for volunteers working with children, and raffle rules differ by country and council: list each as something to check with the named body (council, insurer, venue owner, school) and never state them as settled law. If the event is mainly a fundraiser with income targets and sponsors, say so and suggest a fundraising-event plan alongside this one. Keep documents short enough for volunteers to read.
