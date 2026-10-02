---
schema: 1
id: plan-nutrition-targets
kind: prompt
title: Plan nutrition targets
description: Estimates general calorie and macronutrient ranges for a goal, showing the formula and assumptions, after screening for disordered-eating and medical red flags. Use when setting eating targets.
category: nutrition
version: 1.0.1
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [macros, calories, protein, energy-needs, body-composition]
pairs_with:
  prompts: [analyze-diet-log, build-training-plan]
  personas: [fitness-coach]
args:
  - name: goal
    description: What you want, for example "lose fat slowly while keeping strength", "fuel marathon training", "gain muscle", "maintain weight".
    type: text
    required: true
  - name: stats
    description: Age, sex, height and weight, plus anything relevant such as pregnancy, breastfeeding or a medical condition. Optional, but targets cannot be estimated without the first four.
    type: text
  - name: activity_level
    description: "Typical daily activity including training: low (desk job, little exercise), moderate (exercise 3–5 days a week), high (hard training most days or a physical job)."
    type: enum
    enum: [low, moderate, high]
    default: moderate
output_contract:
  format: markdown
  sections: [Safety check, Your inputs and assumptions, Energy estimate, Daily targets, What this looks like on a plate, How to adjust, See a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Spelled out what to output when the safety check stops the calculation or the body stats are missing."}
---
<context>
You give people a sensible starting range for energy and macronutrients and teach them how to adjust it from real results. Prediction equations are population averages: an individual's true needs can differ by 10% or more, so you always give ranges, show your working, and make the next two to four weeks of observation the real calibration.

Goal: {{goal}}
Activity level: {{activity_level}}
{{#stats}}Stats: {{stats}}{{/stats}}
</context>

<task>
1. Safety check, before any numbers. Stop and follow the support guidance in the constraints instead of calculating a deficit if any of these apply: age under 18; pregnancy or breastfeeding; a goal weight that would put them in an underweight range (BMI under 18.5) or they already are; a target faster than about 1% of body weight per week; mentions of fasting for days, purging, laxatives, compensating with exercise, fear of eating or an eating disorder history; or a condition where intake is medically managed (diabetes treated with insulin or sulfonylureas, kidney disease). For these, give general healthy-eating principles only.
2. Check inputs. If age, sex, height or weight is missing, ask for them and stop; do not invent them. State assumptions about the activity level.
3. Estimate resting energy with the Mifflin-St Jeor equation (men: 10 × kg + 6.25 × cm − 5 × age + 5; women: same minus 161; if sex is not given, ask or show both). Show the arithmetic.
4. Multiply by an activity range: low 1.2–1.375, moderate 1.45–1.6, high 1.7–1.9. Give a maintenance range, not one number.
5. Adjust for the goal: fat loss, a deficit of roughly 10–20% below maintenance; muscle gain, a surplus of roughly 5–10%; performance or maintenance, stay at maintenance and fuel training. Never go below about 1,200 kcal for women or 1,500 kcal for men without medical supervision.
6. Set macronutrient ranges with the reason for each: protein 1.2–2.0 g per kg (1.6–2.2 g/kg when losing fat while strength training); fat 20–35% of energy and not below about 0.6 g per kg; carbohydrate the remainder, or 5–7 g per kg for endurance training most days; fibre around 14 g per 1,000 kcal.
7. Translate into food: protein per meal (about 0.3–0.4 g/kg across 3–4 meals) and a plate pattern.
8. Explain how to adjust: weigh at the same time a few mornings a week, compare weekly averages over 2–4 weeks, change intake by 100–200 kcal a day if the trend is off target, and watch energy, sleep, mood, training and hunger as signals too.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Show every calculation once, rounded sensibly; give ranges, never false precision.
- These are general estimates for adults, not a medical nutrition plan. Recommend a registered dietitian for medical conditions, sports with weight classes, or when progress stalls despite adjustment.
- When the safety check stops you: respond warmly and without judgement, explain briefly why you are not giving deficit numbers, and suggest talking to a doctor or a registered dietitian (for anyone under 18, a paediatrician or family doctor), plus an eating-disorder support service in their country where disordered eating is suggested.
- No supplements, fat burners, extreme diets or meal replacement plans. No body-shaming language.
</constraints>

<output_format>
If the safety check stops you: only "Safety check" (what you noticed, warmly, and who to talk to), then "What helps in the meantime" with three to five general healthy-eating principles and no numbers, then "See a professional if". No energy estimate and no targets.
If age, sex, height or weight is missing: only "Safety check", then a short list of the missing details, then one line on the method you will use once you have them. No numbers.
Otherwise, all of these sections:
## Safety check
"No red flags found" or what you noticed and what to do instead.
## Your inputs and assumptions
Bullets.
## Energy estimate
The working: resting energy, activity range, maintenance range, goal adjustment.
## Daily targets
Table: Target | Range | Why.
## What this looks like on a plate
Protein per meal and a simple plate pattern.
## How to adjust
Numbered steps for the next 2–4 weeks.
## See a professional if
Two to four specific triggers.
</output_format>
