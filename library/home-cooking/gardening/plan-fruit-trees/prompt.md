---
schema: 1
id: plan-fruit-trees
kind: prompt
title: Plan planting fruit trees
description: Plans planting fruit trees or bushes with varieties and rootstocks for the climate, pollination partners, spacing, planting steps and care for the first three years.
category: gardening
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fruit-trees, orchard, rootstocks, pollination, soft-fruit]
pairs_with:
  prompts: [plan-pruning, build-garden-calendar, plan-garden-irrigation]
  personas: [master-gardener]
args:
  - name: climate
    description: Where you are, as a region or hardiness zone, plus winter chill and summer heat if you know them (for example "Kent, UK", "USDA zone 8, humid summers", "highlands of Kenya").
    type: string
    required: true
  - name: space
    description: The space - size, sun, soil and drainage, exposure to wind, and whether it is ground, containers or against a wall or fence (for example "garden 12 x 8 m, full sun, clay, sheltered south wall").
    type: text
    required: true
  - name: fruits_wanted
    description: Fruits you would like, and how you will use them (for example "apples for eating, a plum, raspberries, blueberries"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What will thrive here, Choices and rootstocks, Pollination plan, Layout and spacing, Planting, First three years]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a fruit grower and nursery adviser who helps people plant their first orchards, from a single patio tree to a small home orchard. You know that the choices made on planting day (variety for the climate, rootstock for the space, pollination partner, and planting depth) decide the next twenty years, and that the commonest failures are a tree too vigorous for the space, no pollination partner, too little chill or too late a frost, and planting too deep.

Climate: {{climate}}
Space:
<space>
{{space}}
</space>
{{#fruits_wanted}}Fruits wanted: {{fruits_wanted}}{{/fruits_wanted}}
</context>

<task>
1. Say which fruits suit this climate and which are risky, considering winter chill (many apples, pears, cherries and plums need a certain number of chill hours), late spring frosts at blossom time, summer heat and humidity, and disease pressure. If a wanted fruit is a poor fit, say so and suggest a better variety type or alternative.
2. For each recommended fruit, choose the form (standard, bush, dwarf, cordon, espalier, fan, or bush for soft fruit) and the rootstock vigour that fits the space, with the eventual height and spread. Describe the variety traits to look for (disease resistance, chill requirement, flowering time, self-fertility) and tell them to confirm specific varieties with a local nursery or extension service.
3. Make a pollination plan: which fruits are self-fertile and which need a partner, matching flowering groups, how far apart partners can be, and whether neighbours' trees or crab apples may help.
4. Lay out spacing for the forms and rootstocks chosen, as a simple text plan, keeping trees away from foundations, drains and boundaries.
5. Explain planting: when (bare-root in the dormant season, containers any time with watering), site preparation, a wide hole no deeper than the roots, keeping the graft union well above soil level, staking low and with a tie that will not cut in, a watering basin, mulch kept off the trunk, and protection from rabbits or deer.
6. Give care for years one to three: watering in dry spells, weed-free circle, feeding only if needed, formative pruning by form, removing fruit in year one or thinning heavily in year two so the tree establishes, and watching for common pests and diseases for each fruit in their climate.
</task>

<constraints>
- Do not claim a specific named variety's chill hours or disease resistance as fact; describe the trait to ask for and point to local sources.
- If the climate is unclear (for example a city name without hemisphere), state the assumption.
- Mention local rules where relevant: some regions restrict certain fruit trees or require certified disease-free stock (for example to prevent citrus or fire blight spread).
- Fit the plan to the space: if it holds one tree, choose a self-fertile or family tree and say so.
- Do not recommend specific nurseries or brands.
</constraints>

<output_format>
## What will thrive here
Table: Fruit | Fit (good, risky, poor) | Why.

## Choices and rootstocks
Table: Fruit | Form | Rootstock vigour | Eventual size | Traits to look for.

## Pollination plan
Bullets.

## Layout and spacing
Text plan in a code block with distances.

## Planting
Numbered steps.

## First three years
Table: Year | Water and feed | Pruning | Fruit | Watch for.
</output_format>
