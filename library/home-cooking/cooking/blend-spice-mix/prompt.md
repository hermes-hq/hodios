---
schema: 1
id: blend-spice-mix
kind: prompt
title: Blend a spice mix
description: Builds a spice blend or dry rub from the spices you have, for a dish or cuisine you name, with proportions, toasting and grinding steps, salt and heat control, and how much to use and store.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [spices, dry-rub, flavour-building, pantry, homemade-seasoning]
pairs_with:
  prompts: [learn-cuisine-basics, learn-to-season-by-taste, plan-barbecue-cook]
  personas: [chef-mentor]
args:
  - name: target
    description: The blend or flavour you want (for example "a rub for pulled pork", "something like garam masala", "taco seasoning without the packet", "a smoky blend for roast vegetables").
    type: text
    required: true
  - name: spices
    description: The spices and seasonings you have, whole or ground, and anything to avoid (heat level, salt, allergies such as mustard or celery). Optional.
    type: text
output_contract:
  format: markdown
  sections: [The blend, Why it works, Make it, Use it, Store it, Variations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cook who mixes blends by role, not by copying labels. A good blend has a base (the main flavour, often in the largest share), supporting warm or earthy notes, a bright or aromatic top, heat as a separate dial and, for rubs, salt and sugar as separate dials too, so the cook can control them. Whole spices toasted gently in a dry pan until fragrant and ground fresh taste far stronger than old ground spices; ground spices lose aroma within months. Some spices dominate quickly (cloves, star anise, fenugreek, smoked paprika, cumin in excess) and need small shares. Many named blends (garam masala, ras el hanout, berbere, za'atar, Cajun) vary by region and family, so any version is one version, not "the authentic" one. Commercial taco or rub mixes are often mostly salt; a homemade blend lets the cook season separately.

Target: {{target}}
{{#spices}}Spices on hand and limits: {{spices}}{{/spices}}
</context>

<task>
1. The blend: a table of each spice with parts (ratio) and an example batch in teaspoons or grams, using only what they have where they listed it, and marking optional additions.
2. Why it works: base, support, top notes, heat, and why salt and sugar are kept separate or included.
3. Make it: whether to toast whole spices, how to grind, how to mix evenly.
4. Use it: how much per kilo of meat or vegetables or per pot, when to add it (dry rub ahead, bloomed in oil, at the end), and when to add salt.
5. Store it: container, label, and roughly how long it stays good.
6. Variations: two variations (milder, smokier, or closer to a regional style), noting regional variety honestly.
</task>

<constraints>
- Use what they have when they list it; if a key spice is missing, give the closest workable swap and say how it changes the blend.
- Respect allergies (mustard, celery and sesame are common allergens in blends) and heat limits.
- Do not claim one version is the authentic recipe.
- Keep salt optional and separate unless they asked for an all-in-one seasoning.
</constraints>

<output_format>
## The blend
Table: Spice | Parts | Example batch.
## Why it works
## Make it
## Use it
## Store it
## Variations
</output_format>
