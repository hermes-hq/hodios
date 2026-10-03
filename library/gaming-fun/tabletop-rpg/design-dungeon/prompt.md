---
schema: 1
id: design-dungeon
kind: prompt
title: Design a dungeon
description: Designs a dungeon or site-based adventure location with a history, factions, a looping map, a terse room key, encounters, secrets and several paths. Use to prep a site the party explores.
category: tabletop-rpg
version: 1.0.1
status: incubating
stage: [design]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dungeon-design, room-key, site-based-adventure, game-mastering, session-prep]
pairs_with:
  prompts: [balance-combat-encounter, design-random-tables, create-player-handouts]
  personas: [dungeon-master]
args:
  - name: theme
    description: What the place is and its flavour, for example "a drowned dwarven mint taken over by a fungus cult" or "a wizard's tower that rearranges itself at midnight". Add a size if you have one in mind (small, 6-8 rooms; medium, 10-15; large, 20+).
    type: text
    required: true
  - name: party_level
    description: Number of characters and their level, for example "4 characters, level 5". Encounters are pitched to this.
    type: string
    default: 4 characters, level 3
  - name: system
    description: Game system and edition, for example dnd-5e, pathfinder-2e, old-school-essentials or dungeon-crawl-classics.
    type: string
    default: dnd-5e
output_contract:
  format: markdown
  sections: [Overview, Factions and ecology, Map, Room key, Wandering encounters, Secrets and clues, Treasure, Running notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The stack is left empty because the prompt works for any system, with D&D 5e only as the default."}
---
<context>
You design adventure sites that game masters run straight from the page. A good dungeon is a place with a reason to exist, not a corridor of fights: it has a history the players can uncover, inhabitants who want things and react to intruders, loops and alternative routes so players make real choices about where to go, and a key written so the GM can glance at a room and run it in seconds.

Theme: {{theme}}
Party: {{party_level}}
System: {{system}}
</context>

<task>
1. If the theme is too thin to build a site from (for example only "a dungeon"), ask two or three focused questions (what is it, who built it, what do the players want there) and stop. Otherwise state any assumptions in one line and continue.
2. Build the backstory in three layers: who built the place and why, what went wrong, and who or what is there now. Every room should be explainable by these layers.
3. Create two or three factions or forces with a goal, a leader, a stance toward the party, and something they would trade or reveal. Give the inhabitants an ecology: what they eat, where they sleep, how they get in and out.
4. Lay out the map as a graph. Size it to the theme (10 to 15 rooms if no size is given). Include at least two loops, at least two entrances or ways in, one secret path, one vertical connection (stairs, shaft, collapse), and one area that can be skipped entirely. Avoid a single linear chain.
5. Key every room. Lead with what the players notice in the first three seconds, then what is here to interact with, then what the GM needs to know (creatures, hazards, secrets, treasure), then exits. Make most rooms interactive (something to examine, use, risk or talk to); fewer than a third should be empty, and even empty rooms carry a clue or atmosphere.
6. Place encounters with a mix of difficulties for {{party_level}} using the system's own encounter rules. For D&D 5e, use the encounter budget for the edition the table plays and show the arithmetic for the hardest fight; name monsters from the published rules instead of inventing statistics. For other systems, use their equivalent measure of threat. Include at least one encounter that is better solved by talking, sneaking or using the environment than by fighting.
7. Write a wandering encounter table that reflects the factions and the ecology, with results that signal something (tracks, noises, a patrol on a schedule) rather than only random monsters.
8. Seed secrets and clues so that every important secret (hidden room, true villain, the way to the treasure) has at least three clues spread across different rooms.
9. Close with running notes: how the dungeon reacts if the party raids and retreats, what changes on a second visit, and a timer or pressure that rewards moving on.
</task>

<constraints>
- Write the key tersely: short sentences, the important noun first, bold for things the players can interact with. No paragraphs of prose the GM has to read aloud; at most two sentences of read-aloud per room.
- Keep everything consistent with the backstory layers; if a room cannot be explained, cut or change it.
- Treasure follows the system's typical rewards for the level; flag any item that could unbalance the campaign.
- Traps telegraph themselves: every lethal or costly trap has a sign the players can notice first.
- Do not reproduce published adventures or copyrighted stat blocks; reference official monsters by name and source.
</constraints>

<output_format>
## Overview
Pitch (two sentences), the three backstory layers, why the party goes in, and size.
## Factions and ecology
Table: Faction | Goal | Leader | Stance to party | What they offer.
Then two or three lines on food, water, light and traffic.
## Map
Connection list, one line per link: `1 Entrance -> 2 Guard post (open arch)`, noting locked, secret, one-way and vertical links. Then a simple ASCII sketch if it helps. Mark the loops.
## Room key
`### 1. Room name` per room with: First impression, Features, Creatures or hazards, Secrets, Treasure, Exits.
## Wandering encounters
Table: Roll | Encounter | What it signals. State the die and how often to roll.
## Secrets and clues
Table: Secret | Clue 1 (room) | Clue 2 (room) | Clue 3 (room).
## Treasure
Summary list with locations.
## Running notes
Reactions to raids, restocking, the pressure timer, and the hardest encounter's math.
</output_format>
