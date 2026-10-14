---
schema: 1
id: cook-dried-beans
kind: prompt
title: Cook dried beans and pulses
description: Explains how to cook a specific dried bean, chickpea or lentil from scratch, with soaking, the boil needed for safety, stovetop or pressure cooker times, salting, doneness and storing a batch.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
invocation: both
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [beans, pulses, legumes, chickpeas, pressure-cooker, batch-cooking]
pairs_with:
  prompts: [convert-recipe-for-appliance, troubleshoot-recipe, preserve-food-safely]
  personas: [chef-mentor]
args:
  - name: beans
    description: The bean or pulse and how much (for example "500 g dried chickpeas", "red kidney beans", "a bag of brown lentils"), and how old they might be.
    type: text
    required: true
  - name: plan
    description: What they are for (hummus, chilli, salad, soup), your equipment (pot, pressure cooker, slow cooker), and whether you forgot to soak. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Soak or not, Safety step, Cook, Is it done, Store and use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cook who makes a pot of beans every week. Dried beans are cheaper and taste better than tinned, but they vary: lentils and split peas need no soaking and cook in 15 to 45 minutes; chickpeas and most large beans benefit from an overnight soak or a quick soak (boil a few minutes, then stand an hour), which shortens cooking and helps even texture. Red kidney beans, and to a lesser degree some other beans, contain a natural toxin (phytohaemagglutinin) that causes severe vomiting if they are undercooked; a vigorous boil for at least 10 minutes destroys it, and slow cookers on low may never get hot enough, so kidney beans must be soaked, boiled hard first and then cooked through. Old beans may never soften; hard water and acid (tomatoes, vinegar) added too early slow softening; salt in the soak or cooking water seasons the inside and does not stop softening in normal amounts despite the myth. A pinch of bicarbonate of soda helps very soft results for hummus. Pressure cookers cut times hugely but foaming pulses can block valves, so the manufacturer's fill limits matter.

Beans: {{beans}}
{{#plan}}Plan: {{plan}}{{/plan}}
</context>

<task>
1. Soak or not: whether this pulse needs soaking, how long, quick-soak option if they forgot, and the water amount.
2. Safety step: for red kidney beans and other beans where it applies, the hard boil for at least 10 minutes and why; say plainly if their planned method (slow cooker on low, sprouting raw) is unsafe for this bean.
3. Cook: steps and time ranges for their equipment, water level, salting, when to add acid, and skimming foam; for pressure cookers, fill limits and natural release per the manufacturer.
4. Is it done: tests (squash against the roof of the mouth, taste several, creamy centre) and what to do if they stay hard.
5. Store and use: cooling quickly, keeping beans in their cooking liquid, fridge and freezer times, freezing in tin-sized portions, and using the liquid (aquafaba from chickpeas).
</task>

<constraints>
- Never suggest cooking red kidney beans in a slow cooker from raw without the hard boil first, or eating them undercooked.
- Give times as ranges and say age and variety change them.
- Do not repeat the myth that salt stops beans softening.
- Mention that a sudden switch to lots of pulses can cause wind and that increasing gradually helps, briefly.
</constraints>

<output_format>
## Soak or not
## Safety step
## Cook
Numbered.
## Is it done
## Store and use
</output_format>
