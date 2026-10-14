---
schema: 1
id: design-character-ability-kit
kind: prompt
title: Design a character ability kit
description: Designs a playable character's ability kit for a hero, fighter or class-based game - role, three to five abilities, cooldowns, combos, counterplay and skill floor and ceiling.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [character-design, ability-kit, hero-design, counterplay, combat-design, class-design]
pairs_with:
  prompts: [balance-asymmetric-factions, design-enemy-roster, improve-game-feel]
args:
  - name: game
    description: The game type and combat rules - for example "5v5 hero shooter", "2D fighting game", "co-op action RPG with 4 classes" - and the resource systems (cooldowns, mana, meter).
    type: text
    required: true
  - name: concept
    description: The character's fantasy and theme, and the role they should fill in the roster.
    type: text
    required: true
  - name: roster
    description: Existing characters and their roles, so the new one fills a gap and has counters. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fantasy and role, Abilities, Combos and decisions, Counterplay, Skill floor and ceiling, Balance levers and tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design character ability kits. A strong kit delivers one clear fantasy, fills a role the roster needs, and gives the player interesting decisions: when to spend a cooldown, which ability to hold for the opponent's move, how to combine abilities. Weak kits are a pile of unrelated effects, or abilities so strong they have no answer. Experienced designers write every ability with its counterplay (a tell, a window, a hard counter in the roster), set a low skill floor so new players contribute and a high ceiling so experts keep improving, and expose a small number of numbers as balance levers. Visual and audio clarity of each ability matters as much as its numbers in competitive games.

Game:
{{game}}

Character concept:
{{concept}}
{{#roster}}

Roster:
{{roster}}
{{/roster}}
</context>

<task>
1. Fantasy and role: the one-sentence fantasy, the role in the team or roster, the gap it fills, and its intended strengths and weaknesses.
2. Abilities: three to five abilities, each with input, effect, numbers as starting values (damage, duration, range, cooldown or cost), the tell or telegraph opponents see, and why it belongs to this fantasy.
3. Combos and decisions: the main combos or sequences, the key decision each ability creates, and what a good player does differently from a new one.
4. Counterplay: how opponents see and answer each ability, which existing characters counter this one and which it counters.
5. Skill floor and ceiling: what a beginner can do in their first game, and the advanced techniques experts will find.
6. Balance levers and tests: the three to five numbers to tune first, the win-rate or pick-rate signals to watch, and specific playtest scenarios.
</task>

<constraints>
- Every ability must have counterplay; no unavoidable instant effects without a cost or tell.
- Mark all numbers as starting values to tune.
- Keep the kit readable: no more than one complex mechanic per character.
- Do not copy abilities from published characters; genre conventions are fine.
- If the roster is not given, state the role assumptions made.
</constraints>

<output_format>
## Fantasy and role
## Abilities
Table: Ability | Input | Effect | Starting numbers | Tell | Counter.
## Combos and decisions
## Counterplay
## Skill floor and ceiling
## Balance levers and tests
</output_format>
