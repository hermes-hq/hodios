---
schema: 1
id: plan-bake-sale
kind: prompt
title: Plan a bake sale
description: Plans the baking for a school, club or charity bake sale, with a menu of bakes that portion and travel, quantities, a baker sign-up list, allergen labels, packaging and simple pricing to check.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bake-sale, fundraising-event, allergen-labels, volunteer-bakers, school-events]
pairs_with:
  prompts: [plan-cookie-baking-day, pack-baked-goods-for-shipping]
  personas: [baking-instructor]
args:
  - name: event
    description: Who the sale is for, where and when, expected number of visitors, how many volunteer bakers, and any rules from the school, venue or organiser (for example no nuts).
    type: text
    required: true
  - name: goal
    description: How much you hope to raise, if anything specific. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Menu and quantities, Baker sign-up, Labels and allergens, Packaging and display, Pricing, On the day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced parent volunteer who has run many bake sales. The bakes that sell and survive are the ones that portion cleanly, can be eaten by hand, hold up at room temperature for hours, and look generous: traybakes cut into squares, cupcakes, cookies, flapjacks or granola bars, brownies, and loaf cake slices. Cream-filled or chilled items need a fridge and are best avoided. Quantity planning starts from expected visitors and a rough share who buy, and most bake sales end with either a sellout in the first hour or a pile of leftovers, so a mix of item sizes and a plan for late-day discounts helps. Allergens are the biggest worry: many schools ban nuts, and organisers or local food rules may require ingredient or allergen information for each item; a home kitchen cannot guarantee anything is free of traces.

Event: {{event}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Menu and quantities: a menu of bakes that suit the event and its rules, with portions per batch and total portions. Base totals on expected visitors with a stated assumption (for example "about 1.5 items per visitor"), and flag if the goal and the quantities do not match.
2. Baker sign-up: a sign-up table assigning bakes to volunteers so the menu is covered without five tins of the same brownies, plus a short message to volunteers with the drop-off time, portion size, packaging and labelling rules.
3. Labels and allergens: a label template for every item (name, baker or batch, main allergens, "may contain" line, made on date) and how to collect ingredient information from volunteer bakers. Say which allergens to list according to the local rules, and tell the organiser to check the school or venue policy and any local food rules for charity sales.
4. Packaging and display: individual wrapping or bags, tongs and gloves, keeping allergen-free items separate and clearly marked, covers against flies and sun.
5. Pricing: a simple price ladder using round amounts for easy change, with a note that prices should be checked against what families locally expect; do not invent local prices, give relative tiers.
6. On the day: float and payment options to check, staffing in shifts, a late-day discount, and what to do with leftovers.
</task>

<constraints>
- Follow any rules in the event description, such as a nut ban, strictly in the menu.
- Do not state legal labelling requirements as fact for a place; tell the organiser to check them.
- Never promise any item is allergen-free; label honestly.
- Avoid bakes that need refrigeration unless a fridge is confirmed.
</constraints>

<output_format>
## Menu and quantities
A table: Bake | Per batch | Batches | Portions.
## Baker sign-up
A table, then the volunteer message.
## Labels and allergens
## Packaging and display
## Pricing
## On the day
A checklist.
</output_format>
