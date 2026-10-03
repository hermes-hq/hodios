---
schema: 1
id: write-menu-descriptions
kind: prompt
title: Write menu descriptions
description: Writes restaurant or cafe menu descriptions that are short, appetising and accurate, with section names and allergen notes taken only from supplied data, in the venue's voice.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [hospitality]
requires: [none]
inputs: [notes, text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [menu-writing, allergens, food-copy, cafe]
pairs_with:
  prompts: [write-product-description, write-brochure-copy]
  personas: [copywriter]
args:
  - name: dishes
    description: The dishes or drinks with their main ingredients, cooking method, portion or size, price and any story (house recipe, named supplier, origin). Paste a rough list or the current menu.
    type: text
    required: true
  - name: venue_style
    description: The venue and its voice (for example "neighbourhood Italian, warm and unfussy", "specialty coffee bar, playful", "fine dining, precise"). Optional.
    type: string
  - name: allergens
    description: Allergen and dietary data per dish from your kitchen records or recipe sheets, including which dishes are vegetarian, vegan or gluten-free and any shared-fryer or cross-contact notes. Optional, but without it no allergen claims are made.
    type: text
output_contract:
  format: markdown
  sections: [Menu, Allergen and dietary key, Items to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write menus for independent restaurants, cafes and bars. A menu description has a few seconds and about a dozen words to make someone choose a dish: name the hero ingredient, how it is cooked and one detail that makes it this venue's version. Long, adjective-heavy descriptions slow ordering and read as padding.

Menus are also a legal and safety document. Allergen information that is wrong can put a guest in hospital, and words like "homemade", "local", "organic", "free-range" or a protected name (Champagne, Parma ham, Wagyu) are claims the kitchen must be able to back up. You write only what the kitchen has told you.
</context>

<task>
Write menu copy for these dishes.

<dishes>
{{dishes}}
</dishes>

{{#venue_style}}Venue and voice: {{venue_style}}{{/venue_style}}

{{#allergens}}
<allergens>
{{allergens}}
</allergens>
{{/allergens}}

1. If the list gives only dish names with no ingredients, ask for the main ingredients and method of the dishes that lack them, and stop.
2. Group the dishes into sections that suit the venue (for example Small plates, From the grill, Sweet things) and name the sections in its voice. Keep the kitchen's own order if it has one.
3. For each dish write a description of 8 to 20 words: lead with the hero ingredient, then the method or the defining detail, then one supporting element. Keep dish names the kitchen uses; add a short plain-language gloss for unfamiliar foreign names.
4. Add dietary and allergen codes to each dish only from the allergen data. Where data is missing for a dish, add no codes and list it under items to confirm.
5. Keep prices exactly as supplied and in one consistent format.
6. Write a one-line note for the foot of the menu inviting guests to tell staff about allergies before ordering.
</task>

<constraints>
- No ingredient, origin, supplier or method that is not in the list.
- Use "homemade", "local", "organic", "free-range", "wild", "fresh" or protected names only when the list says so; otherwise leave them out.
- Never state or imply that a dish is free from an allergen (for example "gluten-free", "nut-free") unless the allergen data says so, and note any cross-contact or shared-fryer warning it gives.
- Avoid filler words that add nothing: "delicious", "mouth-watering", "succulent", "perfectly", "drizzled", "nestled", "medley". Use one sensory word per dish at most.
- Match the venue's voice, but clarity comes first: a guest must know what will arrive on the plate.
- If the venue's market uses a standard allergen list (for example the 14 major allergens in the UK and EU, or the 9 major food allergens in the US), use it for the key; otherwise use the categories in the data.
</constraints>

<output_format>
## Menu
Each section as a heading, then each dish as: **Dish name** - description - codes - price.

## Allergen and dietary key
The codes used and what they mean, and the allergy note for the foot of the menu.

## Items to confirm
Dishes with missing allergen data, claims the kitchen must confirm and any ingredient you were unsure of. Write "None" if complete.
</output_format>
