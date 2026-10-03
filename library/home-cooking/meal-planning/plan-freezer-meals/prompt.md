---
schema: 1
id: plan-freezer-meals
kind: prompt
title: Plan a freezer meal stash
description: Plans a freezer meal batch for new parents, busy weeks or carers, with dishes that freeze well, labels, storage times and reheating steps. Use before a cook-ahead day.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [freezer-meals, batch-cooking, new-parents, carers, food-storage]
pairs_with:
  prompts: [plan-meal-prep-session, plan-weekly-meals, check-food-safety]
  personas: [chef-mentor]
args:
  - name: household
    description: Who the meals are for and why (for example "two adults with a newborn due in March", "my dad who lives alone and can only use a microwave"), with likes, dislikes, diets, allergies and portion sizes.
    type: text
    required: true
  - name: meal_count
    description: How many meals to stock, counting one meal as one sitting for the household.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Assumptions, Freezer menu, Cook-day plan, Shopping list, Labels, Using the stash]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a meal planner who builds freezer stashes for new parents, shift workers and family carers. A good stash is not twelve random recipes: it is food that survives freezing, reheats easily for someone tired or with little kitchen help, comes in the right portion sizes, and is labelled so anyone can use it without asking.

Household:
<household>
{{household}}
</household>

Meals to stock: {{meal_count}}
</context>

<task>
1. Read the household's situation and set the design rules for this stash. Examples: new parents need food eaten one-handed, reheated in one step, and portions that stretch to visitors; an older person living alone needs single portions, microwave-only reheating, soft textures if chewing is hard, and clear large-print labels; a busy family needs bigger trays and kid-friendly options.
2. Choose dishes that freeze well (stews, curries, chilli, soups, ragù and other pasta sauces, casseroles, lasagne and other baked pasta, meatballs, burritos, pies, savoury muffins, porridge or breakfast portions). Avoid or adapt the ones that freeze badly: cooked potato chunks in soups, cream sauces that split, cooked pasta in soups, crisp coatings, raw salad vegetables, mayonnaise. Aim for variety across proteins, cuisines and textures; reuse two or three base mixes to save time.
3. Reach {{meal_count}} meals with a mix of large batches and smaller ones, and say how many cooking sessions it takes.
4. Write a cook-day plan: order of cooking, what shares prep, cooling, portioning and freezing.
5. Write a shopping list grouped by store section, plus containers, bags and labels needed.
6. Write a ready-to-copy label for each dish: name, date made, portions, best within, allergens, reheat instructions in one line.
7. Explain how to use the stash: freezer map, first in first out, thawing and reheating.
</task>

<constraints>
- Food safety: cool food quickly in shallow containers and freeze within about 2 hours of cooking; freezer at -18 °C/0 °F or colder; thaw in the fridge overnight (or reheat from frozen where the dish allows); reheat until steaming hot throughout, at least 74–75 °C/165 °F; reheat once only. Follow local food-safety advice where it differs.
- Storage times are about quality, not safety: most cooked dishes are best within about 2–3 months; soups and stews up to about 3 months. Say this.
- For anyone on a texture-modified diet for swallowing difficulties, say the meals must match the consistency level set by their speech and language therapist and do not guess it.
- Respect all allergies strictly; list allergens on every label.
- If the household description leaves out portions, diet or reheating equipment, state your assumptions in the first section rather than asking a long list of questions.
- Keep each dish's method to two or three lines; offer to write any one in full.
</constraints>

<output_format>
## Assumptions
Bullets: portions, equipment, freezer space, diet.

## Freezer menu
Table: Dish | Meals (portions) | Why it suits this household | Freeze in | Best within | Reheat.

## Cook-day plan
Numbered steps or a short timeline per session.

## Shopping list
By store section, plus containers and labels.

## Labels
One copyable block per dish.

## Using the stash
Freezer map, rotation, thawing and reheating rules.
</output_format>
