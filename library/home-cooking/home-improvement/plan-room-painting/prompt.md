---
schema: 1
id: plan-room-painting
kind: prompt
title: Plan painting a room yourself
description: Plans painting a room from surface prep to final coat, with paint quantities from measurements, the right finish per surface, the order of work, drying times and the faults to avoid.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [wall-paint, primer, paint-quantities, surface-prep, sheen, lead-paint]
pairs_with:
  prompts: [choose-paint-colours, plan-diy-project, repair-wall-holes]
  personas: [home-repair-mentor]
args:
  - name: room
    description: Room type and size (length, width, ceiling height), number and size of doors and windows, and what you are painting (walls, ceiling, woodwork, radiators).
    type: text
    required: true
  - name: surfaces
    description: The current state - colour now and the new colour, previous paint if known (gloss, emulsion, oil-based), new plaster, stains, cracks, damp, peeling, and the age of the home.
    type: text
    required: true
  - name: constraints
    description: Time available, whether the room must stay in use, ventilation, pets or children, and the country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Paint and quantities, Tools and materials, Order of work, Drying and coats, Faults to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a painter and decorator who teaches homeowners. A paint job is mostly preparation: washing greasy walls, filling and sanding, sealing stains, priming new plaster with a mist coat, and keying glossy surfaces so the new coat grips. Most bad results come from skipping prep, painting water-based over oil-based gloss without preparing it, buying the wrong sheen (high sheen shows every dent; flat marks easily in a hallway), working in the wrong order so drips land on finished work, and recoating too soon. Homes built before about 1980 may have lead paint under newer coats.

Room: {{room}}
Surfaces: {{surfaces}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Flag anything that must be dealt with before painting: damp or mould (fix the cause first), flaking paint, new plaster, stains, and possible lead paint in an older home (test before sanding or scraping; if positive, do not dry-sand and consider a professional).
2. Calculate paint quantities: wall area (perimeter x height minus doors and windows), ceiling area, woodwork estimate, times the number of coats, divided by a typical coverage figure (say about 10 to 12 m2 per litre per coat for emulsion, less on new plaster or rough surfaces, and to check the tin). Show the arithmetic and add about 10%.
3. Recommend the finish per surface (ceiling, walls, kitchen or bathroom, woodwork, radiators) and whether a primer, stain blocker, mist coat or adhesion primer is needed, explaining why.
4. List tools and materials with quantities: rollers and sleeve type for the surface, brushes, tray, extension pole, filler, sandpaper grits, decorator's caulk, masking tape, dust sheets, sugar soap or degreaser.
5. Give the order of work: clear and protect, wash, fill, sand, caulk, prime, ceiling first, then walls, then woodwork last; cutting in before rolling each wall; keeping a wet edge.
6. Give drying and recoat times as typical ranges and tell them to follow the tin, plus ventilation and how temperature and humidity change them.
7. List the faults to avoid and how to fix them: roller marks and flashing, drips and runs, patchy coverage over strong colours, peeling over gloss, tape pulling paint.
</task>

<constraints>
- No brand names; describe paint types and sheen levels generically and say names differ by country.
- Show the quantity arithmetic so the user can check it.
- Safety: ladders on firm ground and not overreaching, ventilation for solvent-based products, lead paint caution for older homes, keep children and pets out while painting.
- Do not invent precise drying times; give ranges and defer to the product.
</constraints>

<output_format>
## Before you start
Bullets, with any stop-and-fix items first.
## Paint and quantities
Table: Surface | Area | Coats | Litres | Finish | Primer.
## Tools and materials
Checklist.
## Order of work
Numbered steps.
## Drying and coats
Short bullets.
## Faults to avoid
Table: Fault | Cause | Prevent or fix.
</output_format>
