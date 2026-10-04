---
schema: 1
id: audit-game-accessibility
kind: prompt
title: Audit game accessibility
description: Audits a game build or design for motor, vision, hearing and cognitive barriers using the Game Accessibility Guidelines and Xbox Accessibility Guidelines, ranked by players helped per effort.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, plan]
role: [game-developer, designer, qa-engineer]
requires: [none]
inputs: [spec, notes, image, text]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [game-accessibility-guidelines, xbox-accessibility-guidelines, remapping, subtitles, colorblind, difficulty-options]
pairs_with:
  prompts: [audit-motion-and-flashing, localize-game-strings-and-fonts]
  personas: [accessibility-specialist]
args:
  - name: game_description
    description: The game and its current state - core loop, controls and input schemes, HUD and menus, audio cues, text and subtitles, difficulty, timing-critical moments, existing accessibility options. A feature list, design doc excerpt or playtest notes are fine.
    type: text
    required: true
  - name: platforms
    description: Target platforms and input devices, for example "PC (keyboard and mouse, gamepad), Switch". Leave empty if not decided.
    type: string
    default: not decided
  - name: genre
    description: The genre, which shapes which barriers matter most, for example "rhythm", "competitive shooter", "narrative puzzle". Leave empty to infer.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Barriers, Recommended options, Quick wins, Playtesting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Game accessibility is not WCAG. Games are meant to be challenging, so the question is which barriers are part of the intended challenge and which are accidental: a reflex test may be the point, but needing to hold a trigger for 30 seconds to open a door, or reading 14 px subtitles on a TV across the room, is not. The public Game Accessibility Guidelines (basic, intermediate, advanced) and the Xbox Accessibility Guidelines are the working references. Experienced studios fix the cheap, high-reach items first (remapping, subtitle presentation, hold-to-toggle, colour-independent cues, screen-shake and flash toggles) and design difficulty and assist options around the core challenge rather than removing it. Options must be reachable before they are needed: in the first menu, readable, and navigable without the barriers they fix.
</context>

<task>
Audit this game:

<game_description>
{{game_description}}
</game_description>

Platforms and inputs: {{platforms}}. Genre: {{genre}} (if empty, infer it and say so).

1. Name the core challenge in one sentence: what the game intends to test (timing, aim, strategy, memory, exploration). Every recommendation must respect it, or offer it as an optional assist. If the game has competitive or ranked multiplayer, split the advice: options that change no outcome (remapping, subtitles, colour-blind team cues, sound visualisation, comfort toggles, text size) apply everywhere; options that change outcomes (game speed, aim assist strength, damage, slow motion) are for single-player, casual or private modes, or must be equal for every player in the match.
2. Check each area and record barriers with where they occur:
   - Motor: full remapping on every input device, no required simultaneous presses, hold versus toggle, repeated rapid presses (button mashing), sensitivity and dead zones, aim assist, one-handed play, timing windows, QTEs.
   - Vision: subtitle and UI text size (large enough to read from a sofa on a TV and scalable; check the current Xbox Accessibility Guidelines for the minimum at 1080p rather than guessing a number), contrast and background for text, colour-only information (team, rarity, enemy state), screen-reader or narration support for menus, high-contrast mode, field of view, camera control.
   - Hearing: subtitles on by default or offered on first launch, speaker names, closed captions for important sounds, direction indicators for off-screen audio, separate volume sliders, mono audio.
   - Cognitive: objective reminders, tutorials that can be replayed, consistent controls, no time pressure in menus, readable fonts, save anywhere or frequent checkpoints, glossary for lore terms.
   - Photosensitivity and comfort: flashes, camera shake, motion blur, head bob, depth of field; with toggles.
   - Difficulty and assists: granular assists (game speed, damage taken, skip puzzle or encounter) rather than one difficulty slider, and no shaming labels.
3. For each barrier, note the guideline it maps to and the platform requirement or recommendation if relevant.
4. Rank fixes by players helped per effort. Estimate effort as S, M or L with the reason (for example "remapping is M if input is already abstracted through an action map, L if keys are hard-coded").
5. Propose the options menu structure: where accessibility settings live, what is asked on first launch (subtitles, text size, colour-blind mode), and presets.
</task>

<constraints>
- Do not remove or water down the core challenge by default; offer assists as options.
- Do not claim the game meets a platform's certification or a guideline set; point the team to the current official guidelines to verify.
- If the description is too thin to audit (no controls, HUD, audio, text or difficulty details), ask for those first and stop; if only some are missing, audit what you have and list what you could not assess instead of guessing.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Summary
The core challenge, the three biggest barriers, and who they exclude.

## Barriers
Table: Area | Barrier | Where in the game | Guideline | Players affected | Severity (blocks play, major, minor).

## Recommended options
Table: Option | What it changes | Effort (S, M, L) and why | Priority (1 to 3).

## Quick wins
Five to eight changes that fit in one sprint.

## Playtesting
How to recruit disabled players, what to observe, and which barriers need their input before a final decision.
</output_format>
