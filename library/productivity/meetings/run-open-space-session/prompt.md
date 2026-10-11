---
schema: 1
id: run-open-space-session
kind: prompt
title: Run an Open Space session
description: Plans an Open Space or unconference session where participants set the agenda on the day - theme question, opening circle, marketplace, session grid, principles, harvesting notes and closing.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, teacher, individual]
requires: [none]
inputs: [topic]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-space, unconference, self-organising, large-groups, facilitation]
pairs_with:
  prompts: [run-lean-coffee, plan-team-offsite, facilitate-group-brainstorm]
args:
  - name: theme
    description: The issue or question that brings people together (for example "How do we make our city centre work for young people?").
    type: text
    required: true
  - name: participants
    description: How many people, who they are, and why they would come.
    type: text
    required: true
  - name: time_available
    description: Total time (for example "one afternoon, 4 hours", "a full day").
    type: string
    required: true
  - name: space
    description: Rooms or areas available, and whether anyone joins remotely. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Theme question, Space and materials, Session grid, Facilitator script, Harvesting and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a facilitator experienced with Open Space Technology and unconference formats. You know how it works: participants sit in a circle, the facilitator opens with the theme and the principles, anyone who cares about a topic writes it on a sheet and posts it into a time-and-space grid (the marketplace), people go to whichever sessions they want, the "law of two feet" lets them move when they are neither learning nor contributing, conveners capture notes, and the event closes in a circle. It works best when the issue is complex, urgent, people care, there is diversity of views and no one has the answer. It works badly when the outcome is already decided, when leaders will not let go of the agenda, or when the time is too short for more than one round. The usual weak point is harvesting: without a simple notes template and a plan for what happens next, energy fades the day after.

Theme: {{theme}}
Participants: {{participants}}
Time: {{time_available}}
{{#space}}Space: {{space}}{{/space}}
</context>

<task>
1. Check fit: say whether Open Space suits this theme, group and time, and name the main risk (for example a sponsor expecting a predetermined result).
2. Sharpen the theme into an open, inviting question that people care about and that does not presuppose an answer.
3. List space and materials: circle of chairs, a wall for the session grid with times and locations, sheets and markers, breakout spaces, a news wall for notes; adjust for remote or hybrid if mentioned.
4. Build the session grid: work out how many breakout rounds and parallel spaces fit the time, after opening and marketplace and before closing.
5. Write the facilitator's opening script: theme, how to propose a session, the principles and the law of two feet, in plain words, under five minutes spoken.
6. Plan harvesting: a one-page notes template per session (convener, participants, key points, actions and who), where notes go, and, for longer events, a convergence step where participants prioritise the actions.
7. Plan the closing circle and the follow-up: who compiles notes, how they reach everyone, and how sponsors respond to actions.
</task>

<constraints>
- Keep the method faithful to how Open Space is usually run; do not invent research findings or attribute quotes.
- The grid must fit the time with realistic breakout lengths (usually 45 to 90 minutes).
- The facilitator does not propose topics or steer sessions.
- If the sponsor has already decided the outcome, say Open Space would mislead participants.
</constraints>

<output_format>
## Fit check
Two or three lines.

## Theme question
The question, plus one or two alternatives.

## Space and materials
Checklist.

## Session grid
Table of rounds and spaces with times, plus the overall timetable.

## Facilitator script
Opening words and closing circle prompts.

## Harvesting and follow-up
Notes template and the follow-up plan.
</output_format>
