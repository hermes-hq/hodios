---
schema: 1
id: choose-buttercream
kind: prompt
title: Choose a buttercream
description: Picks the right buttercream or frosting for your cake, weather and decorating, compares American, meringue, ermine, cream cheese and ganache options, and gives a recipe and rescue fixes.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [preferences, text]
output: [table, plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [buttercream, frosting, swiss-meringue, ganache, cake-decorating]
pairs_with:
  prompts: [plan-celebration-cake, plan-royal-icing-cookies]
  personas: [baking-instructor]
args:
  - name: cake
    description: The cake and what the frosting must do - fill, crumb coat, smooth finish, pipe flowers, hold up a stacked cake - and how much cake it must cover.
    type: text
    required: true
  - name: conditions
    description: How warm it will be, how long it sits out, whether it must travel, and taste preferences (less sweet, chocolate) or restrictions. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Best choice, Comparison, Recipe, Method, Rescue fixes, Storage]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cake decorator. What bakers miss: frostings differ in sweetness, stability and how they pipe. American buttercream (butter and icing sugar) is quick, very sweet, crusts and handles moderate warmth; Swiss and Italian meringue buttercreams are silky, less sweet, pipe crisp flowers and smooth beautifully, but soften in heat and need care with the egg whites (Swiss whites heated to a safe temperature over a water bath, Italian with hot syrup); ermine (cooked flour) buttercream is light and not very sweet; cream cheese frosting is soft, cannot hold heavy tiers and must be chilled; whipped cream needs stabilising and refrigeration; ganache is stable, firm when set, and great under fondant or for sharp edges, with the cream-to-chocolate ratio deciding firmness. Meringue buttercreams that look curdled are usually too cold, and soupy ones are too warm; both can be rescued by changing the temperature, not by throwing them away.

Cake: {{cake}}
{{#conditions}}Conditions: {{conditions}}{{/conditions}}
</context>

<task>
1. Best choice: the frosting that fits the job and conditions, with the reason in two or three lines, and a second choice.
2. Comparison: a short table of the realistic options for this job (sweetness, stability in warmth, piping, smoothing, difficulty, needs refrigeration).
3. Recipe: the chosen frosting in grams for the amount needed, with how you estimated quantity (for example the amount for a 20 cm two-layer cake filled and coated).
4. Method: steps with cues (soft peaks, temperatures for Swiss meringue whites, butter at cool room temperature, ganache setting time), colouring and flavouring without breaking it.
5. Rescue fixes: curdled, soupy, too sweet, air bubbles, grainy, too soft to pipe, and how to fix each.
6. Storage: how far ahead it can be made, fridge or freezer, re-whipping, and how long the finished cake can sit out in their conditions.
</task>

<constraints>
- Swiss meringue whites must be heated to a safe temperature (around 70 °C or as local guidance says), or use pasteurised whites; do not suggest raw-egg frostings otherwise.
- Cream cheese, whipped cream and custard-based frostings need refrigeration and should not sit out more than about two hours.
- Do not promise any buttercream holds in strong heat; recommend ganache or keeping the cake chilled.
</constraints>

<output_format>
## Best choice
## Comparison
Table: Frosting | Sweetness | Heat stability | Piping | Smooth finish | Notes.
## Recipe
## Method
## Rescue fixes
Table: Problem | Why | Fix.
## Storage
</output_format>
