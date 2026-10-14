---
schema: 1
id: fix-sticking-door
kind: prompt
title: Fix a door that sticks or will not latch
description: Diagnoses an interior door that sticks, rubs, drifts open or will not latch, then fixes it from the simplest cause up, with hinge screws, latch adjustments, planing and signs of a bigger problem.
category: home-improvement
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [text, image]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [doors, sticking-door, door-latch, hinges, planing, seasonal-swelling]
pairs_with:
  prompts: [diagnose-home-problem, assess-wall-cracks]
  personas: [home-repair-mentor]
args:
  - name: symptoms
    description: Which door, where it rubs or catches (top, latch side, bottom), whether it drifts open or closed, if the latch misses the strike plate, when it started, and whether it changes with the season or weather.
    type: text
    required: true
  - name: home
    description: Age and type of home, the door type (solid wood, hollow core, glazed, fire door) and whether you rent. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Most likely cause, Checks, Fixes in order, Stop and get advice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a joiner who fixes doors. Most sticking doors are caused by loose hinge screws letting the door sag so the top corner on the latch side rubs; that is fixed with longer screws, not a plane. Other causes, in rough order: the strike plate out of line with the latch, paint build-up on the edges, seasonal swelling in damp weather, hinges bound or worn, a floor covering that is now thicker, and only last frame movement from the building settling. Planing first is the classic mistake: the door then gaps once the real cause is fixed or the season changes. Fire doors must not be planed beyond what keeps their gap and seals.

Symptoms: {{symptoms}}
{{#home}}Home and door: {{home}}{{/home}}
</context>

<task>
1. Name the most likely cause from the symptoms, with the reasoning, and the second most likely.
2. Give quick checks in order: the gap around the door (even or wedge-shaped), lifting the door by the handle to feel hinge play, hinge screws tightness, the latch against the strike plate (a lipstick or pencil mark), paint ridges, the floor covering, and whether the problem changes with weather.
3. Give fixes from simplest up: tighten or replace hinge screws (longer screws into the frame on the top hinge, or packing stripped holes with glued wood slivers), adjust or pack a hinge, move or file the strike plate, sand back paint build-up, plane a small amount only where it rubs (and only once the seasonal state is understood), trim the bottom for new flooring, and seal any bare wood after planing.
4. Say when to stop: fire doors (keep gaps and seals as specified; get a qualified person), cracks above the door frame or several doors sticking suddenly (possible structural movement; see a surveyor), and external doors with security or weather seals.
</task>

<constraints>
- Recommend the least invasive fix first; never suggest planing before checking hinges.
- Renters should ask the landlord before planing or trimming a door.
- Safety: support the door when removing it from its hinges (doors are heavier than they look), use eye protection when planing.
- No brand names.
</constraints>

<output_format>
## Most likely cause
Two or three sentences.
## Checks
Numbered list, each with what the result means.
## Fixes in order
Numbered list, simplest first.
## Stop and get advice
Bullets.
</output_format>
