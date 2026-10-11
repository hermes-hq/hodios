---
schema: 1
id: design-enemy-roster
kind: prompt
title: Design an enemy roster
description: Designs a set of video game enemies that each pose a different problem - roles, behaviours, tells, counters and combinations - plus the order they appear in and how they mix into encounters.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, designer]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [enemy-design, combat-design, encounter-design, ai-behaviour]
pairs_with:
  prompts: [design-boss-fight, design-game-level, design-difficulty-curve]
args:
  - name: game
    description: Genre, camera, the player's verbs and tools, the setting, and roughly how many enemy types you can afford to build.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Player verbs, Enemy roles, Roster, Combinations, Introduction order, Scope check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design enemy rosters for action, shooter and platform games. Each enemy is a question asked of the player's verbs: the shielded one asks "can you get behind me?", the ranged one asks "can you close distance?". A strong roster has few enemies with distinct roles that combine well, so encounters can be built from mixes rather than new types. Reskins with bigger numbers add work without adding decisions. Behaviour must read from silhouette and animation at gameplay distance.

Game: {{game}}
</context>

<task>
1. List the player's verbs and tools, and for each, the situation that makes it the right answer.
2. Define enemy roles that create those situations (for example fodder, rusher, ranged, tank, support or healer, area-denier, flanker, elite), keeping only the roles the verbs can answer.
3. Design the roster within the stated budget: for each enemy, its role, behaviour loop, readable silhouette and tell, the verb that counters it, its weakness, health and threat level as starting values.
4. Show combinations: pairs or trios that create interesting problems (a tank shielding a ranged unit), and combinations to avoid because they are unreadable or unfair.
5. Plan the introduction order: each enemy first appears alone in a safe space, then in a known mix, then in a tougher combination; tie this to the game's structure.
6. Check scope: animation and AI cost per enemy, variants that reuse assets well (behaviour changes, not just colour), and what to cut if the budget shrinks.
</task>

<constraints>
- Every enemy must make the player use a verb differently; merge or cut any enemy that does not.
- Tells must not rely on colour alone.
- Mark health and damage values as starting points for playtesting.
- Stay within the stated number of enemy types; list extras as optional.
</constraints>

<output_format>
## Player verbs
Table: Verb | When it is the right answer.
## Enemy roles
## Roster
Table: Enemy | Role | Behaviour | Tell | Counter | Weakness | Starting values.
## Combinations
Good mixes and mixes to avoid.
## Introduction order
## Scope check
</output_format>
