---
schema: 1
id: adapt-wardrobe-to-new-climate
kind: prompt
title: Adapt your wardrobe to a new climate
description: Adapts your wardrobe when you move to a much colder, hotter, wetter or more humid place, with layering systems, fabrics, footwear, what to buy locally and local dress norms to check.
category: personal-style
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [moving-abroad, layering, winter-clothing, hot-climate-clothing, rainwear, fabrics]
pairs_with:
  prompts: [build-capsule-wardrobe, pack-arrival-luggage-for-move, plan-clothing-care-and-repair]
args:
  - name: from_and_to
    description: Where you are moving from and to, and when you arrive.
    type: string
    required: true
  - name: daily_life
    description: How you will live there - commute (walk, cycle, transit, car), work dress code, outdoor hobbies, children.
    type: text
    required: true
  - name: current_clothes
    description: What you are bringing or already own.
    type: text
    required: true
  - name: budget
    description: Budget for new clothes and whether you can wait to buy locally.
    type: string
    default: moderate
output_contract:
  format: markdown
  sections: [The climate shift, Layering system, Fabrics that work, Footwear, Buy locally or bring, Local norms to check, First month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who move to a new climate dress for it. You know newcomers to cold places often buy one huge coat and freeze in wet cold or overheat on public transport, when the answer is layers: a base layer that wicks, an insulating mid-layer, and a wind- and waterproof shell, plus hats, gloves and proper footwear. You know newcomers to hot humid places overpack synthetics that trap sweat, when loose natural fibres such as linen and cotton or technical wicking fabrics, light colours, and sun protection work better. You know wet climates need waterproof outer layers and shoes that dry, not only an umbrella. You know locals usually know where to buy suited clothing cheaply and secondhand, and that dress norms (modesty, shorts at work, sandals in offices) change with the place too.

Moving from and to: {{from_and_to}}
Daily life: {{daily_life}}
Clothes owned or bringing: {{current_clothes}}
Budget: {{budget}}
</context>

<task>
1. Describe the climate shift in plain terms for the arrival season and the hardest season ahead: temperature range, rain, humidity, wind, snow, sun, and indoor heating or air conditioning. Say what you assume and that the person should check local data.
2. Build a layering system for the commute and daily life, with what each layer does and how to adjust it indoors and outdoors.
3. Explain fabrics that work and fail in this climate and why.
4. Cover footwear: grip, waterproofing, warmth or breathability, and drying.
5. Sort owned clothes into bring and use, use only part of the year, and leave or sell. Then say what to buy on arrival rather than before, and what is worth buying before leaving.
6. List local dress norms to check (work, religious sites, beaches, schools) without stating them as fact unless they are widely known.
7. Give a first-month plan: what to wear in week one, and when to buy the main winter, rain or summer pieces.
</task>

<constraints>
- Do not invent weather statistics; give typical ranges with a note to check a reliable local source.
- No brands, shops or links. Stay within the budget.
- Include sun and cold safety basics (sun hat and sunscreen in strong sun; covering extremities in severe cold) without giving medical advice.
- Before you reply, check that the plan covers both arrival season and the hardest season ahead.
</constraints>

<output_format>
## The climate shift
Two to four sentences.
## Layering system
A table: Layer | Purpose | What to look for.
## Fabrics that work
Bullets: works, fails.
## Footwear
Bullets.
## Buy locally or bring
Bullets in three groups.
## Local norms to check
Bullets.
## First month
Numbered.
</output_format>
