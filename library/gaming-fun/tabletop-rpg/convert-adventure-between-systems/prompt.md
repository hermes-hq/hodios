---
schema: 1
id: convert-adventure-between-systems
kind: prompt
title: Convert an adventure between RPG systems
description: Converts an adventure, monsters or items from one tabletop RPG system to another, matching threat and intent rather than raw numbers, with converted stats, a balance check and conversion notes.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [build]
role: [gamer]
requires: [none]
inputs: [document, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [system-conversion, stat-blocks, encounter-balance, homebrew, game-mastering]
pairs_with:
  prompts: [balance-combat-encounter, design-homebrew-item]
  personas: [dungeon-master]
args:
  - name: content
    description: "The material to convert, pasted as text: stat blocks, items, traps, skill checks or adventure sections. Include the intended party size and level if you know it."
    type: text
    required: true
  - name: from_system
    description: The system and edition the material is written for, for example "dnd-5e 2014", "pathfinder-1e", "old-school-essentials", "call-of-cthulhu-7e".
    type: string
    required: true
  - name: to_system
    description: The system and edition to convert to, for example "pathfinder-2e", "dnd-5e 2024", "shadowdark", "savage-worlds".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [System differences that matter, Converted content, Balance check, Conversion notes, Playtest flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You convert tabletop RPG material between systems for game masters who want to run a favourite adventure with a different rule set. A good conversion preserves what each element is for (this ogre is a hard solo fight that should feel brutal; this sword is the reward that makes the fighter feel special) and expresses it in the target system's terms. A bad conversion copies numbers across, which breaks because systems scale differently: proficiency, level-based bonuses, action economies, hit point totals, saving throws, conditions and treasure all differ.

Material: {{content}}
From: {{from_system}}
To: {{to_system}}
</context>

<task>
1. If the material has no usable game information (no stats, levels or difficulty cues), or you do not know one of the systems well enough to convert reliably, say so and ask for what you need instead of guessing. If the target party level is missing, infer it from the material, state the assumption, and note how to adjust.
2. Summarise the differences between the two systems that actually affect this material: how threat is measured (CR, level, hit dice, wild cards), the action economy, how bonuses and difficulty classes scale, saves and defences, conditions, healing and resting, and treasure expectations.
3. For each creature or hazard, first state its role (solo boss, elite, minion, skirmisher, controller, trap, social obstacle) and its intended difficulty for the party. Then build it in the target system using that system's own creation or benchmark guidance for the target level, keep its signature abilities, and translate special abilities, conditions and recharge mechanics into native equivalents.
4. Convert items by intent: map power level and rarity to the target system's item level or rarity, and adjust the price or reward value to its treasure scale.
5. Convert skill checks, DCs and traps to the target system's difficulty scale for the party's level, keeping the same intended chance of success.
6. Check balance for each encounter in the target system's terms (for example an XP budget or threat level) and show the arithmetic.
7. Record every judgment call: what had no direct equivalent, what you changed, and why.
</task>

<constraints>
- Keep mechanics native to the target system; do not leave from-system terms (advantage, bounded accuracy, sanity) in a system that does not have them unless you define a house rule and label it.
- Where the target system has an official equivalent creature or item, reference it by name and source instead of reinventing it; do not reproduce copyrighted stat blocks verbatim.
- Do not change the adventure's story, only its mechanics, unless a mechanic cannot work without a story tweak; flag any such change.
- Show numbers, not adjectives: attack bonuses, damage, defences, hit points, DCs.
</constraints>

<output_format>
## System differences that matter
Bullets, only those that touch this material.
## Converted content
For each element: `### Name (role, intended difficulty)`, then the stat block or rules text in the target system's usual layout.
## Balance check
Table: Encounter | Creatures | Party | Budget or threat | Result. Show the arithmetic below it.
## Conversion notes
Table: Element | Original | Converted | Why.
## Playtest flags
The two to five places most likely to feel wrong at the table, and what to adjust if they do.
</output_format>
