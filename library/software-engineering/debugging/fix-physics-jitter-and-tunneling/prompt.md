---
schema: 1
id: fix-physics-jitter-and-tunneling
kind: prompt
title: Fix physics jitter and tunnelling
description: Finds why objects jitter, tunnel through walls or explode in a game physics simulation by checking update order, interpolation, timestep, continuous collision and mass ratios, then fixes the cause.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [game-developer]
stack: []
requires: [none]
inputs: [text, file]
output: [report, diff, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rigidbody, jitter, tunnelling, fixed-timestep, interpolation, collision]
pairs_with:
  personas: [game-developer]
  prompts: [implement-platformer-character-controller, implement-multiplayer-netcode]
args:
  - name: symptoms
    description: What you see and when - jitter only when the camera follows, bullets passing through thin walls, stacks exploding, objects sinking - with speeds, sizes, frame rate and whether it varies by machine.
    type: text
    required: true
  - name: engine
    description: Engine or physics library and version, for example "Unity 6 (PhysX)", "Godot 4.3 (Jolt)", "Box2D 3", "Rapier".
    type: string
    required: true
  - name: code
    description: The movement, camera and physics setup code involved, and relevant settings (fixed timestep, solver iterations, interpolation, collision detection mode).
    type: text
    default: not provided
output_contract:
  format: markdown
  sections: [Most likely causes, Checks, Fix, Verify, Prevent]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's physics misbehaves in {{engine}}. Each symptom has a short list of usual causes, and experts match the symptom before touching settings:
- Jitter: a mismatch between the physics step and the render frame (camera or visuals updated in the frame loop while the body moves in the fixed step, without interpolation); moving a rigidbody by setting its transform instead of velocity or MovePosition; camera smoothing fighting the target; a variable timestep passed to the physics engine.
- Tunnelling: an object moving more than about half its thickness (or the wall's) per step, so discrete collision misses it. Fixes are continuous collision detection for that body, raycasts or shape casts for bullets, thicker colliders or a smaller step, not a global tiny timestep.
- Explosions and instability: extreme mass ratios (more than about 10:1 between touching bodies), objects far from the 0.1-10 m size range the solver is tuned for, overlapping spawns, too few solver iterations for stacks or joints, and forces applied in the frame loop scaled by frame time inconsistently.
- Sinking or bouncing: wrong contact offsets or skin width, restitution set above zero by default materials, or a scale applied to colliders.
Physics should run on a fixed step with an accumulator and a cap on steps per frame (to avoid the "spiral of death"), and visuals should interpolate between the last two physics states.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>

<code>
{{code}}
</code>

1. Match the symptoms to the categories above and rank the likely causes for this case, naming the line or setting involved when code is given.
2. If code or settings are missing for the top causes, list exactly which (fixed timestep value, interpolation setting, collision detection mode, how the object and camera are moved and in which callback) and still give the checks.
3. Give quick checks that separate the causes, cheapest first: lock the frame rate to 30 then 144 FPS, turn camera smoothing off, show physics debug drawing, log per-step displacement versus collider thickness, pause and step frame by frame, scale masses to equal.
4. Fix the root cause with the smallest change, using the engine's own mechanism (rigidbody interpolation, CCD mode per body, `MovePosition`/`move_and_collide`, `_physics_process`/`FixedUpdate`, solver iteration settings), or a fixed-step accumulator for a custom loop.
5. Explain how to verify: the same scenario at different frame rates, the fastest object against the thinnest wall, a stress scene.
6. Add one prevention: a project rule for where movement code lives, unit scale, and mass ratio limits.
</task>

<constraints>
- Do not recommend lowering the global fixed timestep or raising solver iterations as the first fix unless the evidence shows that is the cause; say the CPU cost when you do.
- Do not invent engine settings; state the version assumed.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Most likely causes
Ranked list, each with the evidence for it.
## Checks
Numbered, each with what result points to which cause.
## Fix
Diff or code, and why it fixes the cause.
## Verify
Bullets.
## Prevent
One or two bullets.
</output_format>
