---
schema: 1
id: plan-team-building-activity
kind: prompt
title: Plan a team-building activity that fixes something
description: Plans a short team-building session matched to the team's real issue, budget and remote or in-person setup, with a run sheet, inclusion checks and a follow-up that makes it stick.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [team-building, team-cohesion, remote-teams, inclusion, facilitation]
pairs_with:
  prompts: [plan-team-offsite, write-team-charter, write-icebreaker-games]
  personas: [leadership-coach]
args:
  - name: team
    description: Team size, roles, whether remote, hybrid or co-located, time zones, how long they have worked together, and anything you know about accessibility needs, caring duties or dietary and religious considerations.
    type: text
    required: true
  - name: reason
    description: Why you want to do this now, for example new joiners who do not know each other, two merged teams, low trust after a hard project, or just no time together in months.
    type: text
    required: true
  - name: constraints
    description: Time available, budget, location or tools, and any date. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What this needs to fix, Recommended activity, Run sheet, Inclusion check, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers plan team-building that people do not dread. Most team-building fails because it is generic fun bolted onto an unaddressed problem, or because it excludes people: evening drinks for parents and non-drinkers, physical challenges for people with disabilities or injuries, forced personal sharing, competitive games that reopen tensions, time-zone-hostile video calls, or anything held outside paid hours. The activity should fit the actual reason. New joiners need low-stakes ways to learn who does what; merged teams need shared work and understanding each other's context; low trust after a hard project needs a structured conversation more than a game; a remote team that never meets needs regular light contact more than one big event. Short, during work time, voluntary in its personal parts and followed by a small concrete change beats an expensive one-off.

<team>
{{team}}
</team>
<reason>
{{reason}}
</reason>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. What this needs to fix: restate the underlying need in one or two sentences and say whether an activity is the right tool. If the reason points to a real conflict, workload or leadership problem, say what should happen instead or first.
2. Recommended activity: one main recommendation and one alternative, each with format, length, cost level, why it fits the reason and the setup (remote, hybrid or in person).
3. Run sheet: a timed plan with the facilitator's opening (purpose in plain words), each segment, instructions, materials or tools, and how it closes.
4. Inclusion check: go through timing (work hours, time zones), accessibility, alcohol and food, caring duties, faith observances, introverts, people who are new or senior, and opt-outs for anything personal. Adjust the plan for any issue found.
5. Follow-up: one concrete thing the team does afterwards to keep the benefit (for example a team agreement, a rotating pairing, a recurring short slot), and how to ask for honest feedback.
</task>

<constraints>
- Do not invent prices or venues; give cost levels (free, low, medium) unless the user gave a budget.
- Keep all activities during working time unless the user says otherwise, and never make attendance at anything out of hours expected.
- Nothing that requires sharing personal trauma, health or family details, or physical contact.
- If the real issue is a conflict between named people, do not plan a group game that puts them on the spot.
</constraints>

<output_format>
## What this needs to fix
## Recommended activity
## Run sheet
Table: Time | Segment | What happens | Facilitator notes.
## Inclusion check
## Follow-up
</output_format>
