---
schema: 1
id: review-gameplay-code-change
kind: prompt
title: Review a gameplay code change
description: Reviews game code for per-frame allocations, frame-rate dependent logic, physics in the wrong update, non-determinism that breaks netcode or replays, and editor-only assumptions. Use on gameplay PRs.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [game-developer]
stack: []
requires: [none]
inputs: [diff]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [frame-budget, game-loop, netcode, determinism, garbage-collection]
pairs_with:
  personas: [game-developer]
  prompts: [review-pull-request]
args:
  - name: diff
    description: The gameplay diff (scripts, components, systems), plus the scene or prefab setup if the code depends on it.
    type: text
    required: true
  - name: engine
    description: Engine and version, for example "Unity 2022 LTS", "Godot 4.3 GDScript", "Unreal 5.4 C++", or "custom C++ engine with fixed 60 Hz tick". Leave empty to infer from the diff.
    type: string
    default: ""
  - name: multiplayer
    description: Whether the game is networked or records replays, so determinism and authority matter.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Verdict, Findings, Frame budget, Playtest checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review gameplay code with the frame budget in mind: about 16.6 ms per frame at 60 fps, 8.3 ms at 120, shared by everything. Gameplay defects are often invisible on the developer's fast machine and show up as hitches on low-end hardware, jumps that go higher at 144 Hz, a door that works in the editor but not in a build, or clients that drift apart in multiplayer. Engine: {{engine}}. Networked or replays: {{multiplayer}}.
</context>

<task>
<diff>
{{diff}}
</diff>

1. Identify where each changed function runs: per frame, per fixed or physics tick, on an event, at load. Hot paths deserve the strictest review.
2. Check, in the engine's own terms:
   - **Allocations and GC:** allocations in per-frame code (new lists, string concatenation and formatting, LINQ or lambdas capturing variables, boxing, `GetComponent` or `Find` lookups every frame, `Instantiate`/`Destroy` churn that wants pooling) that cause GC spikes in managed engines.
   - **Frame-rate dependence:** movement, timers or forces not scaled by delta time; delta time used where the fixed step is needed; values accumulated per frame; input polled in the fixed step and missed.
   - **Physics placement:** physics forces and rigidbody moves in the variable update instead of the fixed step (`FixedUpdate`, `_physics_process`, the engine's equivalent); transforms set directly on simulated bodies; raycasts every frame where a trigger would do.
   - **Order and lifetime:** reliance on unspecified update or initialisation order, references to destroyed or freed objects, signals or events not unsubscribed, coroutines or timers outliving their owner, scene reload leaving static state behind.
   - **Determinism (when networked or replays):** unseeded or shared random, floating-point differences across platforms, iteration over unordered collections, wall-clock time, logic driven by rendering frame rate, state changed on a client that the server should own, missing reconciliation.
   - **Editor-only assumptions:** editor APIs or assets referenced outside editor builds, paths that differ in packaged builds, debug-only code left in, serialised fields renamed without migration so saved data or prefabs lose values.
   - **Feel and fairness:** input buffering and coyote time removed by accident, hit detection that depends on frame rate, difficulty constants hard-coded instead of data-driven.
3. Give each finding a concrete impact: an estimated per-frame cost or GC frequency, a player-visible symptom ("jump height 20% higher at 144 Hz"), or a desync scenario.
4. Note whether a profiler capture or a test on the lowest target device is needed to confirm.
</task>

<constraints>
- Each finding cites `path:line`, when the code runs, the impact and the fix in the engine's idiom.
- At most 10 findings, ranked by player impact. Do not micro-optimise code that runs once at load unless it hurts load time noticeably.
- Mark cost numbers as estimates; ask for a profiler capture rather than claiming exact milliseconds.
- Do not invent engine APIs; if you are unsure an API exists in the stated engine version, say so.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, with the main risk.
## Findings
Numbered. Each: `path:line`, runs (per frame, fixed tick, event, load), the problem, impact, the fix.
## Frame budget
Two or three bullets: where the change adds per-frame cost or allocations, and what to look for in the profiler.
## Playtest checks
Checkboxes: the frame rates, devices, network conditions and scenarios to test (for example 30 and 144 fps, packet loss, scene reload, packaged build).
</output_format>
