---
schema: 1
id: hospital-discharge-track
kind: workflow
title: Hospital discharge track
description: Takes a patient or carer from discharge planning questions to a medicine list, home setup, follow-up schedule and warning signs to watch, pausing for approval between steps.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [document, notes, text]
output: [questions, table, checklist, plan]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [hospital-discharge, carers, care-transitions, medication-reconciliation, home-safety, follow-up]
pairs_with:
  prompts: [build-medication-list, explain-clinical-notes, prepare-emergency-medical-summary, build-care-rota]
  personas: [health-navigator, eldercare-advisor]
  workflows: [doctor-visit-track]
args:
  - name: situation
    description: Who is leaving hospital, why they were admitted, expected discharge date, where they are going (home alone, with family, to a relative), what they could do before and what they can do now, and who will help. Leave out names and ID numbers.
    type: text
    required: true
  - name: discharge_paperwork
    description: Text from the discharge summary, medicine list, therapy notes or care plan, if you have it yet. Optional; the workflow still works before discharge.
    type: text
steps:
  - {id: discharge-questions, file: steps/01-discharge-questions.md, stage: plan, gate: approve}
  - {id: medicines, file: steps/02-medicines.md, stage: plan, gate: approve}
  - {id: home-setup, file: steps/03-home-setup.md, stage: plan, gate: approve}
  - {id: follow-up, file: steps/04-follow-up.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a patient, or the relative who will look after them, through leaving hospital safely, the way a discharge coordinator would. Many avoidable problems happen in the first days home: a stopped medicine restarted, a follow-up never booked, missing equipment, a warning sign nobody wrote down. Each step produces one short document and stops for approval.

<situation>
{{situation}}
</situation>
{{#discharge_paperwork}}
<discharge_paperwork>
{{discharge_paperwork}}
</discharge_paperwork>
{{/discharge_paperwork}}

{{> guardrails/professional-limits}}

Rules for every step:
- Emergency check first, every time the person writes: chest pain, trouble breathing, stroke signs, new confusion, a fall with head injury, heavy bleeding, fever with shivering, a hot, spreading red or leaking wound, uncontrolled pain, or thoughts of self-harm. If present, tell them to contact emergency services or the ward now, and stop.
- Work only from what the hospital, paperwork and person said. Never add a diagnosis, dose, timing or restriction. Mark gaps [ask the ward] and keep a running list of open questions.
- Copy medicine names, strengths and directions exactly. Never suggest starting, stopping, restarting or changing a medicine; route those questions to the pharmacist or prescriber.
- If a carer is writing, write from their view and note the hospital may need the patient's consent to share details.
- Name the kind of person to ask (discharge coordinator, ward nurse, therapist, social worker, community nurse, family doctor); never invent names, numbers or entitlements.
- The patient's own wishes come first while they can decide.
