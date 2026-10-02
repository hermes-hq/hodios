---
schema: 1
id: design-one-shot-adventure
kind: prompt
title: Design a one-shot adventure
description: Designs a one-shot tabletop adventure with a hook, timed scenes, NPCs, balanced encounters, a finale with several solutions and pacing levers. Use to prep a single session.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer]
stack: [dnd-5e]
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
tags: [one-shot, session-prep, adventure-design, game-mastering]
pairs_with:
  prompts: [balance-combat-encounter]
  personas: [dungeon-master]
args:
  - name: party
    description: Number of players, character level, classes, and anything notable about the players (new to the game, love roleplay, hate puzzles).
    type: text
    required: true
  - name: system
    description: Game system and edition, for example dnd-5e, pathfinder-2e, call-of-cthulhu-7e or blades-in-the-dark.
    type: string
    default: dnd-5e
  - name: session_hours
    description: Length of the session in hours, including introductions and breaks.
    type: number
    default: 4
  - name: theme
    description: Theme, genre or setting, for example "gothic horror village" or "heist in a floating city". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Pitch, At a glance, Hook, Scenes, NPCs, Finale, Pacing levers, Rewards, Prep checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design one-shots for conventions and game nights. A one-shot has no time for slow starts or dangling threads: it opens in motion, gives every player a moment, mixes the three pillars (combat, exploration, social), builds to a finale the table can solve in more than one way, and ends on time. The game master needs a document they can run from at the table, not a novel.

Party: {{party}}
System: {{system}}
Session length: {{session_hours}} hours
{{#theme}}Theme: {{theme}}{{/theme}}
</context>

<task>
1. If the party's size or level is missing, ask for it and stop; encounters cannot be balanced without it. Otherwise note any assumptions.
2. Budget the time: subtract about 20 minutes for introductions and 10 to 15 minutes of breaks per two hours; plan four to six scenes for a four-hour session and scale for other lengths, with an estimated duration for each.
3. Write a hook that starts the players in motion within five minutes, with a clear goal and a reason these characters care.
4. Design the scenes. For each: its purpose, estimated time, a read-aloud of at most three sentences, what is here to interact with, the NPC or obstacle, clues or information gained, and the ways forward. Mix pillars and include at least one scene that rewards non-combat play.
5. Design encounters with the system's own encounter-building guidelines for this party. For D&D 5e, use the XP budget method (2014 thresholds with multipliers, or 2024 budgets if the players use the 2024 rules), show the arithmetic, and use monsters from the published rules by name rather than inventing statistics. For other systems, use their equivalent (for example the Pathfinder 2e XP budget) or, if none exists, describe threat in the system's own terms.
6. Build one twist that recontextualises an earlier scene, set up fairly.
7. Design a finale with at least three viable solutions (fight, talk, trick or something else) and a consequence for each.
8. Add pacing levers: a scene to cut if running late, and an optional scene or complication if running early.
</task>

<constraints>
- Every player character gets a spotlight opportunity tied to their class or background where the party description allows.
- Clues follow the three-clue rule: any conclusion the players must reach has at least three ways to reach it.
- No railroading: the adventure works if the players skip a scene.
- Respect the theme's tone; if it is horror, say where to dial intensity down for the table.
- Do not reproduce published adventures; reference official monsters by name and book only.
</constraints>

<output_format>
## Pitch
Two sentences.
## At a glance
Table: Scene | Pillar | Time | Purpose.
## Hook
## Scenes
One subsection per scene with the fields in the task.
## NPCs
Table: Name | Role | Wants | Voice or mannerism | Secret.
## Finale
Setup, the solutions and their consequences, and the encounter math if it is a fight.
## Pacing levers
## Rewards
## Prep checklist
Bullets: maps, handouts, stat blocks to bookmark.
</output_format>
