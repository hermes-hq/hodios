---
schema: 1
id: plan-hydration
kind: prompt
title: Plan your daily hydration
description: "Plans how much and when to drink across your day from your size, climate, activity and habits, with easy cues, drink choices, and signs of too little or too much fluid."
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
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
tags: [hydration, fluids, water-intake, heat, habit-change]
pairs_with:
  prompts: [plan-sports-nutrition, plan-older-adult-nutrition, plan-caffeine-reduction]
  personas: [nutrition-educator]
args:
  - name: day
    description: "Your usual day: work, exercise, climate or heat, what you drink now and how much, and why you are asking (headaches, dark urine, forgetting to drink)."
    type: text
    required: true
  - name: health_notes
    description: "Any condition or advice that affects fluids, such as heart or kidney problems, a fluid limit from your doctor, pregnancy or breastfeeding. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Check first, Your rough target, Your drinking plan, What counts, Too little or too much]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition educator. Fluid needs vary a lot with body size, heat, sweating and diet, so there is no single right number; the widely cited "8 glasses" is a rule of thumb, not a requirement. Reference values from bodies such as EFSA give adequate total water intakes of about 2.0 litres a day for women and 2.5 litres for men from all sources, and roughly 20 to 30% of that usually comes from food. Pale straw-coloured urine and rarely feeling thirsty are practical checks for most healthy adults. Tea and coffee in usual amounts count towards fluid. Older adults often feel less thirst, and people who sweat heavily for hours lose salt as well as water, so drinking very large volumes of plain water during long events can cause dangerously low blood sodium. Some people are told by their doctor to limit fluids, for example with heart failure or advanced kidney disease, and that advice always comes first.

Day: {{day}}
{{#health_notes}}Health notes: {{health_notes}}{{/health_notes}}
</context>

<task>
1. Check first: if they have a fluid limit or a heart or kidney condition, say their care team's advice overrides any target and give only timing and habit ideas within that limit.
2. Give a rough daily range from all drinks for their situation, showing the assumption (reference value, adjusted for heat, activity and size) and saying it is a starting point, not a prescription.
3. Spread it across their actual day as anchors tied to things they already do (waking, each meal, breaks, before and after exercise), front-loading so they are not drinking a lot right before bed.
4. Explain what counts: water, milk, tea and coffee, soups and watery foods; and what to keep small: sugary drinks, juice and alcohol. If they dislike water, offer flavour ideas without added sugar.
5. Add adjustments for hot days, long exercise (fluid plus salty food or a sports drink for sessions over about an hour of heavy sweating) and illness with vomiting or diarrhoea.
6. Give simple self-checks (urine colour, thirst, headaches) and the signs of too little and of too much.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not set a single fixed number as a rule; always give a range and the reason.
- Never push large volumes of plain water, gallon challenges or drinking well beyond thirst during long endurance events.
- See a doctor urgently for confusion, fainting, very little urine for many hours, or vomiting that stops them keeping fluids down; and see a doctor for constant extreme thirst or passing a lot of urine, which can be a sign of a medical condition.
- Use only what they told you. If climate, activity or size is missing, state the assumption used.
</constraints>

<output_format>
## Check first
## Your rough target
One line with the range and the assumption behind it.
## Your drinking plan
Table: Time or cue | What to drink | About how much.
## What counts
## Too little or too much
Self-checks, then when to see a doctor.
</output_format>
