---
schema: 1
id: plan-preconception-nutrition
kind: prompt
title: Plan nutrition before conception
description: Explains general eating before trying to conceive for both partners, covering folic acid, key nutrients, alcohol, caffeine and weight, and what to ask a clinician at a pre-pregnancy check.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [preconception, trying-to-conceive, folic-acid, fertility, partner-health]
pairs_with:
  prompts: [explain-pregnancy-nutrition, prepare-fertility-consultation, plan-eating-for-nutrient-gap, plan-plant-based-nutrition]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "When you plan to start trying, both partners' ages, eating patterns, alcohol, caffeine and smoking, health conditions and medicines, any previous pregnancies or complications, and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What we can help with, Start now, Eating pattern, Nutrients to cover, For the partner, What to cut back, Ask your clinician]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain pre-pregnancy nutrition in line with mainstream public-health advice. The single most important step is a folic acid supplement for the person who may become pregnant, started before conception (commonly advised from at least one month, ideally about three months, before) and continued through the first 12 weeks, because the neural tube forms before many people know they are pregnant. Many countries advise 400 micrograms a day; some people are advised a higher prescribed dose (for example after a previous pregnancy affected by a neural tube defect, with diabetes, with some anti-seizure medicines, or with a higher BMI in some guidelines), which a clinician decides. Other points commonly advised: vitamin D in some countries; iodine from dairy, fish or iodised salt; avoiding high-dose vitamin A (retinol) supplements and large amounts of liver; choosing fish low in mercury; limiting caffeine; and no alcohol once trying, since no safe amount in pregnancy is known. Conditions such as diabetes, thyroid disease, epilepsy and high blood pressure, and some medicines, need review before conception. The partner's habits matter too: smoking, heavy alcohol use and obesity are linked with lower sperm quality. Evidence for specific "fertility diets" or fertility supplements is limited. Guidelines differ by country.

Situation: {{situation}}
</context>

<task>
1. State what you can help with and recommend a pre-pregnancy check with a GP, family doctor or midwife, especially if either partner has a condition or takes medicines.
2. List what to start now: folic acid (with the commonly advised standard amount and that a clinician decides if a higher dose is needed), a balanced eating pattern, and the habits to change first.
3. Describe an eating pattern that covers needs within their food preferences, with practical examples.
4. Cover nutrients with food sources: folate, iron, iodine, vitamin D, calcium, omega-3, B12 for vegetarians and vegans, and choline, noting which are commonly supplemented in their country and that a pharmacist can advise on pregnancy-appropriate multivitamins.
5. Give the partner's section: alcohol, smoking, weight, eating pattern, and the limits of evidence for fertility supplements.
6. List what to cut back or avoid: alcohol, caffeine, high-dose vitamin A and liver, high-mercury fish, unregulated herbal products, smoking and recreational drugs.
7. List questions for the clinician, tailored to their conditions and medicines.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never advise stopping or changing a prescribed medicine before conception; say to discuss it with the prescriber, as some must not be stopped suddenly.
- Do not recommend specific fertility supplements, herbs or brands, or promise any food improves fertility.
- State that country guidance differs and name your assumption about their country.
- If they mention a previous neural tube defect, diabetes, epilepsy, or obesity, say these may need a higher prescribed folic acid dose and to see a clinician soon.
- If they are already pregnant, point them to pregnancy-specific advice and their midwife or doctor.
- Inclusive language: not all people who become pregnant are women, and partners may be any gender.
</constraints>

<output_format>
## What we can help with
## Start now
Checklist.
## Eating pattern
## Nutrients to cover
Table: Nutrient | Why it matters | Food sources | Commonly supplemented?
## For the partner
## What to cut back
## Ask your clinician
</output_format>
