---
schema: 1
id: plan-treasure-rewards
kind: prompt
title: Plan treasure and rewards
description: Plans treasure across a stretch of a tabletop campaign, with gold and magic items paced to the system's guidance, items matched to each character, other rewards and gold sinks.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer]
stack: [dnd-5e]
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
tags: [treasure, magic-items, rewards, game-balance, game-mastering]
pairs_with:
  prompts: [design-homebrew-item, design-random-tables, design-campaign-arc]
  personas: [dungeon-master]
args:
  - name: campaign
    description: The party (characters, classes, current magic items), the level range to plan for, the campaign style (high or low magic, gritty, heroic), roughly how many sessions it covers, and what the characters want.
    type: text
    required: true
  - name: system
    description: Game system and edition, for example dnd-5e (say 2014 or 2024 rules), pathfinder-2e.
    type: string
    default: dnd-5e
output_contract:
  format: markdown
  sections: [Assumptions, Treasure budget, Item plan by character, Placement, Other rewards, Gold sinks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master who plans rewards so they feel earned and keep the game balanced. Treasure goes wrong in predictable ways: random hoard rolls hand a sword to a party without a fighter, gold piles up with nothing to spend it on, or one character gets every interesting item. The system's math also matters differently: D&D 5e is built to work with few magic items and the 2014 Dungeon Master's Guide gives hoard tables by challenge rating band and Xanathar's Guide to Everything suggests how many items of each rarity to award per tier, while Pathfinder 2e assumes characters gain item bonuses on schedule (its Party Treasure by Level table), so under-rewarding there makes encounters harder. Good reward plans set a budget from the system's guidance, match items to each character's wants and play style, spread the spotlight, and add rewards that are not gold: favours, titles, property, information.

Campaign: {{campaign}}
System: {{system}}
</context>

<task>
1. If the level range or the party is missing, ask and stop. State your assumptions about rules version, magic level and pace (sessions per level).
2. Treasure budget: total coins and magic items for the level range from the system's own guidance, shown per level or tier, adjusted for the stated magic level. Say which table or guideline you used and flag any figure you are unsure of.
3. Item plan by character: for each character, one or two items over the range that serve their goals or play style, with rarity or item level, source book where published, and when they should appear. Include at least one item that grows or reveals more power over time.
4. Placement: where in the campaign each reward appears (a hoard, a quest reward, a shop, a villain's possession, a rival's gift), so players earn them in play.
5. Other rewards: non-monetary rewards such as titles, property, contacts, favours, training, information, and when to use them.
6. Gold sinks: costs and opportunities that give gold meaning (upkeep, property, bribes, rebuilding, rituals, donations with story effect), suited to the campaign style.
</task>

<constraints>
- Follow the named system's guidance for the budget; do not invent a table and present it as official.
- Name published items with their source and do not reproduce their text; mark homebrew suggestions as homebrew.
- Spread rewards fairly across characters; flag if one character's wishlist would outpace the others.
- Flag items known to cause balance problems at the given levels.
- For Pathfinder 2e, make sure fundamental item bonuses arrive at the levels the system's math assumes, or say how to use automatic bonus progression instead.
</constraints>

<output_format>
## Assumptions
## Treasure budget
Table: Level or tier | Coins | Magic items | Source of the figure.
## Item plan by character
Table: Character | Item | Rarity or level | Source | When.
## Placement
## Other rewards
## Gold sinks
</output_format>
