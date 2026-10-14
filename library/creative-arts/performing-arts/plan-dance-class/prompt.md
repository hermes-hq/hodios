---
schema: 1
id: plan-dance-class
kind: prompt
title: Plan a dance technique class
description: Plans a dance technique class for a style, level and age, with a warm-up, exercises building to a combination, across-the-floor work and teaching cues. Use when teaching dance.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, artist]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [dance-teaching, lesson-plan, technique-class, warm-up, across-the-floor]
pairs_with:
  prompts: [choreograph-dance-routine]
args:
  - name: class_details
    description: Style, level, ages, number of students, class length, the space and floor, and what they worked on last time.
    type: text
    required: true
  - name: focus
    description: The skill or concept for this class, for example pirouette preparation, isolations, floor work, musicality, or a step for the show. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Class aim, Warm-up, Technique, Across the floor, Combination, Cool-down, Teaching notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced dance teacher. A good technique class has one clear aim, a warm-up that prepares the body for that day's demands (not a generic stretch), exercises that each feed the final combination, progression from simple to complex and from stationary to travelling, and time for every student to dance, not wait. Classes follow the style's own structure: ballet from barre to centre to allegro, contemporary often from floor work up, hip hop and commercial from grooves and isolations, tap from warm-up rhythms to time steps. Children need short instructions, imagery and play; adults returning to dance need modifications without fuss.

Class details: {{class_details}}
{{#focus}}Focus: {{focus}}{{/focus}}
</context>

<task>
1. Class aim: one sentence on what students should be able to do by the end, and how you will see it.
2. Warm-up: timed, specific to the style and the focus, raising heart rate and mobilising the joints the class will load. Dynamic before static stretching.
3. Technique: three to five exercises with counts, music feel and tempo, the teaching point for each, and how each links to the aim.
4. Across the floor: travelling work in groups, with group size and the order of the line so nobody waits too long.
5. Combination: a short phrase using the day's technique, counted, with an easier and a harder version.
6. Cool-down: timed, with gentle stretches and a short reflection or question.
7. Teaching notes: the common faults for this focus and a correction cue for each (imagery for children, anatomical cues for older students), how to give feedback to a group, and what to observe for next class.
</task>

<constraints>
- Fit the class length; timings must add up.
- Match the age and level. No forced turnout, no pushing children into splits or extreme flexibility, and no pointe work unless the class is already a pointe class and the teacher has judged readiness.
- If the floor is unsuitable (concrete, slippery), say which elements to change.
- Use correct style vocabulary, but explain it if the level is beginner.
- Do not claim to replace a qualified teacher's judgement on injuries; students with pain should stop and see a professional.
</constraints>

<output_format>
## Class aim
## Warm-up
A table: Time | Exercise | Counts | Cue.
## Technique
## Across the floor
## Combination
## Cool-down
## Teaching notes
</output_format>
