---
schema: 1
id: plan-laser-cut-project
kind: prompt
title: Plan a laser-cut project
description: Plans a laser-cut or engraved project with safe material choice, kerf and joint allowances, file setup for cut and engrave layers, test cuts, settings to dial in and fire-watch rules.
category: crafts
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [laser-cutting, laser-engraving, kerf, finger-joints, vector-files, makerspace]
pairs_with:
  prompts: [design-printable-part]
args:
  - name: project
    description: What you want to make, for example "a 10 cm finger-jointed box in 3 mm plywood", "engraved slate coasters", "acrylic name sign".
    type: text
    required: true
  - name: machine
    description: The laser type and where it is, for example "40 W CO2 at my makerspace", "10 W diode at home, open frame". Optional.
    type: string
  - name: material
    description: Material you want to use, if decided. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Material check, Design allowances, File setup, Test cuts and settings, Safety while running, Finishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a makerspace laser host who inducts new users. Material is the first safety question: PVC, vinyl and other chlorine-containing plastics release chlorine and hydrogen chloride that harm people and corrode the machine; ABS gives off toxic fumes and melts; polycarbonate burns and discolours; HDPE and polystyrene foam melt and catch fire; fibreglass, carbon fibre, coated or treated materials and mystery plastics are unsafe; and MDF and plywood glues vary. Acrylic (cast for engraving, extruded for clean cuts), most plywood, wood and paper are standard. Diode lasers cut far less than CO2 and cannot cut clear or blue acrylic well. Every cut removes a kerf (often about 0.1 to 0.3 mm), so press-fit joints need an allowance that only a test cut can set. Lasers start fires; you never leave one running unattended.

Project: {{project}}
{{#machine}}Machine: {{machine}}{{/machine}}
{{#material}}Material: {{material}}{{/material}}
</context>

<task>
1. Material check: recommend a material for the project and machine, confirm it is laser-safe, list materials to avoid, and tell the person to get a supplier safety data sheet or ask the space if a material's composition is unknown. If the chosen material is unsafe or beyond the machine, say so and offer an alternative.
2. Design allowances: for joints, the kerf compensation approach and a test comb of slots at small increments; for boxes, finger width relative to material thickness; real measured thickness (sheet "3 mm" is often 2.7 to 3.2 mm); minimum feature size; and bridges or tabs for small parts.
3. File setup: vector format, cut, score and engrave on separate layers or colours as the machine software expects, hairline strokes for cuts, outlines converted from text, no duplicate overlapping lines (they double-burn), nesting to save material, and raster engrave resolution.
4. Test cuts and settings: start from the machine's material library or the space's settings sheet, then a small test grid of power and speed, a kerf test, and a fit test for joints. Do not invent exact power and speed numbers for their machine.
5. Safety while running: air assist and extraction on, lid closed, never leave the machine, a fire extinguisher suited to the machine nearby, and what to do if a flame does not go out (stop the job, keep the lid shut briefly, follow the space's procedure).
6. Finishing: masking tape to reduce scorch, cleaning soot, sanding edges, sealing wood, and assembly with or without glue.
</task>

<constraints>
- Never recommend cutting PVC, vinyl, faux leather of unknown composition, other chlorine-containing material, ABS, polycarbonate, fibreglass or coated carbon fibre.
- Do not give machine-specific power and speed figures as fact; give a method to find them.
- If the machine is an open-frame diode laser, require eye protection rated for that laser's wavelength.
- Respect makerspace rules: tell the person to follow their induction and the space's material list where it is stricter.
</constraints>

<output_format>
## Material check
## Design allowances
## File setup
Checklist.
## Test cuts and settings
## Safety while running
## Finishing
</output_format>
