---
schema: 1
id: choose-team-formation
kind: prompt
title: Choose a team formation that fits your players
description: Chooses a formation or system for an amateur or youth team from the players actually available, comparing two or three options with roles, weak spots, fitness demands and how to switch mid-game.
category: sports
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [formation, tactics, team-shape, positions, amateur-coach, system-of-play]
pairs_with:
  prompts: [plan-match-lineup, design-set-plays, scout-opponent]
args:
  - name: sport
    description: The sport, format and level, for example "9-a-side U11 football", "adult rec hockey", "club netball" or "slow-pitch softball".
    type: string
    required: true
  - name: squad
    description: Your available players with their strengths, weaknesses and fitness, by role or shirt number. Include how many usually turn up.
    type: text
    required: true
  - name: current_problems
    description: What goes wrong now - for example "we concede on the counter", "nobody supports the striker", "we run out of legs in the second half". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the squad suggests, Options compared, Recommended shape, Roles in plain words, Switching during a game, How to introduce it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help amateur coaches pick a formation or system of play. Novice coaches copy what professional teams use; experienced coaches start from their own players. A shape only works if the players can meet its demands: a back three needs defenders comfortable in wide spaces, a high press needs fitness for the whole game, a zone defence needs communication. At amateur level the best shape is usually the simplest one that hides the team's weaknesses, puts its best players where they touch the ball most, and that players can describe in one sentence. Attendance swings week to week, so a good choice also survives one or two missing players.

Sport: {{sport}}

Squad:
{{squad}}
{{#current_problems}}

Current problems:
{{current_problems}}
{{/current_problems}}
</context>

<task>
1. Summarise what the squad suggests: strengths to feature, weaknesses to protect, fitness level, and the usual number available.
2. Compare two or three realistic formations or systems for this sport and format in a table: what it asks of players, where it is strong, where it leaves gaps, fitness demand, and how it copes with one player missing.
3. Recommend one, with the reasons tied to specific players and to the current problems.
4. Describe each role in the recommended shape in plain words: where to be when we have the ball, when they have it, and the one job never to forget. Add a simple text diagram.
5. Explain how to switch shape during a game (when losing late, when defending a lead, when a player tires) with the trigger and the one instruction to give.
6. Plan how to introduce it over two or three practices and what to watch in the first match to judge whether it works.
</task>

<constraints>
- Base every recommendation on the squad described; do not assume players or skills that are not listed.
- For youth teams, keep rotation through positions possible and do not lock children into one role; note when a shape works against development.
- Respect format rules (numbers on the field, age-group restrictions such as no deliberate zone defence in some youth leagues) and ask the coach to confirm them locally.
- Avoid professional jargon unless explained in one line.
</constraints>

<output_format>
## What the squad suggests
## Options compared
Table: Shape | Asks of players | Strong at | Gaps | Fitness | One player short.
## Recommended shape
Text diagram, then the reasons.
## Roles in plain words
## Switching during a game
## How to introduce it
</output_format>
