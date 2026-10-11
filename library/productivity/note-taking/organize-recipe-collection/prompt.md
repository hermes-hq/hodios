---
schema: 1
id: organize-recipe-collection
kind: prompt
title: Organise a recipe collection
description: Brings recipes from screenshots, saved links, handwritten cards and cookbooks into one searchable collection with a standard recipe format, a small tag set and a way to find tonight's dinner.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, build]
role: [home-cook, parent, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [recipe-organising, recipe-box, family-recipes, tagging, cookbooks]
pairs_with:
  prompts: [design-note-tagging-scheme, digitize-paper-notebooks, write-note-templates, process-screenshot-backlog]
args:
  - name: sources
    description: Where your recipes are now, for example "300 screenshots, Instagram saves, Pinterest boards, a box of Gran's cards, 15 cookbooks".
    type: text
    required: true
  - name: tool
    description: Where you want them, for example Notion, Apple Notes, Google Keep, Obsidian, a recipe app you already use, or "not sure".
    type: string
    required: true
  - name: household
    description: Optional - who you cook for and what matters, such as allergies, vegetarian days, quick weeknights, batch cooking.
    type: text
output_contract:
  format: markdown
  sections: [Structure, Recipe template, Tags, Processing order, Screenshots and posts, Keeping it useful, Example searches]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recipe collections scatter because recipes arrive everywhere: screenshots, social media saves, browser bookmarks, emails, handwritten cards, cookbooks. The collection is only useful if the person can answer "what can I make tonight with chicken in 30 minutes?" That needs one home, a standard format (ingredients with quantities, steps, time, servings, source), a few tags people actually filter by (meal type, main ingredient, time, diet needs, "tried and loved"), and a rule for cookbooks, which usually should stay as an index entry (book and page) rather than copying the whole recipe. Untried saved recipes vastly outnumber cooked ones, so a "to try" area with a cull rule keeps the main collection trustworthy. Family recipe cards are irreplaceable: photograph them before handling much, and keep the photo next to the typed version.

Sources: {{sources}}
Tool: {{tool}}
{{#household}}
Household: {{household}}
{{/household}}
</context>

<task>
1. If the tool is "not sure", give two or three suitable kinds of tool with trade-offs in a short list, then design for the simplest one unless they choose.
2. Define the structure: a Tried and loved collection, a To try area, and a Cookbook index.
3. Write the recipe template with source, servings, total time, ingredients with quantities, steps, notes and tags.
4. Propose a tag set of at most about fifteen tags across meal type, main ingredient, time and diet needs from the household details, with allergy tags if relevant.
5. Give a processing order: family cards first (photograph, then type), then the recipes cooked in the last few months, then the rest of the backlog in batches.
6. Explain how to handle screenshots and social posts: transcribe ingredients and steps rather than keeping only the image, and keep the source.
7. Give a cull rule for the To try area and a way to promote recipes after cooking them.
8. Show three example searches or filters the person will use weekly.
</task>

<constraints>
- Keep the source with every recipe; do not suggest republishing other people's recipes publicly.
- Do not change quantities or steps when transcribing.
- Allergy tags are a convenience, not a guarantee; remind them to check ingredient labels.
- No paid app recommendations unless they already use one.
</constraints>

<output_format>
## Structure
## Recipe template
## Tags
## Processing order
## Screenshots and posts
## Keeping it useful
## Example searches
</output_format>
