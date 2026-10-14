---
schema: 1
id: build-aim-training-routine
kind: prompt
title: Build an aim training routine
description: Sets up mouse sensitivity and crosshair basics and builds a short daily aim routine for a shooter, with drills tied to the player's weak spots and a way to measure transfer.
category: video-games
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [aim-training, mouse-sensitivity, fps-games, practice-plan, crosshair-placement]
pairs_with:
  prompts: [plan-game-strategy, review-gameplay-replay]
args:
  - name: game
    description: The shooter you play, and input (mouse or controller).
    type: string
    required: true
  - name: setup
    description: Mouse DPI and in-game sensitivity, mousepad size, monitor refresh rate, or controller settings.
    type: text
    required: true
  - name: weaknesses
    description: What goes wrong in fights, for example "miss the first shot", "lose tracking fights", "overflick", "slow to react around corners".
    type: text
    required: true
  - name: minutes
    description: Minutes per day for practice.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Sensitivity check, Fundamentals first, Daily routine, Measuring progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach aim in shooters. Most lost fights below high ranks are positioning and crosshair placement (keeping the crosshair at head height where an enemy will appear) rather than raw flicking. Sensitivity is best compared as distance per full turn (centimetres or inches per 360) or eDPI, not the in-game number; changing it often resets muscle memory. Tactical shooters reward precise first shots and lower sensitivity; tracking-heavy games reward smooth control. Aim trainers help most when drills match the weakness and are followed by real matches, and short daily practice beats long occasional sessions. Wrist and forearm strain is real.

Game: {{game}}
Setup: {{setup}}
Weaknesses: {{weaknesses}}
Minutes per day: {{minutes}}
</context>

<task>
1. Sensitivity check: convert the setup to eDPI or distance per 360 if the user gave enough to do so (show the arithmetic; say if the game's conversion factor is unknown), say whether it is in a sensible range for this game type in general terms, and recommend keeping it fixed for at least two weeks unless it is far off.
2. Fundamentals first: crosshair placement, pre-aiming common angles, counter-strafing or stopping before shooting where the game rewards it, and controller settings (deadzone, response curve) for controller players.
3. Daily routine in the minutes available: warm-up, two or three drills matched to the weaknesses (micro-adjustment, flicking, tracking, target switching, reaction), in-game practice (deathmatch or range), and a cool-down. Describe drill types generically so they work in any aim trainer or the game's own range.
4. Measuring progress: in-match signals (first-shot accuracy, duels won, headshot rate where shown) over weeks, not trainer scores alone.
5. Add breaks and strain warnings: stop if pain persists and see a health professional.
</task>

<constraints>
- Do not name a single "correct" sensitivity; give ranges as general guidance and explain why.
- Do not invent the game's sensitivity conversion factor; if unknown, use relative changes.
- Never suggest macros, scripts or tools that break the game's rules.
</constraints>

<output_format>
## Sensitivity check
Arithmetic and verdict.
## Fundamentals first
Bullets.
## Daily routine
Table: Block | Drill type | Minutes | Focus.
## Measuring progress
Bullets, plus the strain note.
</output_format>
