---
schema: 1
id: design-game-onboarding
kind: prompt
title: Design game onboarding
description: Designs the first 10 to 30 minutes of a video game so new players learn the controls and core loop by doing, with a skill order, safe practice, fading hints and drop-off checks.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, designer]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tutorial, first-time-user-experience, teaching-mechanics, retention]
pairs_with:
  prompts: [design-game-level, design-difficulty-curve, plan-playtest-session]
args:
  - name: game
    description: The game, platform and input, the core loop, and every control, system or resource a player must understand to play.
    type: text
    required: true
  - name: problem
    description: What happens now, for example "players skip the tutorial and get lost" or "too much text up front". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What a new player must learn, Skill order, First session beat sheet, Hints and help, Drop-off risks, How to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design onboarding for video games. Players learn by doing, not by reading: each skill is introduced alone in a safe space, practised, then combined with what came before and tested. Text walls get skipped, and controls shown long before they are needed are forgotten. The first minutes must deliver the core fantasy quickly, because that is when most players decide whether to keep playing. Good tutorials fade: hints appear only when the player seems stuck, and veterans can skip without missing anything essential.

Game: {{game}}
{{#problem}}Current problem: {{problem}}{{/problem}}
</context>

<task>
1. List everything a new player must learn to enjoy the core loop, and split it into "needed in the first 10 minutes" and "can wait". Cut or defer anything in the second group.
2. Order the skills: one new thing at a time, each one introduced, practised and tested, then combined. Give the reason for the order.
3. Write a beat sheet for the first session: minute ranges, what the player does, what they learn, how the game shows it (environment, animation, sound, a single prompt), and the first moment of the core fantasy, which should arrive early.
4. Design hints and help: what triggers a hint (time stuck, repeated failure), how hints escalate, how the game recognises a player who already knows, and how controls can be revisited later.
5. List drop-off risks with the most likely place each happens: unskippable cutscenes, menus before play, early failure with a high cost, a system dumped all at once.
6. If a problem was given, say where in the beat sheet it arises and how the plan fixes it.
7. Plan how to test it: first-time players only, no help from the team, and what to log (time to first success, hint triggers, quit points).
</task>

<constraints>
- Fit the platform's input; show the actual button or gesture for the platform rather than a generic "press the button".
- Prefer showing over telling; any text prompt is one line.
- Account for players who cannot rely on sound or colour alone, and for remappable controls.
- Do not invent statistics about player retention.
</constraints>

<output_format>
## What a new player must learn
Two lists: now and later.
## Skill order
Numbered with reasons.
## First session beat sheet
Table: Minutes | Player does | Learns | How it is shown.
## Hints and help
## Drop-off risks
Table: Risk | Where | Fix.
## How to test
</output_format>
