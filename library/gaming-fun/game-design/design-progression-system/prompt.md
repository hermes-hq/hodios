---
schema: 1
id: design-progression-system
kind: prompt
title: Design a player progression system
description: Designs a video game progression system - XP and level curve, skill tree or upgrade paths, unlock pacing and power versus content - with numbers in a table and checks for grind and dead choices.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [progression, skill-tree, xp-curve, unlock-pacing, power-curve, rpg-systems]
pairs_with:
  prompts: [design-game-economy, design-difficulty-curve, turn-game-design-into-tech-spec]
  personas: [game-design-mentor]
args:
  - name: game
    description: The game's genre, core loop, intended length (hours to finish, or session length for endless games) and what players do moment to moment.
    type: text
    required: true
  - name: progression_goals
    description: What progression should do for players - for example "let players specialise into a build", "keep a 40-hour campaign feeling fresh", "give returning players something every session".
    type: text
    required: true
  - name: constraints
    description: Limits such as content budget, multiplayer fairness, no pay-to-win, or an existing level cap. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What progression is for, Progression layers, Level and XP curve, Choices and builds, Unlock schedule, Risks and checks, Tuning plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design progression systems for video games. Progression has to answer what the player gets for playing, how often, and whether choices matter. Common failures: an XP curve that front-loads rewards then stalls into grind; power that outgrows the content so the game becomes trivial, or enemies that scale with the player so levelling feels pointless; skill trees full of +5% nodes nobody remembers choosing; one dominant build; and unlocks that arrive after the player needed them. Strong systems layer short, medium and long-term goals (a reward every few minutes, a meaningful choice every session, a long goal for the whole game), separate horizontal progression (new options) from vertical (bigger numbers), and pace unlocks against the content and difficulty curve.

Game:
{{game}}

Progression goals:
{{progression_goals}}
{{#constraints}}

Constraints:
{{constraints}}
{{/constraints}}
</context>

<task>
1. State what progression is for in this game in two or three sentences, and the player fantasy it supports.
2. Define the progression layers (short, medium, long-term), what each rewards and roughly how often, and which are vertical versus horizontal.
3. Propose the level or XP curve with a formula and a table of key levels: XP needed, estimated time to reach, and what the player gets. Show how it lines up with the intended play length.
4. Design the choices: skill tree, upgrade paths or perks, with three to five archetype builds, the node types that matter (new verbs, rule changes) versus filler stat nodes, and respec rules.
5. Write the unlock schedule: when each mechanic, item tier or area opens, placed just before the content that needs it.
6. Check risks: grind walls, runaway power versus content, dominant builds, dead nodes, and missable progression; for multiplayer, the gap between new and veteran players.
7. Give a tuning plan: the few numbers that control pacing, the telemetry or playtest signs to watch, and target ranges to verify.
</task>

<constraints>
- Mark all numbers as starting values to tune in playtests, not final balance.
- Prefer fewer, meaningful choices over large trees of small stat bonuses.
- Do not design progression that requires spending real money to stay competitive; flag any monetisation link the user requests.
- Fit the stated content budget; do not propose more unlocks than the game can deliver.
</constraints>

<output_format>
## What progression is for
## Progression layers
Table: Layer | Rewards | Frequency | Vertical or horizontal.
## Level and XP curve
Formula, then Table: Level | XP | Time to reach | Reward.
## Choices and builds
## Unlock schedule
## Risks and checks
## Tuning plan
</output_format>
