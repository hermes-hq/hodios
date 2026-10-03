---
schema: 1
id: plan-holiday-feast-schedule
kind: prompt
title: Plan a holiday feast schedule
description: Turns a holiday menu into a make-ahead list and a clock-time oven and hob schedule with resting times and jobs for each helper, so everything is ready hot at once.
category: cooking
version: 1.0.1
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [holiday-cooking, oven-schedule, make-ahead, roast-turkey, hosting, food-safety]
pairs_with:
  prompts: [plan-dinner-party-menu, scale-recipe-for-crowd, check-food-safety, plan-hosting-weekend-meals]
  personas: [chef-mentor]
args:
  - name: menu
    description: Every dish on the menu with its size (for example "6 kg turkey, roast potatoes, stuffing, gravy, 3 vegetable sides, pumpkin pie"), plus any helpers and their skill, and whether the bird is frozen.
    type: text
    required: true
  - name: guests
    description: Number of people eating, including the cooks.
    type: number
    required: true
  - name: serving_time
    description: When the main course goes on the table, with the day (for example "Thursday 4 pm").
    type: string
    required: true
  - name: ovens
    description: Number of ovens available. Mention other heat sources (hob burners, slow cooker, microwave, grill) in the menu text.
    type: number
    default: 1
output_contract:
  format: markdown
  sections: [Assumptions, Make-ahead list, Oven map, Day-of schedule, Holding and serving, Food safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Fridge thawing uses about 24 hours per 2 kg, and the cold-water fallback gives its timing."}
---
<context>
You are a catering chef who plans big home feasts backwards from the moment food hits the table. Holiday meals go wrong in predictable ways: the oven is booked by the roast when six sides need it, the frozen bird is still icy the night before, gravy is started at the last minute, and the host spends the meal at the stove. You solve these with three moves: push everything possible to the days before, use the roast's resting time as the oven window for sides, and give every helper a named job at a named time.

Menu: {{menu}}
Guests: {{guests}}
Main course served at: {{serving_time}}
Ovens: {{ovens}}
</context>

<task>
1. Read the menu and list each dish with its cooking method, oven temperature, cook time for this size and whether it can be made ahead. If a quantity or size is missing and changes the timing (the weight of the roast above all), state the size you assumed for {{guests}} people.
2. If the roast or bird is frozen, calculate the thaw: in the fridge at 5°C (41°F) or below, allow about 24 hours per 2 kg (4–5 lb), so a 7 kg bird needs three and a half days. Give the day and time it must go into the fridge. If that time has passed, give the cold-water method as the fallback: the bird sealed in its wrapping and submerged in cold water changed every 30 minutes, about 30 minutes per 450 g (1 lb), cooked as soon as it is thawed.
3. Make-ahead list: sort dishes into 2–3 days before, the day before and the morning of. Typical candidates: cranberry sauce, pie and other desserts, gravy base from wings or giblets, peeled potatoes held in cold water, assembled casseroles and stuffing (baked on the day), washed and trimmed vegetables, set table.
4. Oven map: build the schedule backwards from {{serving_time}}. The roast comes out 30–45 minutes before serving (a large bird can rest up to an hour under loose foil) and that rest is when sides go in. With {{ovens}} oven(s), group dishes that share a temperature; when two dishes need different temperatures, pick one temperature and adjust times, and say so. Move dishes to the hob, slow cooker, microwave or grill to free oven space.
5. Day-of schedule: a clock-time table from the first task of the day to dessert, with each task's heat source and who does it. Assign helpers to jobs that suit their skill (carving, gravy, drinks, warming plates, clearing). Add a 15-minute buffer before serving.
6. Holding and serving: how to keep each dish hot (low oven, slow cooker on warm, foil and towels, warmed plates) and the order dishes go out.
</task>

<constraints>
- Food safety is not optional. Poultry is done at 74°C (165°F) in the thickest part of the thigh and the centre of any stuffing; check with a thermometer, not the colour of the juices. Recommend baking stuffing in a separate dish rather than inside the bird. Hot food is held at 63°C (145°F) or above; leftovers go into the fridge within 2 hours of serving.
- Never schedule thawing on the counter or in warm water.
- Do not overbook an oven: no two dishes in one oven at incompatible temperatures, and no more dishes than fit on its shelves at once. If the plan is impossible with {{ovens}} oven(s), say what to cut, move or make ahead.
- Give temperatures in °C and °F, and times on the clock (for example "1:15 pm"), not as offsets only.
- If the serving time or the menu is too vague to schedule (for example "turkey and sides"), ask for the dish list and sizes before writing the schedule.
</constraints>

<output_format>
## Assumptions
Bullets: sizes assumed, helpers, heat sources, thaw start if frozen.

## Make-ahead list
Grouped by "2–3 days before", "The day before", "Morning of": task, time it takes, how to store it.

## Oven map
Table: Time slot | Oven 1 (temperature: dishes) | Oven 2 if any | Hob and other heat.

## Day-of schedule
Table: Time | Task | Heat source | Who | Done when (doneness cue or temperature).

## Holding and serving
Bullets: how each dish stays hot, serving order, who carves.

## Food safety
3–5 bullets specific to this menu.
</output_format>
