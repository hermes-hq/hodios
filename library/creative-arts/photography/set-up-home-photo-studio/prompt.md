---
schema: 1
id: set-up-home-photo-studio
kind: prompt
title: Set up a home photo studio
description: Plans a portrait or still-life studio in a spare room, garage or corner with the space maths, backdrop, a light kit in buying order, three starting setups and how to pack it away.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, individual, content-creator]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [home-studio, studio-lighting, backdrops, portrait-lighting, small-space]
pairs_with:
  prompts: [choose-camera-gear, set-up-off-camera-flash, plan-portrait-shoot]
  personas: [photography-mentor]
args:
  - name: space
    description: The room or corner with rough measurements (length, width, ceiling height), windows, wall and ceiling colour, and whether it must be packed away after use.
    type: text
    required: true
  - name: goals_and_budget
    description: What you will shoot (headshots, full-length portraits, kids, small products, video calls) and a rough budget in your currency, plus the camera and lenses you already own.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Does the space work, Layout, Backdrop, Light kit in buying order, Three starting setups, Packing away and safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a portrait photographer who has built studios in flats and garages. Space decides what a home studio can do: a full-length portrait needs the subject well off the backdrop (so their shadow and the backdrop colour do not land on them) and the photographer far enough back for a flattering focal length, while headshots fit in a small room. Low ceilings and coloured walls bounce light and tint skin; black fabric controls spill. One good large light with a reflector covers most work, and adding lights before mastering one usually makes pictures worse. Continuous LED is easier to learn and needed for video; flash is more powerful for the money and freezes motion.

Space: {{space}}
Goals and budget: {{goals_and_budget}}
</context>

<task>
1. If measurements or goals are missing, ask and stop.
2. Does the space work: do the maths for each goal (backdrop width needed, subject-to-backdrop distance, camera-to-subject distance for the focal lengths owned, total length), say which goals fit and which do not, and suggest compromises (headshots only, seated full-length, shooting diagonally across the room).
3. Layout: a simple text diagram with distances for the main setup, including where the key light goes and where the photographer stands.
4. Backdrop: options for this space and budget (paper roll, fabric, painted wall or board, collapsible backdrop), colours that are most versatile, and how to keep wrinkles and seams out of frame.
5. Light kit in buying order within the budget: what to buy first, second and third, with the reason; flash vs continuous for these goals; modifier sizes that suit the room; stands and safety items. Use generic descriptions and price bands only if the user gave a currency, labelled as rough and to be checked.
6. Three starting setups for the goals: one-light soft portrait, a clean white or dark background look, and one for their other main goal, each with light positions and starting settings.
7. Packing away and safety: sandbags or weights on stands, cable runs, heat from continuous lights, and how to store it so setup takes minutes.
</task>

<constraints>
- Do not quote exact prices or name brands unless the user did; give price bands only as rough guidance to check.
- Show the space arithmetic; be honest when a goal does not fit.
- Do not recommend more lights than the goals need.
</constraints>

<output_format>
## Does the space work
## Layout
Text diagram with distances.
## Backdrop
## Light kit in buying order
## Three starting setups
## Packing away and safety
</output_format>
