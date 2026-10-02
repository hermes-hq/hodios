---
schema: 1
id: build-medication-list
kind: prompt
title: Build a medication list and schedule
description: Organises medicines from prescriptions and labels into a clear list and daily schedule, flags unclear entries and possible duplicates as questions for a pharmacist, and never changes doses.
category: medical-prep
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text, document, image]
output: [table, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [medication-list, pill-schedule, pharmacist-questions, carers, polypharmacy]
pairs_with:
  prompts: [prepare-doctor-questions, prepare-for-surgery, evaluate-supplement]
  personas: [health-navigator]
  workflows: [doctor-visit-track]
args:
  - name: medications
    description: Every medicine, copied from labels or prescriptions, with name, strength, directions, what it is for and who prescribed it. Include over-the-counter medicines, inhalers, creams, eye drops, injections, vitamins and supplements, plus allergies. Remove names and ID numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, Medication list, Daily schedule, As-needed medicines, Allergies, Questions for the pharmacist, Keeping it up to date]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help patients and carers keep an accurate, up-to-date medicine list. Medication errors often happen at handovers between clinicians, hospitals and pharmacies, when someone takes the same ingredient in two products, or when a list is out of date. A complete list that includes over-the-counter medicines and supplements, carried to every appointment, prevents many of these. Your job is to organise exactly what is on the labels, not to give medical advice.

<medications>
{{medications}}
</medications>
</context>

<task>
1. Parse every item. For each, record: the name exactly as written (and the generic or brand name if both appear on the label), strength, form, the directions exactly as written, what it is for if stated, the prescriber if stated, and special instructions (with food, avoid alcohol, do not crush, time apart from other medicines).
2. Where anything is missing, ambiguous or looks inconsistent (strength without directions, "as directed", two different directions for the same medicine, an abbreviation you are unsure of), write [unclear: check the label or ask the pharmacist] in that cell. Do not fill gaps with typical doses.
3. Build a daily schedule grid from the directions as written: morning, midday, evening, bedtime, plus weekly or monthly items on their day. Put as-needed medicines in a separate table with the maximum stated on the label, if one is stated.
4. Flag for the pharmacist, phrased as questions and not conclusions:
   - possible duplicate ingredients, especially paracetamol or acetaminophen in combination products, NSAIDs from more than one source, or two medicines that look like the same class;
   - timing questions (medicines often taken apart, such as thyroid tablets, iron, calcium or antacids);
   - supplements or herbal products alongside prescriptions;
   - anything prescribed by different clinicians who may not know about each other.
5. List allergies and what happened, if given.
6. Give tips for keeping the list current: update on every change, carry it, and ask for a full medication review periodically, especially when taking five or more medicines.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Copy names, strengths and directions exactly. Never change, round, convert or suggest a dose, timing change, or stopping a medicine, even if something looks wrong; raise it as a question instead.
- Do not state that two medicines interact; say "ask the pharmacist whether these can be taken together" and why it is worth asking.
- If an entry suggests an urgent problem (a possible overdose, a medicine taken double by mistake, severe side effects such as swelling of the face or trouble breathing), say to contact a poison-control service, a pharmacist or emergency services now, before anything else.
- If the input is a photo description or partial, list what could be read and what is missing.
- Remind them once to remove personal identifiers if they appear.
</constraints>

<output_format>
## Check first
Urgent issues or missing information, one to three lines.
## Medication list
Table: Medicine | Strength and form | Directions (as written) | For | Prescriber | Special instructions.
## Daily schedule
Table: Time | Medicine | Amount (as written) | Notes. Weekly or monthly items below it.
## As-needed medicines
Table: Medicine | When to use (as written) | Maximum (as written).
## Allergies
## Questions for the pharmacist
Numbered, each with a one-line reason.
## Keeping it up to date
</output_format>
