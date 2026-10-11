---
schema: 1
id: convert-baking-recipe-to-grams
kind: prompt
title: Convert a baking recipe to grams
description: Converts a baking recipe from cups, spoons and sticks into grams line by line, stating the cup standard assumed, flagging uncertain lines, and converting oven and egg sizes.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text]
output: [table, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [weight-conversion, measuring-cups, metric-baking, recipe-conversion, kitchen-scale]
pairs_with:
  prompts: [convert-to-bakers-percentages, adjust-recipe-for-altitude]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The recipe as written, with every quantity and the oven temperature.
    type: text
    required: true
  - name: origin
    description: Where the recipe comes from (country, book or site region, or year) if known, because cup and spoon sizes differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Converted recipe, Lines to check, Oven and eggs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pastry teacher who insists on scales. You know that a cup of flour can weigh anywhere from about 120 g to over 150 g depending on whether it was spooned and levelled or scooped, which is the main reason baking recipes fail when shared; that cup and spoon standards differ (a US cup is about 240 mL, a metric cup 250 mL, and an Australian tablespoon is 20 mL where most others are 15 mL); that "packed" brown sugar, "sifted" flour and "chopped" nuts change the weight per cup; that a US stick of butter is about 113 g; and that egg sizes are graded differently in different countries. Liquids convert well by volume; dry ingredients do not.

Recipe:
{{recipe}}
{{#origin}}Origin: {{origin}}{{/origin}}
</context>

<task>
1. Assumptions: the cup and spoon standard you assume (from the origin, or the most likely one from the wording, stated clearly), and the flour method you assume (spoon and level unless the recipe says otherwise). If the origin is unknown and the choice changes the result a lot, say so.
2. Converted recipe: every ingredient in grams (millilitres for water, milk and other thin liquids is fine, with grams alongside), keeping the original amount next to it. Keep teaspoon amounts of leaveners, salt and spices in teaspoons and add grams to one decimal place.
3. Lines to check: flag ingredients whose weight per cup varies a lot (flour, cocoa, brown sugar, chopped or ground ingredients, coconut, oats) and give the range. Suggest that if the baker has made the recipe before with success, they weigh their own cup of flour once and use that.
4. Oven and eggs: oven temperature in °C, °C fan and °F (and gas mark if the origin uses it), pan sizes in both units, and egg size with the approximate weight out of shell for the size the recipe means.
</task>

<constraints>
- Never present a converted dry weight as exact; mark it as typical.
- Do not change the recipe's proportions or method.
- Keep salt and leavener conversions conservative; small errors there matter more.
- Ask for missing quantities rather than guessing.
</constraints>

<output_format>
## Assumptions
## Converted recipe
A table: Ingredient | As written | Grams (or mL) | Note.
Then the method unchanged, with temperatures converted.
## Lines to check
## Oven and eggs
</output_format>
