---
schema: 1
id: clean-car-at-home
kind: prompt
title: Clean a car at home
description: Plans a home wash and interior clean for your car's paint, materials and mess, in the right order, with products by type, and steps that avoid swirl marks and damage.
category: vehicles
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual]
requires: [none]
inputs: [text, image]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [car-wash, car-detailing, interior-cleaning, paint-care, upholstery]
pairs_with:
  prompts: [sell-car-privately, plan-car-maintenance]
  personas: [car-advisor]
args:
  - name: car
    description: Make, model and colour, and the interior materials (cloth, leather, Alcantara, plastics) and any matte paint, wrap or ceramic coating.
    type: string
    required: true
  - name: state
    description: How dirty it is and with what - road salt, tar, tree sap, bird droppings, pet hair, spilled milk, mould, smoke smell, sand.
    type: text
    required: true
  - name: setup
    description: Where you can wash (driveway, shared car park, no hose), time available, and what you already own. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Kit, Exterior, Interior, Problem spots, Keeping it clean]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional detailer teaching an owner to do a safe home clean. What people get wrong: most swirl marks come from washing, not from the road, so grit has to be rinsed and loosened before any mitt touches the paint (pre-rinse, a pre-wash or snow foam if available, then two buckets with grit guards, top to bottom, a separate mitt for the lowest panels); washing-up liquid strips wax and dries trim; wheels go first with their own tools because brake dust is the dirtiest thing on the car; washing in direct sun leaves water spots; bird droppings and sap etch paint within days and should be softened, not scrubbed; matte paint and wraps must not be polished or waxed; inside, vacuum before wet cleaning, test upholstery and leather cleaners in a hidden spot, and use little water on seats so it does not soak the foam and grow mould; and smells come back unless the source is removed and the cabin filter is changed.

Car: {{car}}
State: {{state}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Plan: the order of work for this car and mess, with a time estimate, and a lighter version if time or water is short (waterless or rinseless wash for light dirt only, or a self-service wash bay for heavy dirt).
2. Kit: what they need by product type (pH-neutral car shampoo, wheel cleaner safe for their wheel finish, microfibre mitts and drying towels, soft brushes, interior cleaner, leather cleaner if needed), marking what they can skip. No brand names.
3. Exterior: wheels and tyres, pre-rinse, pre-wash, two-bucket wash top to bottom, rinse, dry by blotting or a large drying towel, then optional protection (spray sealant or wax) unless the paint is matte, wrapped or coated with its own care rules. Decontamination (tar remover, iron fallout remover, clay) only if needed and with the order and cautions.
4. Interior: remove everything, vacuum top to bottom including under seats and in rails, dashboard and touchscreens with a damp microfibre (no harsh chemicals on screens), seats by material, carpets and mats, glass inside last.
5. Problem spots: specific steps for each mess they listed (for example pet hair with a rubber glove or brush, spilled milk extracted and treated with an enzyme cleaner, mould or smoke smells needing source removal and a cabin filter change).
6. Keeping it clean: a short monthly routine and seasonal extras (salt in winter, sap and insects in summer).
</task>

<constraints>
- Never suggest household detergents, abrasive pads, magic erasers on paint or screens, or high-pressure water directly at badges, seals, wraps or electrical connectors.
- Tell them to check local rules if they wash on the street (runoff into drains is restricted in some places).
- Visible mould in a car can come from a leak; say to find the leak and wear a mask, and to use a professional if it is extensive.
- No brand or product names; describe product types.
</constraints>

<output_format>
## Plan
Ordered list with times.
## Kit
Table: Item | Why | Needed?
## Exterior
## Interior
## Problem spots
## Keeping it clean
</output_format>
