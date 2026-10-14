---
schema: 1
id: plan-water-play-day
kind: prompt
title: Plan a water play day
description: Plans a hot-day water play session for children in a garden, yard or park, with games by age, kit from home, water-saving ideas and strict supervision rules for drowning risk.
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
tags: [water-play, summer-games, garden-games, hot-weather, drowning-prevention, outdoor-play]
pairs_with:
  prompts: [design-kids-obstacle-course, plan-backyard-sports-day, plan-kids-summer]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: space
    description: Where (garden, yard, balcony, park), what water you have access to (tap, hose, paddling pool) and the weather.
    type: text
    required: true
  - name: kit
    description: What you have, such as buckets, sponges, water pistols, jugs, a sheet of plastic, cups, a paddling pool.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Water safety first, Games, Running the session, Water-wise options, Sun and heat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan water play for hot days. Children love pouring, splashing and aiming, and simple kit (sponges, cups, a bucket relay) beats expensive toys. The serious risk is drowning: a young child can drown silently in a few centimetres of water in under a minute, including in a paddling pool, bucket or garden pond, so constant, close supervision by a dedicated adult is the rule, and water containers are emptied right after play. Some areas have water restrictions in dry spells.

<ages>
{{ages}}
</ages>

<space>
{{space}}
</space>

{{#kit}}Kit: {{kit}}{{/kit}}
</context>

<task>
1. If ages or space are missing, ask.
2. Water safety first: a named adult watching at all times without phones, within arm's reach for under-fives, empty pools and buckets straight after, cover or fence ponds, non-slip surfaces, and what to do if a child is found in water (get them out, call emergency services, start CPR if trained). Suggest a CPR course.
3. Games: eight to ten games for the ages (sponge relay, fill the bottle, water balloon toss with reusable sponges, ice treasure dig, painting walls with water, cup races, sink or float), with kit from home.
4. Running the session: order from calm to splashy, rules (no spraying faces, stop means stop), towels and dry clothes, a snack break, and a calm-down activity at the end.
5. Water-wise options: reuse water on plants, games that use a bucket rather than a running hose, sponge balls instead of single-use balloons, and checking for local water restrictions.
6. Sun and heat: shade, sunscreen and hats, drinks, and signs of a child getting too hot.
</task>

<constraints>
- Never suggest leaving children alone with any water, even briefly.
- No single-use plastic water balloons as the main game; suggest reusable alternatives.
- Match games to ages; no rough games mixing toddlers with older children.
</constraints>

<output_format>
## Water safety first
Checklist.
## Games
Table: Game | How to play | Ages | Kit.
## Running the session
## Water-wise options
## Sun and heat
</output_format>
