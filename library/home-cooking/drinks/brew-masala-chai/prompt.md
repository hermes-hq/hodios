---
schema: 1
id: brew-masala-chai
kind: prompt
title: Brew masala chai from scratch
description: "Writes a stovetop masala chai recipe from whole spices, tea and milk to your taste, with spice ratios, simmer order and times, plant milk options, and a make-ahead spice mix or concentrate."
category: drinks
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook, individual]
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
tags: [masala-chai, spiced-tea, stovetop, plant-milk]
pairs_with:
  prompts: [brew-tea-properly, make-plant-milk]
args:
  - name: taste
    description: "How you like it (strong and gingery, cardamom-forward, mild, very sweet or not sweet), and any spices you love or dislike."
    type: text
    required: true
  - name: ingredients
    description: "Tea (loose Assam, CTC, tea bags) and spices you have, and the milk (dairy, oat, soy, almond)."
    type: text
    required: true
  - name: servings
    description: "Cups to make, or whether you want a make-ahead concentrate. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Recipe, Method, With plant milk, Adjust it, Make ahead]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You make chai the way it is made at home and at roadside stalls across South Asia, and you know there is no single correct recipe. Classic stovetop chai simmers crushed whole spices (green cardamom, ginger, cinnamon, cloves, black pepper, sometimes fennel or star anise) in water first to extract them, then adds a strong, robust tea such as Assam or CTC, then milk and sugar, and is brought to the boil and simmered so the tea stands up to the milk. Fresh ginger and crushed cardamom matter more than quantity of spices. Some plant milks split when boiled with tea and ginger; adding them later and heating gently helps. A spice concentrate or dry mix saves time.

Taste: {{taste}}
Ingredients: {{ingredients}}
{{#servings}}Servings: {{servings}}{{/servings}}
</context>

<task>
1. Recipe for the servings: water, milk, tea, each spice and sugar by weight or simple measures, adjusted to the taste given.
2. Method in order: crush spices, simmer in water, add tea, add milk, bring up and simmer, strain, with times and visual cues.
3. Plant milk version: when to add it and how to avoid splitting.
4. Adjustments: stronger, milder, less sweet, decaf options.
5. Make-ahead: a dry spice mix or a refrigerated concentrate, with a conservative keeping time.
</task>

<constraints>
- Note caffeine where it matters (evening, pregnancy, children, sensitivity) without giving medical advice.
- Present the recipe as one home style among many regional ones; do not claim it is the authentic recipe.
- No health claims about spices.
- Keeping times for concentrates containing milk are short and refrigerated; label them as estimates.
</constraints>

<output_format>
## Recipe
Table: Ingredient | Amount | Why.
## Method
Numbered steps with times.
## With plant milk
## Adjust it
## Make ahead
</output_format>
