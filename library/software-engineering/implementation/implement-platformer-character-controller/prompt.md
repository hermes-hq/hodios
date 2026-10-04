---
schema: 1
id: implement-platformer-character-controller
kind: prompt
title: Implement a platformer character controller
description: Implements a 2D or 3D platformer character controller with good game feel, covering coyote time, jump buffering, variable jump height, slopes, moving platforms and tunable values.
category: implementation
version: 1.0.0
status: incubating
stage: [build, verify]
role: [game-developer]
stack: []
requires: [none]
inputs: [text, file]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [game-feel, platformer, character-controller, coyote-time, jump-buffering, movement]
pairs_with:
  personas: [game-developer]
  prompts: [fix-physics-jitter-and-tunneling, prototype-browser-game]
args:
  - name: engine
    description: Engine and version, for example "Godot 4.3", "Unity 6", "Unreal 5.4", "Phaser 3" or a custom engine; add the language if there is a choice.
    type: string
    required: true
  - name: dimension
    description: 2D or 3D movement.
    type: enum
    enum: [2d, 3d]
    default: 2d
  - name: feel_notes
    description: The feel you want, reference games ("tight like Celeste", "floaty like Kirby"), abilities (double jump, wall jump, dash) and any existing controller code.
    type: text
    default: a responsive precision platformer with a single jump
output_contract:
  format: markdown
  sections: [Feel targets, Tunable parameters, Controller code, Edge cases handled, Tuning guide, Playtest checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants a {{dimension}} platformer controller in {{engine}}. Game feel comes from forgiveness and responsiveness, not realism. Experts design jumps from the designer's terms (jump height and time to apex) and derive gravity and initial velocity: `g = 2h / t^2`, `v0 = 2h / t`. They add a higher gravity multiplier when falling or when jump is released early (variable height), a terminal fall speed, coyote time (about 0.08-0.12 s after leaving a ledge) and jump buffering (about 0.1-0.15 s before landing), separate acceleration and deceleration on ground and in air, and corner correction so clipping a ceiling edge does not kill the jump. Physics-engine rigidbodies driven by forces usually feel slippery; kinematic controllers with explicit velocity and collision resolution feel tight. Movement must run in the fixed or physics step and read input that was sampled every frame, or presses are lost.
</context>

<task>
<feel_notes>
{{feel_notes}}
</feel_notes>

1. Turn the feel notes into numeric targets: jump height in tiles or metres, time to apex, max run speed, time to reach full speed and to stop, air control fraction, and fall speed cap. State starting values and why.
2. Expose every value as a designer-tunable parameter (exported or serialized fields, or a resource or ScriptableObject) in the designer's units, with derived physics values computed from them.
3. Write the controller for {{engine}} as a kinematic controller using the engine's character body (CharacterBody2D or 3D, CharacterController, or a custom sweep), with a small state machine (grounded, rising, falling, plus any abilities) and:
   - input buffered per frame and consumed in the physics step;
   - coyote time and jump buffer timers;
   - variable jump height by a gravity multiplier or velocity cut on release;
   - acceleration curves and turn-around boost;
   - slope handling: snap to ground, a max walkable angle, no speed loss or launch at slope crests;
   - moving platforms: inherit platform velocity while grounded and on jump;
   - corner correction for head bumps and ledge nudges.
4. List the edge cases and how each is handled: landing and jumping in the same frame, a buffered jump firing after coyote time ends, one-way platforms, ceiling hits, being crushed.
5. Write a tuning guide: which parameter to change for each common complaint ("floaty", "slippery", "jump feels late").
6. Write a playtest checklist with a debug overlay (state, velocity, timers, ground normal) and a recorded input replay to compare tunings.
</task>

<constraints>
- Do not use API calls you are unsure exist in {{engine}}; state the version assumed.
- Keep movement framerate-independent; check behaviour at 30, 60 and 144 FPS.
- Ask if the engine version or the abilities change the design and are missing.
</constraints>

<output_format>
## Feel targets
Table: Target | Value | Reason.
## Tunable parameters
Table: Parameter | Unit | Default | Effect.
## Controller code
Files with names.
## Edge cases handled
Bullets.
## Tuning guide
Table: Complaint | Change.
## Playtest checklist
Numbered checks.
</output_format>
