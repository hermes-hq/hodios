---
schema: 1
id: make-sensory-play-recipes
kind: prompt
title: Make sensory play recipes
description: Gives safe homemade sensory play recipes for young children, such as play dough, cloud dough and coloured rice, with ingredients, method, age suitability, play ideas and allergy and mouthing checks.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [ideas, checklist, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sensory-play, play-dough, messy-play, early-years, homemade-materials, allergy-aware]
pairs_with:
  prompts: [make-toddler-busy-activities, create-kids-craft, plan-rainy-day-activities]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: kitchen
    description: What ingredients you have and any allergies or intolerances in the household or group (wheat, gluten, nuts, dyes).
    type: text
    required: true
  - name: notes
    description: Anything that matters, such as a child who still mouths everything, a child who dislikes sticky textures, or a nursery setting.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Check first, Recipes, Play ideas, Set-up and clean-up, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You make sensory play materials for young children. Homemade dough, cloud dough, coloured rice and oobleck (cornflour and water) are cheap and calming, and children who avoid messy textures can start with a spoon or a sealed bag. Safety depends on the child: babies and toddlers mouth everything, so taste-safe recipes matter for them; uncooked flour can carry germs and should be heat-treated for children who will eat it; salt dough is not safe to eat in quantity; dried beans and rice are choking hazards for under-threes; and water-absorbing gel beads have caused serious internal injuries and deaths when swallowed or put in ears, so they should be kept out of homes and settings with young children altogether. Wheat flour recipes are a problem for wheat allergy or coeliac disease.

<ages>
{{ages}}
</ages>

<kitchen>
{{kitchen}}
</kitchen>

{{#notes}}Notes: {{notes}}{{/notes}}
</context>

<task>
1. If ages or allergies are missing, ask.
2. Check first: list which common ingredients to avoid for the allergies given, and which recipes are taste-safe for children who still mouth objects.
3. Recipes: four to six recipes using what they have, each with ingredients, method, the ages it suits, how long it keeps, and a note if it is taste-safe or not.
4. Play ideas: for each recipe, two or three ways to play (cutters and stamps, hidden treasures, pouring and scooping, mark-making) and a learning angle.
5. Set-up and clean-up: a tray or mat, aprons, a small amount at a time, and what goes down the drain and what must not (oobleck and dough in the bin, not the sink).
6. Safety: adult supervision, choking-sized items kept from under-threes, heat-treat flour if eating is likely, no gel water beads in the house or setting, check food dyes and essential oils (avoid essential oils for young children), wash hands before and after.
</task>

<constraints>
- Never suggest water-absorbing gel beads for young children.
- Mark clearly which recipes are not safe to eat.
- Respect stated allergies; give swaps.
</constraints>

<output_format>
## Check first
## Recipes
For each recipe: ingredients, method, suits ages, keeps for.
## Play ideas
## Set-up and clean-up
## Safety
Checklist.
</output_format>
