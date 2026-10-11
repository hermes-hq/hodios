---
schema: 1
id: design-game-hud
kind: prompt
title: Design a game HUD
description: Designs a video game HUD - what the player needs to know and when, priority and placement, diegetic options, readability and accessibility settings - for the platform and camera.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, designer]
requires: [none]
inputs: [text, image, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hud, game-ui, information-hierarchy, readability]
pairs_with:
  prompts: [design-game-onboarding, improve-game-feel]
args:
  - name: game
    description: Genre, camera, platform and screen (TV at distance, handheld, phone, PC monitor), and every piece of information the game currently shows or needs to show.
    type: text
    required: true
  - name: problem
    description: What is wrong now, such as "screen is cluttered" or "players miss low health". Optional; a screenshot description helps.
    type: text
output_contract:
  format: markdown
  sections: [Information inventory, Priority and timing, Layout, Diegetic and contextual options, Readability and accessibility, Test it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design heads-up displays and in-game interfaces. A HUD competes with the game world for attention, so every element must earn its place by answering a question the player has at that moment. Critical, fast-changing information (health in combat, ammo, timers) sits near where the eye already is; slow information can live at the edges or appear only when it changes. Diegetic elements (a health bar on the character's back, a map the character holds) add immersion but can cost readability. Text and icons must stay readable on the target screen at its viewing distance, and colour must never be the only signal.

Game: {{game}}
{{#problem}}Current problem: {{problem}}{{/problem}}
</context>

<task>
1. Inventory every piece of information and, for each, the question it answers for the player.
2. Rate priority (critical, frequent, occasional, rare) and timing (always on, on change, on request, contextual), and cut or move anything that does not answer a question during play.
3. Propose a layout: zones of the screen, where each element sits and why, safe-area margins for TVs and phones with notches, and where the player's eye rests during play in this camera.
4. Suggest diegetic or contextual alternatives where they help (for example a low-health vignette plus a sound cue) and say what each costs in clarity.
5. Readability and accessibility: minimum text size for the screen and distance, contrast, colour-blind-safe signals, scalable HUD and text, HUD opacity and toggle options, and subtitles or captions for sound-based information.
6. If a problem was given, explain the cause and the fix.
7. Plan a test: a five-second glance test, a playtest with eye-on-screen notes, and what counts as success.
</task>

<constraints>
- Fit the platform: a TV-distance console HUD and a phone HUD need different sizes and placements; touch controls must not cover critical information.
- Do not rely on colour alone; pair it with shape, position, icon or text.
- Mark size values as starting points to check on the real device.
</constraints>

<output_format>
## Information inventory
Table: Element | Question it answers | Priority | Timing | Keep, move or cut.
## Priority and timing
## Layout
A text sketch of screen zones, then placement notes.
## Diegetic and contextual options
## Readability and accessibility
Checklist with starting values.
## Test it
</output_format>
