---
schema: 1
id: turn-game-design-into-tech-spec
kind: prompt
title: Turn a game design into a tech spec
description: Turns a game design section such as a mechanic, economy or progression system into an engineering spec with data definitions, state, designer tunables, edge cases, save impact and test hooks.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [game-developer, designer, tech-lead]
stack: []
requires: [none]
inputs: [spec, document, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [game-design-document, tunables, save-data, gameplay-systems, data-driven-design]
pairs_with:
  prompts: [write-game-design-document, design-game-mechanic, design-game-economy]
  personas: [game-design-mentor]
args:
  - name: design_section
    description: The design document section to implement - the mechanic, economy or progression system as the designer wrote it, with numbers, examples and references to other systems.
    type: text
    required: true
  - name: engine
    description: Engine, language and relevant architecture, for example "Unity 6, C#, ScriptableObjects for data, ECS for combat" or "custom C++ engine, JSON data".
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Summary, Rules as logic, Data definitions, Runtime state, Tunables, Edge cases, Save and versioning, Test hooks, Questions for design]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Game design documents describe how a system should feel; programmers need exact rules, data and state. The gap causes the classic problems: numbers hard-coded so designers cannot tune without a programmer, ambiguous rules ("crits stack") implemented one way and designed another, edge cases discovered in playtests (what if the player levels up twice in one frame, sells an equipped item, or loads an old save), and no way to test the system without playing for an hour. The engine context is {{engine}}.
</context>

<task>
<design_section>
{{design_section}}
</design_section>

1. Summarise the system in three to five sentences, and list the other systems it touches (inventory, UI, save, audio, networking, analytics).
2. Restate every rule as precise logic: triggers, conditions, order of evaluation, formulas with variable names and units, rounding, caps and floors, random rolls with their distribution and seeding. Where the design is ambiguous, write the interpretations side by side and raise a question instead of choosing silently.
3. Data definitions: the static content types designers author (items, levels, curves, tables) with each field, type, range and default, and where they live in the engine's data pipeline. Prefer data-driven definitions over code constants.
4. Runtime state: what changes during play, who owns it, when it changes, and whether it is replicated in multiplayer.
5. Tunables: every number designers will want to change, with a sensible initial value from the design, a safe range, and whether it can change at runtime (hot reload or debug menu).
6. Edge cases: simultaneous events in one frame, interruptions (pause, death, scene change, disconnect), overflow and extreme values, stacking and order dependence, exploits (duplication, infinite loops of rewards), and localisation of any generated text.
7. Save and versioning: what is persisted, the format, how saves from earlier versions are migrated when fields or balance change, and what must never be persisted (derived values).
8. Test hooks: debug commands or cheats to reach each state quickly, deterministic seeds, automated tests for formulas and edge cases, and telemetry events designers need to balance the system.
9. Questions for design: every ambiguity and missing number, phrased so the designer can answer quickly.
</task>

<constraints>
- Use only rules and numbers from the design. Write [X] for a missing value and add a question; do not balance the game yourself.
- Keep engine-specific advice correct for the stated engine; if the engine is not stated, stay engine-neutral.
- Write formulas in plain notation with named variables, and show one worked example with numbers from the design.
- Flag any monetisation or randomised reward mechanic that may face store rules or regional regulation (for example paid loot boxes) as something to check, without stating the law.
</constraints>

<output_format>
## Summary
Paragraph and a list of touched systems.
## Rules as logic
Numbered rules, formulas in code blocks, one worked example.
## Data definitions
Table per content type: field, type, range, default, notes.
## Runtime state
Table: state, owner, changes when, persisted, replicated.
## Tunables
Table: name, initial value, safe range, runtime-editable.
## Edge cases
Table: case, expected behaviour, source (design or proposed).
## Save and versioning
Bullets.
## Test hooks
Bullets: debug commands, tests, telemetry events.
## Questions for design
Numbered.
</output_format>
