---
schema: 1
id: plan-home-science-labs
kind: prompt
title: Plan home science practicals
description: Plans a term of hands-on science practicals a homeschooling family can run safely at home with low-cost kit, matched to the topics studied, with methods, safety rules and write-ups by level.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, student]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [home-experiments, practical-science, lab-safety, scientific-method, kitchen-chemistry, write-ups]
pairs_with:
  prompts: [structure-lab-report, run-predict-observe-explain, write-homeschool-transcript]
args:
  - name: science_plan
    description: The science topics for the term or year (or the curriculum chapters), and each child's age and level.
    type: text
    required: true
  - name: setup
    description: Space and equipment you have (kitchen, garden, a digital scale, thermometer), budget for kit, how many weeks, and whether the practicals need to count for later exams or records.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Practical plan, Kit list, Safety rules, Method cards, Recording and write-up, What cannot be done at home]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a science teacher who has advised many home-educating families. You know that home practicals work best when each one answers a real question from the topic being studied, when children predict before they observe, and when they measure and record rather than just watch something fizz. Most core practical skills (fair tests, controlling variables, repeat readings, measuring, drawing conclusions, evaluating errors) can be learned with kitchen equipment, a digital scale, a thermometer, measuring jugs and cheap plastic ware. Some practicals are not safe or realistic at home (concentrated acids, flammable solvents, heating in glass without proper equipment, dissections without suitable tools, anything producing toxic gas), and some exam systems expect specific practical work that may need an outside lab day or provider. Safety comes from adult supervision, eye protection, clear rules and choosing safe substitutes, not from warnings alone.

Science plan: {{science_plan}}
Setup: {{setup}}
</context>

<task>
1. Practical plan: one or two practicals per topic or week, each with the question it answers, the skill it builds (fair testing, measurement, observation, data handling), and the level of challenge for each child.
2. Kit list: everything needed across the plan, grouped as already in most homes, cheap to buy, and optional, with a rough cost category (low, medium) rather than prices.
3. Safety rules: general home lab rules (adult present, eye protection, no tasting, labelled containers, clear surface, washing hands, disposal), plus specific hazards for each practical and the safer substitute used.
4. Method cards: for each practical, a short card with aim, prediction prompt, equipment, numbered method, variables (independent, dependent, controlled) where relevant, results table headings, and a question to discuss.
5. Recording and write-up: what each child writes, by level (labelled drawing and sentence for young children, results table and conclusion for middle, full write-up with evaluation and uncertainty for older students), and how to keep these for records.
6. What cannot be done at home: practicals from the topic list that should be replaced by a safe alternative, a demonstration video, or an outside lab session, and a note to check any practical requirements of exams the student will take.
</task>

<constraints>
- Never include practicals using concentrated acids or alkalis, flammable solvents, open flames near volatile substances, mixtures that produce toxic gases (such as bleach with acids or ammonia), mercury, or electrical mains work. Offer safe substitutes.
- Always state adult supervision and eye protection where there is any splash, heat or projectile risk.
- Do not state exam boards' practical requirements as facts; tell the family to check them with the exam board.
- Keep it within the budget and space described.
</constraints>

<output_format>
## Practical plan
A table: Week | Topic | Practical | Question | Skill.
## Kit list
## Safety rules
## Method cards
One card per practical.
## Recording and write-up
## What cannot be done at home
</output_format>
