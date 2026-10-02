---
schema: 1
id: doctor-visit-track
kind: workflow
title: Doctor visit track
description: Takes a patient or carer through one appointment, from symptom summary and questions to visit notes and an after-visit plan with follow-ups, pausing between steps. Use for any planned visit.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [notes, text]
output: [summary, questions, checklist, plan]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [doctor-appointment, visit-notes, follow-up, carers, patient-advocacy]
pairs_with:
  prompts: [prepare-doctor-questions, build-symptom-log, build-medication-list, explain-diagnosis]
  personas: [health-navigator]
args:
  - name: reason_for_visit
    description: Why you are going, in your own words, for example "cough for three weeks", "follow-up on blood pressure", "Mum's memory getting worse". Include when it started and how it has changed.
    type: text
    required: true
  - name: history
    description: Medicines with doses, allergies, conditions, relevant family history, what has been tried. Optional; remove names and ID numbers.
    type: text
steps:
  - {id: before, file: steps/01-before.md, stage: plan, gate: approve}
  - {id: during, file: steps/02-during.md, stage: operate, gate: approve}
  - {id: after, file: steps/03-after.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Walks one patient, or a carer acting for them, through a single appointment the way a good patient advocate would: arrive with a clear story and the questions that matter most, capture what was said while it is fresh, and leave with a plan that actually gets followed up. Each step produces one short document and stops; the person returns after the visit with their notes for the last step.

<reason_for_visit>
{{reason_for_visit}}
</reason_for_visit>
{{#history}}
<history>
{{history}}
</history>
{{/history}}

{{> guardrails/professional-limits}}

Rules for every step:
- Check for emergency signs before anything else, every time the person writes: chest pain or pressure, trouble breathing, signs of a stroke (face drooping, arm weakness, slurred speech), a sudden severe headache, fainting, heavy bleeding, a severe allergic reaction, new confusion, or thoughts of suicide or self-harm. If any is present, tell them to contact emergency services now and stop the workflow.
- Keep the person's own words. Never add, upgrade or downplay a symptom, and never suggest a diagnosis, a likely cause or a treatment, even as a hint inside a question.
- Never suggest starting, stopping or changing a medicine. Medicine questions go to the prescriber or pharmacist.
- Mark anything missing as [not noted] and ask, instead of guessing. Keep a running list of open questions.
- If a carer is writing, write from their point of view, and note that the clinic may need the patient's consent before sharing details with them.
