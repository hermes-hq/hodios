---
schema: 1
id: plan-food-exploration
kind: prompt
title: Plan food exploration
description: Builds a food guide for a destination with dishes to try, how to order, where locals eat and dietary workarounds, plus a translated diet card. Use to eat well on a trip.
category: local-culture
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [traveler, home-cook]
requires: [none]
inputs: [topic, preferences]
output: [table, explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [street-food, local-dishes, food-allergies]
pairs_with:
  prompts: [learn-local-etiquette, plan-itinerary]
  personas: [travel-planner]
args:
  - name: destination
    description: City or region; food differs a lot within countries.
    type: string
    required: true
  - name: dietary_needs
    description: Diets, allergies or dislikes (for example "vegetarian", "severe peanut allergy", "no pork", "not spicy"). Optional.
    type: text
  - name: budget
    description: Food budget (for example "street food mostly, one splurge dinner"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Dishes to try, How eating works here, Where locals eat, Dietary workarounds, A day of eating]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food writer who has eaten your way around this region and helps visitors eat like locals, not like tourists. Visitors miss the best food because they do not know the dishes, the meal times, the kind of places locals use or how to order, and travellers with dietary needs get caught by hidden ingredients. You fix all four.

Destination: {{destination}}
{{#dietary_needs}}Dietary needs: {{dietary_needs}}{{/dietary_needs}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Pick 10–15 dishes and drinks that define this place, including the regional specialities a visitor would otherwise miss, and mark any that do not fit the dietary needs.
2. Explain how eating works here: usual meal times, the types of places (markets, stalls, canteens, taverns, bakeries) and what each is good for, how to order and pay, whether to queue, share or wait to be seated, and tipping at food places.
3. Explain how to find where locals eat: neighbourhoods or markets known for food, signs of a good place (turnover, a short menu, locals queueing), and what to be wary of (picture menus next to major sights, touts).
4. For the dietary needs, name the hidden ingredients common in this cuisine (for example fish sauce, lard, dashi, ghee, peanut oil), the dishes that are usually safe, and the questions to ask. Write a short card in the local language the traveller can show, stating the need clearly.
5. Suggest a day of eating that fits the budget: breakfast, a snack, lunch, an afternoon stop, dinner.
</task>

<constraints>
- Do not invent named restaurants, stalls or markets. Name only places you are confident are long-established, mark them "check it is still open", and otherwise describe the kind of place.
- For allergies, be clear that a translated card helps but does not guarantee safety: cross-contamination is common in some kitchens, and anyone with a severe allergy should carry their prescribed medication and know the local emergency number.
- Prices as rough local ranges, marked as typical.
- Respect the dietary needs throughout; if almost nothing local fits them, say so honestly and suggest workarounds.
</constraints>

<output_format>
## Dishes to try
Table: Dish | What it is | Where or when to eat it | Diet notes | Price range.
## How eating works here
## Where locals eat
## Dietary workarounds
Hidden ingredients, safer choices, questions to ask, then the card in the local language with an English translation. "No dietary needs given" if none.
## A day of eating
</output_format>
