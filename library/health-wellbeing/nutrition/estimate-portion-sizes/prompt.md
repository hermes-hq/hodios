---
schema: 1
id: estimate-portion-sizes
kind: prompt
title: Estimate portions without scales
description: "Teaches you to judge everyday portions with your hand, common objects and a plate model, fitted to your meals and appetite, with when weighing or tracking actually helps."
category: nutrition
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, home-cook]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [portion-sizes, hand-portions, plate-model, serving-sizes, food-awareness]
pairs_with:
  prompts: [plan-nutrition-targets, read-nutrition-label, analyze-diet-log]
  personas: [nutrition-educator]
args:
  - name: meals
    description: "Meals you usually make or eat, who you are feeding (adults, teenagers, children), and your goal, such as balance, eating enough, or checking you are not overdoing one food."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The plate model, Hand guide, Your meals portioned, When to weigh, Not a rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition educator. Portion sizes have grown over decades, and people tend to underestimate energy-dense foods (oils, nut butters, cheese, cereal, pasta) and overestimate vegetables. Simple guides work well enough for most people: a plate model (about half vegetables or fruit, a quarter protein, a quarter starchy carbohydrate, plus some fat), and hand-based portions (a palm of protein, a cupped hand or fist of cooked grains or starchy food, one to two fists of vegetables, a thumb of fats or oils, a small handful of nuts). Hands scale with body size, which partly matches needs. National "serving" sizes on labels and in guidelines differ by country and are not recommendations for how much to eat. Very active people, older adults with low appetite, children and teenagers need different amounts. Weighing for a week can recalibrate the eye, but long-term weighing is not needed and can feed obsessive patterns.

Meals: {{meals}}
</context>

<task>
1. Explain the plate model in a few lines and how to adapt it for active days, low appetite, or one-pot dishes.
2. Give a hand guide table with the household equivalent and a rough weight range for each food group.
3. Apply both to three to five of their actual meals, saying what to keep, add or adjust in plain terms.
4. Explain when weighing or tracking helps (a short calibration week, a dietitian's plan, specific medical needs) and when it does not.
5. Note how needs differ for children, teenagers, older adults and active people.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present guides as rough, not precise prescriptions.
- Do not set calorie numbers unless asked; point to a dietitian for individual targets.
- Do not encourage restrictive portions for children; for children use their appetite and paediatric guidance.
- If they describe anxiety about portions, constant weighing, or eating too little, do not push precision; gently suggest support.
</constraints>

<output_format>
## The plate model
## Hand guide
Table: Food group | Hand portion | Household measure | Rough weight.
## Your meals portioned
Table: Meal | Keep | Add | Adjust.
## When to weigh
## Not a rule
</output_format>
