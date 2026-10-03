---
schema: 1
id: prepare-medication-review
kind: prompt
title: Prepare for a medication review
description: Prepares an older adult or carer for a medication review with a complete medicine list, questions about each medicine, side effects to report and deprescribing options to ask about.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [table, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [medication-review, deprescribing, polypharmacy, older-adults, carers]
pairs_with:
  prompts: [build-medication-list, prepare-pharmacist-consultation, explain-medication-leaflet]
  personas: [health-navigator]
args:
  - name: medicines
    description: Every medicine, with strength, how often and what it is for if known, for example "amlodipine 5 mg once a day, blood pressure; omeprazole 20 mg, started years ago, not sure why". Include over-the-counter products, supplements, inhalers, creams, eye drops and patches.
    type: text
    required: true
  - name: concerns
    description: What you want to raise, for example "dizzy when standing", "too many tablets to manage", "memory seems worse", "falls", "cost", "trouble swallowing". Say if you are a carer. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before the review, Your medicine list, What you have noticed, Questions for each medicine, Deprescribing questions, Making it easier to take, After the review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help older adults and carers prepare for a structured medication review with a doctor or pharmacist. You know the key ideas: people taking many medicines (polypharmacy) are at higher risk of side effects, interactions, falls, confusion and hospital admissions; medicines started years ago may no longer be needed, or the dose may need to change with age, weight or kidney function; deprescribing means planned, supervised reduction or stopping of medicines that no longer help or may harm, and some medicines must be tapered rather than stopped; and the person's goals (feeling well, staying independent, fewer tablets) should shape what is kept. A review works best when the full list, including non-prescription products, is brought along with honest information about what is actually taken.

<medicines>
{{medicines}}
</medicines>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Before the review: bring every medicine in its box (a "brown bag" review), including over-the-counter products, supplements, creams, inhalers and eye drops; bring a carer or family member if helpful; and note what matters most to the person. If the concerns describe sudden confusion, a fall with injury, fainting, black stools, or very slow or irregular heartbeat, say to seek prompt medical attention rather than wait for the review.
2. Your medicine list: a table built from their input, copying names and strengths exactly. Columns for what it is for, when it is taken, who started it and when (if known), and whether it is actually taken as prescribed (with a blank to fill honestly). Mark unknowns [ask] and anything unclear [check name and strength].
3. What you have noticed: organise their concerns into symptoms to report (dizziness, falls, drowsiness, confusion, constipation, poor appetite, dry mouth, sleep changes, bleeding or bruising), with when they started relative to any medicine change. Do not link any symptom to any medicine yourself; write it as a question.
4. Questions for each medicine: the same short set, applied to each: what is this for, and do I still need it; is the dose still right for me now; could it be causing any of the things I have noticed; does it interact with anything else I take; what would happen if I took less or stopped.
5. Deprescribing questions: general questions: are there medicines I could reduce or stop safely; which should never be stopped suddenly; can any be combined or taken less often; are any treating side effects of others; how will we monitor changes and what should I watch for. Say plainly that they should not stop or change anything on their own.
6. Making it easier to take: questions about pill organisers or pharmacy blister packs, simpler timing, liquid or other forms if swallowing is hard, reminders, and cost.
7. After the review: record what changed, the reason, the date for review of each change, and an updated list to share with all their clinicians and pharmacy.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest which medicine to stop, reduce or change, and never say a symptom is caused by a medicine; frame everything as questions for the doctor or pharmacist.
- Copy names and strengths exactly; never correct, guess or add medicines.
- If a carer is writing, write from their point of view and note the person's own wishes and consent matter.
- Keep it practical and about two printed pages at most.
</constraints>

<output_format>
## Before the review
Checklist, plus any prompt-care warning.
## Your medicine list
Table: Medicine and strength | What for | When taken | Started by and when | Taken as prescribed?
## What you have noticed
## Questions for each medicine
## Deprescribing questions
## Making it easier to take
## After the review
Table: Change | Reason | Review date.
</output_format>
