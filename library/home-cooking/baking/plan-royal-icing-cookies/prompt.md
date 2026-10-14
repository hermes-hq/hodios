---
schema: 1
id: plan-royal-icing-cookies
kind: prompt
title: Plan royal icing cookies
description: Plans decorated cut-out cookies with royal icing, with a no-spread dough, icing consistencies by count, colour mixing amounts, a decorating order per design, drying times and a timeline.
category: baking
version: 1.0.0
status: incubating
stage: [plan, design]
role: [home-cook, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [royal-icing, cookie-decorating, cut-out-cookies, piping, edible-gifts]
pairs_with:
  prompts: [plan-cookie-baking-day, plan-gingerbread-house, pack-baked-goods-for-shipping]
  personas: [baking-instructor]
args:
  - name: designs
    description: The occasion, the shapes and designs you have in mind, colours, and how many cookies.
    type: text
    required: true
  - name: skill
    description: Your decorating experience.
    type: enum
    enum: [beginner, intermediate, advanced]
    default: beginner
  - name: deadline
    description: When the cookies must be finished, and whether they will be wrapped individually or stacked. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Design plan, Cookie dough, Icing consistencies, Colours, Decorating order, Drying and packing, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cookie decorator who teaches royal icing. Decorated cookies need a dough that holds its shape: no or little leavening, chilled after cutting, rolled to an even thickness between guides. Royal icing is made with meringue powder or pasteurised egg white for safety, and its consistency is everything: stiff for borders, details and gluing, a medium "piping" consistency for outlines, and a runny "flood" consistency for filling, usually judged by how many seconds a line drawn through it takes to disappear (often around 10 to 20 seconds for flood). Wet-on-wet designs are added while the flood is still wet; details on top go on after a crust forms, usually after an hour or more; and full drying before stacking or bagging usually takes overnight or longer, slower in humid weather. Deep colours such as red and black need lots of gel colour and darken as they rest, so they are mixed ahead. Dark colours bleed into light ones if the base layer is not dry.

Designs: {{designs}}
Skill: {{skill}}
{{#deadline}}Deadline: {{deadline}}{{/deadline}}
</context>

<task>
1. Design plan: for each design, a short description of the layers, matched to {{skill}}; simplify any design above the skill level while keeping the idea, and suggest practising one technique on parchment first.
2. Cookie dough: a no-spread cut-out recipe in grams with cups as an aside, rolling thickness, chilling, bake time with cues (set, not browned), and cooling fully before icing.
3. Icing consistencies: a recipe with meringue powder, the stiff, piping and flood consistencies with a count test for each, and how to adjust with water or icing sugar.
4. Colours: each colour with the estimated share of icing it needs (for example "white 40 percent of the batch"), which deep colours to mix a day ahead, and how to keep icing covered to stop crusting.
5. Decorating order: per design, the order of outline, flood, wet-on-wet, crust wait, details, with waiting times between steps.
6. Drying and packing: drying times before stacking or bagging, a fan or dehumidifier tip for humid weather, and how to avoid colour bleed and butter bleed (blotchy spots from fat in the cookie).
7. Timeline: day-by-day plan to the deadline.
</task>

<constraints>
- No raw egg white unless pasteurised; meringue powder is the default.
- Only food-safe decorations on the cookies: edible lustre and food colours, not craft glitter or non-toxic but inedible dusts; say to check labels.
- Present counts and drying times as ranges that depend on humidity.
- Fit the skill level; do not hand a beginner a design that needs advanced piping without a simpler version.
</constraints>

<output_format>
## Design plan
## Cookie dough
## Icing consistencies
A table: Consistency | Used for | Count test | Adjust.
## Colours
A table: Colour | Share of icing | Mix when | Notes.
## Decorating order
## Drying and packing
## Timeline
A table: Day | Tasks.
</output_format>
