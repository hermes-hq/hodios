---
schema: 1
id: write-team-onboarding-guide
kind: prompt
title: Write a team onboarding guide for new joiners
description: Writes a reusable team guide for new joiners covering what the team does, how it works, tools and access, rituals, who to ask for what, jargon and first-week tasks.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, tech-lead]
requires: [none]
inputs: [notes, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [new-joiners, team-handbook, ways-of-working, buddy-system, first-week]
pairs_with:
  prompts: [plan-new-hire-onboarding, write-team-charter, coach-struggling-new-hire]
  personas: [leadership-coach]
args:
  - name: team_info
    description: What the team does and for whom, team members' roles (no personal details), tools and systems, recurring meetings, how work comes in and is tracked, common acronyms, and where documentation lives.
    type: text
    required: true
  - name: setup
    description: Remote, hybrid or office-based, time zones, and anything company-wide that HR or IT already covers (so the guide does not repeat it). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Welcome, What we do, How we work, Tools and access, Who to ask, Glossary, Your first week, Keeping this guide current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers write the team-level guide that company onboarding never covers. HR onboarding explains payroll and policies; a personal 30-60-90 plan sets goals. What new joiners actually struggle with in the first weeks is the team's unwritten knowledge: what the team is for and how its work is judged, where work comes from and how it is tracked, which meetings matter and what to bring, which tool is the source of truth, the acronyms everyone uses, who to ask for which kind of question, and what "done" means here. New joiners hesitate to ask the same question twice, so a guide that answers the predictable questions saves them weeks and saves the team repeated interruptions. A good guide is short, skimmable, honest about quirks, owned by someone, and updated by each new joiner.

<team_info>
{{team_info}}
</team_info>
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Welcome: three or four warm, plain sentences on why the team is glad they are here and how to use this guide.
2. What we do: the team's purpose, its customers or stakeholders, and how success is measured.
3. How we work: how work arrives and is prioritised, how it is tracked, what "done" means, recurring meetings (purpose, when, what to bring, which are optional), response-time norms and how decisions are made.
4. Tools and access: a table of each tool, what it is used for, and how to get access. Flag any tool whose access process is unknown as [X].
5. Who to ask: a table mapping kinds of questions to roles (not personal details), plus the buddy role and what the buddy is for.
6. Glossary: acronyms and team jargon found in the input with plain definitions; list any you could not define as [X].
7. Your first week: a day-by-day checklist with a small real first task, people to meet, and what to read.
8. Keeping this guide current: who owns it, and a standing ask that each new joiner fixes one thing they found missing or wrong.
</task>

<constraints>
- Use only the facts given; never invent tools, meetings, links or processes. Mark gaps [X].
- Do not repeat company-wide HR or IT content the user says is covered elsewhere; point to it instead.
- Refer to roles, not named individuals' personal details.
- Plain language; explain jargon the first time it appears.
</constraints>

<output_format>
## Welcome
## What we do
## How we work
## Tools and access
Table: Tool | Used for | How to get access.
## Who to ask
Table: If you need… | Ask….
## Glossary
## Your first week
## Keeping this guide current
</output_format>
