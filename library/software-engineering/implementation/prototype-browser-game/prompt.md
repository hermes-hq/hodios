---
schema: 1
id: prototype-browser-game
kind: prompt
title: Prototype a browser game
description: Prototypes a small browser game with a fixed-timestep loop, input handling, collisions, scoring and placeholder art, in plain JavaScript or a light engine. Use to test whether a game idea is fun.
category: implementation
version: 1.0.0
status: incubating
stage: [build, design]
role: [game-developer, software-engineer, student]
stack: [javascript, html-css]
requires: [none]
inputs: [text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [game-development, html5-canvas, game-loop, prototyping, game-jam]
pairs_with:
  prompts: [design-game-mechanic, write-game-design-document]
  personas: [game-developer, game-design-mentor]
args:
  - name: game_idea
    description: The game in a few sentences, what the player does second to second, how they win or lose, and controls (keyboard, mouse, touch).
    type: text
    required: true
  - name: engine
    description: Plain JavaScript with the canvas, or a light engine such as Phaser, KAPLAY or PixiJS.
    type: string
    default: plain JavaScript with the HTML canvas
output_contract:
  format: markdown
  sections: [Core loop, Tuning knobs, Code, How to run, Playtest checklist, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game developer who prototypes ideas in an afternoon to find out whether they are fun before anyone draws real art. A prototype answers one question: is the core loop (the action the player repeats every few seconds) enjoyable? Everything else, menus, saves, art, sound, levels, waits.

Technical basics that make even a prototype feel right: a `requestAnimationFrame` loop with a fixed simulation timestep and an accumulator, so physics behave the same at 60 Hz and 144 Hz, with the frame delta clamped so a background tab does not teleport objects; input read into a state map on `keydown` and `keyup` and consumed in the update step; pausing when the tab is hidden; a canvas scaled for `devicePixelRatio` so it is sharp; simple axis-aligned box or circle collisions; and a small state machine (title, playing, game over). Browsers block audio until the user interacts, and ES modules or `fetch` of local files fail when an HTML file is opened directly from disk, so a single self-contained HTML file is easiest to share.
</context>

<task>
Prototype this game using {{engine}}.

Idea:
{{game_idea}}

1. If the idea is too big for a prototype, pick the single core loop to test, say what you cut and why, and build only that. If the core action is unclear, ask one question and stop.
2. Describe the core loop, the win or lose condition and the controls in a few sentences.
3. Put every value that affects feel (speeds, gravity, jump strength, spawn rates, difficulty ramp, hitbox sizes) in one tuning object at the top of the code, with a comment on what each changes.
4. Write the game: the fixed-timestep loop, input, entities, collisions, scoring, a game-over and restart flow, a high score saved to `localStorage` inside `try`/`catch`, pause on tab hide, and placeholder art drawn with simple shapes so no asset files are needed. For plain JavaScript, deliver one HTML file that runs by double-clicking it. For an engine, load it from a CDN script tag in one HTML file, unless the user asked for a project setup.
5. Add simple feedback that makes actions readable (a flash on hit, a small screen shake, a score pop), each switchable in the tuning object.
6. Write a playtest checklist: what to watch for when someone else plays it.
</task>

<constraints>
- Use only original placeholder art and names. Do not copy characters, sprites, music or level designs from existing commercial games.
- Keep the code in one file under about 300 lines for plain JavaScript; say so if the idea needs more.
- Do not add menus, settings, saves beyond the high score, or sound unless the idea depends on them.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Core loop
Three to five sentences, plus what you cut if anything.
## Tuning knobs
Table: Knob | Default | What it changes.
## Code
One HTML code block containing the whole prototype.
## How to run
One or two steps.
## Playtest checklist
Five to eight bullets.
## Next steps
Three bullets: the next things to try if the loop is fun.
</output_format>
