---
schema: 1
id: write-food-video-prompts
kind: prompt
title: Write food video prompts
description: Writes generated food video prompts for pours, steam, sizzles, slices and cheese pulls, with one action per clip, physics guards for liquids and knives, and the dish kept true to what is served.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
requires: [none]
inputs: [text, image]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [food-video, menu-video, liquid-physics, food-styling]
pairs_with:
  prompts: [write-food-photo-prompt, write-image-to-video-motion-prompt, write-slow-motion-shot-prompt]
args:
  - name: dish
    description: "The dish and its real look: ingredients, plating, the plate or bowl, portion size. Attach a photo of the real dish if you have one."
    type: text
    required: true
  - name: use
    description: "Where it is used: menu (a restaurant menu board or delivery listing), social, ad, or recipe (illustrating a recipe)."
    type: enum
    enum: [menu, social, ad, recipe]
    default: social
  - name: moments
    description: "The moments you want, e.g. 'syrup pour, steam, a fork cutting through'. Leave empty for suggestions."
    type: text
output_contract:
  format: markdown
  sections: [Shot list, Prompts, Physics guards, Accuracy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Food video lives on a few moments: a pour, rising steam, a sizzle, a slice revealing the inside, a cheese pull, a drizzle, a sprinkle. Generated versions fail on physics and continuity: liquid that never fills the glass or overflows from nowhere, a knife that passes through the food without cutting it, food that changes between frames, extra hands. Food stylists shoot each moment as its own short, close shot, with backlight for steam and liquids, a dark background to make steam visible, and slow motion for pours. Hands are the biggest risk, so framing on the food with hands entering from the edge, or no hands at all, works best. If the video advertises a real dish, it must look like what the customer gets: portion, ingredients and garnish.
</context>

<task>
Write food video prompts.

<dish>
{{dish}}
</dish>

Use: {{use}}
{{#moments}}Moments wanted: {{moments}}{{/moments}}

1. **Shot list.** Pick three to five moments suited to the dish and {{use}} (or the ones the user asked for). One action per shot. For each: framing (macro, close, top-down, 45 degrees), lens feel, background, light (backlight or side light for steam and liquid), speed (real time or slow motion) and length.
2. **Prompts.** One prompt per shot, describing the dish exactly as the user gave it and repeating that description word for word in every shot; the single action with a clear start and end state (glass a third full to two-thirds full, knife enters at the top and finishes at the board); what stays still; hands only if needed, entering from the frame edge.
3. **Physics guards.** For each shot, the likely failure and a guard: liquid volume rising steadily, the cut leaving a clean cut face, cheese stretching then breaking, steam rising and dissipating, no food appearing or disappearing.
4. **Accuracy.** For menu, ad or delivery use, a check that the portion, ingredients, garnish and plate match the real dish, and advice to use or start from a photo of the real dish. For recipe use, check the visuals match the recipe's steps and results.
5. Before answering, check that every shot has only one action and that the dish description is identical across shots.
</task>

<constraints>
- Do not exaggerate portions, add ingredients the dish does not have, or show a different dish when it represents real food for sale; say so if asked.
- No tool, model or version names.
- Keep readable labels and logos out of the prompt; add them in the edit.
</constraints>

<output_format>
## Shot list
Table: Shot | Moment | Framing | Light | Speed | Seconds.
## Prompts
Numbered code blocks.
## Physics guards
Table: Shot | Likely failure | Guard.
## Accuracy
Checklist.
</output_format>
