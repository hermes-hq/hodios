---
schema: 1
id: cook-rice-by-type
kind: prompt
title: Cook rice by type
description: Explains how to cook a specific rice or grain the way it is meant to turn out, with rinsing, soaking, water ratio, method for your pan or cooker, resting, and safe cooling of leftovers.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
invocation: both
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [rice, grains, water-ratio, leftovers, rice-cooker]
pairs_with:
  prompts: [learn-cuisine-basics, troubleshoot-recipe, check-food-safety]
  personas: [chef-mentor]
args:
  - name: rice
    description: The rice or grain (for example basmati, jasmine, sushi rice, arborio, brown rice, wild rice, quinoa) and how much.
    type: string
    required: true
  - name: dish
    description: What it is for and how you want it (fluffy separate grains, sticky, creamy), plus your equipment (pan with lid, rice cooker, pressure cooker, microwave) and what went wrong before. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this rice should be like, Rinse and soak, Ratio and method, Rest and finish, If it goes wrong, Leftovers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cook who knows that "rice" is a dozen different ingredients. Long-grain rices like basmati are meant to be separate and fluffy, so they are rinsed until the water runs clearer and often soaked; jasmine is slightly clingy and fragrant; short-grain sushi rice is rinsed thoroughly and should be sticky but distinct; risotto rice is never rinsed because its surface starch makes the creaminess, and is cooked by adding hot stock gradually; brown rice needs more water and much longer; wild rice is a grass seed that splits when done. Water ratios on the packet assume a certain pan and evaporation; the absorption method with a tight lid on very low heat followed by a rest off the heat is the most reliable, and the "knuckle" method works in a rice cooker or deep pot. Lifting the lid lets steam out; stirring long-grain rice makes it gluey. Cooked rice left warm for a long time can grow bacteria (Bacillus cereus) whose toxins reheating does not destroy, so leftovers need cooling quickly and refrigerating.

Rice: {{rice}}
{{#dish}}Dish and equipment: {{dish}}{{/dish}}
</context>

<task>
1. What this rice should be like: the texture to aim for and why this rice behaves that way.
2. Rinse and soak: whether to rinse, how, and whether and how long to soak, with the effect on water ratio.
3. Ratio and method: water or stock amount for their quantity by weight or volume, and steps for their equipment (heat levels, lid, timings).
4. Rest and finish: rest time off the heat, fluffing or folding, seasoning.
5. If it goes wrong: quick fixes for mushy, crunchy, burnt bottom or wet rice.
6. Leftovers: cool within about an hour, refrigerate, eat within about a day, and reheat once until piping hot; say to check local food safety guidance.
</task>

<constraints>
- Give quantities scaled to the amount they have, by weight where possible, with cups as a secondary option.
- Respect the dish: do not rinse risotto rice; do not stir pilaf-style rice.
- Do not invent a "traditional" method you are not sure of; say there are regional variations where relevant.
- Keep it short.
</constraints>

<output_format>
## What this rice should be like
## Rinse and soak
## Ratio and method
Numbered.
## Rest and finish
## If it goes wrong
## Leftovers
</output_format>
