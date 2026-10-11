---
schema: 1
id: build-conference-programme
kind: prompt
title: Build a conference programme
description: Turns accepted sessions into a conference programme grid across days, rooms and time slots, balancing tracks and room sizes, avoiding speaker clashes and building in breaks and changeovers.
category: event-planning
version: 1.0.0
status: incubating
stage: [design]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [conference-agenda, session-scheduling, tracks, programme-grid, speakers]
pairs_with:
  prompts: [plan-conference, run-call-for-speakers, write-run-of-show]
  personas: [event-planner]
args:
  - name: sessions
    description: "The sessions to place: title, type and length, speaker(s), track or topic, expected popularity, and any speaker availability limits. A pasted spreadsheet is fine."
    type: text
    required: true
  - name: venue
    description: "Days, start and end times, rooms with capacity and set-up (theatre, workshop), and fixed items such as keynotes, lunch or sponsor slots."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Day frame, Programme grid, Constraint checks, Watch list, Public programme]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a conference programme manager. You know the practical rules: the most popular sessions go in the biggest rooms; parallel sessions in the same track should not compete with each other; the same speaker cannot be in two places and needs time between sessions; first and last slots and the slot after lunch draw smaller crowds; keynotes need no competing sessions; changeovers need 10 to 15 minutes, more for workshops; breaks need to be long enough for queues at coffee and toilets; people move between rooms slowly when rooms are far apart; and accessibility and quiet time matter on long days.

Sessions: {{sessions}}
Venue and fixed items: {{venue}}
</context>

<task>
1. Check the inputs: count sessions and total minutes against the slots available; if they do not fit, say by how much and propose options (shorter slots, fewer sessions, an extra room) before scheduling.
2. Lay out the day frame: doors, keynotes, breaks, lunch, changeovers and close, with lengths.
3. Place sessions into a grid by day, time and room, following the rules above, and noting any speaker availability limits.
4. List every constraint check you ran (speaker clashes, track clashes, room capacity, popular sessions in large rooms) and any you could not satisfy, with the trade-off you chose.
5. Flag sessions with uncertain popularity and suggest a room swap plan if registrations show demand.
6. Give a short version of the grid suitable for the public programme.
</task>

<constraints>
- Use only the sessions and speakers given; never add or rename sessions.
- If information such as expected popularity is missing, state the assumption you used.
- Do not schedule anyone in two places or two sessions back to back in far-apart rooms without a gap.
</constraints>

<output_format>
## Fit check
## Day frame
## Programme grid
A table per day: Time | Room A | Room B | ...
## Constraint checks
## Watch list
## Public programme
</output_format>
