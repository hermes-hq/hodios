---
schema: 1
id: choose-game-entity-architecture
kind: prompt
title: Choose a game entity architecture
description: Decides between inheritance, component composition and an entity component system for a game from entity counts, team and engine, with data layout, update order and switching cost.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [game-developer, architect]
requires: [none]
inputs: [text, spec]
output: [adr, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [entity-component-system, data-oriented-design, game-loop, composition]
pairs_with:
  personas: [game-developer]
  prompts: [write-adr, compare-design-options]
args:
  - name: game_description
    description: The game and its simulation - genre, how many entities of which kinds are alive at once (for example 40 enemies or 20,000 units), how varied their behaviour is, target platforms and frame rate, team size and experience, and what exists already.
    type: text
    required: true
  - name: engine
    description: Engine or framework and language, for example Unity C#, Unreal C++, Godot, Bevy, MonoGame or a custom engine. Decides which options are native and which fight the engine.
    type: string
    default: not decided
output_contract:
  format: markdown
  sections: [Decision, Options compared, Data layout, Update order, Cost of switching later, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a game team choose how game entities are modelled. The three families are a class hierarchy (an Enemy base class with subclasses), component composition on game objects (Unity MonoBehaviours, Unreal actor components, Godot nodes), and a data-oriented entity component system (archetype or sparse-set storage, systems iterating over components). Teams go wrong by choosing an ECS because it is fashionable for a game with 50 entities and losing months to tooling, by building deep inheritance trees that collapse when a "flying, burning, invisible" enemy appears, and by fighting their engine's native model instead of using it. The right answer depends on entity count and variety, performance budget, the engine and the team.

Engine: {{engine}}
</context>

<task>
<game_description>
{{game_description}}
</game_description>

1. Extract the forces: peak simultaneous entities by kind, how many behaviours combine (the variety problem), per-frame work per entity, frame budget (16.6 ms at 60 fps, 8.3 ms at 120 fps) and the share the simulation gets, need for determinism, save and load or network replication, designer workflow and the team's experience.
2. Compare the three options plus any hybrid (for example engine game objects for the player, UI and a few bosses, plus a data-oriented system for thousands of projectiles or crowd agents). Score each against the forces in a table, and say which option is native to the engine named above and what its built-in ECS or job system offers if any. If the engine is not decided, say how the choice of engine and this decision constrain each other.
3. Decide, with the main reason in one sentence and the conditions under which the decision should be revisited (for example "if units exceed about 5,000 on the target console").
4. Show the data layout for the decision: the core components or classes for two representative entities from the game, as short code or structs in the engine's language (neutral pseudocode if no engine is decided), showing where state lives and how behaviours combine.
5. Define the update order per frame: input, AI or decisions, movement and physics, collisions and responses, gameplay rules, animation, rendering submission, and where entity creation and destruction are deferred to avoid mutation during iteration.
6. Estimate the cost of switching later: what code would be rewritten, and the seams to keep now (plain data components, systems that do not reach into other entities directly, events) that make a later move cheaper.
</task>

<constraints>
- Do not claim performance numbers you cannot know; say what to profile (a stress scene at the peak entity count on the weakest target device) before committing.
- Do not recommend replacing the engine's native model without a measured reason.
- If entity counts, platform or engine are missing and they decide the answer, ask for them and stop.
- Keep code short and illustrative; mark engine API names you are not sure of.
</constraints>

<output_format>
## Decision
The choice, the main reason and the revisit trigger, in under 100 words.

## Options compared
Table: option | fit to forces | native to engine | main risk.

## Data layout
Code blocks for two representative entities.

## Update order
Numbered per-frame order, with where spawns and despawns happen.

## Cost of switching later
Bullets: what is rewritten, seams to keep now.

## Questions
Bullets.
</output_format>
