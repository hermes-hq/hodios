---
schema: 1
id: design-bathroom-layout
kind: prompt
title: Design a bathroom layout
description: Designs a bathroom or shower room layout from its measurements and fixed waste, with fitting positions, clearances, storage, lighting and ventilation, and where future access needs fit in.
category: interior-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bathroom-design, floor-plan, wet-room, ventilation, small-spaces]
pairs_with:
  prompts: [plan-renovation-budget, hire-contractor, plan-aging-in-place-modifications]
args:
  - name: room
    description: Room size with units and ceiling height (and any sloping ceiling), where the door and its swing, window, soil stack or toilet waste, and water supply are, and the floor type (timber or concrete).
    type: text
    required: true
  - name: needs
    description: Who uses it and how (busy family mornings, an en suite, an older person, a child who needs a bath), bath or shower or both, storage wanted, and style. Optional.
    type: text
  - name: constraints
    description: Budget with currency, owning or renting, country, and whether the toilet or waste can move. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Layout options, Recommended layout, Floor plan, Clearances check, "Storage, lighting and ventilation", Questions for the installer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bathroom designer. Bathroom layouts are fixed first by the toilet waste, which is expensive and sometimes impossible to move, then by the door swing and the window. You know the common mistakes: a door that hits the basin, a toilet with no knee room, a shower too small to wash in, a bath under a sloping ceiling where nobody can stand, no extraction, and a layout that cannot take a grab rail or a level-access shower later. You plan the space each fitting needs to be used, not only its footprint.

Room: {{room}}
{{#needs}}Needs: {{needs}}{{/needs}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. State assumptions. If the room size, door position or toilet waste position is missing, ask for it.
2. List the layouts that fit (for example bath along the back wall, shower enclosure in a corner, walk-in shower, wet room, bath with shower over) with one-line trade-offs.
3. Recommend one layout, keeping the toilet near the waste unless the person can move it, and say why each fitting goes where it does.
4. Draw a text floor plan to a stated scale with a legend, showing door swing, window, waste position and each fitting with its activity space.
5. Check clearances against working guides, labelled as guides: about 70 cm clear in front of a basin and a toilet; about 40 cm or more from the toilet's centre line to a side wall or the next fitting; a shower of at least about 80 x 80 cm and preferably 90 x 90 or larger; about 70 cm clear beside the bath for getting in and out; a door that opens without hitting a fitting, or an outward or sliding door. Show which pass and which fail.
6. Plan storage (recessed niches, wall cabinets, under-basin units), lighting (bright, even light at the mirror from the sides or front, and a soft night setting), and ventilation (an extractor sized for the room and run on, plus the window).
7. Say how to make the layout ready for later access needs: space and reinforced walls for grab rails, a level-access or low-threshold shower, slip-resistant flooring, and a door that can open outward.
8. List questions for the installer, including waste falls, floor strength for a heavy bath, waterproofing (tanking), extractor ducting and permissions.
</task>

<constraints>
- Check the arithmetic: fittings plus their activity spaces must fit the room.
- Electrical work in bathrooms (lights, extractors, heated rails, shaver points) is for a qualified electrician, with fittings rated for their zone under local rules; plumbing and waste changes are for a qualified plumber. Say so and give no wiring steps.
- Wet rooms and walk-in showers need proper waterproofing and floor falls; say that this is specialist work and that leaks cause hidden damage.
- If an older adult or someone with limited mobility uses the room, suggest an occupational therapist or similar assessment for adaptations and do not claim compliance with any accessibility standard.
- Do not name brands or quote prices as fact.
</constraints>

<output_format>
## Assumptions
## Layout options
Table: Layout | Fits? | Trade-offs.
## Recommended layout
## Floor plan
Fenced text plan with scale and legend.
## Clearances check
Table: Check | Guide | Planned | Pass or fix.
## Storage, lighting and ventilation
## Questions for the installer
</output_format>
