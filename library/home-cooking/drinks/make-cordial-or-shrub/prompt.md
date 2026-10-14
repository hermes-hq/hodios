---
schema: 1
id: make-cordial-or-shrub
kind: prompt
title: Make a cordial, syrup or shrub
description: Writes a recipe for a homemade cordial, flavoured syrup or vinegar shrub from fruit, herbs or spices - ratios, method, safe storage and shelf life - and how to use it in alcohol-free drinks.
category: drinks
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook, individual]
requires: [none]
inputs: [preferences, text]
output: [explanation, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [cordial, shrub, flavoured-syrup, alcohol-free, preserving, seasonal-fruit]
pairs_with:
  prompts: [invent-alcohol-free-cocktail, preserve-food-safely]
args:
  - name: idea
    description: What you want to make and from what (for example "elderflower cordial", "rhubarb shrub", "ginger syrup for highballs", "use up a glut of plums").
    type: text
    required: true
  - name: amount
    description: How much fruit or how much finished syrup you want, and fridge or shelf space. Optional.
    type: string
  - name: needs
    description: Sugar preferences, whether it must be shelf-stable or can live in the fridge, and who will drink it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Which method, Recipe, Method, Storage and safety, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a preserves maker who supplies cordials and shrubs to a cafe. Syrups and cordials balance sugar and acid with flavour; shrubs add vinegar, which brings bright acidity and helps preservation. Methods differ: hot infusion is fast and suits roots, spices and hardy fruit; cold process (macerating fruit in sugar) keeps fresh fruit flavours; delicate flowers are steeped off the heat. Sugar and acid both affect how long a syrup keeps, but low-sugar syrups, fresh herbs and fruit pulp spoil faster, and home syrups are not shelf-stable unless properly processed. Clean equipment, sterilised bottles and the fridge are the safe default.

Idea: {{idea}}
{{#amount}}Amount: {{amount}}{{/amount}}
{{#needs}}Needs: {{needs}}{{/needs}}
</context>

<task>
1. Which method: choose hot, cold or steeped, and cordial, syrup or shrub, and say why for this ingredient.
2. Recipe: ingredients by weight with ratios (for example fruit to sugar to vinegar), scaled to the amount, and the expected yield.
3. Method: numbered steps with times and cues, including straining and bottling into clean, sterilised bottles.
4. Storage and safety: refrigerate by default, a conservative fridge life range, signs of spoilage (fizzing when it should not, mould, off smells), and when shelf-stable processing would be needed, pointing to tested preserving guidance rather than improvising. Flag ingredient-specific cautions (for example identify foraged flowers with certainty, use only the safe parts of a plant such as elderflowers without stems and leaves, and avoid raw elderberries).
5. How to use it: dilution ratios for a long drink, two alcohol-free drinks, and one optional cocktail use.
</task>

<constraints>
- Shelf lives are conservative estimates, labelled as such; do not claim room-temperature storage is safe without a tested process.
- No health claims for the ingredients.
- If the idea involves fermentation (for example a ginger bug or a fizzy cordial), say carbonation in sealed bottles can build pressure and burst glass, and how to manage it, or refer to fermentation guidance.
- Use metric weights with cup equivalents only if asked.
</constraints>

<output_format>
## Which method
Two or three sentences.
## Recipe
Table: Ingredient | Weight | Ratio.
## Method
Numbered.
## Storage and safety
Bullets.
## How to use it
Dilution, then short recipes.
</output_format>
