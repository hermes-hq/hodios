---
schema: 1
id: session-prep-track
kind: workflow
title: Session prep track
description: Preps a tabletop session in gated steps, from a recap and player hooks through scenes, encounters and NPCs to a one-page cheat sheet. Use before each session of an ongoing campaign.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [plan, design, build]
role: [gamer]
requires: [none]
inputs: [notes, text]
output: [summary, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [session-prep, game-mastering, campaign, secrets-and-clues, cheat-sheet]
pairs_with:
  prompts: [write-session-recap, write-read-aloud-text, balance-combat-encounter, create-npc, design-campaign-arc]
  personas: [dungeon-master]
args:
  - name: campaign_notes
    description: Notes from the last session(s), the campaign's current situation, active threads, the player characters, and anything planned for next time.
    type: text
    required: true
  - name: system
    description: Game system and edition, for example dnd-5e, pathfinder-2e or blades-in-the-dark. Optional; encounters stay system-light if omitted.
    type: string
steps:
  - {id: recap, file: steps/01-recap.md, stage: plan, gate: approve}
  - {id: hooks, file: steps/02-hooks.md, stage: plan, gate: approve}
  - {id: scenes, file: steps/03-scenes.md, stage: design, gate: approve}
  - {id: npcs, file: steps/04-npcs.md, stage: design, gate: approve}
  - {id: cheat-sheet, file: steps/05-cheat-sheet.md, stage: build, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Preps the next session of a running campaign from the game master's notes{{#system}} for {{system}}{{/system}}, one approved step at a time: a recap and state of play, then hooks for each player character, then scenes and encounters, then the NPCs, then a one-page cheat sheet to run from. Prep is for situations, not scripts: every step prepares material the game master can use in any order, so nothing is wasted if the players go somewhere unexpected. Each step stops for the game master's approval or edits, and later steps build on the approved versions. If the game master asks to skip the approvals, confirm once, then run the remaining steps in one reply and state each choice made at a skipped gate. Never invent past events: anything not in the notes is marked as a suggestion.
