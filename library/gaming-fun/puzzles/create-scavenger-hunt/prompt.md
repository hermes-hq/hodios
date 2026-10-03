---
schema: 1
id: create-scavenger-hunt
kind: prompt
title: Create a scavenger hunt
description: Creates a scavenger or treasure hunt with a clue chain, hiding spots, age-appropriate riddles, an answer key, setup steps and safety notes. Use for parties, classrooms, team events or holidays.
category: puzzles
version: 1.0.0
status: incubating
stage: [plan, build]
role: [parent, teacher, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [treasure-hunt, scavenger-hunt, clue-chain, kids-party, team-building]
pairs_with:
  prompts: [write-riddles, create-escape-room-puzzles, plan-kids-party]
args:
  - name: location_and_players
    description: Where the hunt happens (rooms, garden, park, office, town), the players' ages and number, whether they play in teams, how long it should take, and any no-go areas.
    type: text
    required: true
  - name: theme
    description: A theme or story, for example "pirates", "space mission" or "birthday detective". Optional; a fitting one is proposed if omitted.
    type: string
output_contract:
  format: markdown
  sections: [Overview, Clue chain, Printable clues, Answer key, Setup, Running the hunt]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design treasure hunts that run smoothly on the day. The hunts that fail have clues that are too hard for the youngest player, hiding spots that the host forgot or that another guest moved, or one fast team that finishes in five minutes. A good hunt uses only the locations the host actually has, matches difficulty to the players' reading and reasoning age, and comes with a setup sheet the host can follow in fifteen minutes.

Location and players: {{location_and_players}}
{{#theme}}Theme: {{theme}}{{/theme}}
</context>

<task>
1. If the location's spots or the players' ages are missing, ask for them and stop; clues cannot be placed or pitched without them. If only the duration is missing, assume 30 to 45 minutes for children and 60 minutes for adults and say so.
2. Propose a theme if none was given, with a one-paragraph story the host reads at the start and a final treasure or reveal.
3. Build the clue chain: 6 to 12 stops depending on time, each clue leading to the next hiding spot, using only places named or clearly implied by the location. Order the stops to avoid backtracking and to keep players away from no-go areas.
4. Match the clue type to age: picture clues for pre-readers (3 to 5), simple rhymes for 6 to 8, riddles, word puzzles and simple codes for 9 to 12, and ciphers, anagrams, wordplay and multi-step logic for teens and adults. Mix two or three clue types.
5. For several teams, design parallel routes (the same stops in a different order, or colour-coded clue sets) so teams do not follow each other, and say how to label each set.
6. Add a hint ladder for each clue: a gentle hint and a near-giveaway the host can give.
7. Write the answer key and a setup sheet: what to print, where each clue goes (stop by stop), what to hide at the end, and the order to place them in (last clue first).
8. Write the host's running notes: the opening speech, rules, time checks, what to do if a clue goes missing, and a tie-breaker or ending for teams that finish at different times.
</task>

<constraints>
- Safety first: no hiding spots near water, roads, stairs for toddlers, ovens, electrical sockets or high shelves; outdoors, set a boundary and an adult at each public area. Note allergy risk if food is the treasure.
- Every riddle must have one clear answer that matches its hiding spot; check each against the location.
- Words and references must suit the youngest player, and no clue should require knowledge only some players have.
- Keep each printable clue short enough to fit on a half sheet of paper.
</constraints>

<output_format>
## Overview
Theme, story, number of stops, estimated time, treasure.
## Clue chain
Table: Stop | Hiding spot | Clue type | Leads to.
## Printable clues
Numbered, each ready to print, with its hint ladder underneath in italics.
## Answer key
## Setup
Checklist in placement order.
## Running the hunt
</output_format>
