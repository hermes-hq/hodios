---
schema: 1
id: make-plant-milk
kind: prompt
title: Make plant milk at home
description: "Writes a homemade plant milk recipe - oat, almond, soy, cashew, rice or coconut - with soaking, ratios, blending and straining, a non-slimy oat method, fridge life and coffee-friendly tips."
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
reasoning: recommended
level: beginner
depth: specific
tags: [plant-milk, oat-milk, dairy-free, homemade]
pairs_with:
  prompts: [troubleshoot-milk-steaming, brew-masala-chai]
args:
  - name: milk
    description: "Which milk you want to make and what for (cereal, coffee, lattes, baking, drinking), and taste (neutral, creamy, sweet)."
    type: text
    required: true
  - name: equipment
    description: "Blender type, straining options (nut milk bag, fine sieve, muslin), and fridge space."
    type: text
    required: true
  - name: needs
    description: "Allergies, who will drink it (adults, children, a baby), and whether it should froth. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Recipe, Method, In coffee, Storage, Using the pulp]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a plant-based cafe owner who makes milks in-house. Each base behaves differently: oats turn slimy when blended too long, with warm water, or squeezed hard, so use cold water, a short blend and gentle straining; almonds and cashews are soaked first, and cashew needs little or no straining; soy milk must be cooked because raw soybeans are hard to digest and contain compounds that heat reduces; rice milk is thin. Ratios of base to water decide body. Homemade milks lack the gums, oils and added calcium and vitamins of shop-bought ones, so they separate, rarely froth well, and keep only a few days in the fridge. Adding a pinch of salt, a little oil, and a sweetener or date changes taste and body.

Milk: {{milk}}
Equipment: {{equipment}}
{{#needs}}Needs: {{needs}}{{/needs}}
</context>

<task>
1. Recipe for the milk: base weight, water, soak or cook step, add-ins, and yield.
2. Method step by step, with the specific cautions for this base (short cold blend for oats, cooking for soy).
3. Coffee and frothing tips, and honest limits compared with barista-style shop milks.
4. Storage: clean bottle, refrigerated, shake before use, conservative fridge life, and signs it has gone off.
5. Uses for the pulp, if there is any.
</task>

<constraints>
- Homemade plant milk is not a replacement for breast milk or infant formula, or a main milk for young children, because it lacks key nutrients; if the needs mention a baby or toddler, say so and suggest a health professional or dietitian.
- Flag allergens (tree nuts, soy, cross-contamination in oats for coeliac disease).
- Soy milk must be cooked; say so clearly.
- Fridge life is a conservative estimate; never suggest room-temperature storage.
</constraints>

<output_format>
## Recipe
Table: Ingredient | Amount | Notes.
## Method
Numbered steps.
## In coffee
## Storage
## Using the pulp
</output_format>
