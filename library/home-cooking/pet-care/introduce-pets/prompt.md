---
schema: 1
id: introduce-pets
kind: prompt
title: Introduce a new pet to resident pets
description: Plans introducing a new pet to resident pets step by step with separate spaces, scent swapping, supervised meetings and warning signs. Use before a new animal comes home.
category: pet-care
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pet-introductions, new-pet, multi-pet-home, dog-and-cat, cat-introductions, pet-body-language]
pairs_with:
  prompts: [solve-cat-behavior-problem, plan-new-pet-care, choose-pet-for-lifestyle]
  personas: [pet-care-advisor]
args:
  - name: resident_pets
    description: The pets already at home, with species, age, sex, temperament, how they reacted to other animals before, and where they eat, sleep and toilet.
    type: text
    required: true
  - name: new_pet
    description: The animal coming in, with species, age, sex, what is known of its history with other animals, and when it arrives. Add your home layout if you can (rooms, doors, gates, garden).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Safety check, Before arrival, Introduction stages, Body language, If it goes wrong, Realistic timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "When the animals must stay permanently separate, the stages table becomes a separation plan instead of introduction steps."}
---
<context>
You plan pet introductions the way a shelter behaviour coordinator would. Introductions fail when they are rushed: a bad first meeting can set animals against each other for months. Good introductions move in stages, each with a clear sign that it is time to move on, and go back a stage at the first sign of stress. Timelines are set by the animals, not the calendar.

What differs by pairing:
- Cat to cat: the slowest. A separate base room for the newcomer, scent swapping (bedding, a cloth rubbed on cheeks), feeding on either side of a closed door, then sight through a gate or a cracked door, then short supervised time together. Often weeks, sometimes months.
- Dog to dog: meet on neutral ground with parallel walks on loose leads, then into the garden, then the house with toys, food and beds picked up at first.
- Dog and cat: the cat must always have high escape routes and a dog-free room; the dog stays on a lead or behind a gate until it can look away from the cat and settle. Dogs with a strong chase or prey drive may never be safe with cats unsupervised.
- Predators and prey: rabbits, guinea pigs, rodents, birds and fish should live permanently separate from dogs, cats and ferrets, even if the predator seems friendly. Rabbits and guinea pigs should not be housed together.
- New small animals, birds and fish need a quarantine period away from residents before any introduction, to avoid spreading disease. A vet check for the newcomer comes first.

Resident pets: {{resident_pets}}
New pet: {{new_pet}}
</context>

<task>
1. Safety check: say whether this pairing can live together, live together with conditions, or must stay permanently separate, and why. Flag any resident or newcomer with a history of aggression and recommend a qualified behaviour professional before any meeting. If key facts are missing (for example, how the dog reacts to cats), ask up to three questions and stop.
2. Before arrival: vet check and quarantine where relevant, the newcomer's separate room or area, duplicated resources (food, water, beds, litter trays, hiding places, perches), gates and crates, and the residents' routine kept steady.
3. Introduction stages: four to six stages for this pairing, each with what you do, the sign it is time to move on, and the sign to go back. If the pairing must stay permanently separate, use this section for a separation plan instead: secure housing the predator cannot reach, see into or stare at, separate rooms or times, household rules (doors, gates, children), and never leaving them alone together.
4. Body language: relaxed and warning signs for each species involved (for example, in cats: hissing, flattened ears, puffed tail, staring, hiding; in dogs: stiff body, hard stare, fixation, lip lifting, raised hackles).
5. If it goes wrong: how to interrupt safely (a barrier such as a board or cushion, a loud clap, a blanket over a cat), never reaching between fighting animals, separating, and restarting at an earlier stage after a calm-down period.
6. Realistic timeline: likely range for this pairing, and the signs of a settled household (and the fact that some animals only ever tolerate each other).
</task>

<constraints>
- Never suggest putting animals together to "sort it out" or forced proximity. If the user proposes it, explain briefly why it often causes lasting fear or fights.
- Predators and prey animals stay separate permanently; do not give a plan for them to share space.
- Reward-based methods only; no punishment for hissing or growling, which are warnings worth keeping.
- Supervise all early meetings; unsupervised time only after many calm sessions.
</constraints>

<output_format>
## Safety check
## Before arrival
A checklist.
## Introduction stages
A table: Stage | What you do | Move on when | Go back if. For animals that must stay separate, a checklist separation plan instead.
## Body language
## If it goes wrong
## Realistic timeline
</output_format>
