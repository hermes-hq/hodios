---
schema: 1
id: interpret-body-composition-scan
kind: prompt
title: Interpret a body composition scan
description: Explains a DEXA, bioimpedance or smart-scale body composition report, its error margins, what changes between scans are meaningful, and how to get more reliable readings.
category: fitness
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [body-composition, dexa, bioimpedance, body-fat, lean-mass, smart-scale]
pairs_with:
  prompts: [interpret-wearable-data, track-fitness-progress, plan-exercise-for-fat-loss]
  personas: [fitness-coach]
args:
  - name: scan_type
    description: The kind of measurement.
    type: enum
    enum: [dexa, bioimpedance-machine, smart-scale, skinfold, other]
    required: true
  - name: results
    description: The numbers from the report, for example body fat %, fat mass, lean or muscle mass, visceral fat, bone values, with units.
    type: text
    required: true
  - name: previous_results
    description: Earlier results from the same device with dates. Optional.
    type: text
  - name: context
    description: Conditions and goal, for example "measured at 7 am fasted", "after a workout", "trying to build muscle", age and sex if relevant. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this scan measures, Your numbers explained, How much to trust them, Change since last scan, What to do next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain body composition reports plainly and honestly about their limits. No method measures fat directly. DEXA is the most repeatable common method for tracking change but can still differ from the true value by a few percentage points of body fat; repeat scans under the same conditions typically vary by about 1% body fat. Bioimpedance (handheld, standing machines and smart scales) estimates composition from how a small current passes through the body, so readings shift with hydration, recent food and drink, exercise, alcohol, skin temperature, time of day and the menstrual cycle; smart scales are the least accurate and are useful only for long-term trends. "Lean mass" includes water, organs and stored carbohydrate, not just muscle, so a fast drop in lean mass on a low-carb diet or after a hard week is often water. Scores such as "metabolic age" or "body age" are device-specific estimates, not medical measures. The bone values in a whole-body DEXA scan are not a substitute for a medical bone-density scan of the hip and spine.

Scan type: {{scan_type}}
Results: {{results}}
{{#previous_results}}Previous results: {{previous_results}}{{/previous_results}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. What this scan measures: two or three lines on how this method works and what it estimates.
2. Your numbers explained: each number in plain words, using only the values given. Where a general reference range is widely used (for example body fat ranges by sex and age from the device maker or common guidance), give it as a rough guide and say ranges vary by source. Do not invent values not in the report.
3. How much to trust them: the typical error for this method, the conditions that skew it, and whether their measurement conditions were good.
4. Change since last scan: if previous results are given, compare them and say whether each change is bigger than the method's usual day-to-day or scan-to-scan noise. Small changes within noise are "no clear change". Note if a lean mass drop is likely water.
5. What to do next: how to standardise future readings (same device, same time, fasted, before exercise, similar hydration, for bioimpedance not during menstruation if that shifts their readings), how often to rescan (DEXA every 3–6 months at most for tracking; scales as weekly averages), and better everyday measures alongside (waist, strength, photos, how clothes fit).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose. Visceral fat or bone values that the report flags as high risk, or very low body fat (near the levels usually described as essential fat, roughly 5% or less for men and 13% or less for women), are reasons to speak with a doctor.
- If they mention restricting food heavily, fear of weight gain, purging, compulsive exercise, or a goal body fat in a range that is unsafe for them, do not coach them toward a lower number. Respond kindly, say the goal carries health risks, and encourage them to talk to a doctor or an eating disorder support service.
- Do not moralise about body size or use words like "bad" or "obese" about the person. Neutral language only.
- If the results or scan type are missing, ask for them.
</constraints>

<output_format>
## What this scan measures
Two or three lines.
## Your numbers explained
Table: Measure | Your value | What it means.
## How much to trust them
Bullets.
## Change since last scan
Table: Measure | Before | Now | Change | Beyond the noise?
## What to do next
Bullets.
</output_format>
