---
schema: 1
id: play-evolve-a-species
kind: prompt
title: Play an evolution game
description: Has the player steer a fictional population through changing environments over generations, choosing which variations to follow while natural selection, drift and trade-offs decide what survives.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
subject: [biology]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [natural-selection, evolution, genetic-drift, science-game, classroom-game]
pairs_with:
  prompts: [play-ecosystem-keeper, play-first-contact-game]
args:
  - name: starting_creature
    description: The kind of starting population, for example "small grazing mammal", "shore-dwelling beetle", "freshwater fish". Fictional species.
    type: string
    default: small grazing mammal
  - name: eras
    description: Number of turns, each a stretch of many generations.
    type: number
    default: 10
  - name: level
    description: primary = simple words and fewer mechanics; secondary = adds drift, sexual selection and trade-offs; advanced = adds allele frequencies and speciation.
    type: enum
    enum: [primary, secondary, advanced]
    default: secondary
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run an evolution game that teaches how natural selection really works, including the misconceptions it should correct. Individuals do not evolve; populations do. Variation arises randomly through mutation and recombination, not because the animal needs it. The environment selects among existing variation, so traits that help survival and reproduction in this environment become more common over many generations. Every trait has costs (big brains need food, thick fur overheats), small populations change by chance (drift), mates can select for showy traits, and a population split by a barrier can become separate species. Extinction is common.

Starting population: {{starting_creature}}
Turns: {{eras}}
Level: {{level}}
</context>

<task>
1. Before play, define the fictional population: size, habitat, five traits with current average values (for example body size, fur, diet range, speed, litter size), and a hidden schedule of environmental changes (cooling, a new predator, drought, an island separation, a new food source).
2. Each turn, describe the environment and its pressures, then present three random variants that have appeared in the population (each a small change in one or two traits with a cost). The player chooses which variant they think will spread and why.
3. Resolve selection honestly: compute which variants actually raise survival and reproduction under current conditions, including costs, and how much they spread. If the player's pick is poorly suited, it stays rare or vanishes regardless of their choice, and you explain why. At secondary and advanced, apply drift when the population is small and occasional sexual selection.
4. Update and show the trait table and population size. At advanced, show approximate allele frequency changes.
5. Correct misconceptions as they come up ("the creature decided to grow fur"), briefly and kindly.
6. At the end, show the family tree of changes, any speciation or extinction, and five concepts the player saw in action, with real-world examples named only where you are confident of them.
</task>

<constraints>
- The player influences what they bet on, not what evolves; never let a choice override selection.
- Keep the species fictional; keep real-world examples accurate and well known, or leave them out.
- Match language and mechanics to the level.
- Keep population and trait numbers consistent between turns.
</constraints>

<output_format>
Each turn: environment, variants, then after the choice, the outcome and a table:
| Trait | Before | After | Why |
and [Era n of N | Population: … | Environment: …].
End: lineage summary, five concepts with examples.
</output_format>
