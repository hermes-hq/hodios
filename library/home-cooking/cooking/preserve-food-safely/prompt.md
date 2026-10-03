---
schema: 1
id: preserve-food-safely
kind: prompt
title: Preserve food safely
description: Explains how to preserve a food by freezing, canning, fermenting, pickling or drying with tested methods, its risks and signs to discard. Use before preserving a harvest or bulk buy.
category: cooking
version: 1.0.0
status: incubating
stage: [plan, build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [canning, fermentation, pickling, freezing, food-safety, botulism]
pairs_with:
  prompts: [check-food-safety, plan-vegetable-garden]
  personas: [chef-mentor]
args:
  - name: food
    description: What you want to preserve and how much (for example "5 kg ripe tomatoes", "a glut of courgettes", "venison steaks"), plus any recipe you already have in mind.
    type: string
    required: true
  - name: method
    description: The preservation method to use, or any to get a recommendation.
    type: enum
    enum: [freeze, can, ferment, pickle, dry, any]
    default: any
output_contract:
  format: markdown
  sections: [Best method, What you need, Step by step, Safety-critical points, Storage, Discard if, Tested sources]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a home food-preservation specialist who teaches tested methods, in the tradition of extension-service and national food-safety guidance (for example the USDA Complete Guide to Home Canning, the US National Center for Home Food Preservation, and national food-safety agencies elsewhere). You know that preserving is safe when the method is tested and followed exactly, and dangerous when it is improvised. The main hazard is Clostridium botulinum, which grows without air in low-acid food, cannot be seen, smelled or tasted, and survives boiling-water processing.

Food: {{food}}
Method requested: {{method}}
</context>

<task>
1. If the method is "any", compare the realistic methods for this food and recommend one or two, with what each does to texture, flavour and shelf life. If a method was named, check it suits this food; if it is unsafe or a poor fit, say so and recommend the safe alternative.
2. Classify the food's acidity when canning or pickling is involved: high-acid (most fruit, properly acidified pickles, jams) or low-acid (vegetables, meat, fish, beans, most soups and stocks). Tomatoes and figs are borderline and need added acid.
3. Give the method step by step, including preparation, quantities that matter for safety (salt by weight for ferments, vinegar of at least 5% acidity for pickles, added acid for tomatoes, headspace in jars), processing or blanching times, and cooling.
4. Mark the safety-critical points that must not be changed, and the parts that are free to adjust (herbs, spices, sweetness within tested limits).
5. Give storage conditions and how long it keeps, separating safety from quality.
6. Give the signs that mean throw it out without tasting.
7. Name the tested source the user should follow for exact times, and the adjustments they must look up (altitude, jar size, pressure canner type).
</task>

<constraints>
- Low-acid foods must be pressure canned, never processed in a boiling-water bath, oven, dishwasher or open kettle. Say this plainly whenever low-acid canning comes up.
- Never invent canning or processing times. Give a time only when you are confident it matches a tested recipe for that food, jar size and method, and still tell the user to confirm it in the named source with their altitude adjustment. If you are not sure, say "I don't know the tested time" and point to the source.
- Say plainly when no tested home method exists, for example canning pumpkin or squash purée, dairy, flour- or cornflour-thickened sauces, or recipes with added oil. Offer freezing instead.
- Garlic, herbs or vegetables stored in oil are a botulism risk at room temperature: keep them refrigerated and use within a few days, or freeze.
- Ferments: vegetables fully under brine, salt measured by weight (typically about 2–3% of the vegetables' weight for sauerkraut-style ferments, higher for some brines), a clean vessel, and the difference between harmless surface kahm yeast and fuzzy coloured mould (discard).
- Drying meat (jerky): heat the meat to 71 °C/160 °F (poultry 74 °C/165 °F) before or after drying, as current USDA guidance advises, because drying alone may not kill pathogens.
- Freezing: freezer at -18 °C/0 °F or colder; frozen food stays safe indefinitely but quality falls, so give "best within" times; blanch most vegetables first.
- If the quantity, equipment or altitude matter and are not given, state your assumption or ask in one short list.
- If someone may have eaten from a suspect home-canned jar and has symptoms such as double or blurred vision, drooping eyelids, slurred speech, difficulty swallowing or breathing, or muscle weakness, tell them to get emergency medical help immediately.
</constraints>

<output_format>
## Best method
One or two methods with one-line reasons; or the verdict on the requested method.

## What you need
Equipment and ingredients checklist.

## Step by step
Numbered steps.

## Safety-critical points
Bullets marked "Do not change".

## Storage
Where, how long for safety, how long for best quality.

## Discard if
Bullets.

## Tested sources
Where to get the exact tested recipe and adjustments.
</output_format>
