---
schema: 1
id: write-dish-spec-sheet
kind: prompt
title: Write a dish spec sheet
description: Turns a chef's notes for a dish into a kitchen spec sheet any cook can follow on a busy service - exact quantities, prep and pick-up steps, plating, holding times, allergens and quality checks.
category: hospitality
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [recipe-spec, plating-guide, kitchen-consistency, mise-en-place, allergens, standard-recipe]
pairs_with:
  prompts: [cost-menu-dish, build-allergen-matrix, plan-kitchen-prep-list]
args:
  - name: dish_notes
    description: The chef's notes for the dish - components, quantities (even rough), method, how it is plated and what it should look and taste like. Voice-note transcripts are fine.
    type: text
    required: true
  - name: kitchen
    description: Equipment and stations that matter (for example "combi oven, two fryers, grill station, no salamander"), batch size used for prep, and the menu price if useful. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Dish summary, Components and quantities, Prep, Pick-up on service, Plating, Holding and storage, Allergens, Quality checks, Questions for the chef]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sous chef who writes the kitchen's spec sheets. A spec sheet exists so the dish is the same whoever cooks it: every quantity in grams or millilitres per portion, prep separated from pick-up (what is done before service and what is done to order), cues a cook can see, holding and storage times, and the allergens in every component including sauces, oils and garnishes. Chefs' notes usually skip the steps they do without thinking, such as seasoning amounts, resting times and which pan; those gaps are where dishes drift.

Chef's notes: {{dish_notes}}
{{#kitchen}}Kitchen: {{kitchen}}{{/kitchen}}
</context>

<task>
1. Dish summary: name, one-line description as guests see it, portion size and station.
2. Components and quantities: every component with quantity per portion in metric units, plus batch quantities for prep components (sauces, dressings, garnishes) with yield.
3. Prep: steps for each prep component in order, with times, temperatures and visual cues, and labelling and date rules.
4. Pick-up on service: numbered steps from ticket to pass, with timings so the dish arrives with the rest of the table.
5. Plating: a written plating guide (plate type, position of each element as on a clock face, sauce amount, garnish) and a note to add a reference photo.
6. Holding and storage: how long each prep component keeps and at what storage condition, marked `[confirm with your food safety plan]` where the notes do not say.
7. Allergens: per component, from the ingredients listed; flag compound ingredients (stock, sauces, bought-in items) whose labels must be checked.
8. Quality checks: three to five checks at the pass (temperature, colour, seasoning, portion).
9. Questions for the chef: every gap you had to fill or could not.
</task>

<constraints>
- Do not invent quantities, temperatures or holding times the chef did not give. Put a reasoned suggestion in brackets and list it under Questions for the chef.
- Allergen lists come only from the ingredients named; never state that something is free from an allergen. Point to the venue's allergen matrix and supplier labels.
- Use plain, short imperative steps a cook can read at a glance.
</constraints>

<output_format>
## Dish summary
## Components and quantities
Table: Component | Per portion | Batch | Yield.
## Prep
Numbered per component.
## Pick-up on service
Numbered with timings.
## Plating
Short list.
## Holding and storage
Table: Component | Storage | Keeps for.
## Allergens
Table: Component | Contains | Check label.
## Quality checks
Checklist.
## Questions for the chef
Numbered.
</output_format>
