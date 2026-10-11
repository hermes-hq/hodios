---
schema: 1
id: tune-cookie-texture
kind: prompt
title: Tune a cookie's texture
description: Changes a cookie recipe toward the texture you want (chewier, crisper, thicker, flatter, softer) by adjusting sugar, fat, flour, eggs, leavening, rest and bake, one lever at a time with a test plan.
category: baking
version: 1.0.0
status: incubating
stage: [build, verify]
role: [home-cook]
requires: [none]
inputs: [text, preferences]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cookie-texture, recipe-testing, chewy-cookies, cookie-spread, baking-science]
pairs_with:
  prompts: [plan-cookie-baking-day, convert-baking-recipe-to-grams, calibrate-home-oven]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The cookie recipe you use now, with amounts and method (creamed or melted butter, chill time, oven temperature and time).
    type: text
    required: true
  - name: result
    description: What the cookies are like now and what you want instead, for example "flat and greasy, I want thick and chewy", "too cakey, I want crisp edges".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Levers, Adjusted recipe, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baker who develops cookie recipes by testing. Cookie texture comes from a handful of levers that interact. More white sugar makes cookies spread and crisp; more brown sugar keeps them moist and chewy. Melted butter gives denser, chewier cookies; creamed butter traps air for a lighter, cakier rise; warm, soft dough spreads more. Higher-protein flour gives more chew, and more flour overall makes cookies thicker and drier. Extra yolks add richness and chew; extra whites dry and puff. Baking soda encourages spread and browning; baking powder gives lift and a cakier crumb. Chilling or resting the dough reduces spread and deepens flavour. Oven temperature and time change the balance between set edges and a soft centre, and an inaccurate oven can undo every change. The disciplined way is to change one lever at a time and bake a small test batch beside a control.

Recipe:
{{recipe}}
Now and wanted: {{result}}
</context>

<task>
1. Diagnosis: from the recipe and the description, the most likely causes of the current texture, ranked, with the evidence from the recipe (for example a high white-to-brown sugar ratio, melted warm butter and no chill causing spread). Ask about the oven's accuracy and the butter temperature if they could be the cause.
2. Levers: three to five changes that move toward the wanted texture, ranked by expected effect, each with the amount (in grams and as a share of the recipe) and what side effects to expect.
3. Adjusted recipe: the full recipe with the first one or two changes applied, in grams with the original units alongside, and the method changes marked.
4. Test plan: bake a control and the adjusted dough side by side in small batches, what to change if the first test overshoots, and what to record (spread diameter, thickness, edge and centre texture after cooling).
</task>

<constraints>
- Change as few things as possible per test, and say which change is responsible for which effect.
- Do not invent a different recipe; adjust the baker's own.
- Judge texture after cooling, because cookies firm as they cool; say so.
- If raw dough is to be eaten (for example as a treat while testing), note the risks of raw flour and raw egg.
</constraints>

<output_format>
## Diagnosis
## Levers
A table: Change | Amount | Expected effect | Side effects.
## Adjusted recipe
## Test plan
A checklist, then a record table: Batch | Change | Spread | Thickness | Texture cooled.
</output_format>
