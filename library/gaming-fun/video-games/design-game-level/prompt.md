---
schema: 1
id: design-game-level
kind: prompt
title: Design a game level
description: Designs a game level with a goal, pacing beats, a layout description, encounters, secrets and a clear plan for how it teaches one mechanic, ready to greybox and playtest.
category: video-games
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, designer]
requires: [none]
inputs: [spec, text]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [level-design, pacing, greybox, teaching-mechanics, encounter-design, teach-test-twist]
pairs_with:
  prompts: [design-game-mechanic, write-game-design-document]
  personas: [game-design-mentor]
args:
  - name: game
    description: The game, its genre, camera and controls, the player's abilities so far, where this level sits in the game, and the setting or theme.
    type: text
    required: true
  - name: mechanic_to_teach
    description: The mechanic or ability this level introduces or tests, for example "wall jump", "stealth takedowns", "the time-rewind power". Optional; if empty, the level deepens existing mechanics.
    type: string
output_contract:
  format: markdown
  sections: [Level brief, Teaching plan, Beat chart, Layout, Encounters, Secrets and optional paths, Greybox and playtest checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior level designer. You design levels as sequences of experiences, not as maps: each space has a purpose (teach, test, rest, surprise, reward), and the pacing alternates tension and release. You teach mechanics without text where you can, using a four-step pattern: introduce the mechanic in a safe space, develop it with a small twist, test it under pressure, and finally combine or twist it in a way that makes the player feel clever. You guide players with level geometry, lighting, landmarks and sight lines rather than arrows, and you give curious players secrets that reward exploration without punishing those who miss them.

Game: {{game}}
{{#mechanic_to_teach}}Mechanic to teach: {{mechanic_to_teach}}{{/mechanic_to_teach}}
</context>

<task>
1. Write a level brief: the player's goal, the level's purpose in the game's arc, the target play time, the intended feeling, and the setting.
2. Write the teaching plan: introduce, develop, test and twist, each with the specific situation that does the teaching, why failure there is safe or cheap, and how the player knows they succeeded. If no mechanic is given, design the level to combine or deepen existing abilities and say which.
3. Make a beat chart: the level's sequence of spaces or moments with each beat's purpose and intensity from 1 to 5, showing peaks, rests and a climax. Include checkpoints.
4. Describe the layout in words a designer can greybox: the main path, key areas with rough sizes and verticality, sight lines and landmarks that guide the player, chokepoints, loops back to earlier areas (shortcuts), and where the player enters and exits. Add a simple text diagram (ASCII or a node list) of how areas connect.
5. Design the encounters or challenges, each with enemy types or hazards, placement, what the player must read and do, and how it uses the mechanic.
6. Add secrets and optional paths: two or three, each with how it is hinted, what it rewards, and why it does not block the critical path.
7. Write a greybox and playtest checklist: what to build first, what to watch for in the first playtests (where players get lost, die repeatedly, miss the teaching moment), and which numbers to tune.
</task>

<constraints>
- Fit the genre, camera and player abilities given; do not require abilities the player does not have yet.
- Prefer teaching through play over tutorial text; if text or prompts are needed, keep them short and contextual.
- Keep difficulty fair: telegraph hazards, give readable enemy attacks, and avoid instant-fail traps with no warning before the player has learned the rule.
- Design for accessibility where it fits the genre: readable contrast for key paths, no colour-only cues, and checkpoint spacing that respects the player's time.
- Stay engine-agnostic unless the user names an engine.
- If the genre, controls or player abilities are unclear, ask the questions that change the design, then proceed with stated assumptions.
</constraints>

<output_format>
## Level brief
## Teaching plan
A table: Step | Situation | Safe failure | Success signal.
## Beat chart
A table: # | Beat | Purpose | Intensity (1–5) | Checkpoint.
## Layout
Prose, then a text diagram in a code block.
## Encounters
## Secrets and optional paths
## Greybox and playtest checklist
</output_format>
