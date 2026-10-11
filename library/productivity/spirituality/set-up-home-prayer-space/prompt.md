---
schema: 1
id: set-up-home-prayer-space
kind: prompt
title: Set up a home prayer space
description: Plans a prayer, meditation or shrine space at home in the person's tradition, from placement and orientation to objects, care and etiquette, fitted to a small flat, shared home or children.
category: spirituality
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [home-altar, prayer-corner, home-shrine, puja-room, meditation-space, sacred-space]
pairs_with:
  prompts: [plan-prayer-or-meditation-practice, write-blessing-or-prayer]
args:
  - name: tradition
    description: "Your tradition or practice, for example \"Orthodox Christian icon corner\", \"Hindu home mandir\", \"Muslim prayer area\", \"Buddhist shrine\", \"Catholic\", \"secular meditation\"."
    type: string
    required: true
  - name: home
    description: "The space you have: room size, shared or alone, children or pets, renting (no nails or candles allowed), budget."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Purpose, Where to put it, What to include, Safety and practicality, Care and etiquette]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people make a place to pray or meditate at home. You know traditions have customs about placement and care: an Orthodox icon corner is traditionally set on an east wall so people pray facing east, with a lampada and icons placed with reverence; a Hindu mandir is often placed in the north-east and kept clean, with customs about the bathroom and bedroom and about which images to keep; a Muslim prayer area needs a clean space and the qibla direction, and images are usually kept out of it; a Buddhist shrine sets the Buddha image highest, above head height when seated, with offerings of water, light and flowers; Catholic homes may keep a crucifix, holy water and images of saints. Practice varies by community and family, so local customs and a teacher's advice take precedence. Practical limits matter: open flames in rentals and around children, small rooms, shared homes with different beliefs.

Tradition: {{tradition}}
Home: {{home}}
</context>

<task>
1. Describe the purpose of the space in the {{tradition}} frame in two or three sentences.
2. Placement: where in this home it could go, orientation customs where they apply (and how to find the direction rather than stating it), height, and what to keep it away from by custom.
3. Essentials and optional items, separating what is customary from what is decoration, with a low-cost version.
4. Safety and practicality for this home: flame-free lights, securing items from children or pets, folding or portable setups for small or shared spaces.
5. Care and etiquette: cleaning, daily or weekly routines, how to dispose of old offerings or worn sacred items respectfully, and what the person should ask their teacher or community about.
6. If others in the home do not share the practice, a sentence on agreeing the space with them.
</task>

<constraints>
- Present customs as common practice with variation, not rules; point to the person's teacher or community for their specific practice.
- Do not state the qibla or any compass bearing for their location; tell them how to check it.
- Do not recommend open flames where the person says they are not allowed, or near children unsupervised.
- Do not recommend buying specific sellers or brands.
</constraints>

<output_format>
## Purpose
## Where to put it
## What to include
A table: Item | Customary or optional | Low-cost option.
## Safety and practicality
## Care and etiquette
</output_format>
