---
schema: 1
id: store-and-freeze-baked-goods
kind: prompt
title: Store and freeze baked goods
description: Says how to store, freeze, thaw and refresh your bread, cakes, cookies, pastry and doughs so they stay good, with keeping times, wrapping methods and which bakes need the fridge.
category: baking
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [home-cook]
requires: [none]
inputs: [text]
output: [table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [food-storage, freezing, make-ahead, staling, leftovers]
pairs_with:
  prompts: [plan-cookie-baking-day, plan-bake-sale, pack-baked-goods-for-shipping]
  personas: [baking-instructor]
args:
  - name: bakes
    description: What you have or plan to make ahead - for example "a sourdough loaf, a frosted carrot cake, shortbread, unbaked cookie dough, croissants" - and how far ahead.
    type: text
    required: true
  - name: conditions
    description: Kitchen temperature and humidity, freezer space, and whether anything must travel or sit out at an event. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Storage plan, Freezing, Thawing and refreshing, Fridge or not, Signs to throw it out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baker who plans production ahead. What home bakers get wrong: bread stales fastest in the fridge (starch retrogrades at fridge temperatures), so bread keeps at room temperature for a day or two and is frozen for longer, sliced first for convenience; unfrosted cake layers freeze very well wrapped tightly while still slightly cool; crisp and soft cookies stored together turn the crisp ones soft; most baked goods freeze for about one to three months in good condition if wrapped airtight with air pressed out; cookie dough and unbaked scones freeze well and bake from frozen with a little extra time; puff pastry, croissants and choux are best frozen unbaked or baked and refreshed in a hot oven; anything with cream, cream cheese, custard or fresh fruit fillings belongs in the fridge and keeps only a few days; and condensation is the enemy when thawing, so cakes thaw wrapped and crusty bread is refreshed in a hot oven.

Bakes: {{bakes}}
{{#conditions}}Conditions: {{conditions}}{{/conditions}}
</context>

<task>
1. Storage plan: for each bake they listed, room temperature, fridge or freezer, the container or wrap, and a keeping time range.
2. Freezing: how to wrap and label each item, whether to freeze baked or unbaked, frosted or not, and the freezing time range for good quality.
3. Thawing and refreshing: per item, how to thaw (wrapped at room temperature, overnight in the fridge for fillings) and how to refresh (a short hot oven for bread and pastry, a few seconds in the microwave for soft rolls, re-whipping buttercream).
4. Fridge or not: which items must be refrigerated for safety and how long they can sit out at an event, adjusted for a warm room.
5. Signs to throw it out: mould (discard the whole soft item; do not cut it away from bread or cake), sour or off smells in creamy fillings, and anything left out too long.
</task>

<constraints>
- Perishable fillings (cream, cream cheese, custard, fresh fruit with cream) stay refrigerated and out no longer than about two hours, less in heat.
- Keeping times are ranges for quality, not guarantees; when in doubt, throw it out.
- Do not suggest cutting mould off soft baked goods.
</constraints>

<output_format>
## Storage plan
Table: Bake | Where | How | Keeps for.
## Freezing
## Thawing and refreshing
## Fridge or not
## Signs to throw it out
</output_format>
