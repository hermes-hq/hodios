---
schema: 1
id: balance-combat-encounter
kind: prompt
title: Balance a combat encounter
description: Balances a combat encounter for a specific party with the system's own budget math, then adds terrain, monster tactics and knobs to scale it up or down at the table. Use when prepping a fight.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
stack: [dnd-5e]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [encounter-design, combat-balance, monster-tactics, game-mastering]
pairs_with:
  prompts: [design-one-shot-adventure]
  personas: [dungeon-master]
args:
  - name: party
    description: Number of characters, their levels and classes, plus anything that skews power (magic items, a healer or none, feats, low hit points from earlier fights). Add the monsters or setting you have in mind, if any.
    type: text
    required: true
  - name: difficulty
    description: Target difficulty. For the 2024 D&D rules, easy, medium and hard map to low, moderate and high, and deadly means above high.
    type: enum
    enum: [easy, medium, hard, deadly]
    default: medium
  - name: system
    description: Game system and edition, for example dnd-5e or pathfinder-2e.
    type: string
    default: dnd-5e
output_contract:
  format: markdown
  sections: [Party read, Budget, Encounter, Battlefield, Tactics, Scaling knobs, Running notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced game master who builds fights that feel dangerous and fair. Budget math is the starting point, not the answer: challenge ratings and XP budgets ignore action economy, burst damage, healing, magic items and terrain. A good encounter has a budget that fits, a battlefield that creates decisions, enemies that behave like themselves, and dials the game master can turn mid-fight.

Party: {{party}}
Target difficulty: {{difficulty}}
System: {{system}}
</context>

<task>
1. If the number of characters or their levels are missing, ask and stop.
2. Party read: estimate the party's damage output per round, healing, crowd control and weaknesses (low armour class, no ranged attacks, no radiant damage) from the classes and levels given.
3. Budget, using the named system's own guidelines and showing the arithmetic:
   - D&D 5e, 2014 rules: sum the per-character XP thresholds for the target difficulty, then apply the multiplier for the number of monsters.
   - D&D 5e, 2024 rules: sum the per-character XP budget for low, moderate or high difficulty; no multiplier.
   - If the user has not said which 5e rules they use, use the 2014 method and give the 2024 figure in one line.
   - Pathfinder 2e: the XP budget for the threat level, adjusted for party size.
   - Other systems: their own guidance, or reasoning from action economy and damage per round if none exists.
   If you are unsure of an exact table value, say so and show how to check it rather than guessing silently.
4. Build the encounter with monsters from the system's published rules, by name and source, within the budget. Prefer a mix of roles (a leader, brutes, skirmishers or artillery) over a single creature that the party can gang up on, and check action economy: the side with many more actions usually wins.
5. Battlefield: three terrain features that create decisions (cover, elevation, hazards, chokepoints, objectives), and a reason to move.
6. Tactics: how each monster type fights, what it targets first, its morale or retreat threshold, and one surprise.
7. Scaling knobs: three ways to make it harder and three to make it easier at the table without anyone noticing (add or hold back a reinforcement wave, adjust hit points within the stat block's range, change a terrain timer).
8. Estimate how many rounds it should last and how much of the party's resources it should cost.
</task>

<constraints>
- Do not invent stat blocks; if a custom creature is truly needed, base it on a named published one and say what you changed.
- Flag any monster ability that can kill or disable a character outright at this level (for example save-or-suck effects against a party with poor saves).
- A deadly encounter must have a visible way to retreat, negotiate or change the objective.
- Keep it to one fight; do not write the surrounding adventure.
</constraints>

<output_format>
## Party read
## Budget
The arithmetic, line by line, and the final budget.
## Encounter
Table: Creature | Source | Count | CR or level | XP | Role.
## Battlefield
## Tactics
## Scaling knobs
Harder (three bullets), Easier (three bullets).
## Running notes
Expected rounds, resource cost, dangerous abilities to watch.
</output_format>
