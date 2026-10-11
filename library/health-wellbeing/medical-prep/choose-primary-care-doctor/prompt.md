---
schema: 1
id: choose-primary-care-doctor
kind: prompt
title: Choose a primary care doctor
description: Helps choose a primary care doctor, GP or family practice - how registration works where you live, coverage, practical fit, reading reviews, questions for a first visit, and switching steps.
category: medical-prep
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [checklist, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [primary-care, family-doctor, gp-registration, choosing-a-doctor, health-insurance, new-patient]
pairs_with:
  prompts: [prepare-annual-checkup, request-medical-records, build-medication-list, choose-right-care-service]
  personas: [health-navigator]
args:
  - name: needs
    description: Who needs a doctor (ages), long-term conditions or regular medicines, what matters to you (location, evening hours, language, gender of doctor, online appointments, continuity), and why you are choosing now (moved, unhappy, insurance changed).
    type: text
    required: true
  - name: system
    description: Country and region, and your coverage (public system, insurance plan type such as HMO or PPO, or paying yourself). Optional.
    type: text
output_contract:
  format: markdown
  sections: [How it works where you are, What matters for you, Finding a shortlist, Comparison table, Questions to ask, Switching steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone choose a primary care doctor, the person who will know their history, manage everyday and long-term care and refer them on. How this works depends heavily on the system. In some countries people register with a local practice by address and can ask for a particular doctor; in others they pick a family doctor or Hausarzt freely; in insurance-based systems the doctor must be in the plan's network, and some plan types require naming a primary care physician to get referrals. What people overlook: whether the practice is accepting new patients at all, how long a routine appointment actually takes to get, what happens out of hours, whether the doctor has experience with their long-term conditions, practice size and continuity (seeing the same clinician), and the type of clinician (doctor, nurse practitioner, physician associate) they will usually see. Online reviews skew to extremes and often rate front-desk experience rather than care; patterns across many reviews mean more than one story. A first appointment is a two-way check.

Needs: {{needs}}
{{#system}}System: {{system}}{{/system}}
</context>

<task>
1. Explain briefly how choosing or registering with a primary care doctor usually works in their country and coverage, with "check the current local process". If the country is missing, ask for it, and give the general checklist meanwhile.
2. Turn their needs into must-haves and nice-to-haves, with the reason for each (for example "diabetes care: practice runs a diabetes clinic").
3. Give a shortlist method: where to find practices that are accepting new patients and in network or in area, what to check on the practice's own information, and how to read reviews for patterns.
4. Give a comparison table they can fill in for two or three options.
5. Give questions to ask the practice before joining, and questions for the first appointment (how to reach the doctor, repeat prescriptions, test results, referrals, out-of-hours care, and continuity).
6. Give switching steps: registering, requesting records transfer, keeping enough of any regular medicine during the change, and updating pharmacies and specialists. Note that they generally do not need to give the old practice a reason.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name or recommend specific doctors or practices, or invent ratings.
- Do not imply one type of clinician is unsafe; describe the differences factually.
- If they have urgent symptoms now, tell them not to wait for registration and to use urgent services.
- Rules on registration, catchment and networks vary and change; tell them to confirm with the practice or insurer.
{{> output/uncertainty}}
</constraints>

<output_format>
## How it works where you are
## What matters for you
## Finding a shortlist
## Comparison table
Table: Factor | Option 1 | Option 2 | Option 3.
## Questions to ask
## Switching steps
</output_format>
