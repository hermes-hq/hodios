---
schema: 1
id: plan-rainy-day-activities
kind: prompt
title: Plan rainy-day activities
description: Suggests indoor activities for children's ages using materials already at home, with time needed, mess level, a schedule that alternates energy levels and a calm-down option.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [ideas, plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [indoor-play, screen-free, crafts-at-home, calm-down]
pairs_with:
  prompts: [plan-kids-party]
  personas: [parenting-coach]
args:
  - name: ages
    description: The children's ages, for example "2 and 6" or "three kids aged 7 to 10".
    type: string
    required: true
  - name: time_available
    description: How long you need to fill, for example "the afternoon", "2 hours", "the whole day". Optional.
    type: string
  - name: materials
    description: What you have at home, for example "cardboard boxes, tape, crayons, dried pasta, blankets, pots". Optional; common household items are assumed.
    type: text
output_contract:
  format: markdown
  sections: [At a glance, Activities, Suggested schedule, Calm-down option, Safety notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent or carer get through a day indoors without screens taking over or anyone losing their temper. Days like this go best when activities alternate between burning energy and calming down, when setup is fast and clean-up is manageable, and when children of different ages each have a real role. The adult may also be working or tired, so you say how much adult involvement each activity needs.

Ages: {{ages}}
{{#time_available}}Time to fill: {{time_available}}{{/time_available}}
{{#materials}}Materials at home: {{materials}}{{/materials}}
</context>

<task>
1. Suggest 6–8 activities across these types: active (indoor movement), building or pretend play, creative, sensory (for under-5s), a helping-at-home job made into a game, a quiet activity, and one that involves light learning through play.
2. Use only the materials listed or very common household items (paper, tape, pens, towels, pots, cushions). Mark anything else as optional. Never suggest buying things.
3. For each activity: name, ages it suits, setup and play time, materials, steps (3–4), how to make it easier or harder, adult involvement (hands-off, check-ins, or hands-on), and mess level.
4. For mixed ages, give each child a role (the older child is the "builder" or "game host", the younger the "tester") so both are engaged.
5. If a time is given, arrange the activities into a schedule that alternates high and low energy, with a snack or reset break about every hour.
6. Add a calm-down option for when things get wild: a specific, step-by-step activity suited to the ages, such as "smell the flower, blow out the candle" breathing, a blanket fort with books, or a body-scan story for older children.
7. Add safety notes relevant to the ages and materials.
</task>

<constraints>
- Safety for under-3s: no small parts that could fit through a toilet-roll tube, and no dried beans, beads or marbles. Balloons are a choking risk for children under 8, so suggest them only with close supervision and pick up broken pieces. Never use button batteries or small magnets. Supervise any water play and scissors, and keep cleaning products out of play.
- Activities must be realistic for the space and the adult's energy; flag anything noisy for flats with neighbours.
- No screens unless asked. If asked, suggest one active or creative use of them.
- Age-appropriate for older children too: a 10-year-old will not enjoy toddler activities.
- If ages are missing, ask for them.
</constraints>

<output_format>
## At a glance
Table: Activity | Ages | Time | Mess | Adult help.
## Activities
One short block per activity: steps, materials, easier or harder, roles for mixed ages.
## Suggested schedule
Table: Time | Activity | Energy (high or low). Only when a time was given.
## Calm-down option
## Safety notes
</output_format>
