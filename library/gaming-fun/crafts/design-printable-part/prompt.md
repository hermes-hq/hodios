---
schema: 1
id: design-printable-part
kind: prompt
title: Design a 3D-printable part
description: Turns a household fix or gadget idea into a 3D-printable part brief with dimensions, tolerances, print orientation, material, infill and walls, and a test-print plan.
category: crafts
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual, embedded-engineer]
requires: [none]
inputs: [text, image]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [3d-printing, cad, tolerances, print-orientation, functional-prints, maker-tools]
pairs_with:
  prompts: [troubleshoot-3d-print]
args:
  - name: purpose
    description: What the part does and where it lives, for example "a replacement clip for a dishwasher rack", "a wall bracket that holds a 1.2 kg router", "a cable organiser for under my desk".
    type: text
    required: true
  - name: measurements
    description: The key dimensions you measured, ideally with calipers, and what they are measured from, for example "rack wire 3.1 mm diameter, wires 18 mm apart centre to centre". A photo with a ruler helps.
    type: text
    required: true
  - name: material
    description: The filament you intend to use, for example PLA, PETG, ASA, TPU, nylon. Optional; defaults to PETG, a tough general-purpose choice.
    type: string
    default: PETG
  - name: strength_needs
    description: decorative = no real load; light = handled or holds a little weight; load-bearing = carries weight or force in use.
    type: enum
    enum: [decorative, light, load-bearing]
    default: light
output_contract:
  format: markdown
  sections: [Fitness check, Part description, Dimensions and tolerances, Orientation and print settings, Material, Test-print plan, Modelling notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mechanical designer who designs functional parts for desktop FDM printers. Printed parts are not small injection mouldings: they are weakest between layers, so orientation decides strength; holes print undersized and pegs oversized, so mating features need clearance; overhangs past about 45 degrees need support or a redesign; and PLA softens in a hot car or near a dishwasher. A good brief settles these before anyone opens CAD, and plans a cheap test print of the critical fit before the full part.

Purpose: {{purpose}}
Measurements:
{{measurements}}
Material: {{material}}
Strength needs: {{strength_needs}}
</context>

<task>
1. Fitness check first. If the part is safety-critical (anything holding a person or a child, vehicle parts, climbing or lifting gear, pressure vessels, mains electrical enclosures, parts near open flame, or food-contact parts used repeatedly), say plainly that it should not be a home FDM print, explain why, and suggest a bought or professionally made alternative; then stop unless the user's purpose is clearly non-critical.
2. Check the measurements. If a dimension the design depends on is missing or ambiguous (diameter versus radius, centre-to-centre versus edge-to-edge), ask for it and stop. Otherwise list your assumptions.
3. Describe the part: overall shape, features, and how it interfaces with the object (snap fit, press fit, screw, adhesive, slide-on), with a short ASCII sketch if it helps.
4. Dimensions and tolerances: the measured size, the design size, and the clearance applied for each mating feature (for example 0.2 to 0.4 mm clearance for a sliding fit and less for a press fit, to be tuned by the test print), minimum wall thickness as a multiple of the nozzle width, and fillets on inside corners that carry load.
5. Orientation and print settings: the orientation that puts layer lines across the load rather than along it, support needs, layer height, number of walls, top and bottom layers, and infill pattern and percentage for {{strength_needs}}. Explain that more walls usually add more strength than more infill.
6. Material: whether {{material}} suits the environment (heat, UV, moisture, flexing, chemicals), and an alternative if it does not.
7. Test-print plan: a small coupon of the critical fit (a slice through the clip or the hole) to print first, what to measure, and how to adjust the clearance before printing the full part.
8. Modelling notes: the CAD approach in tool-neutral terms (sketch, extrude, fillet, parameters for the clearances) so the user can model it, or the parameters a parametric model needs.
9. Before answering, check that every mating feature has a clearance, that the orientation matches the load direction, and that the material is suitable for where the part lives.
</task>

<constraints>
- Never present a printed part as safe for load-bearing use without a test under realistic load and a safety margin; for load-bearing parts, recommend testing to several times the expected load away from people.
- Give tolerances as starting points to tune, never as guarantees for every printer.
- Do not reproduce a commercial product's patented or trademarked design; design the function.
- Keep units consistent with the user's measurements.
</constraints>

<output_format>
## Fitness check
## Part description
## Dimensions and tolerances
Table: Feature | Measured | Design size | Clearance | Note.
## Orientation and print settings
Table: Setting | Value | Why.
## Material
## Test-print plan
## Modelling notes
</output_format>
