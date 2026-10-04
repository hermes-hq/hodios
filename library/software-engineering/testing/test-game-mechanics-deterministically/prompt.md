---
schema: 1
id: test-game-mechanics-deterministically
kind: prompt
title: Test game mechanics deterministically
description: Makes game logic testable with a fixed timestep, seeded randomness and input replays, then writes tests for combat, physics and progression rules. Use when only manual playtests catch regressions.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [game-developer]
stack: []
requires: [none]
inputs: [file, text]
output: [tests, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fixed-timestep, seeded-rng, input-replay, golden-snapshots, game-logic]
pairs_with:
  prompts: [prototype-browser-game, decouple-for-testability]
  personas: [game-developer]
args:
  - name: game_code
    description: The gameplay code to test (damage formula, movement controller, ability cooldowns, loot tables, a state machine) and the engine callbacks it lives in.
    type: text
    required: true
  - name: engine
    description: The engine and language, such as Unity with C#, Godot with GDScript or C#, Unreal with C++, Bevy, or a custom engine.
    type: string
    default: "infer from the code and say what you assumed"
output_contract:
  format: markdown
  sections: [What to test, Making it deterministic, Refactor, Tests, Replay and golden checks, Still needs playtesting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a game developer whose mechanics are only checked by playing. Engine: {{engine}}. Game logic is hard to test because it is tangled with the frame loop and engine objects, uses variable delta time, calls a global random generator, and reads input devices directly. The same jump then lands in different places on a 30 fps and a 144 fps machine, and a "can't reproduce" crit bug stays unfixed.

The expert approach: pull rules out of engine callbacks into plain code, step simulations with a fixed timestep, inject a seeded random source, feed recorded inputs, and compare results against approved snapshots with tolerances. Common mistakes to avoid: testing exact floats with `==`, snapshotting the whole world so every tweak breaks the tests, testing "feel" values that designers will tune weekly as if they were rules, and running everything as slow play-mode tests when most could be edit-mode or plain unit tests.
</context>

<task>
<game_code>
{{game_code}}
</game_code>

1. Separate rules from tuning: list the invariants that must hold whatever the numbers (damage never negative, cooldown cannot be bypassed, a jump always reaches the same apex at any frame rate, loot weights sum to 1) from tuning values designers change. Test invariants and formulas; read tuning values from the same data the game uses.
2. Make it deterministic:
   - Fixed timestep: run simulation in fixed steps (for example 1/60 s) with an accumulator; tests call `Step(dt)` N times instead of waiting for frames.
   - Randomness: one injected, seedable random source per system; no calls to the global generator in game rules.
   - Time and input: an injected clock and an input interface the test can drive, with a recorded input sequence format (frame number, action, value).
3. Show the smallest refactor that achieves this, as before-and-after code, keeping behaviour the same.
4. Write tests at the cheapest level: plain unit tests for formulas and state machines; edit-mode (or headless) tests for components that need engine types; play-mode or scene tests only for behaviour that needs physics or the scene graph. Use the engine's runner (Unity Test Framework, GUT or GdUnit for Godot, Unreal Automation, `cargo test` for Bevy).
5. Cover: boundaries (zero, max level, overflow of stacks), frame-rate independence (same result at 30, 60 and 144 Hz steps within a tolerance), seeded probability (for drop rates, run a large seeded sample and check the observed rate is within a stated tolerance), and state transitions (stun during a dash, death during a cooldown).
6. Add one replay or golden-state test: a recorded input sequence and seed, run for N steps, compare selected state (position, health, score) with an approved snapshot and a float tolerance; explain how to update the snapshot when a change is intended.
7. Say which questions still need humans playing: feel, readability, difficulty, fun.

If the code does not show the formula or the engine callbacks needed, ask for them and stop.
</task>

<constraints>
- Compare floats with an explicit tolerance and say why it was chosen.
- Never call the global random generator or real time in tests.
- Keep snapshots small and named; never snapshot the whole scene.
- Do not invent engine APIs; mark uncertain ones as [CHECK ENGINE DOCS].
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What to test
Table: rule or invariant | test level (unit, edit-mode, play-mode) | why.
## Making it deterministic
Timestep, random source, clock and input interfaces.
## Refactor
Before-and-after code.
## Tests
Test code, one comment per test on what it proves.
## Replay and golden checks
The replay format, the test, and how to approve an intended change.
## Still needs playtesting
Bullets.
</output_format>
