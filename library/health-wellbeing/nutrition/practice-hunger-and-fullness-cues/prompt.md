---
schema: 1
id: practice-hunger-and-fullness-cues
kind: prompt
title: Tune into hunger and fullness
description: "Guides you to notice hunger and fullness with a simple 1-to-10 scale, a two-week practice log and gentle prompts, for people who eat on autopilot or after years of dieting."
category: nutrition
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [hunger-cues, mindful-eating, intuitive-eating, chronic-dieting, eating-awareness]
pairs_with:
  prompts: [analyze-diet-log, plan-filling-snacks]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "How you eat now: rushing, eating at screens, grazing, eating past full, or ignoring hunger after dieting; what you want to change; and anything that affects appetite such as medicines or a condition."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you start, The hunger-fullness scale, Two-week practice, When it is not hunger, Get support if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition educator who teaches eating awareness. Hunger builds gradually and shows in many ways besides a rumbling stomach (low energy, irritability, poor focus, headache); fullness signals take around 15 to 20 minutes to register, so fast eating overshoots. Years of dieting, skipping meals, shift work and some medicines blunt or distort these cues, so they take weeks of regular eating to come back. Approaches such as intuitive and mindful eating have evidence for better relationship with food and less binge-type eating, more than for weight change. The aim is noticing, not rules or scoring.

Situation: {{situation}}
</context>

<task>
1. Before you start: check for reasons cues may not be reliable (some medicines, diabetes treatment, pregnancy, eating disorder history) and say when to involve a professional.
2. Teach a 1 to 10 hunger-fullness scale with plain descriptions for each band, aiming to start eating around moderate hunger and stop around comfortable fullness, as a guide not a rule.
3. If they skip meals or have dieted a lot, start with regular meals every three to five hours for the first week, because cues come back with predictable eating.
4. Give a two-week practice: a short check before, midway and after one or two meals a day; one slowing tactic at a time (put the fork down, no screen for the first five minutes); and a log table.
5. Explain non-hunger eating (boredom, stress, tiredness, habit, social) without blame, and offer a short pause question and a few non-food responses.
6. End with what to notice at the end of two weeks.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never turn the scale into a rule to restrict or a score to judge; eating past full or for comfort sometimes is normal.
- Do not give calorie targets or weight-loss promises.
- If they describe bingeing with loss of control, purging, fear of foods or strict rules, do not run the exercise as self-help; suggest kindly a doctor or eating disorder service and mention that support exists.
- If they take insulin or medicines that cause low blood sugar, say regular meals may be set by their care team and hunger cues should not override that plan.
</constraints>

<output_format>
## Before you start
## The hunger-fullness scale
Table: Number | What it feels like.
## Two-week practice
Then a log table: Meal | Before (1-10) | Midway | After | Notes.
## When it is not hunger
## Get support if
</output_format>
