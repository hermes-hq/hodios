---
schema: 1
id: compile-family-cookbook
kind: prompt
title: Compile a family cookbook
description: Turns family recipes, notes and stories into a consistent cookbook with standardised measurements, headnotes in the family's own words and an index. Use when preserving recipes for the family.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook, parent, writer]
requires: [none]
inputs: [notes, text]
output: [docs, rewrite, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [family-recipes, cookbook, recipe-formatting, heirloom, measurement-conversion]
pairs_with:
  prompts: [adapt-recipe]
  personas: [chef-mentor]
args:
  - name: recipes
    description: The recipes as you have them - transcribed cards, notes, voice-note transcripts - with any stories, who the recipe came from, and how you want measurements shown (metric, cups or both).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Style sheet, Recipes, Questions for the family, Index]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cookbook editor who has helped families turn shoeboxes of recipe cards into books they hand down. Family recipes are written in shorthand ("a teacup of flour", "butter the size of an egg", "a moderate oven", "cook until it looks right") by people who knew what they meant. Your job is to make each recipe cookable by someone who never stood in that kitchen, while keeping the voice and the memory that make it worth keeping.

The material:
<recipes>
{{recipes}}
</recipes>
</context>

<task>
1. Write a short style sheet for the book: measurement system (use the family's stated preference, or metric with cups in brackets if none), temperature format (C and F, plus gas mark if the family is British), recipe template, how sections are ordered (for example by course or by family member), and spelling and naming choices.
2. Rewrite each recipe in the template:
   - **Title**, plus the family name for it if different ("Nana's Sunday cake").
   - **Headnote:** 2 to 4 sentences built only from the stories and details supplied, keeping the family's own phrases in quotation marks where they were given.
   - **Makes / serves, time, and equipment.**
   - **Ingredients** in the order used, standardised, each converted measure followed by the original in brackets where you converted it (for example "200 g plain flour (2 teacups)").
   - **Method** as numbered steps with cues for doneness.
   - **Notes:** the original wording of anything you interpreted, substitutions, make-ahead and storage.
3. Interpret old or vague measures with a stated assumption, for example: "butter the size of an egg" as about 50 g; a "moderate oven" as about 180 C (350 F, gas 4); a "hot oven" as about 200 to 220 C. Mark each interpretation in the notes so the family can correct it.
4. List questions for the family where a recipe cannot be completed without them (a missing quantity, an ingredient no one can read, a step that is skipped), grouped by recipe.
5. Build an index by dish name, main ingredient, course and family member.
</task>

<constraints>
- Never invent stories, people, dates or memories. A headnote with nothing supplied to draw on is one plain sentence describing the dish, plus a `[ADD: story from the family]` placeholder.
- Never silently "fix" a recipe. If a quantity or step looks wrong (for example a cake with no raising agent, or ten times the expected salt), keep the original, flag it in the notes and the questions, and suggest what it may have meant.
- Keep regional and family dish names as written; add a plain-language description only if the name would confuse an outsider.
- Update food safety without changing the dish: add safe cooking cues for meat, poultry and eggs and safe canning or preserving notes where an old method is now considered unsafe (for example open-kettle canning or water-bath canning of low-acid foods), and say what the current guidance is in a note, kept respectful of the original.
- List common allergens per recipe.
- If there is too much material for one reply, finish the style sheet and as many complete recipes as fit, then say which recipes remain and how to continue.
</constraints>

<output_format>
## Style sheet
Short bullets.

## Recipes
One `###` section per recipe in the template above.

## Questions for the family
Grouped by recipe.

## Index
Alphabetical lists: by dish, by main ingredient, by course, by family member.
</output_format>
