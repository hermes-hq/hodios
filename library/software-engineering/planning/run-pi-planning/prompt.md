---
schema: 1
id: run-pi-planning
kind: prompt
title: Prepare PI planning
description: Prepares a SAFe-style program increment planning event for several teams with an agenda, team objectives, a dependency board, ROAM risks and a confidence vote.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [project-manager, engineering-manager, product-manager, tech-lead]
stack: []
requires: [none]
inputs: [notes, ticket, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [safe, program-increment, big-room-planning, cross-team-dependencies, roam, release-train]
pairs_with:
  prompts: [plan-sprint, plan-team-capacity, find-critical-path]
args:
  - name: teams
    description: The teams in the increment, their size, focus and known capacity for the increment (holidays, on-call).
    type: text
    required: true
  - name: priorities
    description: The ranked features or epics for the increment, with business owners, and known dates or commitments.
    type: text
    required: true
  - name: increment
    description: Length of the increment and its iterations, for example "five two-week iterations, the last for innovation and planning".
    type: string
  - name: format
    description: How the event runs.
    type: enum
    enum: [in-person, remote, hybrid]
    default: remote
output_contract:
  format: markdown
  sections: [Readiness checklist, Agenda, Team objectives template, Dependency board, Risks (ROAM), Confidence vote and close, After the event]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Program increment planning works when the inputs are ready before the event: a ranked and sized list of features, each team's real capacity per iteration, known architecture work, and business owners present to make trade-offs. It fails when teams fill every iteration to 100%, when dependencies are drawn but not agreed by the receiving team, when objectives are a copy of the feature list, and when risks are listed and never resolved. Committed objectives should be a subset teams are confident about, with stretch objectives on top (often about a fifth of capacity) and business value set by the business owners, not the teams. Remote events need shorter sessions and explicit breakout channels, and time zones decide the schedule.
</context>

<task>
Teams: {{teams}}
Priorities: {{priorities}}
{{#increment}}Increment: {{increment}}{{/increment}}
Format: {{format}}.

1. Readiness checklist for the two weeks before: features ranked and with acceptance criteria, capacity per team per iteration, architecture and enabler work listed, dependencies already known, dates and external commitments, attendees confirmed (business owners, architects, team leads), board and tools ready. Flag gaps in the input that would block the event.
2. Agenda for two days (or a remote version spread across shorter sessions in the teams' time zones): business context, product vision and top features, architecture briefing, team breakouts, draft plan review, management problem-solving, plan adjustments, final plan review, risks, confidence vote, retrospective.
3. Team objectives template: committed and stretch objectives in business terms, each with planned business value (1 to 10, set by business owners), and a capacity check per iteration with load kept under about 80%.
4. Dependency board: how to record each dependency (requesting team, providing team, feature, iteration needed, agreed yes or no), with the rule that a dependency is not real until the providing team accepts it. Pre-fill the dependencies visible in the input.
5. Risks with ROAM: resolved, owned, accepted, mitigated, with an owner for each; pre-fill risks visible in the input.
6. Confidence vote (fist of five) and what to do with low votes: rework the plan before closing, not after.
7. After the event: publish objectives, set up the dependency and risk review in each iteration, and when to measure predictability (actual versus planned business value).
</task>

<constraints>
- Do not invent capacity, business values or dates; give templates and placeholders where the input lacks them.
- Say when a smaller setup (a joint planning session without the full ceremony) would be enough, for example for two or three teams.
- Use SAFe terms where the user does, but explain each in plain words once.
{{> output/uncertainty}}
</constraints>

<output_format>
## Readiness checklist
Checkbox list with owners, then the gaps found.
## Agenda
Table: Time | Session | Who | Output.
## Team objectives template
## Dependency board
Table: Requesting team | Providing team | Need | Iteration | Accepted?
## Risks (ROAM)
Table: Risk | ROAM status | Owner | Action.
## Confidence vote and close
## After the event
</output_format>
