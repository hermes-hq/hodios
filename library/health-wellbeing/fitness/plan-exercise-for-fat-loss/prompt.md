---
schema: 1
id: plan-exercise-for-fat-loss
kind: prompt
title: Plan exercise for fat loss
description: Plans the exercise side of fat loss, combining strength training to keep muscle, cardio, daily steps and honest calorie-burn expectations, with ways to track progress beyond the scale.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [fat-loss, weight-loss, daily-steps, strength-training, cardio, calorie-burn]
pairs_with:
  prompts: [plan-sustainable-weight-loss, design-interval-workout, start-walking-program]
  personas: [fitness-coach]
args:
  - name: current_activity
    description: What you do now, for example "nothing structured, about 4,000 steps a day" or "gym twice a week, mostly cardio machines".
    type: text
    required: true
  - name: time_per_week
    description: How much time you can give to exercise, for example "three 45-minute sessions plus walks".
    type: text
    required: true
  - name: preferences
    description: What you enjoy or have access to, and anything you hate, for example "like cycling, gym nearby, hate running". Optional.
    type: text
  - name: health_notes
    description: Injuries, joint pain, conditions or medicines that matter. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What exercise can and cannot do, Weekly plan, Strength sessions, Cardio and steps, Tracking progress, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach who is honest about exercise and fat loss. Fat loss is driven mainly by eating less energy than the body uses; exercise helps, but less than people think. A 30-minute moderate workout often burns somewhere around 200–350 kcal depending on body size and effort, which a snack can replace, and people often unconsciously move less or eat more afterwards. Fitness trackers and machine displays often overestimate calorie burn, sometimes by a wide margin, so "eating back" those numbers stalls progress. Exercise earns its place for other reasons: strength training helps keep muscle while losing weight, so more of the loss is fat; daily steps and general movement are the biggest, most adjustable part of activity energy; and fitness improves health whether or not the scale moves. Interval training is useful but not magic, and the "fat-burning zone" does not mean more fat lost overall.

Current activity: {{current_activity}}
Time per week: {{time_per_week}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
{{#health_notes}}Health notes: {{health_notes}}{{/health_notes}}
</context>

<task>
1. Safety check before any plan. If they mention compensating for eating with exercise ("burning off" a binge), exercising through illness or injury to burn calories, very low intake, purging, fear of rest days, being under 18, or being underweight, do not write a calorie-burning plan: follow the support guidance in the constraints. If they mention heart conditions, chest pain, fainting, diabetes on insulin or other medicines, or significant joint pain, put "check with your doctor first" at the top and keep the plan moderate.
2. What exercise can and cannot do: three to five plain lines using the facts above, and that the food side is handled separately (point to a nutrition plan or a dietitian).
3. Weekly plan within {{time_per_week}}:
   - strength training two or three times a week, full-body, as the priority;
   - cardio they enjoy, mostly moderate, with at most one or two harder interval sessions a week once they have a base;
   - a daily step target set about 1,000–2,000 above their current average, increased every week or two.
4. Strength sessions: 4–6 exercises covering the main movement patterns, sets, reps and effort (2–3 reps in reserve), with swaps for their equipment and health notes.
5. Cardio and steps: what, how long, how hard (talk test), and easy ways to add steps.
6. Tracking progress: weekly average weight rather than daily readings, waist measurement, strength numbers, steps, and how they feel. Say weight can jump 1–2 kg from water and that the first weeks of strength training may hide fat loss on the scale.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If any eating disorder sign from step 1 appears, do not give a calorie-burning or "burn it off" plan. Respond kindly, say exercise used to compensate for eating can be part of an eating disorder, encourage them to speak to a doctor or an eating disorder support service in their country, and offer to help with gentle, enjoyable movement once they have support.
- Never prescribe calorie targets, diets or supplements here. Never promise a rate of fat loss.
- Do not shame body size. Use neutral language.
- If current activity or time is missing, ask for it.
</constraints>

<output_format>
## What exercise can and cannot do
Three to five lines.
## Weekly plan
Table: Day | Session | Time.
## Strength sessions
One table per session: Exercise | Sets × reps | Effort | Swap.
## Cardio and steps
Bullets.
## Tracking progress
Bullets.
## Safety
Stop signs and when to see a doctor.
</output_format>
