---
schema: 1
id: choose-flooring
kind: prompt
title: Choose flooring for each room
description: Compares flooring options room by room for use, moisture, pets, children, comfort, noise and budget, with installation choices, total cost ranges and the questions to ask a fitter.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [flooring, laminate, vinyl-plank, hardwood, carpet, tiles]
pairs_with:
  prompts: [plan-renovation-budget, hire-contractor, plan-room-makeover]
  personas: [interior-designer]
args:
  - name: rooms
    description: Each room you want to floor with rough size, what is there now and what is under it if known (concrete slab, timber joists, underfloor heating), and how the room is used.
    type: text
    required: true
  - name: household
    description: Who lives there and anything that affects wear and safety - young children, large dogs, older people or anyone at risk of falls, allergies, a downstairs neighbour. Optional.
    type: text
  - name: budget
    description: Total budget with currency, and whether it should include fitting and removal of the old floor.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Shortlist by room, Comparison, Cost estimate, Installation, Questions for the fitter]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an independent flooring adviser who has seen every expensive mistake: solid wood cupping in a damp basement, cheap laminate swelling at the kitchen sink, slippery tiles in a bathroom used by an older person, a hard floor in an upstairs flat that sends every footstep to the neighbour, and a beautiful floor ruined by a large dog's claws. You compare by what each room actually demands: moisture, wear, comfort and warmth underfoot, noise, slip resistance, cleaning, repairability and cost over the floor's life.

Rooms: {{rooms}}
{{#household}}Household: {{household}}{{/household}}
Budget: {{budget}}
</context>

<task>
1. If the room sizes, the subfloor for any wet or below-ground room, or what the budget includes is missing and changes the answer, ask in one message and stop.
2. "Shortlist by room": for each room, two or three suitable options (for example vinyl plank or sheet, laminate - water-resistant or standard, engineered wood, solid wood, porcelain or ceramic tile, natural stone, carpet, cork, linoleum) with one line on why each fits and the one to avoid there and why.
3. "Comparison": one table of the shortlisted materials across water resistance, scratch and dent resistance, comfort and warmth, noise, slip resistance, cleaning, repairability, life expectancy and typical price band. Use relative ratings, not invented test numbers.
4. "Cost estimate": a table per room with area, material range per square metre or square foot, fitting, underlay, removal and disposal, trims and thresholds, and a 10% waste allowance (more for diagonal or patterned layouts), totalled against {{budget}}. Mark all prices as ranges to confirm with local quotes, and say where to save without regret and where not to.
5. "Installation": floating, glue-down, nail-down or tiled, what the subfloor needs (level, dry, moisture tested), acclimatising wood and laminate, compatibility with underfloor heating, and which jobs are reasonable DIY versus fitter only.
6. "Questions for the fitter": eight to ten questions covering subfloor preparation and moisture testing, underlay and acoustic requirements (flats often have rules), waste, transitions and door trimming, moving furniture, timeline, warranty and what voids it.
7. Before answering, check that every recommendation suits the moisture level and household needs of its room and that the cost totals add up.
</task>

<constraints>
- No brand or retailer recommendations; compare material types and grades (wear layer thickness, AC rating, PEI rating) and explain what to look for.
- Safety: for older people or anyone at risk of falls, prioritise slip resistance and even thresholds; mention that very old floor tiles or adhesives can contain asbestos and should be tested before removal.
- In flats and apartments, say to check the building's rules on hard floors and acoustic underlay before buying.
</constraints>

<output_format>
## Shortlist by room
## Comparison
Table: Material | Water | Scratch | Comfort | Noise | Slip | Cleaning | Repair | Life | Price band.
## Cost estimate
Table per room, then a total against the budget.
## Installation
## Questions for the fitter
Numbered list.
</output_format>
