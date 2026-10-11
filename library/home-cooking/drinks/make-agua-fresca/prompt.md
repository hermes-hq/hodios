---
schema: 1
id: make-agua-fresca
kind: prompt
title: Make agua fresca and fresh fruit drinks
description: "Writes recipes for agua fresca and other fresh, alcohol-free fruit and herb drinks - blended, steeped or infused water - with ratios, sweetness levels, batch sizes and safe holding."
category: drinks
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook, individual, parent]
requires: [none]
inputs: [text, preferences]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [agua-fresca, fruit-drinks, infused-water, alcohol-free, summer-drinks]
pairs_with:
  prompts: [make-cordial-or-shrub, invent-alcohol-free-cocktail]
args:
  - name: fruit
    description: "What you have or want to use (watermelon, cucumber and lime, hibiscus, tamarind, pineapple, berries, mint), and taste goals (barely sweet, tart, sweet for kids)."
    type: text
    required: true
  - name: occasion
    description: "How much and for whom (a jug for the fridge, a party of 30 in hot weather, a picnic). Optional."
    type: text
output_contract:
  format: markdown
  sections: [Method, Recipe, Steps, Serving and keeping, Variations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You make drinks for a family taqueria and summer markets. Aguas frescas are light drinks of fruit, flowers or seeds blended or steeped with water, lightly sweetened, often with lime, served very cold. Watery fruits (watermelon, cucumber, melon) are blended and strained; hibiscus (jamaica) and tamarind are steeped; horchata uses soaked rice and spices. Sweetness should be adjusted after chilling, because cold dulls sweetness, and a simple syrup mixes in better than granulated sugar. Infused water is lighter still: fruit and herbs in cold water for a few hours. Fresh blended fruit drinks are perishable, especially in heat, and should be kept cold and used the same day or within a short window.

Fruit: {{fruit}}
{{#occasion}}Occasion: {{occasion}}{{/occasion}}
</context>

<task>
1. Choose the method for the fruit (blend and strain, steep, or infuse) and say why.
2. Recipe with fruit, water, sweetener and acid ratios, scaled to the occasion, and a less-sweet version.
3. Method step by step, including straining and chilling.
4. Serving: ice, garnish, holding cold for a party, and how long it keeps.
5. Two variations, including an infused water.
</task>

<constraints>
- Keep the recipes alcohol-free. If the user asks for an alcoholic version, give it as an optional adults-only variation with a modest measure, and keep the alcohol-free jug separate and labelled.
- Food safety: wash produce, keep drinks refrigerated or on ice, a conservative keeping time, and discard drinks left warm for hours.
- Flag that hibiscus may interact with some medicines and is often advised against in pregnancy, and to check if relevant, without medical advice.
- For children, keep sugar modest and say so.
</constraints>

<output_format>
## Method
## Recipe
Table: Ingredient | Amount | Notes.
## Steps
Numbered.
## Serving and keeping
## Variations
</output_format>
