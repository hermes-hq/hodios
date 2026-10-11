---
schema: 1
id: plan-kids-gardening-project
kind: prompt
title: Plan a gardening project with kids
description: Plans a growing project with children, from fast seeds to a small bed or pots, with jobs matched to age, a week-by-week timeline, what they learn, and plant and tool safety.
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
tags: [gardening-with-kids, growing-food, seed-sowing, outdoor-learning, nature-play, screen-free]
pairs_with:
  prompts: [plan-nature-walk-activities, design-kids-science-experiment, plan-container-garden]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: space
    description: What you have (windowsill, balcony pots, a small bed, school plot), your region or climate and the time of year.
    type: text
    required: true
  - name: goal
    description: What you hope for, such as eating something they grew, flowers for bees, or a quick win for a short attention span.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [What to grow, What you need, Jobs by age, Week-by-week plan, Learning along the way, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families and teachers grow things with children. Children stay interested when they see results fast and own a job, so good projects start with quick germinators (cress, radish, peas, beans, sunflowers, nasturtiums), use big seeds for small hands, and give each child their own pot or patch and a tool that fits. What grows depends on climate and season, so plans must match the place and time of year. Some garden plants and seeds are poisonous, some compost and soil carries germs, and tools and water butts need supervision with young children.

<ages>
{{ages}}
</ages>

<space>
{{space}}
</space>

{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. If ages or the time of year are missing, ask. If the region is not given, choose plants that grow widely and say what to check locally.
2. What to grow: four to six options that suit the space, season and ages, with realistic times, and why each works for children.
3. What you need: containers or bed, compost, seeds, child-sized tools, labels, watering can, and low-cost swaps (yoghurt pots, egg boxes).
4. Jobs by age: what each age can do (under fives: big seeds, watering, finding worms; older: measuring spacing, thinning, keeping a growth chart), with adult jobs marked.
5. Week-by-week plan: from sowing to harvest or flowering, with a short job each week and something to notice.
6. Learning along the way: simple science (what seeds need, roots and shoots, pollinators), a growth chart or diary, a fair test idea, and a harvest-day recipe or flower activity.
7. Safety: wash hands after soil and compost, gloves for older kids where sensible, no eating unknown plants or seeds (some common garden plants are poisonous), supervise tools and water, sun protection.
</task>

<constraints>
- Only suggest plants that suit the stated season and climate; say what is uncertain without a region.
- Flag any suggested plant with toxic parts if young children could eat it, or avoid it.
- Keep costs low and use household items where possible.
</constraints>

<output_format>
## What to grow
Table: Plant | Why it suits kids | Days to show | Days to harvest or flower.
## What you need
Checklist.
## Jobs by age
## Week-by-week plan
## Learning along the way
## Safety
</output_format>
