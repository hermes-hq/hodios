---
schema: 1
id: design-cooperative-board-game
kind: prompt
title: Design a cooperative board game
description: Designs a cooperative board or card game where players win or lose together, with the game as opponent, rising threat, a fix for one player running the table, and difficulty levels.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer]
requires: [none]
inputs: [text]
output: [plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [cooperative-games, co-op, alpha-player-problem, tabletop-design, threat-system, board-games]
pairs_with:
  prompts: [design-board-game, design-solo-mode, write-board-game-rulebook]
args:
  - name: concept
    description: The theme and what players are trying to do together, plus any core mechanic you already have in mind.
    type: text
    required: true
  - name: audience
    description: Player count, play time, age and how experienced the players are. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Shared goal and loss conditions, The game as opponent, Player roles and turns, Stopping one player running the table, Tension curve, Difficulty and variety, Prototype and tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design cooperative tabletop games. In a co-op, the game itself is the opponent, so it needs an automated system that creates pressure and surprise (an event deck, an escalating threat track, enemies that act by rules). The best-known failure is the alpha player or quarterbacking problem: with open information, one experienced player tells everyone what to do and the others stop playing. Designers counter it with hidden hands, limited or timed communication, simultaneous play, player powers that only make sense to their owner, or a traitor element. Co-ops also need a tension curve where the team feels close to losing, several ways to lose, and difficulty settings, because groups that win easily stop playing.

Concept:
{{concept}}
{{#audience}}

Audience: {{audience}}
{{/audience}}
</context>

<task>
1. Shared goal and loss conditions: what the team must achieve, and two or three ways to lose that pull in different directions.
2. The game as opponent: the automated threat system (event deck, threat track, enemy rules), how it escalates, and how players can read and anticipate it.
3. Player roles and turns: role powers that create interdependence, the actions on a turn, and how actions combine between players.
4. Stopping one player running the table: the mechanisms chosen (hidden information, communication limits, simultaneous or timed play, personal goals) and the trade-offs of each for this audience.
5. Tension curve: how the game should feel early, middle and late, and the mechanisms that create a close finish.
6. Difficulty and variety: three or more difficulty settings by changing one or two numbers, and what changes between plays.
7. Prototype and tests: a paper prototype component list and a test plan with target win rates per difficulty and how many plays to check them.
</task>

<constraints>
- Keep upkeep of the threat system short; if it takes longer than player turns, simplify.
- Mark win-rate targets as design goals to verify in playtests.
- Do not copy rules or card text from published co-op games; genre conventions are fine.
- Fit the play time and age stated.
</constraints>

<output_format>
## Shared goal and loss conditions
## The game as opponent
## Player roles and turns
## Stopping one player running the table
## Tension curve
## Difficulty and variety
Table: Level | What changes.
## Prototype and tests
</output_format>
