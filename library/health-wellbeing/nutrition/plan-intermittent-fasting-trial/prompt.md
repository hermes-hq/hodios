---
schema: 1
id: plan-intermittent-fasting-trial
kind: prompt
title: Plan an intermittent fasting trial
description: Plans a safe four-week trial of time-restricted eating, with a safety screen, an eating window that fits your day, what to eat in it and how to judge if it suits you.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [intermittent-fasting, time-restricted-eating, meal-timing, weight-management, self-experiment]
pairs_with:
  prompts: [compare-diet-approaches, plan-sustainable-weight-loss, reach-daily-protein-target, plan-shift-work-eating]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "Your usual daily schedule (wake, work, training, sleep), what and when you eat now, why you want to try fasting, health conditions, medicines, pregnancy or breastfeeding, and any history of disordered eating."
    type: text
    required: true
  - name: preference
    description: "A window you have in mind, for example 16:8 or eating 10 am to 6 pm, or \"no idea\". Optional."
    type: text
output_contract:
  format: markdown
  sections: [Safety screen, Your eating window, What to eat in the window, Four-week trial, How to judge it, Stop and get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people test time-restricted eating sensibly. In trials, time-restricted eating usually produces weight loss similar to ordinary calorie reduction when total intake is matched; it works mainly by making it easier for some people to eat less, not through a special fat-burning effect. Earlier windows (finishing in the late afternoon or early evening) show some promising metabolic results, but the evidence is mixed and later windows can be easier socially. It suits people who are not hungry in the morning or like clear rules, and backfires for people who overeat at the first meal, train hard early, or find rules trigger food preoccupation. People who should not try it without medical advice: pregnant or breastfeeding people, under-18s, anyone with a history of an eating disorder, people who are underweight, people with diabetes on insulin or sulfonylureas, people taking medicines that must be taken with food, and frail older adults. A gradual start (12 hours, then 14, then perhaps 16) causes fewer headaches and less irritability than jumping straight to 16:8.

Situation: {{situation}}
{{#preference}}Preference: {{preference}}{{/preference}}
</context>

<task>
1. Run the safety screen. If any exclusion applies, stop: explain warmly why and suggest a doctor or registered dietitian, and offer regular-meal habits instead.
2. Choose an eating window that fits their schedule, sleep, training and social meals. Start with a 12-hour window in week one and step down gradually only if it is going well. State that water, plain tea and black coffee are usually fine outside the window.
3. Plan what to eat inside the window: two or three proper meals with protein, fibre and vegetables, a planned snack if needed, enough fluids, and how to place meals around training. Warn against using the window as a licence to graze or to cut food quality.
4. Set out a four-week trial with week-by-week windows and a simple daily check (hunger 1 to 10, energy, sleep, any loss-of-control eating, mood).
5. Explain how to judge it at four weeks: keep it if hunger, energy and sleep are fine and eating feels calmer; drop it if they feel preoccupied with food, overeat in the window, sleep worse or dread social meals. Note that weight results are comparable to other approaches, so liking it is the main reason to continue.
6. List stop signs and when to get advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No windows shorter than 8 hours, no multi-day or alternate-day fasts, no fasting-mimicking products or supplements.
- Do not promise autophagy, detox, longevity or hormone effects as established benefits; describe them as unproven in people at practical doses.
- If they take any medicine with timing or food instructions, tell them to check with their pharmacist or prescriber before changing meal timing.
- If they mention binge eating, purging, compensating, intense fear of weight gain, or that the main goal is to eat as little as possible, do not provide a fasting plan; suggest a doctor and an eating-disorder support service in their country.
- No moral language about food or bodies.
</constraints>

<output_format>
If the safety screen stops you: only "Safety screen" (what you noticed and who to talk to), "What helps instead" with regular-meal habits, and "Stop and get advice if". No plan.
Otherwise:
## Safety screen
## Your eating window
## What to eat in the window
Table: Time | Meal | What goes in it.
## Four-week trial
Table: Week | Window | Daily check.
## How to judge it
## Stop and get advice if
</output_format>
