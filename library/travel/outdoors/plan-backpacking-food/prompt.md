---
schema: 1
id: plan-backpacking-food
kind: prompt
title: Plan backpacking food
description: Plans food for a multi-day backpacking or trekking trip by energy need and carried weight, with a day-by-day menu, fuel estimate, resupply points and wildlife-safe storage.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [trail-food, calorie-density, pack-weight, stove-fuel, resupply, bear-safety]
pairs_with:
  prompts: [plan-trail-water, plan-camping-trip, prepare-for-long-hike]
args:
  - name: trip
    description: Number of days and nights, resupply options, daily distance and ascent, expected temperatures, who is eating (size, appetite), your stove or no-cook plan, and any wildlife storage rules you know of.
    type: text
    required: true
  - name: diet
    description: Dietary needs, allergies, foods you hate, and anything that upsets your stomach when tired. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Daily target, Menu, Weight and packing, Fuel and cooking, Storage and hygiene, Shopping list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan trail food the way long-distance hikers do. The trade-off is energy per gram: oils, nuts and nut butters give roughly 6 to 9 kcal per gram, chocolate and hard cheese about 4 to 5.5, and dried fruit, instant mash and couscous about 3 to 3.5, while fresh food is mostly water. Most hikers carry roughly 0.7 to 1 kg of dry food per person per day, aiming for an average density of about 4 kcal per gram or more. Energy use on a hard hiking day can be 3,000 to 5,000 kcal or more depending on body size, load, terrain and cold, and appetite often drops at altitude or in heat, so food people actually want to eat beats theoretical perfection. Salt matters in heat. The usual failures are carrying too much on day one, not eating enough on days three to five, a stove plan that runs out of fuel in the cold, and food storage that attracts animals.

<trip>
{{trip}}
</trip>
{{#diet}}
<diet>
{{diet}}
</diet>
{{/diet}}
</context>

<task>
1. State assumptions: energy target per person per day as a range based on what they told you, cold or heat, altitude, and the cooking setup. Ask about anything that changes the plan a lot (resupply, cook or no-cook) if it is missing.
2. Set the daily target: energy range, food weight per day and the density that implies, plus a note that the first day and the day after a resupply can be lighter.
3. Write a day-by-day menu: breakfast, a grazing bag for the walking day eaten every hour or so, dinner, and a drink or dessert. Use simple supermarket foods, vary flavours, and include salty options. Respect the diet input exactly.
4. Weight and packing: total food weight by stage between resupplies, how to repackage to cut bulk, labelled daily bags, and one spare day of food for delays.
5. Fuel and cooking: an estimate of fuel need as a rough range for the stove type with what pushes it up (cold, wind, melting snow), a windshield note, and a no-cook fallback.
6. Storage and hygiene: storage required or advised for the area (canister, hang, locker, or none), cooking away from the tent, packing out all rubbish, and hand hygiene to avoid stomach upsets.
7. Give a shopping list grouped by shop section with quantities.
</task>

<constraints>
- Present energy numbers as estimates with ranges; do not prescribe diets or give medical nutrition advice. If they mention diabetes, an eating disorder or another medical condition affecting food, suggest checking the plan with their clinician.
- Treat allergies as absolute; never include an allergen "just in trail mix".
- Wildlife storage rules vary by park and country; tell them to check the land manager and do not state rules as fact.
- Never suggest cooking inside a closed tent.
- No brands.
</constraints>

<output_format>
## Assumptions
## Daily target
## Menu
Table: Day | Breakfast | On the move | Dinner | Extras | Approx kcal.
## Weight and packing
## Fuel and cooking
## Storage and hygiene
## Shopping list
</output_format>
