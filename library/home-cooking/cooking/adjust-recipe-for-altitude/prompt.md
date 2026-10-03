---
schema: 1
id: adjust-recipe-for-altitude
kind: prompt
title: Adjust a recipe for high altitude
description: Adjusts a baking or cooking recipe for high altitude, changing leavening, sugar, liquid, flour, oven temperature and time for the elevation, and explains each change.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [rewrite, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [high-altitude, recipe-conversion, food-science, cakes, bread]
pairs_with:
  prompts: [adapt-recipe, troubleshoot-recipe, preserve-food-safely]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The full recipe as written, with quantities, oven temperature and times.
    type: text
    required: true
  - name: altitude_m
    description: Your elevation in metres. If you know it in feet, divide by 3.28.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [What changes at this altitude, Adjustments, Adjusted recipe, First bake checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food scientist who tests recipes for mountain towns. At altitude, lower air pressure makes water boil at a lower temperature (roughly 1°C lower for every 300 m, so about 95°C at 1,500 m and 92°C at 2,500 m), moisture evaporates faster, and gases expand more, so cakes rise fast then collapse, cookies spread, breads overproof and simmered food takes longer. Adjustments start to matter above about 900 m (3,000 ft) and grow with height. Starting points from extension-service testing guide you, but every recipe still needs a test bake.

Recipe:
<recipe>
{{recipe}}
</recipe>
Altitude: {{altitude_m}} m
</context>

<task>
1. Identify the recipe type (cake or quick bread, cookies, yeast bread, custard or candy, boiled or simmered dish, pressure-cooked dish, deep-fried food) and say what altitude will do to it at {{altitude_m}} m. If the altitude is below about 900 m, say most recipes need little or no change and point out only what does.
2. Apply starting-point adjustments for the type and elevation, then explain each:
   - Cakes and quick breads (per teaspoon of baking powder or soda): reduce by about 1/8 tsp at 900–1,500 m, 1/8–1/4 tsp at 1,500–2,100 m, and 1/4 tsp above 2,100 m. Reduce sugar by about 0–1 tbsp per cup at 900 m and up to 1–2 tbsp per cup higher up. Increase liquid by about 1–2 tbsp per cup at 900 m, 2–4 tbsp per cup at 1,500 m and 3–4 tbsp per cup above 2,100 m. Add about 1 tbsp flour at around 1,000 m and 1 more tbsp for each further 450 m or so. Raise the oven by about 8–14°C (15–25°F) and shorten the bake time accordingly; an extra egg can add structure for rich cakes.
   - Cookies: often only a small sugar and leavening reduction, a little extra flour, and a slightly hotter oven to set them before they spread.
   - Yeast bread: reduce yeast by about 25%, expect faster rises and watch the dough not the clock, consider an extra punch-down for flavour, and add a little more liquid if the dough is dry.
   - Boiling and simmering: longer cooking for pasta, beans, grains and eggs, more water to allow for evaporation, and lids on.
   - Candy and sugar work: lower the target temperature by the difference between your measured boiling point of water and 100°C (212°F); test your thermometer in boiling water first.
   - Pressure cooking: many manufacturers advise adding about 5% cooking time per 300 m above 600 m; follow the appliance manual.
   - Deep frying: lower the oil temperature slightly and fry a little longer so the outside does not brown before the inside cooks.
3. Rewrite the full adjusted recipe with the new quantities in the original units (and metric if they used cups), the new temperature and times, and doneness cues.
4. Give a first-bake checklist: what to watch for and which single change to make next time if the result sinks, domes, is dry or spreads.
</task>

<constraints>
- Present all figures as starting points to test, not guarantees.
- Home canning and preserving at altitude need tested, altitude-specific processing times or pressures from a recognised food-safety authority. Do not improvise canning adjustments; point the user to that tested guidance.
- Meat and poultry safe internal temperatures do not change with altitude; only the cooking time does.
- Change only what altitude requires; keep the recipe's character and ingredients.
- If the recipe lacks quantities, temperatures or times needed to adjust it, ask for them.
</constraints>

<output_format>
## What changes at this altitude
2–4 sentences specific to this recipe and elevation.

## Adjustments
Table: Element | Original | Adjusted | Why.

## Adjusted recipe
Full recipe.

## First bake checklist
Bullets: watch for, and what to change next time.
</output_format>
