---
schema: 1
id: design-homebrew-item
kind: prompt
title: Design a homebrew magic item
description: Designs homebrew magic items or gear balanced against a game system's official items, with rarity, exact mechanics, a story hook and a balance check. Use before adding loot to a campaign.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
requires: [none]
inputs: [text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [homebrew, magic-items, loot, game-balance, game-mastering]
pairs_with:
  prompts: [design-campaign-arc, balance-combat-encounter]
  personas: [dungeon-master]
args:
  - name: concept
    description: The item idea, its flavour, who will get it and why (for example "a lantern that reveals lies, for the party's bard").
    type: text
    required: true
  - name: system
    description: Game system and edition, for example dnd-5e (2014 or 2024 rules), pathfinder-2e or shadowdark.
    type: string
    required: true
  - name: party_level
    description: Average level or tier of the characters who will use it. Optional, but balance is a guess without it.
    type: number
output_contract:
  format: markdown
  sections: [Item card, Design notes, Balance check, Story hook, Variants]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game designer who writes homebrew for {{system}} and knows its official item lists well. Homebrew items fail in predictable ways: they stack with existing bonuses, outscale official items of the same rarity, add resources nobody tracks, or have vague wording that starts arguments at the table. A good item is fun at the table, clear on first read, and comparable to something already in the books.

Concept: {{concept}}
System: {{system}}
{{#party_level}}Party level: {{party_level}}{{/party_level}}
</context>

<task>
1. If the system is unfamiliar to you or the concept is too vague to design (no idea what the item does or feels like), ask one question and stop.
2. Pick a rarity, level or price tier that fits the system's guidance{{#party_level}} and a party of level {{party_level}}{{/party_level}}. If no party level is given, state the level range the item suits and treat that as an assumption. If the concept as asked would break the game at that level, say so in one sentence and design the closest version that keeps the fantasy and fits the tier.
3. Write the item in the system's own house style: name, type, rarity or level, attunement or investment if the system uses it, and the mechanics in exact rules language (action economy, range, duration, charges and how they recharge, saving throws or DCs and how they are set).
4. Name two or three official items of the same tier by name and compare: what this item does better, what it does worse, and why it is not strictly better than any of them.
5. Check the item for problems: stacking with common bonuses or features, infinite or repeatable loops, effects that solve a whole adventure pillar (flight, teleport, unlimited detection), conditions that trivialise encounters, and anything that forces bookkeeping every round. Fix what you find and say what you changed.
6. Write a short story hook: the item's origin, a quirk or minor drawback with roleplay value, and one way it could tie into the campaign.
7. Offer one weaker and one stronger variant so the game master can tune it.
</task>

<constraints>
- Use the system's real terms and numbers; do not mix editions. If the system has several rule versions (such as D&D 5e 2014 and 2024), follow the one named or say which one you assumed.
- Mechanics must be resolvable without asking the game master to improvise. No "at the DM's discretion" in the core effect.
- Reference official items by name only; do not copy their text.
- Keep the item card under 150 words.
</constraints>

<output_format>
## Item card
The item as it would appear on a handout.
## Design notes
Two or three sentences on the intent and the fun it creates.
## Balance check
Table: Comparison item | Tier | Better at | Worse at. Then bullets for problems found and fixes made.
## Story hook
Origin, quirk, campaign tie-in.
## Variants
Weaker and stronger, one line each with the exact change.
</output_format>
