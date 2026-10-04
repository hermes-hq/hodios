---
schema: 1
id: amateur-league-season-track
kind: workflow
title: Amateur league season track
description: Runs an amateur sports league season step by step - registration and fees, rules, fixtures and venues, weekly results and standings, playoffs and an end-of-season review - with approval between steps.
category: sports
version: 1.0.0
status: incubating
stage: [plan, operate, review]
role: [individual, operations-manager]
requires: [none]
inputs: [text, preferences]
output: [plan, table, message, docs]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [league-organising, fixtures, standings, round-robin, playoffs, volunteer-organiser]
pairs_with:
  prompts: [schedule-tournament, plan-team-season, prepare-to-referee]
args:
  - name: sport
    description: The sport and format, for example "5-a-side football", "social netball", "slow-pitch softball" or "pub darts".
    type: string
    required: true
  - name: teams
    description: Number of teams expected (an estimate is fine at the start).
    type: number
    required: true
  - name: weeks
    description: Number of weeks available for the whole season, including any playoff weeks.
    type: number
    required: true
  - name: venues
    description: Venues and slots available, for example "2 pitches at Riverside, Tuesdays 7pm and 8pm; 1 court at the school, Thursdays 6:30pm". Optional at the start; needed by the fixtures step.
    type: text
steps:
  - {id: registration, file: steps/01-registration.md, stage: plan, gate: approve}
  - {id: rules, file: steps/02-rules.md, stage: plan, gate: approve}
  - {id: fixtures, file: steps/03-fixtures.md, stage: plan, gate: approve}
  - {id: weekly-results, file: steps/04-weekly-results.md, stage: operate, gate: approve}
  - {id: playoffs, file: steps/05-playoffs.md, stage: operate, gate: approve}
  - {id: season-review, file: steps/06-season-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a recreational league season the way experienced volunteer organisers do: sign teams up on clear terms, agree the rules before the first match, publish fair fixtures that fit the venues, keep standings accurate every week, finish with playoffs, and learn from the season. Each step produces documents the organiser can send, then stops for approval. The weekly results step repeats once per round.

<league>
Sport: {{sport}}
Teams: {{teams}}
Weeks: {{weeks}}
{{#venues}}Venues and slots: {{venues}}{{/venues}}
</league>

Rules for every step: never invent fees, venue costs, insurance terms, governing-body requirements or results; when a figure is needed and not given, write [TBD] and say who decides it. Check all arithmetic (fixtures per team, slots used, points totals) before showing a table. Keep documents short enough for busy captains. Include only team and player details the organiser supplies. Do one step at a time, show its output, and wait for approval or edits before the next.
