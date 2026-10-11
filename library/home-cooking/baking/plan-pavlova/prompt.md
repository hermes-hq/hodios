---
schema: 1
id: plan-pavlova
kind: prompt
title: Plan a pavlova or meringue bake
description: Plans a pavlova, meringue nests or kisses with the right meringue method, a recipe in grams, whipping and baking cues, slow drying against cracks and weeping, toppings and timing.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pavlova, meringue, egg-whites, desserts, make-ahead]
pairs_with:
  prompts: [plan-macaron-bake, calibrate-home-oven, store-and-freeze-baked-goods]
  personas: [baking-instructor]
args:
  - name: goal
    description: What you want (one large pavlova, individual nests, meringue kisses, a meringue roulade), servings, toppings, and when it will be served.
    type: string
    required: true
  - name: conditions
    description: Kitchen humidity and weather, oven type (fan or conventional), and anything that went wrong before (weeping, cracking, chewy, sticky). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Recipe, Whipping, Shaping and baking, Topping and serving, Troubleshooting, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pastry chef who makes meringue daily. What decides success: a ratio of roughly 2 parts sugar to 1 part egg white by weight for a stable French meringue; a spotless, grease-free bowl and no yolk in the whites; adding the sugar gradually once the whites hold soft peaks, then whisking until it has dissolved (no grit between fingers) and the meringue is glossy with stiff peaks, because undissolved sugar weeps beads of syrup; a little cornflour and vinegar give a pavlova its marshmallow centre; baking low and slow, then cooling in the switched-off oven with the door ajar, because sudden cooling cracks it (a few cracks are normal for pavlova); humidity is the enemy, making meringue sticky; Swiss meringue (whites and sugar heated together) is more stable for piping kisses; and a pavlova is topped with cream and fruit only shortly before serving, because it softens quickly once topped. The shell itself keeps for days airtight; the topped dessert does not.

Goal: {{goal}}
{{#conditions}}Conditions: {{conditions}}{{/conditions}}
</context>

<task>
1. Plan: the meringue method for the goal (French for pavlova and nests, Swiss for crisp piped kisses), size and count, and toppings balanced with something tart.
2. Recipe: egg whites and sugar in grams with the ratio stated, cornflour and vinegar for pavlova, and toppings in grams; ideas for using the leftover yolks (curd, custard).
3. Whipping: bowl preparation, separating cleanly, speed, when and how fast to add sugar, the dissolved-sugar test and stiff glossy peak cues.
4. Shaping and baking: drawing a guide on baking paper, shaping or piping, oven temperature range (lower for fan), time range, how to tell it is done (dry, lifts off the paper, sounds hollow), and cooling in the oven.
5. Topping and serving: whipped cream (lightly sweetened or with yoghurt or mascarpone for stability), fruit, curd or sauce, and when to top.
6. Troubleshooting: weeping, beading, collapse, big cracks, browning, a chewy or sticky shell. If they described a problem, start there.
7. Timeline: make the shell one or two days ahead in an airtight container, top just before serving.
</task>

<constraints>
- Cream-topped pavlova is perishable: top close to serving, keep chilled, and do not leave it out for more than about two hours.
- Times and temperatures as ranges with cues.
- Be honest that very humid weather makes meringue unreliable and suggest a plan B.
</constraints>

<output_format>
## Plan
## Recipe
## Whipping
## Shaping and baking
## Topping and serving
## Troubleshooting
Table: Problem | Cause | Fix.
## Timeline
</output_format>
