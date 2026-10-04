---
schema: 1
id: script-filmed-recipe
kind: prompt
title: Script a recipe video
description: Scripts a recipe video for a food creator, café or cooking teacher, with a mise en place shot list, on-screen quantities, the hero shot and short vertical and long tutorial cuts.
category: video
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator, home-cook, teacher]
subject: [hospitality]
requires: [none]
inputs: [text, document]
output: [script, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [recipe-video, overhead-shots, mise-en-place, hero-shot, vertical-video]
pairs_with:
  prompts: [write-short-form-script, write-tutorial-video-script, plan-video-shoot]
args:
  - name: recipe
    description: The recipe as you cook it - ingredients with quantities, method, timings, pan sizes, yield and any tips. Paste it as written.
    type: text
    required: true
  - name: format
    description: Which cuts to script - a 60-second vertical, a long tutorial, or both.
    type: enum
    enum: [short, long, both]
    default: both
  - name: kit
    description: Optional. Cameras, overhead rig, phone only, lighting, and whether there is a presenter on camera.
    type: string
    default: one phone, overhead and side angles
output_contract:
  format: markdown
  sections: [Prep list, Shot list, Short version, Long version, Silent-view check, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan recipe videos the way a food stylist and editor would together. Viewers decide in a second whether a dish is worth it, then want to cook it without pausing every few seconds. Recipe videos fail when ingredients appear without quantities, steps happen off camera, the finished dish appears only at the end, and the short cut cannot be followed with the sound off. Filming everything already measured (mise en place) is what makes a clean edit possible.

Cuts: {{format}}. Kit: {{kit}}.
</context>

<task>
<recipe>
{{recipe}}
</recipe>

1. Check the recipe first: every ingredient used in the method appears in the list with a quantity, every step has a time or doneness cue (colour, texture, temperature), and the yield is stated. List gaps under Questions; do not fill them.
2. Prep list: everything to weigh into bowls before filming, props, a cleaned-down surface, a second finished portion for the hero shot, and safety items (separate boards for raw meat, hand-washing shown or implied).
3. Shot list: one row per step with angle (overhead for assembly and ingredients, side or 45 degrees for pours, sizzle, rise and texture), the action, the on-screen text and rough seconds. Include the hero shot (the bite, cut, pour or pull) and decide where it appears.
4. Short version (about 60 seconds, vertical 9:16): hero shot in the first 2 seconds, then steps at 2-4 seconds each, quantities on screen in large text inside the safe area away from the bottom and right edge, a final plated shot and one line pointing to the full recipe. Merge or skip steps only where the viewer can still cook it from the written recipe.
5. Long version: intro of under 20 seconds that shows the result and says why the recipe works, ingredients shot with quantities, steps with the reason behind the technique, one common mistake and how to fix it, substitutions the creator has tested, storage, and the ending.
6. Silent-view check: confirm every quantity, temperature, time and key warning appears as on-screen text, not only in speech.
</task>

<constraints>
- Use the recipe as given. Never change quantities, times or temperatures, or add substitutions the creator has not tested; suggest them as questions instead.
- Name common allergens present (for example nuts, gluten, dairy, egg, sesame, fish, shellfish) in an on-screen note; do not claim a dish is allergen-free.
- Do not state food-safety temperatures or times unless the recipe gives them; if raw meat, fish or eggs are involved and no doneness check is given, flag it.
- If a format is not requested, write "Not requested" under that heading.
- If the recipe is missing quantities or the method, ask for them and stop.
</constraints>

<output_format>
## Prep list
Bullets grouped by bowls and props, then safety items.

## Shot list
Table: # | step | angle | action | on-screen text | seconds.

## Short version
Table: seconds | visual | on-screen text | audio. Total near 60 seconds.

## Long version
Section beats with timings, voice-over or presenter lines, and visual notes.

## Silent-view check
Checklist of every quantity, time, temperature and warning and where it appears.

## Questions
Gaps in the recipe and choices for the creator.
</output_format>
