---
schema: 1
id: plan-snow-day-activities
kind: prompt
title: Plan snow day activities
description: Plans a snow day for children with outdoor snow games and builds, warm-up breaks, indoor follow-ups and the cold-weather safety checks for frostbite, ice, sledging and traffic.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [snow-play, sledging, winter-activities, cold-weather-safety, outdoor-play, school-closure]
pairs_with:
  prompts: [plan-rainy-day-activities, build-den-with-kids, design-kids-science-experiment]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: conditions
    description: How much snow, the temperature and wind, where you can play (garden, park, a hill) and how long you have.
    type: text
    required: true
  - name: kit
    description: What winter kit the children have (waterproof gloves, boots, sledge) and anything missing.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Dressing for the snow, Outdoor games and builds, Day plan, Indoor follow-ups, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan snow days. The magic lasts longest when children go out in short bursts with warm-up breaks, wear layers with waterproof outer gloves and dry spares, and have more to do than one snowman: snow painting with coloured water, building a fort, tracking animal prints, measuring snowflakes, an ice lantern. Most snow-day injuries come from sledging into obstacles or roads, thin ice on ponds, and cold hands and feet in wet clothes. Young children chill faster than adults and may not say so.

<ages>
{{ages}}
</ages>

<conditions>
{{conditions}}
</conditions>

{{#kit}}Kit: {{kit}}{{/kit}}
</context>

<task>
1. If ages or conditions are missing, ask.
2. Dressing for the snow: base layer, warm mid layer, waterproof outer layer, hat, waterproof gloves with spares, warm socks and boots, and what to do if they lack waterproof gloves (plastic bags under gloves as a stopgap).
3. Outdoor games and builds: eight to ten activities matched to the snow amount and ages (snow sculptures, fort, snow painting, target throwing at a wall not people's faces, animal tracks, snow science), with time for each.
4. Day plan: bursts outdoors (shorter for younger children and colder weather) alternating with warm-up breaks, a warm lunch, and a calm afternoon.
5. Indoor follow-ups: snow melt experiment, paper snowflakes, ice science, hot chocolate and a story.
6. Safety: never go on frozen ponds, lakes or rivers; sledge only on slopes with a clear run-out away from roads, trees and water, feet first, one at a time; snowballs not at faces or with ice inside; signs of early frostbite (pale, numb or hard skin) and hypothermia (shivering, clumsy, unusually quiet) and what to do (get inside, remove wet clothing, warm gradually with body heat or lukewarm water, never rub the skin or use direct heat, and seek medical help if skin stays numb, hard or blistered or a child shows hypothermia signs).
</task>

<constraints>
- Never suggest playing on frozen water.
- No sledging near roads, trees, fences or water.
- Adapt bursts to the youngest child and the temperature.
</constraints>

<output_format>
## Dressing for the snow
Checklist.
## Outdoor games and builds
Table: Activity | How | Ages | Time.
## Day plan
## Indoor follow-ups
## Safety
</output_format>
