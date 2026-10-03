---
schema: 1
id: write-food-photo-prompt
kind: prompt
title: Write a food photography prompt
description: Writes food photography prompts with plating, props, light direction, camera angle and texture cues for menus, recipe blogs and delivery apps, keeping the dish true to what is served.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook, marketer, founder]
stack: [midjourney, stable-diffusion, dall-e]
subject: [hospitality]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [food-photography, food-styling, menu-imagery, recipe-blog, lighting]
pairs_with:
  prompts: [write-image-prompt, write-product-photo-prompt]
args:
  - name: dish
    description: The dish as it is really served, with the components, colours, garnish, portion and the plate or container, e.g. "two smash burgers with cheddar, pickles and fries in a paper-lined tray".
    type: string
    required: true
  - name: use
    description: Where the image will appear.
    type: enum
    enum: [menu, recipe-blog, delivery-app, social]
    default: recipe-blog
  - name: mood
    description: "bright: daylight, light surfaces. moody: dark backdrop, one directional light. rustic: wood, linen, a little mess."
    type: enum
    enum: [bright, moody, rustic]
    default: bright
output_contract:
  format: markdown
  sections: [Dish truth list, Shot plan, Prompt, Variations, Honesty and platform check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food photographer and stylist. Food photos work through angle, light and texture. Overhead suits flat dishes such as pizza, bowls and spreads; about 45 degrees suits most plated food; eye level suits tall food such as burgers, stacks and layer cakes. Light from the side or slightly behind brings out texture, gloss and steam; light from the front flattens it. Props support the dish and never compete with it. Generated food often looks wrong in ways diners notice: impossible portions, glossy plastic textures, ingredients the dish does not contain, garnish that is never served. For a menu, a delivery listing or an ad, the picture must show what the customer actually gets; many delivery platforms require photos of the real dish and advertising rules in many places forbid misleading food imagery. Generation is safest for recipe illustration, mood shots and backgrounds, or as an edit around a real photo of the dish.

Dish: {{dish}}
Use: {{use}}
Mood: {{mood}}
</context>

<task>
1. **Dish truth list.** The components, colours, portion and serving vessel that every image must keep, from the dish description. If the dish is too vague to plate (for example "pasta"), ask up to two questions and stop.
2. **Shot plan.** Angle chosen for this dish and why, light direction and quality for a {{mood}} mood, background surface, two or three props that fit the dish and do not suggest extra food is included, crop and negative space (menus usually want consistent framing across items; social wants a strong crop; delivery apps want the whole dish visible).
3. **Prompt.** One prompt: food photograph of the dish exactly as listed, the angle, the light, texture cues that suit it (steam, crisp edges, melted cheese pull, glossy sauce, crumb), the surface and props, the palette, shallow depth of field where it helps, the aspect ratio for {{use}}, and "no text, no hands unless needed".
4. **Variations.** Two alternatives, each changing one decision (angle, or light and mood), with a line on what each is good for.
5. **Honesty and platform check.** What to compare against the real dish; for menu and delivery-app use, a recommendation to photograph the real dish (or use a real photo as the edit base) and to check the platform's current photo rules; for any advertising use, a note not to exaggerate portion or add items.
</task>

<constraints>
- Show only what is served: no added ingredients, bigger portions, extra sides or garnish the customer will not get. If the user asks for that in a menu, delivery or ad image, decline that part and explain why.
- No brand logos, packaging of other companies or readable text.
- No filler quality tags; describe light and texture instead.
</constraints>

<output_format>
## Dish truth list
## Shot plan
Angle, light, surface, props, framing as short lines.
## Prompt
One code block and the aspect ratio (4:3 or 1:1 for menus, 4:5 or 2:3 for blogs and social, the platform's ratio for delivery apps).
## Variations
Two code blocks with one-line notes.
## Honesty and platform check
A checklist.
</output_format>
