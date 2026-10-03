---
schema: 1
id: handle-picky-eating
kind: prompt
title: Handle picky eating
description: Builds a low-pressure approach to a child's picky eating by age, using repeated exposure, a division of responsibility and meal setup, and says when to involve a clinician.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [plan, table, script, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [picky-eating, fussy-eaters, family-meals, food-exposure, toddlers]
pairs_with:
  prompts: [plan-behavior-approach, plan-child-bedtime-routine]
  personas: [parenting-coach, nutrition-educator]
args:
  - name: child_age
    description: The child's age, for example "2", "6".
    type: string
    required: true
  - name: situation
    description: What they eat and refuse, how many foods they accept, how meals go now, snacks and drinks, what you have tried, and any concerns about growth, gagging, energy or health.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, What is typical, Who decides what, Setting up meals, Introducing new foods, What to say and not say, A sample week, Talk to a clinician if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents take the battle out of mealtimes. Picky eating is very common in toddlers and pre-schoolers and usually improves with time. Approaches with good support are low-pressure: Ellyn Satter's division of responsibility (the parent decides what, when and where food is offered; the child decides whether and how much to eat from what is offered), repeated neutral exposure (many children need eight to fifteen or more tastes before accepting a food), family meals, a "safe" food on every plate, and involving children in shopping and cooking. Pressure, bribes, praise for eating and dessert as a reward tend to make picky eating worse.

Child's age: {{child_age}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. Check first for signs that need a clinician before or alongside this plan: weight loss, falling off their growth curve or concerns from a health visitor or doctor; choking, frequent gagging or vomiting with food; pain with eating or chronic constipation or diarrhoea; signs of allergy; extreme distress at the sight or smell of foods; a very short list of accepted foods (often fewer than about 20) or whole food groups dropped; low energy or illness; or a sudden change. If any is present, lead with seeing the child's doctor.
2. What is typical: what is normal at this age (food neophobia often peaks around 2 to 6 years; appetite varies day to day) and what in the situation looks typical or worth watching.
3. Who decides what: explain the division of responsibility in two or three lines and what changes for the parent.
4. Setting up meals: a predictable rhythm of meals and planned snacks (with about how often for this age), water between meals, limits on milk or juice if the description suggests they fill up on drinks (asked of a clinician for exact amounts), sitting together, a time limit, no screens, and serving style (family-style, small portions, a safe food on every plate).
5. Introducing new foods: food chaining (moving from accepted foods to similar ones), tiny tastes without pressure, playing and cooking with food, repeated exposure, and a simple tracker.
6. What to say and not say: neutral phrases ("You don't have to eat it", "You can try a tiny taste or just look at it") instead of pressure, bribes or praise for eating.
7. A sample week: a table of meals and snacks for this child, each including at least one accepted food, built from their accepted list.
8. Talk to a clinician if: the warning signs, plus who to see (the child's doctor, a health visitor or paediatric dietitian, a feeding therapist).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose feeding disorders (such as ARFID), allergies or medical conditions, and do not recommend supplements, vitamins, special diets or calorie targets. Route these to the child's doctor or a paediatric dietitian.
- Never suggest forcing, hiding food to trick the child into eating, withholding meals, or using dessert as a bribe.
- Follow choking-safety basics for young children (cut round foods such as grapes lengthwise, avoid whole nuts under about 5) when giving food examples.
- Respect the family's culture, budget and dietary practices; build from foods they already cook.
- If the child's age or accepted foods are missing, ask after giving the general plan.
</constraints>

<output_format>
## Check first
One line, or the signs that need a clinician.
## What is typical
## Who decides what
## Setting up meals
## Introducing new foods
## What to say and not say
Table: Instead of | Try.
## A sample week
Table: Day | Breakfast | Snack | Lunch | Snack | Dinner.
## Talk to a clinician if
</output_format>
