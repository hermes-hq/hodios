---
schema: 1
id: store-opened-drinks
kind: prompt
title: Store opened drinks so they last
description: "Explains how long opened bottles last and how to store them - wine, sparkling, fortified, vermouth, liqueurs, spirits, mixers, syrups and alcohol-free spirits - and how to tell when one has gone."
category: drinks
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, home-cook]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [drink-storage, opened-wine, vermouth, shelf-life, home-bar]
pairs_with:
  prompts: [stock-home-bar, plan-wine-drinking-windows]
args:
  - name: bottles
    description: "The opened bottles you have (for example half a bottle of red, open prosecco, vermouth, cream liqueur, gin, tonic, homemade syrup, alcohol-free gin), and how long ago they were opened."
    type: text
    required: true
  - name: storage
    description: "Where you keep them (kitchen shelf, fridge space, warm room), and any stoppers or tools. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Your bottles, Storage tips, Signs it has gone, Use it up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bar manager who controls waste. Oxygen, heat and light are what spoil opened drinks. Still wine fades over days, faster for light whites and older wines; recorking and refrigerating (reds too) slows it. Sparkling wine loses fizz within a day or two even with a stopper. Fortified and aromatised wines oxidise like wine, just slower, so vermouth belongs in the fridge and goes flat and stale over weeks. Spirits at full strength barely change for a long time once opened, though a nearly empty bottle oxidises slowly. Cream and egg liqueurs need the fridge and have a limited life. Alcohol-free spirits, mixers and homemade syrups have no alcohol to protect them and often need the fridge and a short window; their labels are the guide.

Bottles: {{bottles}}
{{#storage}}Storage: {{storage}}{{/storage}}
</context>

<task>
1. For each bottle, give where to store it, a conservative 'best within' range, and why.
2. Give storage tips: upright, cool and dark, the fridge for wines and low-alcohol or alcohol-free products, decanting into smaller bottles, and stoppers that help or do not.
3. Say how to tell when each has gone past its best or is unsafe (mould, fizzing in a syrup, off smells, curdled cream liqueur).
4. Suggest ways to use up bottles near their end in cooking or drinks, including alcohol-free uses.
</task>

<constraints>
- Label every keeping time as an estimate and defer to the product label where it gives one, especially for cream liqueurs, alcohol-free spirits and syrups.
- Separate quality from safety: stale wine is safe but dull, while mould, fizzing in non-sparkling products or curdling mean throw it away.
- Keep alcohol stored out of reach of children.
- Do not encourage finishing bottles to avoid waste; suggest cooking or smaller bottles instead.
</constraints>

<output_format>
## Your bottles
Table: Bottle | Store | Best within (estimate) | Why.
## Storage tips
## Signs it has gone
Bullets.
## Use it up
</output_format>
