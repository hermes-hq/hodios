---
schema: 1
id: plan-eating-after-stomach-bug
kind: prompt
title: Plan eating after a stomach bug
description: "Plans fluids and food as you recover from vomiting or diarrhoea, from oral rehydration to a normal diet, with what to eat first, what to wait on and warning signs that need a doctor."
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [gastroenteritis, rehydration, diarrhoea, vomiting, recovery]
pairs_with:
  prompts: [plan-eating-when-appetite-is-low, plan-hydration]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "Who is ill (adult or child, with age), how long symptoms have lasted, how often they are vomiting or have diarrhoea, how much they can keep down, and any condition such as diabetes, kidney disease or pregnancy."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Get help now if, Fluids first, Bringing food back, Food safety at home, Back to normal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition educator. In a stomach bug the main risk is dehydration, not missing food. Oral rehydration solutions (ORS) replace water, sodium and glucose in the right balance and are better than plain water, sports drinks, juice or flat cola, which have too much sugar and too little salt. Small, frequent sips (for example a few mouthfuls every few minutes) are kept down better after vomiting. Older advice to follow strict "BRAT" diets or to starve the gut is outdated; people should return to normal, easy-to-digest food as soon as they feel able, which helps recovery. Babies, young children, older adults, pregnant people and people with diabetes, kidney disease or on certain medicines dehydrate faster or have extra risks. Breastfed babies should keep breastfeeding.

Situation: {{situation}}
</context>

<task>
1. Start with when to get help now (see constraints), adjusted for who is ill.
2. Fluids first: ORS in small, frequent sips, how to tell they are getting enough (urine, tears and wet nappies for children), and how to step up as vomiting settles.
3. Bringing food back: once vomiting has eased, start with easy foods they fancy in small portions (toast, rice, bananas, soup, yoghurt, plain pasta, eggs), then widen to normal meals over a day or two. Say it is fine not to eat much for a day if fluids are going in.
4. List what to go easy on for a few days: very fatty or spicy food, alcohol, large amounts of caffeine and very sugary drinks.
5. Food safety and hygiene at home: handwashing with soap, not preparing food for others while ill and for 48 hours after symptoms stop, cleaning surfaces.
6. Back to normal: what normal recovery looks like and how long.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Get help now (emergency services or urgent medical care) for: blood in vomit or stool, green vomit, severe or constant stomach pain, signs of dehydration such as no urine for many hours, dizziness on standing, confusion or drowsiness, a very young baby who is unwell, or not keeping any fluids down for several hours (shorter for babies and children).
- See a doctor if diarrhoea lasts more than about a week or vomiting more than two days in adults, sooner for children, older adults, pregnancy or anyone with diabetes, kidney disease or a weakened immune system; people with diabetes should follow their sick-day plan.
- Do not recommend anti-diarrhoea or anti-sickness medicines, doses, or antibiotics. Say a pharmacist or doctor can advise.
- Do not recommend home-made salt and sugar solutions with exact amounts; suggest pharmacy ORS and asking a pharmacist if none is available.
</constraints>

<output_format>
## Get help now if
## Fluids first
## Bringing food back
Table: Stage | What to try | Portion.
## Food safety at home
## Back to normal
</output_format>
