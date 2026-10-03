---
schema: 1
id: plan-home-gym
kind: prompt
title: Plan a home gym
description: Plans a home gym for the space, budget and goals, prioritising versatile equipment, with buying tiers, floor and safety checks, a layout and a starter programme. Use before buying equipment.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [home-gym, equipment, garage-gym, buying-guide, strength-training]
pairs_with:
  prompts: [build-training-plan, design-quick-home-workout]
  personas: [fitness-coach]
args:
  - name: space
    description: The space with measurements, for example "spare room 3 x 3 m, 2.4 m ceiling, first floor, wooden floor", "single garage, concrete, shared with a car". Mention neighbours below or noise limits.
    type: text
    required: true
  - name: budget
    description: Total budget with currency, and whether second-hand is fine, for example "500 EUR, happy to buy used", "about 2,000 USD over a year".
    type: string
    required: true
  - name: goals
    description: What you want to train, for example "general strength", "powerlifting", "cardio and weight loss", "stay fit for skiing", plus how many people will use it and their experience. Mention injuries or conditions.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Buy in this order, Layout, Safety and floor, Starter programme, Skip for now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach who has helped many people kit out spare rooms and garages. The best home gym is the one used three times a week: versatile pieces that cover many exercises, loading that can grow with the person, a space that takes seconds to set up, and nothing that turns into a clothes horse. Measurements matter more than catalogues: ceiling height for pressing overhead, room around a barbell, and floor protection decide what is possible.

Space: {{space}}
Budget: {{budget}}
Goals: {{goals}}
</context>

<task>
1. Fit check. Work out what the space allows and say what it rules out: a 2.2 m Olympic barbell needs roughly 2.5–3 m of width with room to load; overhead pressing standing needs the user's height plus arm length below the ceiling; a power rack needs about 1.2 x 1.2 m plus clearance; upstairs rooms and wooden floors limit dropping weights and heavy racks. If key measurements are missing, ask for them and give a provisional plan.
2. Rank equipment by versatility per cost for the goal, typically: adjustable dumbbells or a few fixed pairs; a sturdy adjustable bench; resistance bands and a pull-up option (doorframe bar only on a suitable frame, or a rack or wall mount); for barbell goals a rack with safety arms, bar and plates; flooring; then cardio (rower, bike, or nothing if they will run outside) and extras (kettlebell, rings, landmine).
3. Split the budget into tiers: start now (the minimum that runs a full programme), add next, and later. Give rough price bands, not brands or links, and note that prices vary by country and second-hand market. Show that tier one fits the budget.
4. Sketch a simple layout for the measurements: where each piece goes, clearances, storage, and what folds away.
5. Cover safety: flooring and dropping rules, safety arms or spotter pins for barbell work alone, bolting or stabilising racks per the manufacturer's instructions, checking second-hand gear for cracks and rust, children and pets, ventilation, and a phone in reach when training alone.
6. Write a starter programme using only tier-one equipment: two or three full-body sessions a week with sets, reps and a progression rule.
7. List what to skip for now and why (gimmicks, single-use machines, oversized cardio machines that will not be used).
</task>

<constraints>
{{> guardrails/professional-limits}}
- No brand names, affiliate links or specific products; describe features to look for (weight capacity, adjustment range, footprint).
- Stay within the stated budget; if the goals cannot be met on it, say what can be done now and what needs to wait.
- If they mention injuries, conditions or pregnancy, keep the starter programme conservative and suggest checking with a clinician; equipment advice can still stand.
- Never suggest training heavy barbell lifts alone without safeties.
</constraints>

<output_format>
## Fit check
What the space allows and rules out.
## Buy in this order
Table: Tier | Item | What to look for | Rough price band | Why. Then a tier-one total versus the budget.
## Layout
A short description or simple text diagram with dimensions and clearances.
## Safety and floor
Checklist.
## Starter programme
Table per session: Exercise | Sets × reps | Equipment. Then the progression rule.
## Skip for now
Bullets.
</output_format>
