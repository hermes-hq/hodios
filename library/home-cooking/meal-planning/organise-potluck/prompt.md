---
schema: 1
id: organise-potluck
kind: prompt
title: Organise a potluck
description: Organises a potluck with a balanced sign-up list sized to the guest count, dietary and allergen labels, a serving-gear checklist, food safety rules and a message to send to guests.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [potluck, hosting, sign-up-sheet, allergen-labels, food-safety, community-events]
pairs_with:
  prompts: [scale-recipe-for-crowd, plan-barbecue-cook, design-cocktail-menu]
  personas: [meal-planning-coach]
args:
  - name: event
    description: The occasion, date and time, place (home, office, park, hall), facilities (fridge, oven, power sockets) and what the host will provide.
    type: text
    required: true
  - name: guests
    description: Expected number of people eating, including children.
    type: number
    required: true
  - name: dietary_needs
    description: Known diets and allergies among guests. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sign-up list, Host provides, Labels, Serving gear, Food safety, Message to guests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You organise community potlucks, office lunches and neighbourhood parties. Unplanned potlucks end with six bags of crisps, four pasta salads, no main dish, nothing a vegan or someone with a nut allergy can trust, and a dish of chicken sitting in the sun for four hours. You fix this with slots: a sign-up list sized to the crowd, a label for every dish, the gear people forget, and simple food safety rules everyone is told in advance.

Event: {{event}}
Guests: {{guests}}
{{#dietary_needs}}Dietary needs: {{dietary_needs}}{{/dietary_needs}}
</context>

<task>
1. Sign-up list: slots by category, sized for {{guests}} people, as a starting rule each dish serving about 8–10 people as a taste alongside others. A balanced split is roughly: mains 25–30%, sides and salads 30–35%, breads and starters 10–15%, desserts 15–20%, drinks and ice the rest. Show the slot counts, a suggested serving size per dish ("serves 10"), and at least one slot per dietary need (for example a vegan main, a gluten-free side). Adjust for the event: more finger food for a standing office party, more mains for a dinner.
2. Host provides: what the host should cover so the essentials are not left to chance (a main or two, ice, water, plates, cups, cutlery, napkins, bin bags, serving spoons spares), based on the event text.
3. Labels: a label template for each dish with dish name, cook's name, diet (vegan, vegetarian, gluten-free as cooked) and "Contains:" with the common allergens (cereals with gluten, milk, egg, nuts, peanuts, sesame, soy, fish, shellfish, mustard, celery). Advise guests with serious allergies to ask the cook and to treat home-cooked food as possibly cross-contacted.
4. Serving gear checklist: one serving utensil per dish, trivets, extension leads for slow cookers, ice tubs for cold dishes, foil and containers for leftovers, a table layout that separates allergen-free dishes from the rest.
5. Food safety rules for this event: transport hot food hot (insulated bags, slow cooker) and cold food cold (cool box, ice packs); keep hot food at 60°C (140°F) or above and cold food at 5°C (41°F) or below; perishable food out for no more than 2 hours, 1 hour above 32°C (90°F); a set time to pack food away.
6. Message to guests: a friendly invitation or reminder with the sign-up link placeholder [SIGN-UP LINK], date, time, what to bring, labelling and serving-spoon request, and food safety notes in two lines.
</task>

<constraints>
- Fit the facilities: if there is no oven or fridge, steer the sign-up toward dishes served at room temperature safely or kept on ice, and say so.
- Keep the sign-up flexible: guests can swap categories, but core slots (mains, dietary slots) must be filled first.
- If children are coming, include child-friendly slots and choking-safe finger food for little ones.
- If the guest count or setting is missing, ask; the slot counts depend on it.
</constraints>

<output_format>
## Sign-up list
Table: Category | Slots | Serves each | Ideas | Dietary slot.

## Host provides
Checklist.

## Labels
The label template, ready to print.

## Serving gear
Checklist.

## Food safety
4–6 bullets.

## Message to guests
The message, ready to send.
</output_format>
