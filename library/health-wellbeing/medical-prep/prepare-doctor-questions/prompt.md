---
schema: 1
id: prepare-doctor-questions
kind: prompt
title: Prepare questions for a doctor
description: Prepares a concise symptom summary, a 30-second opening and prioritised questions for a doctor's appointment, after checking for signs that need urgent care. Use the day before a visit.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [notes, text]
output: [summary, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [doctor-appointment, symptom-summary, patient-advocacy, plain-language-health]
pairs_with:
  prompts: [build-symptom-log, explain-lab-results, explain-diagnosis]
args:
  - name: symptoms
    description: What you have noticed, in your own words, including when it started and how it has changed.
    type: text
    required: true
  - name: history
    description: Medicines (including over-the-counter and supplements), allergies, conditions, relevant family history, what you have already tried. Optional.
    type: text
  - name: appointment_type
    description: The kind of visit, for example "10-minute GP appointment", "first visit with a dermatologist", "telehealth follow-up". Optional; primary care is assumed.
    type: string
output_contract:
  format: markdown
  sections: [Go now if, Your opening, Symptom summary, Medicines and history, Questions, Bring and do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help patients make the most of a short appointment. Primary care visits are often 10–15 minutes, people forget much of what they meant to say and much of what they are told, and the most important concern often comes out at the end as "one more thing". A clear opening, an organised symptom history and prioritised questions fix most of that. Clinicians commonly take a history with a structure like SOCRATES (site, onset, character, radiation, associated symptoms, time course, what makes it better or worse, severity) and like to know the patient's own ideas, concerns and expectations.

Symptoms: {{symptoms}}
{{#history}}History: {{history}}{{/history}}
{{#appointment_type}}Appointment: {{appointment_type}}{{/appointment_type}}
</context>

<task>
1. Check for emergency signs first: chest pain or pressure, difficulty breathing, signs of stroke (face drooping, arm weakness, slurred speech), a sudden severe "worst ever" headache, fainting, heavy bleeding, a severe allergic reaction, confusion, a high fever with a stiff neck or a rash that does not fade under pressure, sudden severe abdominal pain, or thoughts of suicide. If any is present, say to seek emergency care now instead of waiting for the appointment, and keep the rest brief.
2. Write a 30-second opening the person can read out: the main problem, how long, how it affects daily life, and what they hope to get from the visit.
3. Organise the symptoms with the SOCRATES headings that apply. Use their words. Where something useful is missing, write "[not noted: check before the visit]" rather than guessing.
4. Compile medicines with doses and how often, allergies, conditions, relevant family history, pregnancy possibility if relevant, recent travel, and what they have tried and its effect.
5. Write prioritised questions tailored to the appointment type. The top three go first because time may run out. Cover: what could be causing this, which tests are needed and what they will show, the options and their trade-offs, what to watch for and when to come back, and what happens next.
6. Add the person's own concern as a sentence they can say ("I'm worried this could be… because…"), if their notes show one.
7. Practical tips: bring someone or take notes, ask the doctor to repeat or write down key points, ask how and when results will come, and book a follow-up if not everything was covered.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest diagnoses or likely causes, even to inspire questions. Phrase everything as questions for the clinician.
- Never add, upgrade or downplay symptoms. Keep the person's wording.
- The summary must fit on one printed page; the opening must be readable in about 30 seconds.
- For a child's appointment, write from the parent's point of view and include feeding, sleep, wet nappies or toileting, and behaviour changes where relevant.
</constraints>

<output_format>
## Go now if
Only when an emergency sign is present: one clear instruction. Otherwise one line listing the signs that would mean not waiting.
## Your opening
A short paragraph in the first person.
## Symptom summary
Table: Detail | What I've noticed.
## Medicines and history
Bullets.
## Questions
### Top 3
### If there's time
## Bring and do
Short checklist.
</output_format>
