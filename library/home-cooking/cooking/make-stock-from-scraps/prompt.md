---
schema: 1
id: make-stock-from-scraps
kind: prompt
title: Make stock from scraps
description: Turns saved bones, vegetable trimmings or shells into stock with the right ratio, roasting choice, simmer time, straining, fast cooling and storage, and what to leave out of the pot.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [stock, broth, food-waste, scraps, batch-cooking]
pairs_with:
  prompts: [recipe-from-ingredients, preserve-food-safely, teach-cooking-technique]
  personas: [chef-mentor]
args:
  - name: scraps
    description: What you have saved and roughly how much (for example "one roast chicken carcass, onion skins and carrot ends, a bag of parsley stems").
    type: text
    required: true
  - name: use
    description: What you want the stock for (soup, risotto, ramen, gravy, sipping) and your equipment (large pot, slow cooker, pressure cooker). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you will make, Leave these out, Method, Cool and store, Use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cook who wastes nothing and knows stock. Good stock comes from the right scraps in the right ratio, not from everything in the bag. Bones with joints, skin and cartilage (wings, feet, backs, carcasses) give body from gelatine; roasting first gives brown stock with deeper flavour and colour, while white stock suits delicate soups and risotto. Water should just cover the solids; too much gives thin stock. A bare simmer, never a rolling boil, keeps it clear; skimming early helps. Rough times: fish and shellfish 30 to 45 minutes (longer turns bitter), vegetable about an hour, chicken 3 to 4 hours, beef or pork bones longer, and a pressure cooker cuts this a lot. Some scraps spoil a stock: brassica trimmings (cabbage, broccoli, sprouts) go sulphurous, potato peels cloud it, beetroot dyes it, bitter or mouldy bits ruin it. Stock should not be salted until it is used, so it can be reduced. Large pots of hot stock cool slowly, which is a food safety risk, so it needs to be divided and chilled fast.

Scraps: {{scraps}}
{{#use}}Use and equipment: {{use}}{{/use}}
</context>

<task>
1. What you will make: the kind of stock this collection makes best (brown or white, chicken, mixed, vegetable, shellfish), about how much, and whether to roast first.
2. Leave these out: anything in their list that will spoil the stock and why, plus anything to add for balance if they have it (an onion, a carrot, a bay leaf, peppercorns, parsley stems).
3. Method: steps with water amount, simmer time for their equipment, skimming, and when to add vegetables and herbs.
4. Cool and store: strain, divide into shallow containers or a sink of iced water, chill quickly, fridge and freezer times, freezing in measured portions or ice-cube trays, and reducing to save space.
5. Use it: how to season and use it for their stated purpose, and how to tell when gelatine set means a good stock.
</task>

<constraints>
- Do not suggest salting the stock itself; season when used.
- Food safety: chill within the time local food safety guidance recommends (commonly within about two hours); do not leave a pot to cool overnight on the stove; scraps that were bad before freezing stay bad.
- Do not use scraps from food that was left out unsafely or that people have eaten from directly.
- Keep amounts realistic for the scraps they have.
</constraints>

<output_format>
## What you will make
## Leave these out
## Method
Numbered.
## Cool and store
## Use it
</output_format>
