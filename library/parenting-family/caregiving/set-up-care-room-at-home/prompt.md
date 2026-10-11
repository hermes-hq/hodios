---
schema: 1
id: set-up-care-room-at-home
kind: prompt
title: Set up a care room at home
description: Plans a room at home for a relative who now needs care in bed or nearby, with layout around equipment such as a hospital bed, hoist or commode, comfort, carer access and the delivery checklist.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [home-adaptations, care-equipment, hospital-bed, home-setup, carers]
pairs_with:
  prompts: [reduce-falls-risk-at-home, plan-end-of-life-care-at-home, prepare-for-parent-moving-in]
  workflows: [hospital-discharge-track]
  personas: [eldercare-advisor]
args:
  - name: person
    description: Who needs the room, what they can and cannot do (stand, transfer, walk), equipment already advised or on order, how long the set-up is likely to be needed, and the country.
    type: text
    required: true
  - name: home
    description: The room you have in mind, its size, floor, doors and stairs, toilet and bathroom distance, heating, and who else lives there. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Choosing the room, Layout, Equipment to ask about, Comfort and dignity, For the carers, Before delivery day, Questions for the therapist or nurse]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families set up a care room the way an experienced community occupational therapist would. Families often get a hospital bed delivered into a room where it does not fit, against a wall where carers cannot reach both sides, with a hoist that cannot turn, on deep carpet, upstairs away from the toilet and the rest of the family. What professionals know: the room should usually be on the floor with or nearest the toilet, and a living room downstairs often works better than a bedroom upstairs if privacy can be managed; a hospital or profiling bed needs space on both sides for carers, and a mobile hoist needs a clear turning space and a hard or low-pile floor; power sockets, lighting, warmth and ventilation matter; and the person's view, light and connection to family life affect mood. Equipment and its assessment usually come through health or social care services after an occupational therapy or nursing assessment; supply, loan schemes and costs vary by country.

<person>
{{person}}
</person>
{{#home}}Home: {{home}}{{/home}}
</context>

<task>
1. Choosing the room: compare the options given (or likely options) on toilet access, space, privacy, light and view, noise, heating, and being part of family life, and recommend one with the trade-offs.
2. Layout: a plain-text layout with bed position (space on both sides, head near sockets, not under a window if drafts), commode or toilet route, chair for sitting out, bedside table within reach, a clear turning circle if a hoist is used, and storage for supplies.
3. Equipment to ask about: kinds of equipment that may be relevant to their needs (profiling bed, pressure-relieving mattress, hoist and slings, commode, bed table, rails, call bell or monitor), marked as "ask the therapist or nurse"; no brands or prices.
4. Comfort and dignity: personal items, photos, a view outside, privacy screens or curtains, lighting at night, temperature, a radio or TV, and ways to keep them part of household life.
5. For the carers: working height, space to work without twisting, gloves and supplies at hand, laundry and waste, and a place to sit by the bed.
6. Before delivery day: a checklist to clear and measure the room, remove or protect rugs, check door widths and the route in, sockets, and who will be there to receive and learn the equipment.
7. Questions for the therapist or nurse: on the right equipment, training in using it safely, servicing and faults, pressure care, and what to do if needs change.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell anyone to use a hoist, slings or transfers without assessment and training from a professional.
- No product names, sizes as fact, prices or claims about free supply; say provision varies by country and area.
- Keep the person's own preferences about where they spend their days central.
- Mention fire safety basics (working smoke alarm, clear exit, no overloaded sockets) without inventing regulations.
</constraints>

<output_format>
## Choosing the room
## Layout
Plain-text sketch in a code block.
## Equipment to ask about
## Comfort and dignity
## For the carers
## Before delivery day
Checklist.
## Questions for the therapist or nurse
</output_format>
