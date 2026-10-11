---
schema: 1
id: design-roguelike-run-structure
kind: prompt
title: Design a roguelike run structure
description: Designs the run structure for a roguelike or roguelite - run length, map, reward choices, build-defining items, difficulty ramp and meta-progression - with fair variance.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [roguelike, roguelite, run-structure, meta-progression, build-variety, replayability]
pairs_with:
  prompts: [design-progression-system, design-difficulty-curve, design-loot-table]
  personas: [game-design-mentor]
args:
  - name: game
    description: The core moment-to-moment gameplay (combat, cards, dice, platforming), the platform and the target run length.
    type: text
    required: true
  - name: goals
    description: What should make each run different and what keeps players coming back, for example "builds that break the game in fun ways" or "short runs on a phone".
    type: text
    required: true
  - name: content_budget
    description: Roughly how many enemies, items, rooms or cards the team can make. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Run at a glance, Map and pacing, Reward choices, Build engine, Difficulty ramp, Meta-progression, Fairness and variance checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design run structures for roguelikes and roguelites. Replayability comes less from random content than from meaningful decisions under uncertainty: choosing paths with known risk and reward, picking one of a few rewards that pushes a build in a direction, and adapting when the run does not give what you wanted. Common failures: runs decided in the first five minutes by luck, a single dominant build, too many low-impact choices, a late game that is the early game with bigger numbers, and meta-progression that makes the game easier instead of more varied. Strong designs pace a run in acts with a boss or test at the end of each, offer rewards as small choices (often pick one of three), include items that change rules rather than only stats, and give players tools to reduce bad variance (rerolls, shops, removal of weak picks).

Game:
{{game}}

Goals:
{{goals}}
{{#content_budget}}

Content budget:
{{content_budget}}
{{/content_budget}}
</context>

<task>
1. Run at a glance: target length, number of acts or floors, what ends a run, and the main decision types the player makes.
2. Map and pacing: the map shape (linear, branching nodes, open), node types (fight, elite, shop, event, rest, treasure) with rough frequencies, and how the player sees risk and reward ahead.
3. Reward choices: what is offered when, how many options, rarity by act, and how choices steer builds.
4. Build engine: three to five build archetypes, the rule-changing items or abilities that define them, the synergies, and how a player commits or pivots during a run.
5. Difficulty ramp: how enemies and bosses scale per act, the checks that test whether the build works, and the ascending difficulty options for experienced players.
6. Meta-progression: what carries over between runs, preferring new options, characters and challenges over permanent power, and how it unlocks over the first 10 to 20 runs.
7. Fairness and variance checks: how often a run is lost to luck, tools that reduce bad variance, dominant-build risks, and what to measure in playtests.
</task>

<constraints>
- Fit the content budget; say what to cut first if the plan needs more content than stated.
- Mark frequencies and numbers as starting values to tune.
- Avoid designs where the optimal play is to reset runs until a lucky start.
- Do not copy specific items, cards or maps from published games.
</constraints>

<output_format>
## Run at a glance
## Map and pacing
Table: Node type | Frequency | Purpose.
## Reward choices
## Build engine
Table: Archetype | Defining items | Synergies | Weakness.
## Difficulty ramp
## Meta-progression
## Fairness and variance checks
</output_format>
