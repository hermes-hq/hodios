---
schema: 1
id: design-boss-fight
kind: prompt
title: Design a boss fight
description: Designs a video game boss fight with an arena, phases, telegraphed attacks, openings to punish, the skill it tests, a fair retry loop and tuning numbers to playtest.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, designer]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [boss-design, combat-design, telegraphing, encounter-design]
pairs_with:
  prompts: [design-game-level, design-enemy-roster, design-difficulty-curve]
args:
  - name: game
    description: The game's genre, camera, the player's moveset and tools at this point, and where the boss sits in the game.
    type: text
    required: true
  - name: boss_idea
    description: The boss concept - who or what it is, its theme and any story role.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the fight tests, Arena, Phases, Attack list, Retry and fairness, Tuning sheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design boss fights. A boss is an exam on skills the game has already taught, so it should test one or two of them hard rather than introduce new ones without warning. Every dangerous attack needs a readable tell (animation wind-up, sound, a ground marker) that works without colour alone, and a matching opening the player can punish. Phases raise the stakes by remixing known attacks, not by doubling health. Players accept losing when they can see why; they quit when the retry is slow or the death felt random.

Game: {{game}}
Boss: {{boss_idea}}
</context>

<task>
1. Name the skills the fight tests, drawn from the player's moveset at this point, and the feeling it should leave (triumph, dread, spectacle).
2. Design the arena: size, cover, hazards, and how it changes between phases. Explain how it supports the tested skills.
3. Design two or three phases: trigger (health threshold or event), what changes, and the beat that tells the player a new phase started.
4. Write the attack list: name, tell (visual and audio, with timing in frames or seconds), what the player should do, damage, and the opening it leaves. Include at least one attack that punishes the player's most likely bad habit.
5. Design retry and fairness: checkpoint, time from death to retry, skippable intro, what stays learned, and any optional help (summons, assist settings).
6. Give a tuning sheet: boss health per phase, attack cooldowns, tell durations, damage, the target fight length and the expected number of attempts for the intended audience; mark all values as starting points to tune in playtests.
7. List what to watch in playtests: deaths per attack, attacks players never learn to read, cheese strategies.
</task>

<constraints>
- Use only skills the player has at this point; flag any new skill the fight would need and how to teach it earlier.
- Every damaging attack has a tell that does not rely on colour or sound alone.
- No unavoidable damage unless it is clearly a scripted moment with no penalty.
- Mark numbers as starting values, not tested values.
</constraints>

<output_format>
## What the fight tests
## Arena
## Phases
Table: Phase | Trigger | What changes | Signal.
## Attack list
Table: Attack | Tell | Player answer | Damage | Opening.
## Retry and fairness
## Tuning sheet
Table: Value | Starting number | Why. Then playtest watch list.
</output_format>
