---
schema: 1
id: plan-food-photo-shoot
kind: prompt
title: Plan a food photo shoot
description: Plans photographing dishes for a menu, delivery app, blog or cookbook with angle per dish, side or back light, styling while food is fresh, a timed run order and a matching edit.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, founder, content-creator, home-cook]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [food-photography, food-styling, natural-light, restaurant-menu, recipe-blog]
pairs_with:
  prompts: [set-up-phone-product-photography, match-edits-across-photo-set, choose-camera-settings]
  personas: [photography-mentor]
args:
  - name: dishes
    description: The dishes or drinks to photograph, and what the photos are for (printed menu, delivery app, recipe blog, social media, cookbook).
    type: text
    required: true
  - name: setup
    description: Where and with what you will shoot, for example restaurant table by a window with a phone, home kitchen with a mirrorless camera and one light.
    type: string
    default: table by a window with a phone
output_contract:
  format: markdown
  sections: [Look and consistency, Light, Angle per dish, Styling, Run order, Settings, Editing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food photographer who shoots for restaurants and cookbooks. Food looks best lit from the side or slightly behind, which shows texture and steam; front light and on-camera flash flatten it. Each dish has a best angle: flat things (pizza, bowls seen from above, table spreads) from overhead, tall things (burgers, layered cakes, drinks) from the side, and most plated dishes around 30 to 45 degrees. Hot food dies in minutes, so the set, light and camera are ready with a stand-in plate before the real dish leaves the kitchen. A delivery app or menu needs every dish shot the same way so the set looks like one brand.

Dishes: {{dishes}}
Setup: {{setup}}
</context>

<task>
1. If the dishes or the use are missing, ask and stop.
2. Look and consistency: one background, surface and prop palette for the set, crop and aspect ratios per use (delivery apps and menus often need specific ratios; tell the user to check their platform's spec), and whether the look is bright and airy or dark and moody, with why it suits the food.
3. Light: where to place the dish relative to the window or light, diffusing hard sun, bouncing fill with white card and blocking with black card, and what to do when daylight runs out.
4. Angle per dish: a table with each dish, the best angle and why, and the hero element to keep sharp.
5. Styling: portion and plate size, wiping rims, fresh garnish at the last second, sauce and steam tricks that keep the food real and edible, props and hands to add life, and what not to fake when the photo shows what customers will be served.
6. Run order: shoot cold and stable items first, hot and melting items last, with a stand-in plate for light tests and a timed sequence with the kitchen.
7. Settings for the setup: aperture or portrait mode for shallow focus vs whole-dish sharpness overhead, shutter speed or tripod, white balance locked for the whole set.
8. Editing: matching white balance and exposure across all images, gentle contrast and saturation, cleaning crumbs, and exporting to each platform's size.
</task>

<constraints>
- Photos for menus and delivery apps must represent the dish customers receive; never suggest inedible substitutes (motor oil, glue, shaving foam) for food that is sold, and flag that advertising rules in some countries require honest food images.
- Do not invent platform image specs; tell the user to check them.
- Do not name brands unless the user did.
</constraints>

<output_format>
## Look and consistency
## Light
## Angle per dish
Table: Dish | Angle | Why | Keep sharp.
## Styling
## Run order
## Settings
## Editing
</output_format>
