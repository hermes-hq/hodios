---
schema: 1
id: build-rpg-character
kind: prompt
title: Build a tabletop RPG character
description: Builds a tabletop player character from a concept, with a rules-legal build for the system and level, a personality to play, and backstory hooks written for the game master to use.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [character-creation, player-character, backstory, character-build, roleplay]
pairs_with:
  prompts: [create-npc]
  personas: [dungeon-master]
args:
  - name: concept
    description: Your idea in a sentence or two, for example "a cowardly wizard who became a hero by accident" or "a retired soldier looking for her missing brother", plus how you like to play (combat, talking, exploring) and any table rules or setting details.
    type: text
    required: true
  - name: system
    description: Game system and edition, for example "dnd-5e 2024 rules", "dnd-5e 2014 rules", "pathfinder-2e", "blades-in-the-dark". Include allowed sourcebooks and the stat method (point buy, standard array, rolled) if you know them.
    type: string
    required: true
  - name: level
    description: Starting level, if the system uses levels.
    type: number
    default: 1
output_contract:
  format: markdown
  sections: [Concept, Build, Level-up path, Personality, Backstory, Hooks for the GM, Check with your GM]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tabletop players build characters that are fun to play, legal under the rules, and easy for the game master to weave into the campaign. A good character has a clear concept the mechanics support (the build does what the story says the character does), a personality the player can perform from session one, a few flaws that create interesting choices, and a backstory that is short, leaves open questions, and hands the game master people, places and unfinished business to use.

Concept: {{concept}}
System: {{system}}
Level: {{level}}
</context>

<task>
1. Concept: restate the character in one line and name the mechanical choices that best express it in {{system}} (for example class, subclass, background, ancestry or species, or the system's equivalents). If two options fit, compare them in one line each and pick one.
2. Build: a complete, rules-legal build at level {{level}} for the stated edition: ability scores using the stated method (standard array or the system's default point buy if none is given, and say which), proficiencies or skills, features, feats or talents, spells if any, starting equipment, and the derived numbers (hit points, armour class or defence, attack bonuses, save DCs, key skill modifiers). Show the arithmetic for derived numbers.
3. Level-up path: the key choices for the next few levels or advances and why they fit the concept, kept short.
4. Personality: two traits, an ideal or drive, a bond, and a flaw that will create interesting decisions at the table; a speech habit or mannerism; and three sample lines of dialogue.
5. Backstory: 150 to 250 words, focused on why the character adventures now. Leave deliberate gaps.
6. Hooks for the GM: three to five named people, places, debts, enemies or mysteries from the backstory that the game master can use or change, each with one line on how it could enter play.
7. Check with your GM: list every choice that depends on table rules or allowed sources, every rule you are less than certain of, and anything in the backstory the game master may want to change.
</task>

<constraints>
- Follow the named system and edition exactly. Edition differences matter (for example, the 2014 and 2024 D&D fifth edition rules handle backgrounds, ability score increases and species differently); if the edition is ambiguous, say which you assume. Do not mix rules from different editions or systems.
- If the system does not use levels, ignore the level, build a starting character with the system's own structure (playbooks, advances, skill points), and say so in one line.
- Use only content from the core rules unless the user lists other allowed sources; name the source of any option outside the core rules.
- If you are not sure a rule or number is correct, mark it [check] rather than presenting it as certain.
- Keep the backstory short and open: no backstory that makes the character the chosen one of the setting or that decides major world facts for the game master.
- If the system is not one you know well enough to build legally, say so, give the concept, personality and hooks, and describe the build in general terms for the player to finish with the rulebook.
- If the concept or system is missing, ask for it.
</constraints>

<output_format>
## Concept
## Build
A table of ability scores and modifiers, then features, equipment and derived numbers with the arithmetic.
## Level-up path
## Personality
## Backstory
## Hooks for the GM
## Check with your GM
</output_format>
