---
schema: 1
id: schedule-tournament
kind: prompt
title: Schedule a one-day tournament
description: Builds a one-day sports tournament with groups or brackets, a timed schedule across courts or pitches with rest between games, tie-break rules and a results sheet.
category: sports
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tournament, bracket, round-robin, fixtures, sports-day, event-schedule]
pairs_with:
  prompts: [prepare-to-referee]
  workflows: [amateur-league-season-track]
args:
  - name: teams
    description: Number of teams (or players for an individual sport).
    type: number
    required: true
  - name: courts
    description: Number of courts, pitches or tables that can run games at the same time.
    type: number
    default: 2
  - name: game_minutes
    description: Length of one game in minutes, excluding changeover.
    type: number
    default: 15
  - name: format
    description: round-robin = everyone plays everyone (or within one group); knockout = single elimination with a bracket; groups-then-knockout = pool games then a bracket for the top teams.
    type: enum
    enum: [round-robin, knockout, groups-then-knockout]
    default: groups-then-knockout
  - name: details
    description: Optional - the sport, start and finish times, team names, a lunch break, whether you want a plate competition for early losers, and anything fixed (a team that must leave early).
    type: text
output_contract:
  format: markdown
  sections: [Format, Schedule, Tie-break rules, Results sheet, Checks, Organiser notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You schedule one-day tournaments for schools, clubs, offices and community events. A day goes wrong in predictable ways: too many games for the time available, a team playing back to back while another sits for an hour, ties in a group nobody knows how to break, and a final that starts after half the parents have gone home. The fix is to do the arithmetic first, choose a format that fits the time, then place games so rest is even.

Teams: {{teams}}
Courts or pitches: {{courts}}
Game length: {{game_minutes}} minutes
Format: {{format}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Do the arithmetic and show it: number of games in the chosen format, slots needed (games divided by courts, rounded up), slot length (game time plus a changeover of about 3 to 5 minutes), and total duration. If a finish time is given and the plan does not fit, say so and offer the nearest options (shorter games, more courts, smaller groups, fewer knockout rounds). If the number of teams is missing or less than two, ask and stop.
2. Format: describe the structure. For groups-then-knockout, choose group sizes (prefer groups of 3 to 5, as equal as possible) and how many teams advance, so the bracket is a power of two or uses byes for top seeds. For knockout, handle byes when the number is not a power of two. Offer a plate or consolation round when early losers would otherwise go home after one game, if time allows.
3. Schedule: a timed table of every game by slot and court, with placeholders for knockout games ("Winner A vs Runner-up B"). Use team names from the details if given, otherwise Team 1, Team 2 and so on.
4. Rest rule: no team plays two consecutive slots, and rest is spread as evenly as possible. Where the numbers make this impossible, say which teams are affected and minimise it.
5. Tie-break rules for groups, in a stated order (for example points, head-to-head, score difference, scored, then a shoot-out or coin toss), and rules for drawn knockout games suited to the sport.
6. Results sheet: a group table template and a bracket the organiser can fill in on the day.
7. Checks: list the verification you did - every group pairing appears once, no court is double-booked, the rest rule holds, and the final ends by the stated finish time.
8. Organiser notes: what to tell teams in advance, a buffer slot for overruns, and who runs the results table.
</task>

<constraints>
- Arithmetic must be correct; recount before answering rather than estimating.
- Keep the day fair: equal games in the group stage for every team.
- Leave at least one buffer slot before the final if the day runs longer than about three hours.
- Sport-neutral unless the details name a sport; then use its usual scoring and draw rules.
</constraints>

<output_format>
## Format
Include the arithmetic in a short block.
## Schedule
Table: Time | Court 1 | Court 2 | … with "Rest" listed where it helps.
## Tie-break rules
## Results sheet
Group tables and a bracket in plain text or a table.
## Checks
## Organiser notes
</output_format>

<examples>
Arithmetic, 10 teams, 2 courts, 12-minute games, groups-then-knockout: two groups of 5 give 10 + 10 = 20 group games; top two from each to semi-finals (2) and a final (1) make 23 games. 20 group games on 2 courts take 10 slots; with 3-minute changeovers each slot is 15 minutes, so the group stage takes 2 hours 30 minutes.
</examples>
