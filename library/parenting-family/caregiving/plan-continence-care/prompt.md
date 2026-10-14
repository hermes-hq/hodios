---
schema: 1
id: plan-continence-care
kind: prompt
title: Plan continence care at home
description: Helps a family carer manage a relative's incontinence at home with dignity, covering getting it assessed, routines, products to ask about, skin care, nights, going out and talking about it.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [incontinence, dignity, personal-care, ageing-parents, carers]
pairs_with:
  prompts: [plan-personal-care-at-home, plan-carer-sleep, build-care-rota]
  personas: [eldercare-advisor]
args:
  - name: situation
    description: Who you care for, what is happening (bladder, bowel, day, night, how often, how long), their mobility and memory, what they say about it, what has been tried, and the country.
    type: text
    required: true
  - name: concerns
    description: What is hardest now, for example nights, outings, sore skin, laundry, their embarrassment. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Get it assessed, Talking about it, Daily routine, Products to ask about, Skin and hygiene, Nights, Going out, When to get help quickly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help family carers handle incontinence the way an experienced continence nurse would advise. Families often assume incontinence is a normal part of ageing and go straight to buying pads, but it often has treatable or reversible causes (urine infections, constipation, medicines, drinking too little, not reaching the toilet in time because of mobility or memory), and many areas have continence services that assess and may supply products. Cutting back drinks usually makes things worse. Dignity matters as much as practicalities: matter-of-fact language, privacy, and the person's own choices where they can make them. Skin breakdown from moisture is common and preventable. Sudden incontinence, blood, pain or new confusion need prompt medical attention.

<situation>
{{situation}}
</situation>
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. Get it assessed: why an assessment by their doctor or a continence service comes before settling on products, and a short list of what to note beforehand (a few days' diary of toilet visits, leaks, drinks, bowel habits, medicines, mobility to the toilet) and questions to ask.
2. Talking about it: matter-of-fact, respectful wording with the person, words to avoid (nappies), and how to keep their control over choices.
3. Daily routine: prompted toilet times that fit their pattern, easy-to-reach toilet and clear route, clothing that is easy to undo, lighting, a commode or urinal to ask about if mobility is the barrier, and keeping drinks up through the day.
4. Products to ask about: kinds of products (pads, pull-ups, bed and chair protection, washable options) and how to get advice on fit, absorbency and supply through the assessment; no brands or prices.
5. Skin and hygiene: gentle washing and drying, barrier products to ask the nurse or pharmacist about, checking skin for redness or soreness, and when to report it.
6. Nights: reducing disturbed nights for both of them, night products, bedding protection, and a calm routine for changes.
7. Going out: a small kit, planning accessible toilets, and schemes that may give access to locked accessible toilets in some countries.
8. When to get help quickly: sudden new incontinence, pain, blood, fever, new confusion, constipation for several days, or skin breaking down.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose causes or advise on medicines; frame causes as things for a clinician to check.
- Never advise restricting fluids to reduce leaks.
- No brand names, prices or claims about free supply; say provision varies by country and area.
- Keep language dignified throughout; refer to the person as an adult.
</constraints>

<output_format>
## Get it assessed
## Talking about it
## Daily routine
## Products to ask about
## Skin and hygiene
## Nights
## Going out
Checklist for an outing kit.
## When to get help quickly
</output_format>
