---
schema: 1
id: generate-procedural-levels
kind: prompt
title: Generate procedural levels
description: Implements procedural level or map generation with a fitting algorithm, seeded and reproducible, with playability constraints and a validator that rejects broken output before a player sees it.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [game-developer]
stack: []
requires: [none]
inputs: [text, file]
output: [code, table, tests]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [procedural-generation, level-design, wave-function-collapse, noise, roguelike, seeds]
pairs_with:
  personas: [game-developer]
  prompts: [implement-game-ai-behavior, prototype-browser-game]
args:
  - name: level_requirements
    description: What a level must contain and feel like - genre, size, start and goal, keys and locks, enemies, secrets, biome or tileset, how varied runs should be - plus any hand-made pieces you want to reuse.
    type: text
    required: true
  - name: engine
    description: Engine and version, or "standalone" if the generator should be pure code.
    type: string
    default: standalone, engine-independent code
output_contract:
  format: markdown
  sections: [Design goals, Algorithm choice, Pipeline, Playability constraints, Code, Validator and tests, Tuning]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants generated levels. Engine: {{engine}}. Procedural generation fails when it produces "10,000 bowls of oatmeal": maps that are different but feel the same, or that are occasionally unwinnable. Experts pick the algorithm for the structure they need: BSP or room placement plus corridors for dungeons, cellular automata for caves, noise (Perlin, simplex, with octaves and domain warping) for terrain, wave function collapse for tile-consistent local detail, grammar or graph-first generation (mission graph, then space) when progression matters (locks and keys), and hand-made chunks stitched together when designers need control. They make everything seeded with a single seedable RNG passed explicitly (never the global RNG), generate in stages, and validate every result: connectivity by flood fill, keys reachable before their locks, path length bounds, and fallbacks or retries with a cap when a seed fails.
</context>

<task>
<level_requirements>
{{level_requirements}}
</level_requirements>

1. Turn the requirements into design goals: what must always be true, what should vary, and the size and time budget for generation. If start, goal or progression rules are missing and matter, ask.
2. Compare two or three fitting algorithms in a table and choose, often a combination (graph-first layout, then rooms, then WFC or noise for detail).
3. Describe the pipeline as ordered stages, each with inputs, outputs and the RNG sub-stream it uses, so changing one stage does not reshuffle the others.
4. Define playability constraints and how each is guaranteed by construction or checked afterwards: reachability, lock-and-key order, no softlocks (one-way drops, keys behind locks they open), min and max critical path, enemy and item density, spawn safety.
5. Write the generator code for {{engine}}: seeded RNG, stage functions, data structures (grid or graph), and conversion to tiles or scene objects; generation off the main thread or spread across frames if it takes more than a frame.
6. Write a validator and tests: run thousands of seeds headless, report failure rate, generation time p50 and p99, and metric distributions (path length, room count, dead ends); save failing seeds as regression cases; render a few seeds to images for review.
7. List tuning knobs and how each changes the feel.
</task>

<constraints>
- The same seed and version must always produce the same level; say what breaks this (iteration over hash maps, floating-point differences, engine physics).
- Never ship a level that fails validation; retry with a derived seed up to a cap, then fall back to a hand-made level.
- Do not invent engine APIs; state versions assumed.
</constraints>

<output_format>
## Design goals
Bullets: invariants, variety, budget.
## Algorithm choice
Table: Algorithm | Good for | Weak at; then the choice.
## Pipeline
Numbered stages.
## Playability constraints
Table: Constraint | Guaranteed by | Checked by.
## Code
Files with names.
## Validator and tests
Code and the seed-sweep report format.
## Tuning
Table: Knob | Range | Effect.
</output_format>
