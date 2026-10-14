---
schema: 1
id: build-project-kickoff-deck
kind: prompt
title: Build a project kickoff deck
description: Builds the slides for a project kickoff meeting with goals, scope and out of scope, roles, timeline, risks, ways of working and the decisions to make in the room, flagging gaps to fill first.
category: presentations
version: 1.0.0
status: incubating
stage: [plan]
role: [project-manager, manager, consultant, product-manager]
requires: [none]
inputs: [notes, document]
output: [outline, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [kickoff-meeting, project-start, out-of-scope, raci, ways-of-working, stakeholders]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, build-steering-committee-update]
  personas: [presentation-designer]
args:
  - name: project_brief
    description: What the project is, why now, goals, deadline, budget if relevant, team and stakeholders, and what is already decided. Notes or a charter are fine.
    type: text
    required: true
  - name: kickoff_type
    description: Who the kickoff is for.
    type: enum
    enum: [internal-team, client, cross-department]
    default: internal-team
  - name: minutes
    description: Length of the kickoff meeting in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Kickoff goals, Slide plan, Decisions for the room, Gaps to fill before the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help project leads prepare kickoff presentations. A kickoff is the cheapest moment to align people: misunderstandings about scope, roles and decision rights that surface now cost minutes; the same ones found in month three cost weeks. Weak kickoffs are one-way briefings that read the charter aloud. Strong ones make the "why" concrete, say explicitly what is out of scope, name who decides what, show the first milestones rather than a full Gantt chart, surface the top risks and assumptions for the room to challenge, agree ways of working (meetings, channels, how to raise blockers), and leave with recorded decisions and owners. A client kickoff also sets expectations about approvals, response times and change requests, and avoids internal jargon and margins.

<project_brief>
{{project_brief}}
</project_brief>

Kickoff type: {{kickoff_type}}
Meeting length: {{minutes}} minutes
</context>

<task>
1. State two or three goals for the kickoff meeting itself (what people should know, agree and do by the end).
2. Plan the slides: why this project and why now; goals and how success is measured; scope and explicit out of scope; team, roles and decision rights (a simple RACI-style table); timeline with the first milestones; risks, assumptions and dependencies; ways of working; the decisions or input needed today; next steps with owners. Adjust for {{kickoff_type}}: for a client, add approvals, response times and change requests and remove internal-only content.
3. Give each slide an assertion title, the content drawn from the brief and minutes, keeping at least a third of {{minutes}} for discussion and questions.
4. List the decisions or confirmations to get in the room, phrased as questions.
5. List gaps in the brief that the lead must fill before the meeting, such as missing success measures, unnamed decision makers or no out-of-scope list, with [to confirm] placeholders on the affected slides.
</task>

<constraints>
- Use only facts from the brief; never invent dates, budgets, names or roles.
- Keep the timeline to milestones; do not produce a detailed schedule.
- No internal-only content such as margins or staffing issues in a client kickoff.
</constraints>

<output_format>
## Kickoff goals
Bullets.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes. Discussion time stated.

## Decisions for the room
Numbered questions.

## Gaps to fill before the meeting
Checklist.
</output_format>
