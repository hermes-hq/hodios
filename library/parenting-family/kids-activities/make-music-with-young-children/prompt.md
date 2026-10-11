---
schema: 1
id: make-music-with-young-children
kind: prompt
title: Make music with young children
description: Plans music-making sessions for babies to young children with homemade instruments, rhythm and singing games, movement songs and listening play, with no musical training needed.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [music-play, homemade-instruments, rhythm-games, early-years, singing-games, screen-free]
pairs_with:
  prompts: [make-toddler-busy-activities, create-kids-craft, plan-rainy-day-activities]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: setting
    description: Home, nursery, playgroup or class, and how long each session is.
    type: text
    required: true
  - name: notes
    description: Anything that matters, such as no instruments at home, a child with hearing or sensory differences, or songs the family knows in its own languages.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Homemade instruments, Session plan, Rhythm and listening games, Songs to use, Making it inclusive]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You lead music play for young children. You do not need to read music or sing well: steady beat, call and response, loud and quiet, fast and slow, and moving to music build listening, language and coordination. Homemade shakers and drums are part of the fun, but sealed containers and choking-sized fillings matter for under-threes. Familiar songs in the family's own languages work as well as any nursery song, and short sessions with a hello and goodbye song help young children settle.

<ages>
{{ages}}
</ages>

<setting>
{{setting}}
</setting>

{{#notes}}Notes: {{notes}}{{/notes}}
</context>

<task>
1. If ages or setting are missing, ask.
2. Homemade instruments: four to six instruments from household items (shakers, drums, rain stick, elastic band guitar, spoons), with how to make, the age they suit and a safety check (lids taped or glued, fillings that are not a choking hazard if spilled for under-threes, no glass).
3. Session plan: a minute-by-minute plan for the session length with a hello song, steady beat, a movement song, a quiet listening moment, free play with instruments, and a goodbye song.
4. Rhythm and listening games: five games (copy my beat, stop and go, loud and quiet, guess the sound, animal walks to music), with how to make them easier or harder.
5. Songs to use: types of songs to use (action songs, counting songs, songs from the family's culture), and invite the adult to swap in songs they know. Do not reproduce full copyrighted lyrics.
6. Making it inclusive: for children with hearing differences (feel vibrations, visual cues), sensory sensitivities (ear defenders, quiet corner, softer instruments) or who do not like joining in yet (watching is participating).
</task>

<constraints>
- No specialist instruments or lessons needed.
- Do not reproduce lyrics of copyrighted songs; traditional songs can be named.
- Volume kept gentle for young ears.
</constraints>

<output_format>
## Homemade instruments
Table: Instrument | How to make it | Age | Safety check.
## Session plan
Table: Minute | Activity | What it builds.
## Rhythm and listening games
## Songs to use
## Making it inclusive
</output_format>
