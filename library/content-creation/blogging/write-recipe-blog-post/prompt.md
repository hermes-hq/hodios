---
schema: 1
id: write-recipe-blog-post
kind: prompt
title: Write a recipe blog post
description: Writes a recipe post readers can cook from, with a short intro, a jump to the recipe card, weights and volumes, photo notes, substitutions, storage and fixes, keeping the tested recipe unchanged.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, home-cook]
subject: [hospitality]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [recipe-card, food-blogging, substitutions, baking-fixes, measurements]
pairs_with:
  prompts: [adapt-recipe, write-article-headlines-and-standfirsts]
args:
  - name: recipe
    description: Your tested recipe exactly as you make it - ingredients with amounts, method, pan size, oven temperature and time, servings, and anything you know about substitutions, storage and what goes wrong.
    type: text
    required: true
  - name: story_notes
    description: A few lines about why you make this dish or where it comes from, if you want a personal touch. Optional.
    type: text
  - name: units
    description: How to show quantities. "both" gives metric weights with cup or spoon measures alongside.
    type: enum
    enum: [metric, us-cups, both]
    default: both
output_contract:
  format: markdown
  sections: [Recipe post, Recipe card, Check before publishing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A food blogger, café or home cook is publishing their own tested recipe. Readers arrive from search, often in the kitchen, often on a phone, and want to know quickly whether this recipe suits them and then cook from it. Recipe posts frustrate readers when a long life story sits between them and the ingredients, when quantities are only in cups (or only in grams), when steps hide temperatures and times, and when the post is silent about the mistakes people actually make. The writer's recipe has been tested; changing amounts or steps in the write-up breaks it.

Units: {{units}}
</context>

<task>
<recipe>
{{recipe}}
</recipe>

{{#story_notes}}
<story_notes>
{{story_notes}}
</story_notes>
{{/story_notes}}

1. Open with a "Jump to recipe" line, then an intro under 120 words that tells the reader what makes this version worth making (texture, time, method, occasion), who it suits, and any key equipment. Use the story notes for one or two sentences of personality, not more.
2. Add "Why this works" (three bullets on the technique choices actually in the recipe) and "Ingredients notes" covering only ingredients where a choice matters (type of flour, fat content, fresh or dried).
3. Write the method as numbered steps, one action each, with temperatures, times and visual or texture cues ("until the edges are golden and the centre still wobbles"). Mark where a step photo would help most as [Step photo: what to show].
4. Give substitutions and variations only from the writer's notes; where the notes say nothing, list common questions to answer from their own testing as [test first], not invented swaps.
5. Add storage and make-ahead, and a troubleshooting section ("Why is my cake dense?") built from the writer's notes on what goes wrong.
6. Build the recipe card: title, yield, prep, cook and total time, ingredients in order of use with quantities in the requested units, equipment, method steps, and allergens present as listed in the ingredients.
7. Unit conversion: if converting, use weight-based equivalents for the specific ingredient (flour and sugar differ per cup), round sensibly, and mark every converted figure with an asterisk and a note that the original measurement is the tested one.
</task>

<constraints>
- Never change the writer's amounts, temperatures, times or steps. If something looks wrong (an oven temperature or bake time that seems off, missing salt, a quantity that does not match the pan), flag it in Check before publishing and do not fix it silently.
- Do not invent nutrition data, cost per serving or claims like "healthy", "gluten-free" or "keto" unless stated by the writer.
- Food safety: keep any safe cooking temperatures, chilling and storage times the writer gives; where storage times are missing, suggest checking an official food safety source rather than inventing them.
- If the recipe lacks amounts, method or servings, ask for them and stop.
</constraints>

<output_format>
## Recipe post
The full post as described, with headings: intro, Why this works, Ingredients notes, Method, Substitutions and variations, Storage and make-ahead, Troubleshooting.

## Recipe card
Structured as described, ready for a recipe card plugin or copy.

## Check before publishing
Bullets: flagged issues in the original, converted figures to check, photos to take, allergens listed.
</output_format>
