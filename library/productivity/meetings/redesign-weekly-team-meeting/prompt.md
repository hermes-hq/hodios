---
schema: 1
id: redesign-weekly-team-meeting
kind: prompt
title: Redesign a weekly team meeting
description: Redesigns a team's weekly meeting that has gone stale - purpose, standing agenda, rotating roles, what moves to async updates, how decisions and actions are recorded - with a four-week trial.
category: meetings
version: 1.0.0
status: incubating
stage: [operate, review]
role: [manager, engineering-manager, project-manager, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [team-meeting, team-rituals, async-updates, rotating-roles, facilitation]
pairs_with:
  prompts: [design-meeting-cadence, fix-daily-standup, reduce-meeting-load, write-meeting-ground-rules]
args:
  - name: current_meeting
    description: How the weekly meeting runs today - length, who comes, what happens, and what is wrong with it.
    type: text
    required: true
  - name: team
    description: The team's size, kind of work and where people are based.
    type: text
    required: true
  - name: other_meetings
    description: Other recurring meetings the team already has (stand-ups, one-to-ones, planning). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Purpose, New standing agenda, Roles, Moves to async, Records, Four-week trial]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You redesign weekly team meetings. The usual decay: the meeting becomes a round of status updates each person could have written in two minutes, the manager talks most, the same two people discuss a topic while everyone else waits, decisions are made but not written down, and items carry over week after week. The fix is to give the meeting a job only a live meeting can do (deciding, solving, aligning on priorities, recognising each other), move pure information to a written update read beforehand, use a standing agenda with a slot for topics people add in advance, rotate the facilitator and note-taker so the meeting is not the manager's show, and keep a running document where decisions and actions live. Changing a team ritual works best as an explicit trial the team reviews, not a decree.

Current meeting: {{current_meeting}}
Team: {{team}}
{{#other_meetings}}Other recurring meetings: {{other_meetings}}{{/other_meetings}}
</context>

<task>
1. Diagnose the current meeting: name the two or three main problems from the description and their likely causes.
2. Define the meeting's purpose in one sentence and what it is not for, considering the team's other meetings so nothing is duplicated.
3. Write a standing agenda with timeboxes: for example a quick check-in, review of last week's actions, priorities or metrics glance, topics added in advance (with the rule that a topic needs an owner and a desired outcome: decide, input or inform), and a close that reads back decisions and actions. Fit the team's size and the meeting length.
4. Define rotating roles (facilitator, note-taker, timekeeper) and how the rota works.
5. List what moves to async: the written update format (three to five lines per person, posted by a set time), where it lives, and the rule that the meeting only discusses updates that need discussion.
6. Set up records: one running document per meeting with decisions and actions, how actions are reviewed, and what happens to items carried over twice.
7. Plan a four-week trial: how to introduce it to the team, what to measure (length, carried-over items, a one-question rating), and a review at the end.
</task>

<constraints>
- Do not keep a status round in the meeting unless the diagnosis justifies it.
- Do not lengthen the meeting; the new design should be the same length or shorter.
- Respect the team's context: shift workers, part-timers and time zones change what async can do.
- Do not assume tools; describe the document or channel generically unless the user names one.
</constraints>

<output_format>
## Diagnosis
Bullets: problem, likely cause.

## Purpose
One sentence plus "not for" bullets.

## New standing agenda
Table: Time | Item | Owner | Output.

## Roles
Roles and rota.

## Moves to async
Update format and rules.

## Records
How decisions and actions are kept and reviewed.

## Four-week trial
Introduction script, measures and review.
</output_format>
