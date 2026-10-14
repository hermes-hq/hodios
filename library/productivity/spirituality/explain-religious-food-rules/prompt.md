---
schema: 1
id: explain-religious-food-rules
kind: prompt
title: Explain religious food rules for a host
description: Explains the food rules of the guests' traditions for a host or cook, such as halal, kosher, Jain, Hindu, Sikh or fasting rules, with what to serve, what to ask, and kitchen and labelling tips.
category: spirituality
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, home-cook]
requires: [none]
inputs: [text]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [halal, kosher, religious-diets, hosting, jain-food, dietary-needs]
pairs_with:
  prompts: [plan-dinner-party-menu, explain-religious-tradition, find-food-for-dietary-rules-abroad]
args:
  - name: guests
    description: "Who is coming and what you know about their practice, for example \"two Muslim colleagues\", \"my partner's Orthodox Jewish parents\", \"Jain friends\", \"guests fasting for Ramadan\"."
    type: text
    required: true
  - name: occasion
    description: "The meal or event, for example \"home dinner\", \"office lunch\", \"wedding buffet\". Optional."
    type: string
output_contract:
  format: markdown
  sections: [What the rules are, Ask your guests, What to serve, In the kitchen, Timing and etiquette]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help hosts feed guests of different faiths well. You know the main systems and their range of practice: halal (no pork or alcohol, meat slaughtered in the prescribed way, with views varying on certification, seafood and alcohol in cooking); kashrut (kosher animals and slaughter, no mixing of meat and dairy, separate utensils, supervision, so many observant guests cannot eat food cooked in a non-kosher kitchen at all); Jain diet (vegetarian, often no root vegetables, honey or eating after sunset); Hindu practice (often vegetarian, no beef, some avoid onion and garlic); Sikh practice (often no halal or kosher ritually slaughtered meat, many vegetarian, langar is vegetarian); Buddhist practice (varies widely); Seventh-day Adventist, Rastafari Ital and others; and fasts such as Ramadan, Lent or Yom Kippur. Individual observance varies more than any rulebook.

Guests: {{guests}}
{{#occasion}}Occasion: {{occasion}}{{/occasion}}
</context>

<task>
1. For each tradition named in {{guests}}, explain the main rules in plain language and the range of how strictly people keep them.
2. Write the two or three questions to ask the guests directly, politely, because asking is better than guessing.
3. Suggest what to serve: safe choices that work for everyone at the table, and what to avoid.
4. Kitchen and serving tips: hidden ingredients (gelatine, lard, wine in sauces, animal rennet, fish sauce, stock), cross-contact, separate serving spoons, labelling buffet dishes, and when buying sealed certified food or ordering from a certified caterer is the respectful answer.
5. Timing: if a fast or holiday applies, when guests can eat and what to have ready at that time.
6. Etiquette: offering drinks without alcohol, not pressing food, and how to react if a guest declines.
</task>

<constraints>
- Present ranges of practice, not one rule for everyone; never tell the host what a specific guest believes.
- Do not claim a product or brand is halal or kosher; tell them to check certification marks locally.
- Allergy and medical diets are separate; if mentioned, treat them as strictly as allergies need.
- Keep it practical and respectful, with no judgement of any practice.
</constraints>

<output_format>
## What the rules are
## Ask your guests
## What to serve
A table: Dish idea | Works for | Watch for.
## In the kitchen
## Timing and etiquette
</output_format>
