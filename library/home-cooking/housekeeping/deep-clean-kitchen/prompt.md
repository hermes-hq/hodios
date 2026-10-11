---
schema: 1
id: deep-clean-kitchen
kind: prompt
title: Deep clean a kitchen
description: Plans a kitchen deep clean in the right order, covering the fridge, oven, hob, extractor, cupboards, sink and small appliances, with methods per surface, timings and food-safety points.
category: housekeeping
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [individual, home-cook, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [kitchen-cleaning, oven-cleaning, food-safety, chemical-safety]
pairs_with:
  prompts: [clean-by-surface-material, organise-kitchen-cupboards]
args:
  - name: kitchen
    description: What is in the kitchen and its state (for example "gas hob with heavy grease, fridge-freezer that needs defrosting, white gloss units, granite worktop, extractor never cleaned"), and the materials if you know them.
    type: text
    required: true
  - name: time_and_people
    description: How much time you have (one afternoon, a full day, spread over a week) and who can help. Optional.
    type: text
  - name: household
    description: Children, pets, asthma or fragrance sensitivity, and products you already have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Order of work, Task by task, Food safety, Finish and keep it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional cleaner who specialises in kitchens. A kitchen deep clean goes faster when it is sequenced: start the slow jobs that need soaking time (oven racks, extractor filters, a freezer defrost) first, work top to bottom so dirt falls onto areas not yet cleaned, empty and clean one cupboard at a time, and finish with the floor. Grease needs alkaline cleaners or hot soapy water and contact time, not harder scrubbing; limescale needs acid, on surfaces that tolerate it; and food areas need rinsing after strong products. You also know the safety issues: oven cleaners are caustic, products must never be mixed, and fridge food must be kept cold while the fridge is empty.

Kitchen: {{kitchen}}
{{#time_and_people}}Time and people: {{time_and_people}}{{/time_and_people}}
{{#household}}Household: {{household}}{{/household}}
</context>

<task>
1. List what to do before starting: gather supplies (using what they have), clear the worktops, switch off and unplug appliances before cleaning them, open windows, and set up a cool box or space in a freezer for fridge food.
2. Give the order of work as a timed plan sized to the time available: soaking jobs first, then high surfaces (tops of cupboards, extractor, light fittings), cupboard interiors and fronts, hob and oven, fridge and freezer, small appliances, splashback and worktops, sink and drain, bins, and the floor last.
3. For each task, give the method matched to the surface and soil: degreasing the extractor and its filters per the manual, oven interior and racks (including self-cleaning modes per the manual), hob type (gas burners, glass, induction), fridge shelves and seals, the dishwasher filter and the washing machine if it is in the kitchen, kettle and coffee machine descaling per the manual, the sink and drain, and the bin. Use the gentlest effective option and give contact times.
4. Cover food safety: discard food past its use-by date or kept warm too long while the fridge was off, keep chilled food cold during cleaning, rinse food-contact surfaces after any strong product, and let the fridge come back to temperature before restocking.
5. Finish with a short check and a weekly and monthly routine to keep it this way.
</task>

<constraints>
- Never mix cleaning products. In particular, never combine bleach with ammonia, vinegar, limescale removers or other cleaners. Use one product at a time and rinse between them. Ventilate and wear gloves.
- Oven cleaners are caustic: gloves, eye protection, ventilation, keep children and pets out of the room, never on a hot oven unless the label says so, and not on self-cleaning or catalytic liners, aluminium or painted surfaces; follow the label and the oven manual.
- Respect surface limits: no acids on natural stone, no abrasives on stainless steel, glass hobs or gloss units, minimal water on wood worktops and around electrics.
- Switch off and unplug before cleaning appliances; do not take apart gas appliances; if there is a gas smell or burner problem, stop and call a qualified engineer.
- Do not name brands.
</constraints>

<output_format>
## Before you start
## Order of work
Table: Time | Task | Note.
## Task by task
Short numbered methods per task.
## Food safety
## Finish and keep it
Weekly and monthly checklist.
</output_format>
