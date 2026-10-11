---
schema: 1
id: plan-healthy-weight-gain
kind: prompt
title: Plan healthy weight gain
description: Plans gaining weight for someone underweight, naturally slight or recovering from illness, with a medical check first, energy-dense additions, eating frequency and steady tracking.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [weight-gain, underweight, energy-dense-foods, appetite, recovery]
pairs_with:
  prompts: [plan-eating-when-appetite-is-low, plan-muscle-gain-nutrition, reach-daily-protein-target, plan-nutrition-targets]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "Your age, height and weight if comfortable, how your weight has changed and over what time, whether a doctor has checked the cause, what you eat in a usual day, appetite, activity, health conditions and medicines."
    type: text
    required: true
  - name: preferences
    description: "Foods you like and avoid, eating pattern, budget and cooking time. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Check first, Your target, Energy-dense additions, A sample day, Strength and appetite, Track and adjust, See a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people gain weight healthily, which needs a different approach from muscle-building plans. Unintended weight loss or being underweight can come from overactive thyroid, diabetes, coeliac or inflammatory bowel disease, infections, depression, medicines, cancer or an eating disorder, so an unexplained change should be checked by a doctor before or alongside any plan. People who have eaten very little for days, or are very underweight, can become seriously ill if they suddenly eat much more (refeeding syndrome) and need medical supervision. For everyone else, a surplus of roughly 300 to 500 kcal a day typically gives a steady gain of about 0.25 to 0.5 kg a week. Volume is usually the barrier, not willpower: energy density helps (nut butters, nuts and seeds, olive oil, full-fat dairy, cheese, avocado, dried fruit, granola, eggs, oily fish), as do eating five or six times a day, drinking milky drinks or smoothies, fortifying foods already eaten (oil on vegetables, milk powder in porridge), and drinking water after rather than before meals. Strength training helps the gain include muscle and can raise appetite.

Situation: {{situation}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
</context>

<task>
1. Check first. If the weight loss is unexplained or ongoing, or they mention symptoms (night sweats, diarrhoea, thirst, palpitations, low mood), advise seeing a doctor and keep the plan to gentle additions until then. If they are severely underweight or have eaten very little for several days, say they need medical supervision before increasing intake and give no plan. If they describe fear of gaining weight, restriction or purging, stop and point to a doctor and an eating-disorder support service.
2. Set a modest target: a surplus range, an expected weekly gain, and a first milestone, marked as estimates. For under-18s, defer the target to a paediatrician or family doctor and give food ideas only.
3. List energy-dense additions that fit their preferences and budget, with roughly how much energy each adds.
4. Write a sample day of five or six eating occasions in household portions, built on what they already eat.
5. Add strength training twice or three times a week if suitable, and appetite tactics (regular times, smaller frequent meals, drinks between meals, pleasant eating environment).
6. Explain tracking: weekly weight at the same time of day, and adjusting by one extra snack or drink if the gain stalls for two weeks.
7. List when to see a doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend weight-gain supplements, appetite-stimulating medicines or "mass gainer" products; mention that a doctor or dietitian may suggest oral nutrition supplements in some cases.
- Do not push large amounts of sugary drinks or fried fast food as the main strategy; energy-dense does not mean low-quality.
- Respect their eating pattern, culture and budget.
- Mark every calorie and gram figure as approximate. Do not invent label values.
- No comments on body shape or appearance.
</constraints>

<output_format>
If the check stops you: only "Check first" (what you noticed, warmly, and who to see) and "See a doctor if".
Otherwise:
## Check first
## Your target
## Energy-dense additions
Table: Addition | How to use it | Approx. extra energy.
## A sample day
Table: Time | Meal or snack | Portion.
## Strength and appetite
## Track and adjust
## See a doctor if
</output_format>
