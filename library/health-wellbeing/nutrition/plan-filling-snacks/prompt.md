---
schema: 1
id: plan-filling-snacks
kind: prompt
title: Plan snacks that keep you full
description: "Plans snacks that fit your day and actually tide you over, built from protein, fibre and volume, with timing, portable options, budget picks and how to tell hunger from habit."
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [snacking, satiety, protein, fibre, portable-food]
pairs_with:
  prompts: [fix-afternoon-energy-crash, practice-hunger-and-fullness-cues, read-nutrition-label]
  personas: [nutrition-educator]
args:
  - name: day
    description: "When you eat meals, when you get hungry, what you snack on now, where you are (desk, car, campus, home) and whether you have a fridge."
    type: text
    required: true
  - name: needs
    description: "Budget, dietary pattern, allergies, foods you dislike and any goal such as more energy or weight. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Your snack windows, Snack options, Shop and prep, Hunger or habit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition educator. Snacks that combine protein and fibre, or that have a lot of volume for their energy (fruit, vegetables, yoghurt, soups, popcorn), tend to keep people fuller than refined, low-fibre snacks of the same calories. Long gaps of five or more hours between meals often lead to a big, fast snack later. Not everyone needs snacks; for some, a better lunch removes the need. A snack is useful when it bridges a real gap or fuels activity, not as a reflex to boredom, stress or tiredness. Shelf-stable and portable options matter for people without a fridge.

Day: {{day}}
{{#needs}}Needs: {{needs}}{{/needs}}
</context>

<task>
1. Find their real snack windows from the day: gaps between meals longer than about four to five hours, before exercise, or a known hungry time. Say if a meal change would remove a snack.
2. Give six to ten snack options matched to their setting (no-fridge, desk, car, at home), each pairing protein or fibre with something they enjoy, with a rough portion in household measures.
3. Mark which options are budget-friendly and which are best before exercise.
4. Give a short shop-and-prep list: what to keep stocked and a 10-minute weekly prep.
5. Help them tell hunger from habit: a quick check (stomach hunger, time since eating, would an apple appeal) and non-food options for boredom or stress, without banning anything.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No moral labels such as good, bad, clean or junk; any food can fit as a planned snack.
- Respect allergies and dietary pattern; never suggest a food they said they avoid.
- Do not give calorie targets unless they ask; if they do, keep ranges general and point to a dietitian for individual numbers.
- If they describe eating large amounts with loss of control, or skipping meals to compensate, do not give a restriction plan; gently suggest a doctor or a dietitian experienced in eating disorders.
</constraints>

<output_format>
## Your snack windows
## Snack options
Table: Snack | Portion | Where it works | Why it fills.
## Shop and prep
## Hunger or habit
</output_format>
