---
schema: 1
id: find-food-for-dietary-rules-abroad
kind: prompt
title: Find food for dietary rules abroad
description: Plans eating well abroad while keeping halal, kosher, vegetarian, vegan or other dietary rules, with dishes that fit, hidden ingredients, a show card, search tactics and fallbacks.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [halal, kosher, vegetarian, vegan, dietary-rules, eating-abroad]
pairs_with:
  prompts: [plan-travel-with-food-allergy, decode-foreign-menu, plan-food-exploration]
  personas: [travel-planner]
args:
  - name: diet
    description: The rule you keep and how you keep it, for example "halal, no alcohol in cooking", "kosher, meat and dairy separate, Shabbat observant", "vegan", "Jain", "vegetarian but eat eggs", "no pork or beef".
    type: string
    required: true
  - name: destination
    description: Country, region or cities you are visiting.
    type: string
    required: true
  - name: strictness
    description: strict means certified or verified only and no shared cooking surfaces; flexible means you are happy with ingredients that fit even if not certified.
    type: enum
    enum: [strict, flexible]
    default: strict
output_contract:
  format: markdown
  sections: [What to expect, Dishes that usually fit, Hidden ingredients to ask about, Show card, Finding places, Fallbacks, Travel days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Keeping a dietary rule abroad fails less on the obvious items than on the hidden ones: fish sauce or shrimp paste in "vegetable" dishes, chicken or pork stock in soups and rice, lard in pastry and beans, bonito flakes in Japanese broths, wine and mirin in sauces, gelatin and animal rennet in sweets and cheese, ghee where butter is not expected, eggs in noodles, and shared fryers. Words also travel badly: "vegetarian" can include fish or chicken stock in some places, and halal or kosher certification varies by certifier. Explaining the reason, religious or ethical, often gets a better response from cooks than a list of banned items. You plan meals for this rule at this destination. Medical allergies are a different, higher-stakes task and belong to an allergy-specific plan.

Diet: {{diet}}
Destination: {{destination}}
Strictness: {{strictness}}
</context>

<task>
1. If the diet is ambiguous in ways that change the plan (for example halal with or without certified meat, vegetarian with or without eggs, kosher level of observance), state the interpretation you are using and invite correction, rather than asking first.
2. What to expect: how easy this diet is at {{destination}}, where it is easiest (cities, regions, communities, cuisines) and where it is hard. Say where you are unsure.
3. Dishes that usually fit: local dishes that are commonly compatible, each with a caveat on what to check. At strict, prefer dishes that are reliably compatible by tradition.
4. Hidden ingredients for this cuisine and diet, with the local word for each so they can ask.
5. Show card: a short card in the local language that explains the rule and the reason in a sentence, what they cannot eat including hidden items, and a thank-you, plus an English version. Keep it polite and simple enough for a busy kitchen.
6. Finding places: search terms in the local language and English, the kinds of places and communities that usually cater for this diet, certification marks to look for and how to verify them, and types of apps or maps that list such places, without promoting a brand.
7. Fallbacks: supermarket staples, self-catering accommodation, packing some foods (check customs rules for bringing food in), and how to handle a meal as a guest in a home.
8. Travel days: requesting special meals from the airline in advance, rail and road food options.
9. Before writing, check that every dish recommended is genuinely compatible with the stated interpretation, or carries a caveat.
</task>

<constraints>
- If the user mentions an allergy or medical reason, say that allergy safety needs a dedicated allergy plan and a doctor's advice, and do not treat this plan as allergy-safe.
- Respect the rule as the user describes it; do not argue about religious interpretation.
- Do not invent local words, dishes or certification bodies; say when you are unsure.
- No brand promotion.
</constraints>

<output_format>
## What to expect
Three to five lines, including your interpretation of the diet.

## Dishes that usually fit
Table: Dish | Local name | Usually fits because | Check.

## Hidden ingredients to ask about
Table: Ingredient | Local word | Where it hides.

## Show card
Local language, then English.

## Finding places
Bullets.

## Fallbacks
Bullets.

## Travel days
Bullets.
</output_format>
