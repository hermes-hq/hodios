---
schema: 1
id: reduce-falls-risk-at-home
kind: prompt
title: Reduce falls risk at home for a relative
description: Helps a family cut an older or frail relative's risk of falling at home, room by room and in daily habits, with what to raise with their doctor and a plan for if they fall and cannot get up.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [falls, home-safety, ageing-parents, frailty, home-adaptations]
pairs_with:
  prompts: [plan-strength-for-older-adults, choose-care-technology, prepare-medication-review]
  personas: [eldercare-advisor]
args:
  - name: person
    description: Who they are, age, health conditions you know of, how they move about (stick, frame, furniture-walking), any falls or near misses so far, and the country or region.
    type: text
    required: true
  - name: home
    description: The home layout and what worries you, for example stairs, bathroom, rugs, lighting, pets, getting up at night. Optional.
    type: text
  - name: their_view
    description: How the person feels about changes and help. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the falls so far tell you, Raise with their doctor, Room by room, Daily habits, If they fall, Making changes they accept]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families reduce falls the way a falls-prevention practitioner would. Families usually focus on rugs and grab rails, which help, but most falls in older people have several causes at once: medicines that cause dizziness or low blood pressure on standing, poor eyesight, foot problems and bad footwear, weak legs, needing the toilet urgently at night, and rushing. A fall is also a symptom: a new fall or several falls deserve a medical review, and many areas offer a falls assessment through the doctor. Lying on the floor for a long time is dangerous in itself, so a plan for getting help and getting up matters as much as prevention. Occupational therapists can assess the home and advise on equipment, often through local health or social care services.

<person>
{{person}}
</person>
{{#home}}Home: {{home}}{{/home}}
{{#their_view}}Their view: {{their_view}}{{/their_view}}
</context>

<task>
1. What the falls so far tell you: if falls or near misses are described, look for the pattern (time of day, place, standing up, at night, after a new medicine) and say what it may point to as questions, not diagnoses.
2. Raise with their doctor: a short list of questions for a falls or medicines review (medicines that may cause dizziness, blood pressure on standing, eyesight, feet, bladder at night, bone health, a falls assessment or occupational therapy referral). Flag that a fall with a head injury, new confusion, or one they cannot explain needs prompt medical attention.
3. Room by room: a checklist for entrance and stairs, living room, kitchen, bathroom and toilet, bedroom and the night-time route, covering lighting, clutter and trailing cables, rugs, rails and banisters, chair and bed height, things kept within reach, and pets underfoot. Mark each as quick fix, buy, or ask an occupational therapist.
4. Daily habits: footwear, sitting before standing, not rushing to the door or phone, drinks through the day, glasses on and clean, a stool or chair for dressing, keeping active with suitable strength and balance exercise approved by their doctor.
5. If they fall: what they should do (stay calm, check for injury, get help before trying to get up if hurt), how to call for help (a phone kept low, a personal alarm or wearable), who responds and how they get in, and when to call emergency services.
6. Making changes they accept: how to involve them, start with the changes they agree with, frame changes as keeping independence, and revisit after any fall.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell anyone to stop, start or change a medicine; frame medicines as questions for the doctor or pharmacist.
- Do not name products, brands, prices or specific services; describe kinds of equipment and who assesses for them, and say availability and funding vary by country.
- Respect the person's choices; a capable adult may accept some risk, so present options rather than orders.
- If they have just fallen and are hurt, confused, or on the floor now, say to call emergency services first.
</constraints>

<output_format>
## What the falls so far tell you
## Raise with their doctor
## Room by room
Checklist grouped by room, each item tagged quick fix, buy, or ask an OT.
## Daily habits
## If they fall
## Making changes they accept
</output_format>
