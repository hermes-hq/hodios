---
schema: 1
id: plan-rolled-sponge-cake
kind: prompt
title: Plan a rolled sponge cake
description: Plans a Swiss roll, roulade or yule log with a flexible sponge in grams, whisking cues, a short bake, rolling while warm to stop cracking, fillings that hold, and decorating and timing.
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
depth: specific
tags: [swiss-roll, roulade, yule-log, sponge-cake, whisked-sponge]
pairs_with:
  prompts: [choose-buttercream, plan-celebration-cake, adapt-bake-to-different-tin]
  personas: [baking-instructor]
args:
  - name: goal
    description: What you want (jam Swiss roll, chocolate yule log, matcha roulade, a Japanese-style cream roll), the filling, servings, and when it will be served.
    type: string
    required: true
  - name: tray
    description: The tray size you have (for example 33 x 23 cm) and oven type. Optional; a standard size is assumed if missing.
    type: string
  - name: last_attempt
    description: What went wrong last time, such as cracking when rolled, a dense or rubbery sponge, filling squeezing out. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Recipe, Whisking and folding, Baking, Rolling, Filling and finishing, Troubleshooting, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pastry chef. A rolled sponge cracks for predictable reasons: it was overbaked (even a minute or two too long in a thin layer dries the edges), it cooled flat before its first roll, or the sponge had too little moisture or fat to bend. The fixes are a whisked sponge (whole eggs or separated, whisked to the ribbon stage, flour folded in gently), sometimes with a little oil or a chiffon-style batter for flexibility; a short bake in a hot oven until the top just springs back; turning it out onto a sugared tea towel or baking paper and rolling it up while warm so it sets in a curve, then unrolling to fill once cool; a filling that is not too thick and stops short of the far edge; and rolling from the short or long side depending on the shape wanted. Cream or buttercream fillings need chilling, and a yule log is easiest decorated with ganache textured with a fork.

Goal: {{goal}}
{{#tray}}Tray: {{tray}}{{/tray}}
{{#last_attempt}}Last attempt: {{last_attempt}}{{/last_attempt}}
</context>

<task>
1. Plan: the sponge type for the filling and look, roll direction, and a simpler option if needed.
2. Recipe: sponge, filling and coating in grams for their tray, oven temperatures in °C, °C fan and °F.
3. Whisking and folding: the ribbon test, folding without knocking out air, spreading evenly into the corners of a lined tray.
4. Baking: time range and doneness cue (springs back, just pulling from the edges), with a warning that a minute too long matters.
5. Rolling: turning out, peeling the paper, trimming crisp edges, rolling warm in a towel or paper, cooling rolled.
6. Filling and finishing: unrolling, spreading, a shallow score near the starting edge, rolling firmly, seam down, chilling, and finishing (dusting, ganache bark for a yule log, cutting an angled branch).
7. Troubleshooting: cracking, rubbery or dense sponge, sticking paper, filling squeezing out, a soggy base. Start with their last attempt if given.
8. Timeline: what can be made ahead, chilling time and slicing with a hot knife.
</task>

<constraints>
- Cream and buttercream-filled rolls stay refrigerated and should not sit out more than about two hours.
- Times and temperatures as ranges with cues.
- If the tray size differs from the recipe's, scale by area and say so.
</constraints>

<output_format>
## Plan
## Recipe
## Whisking and folding
## Baking
## Rolling
## Filling and finishing
## Troubleshooting
Table: Problem | Cause | Fix.
## Timeline
</output_format>
