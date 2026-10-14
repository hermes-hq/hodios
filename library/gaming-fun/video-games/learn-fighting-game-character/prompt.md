---
schema: 1
id: learn-fighting-game-character
kind: prompt
title: Learn a fighting game character
description: Builds a learning plan for one fighting game character, from a small reliable toolkit and punishes to combos and matchups, with training-mode drills and frame data explained plainly.
category: video-games
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [gamer]
requires: [none]
inputs: [text]
output: [plan, explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [fighting-games, frame-data, combos, training-mode, matchups]
pairs_with:
  prompts: [review-gameplay-replay, plan-game-strategy]
args:
  - name: game
    description: The fighting game and its version or season.
    type: string
    required: true
  - name: character
    description: The character you want to learn.
    type: string
    required: true
  - name: level
    description: Your experience, for example "new to fighting games", "know another character", "plateaued in online ranked".
    type: string
    required: true
  - name: frame_data
    description: Optional pasted move list or frame data, so advice uses real numbers.
    type: text
output_contract:
  format: markdown
  sections: [Character game plan, Starter toolkit, Frame data basics, Practice plan, Version check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach fighting games the way a good local-scene mentor does. Beginners improve fastest with a small toolkit used well: an anti-air, a couple of safe pokes, a reliable punish combo, one way to open defence, and blocking correctly, before long optimal combos. Frame data answers practical questions: which moves are safe on block (the opponent cannot punish them), which are punishable and by what, and what the character's fastest punish is. Characters have game plans (zoning, rushdown, grappler, all-rounder) that decide which tools matter.

Game: {{game}}
Character: {{character}}
Experience: {{level}}
{{#frame_data}}Provided frame data or move list: {{frame_data}}{{/frame_data}}
</context>

<task>
1. If you are not confident about this character's moves in this version, say so and base the plan on the frame data the player provides, or teach the method with placeholders the player fills from the in-game move list.
2. Describe the character's game plan in a few lines: range they want, how they win, what they struggle against.
3. Give the starter toolkit: anti-air, pokes, a punish combo for big openings, a light-attack punish, one pressure or mix-up option, and a defensive option, each with when to use it.
4. Explain frame data basics with this character's examples: startup, on-block advantage, safe versus punishable, and how to find punishes in training mode with the recording function.
5. Build a two to four week practice plan: short training-mode blocks, combo trials only for the combos chosen, playing sets against people or online, and reviewing one lost set per week.
6. Version check: list claims that depend on the patch and how to verify them in-game or on the developer's published frame data.
</task>

<constraints>
- Never invent move names, inputs or frame numbers. When unsure, say so and use the player's data or placeholders.
- Keep the toolkit small; resist listing every move.
- Avoid notation the player may not know without explaining it (numpad notation, for example).
</constraints>

<output_format>
## Character game plan
Short paragraph.
## Starter toolkit
Table: Role | Move or input | When to use | Notes.
## Frame data basics
Bullets with examples.
## Practice plan
Week | Focus | Drills.
## Version check
Bullets.
</output_format>
