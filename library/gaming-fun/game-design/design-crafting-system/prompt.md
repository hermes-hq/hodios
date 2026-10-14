---
schema: 1
id: design-crafting-system
kind: prompt
title: Design a crafting system
description: Designs a video game crafting system - purpose, resources and recipes, discovery, crafting tiers, inventory friction and links to the economy and progression - with a starter recipe table.
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
level: intermediate
depth: specific
tags: [crafting, recipe-design, resource-gathering, survival-games, inventory-design, item-design]
pairs_with:
  prompts: [design-game-economy, design-progression-system, design-loot-table]
args:
  - name: game
    description: The genre, core loop and where crafting fits - survival, RPG gear, base building, cooking, potion brewing.
    type: text
    required: true
  - name: purpose
    description: What crafting should add, for example "a reason to explore every biome", "player choice over gear", "a relaxing side activity". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What crafting is for, Resources, Recipe structure, Discovery, Tiers and progression, Friction and quality of life, Starter recipes, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design crafting systems. Crafting earns its place when it creates decisions (what to make with limited resources), gives exploration a purpose (rare materials in dangerous places), or expresses creativity (building, combining). It fails when it becomes a chore: dozens of near-identical materials, recipes that must be looked up on a wiki, menus that take longer than playing, crafted items that are worse than drops, or inventory limits that force constant trips home. Good systems keep the resource list short with clear sources, make recipes learnable through play, place each crafting tier just before the challenge that needs it, and connect to the economy so materials have sinks.

Game:
{{game}}
{{#purpose}}

Purpose: {{purpose}}
{{/purpose}}
</context>

<task>
1. State what crafting is for in this game and the decisions it creates.
2. Define resources: a short list grouped by tier, where each comes from, how rare it is, and its sinks.
3. Design recipe structure: fixed recipes, flexible ingredient slots, or experimentation; inputs, outputs and any quality or modifier system.
4. Design discovery: how players learn recipes (blueprints, experimentation with feedback, NPCs, unlock by use) without needing a wiki.
5. Tiers and progression: crafting stations or levels, how they pace against content and difficulty, and how crafted items compare with found items.
6. Friction and quality of life: inventory and storage rules, crafting from storage, batch crafting, pinned recipes, and what friction to keep on purpose.
7. Write a starter table of ten to fifteen recipes covering the first hours.
8. List risks: material bloat, dominant recipes, duping or market exploits in multiplayer, and crafting that trivialises challenge.
</task>

<constraints>
- Keep the resource list as short as the design allows; justify every material.
- Mark quantities and rates as starting values to tune.
- Do not copy recipe lists from published games.
- Fit the game's tone; a cosy game and a hardcore survival game need different friction.
</constraints>

<output_format>
## What crafting is for
## Resources
Table: Resource | Tier | Source | Rarity | Sinks.
## Recipe structure
## Discovery
## Tiers and progression
## Friction and quality of life
## Starter recipes
Table: Recipe | Inputs | Station | Unlock | Purpose.
## Risks
</output_format>
