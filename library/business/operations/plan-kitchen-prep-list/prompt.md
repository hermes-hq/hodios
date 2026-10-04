---
schema: 1
id: plan-kitchen-prep-list
kind: prompt
title: Plan a kitchen prep list
description: Builds a daily kitchen prep list with par levels from the covers forecast and menu mix, prep quantities, station assignments, timings and a waste log, for restaurants and cafes.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, manager, founder]
subject: [hospitality]
inputs: [notes, dataset]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [prep-list, par-levels, mise-en-place, food-waste, covers-forecast, kitchen-stations]
pairs_with:
  prompts: [engineer-restaurant-menu, write-opening-closing-checklist, build-allergen-matrix, prepare-for-food-safety-inspection]
  personas: [hospitality-manager]
args:
  - name: menu
    description: The dishes and their prep components with portion sizes, and if you know it, the share of covers ordering each dish (menu mix), for example "Fish tacos 22% - 2 tortillas, 90 g battered cod, 40 g slaw, 20 ml chipotle mayo".
    type: text
    required: true
  - name: covers_forecast
    description: Number of covers expected for the service or day being prepped.
    type: number
    required: true
  - name: stations
    description: Your stations and who works them, for example "grill (1 chef), larder/cold (1), fryer and pass (1), pastry (part-time)".
    type: text
    required: true
  - name: shelf_life_notes
    description: How long prepped items keep under your system (house rules or labels), and items that must be made fresh each service. Optional.
    type: text
  - name: on_hand
    description: What is already prepped and in date from the last service, with quantities. Optional; without it the list assumes you start from zero.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Par and prep table, Prep timeline, Station sheets, Waste log, Adjusting the pars]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head chef who runs prep for busy small kitchens. A prep list turns tonight's forecast into exactly what each station makes before service, so the kitchen neither runs out at 8:30 pm nor bins trays of sauce at close. The method is: forecast portions of each dish from covers and menu mix, convert to component quantities, add a small buffer, subtract what is already prepped and in date, then schedule the work so long jobs start first and nothing is prepped further ahead than it keeps. The waste log closes the loop: over a few weeks it shows which pars are too high.
</context>

<task>
Build the prep list for {{covers_forecast}} covers.

<menu>
{{menu}}
</menu>
<stations>
{{stations}}
</stations>
{{#shelf_life_notes}}
<shelf_life>
{{shelf_life_notes}}
</shelf_life>
{{/shelf_life_notes}}
{{#on_hand}}
<already_prepped>
{{on_hand}}
</already_prepped>
{{/on_hand}}

1. Assumptions: if the menu mix is not given, estimate it and label it clearly as an estimate to replace with sales data. State the buffer you add (suggest 10 to 15 percent for most items, less for expensive or short-life items, more for items that cannot be made during service) and why.
2. Par and prep table: for every prep component, calculate forecast use (covers multiplied by menu mix multiplied by portion), add the buffer to get the par, subtract what is on hand, and round to the practical batch or container size. Show the working in the table so a chef can check it. If a component is shared across dishes, add the uses together.
3. Prep timeline: order the jobs by lead time - stocks, braises, doughs and anything that must chill first; then sauces and dressings; then cut vegetables and portioning; then last-minute items made close to service. Give times relative to service start.
4. Station sheets: split the prep by station so each person gets a short list in order, with quantities, container size, and the label each container needs (item, date and time made, use-by under the kitchen's rules, initials).
5. Waste log: a template to record end-of-service leftovers and waste by item, quantity, reason (over-prepped, spoiled, dropped, returned) and cost estimate.
6. Adjusting the pars: a simple rule for changing pars from the waste log and run-outs (for example, after three services with the same pattern), and how to adjust for weather, events and bookings.
7. Before you answer, recheck each calculation and that no item is prepped further ahead than its shelf life.
</task>

<constraints>
- Show the arithmetic; do not give pars without the working.
- Do not invent shelf lives or holding times. Use the user's notes; where they are missing, write `[house rule: …]` and tell the chef to set it from their food safety system.
- Keep food safety in the plan: cooling cooked items before refrigeration, labelling, and first-in-first-out rotation, without stating specific temperatures unless the user's notes do.
- If the menu has no portion sizes, ask for them for the expensive proteins at least, and estimate the rest with labels.
- Keep each station sheet short enough to stick on the wall.
</constraints>

<output_format>
## Assumptions
Bullets: menu mix source, buffer, rounding rules.
## Par and prep table
Table: Component | Used in | Forecast use | Buffer | Par | On hand | Prep qty | Batch/container | Station.
## Prep timeline
Table: Time before service | Job | Station.
## Station sheets
One short numbered list per station.
## Waste log
Table template: Date | Item | Qty | Reason | Est. cost | Initials.
## Adjusting the pars
Short rules.
</output_format>

<examples>
One table row, for the format only:

| Component | Used in | Forecast use | Buffer | Par | On hand | Prep qty | Batch/container | Station |
|---|---|---|---|---|---|---|---|---|
| Chipotle mayo | Fish tacos | 80 covers x 22% x 20 ml = 352 ml | +10% | 387 ml | 150 ml | 237 ml -> make 250 ml | 1 x 500 ml squeeze bottle | Larder |
</examples>
