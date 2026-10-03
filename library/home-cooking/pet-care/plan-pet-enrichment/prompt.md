---
schema: 1
id: plan-pet-enrichment
kind: prompt
title: Plan daily enrichment for a pet
description: Plans daily enrichment for a dog, cat or small pet with games, puzzle feeding, training and environment ideas matched to the species and the time you have. Use when a pet seems bored or destructive.
category: pet-care
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [pet-enrichment, puzzle-feeders, bored-dog, indoor-cat, animal-welfare, scent-games]
pairs_with:
  prompts: [teach-dog-trick, solve-cat-behavior-problem, train-dog-behavior]
  personas: [pet-care-advisor]
args:
  - name: pet
    description: Species, breed or type, age, health or mobility limits, and what the pet does when bored (chewing, barking, digging, overgrooming, night activity).
    type: text
    required: true
  - name: time_available
    description: Realistic minutes per day you can give, for example "20 minutes on weekdays, more at weekends". Optional.
    type: string
    default: "20 to 30 minutes a day"
  - name: home
    description: Where the pet lives (flat, house, garden, cage or hutch size, tank), who else is at home, and how long the pet is alone. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this pet needs, Daily plan, Enrichment menu, Weekly rotation, Is it working, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design enrichment the way a zoo enrichment keeper and a force-free trainer would: start from what the species is built to do and give it safe ways to do it. Many problems owners call "naughty" are unmet needs. Enrichment covers food and foraging, sniffing and other senses, thinking and training, social contact, physical activity, and the environment itself. Ten minutes of the right activity often settles an animal more than an hour of the wrong one: for many dogs, sniffing and chewing tire them more calmly than fetch; cats need the full hunt sequence (stalk, chase, pounce, "kill", eat); rabbits need to dig, chew and forage and need a rabbit companion; parrots spend much of their day foraging in the wild.

Pet: {{pet}}
Time available: {{time_available}}
{{#home}}Home: {{home}}{{/home}}
</context>

<task>
1. If the species or age is missing, ask in one line and stop. If the "boredom" sign could be medical (overgrooming to bald patches, feather plucking, sudden night restlessness in an older animal, sudden destructiveness), recommend a vet check alongside the plan.
2. What this pet needs: the species-typical behaviours that matter most for this animal, and a quick audit of which ones the current routine meets and which it misses.
3. Daily plan that fits {{time_available}}: a table by time of day, with what to do and for how long, including what the pet can do alone (food puzzles, a scatter feed, a safe chew, a window perch).
4. Enrichment menu: 10 to 15 ideas grouped by type, each with difficulty, cost (free, cheap, buy) and how to make it from household items where possible (cardboard boxes, egg cartons, towels, paper bags with handles removed).
5. Weekly rotation: how to rotate toys and activities so novelty lasts.
6. Is it working: signs of a well-enriched animal (settles easily, less problem behaviour) and signs of too much or the wrong kind (frustration, over-arousal, guarding), and how to adjust.
7. Safety: supervision for new items, choking and string hazards, toxic plants and materials for this species, and making puzzles easy at first so the pet succeeds.
8. If the living setup itself harms welfare (a single rabbit or guinea pig, a small hutch, a bowl for fish, a dog alone for very long days), say so kindly and suggest what would work within the owner's means.
</task>

<constraints>
- Species-specific only; never stretch dog ideas to cats or small animals.
- Prefer free and low-cost ideas; mention bought items only where they add something.
- No punishment-based advice for the boredom behaviours.
- Keep the plan realistic for the time given; a plan the owner cannot keep is worse than a short one.
</constraints>

<output_format>
## What this pet needs
## Daily plan
A table: Time | Activity | Minutes.
## Enrichment menu
## Weekly rotation
## Is it working?
## Safety
</output_format>
