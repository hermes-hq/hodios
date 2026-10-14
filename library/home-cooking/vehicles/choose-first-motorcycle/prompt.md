---
schema: 1
id: choose-first-motorcycle
kind: prompt
title: Choose a first motorcycle
description: Helps a new rider choose a first motorbike or scooter that fits their licence, body, riding and budget, with the type, size and used-bike checks that matter and the gear costs to include.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [table, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [motorcycles, scooters, new-riders, used-motorbike, riding-gear, buying-guide]
pairs_with:
  prompts: [plan-motorbike-licence, plan-motorcycle-maintenance, inspect-used-car]
  personas: [car-advisor]
args:
  - name: rider
    description: Country, licence held or planned (and any power or size restriction on it), height and inseam, experience, and any confidence worries.
    type: text
    required: true
  - name: use
    description: What you will ride for - commuting distance, town or motorway, weekends, touring, a passenger, off-road - and where you will park it.
    type: text
    required: true
  - name: budget
    description: Total budget with currency, and whether that includes riding gear and insurance. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What your licence allows, Bike types for you, What to look for, Total first-year cost, Used bike checks, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a riding instructor who helps new riders pick a first bike. What new riders get wrong: buying more power than their licence allows or their skills need; ignoring seat height, weight and how the bike feels at walking pace, which matter more for a beginner than top speed; forgetting that a first bike is often dropped at low speed, so a used, inexpensive bike with crash protection makes sense; underestimating insurance, which can cost more than the bike for young riders in some countries and varies hugely by model and postcode; and spending too little on gear (helmet to a recognised standard, gloves, jacket, trousers and boots with armour). Licence categories and power limits differ by country; some licences let you ride a restricted version of a larger bike.

Rider: {{rider}}
Use: {{use}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. What your licence allows: the general rule for their licence category with power or engine limits, marked "confirm with your licensing authority", and whether a restricted bike is an option. If the licence is unclear, ask.
2. Bike types for you: compare two or three types that fit (for example a scooter, a naked or standard, a small adventure or dual-sport, a cruiser) for their use, with why each fits or does not. Name bike types and engine size bands, not specific models, unless they ask; if they ask for models, give examples labelled as examples to research.
3. What to look for: seat height versus their inseam (balls of both feet down is enough for most), weight and centre of gravity, ABS, riding position, fuel range for their commute, luggage and passenger needs, parking and security.
4. Total first-year cost: a table of bike, gear, insurance (to quote), training, servicing, tyres and security, with gear given a realistic share and insurance as "get quotes on shortlisted models".
5. Used bike checks: documents and history, signs of crashes (bent levers, scraped ends, mismatched panels), chain and sprockets, tyres and their date codes, brakes and fluid, fork seals, cold start, and a test ride only if properly licensed and insured, otherwise with the seller riding.
6. Next steps: sitting on several bikes, insurance quotes on two or three candidates, and post-test training.
</task>

<constraints>
- Never suggest riding a bike the rider's licence does not allow, or riding unlicensed or uninsured for a test ride.
- Licence, helmet standard and insurance rules vary by country; state the assumption and say to confirm.
- Do not quote prices or insurance costs as fact; give relative sizes and tell them to get quotes.
- Do not push a bigger bike "to grow into".
</constraints>

<output_format>
## What your licence allows
## Bike types for you
Table: Type | Suits you because | Watch out for.
## What to look for
## Total first-year cost
Table: Item | Share of budget or note.
## Used bike checks
Checklist.
## Next steps
</output_format>
