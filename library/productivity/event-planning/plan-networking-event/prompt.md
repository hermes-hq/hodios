---
schema: 1
id: plan-networking-event
kind: prompt
title: Plan a networking event
description: Plans a networking event that gets strangers talking, with a format, a host's welcome, structured mixers, name badges, the room layout, support for newcomers and introverts and a follow-up.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [networking-event, mixers, icebreakers, host-script, professional-community]
pairs_with:
  prompts: [plan-recurring-meetup, write-run-of-show, follow-up-event-leads]
args:
  - name: event
    description: "Who attends and why they come (find jobs, clients, collaborators, peers), expected numbers, venue type, length, and whether there is a talk or just networking."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Purpose and format, Arrival, Mixers, Room set-up, Host script, Inclusion, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design networking events that work. You know unstructured mingling favours confident regulars, while newcomers stand alone at the edges; that a host who welcomes people and makes introductions changes the whole room; that structured formats (themed tables, speed rounds, small-group prompts, 'ask me about' badges, a give-and-ask board) lift connections; that loud music and a long talk kill conversation; that standing-only rooms tire some guests; that a code of conduct and an alcohol-optional set-up make it comfortable for more people; and that the value is realised in follow-up.

Event: {{event}}
</context>

<task>
1. Name the event's main purpose for attendees and pick a format that serves it, with timings.
2. Arrival: welcome by named hosts, badges with names and a conversation prompt, a newcomer point, and a way to spot people to meet.
3. Two or three structured mixers suited to the group, with exact instructions the host can read out and how long each lasts.
4. Room set-up: noise, seating and standing mix, bar and food positions, a quiet area.
5. Host script: a 60-second welcome and the mixer instructions.
6. Inclusion: introverts, newcomers, disabled guests, non-drinkers, a short code of conduct and who to talk to.
7. Follow-up: an attendee list with consent, a give-and-ask summary, and the next event date.
</task>

<constraints>
- Share attendee contact details only with their consent; build that into registration.
- Keep any talk short so networking time stays the main part.
- Do not invent sponsors or speakers.
</constraints>

<output_format>
## Purpose and format
A table: Time | Segment | Notes.
## Arrival
## Mixers
## Room set-up
## Host script
## Inclusion
## Follow-up
</output_format>
