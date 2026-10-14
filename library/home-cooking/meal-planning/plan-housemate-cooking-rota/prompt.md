---
schema: 1
id: plan-housemate-cooking-rota
kind: prompt
title: Plan a shared cooking rota for housemates
description: Sets up a cooking rota for a shared house where people take turns cooking for all, with fair turns, a shared food kitty, diet rules, a simple menu bank and what happens when someone misses a night.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
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
depth: specific
tags: [shared-house, cooking-rota, food-kitty, house-dinners, cost-sharing, students]
pairs_with:
  prompts: [plan-budget-meals, split-shared-expenses, write-house-share-agreement]
args:
  - name: house
    description: How many people, who wants to join, each person's diets, allergies and cooking confidence, and the nights people are usually home.
    type: text
    required: true
  - name: money
    description: How you want to share costs (equal kitty, cook pays and is reimbursed, take turns buying), a rough weekly amount with currency, and the country. Optional.
    type: text
  - name: kitchen
    description: Fridge and cupboard space, the size of pans and oven, and anything people already argue about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How the rota works, The rota, Money, Menu bank, House rules, When it goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have lived in and helped organise shared houses where a cooking rota worked and ones where it collapsed in a month. It collapses for the same reasons: one confident cook ends up doing everything, costs drift and nobody tracks them, a vegetarian or allergic housemate eats plain pasta while everyone else eats well, people do not say they will be out, and the cook is left with the washing up too. It works with clear turns sized to the number of nights people actually eat together, a simple money system, a menu bank everyone can cook for the whole group, and the rule that the cook does not wash up.

House: {{house}}
{{#money}}Money: {{money}}{{/money}}
{{#kitchen}}Kitchen: {{kitchen}}{{/kitchen}}
</context>

<task>
1. Decide the shape: which nights are shared dinners (only nights most people are home), how many cooks per night (pairs work well with nervous cooks), and whether turns rotate weekly or on a fixed day.
2. Write a four-week rota table that spreads turns fairly, pairs less confident cooks with confident ones at first, and keeps the cook off washing up.
3. Set up money: a weekly kitty or reimbursement system, a per-person per-meal target derived from the weekly amount, how receipts are tracked (a shared note or sheet), and how to settle up monthly. Say how to handle someone who eats fewer shared meals.
4. Build a menu bank of 10 to 15 crowd dinners for the group's size that every diet in the house can eat as the main dish (not a side), with a difficulty rating and a rough per-person cost marked as an estimate.
5. Write short house rules: opt-out deadline for a night (for example by noon), labelling allergens, cleaning up, leftovers, and shared staples.
6. Plan for problems: a missed turn, a cook with an exam or illness, someone who never pays, and a monthly two-minute check-in to adjust.
</task>

<constraints>
- Every shared dinner must suit every participant's diet and allergy as a full meal; if no single dish can, say how to adapt (a separate protein cooked in a clean pan).
- Severe allergies need stricter rules on shared pans and labelling; say so.
- Keep the system light enough for students; no complex spreadsheets unless asked.
- Costs are estimates for the stated country, not current prices.
</constraints>

<output_format>
## How the rota works
Short bullets.
## The rota
Table: Week | Mon to Sun, with cook and washer-up.
## Money
Bullets, including per-person per-meal target.
## Menu bank
Table: Dinner | Suits | Difficulty | Est. cost per person.
## House rules
Numbered list.
## When it goes wrong
Bullets.
</output_format>
