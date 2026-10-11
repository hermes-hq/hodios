---
schema: 1
id: design-loot-table
kind: prompt
title: Design a loot table
description: Designs video game loot tables - rarity tiers, drop rates per source, bad-luck protection, duplicates and expected time to key items - with the maths shown and exploit checks.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [loot, drop-rates, rarity-tiers, bad-luck-protection, reward-design, expected-value]
pairs_with:
  prompts: [calculate-game-probabilities, design-game-economy, design-progression-system]
args:
  - name: game
    description: The game, its loop, session length, and what loot does for the player (power, cosmetics, crafting materials, collection).
    type: text
    required: true
  - name: sources
    description: Where loot comes from - enemy types, chests, bosses, quests, end-of-match rewards - and roughly how many of each a player meets per hour.
    type: text
    required: true
  - name: items
    description: The item pool or categories, with any items that must be rare or must be guaranteed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What loot is for, Rarity tiers, Tables per source, Expected time to key items, Bad-luck protection and duplicates, Risks and exploits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design loot tables. Random rewards create excitement, but pure randomness produces long unlucky streaks: an item at 1% per kill has about a 37% chance of not dropping after 100 kills, and around 5% of players will still be waiting after 300. Good loot design decides first what loot is for, then sets rarity tiers with clear jumps in value, tunes rates per source so time spent matches reward, and adds bad-luck protection (pity counters, rising chances, guaranteed drops after N attempts, or deterministic currency to buy what did not drop). Duplicates need a use. Where rewards are bought with real money, odds disclosure and age rules apply in many countries, and the line between game design and gambling-like mechanics needs care.

Game:
{{game}}

Loot sources:
{{sources}}
{{#items}}

Items:
{{items}}
{{/items}}
</context>

<task>
1. State what loot is for in this game and what feeling each tier should create.
2. Define rarity tiers with value or power differences, colour or naming conventions, and how many items in each.
3. Write a loot table per source: tier weights or drop chances, number of rolls, guaranteed drops, and any conditions (first kill, difficulty, level band).
4. Calculate the expected attempts and play time to get a typical item of each tier and the specific key items, including the median and the unlucky 90th or 95th percentile, showing the method.
5. Design bad-luck protection and duplicate handling: the mechanism, its numbers, and how it changes the 95th percentile.
6. Check risks and exploits: farming the most efficient source, save-scumming or rerolling, inflation of the economy, and players feeling cheated by visible odds.
7. If any loot is obtained through real-money purchase, flag disclosure and age-rating rules to check and suggest a non-random alternative.
</task>

<constraints>
- Show the probability method so numbers can be checked; mark all rates as starting values for playtesting.
- Never design paid random rewards aimed at children or tuned to exploit compulsive spending.
- Do not state specific national regulations as current fact; tell the user to confirm the rules for their markets and platforms.
- Keep tables implementable: weights that sum correctly and conditions an engineer can code.
</constraints>

<output_format>
## What loot is for
## Rarity tiers
Table: Tier | Value | Count | Look.
## Tables per source
One table per source: Tier or item | Weight or chance | Notes.
## Expected time to key items
Table: Item or tier | Chance per attempt | Median attempts | 95th percentile | Time.
## Bad-luck protection and duplicates
## Risks and exploits
</output_format>
