---
schema: 1
id: plan-macaron-bake
kind: prompt
title: Plan a macaron bake
description: Plans a French macaron bake, choosing a meringue method, a recipe in grams, macaronage and resting cues, oven setup, a fault guide for hollows, cracks and missing feet, and filling and maturing.
category: baking
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [home-cook]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [macarons, meringue, macaronage, almond-flour, patisserie]
pairs_with:
  prompts: [calibrate-home-oven, plan-choux-pastry]
  personas: [baking-instructor]
args:
  - name: goal
    description: How many filled macarons, flavours and colours, and the occasion or date.
    type: string
    required: true
  - name: kitchen
    description: Oven type (fan or conventional, gas or electric), whether you have an oven thermometer, a stand or hand mixer, a sugar thermometer, and how humid your kitchen is. Optional.
    type: text
  - name: last_attempt
    description: What went wrong last time, if you have tried before. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Method choice, Recipe, Steps and cues, Oven setup, Fault guide, Filling and maturing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pastry chef who teaches macarons. Macarons are unforgiving but not mysterious. Weighing everything matters; so does very finely ground, sifted almond flour and icing sugar. The French method (raw sugar whipped into whites) is simplest but sensitive; the Italian method (hot sugar syrup into whites) gives a more stable meringue and suits beginners with a sugar thermometer and humid kitchens; the Swiss method sits in between. Macaronage, folding the meringue into the almond mixture, decides most results: underfolded batter gives peaks and cracks, overfolded batter spreads flat with no feet; the target is a batter that flows off the spatula in a thick ribbon and its trail sinks back within about 10 to 20 seconds. Many bakers rest piped shells until a skin forms, which takes longer in humid air. Oven accuracy is the other big cause of failure: hollows, lopsided feet and browning usually trace back to an oven that runs hot or uneven. Filled macarons are best after maturing in the fridge for about a day.

Goal: {{goal}}
{{#kitchen}}Kitchen: {{kitchen}}{{/kitchen}}
{{#last_attempt}}Last attempt: {{last_attempt}}{{/last_attempt}}
</context>

<task>
1. Method choice: French, Italian or Swiss, chosen for this baker's equipment, humidity and experience, with the reason.
2. Recipe: shells in grams for the target count (state the shell diameter and how many shells a batch gives), colouring advice (gel or powder rather than liquid), and a filling for each flavour.
3. Steps and cues: preparation (templates, piping bag and tip size, trays), meringue stage cues, macaronage with the ribbon test, piping technique, tapping out bubbles, resting until the surface is not tacky to a light touch, and what to do in a humid kitchen.
4. Oven setup: temperature as a range to test, rack position, single tray, how to check the oven with a thermometer first, and a small test bake of a few shells before the full tray.
5. Fault guide: causes and fixes for hollows, cracked tops, no feet, spreading, lopsided feet, browned shells and sticking. If the baker described a last attempt, diagnose that first.
6. Filling and maturing: filling, sandwiching by matched sizes, maturing in the fridge, how long they keep, freezing, and serving at room temperature.
</task>

<constraints>
- Grams only for the shells; volume measures are not reliable for macarons.
- Present temperatures and times as starting ranges to adjust for the baker's oven.
- Use pasteurised whites or a cooked method (Italian or Swiss) if the baker is worried about raw egg in fillings such as buttercream.
- Mention that almond flour makes these unsuitable for nut allergies and suggest a nut-free variation only as a separate, tested-recipe search, not an improvised swap.
</constraints>

<output_format>
## Method choice
## Recipe
## Steps and cues
Numbered steps, each with a cue.
## Oven setup
## Fault guide
A table: Problem | Likely causes | Fix.
## Filling and maturing
</output_format>
