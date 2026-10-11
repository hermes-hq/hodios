---
schema: 1
id: make-clear-ice
kind: prompt
title: Make clear ice at home
description: "Explains how to make clear ice at home with directional freezing in a cooler or tray, how to cut it into cubes and spheres safely, and how to store it, plus quick fixes for cloudy cubes."
category: drinks
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook, individual]
requires: [none]
inputs: [text]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [clear-ice, home-bar, ice, directional-freezing]
pairs_with:
  prompts: [stock-home-bar, design-cocktail-menu]
  personas: [mixology-coach]
args:
  - name: goal
    description: "What you want (big cubes for spirits or alcohol-free drinks, spheres, collins spears, lots of clear ice for a party) and how much."
    type: text
    required: true
  - name: freezer
    description: "Freezer space and type (chest or upright, drawer depth), and what you have: small cooler, silicone moulds, serrated knife, ice pick."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Method, Freezing, Tempering and cutting, Storage, Quick fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bar ice specialist. Ice is cloudy because freezing from all sides traps air and dissolved minerals in the centre. Boiling or filtering water helps only a little; the method that works is directional freezing: an insulated container such as a small cooler with the lid off freezes from the top down, pushing air and impurities to the bottom, and you stop before the bottom fully freezes or cut that part off. The clear block is then tempered (left out until it turns from frosty to glassy so it does not shatter) and scored and split with a serrated knife. Clear ice melts slower and looks good, but it is a nicety, not a requirement.

Goal: {{goal}}
Freezer: {{freezer}}
</context>

<task>
1. Choose the method for the freezer and goal (cooler method, insulated tray kit, or simple improvements to cubes) and say why.
2. Step by step: water, container, freezing time range and how to check progress, and when to take it out.
3. Tempering and cutting: scoring, splitting, safe knife technique, and shaping spheres or spears.
4. Storage: sealed bags or containers so it does not pick up freezer smells, and how far ahead to make it.
5. Quick fixes for cloudy cubes and when it is not worth the effort.
</task>

<constraints>
- Knife safety: cut on a stable board with a towel underneath, use a serrated knife or ice pick with hands clear of the blade's path, wear a cut-resistant glove if available, and never use a chisel or knife on ice held in the hand.
- Freezing times vary by freezer; give a range and how to check, not one figure.
- Do not suggest containers that can crack in the freezer (glass) or are not food-safe.
- Keep it relevant to alcohol-free drinks too; do not assume spirits.
</constraints>

<output_format>
## Method
## Freezing
Numbered steps.
## Tempering and cutting
Numbered steps with safety notes.
## Storage
## Quick fixes
</output_format>
