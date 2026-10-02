---
schema: 1
id: compare-diet-approaches
kind: prompt
title: Compare eating approaches
description: Compares eating approaches such as Mediterranean, low-carb, plant-based or intermittent fasting on evidence, practicality, nutrient gaps and who should avoid them, for a stated goal.
category: nutrition
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, home-cook]
requires: [none]
inputs: [topic, preferences]
output: [table, report]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [mediterranean-diet, low-carb, plant-based, intermittent-fasting, evidence-grading, eating-patterns]
pairs_with:
  prompts: [plan-nutrition-targets, analyze-diet-log, evaluate-supplement]
  personas: [nutrition-educator]
args:
  - name: approaches
    description: The eating approaches to compare, for example "Mediterranean vs keto vs 16:8 fasting". Two to four works best.
    type: text
    required: true
  - name: goals
    description: What you want from changing how you eat, plus anything relevant such as health conditions, medicines, budget, cooking time, culture or who you cook for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you choose, At a glance, Approach by approach, Fit for your goals, Try it for four weeks, Check with a professional first if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition scientist who explains diet research to the public without hype. Head-to-head trials of popular diets tend to show similar average weight change when calories end up similar, and that how well someone can stick to an approach predicts their results better than which approach they pick. Approaches still differ in the strength of evidence for other outcomes, in nutrient risks, in cost and effort, and in who should not try them without medical advice.

Approaches to compare: {{approaches}}
{{#goals}}Goals and context: {{goals}}{{/goals}}
</context>

<task>
1. Define each approach in one or two sentences as it is usually practised, noting common variants (for example 16:8 versus 5:2 fasting, or vegan versus vegetarian). If an approach name is unclear or is a branded programme, define the general pattern and say so.
2. Grade the evidence for each approach on the outcomes that matter to their goals (for example weight, heart health, blood sugar, energy, sport performance), using strong, moderate, limited or none, and say what kind of studies it rests on and whether results last beyond a year.
3. Assess practicality: typical cost, cooking time and skill, eating out and social life, fit with their culture and household, and how hard it tends to be to sustain.
4. List nutrient gaps or risks and how to cover them with food (for example vitamin B12, iron, iodine and omega-3 on plant-based diets; fibre and constipation on very low-carb diets; protein and overall intake when fasting windows are tight).
5. List who should avoid it or check with a doctor or dietitian first, specific to each approach.
6. Match to their goals and context: name the one or two that fit best and why, and what would make you change that answer. If no goals are given, compare on general health and practicality and invite them to share a goal.
7. Give a four-week trial plan for the best fit: two or three concrete changes, what to notice, and how to judge whether it is working.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent studies, statistics or names of trials. Describe evidence by type and consistency, and say when it is debated.
- Medical checks to include where relevant: diabetes treated with insulin or medicines that can cause low blood sugar (fasting and low-carb can cause dangerous lows; medicines may need adjusting by their doctor); people taking SGLT2 inhibitors (very low-carb diets carry a risk of ketoacidosis); kidney or liver disease; pregnancy and breastfeeding; children and teenagers; older adults at risk of muscle loss; and anyone with a history of disordered eating, for whom restrictive patterns such as fasting or strict rules are not advisable.
- If the goals mention signs of disordered eating (fear of food, compensating, very low intake), do not compare restrictive approaches; say gently why and suggest a doctor or eating-disorder support service.
- No moralising about foods and no promises about weight or appearance.
- Respect budget and culture: show how each approach can work with the foods they already eat.
</constraints>

<output_format>
## Before you choose
Any medical-check flag from their context, and the point that the approach you can keep beats the "best" one. Two to four lines.
## At a glance
Table: Approach | Evidence for your goal | Practicality | Cost | Main nutrient watch-outs | Check first if.
## Approach by approach
A short paragraph for each.
## Fit for your goals
## Try it for four weeks
## Check with a professional first if
</output_format>
