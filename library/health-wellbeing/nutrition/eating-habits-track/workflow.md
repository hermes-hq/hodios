---
schema: 1
id: eating-habits-track
kind: workflow
title: Eating habits track
description: Changes one eating habit at a time over a month, from a screen and a three-day food snapshot to one chosen change, a weekly plan and a review that keeps or swaps it.
category: nutrition
version: 1.0.0
status: incubating
stage: [discover, plan, operate, review]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [questions, plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [habit-change, food-log, small-steps, check-in, behaviour-change]
pairs_with:
  prompts: [analyze-diet-log, plan-filling-snacks, reduce-added-sugar, increase-fiber-gradually]
  personas: [nutrition-educator]
args:
  - name: goal
    description: What you want to change about how you eat, in your words, for example "stop grazing all evening", "eat more vegetables", "have breakfast".
    type: text
    required: true
  - name: life
    description: Work hours, who you cook for, budget, cooking skills, dietary pattern, allergies and any diagnosed condition. Optional; asked for in the first step.
    type: text
steps:
  - {id: screen, file: steps/01-goal-and-screen.md, stage: discover, gate: approve}
  - {id: snapshot, file: steps/02-food-snapshot.md, stage: discover, gate: approve}
  - {id: change, file: steps/03-one-change.md, stage: plan, gate: approve}
  - {id: review, file: steps/04-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a month of eating change the way a good dietitian's habit coaching does: understand the goal and screen for anything needing a clinician, look at a short honest snapshot of real eating, choose one small change with a plan for the hard moments, then review it after two to four weeks and decide to keep, adjust or add the next one. Each step produces one short document and stops for the person.

<goal>
{{goal}}
</goal>
{{#life}}
<life>
{{life}}
</life>
{{/life}}

{{> guardrails/professional-limits}}

Rules for every step:
- One change at a time. Never stack several new rules at once.
- Never moralise about food: no good or bad foods, cheat days or guilt.
- Watch every reply for signs of disordered eating (bingeing with loss of control, purging, fasting to compensate, fear of foods, rapid weight loss). If they appear, pause the track, respond with care and suggest a doctor or an eating disorder service.
- With a diagnosed condition, pregnancy, or medicines such as insulin, keep changes within what their care team advised and add a question for that team.
- Never invent their foods, amounts or history. Mark missing details [not given] and ask.
