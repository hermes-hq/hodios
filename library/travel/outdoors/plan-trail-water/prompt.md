---
schema: 1
id: plan-trail-water
kind: prompt
title: Plan water on the trail
description: Plans water for a hike or backpacking route with carry amounts between sources, how reliable each source is likely to be, treatment methods and the signs of dehydration to watch for.
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
reasoning: recommended
level: intermediate
tags: [water-planning, water-treatment, dry-camp, dehydration, desert-hiking, pack-weight]
pairs_with:
  prompts: [plan-backpacking-food, plan-hot-weather-hike, set-turnaround-time]
args:
  - name: route
    description: The route in legs with distances and expected hours, the water sources marked on the map or reported recently (streams, springs, taps, tanks) and when the information is from, the season and expected temperatures, and where you will camp.
    type: text
    required: true
  - name: setup
    description: How many people, bottle and bladder capacity, treatment you own (filter, chemical, UV, boiling), and whether you cook with water. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Water by leg, Source reliability, Treatment, Camp and cooking water, Warning signs, Plan B]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan water like someone who has hiked dry country. Need varies hugely: roughly half a litre per hour of walking is a common starting point in mild weather, rising to a litre or more per hour in heat, on steep climbs or for larger people, plus water for cooking and a dry camp. A litre weighs a kilogram, so carrying for the worst gap without carrying everything all day is the skill. Sources marked on maps are not promises: seasonal streams dry up, springs fail late in summer, and taps get turned off. Experienced hikers rank each source by how recent and trustworthy the report is and plan the carry as if the least reliable ones are dry. Treatment choice matters: filters remove protozoa and bacteria but most do not stop viruses; chlorine dioxide is slow against Cryptosporidium and chlorine or iodine tablets barely touch it; boiling works against pathogens but not chemicals; silty water clogs filters. The usual trail methods do not reliably remove chemical pollution such as agricultural or mine run-off, so avoid sources below farms, mines and roads where you can.

<route>
{{route}}
</route>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}
</context>

<task>
1. State assumptions: temperature, per-hour need for this group and conditions as a range, cooking and camp needs, and that recent source reports must be checked locally.
2. Build the water-by-leg plan: for each gap between sources, hours of walking, litres to carry per person at the low and high estimate, and what that means for capacity. Flag any gap that exceeds their capacity.
3. Rate each source: likely reliable, check before relying, or assume dry, with the reason (season, type, age of report). Recompute the worst gap assuming the uncertain ones are dry.
4. Treatment: what their method does and does not cover, how to handle cloudy or silty water (settle, pre-filter), cold-weather issues (filters can crack when frozen), and a backup method. Tell them to follow the product's instructions for timing and dose.
5. Camp and cooking water: total for dinner, breakfast, drinking overnight and washing for a dry camp.
6. Warning signs of dehydration and heat illness to watch in the group, and of hyponatraemia from drinking a lot of plain water over long hot days without salt, with a simple drink-to-thirst plus salty snacks approach.
7. Plan B: the point of no return if a source is dry, the nearest reliable water or exit, and the rule for turning back.
</task>

<constraints>
- Never state that a named source will be flowing; you cannot know current conditions.
- Do not recommend drinking untreated water, even from clear mountain streams.
- Numbers are planning ranges, not medical guidance.
- If the route has a long dry stretch in heat with no reliable water and they lack the capacity, say plainly that the plan is unsafe as it stands.
</constraints>

<output_format>
## Assumptions
## Water by leg
Table: Leg | Hours | Litres per person (low to high) | Fits capacity?
## Source reliability
Table: Source | Rating | Why.
## Treatment
## Camp and cooking water
## Warning signs
## Plan B
</output_format>
