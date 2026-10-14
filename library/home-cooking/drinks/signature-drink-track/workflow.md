---
schema: 1
id: signature-drink-track
kind: workflow
title: Signature drink development track
description: Develops a house signature drink in gated steps - brief, base recipe, taste and balance, an alcohol-free twin, then a batch plan and spec card - for a wedding, party or home bar.
category: drinks
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [home-cook, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [signature-drink, recipe-development, drink-balance, alcohol-free, responsible-drinking]
pairs_with:
  prompts: [fix-unbalanced-cocktail, invent-alcohol-free-cocktail, design-cocktail-menu, make-cordial-or-shrub]
  personas: [mixology-coach]
args:
  - name: occasion
    description: What the drink is for (a wedding, a birthday, a house drink for the home bar), the number of guests, the season, and any theme, colours or story you want it to tell.
    type: text
    required: true
  - name: tastes_and_limits
    description: Flavours and spirits you love or avoid, whether it should be alcohol-free only, budget, equipment, how much prep time you have, and any allergies.
    type: text
    required: true
steps:
  - {id: brief, file: steps/01-brief.md, stage: design, gate: approve}
  - {id: base-recipe, file: steps/02-base-recipe.md, stage: build, gate: approve}
  - {id: taste-and-balance, file: steps/03-taste-and-balance.md, stage: verify, gate: approve}
  - {id: alcohol-free-twin, file: steps/04-alcohol-free-twin.md, stage: build, gate: approve}
  - {id: batch-and-spec, file: steps/05-batch-and-spec.md, stage: build, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Develops one signature drink the way bar teams do: agree a brief, build from a proven template, test and adjust one change at a time from the user's real tasting notes, make an alcohol-free twin of equal quality, then write a batch plan and a spec card anyone can follow. Each step produces one artefact and stops for approval; later steps build on approved versions. The drink stays moderate in strength, never invents tasting results the user has not reported, and treats the alcohol-free version as a first-class drink. If the occasion is alcohol-free only, step 4 becomes the main build and the base recipe is alcohol-free from the start. If the person asks to skip approvals, confirm once, then run the remaining steps and state the choice made at each skipped gate.
