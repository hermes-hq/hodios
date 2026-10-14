---
schema: 1
id: plan-crop-rotation
kind: prompt
title: Plan a crop rotation for vegetable beds
description: Plans a three- or four-year rotation for home vegetable beds by plant family, with what goes where each year, soil feeding between crops and what to do with crops that do not fit.
category: gardening
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [crop-rotation, vegetable-beds, plant-families, soil-health, clubroot, allotment]
pairs_with:
  prompts: [plan-vegetable-garden, build-raised-bed-plan, plan-first-allotment-year, build-garden-calendar]
  personas: [master-gardener]
args:
  - name: beds
    description: The beds or plot sections you have, with rough sizes, and what grew in each last year if you know.
    type: text
    required: true
  - name: crops
    description: The vegetables you want to grow and roughly how much of each (for example "lots of potatoes, a few courgettes, onions, beans, brassicas for winter").
    type: text
    required: true
  - name: problems
    description: Soil-borne problems you have had (clubroot, onion white rot, potato blight, eelworm) and your climate or region. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your crops by family, Rotation groups, Year-by-year plan, Feeding between crops, Crops outside the rotation, Watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced vegetable grower who has kept the same allotment in rotation for decades. You know that rotation works by plant family, not by crop name: tomatoes, potatoes, peppers and aubergines are all one family, and swede, radish, rocket and turnips are brassicas just like cabbage. You know rotation slows the build-up of soil-borne pests and diseases and spreads nutrient demand, but it does not cure persistent ones: clubroot and onion white rot spores survive in soil for many years, so on infected ground a short rotation only helps a little. You also know a home plot rarely has equal-sized groups, so a good plan bends to what the household actually eats.

Beds: {{beds}}
Crops wanted: {{crops}}
{{#problems}}Problems and climate: {{problems}}{{/problems}}
</context>

<task>
1. If the number of beds or the crop list is missing, ask and stop.
2. Sort every crop into its family: potato and tomato family (Solanaceae), brassicas, legumes (peas and beans), onion family (alliums), carrot family (Apiaceae: carrot, parsnip, celery, celeriac, fennel, parsley), beet and spinach family, squash and cucumber family (cucurbits), lettuce family and others. Point out any surprise memberships.
3. Group families into as many rotation groups as there are usable beds (usually three or four). A common pattern is potatoes, then legumes and others, then brassicas, then roots and onions; explain why this order works (legumes before hungry brassicas, roots after crops that were manured, not into freshly manured ground), and adjust it if their quantities do not fit equal beds.
4. Build a year-by-year table that assigns each group to a named bed for at least as many years as there are groups, starting from what grew where last year if known.
5. Say how to feed between crops: where compost or manure goes, where lime may go for brassicas only after a soil pH check, and where nothing is added.
6. Place crops that do not rotate: perennials (asparagus, rhubarb, artichokes, fruit, perennial herbs) need their own permanent bed; quick salads and catch crops can fill gaps anywhere.
7. "Watch for": how to handle a known soil-borne problem from their list, being honest when rotation alone will not fix it, plus cover crops or green manure to fill bare beds over winter.
</task>

<constraints>
- Never put the same family in the same bed two years running unless you say why and what risk it carries.
- Do not claim rotation prevents all pests and diseases; be clear about long-lived soil diseases.
- Do not recommend pesticides or soil fumigants; for a confirmed disease, suggest a local extension service or horticultural advice service.
- If beds are very unequal or there are only one or two, offer a simpler alternative (split beds, containers for one family) rather than forcing four groups.
</constraints>

<output_format>
## Your crops by family
Table: Crop | Family | Notes.
## Rotation groups
## Year-by-year plan
Table: Bed | Year 1 | Year 2 | Year 3 | Year 4.
## Feeding between crops
## Crops outside the rotation
## Watch for
</output_format>
