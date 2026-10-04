---
schema: 1
id: plan-match-lineup
kind: prompt
title: Plan a match lineup
description: Plans a youth or amateur match lineup with positions, a substitution rotation and fair playing time given minutes so far, plus a short note explaining it to players and parents.
category: sports
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [lineup, substitutions, playing-time, rotation, youth-sports, volunteer-coach]
pairs_with:
  prompts: [plan-team-season, plan-youth-sports-practice, run-match-debrief]
args:
  - name: sport
    description: The sport and format, for example "7-a-side football", "netball", "basketball, 4 x 8-minute quarters" or "softball, 6 innings".
    type: string
    required: true
  - name: players
    description: One line per available player with name (first names are enough), positions they can play or want to try, and minutes or periods played so far this season. Note anyone arriving late, leaving early or returning from injury.
    type: text
    required: true
  - name: match_length_minutes
    description: Total playing time in minutes, excluding breaks.
    type: number
    required: true
  - name: policy
    description: equal-time = everyone plays as close to equal minutes as possible; development = equal-ish time with deliberate position rotation; competitive = stronger players get more time in key moments, but every player gets a guaranteed minimum.
    type: enum
    enum: [equal-time, development, competitive]
    default: equal-time
output_contract:
  format: markdown
  sections: [Assumptions, Starting lineup, Rotation grid, Minutes check, Note for players and parents]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help volunteer coaches build lineups that are fair, workable on the sideline and easy to defend to parents. Most lineup arguments come from three things: a child who sat out longer than others without explanation, the same players always in the glory positions, and substitutions improvised under pressure. A rotation planned before kick-off, balanced against the season's minutes so far, removes most of that.

Sport and format: {{sport}}
Match length: {{match_length_minutes}} minutes
Playing-time policy: {{policy}}

Players available:
{{players}}
</context>

<task>
1. Work out the number of players on the field, the substitution rules and the natural rotation points (quarters, halves, innings, rolling subs) for this sport and format. If the format is unclear and it changes the plan (for example rolling versus fixed substitutions), state the assumption you are using in one line. If no player list is given, ask for it and stop.
2. Compute each player's target minutes for this match: total field minutes (players on field times match length) divided fairly, adjusted so players who are behind on season minutes catch up. Under the competitive policy, set a stated minimum for every player (at least half the match unless the user says otherwise) and explain who gets extra time and why.
3. Build the starting lineup and a rotation grid by period, placing players in positions they can play. Under development, give each player at least one position they have not played much, without putting an inexperienced child in a position that is unsafe for them (for example a goalkeeper or catcher with no instruction).
4. Avoid any player sitting out two consecutive periods, keep at least one experienced player in key positions in each period, and handle late arrivals, early leavers and returning players explicitly.
5. Check the arithmetic: every period has exactly the right number of players, no one appears twice in a period, and each player's total matches the minutes check table. Fix any error before showing the plan.
6. Write a short, warm note the coach can send or read out explaining how time was shared and how positions rotate across the season.
</task>

<constraints>
- Never use playing time as punishment in youth recreational play; if the user asks for that, explain briefly why not and offer an alternative (a conversation, a practice focus).
- Use only the player names supplied, first names or initials only.
- Keep the grid simple enough to read on a clipboard in the rain.
- Respect any league minimum-play rules the user mentions; tell them to check their league's rules if unsure.
</constraints>

<output_format>
## Assumptions
## Starting lineup
## Rotation grid
Table: Player | Period 1 | Period 2 | … | Total minutes, with the position or "Bench" in each cell.
## Minutes check
Table: Player | Season minutes before | This match | New total.
## Note for players and parents
</output_format>
