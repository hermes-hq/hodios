---
schema: 1
id: run-project-kickoff-meeting
kind: prompt
title: Run a project kickoff meeting
description: Plans and scripts a project kickoff meeting - outcome, timed agenda, roles and decision rights, ways of working, a risks round and first actions - plus the pre-read and what to send afterwards.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [project-manager, product-manager, manager, consultant]
requires: [none]
inputs: [text, document]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [project-kickoff, ways-of-working, raci, risks, facilitation]
pairs_with:
  prompts: [build-project-kickoff-deck, write-project-kickoff-email, run-pre-mortem, write-meeting-agenda]
  workflows: [project-kickoff-track]
args:
  - name: project
    description: What the project is, its goal, rough timeline and budget if known, and anything already decided.
    type: text
    required: true
  - name: attendees
    description: Who will attend and their roles (sponsor, team members, client, suppliers), how many, and remote or in person.
    type: text
    required: true
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 90
  - name: known_tensions
    description: Anything sensitive (a sceptical stakeholder, a team that wanted a different approach, a tight deadline imposed from above). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Outcome, Pre-read, Run sheet, Facilitator script, Risks round, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan project kickoff meetings that set a project up to succeed. Most kickoffs fail by being a one-way slide presentation: the sponsor talks for an hour, people nod, and the misunderstandings about scope, roles and who decides surface weeks later. A kickoff earns its time when the group leaves with the same picture of the goal and what is out of scope, knows who owns what and who makes which decisions, has agreed how it will work together (meeting rhythm, channels, response times, how changes are requested), has said its worries out loud, and has a first set of owned actions. Experienced project managers send the background as a pre-read so the meeting is spent on discussion, have the sponsor say why the project matters in their own words, and ask the group directly "what would make this fail?".

Project: {{project}}
Attendees: {{attendees}}
Length: {{minutes}} minutes
{{#known_tensions}}Known tensions: {{known_tensions}}{{/known_tensions}}
</context>

<task>
1. Write the meeting's outcome: what must be true when people leave, in three to five checkable statements.
2. Specify the pre-read: a one-page brief (goal, scope in and out, milestones, team, budget and constraints if known) with prompts for any section the user has not given, and when to send it.
3. Build a run sheet that fits the length: welcome and introductions with roles; sponsor's why; goal and scope with a check for understanding (ask people to name what they think is out of scope); roles and decision rights; ways of working; risks round; first actions and next meeting. Give each a timebox and an output.
4. Write a facilitator script with the key phrases and questions for each segment, including how to handle a scope question that cannot be answered in the room (park it with an owner).
5. Design the risks round: a quick, safe way for everyone to name risks and assumptions (silent writing then grouping, or a short pre-mortem), and how the top risks get owners.
6. If tensions are given, say where they are likely to surface and how to address them openly without derailing the meeting.
7. List what to send within a day: summary, decisions, roles table, ways of working, risk list and actions.
</task>

<constraints>
- Do not invent scope, dates, budget or names; use placeholders and mark what the user must fill in.
- Keep presentation to no more than a third of the meeting; the rest is discussion and agreement.
- Every segment produces something written down.
- If the attendee list is too big for real discussion (more than about 15), suggest a smaller working kickoff plus a briefing for the wider group.
</constraints>

<output_format>
## Outcome
Checkable bullets.

## Pre-read
Outline with prompts.

## Run sheet
Table: Time | Segment | Lead | Output.

## Facilitator script
Per segment, key lines and questions.

## Risks round
Method, timings and how risks get owners.

## After the meeting
Checklist of what to send and to whom.
</output_format>
