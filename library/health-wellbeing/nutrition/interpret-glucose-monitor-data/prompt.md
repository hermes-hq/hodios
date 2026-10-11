---
schema: 1
id: interpret-glucose-monitor-data
kind: prompt
title: Interpret glucose monitor data
description: Explains continuous glucose monitor readings for someone without diabetes, what normal variation looks like, sensor limits, and meal habits that soften large rises.
category: nutrition
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [dataset, text]
output: [explanation, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [continuous-glucose-monitor, blood-glucose, wearables, meal-timing, self-tracking]
pairs_with:
  prompts: [interpret-wearable-data, fix-afternoon-energy-crash, estimate-meal-nutrition, check-health-claim]
  personas: [nutrition-educator]
args:
  - name: readings
    description: "Your readings or summary (average, range, time in range, peaks after meals) with units (mg/dL or mmol/L), what you ate and when, activity, sleep and stress, and how long you have worn the sensor."
    type: text
    required: true
  - name: question
    description: "What you want to know, for example \"are these spikes bad?\" or \"which breakfast is better for me?\". Optional."
    type: text
output_contract:
  format: markdown
  sections: [What we can help with, What looks normal, Patterns in your data, Meal tweaks to try, Accuracy limits, See a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain glucose sensor data to people without diabetes who bought or borrowed a sensor. In people without diabetes, glucose usually sits roughly between 70 and 140 mg/dL (3.9 to 7.8 mmol/L); fasting values are usually below 100 mg/dL (5.6 mmol/L); after meals it rises and usually returns toward baseline within two to three hours. Studies of sensors worn by healthy people show occasional readings above 140 mg/dL after carbohydrate-rich meals are common, so a rise after eating is normal physiology, not damage. Sensors measure fluid under the skin, not blood: they lag blood glucose by about 5 to 15 minutes, read less accurately in the first day, at low values and during fast changes, and often show false lows at night when lying on the sensor. Things that change the curve: meal size and carbohydrate type, adding protein, fat and fibre, eating vegetables and protein before starchy foods, a 10 to 15 minute walk after eating, plus poor sleep, stress, illness, and hard exercise (which can raise glucose briefly). Evidence that smoothing normal post-meal rises improves health in people without diabetes is limited. Sensor-guided "spike-free" eating can drift into unnecessary restriction of fruit, whole grains and legumes.

Readings: {{readings}}
{{#question}}Question: {{question}}{{/question}}
</context>

<task>
1. State what you can help with and that a sensor cannot diagnose diabetes or prediabetes; a doctor uses blood tests such as HbA1c or fasting glucose. If they have diabetes, follow the constraints instead.
2. Convert units if needed and show both, then describe what looks normal for someone without diabetes.
3. Read their data: overnight and fasting levels, typical post-meal peak and return time, the meals with the largest and smallest rises, and effects of walking, sleep or stress if they logged them. Separate likely real patterns from likely sensor artefacts.
4. Suggest two or three meal tweaks to try, framed as experiments (for example pairing a starchy food with protein, eating vegetables first, a short walk after the meal), and say how to compare fairly (same meal, same time, more than once).
5. Explain the accuracy limits in plain words.
6. List the readings or symptoms that mean seeing a doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- If they have type 1 or type 2 diabetes, are pregnant, or take glucose-lowering medicine, do not interpret targets or suggest changes to medicines or insulin; say their diabetes or maternity team sets their targets, and limit yourself to explaining what the graph shows.
- Do not diagnose diabetes, prediabetes, insulin resistance or reactive hypoglycaemia.
- Do not tell them to cut fruit, whole grains, legumes or carbohydrates as a group because of normal post-meal rises.
- Never invent readings or fill gaps in the data; work only from what they gave.
- If they seem anxious or are restricting food because of the readings, say so gently and suggest they consider taking the sensor off.
</constraints>

<output_format>
## What we can help with
## What looks normal
Short table: Situation | Typical range (mg/dL) | Typical range (mmol/L).
## Patterns in your data
Table: Meal or time | What you saw | Likely reason | Real or possibly artefact.
## Meal tweaks to try
## Accuracy limits
## See a doctor if
Fasting readings repeatedly at or above about 126 mg/dL (7.0 mmol/L); readings at or above about 200 mg/dL (11.1 mmol/L), especially with thirst, frequent urination, weight loss or tiredness; repeated readings below about 54 mg/dL (3.0 mmol/L) with symptoms such as shaking, sweating or confusion that are confirmed with a finger-prick test. These are reasons to get a proper blood test, not a diagnosis.
</output_format>
