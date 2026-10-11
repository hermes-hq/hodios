---
schema: 1
id: prepare-annual-checkup
kind: prompt
title: Prepare for a routine check-up
description: Prepares for a routine or annual check-up with health changes since last time, screenings and vaccines to ask about for your age and sex, numbers to know and prioritised questions.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, questions, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [preventive-care, annual-physical, health-screening, vaccinations, primary-care, wellness-visit]
pairs_with:
  prompts: [prepare-doctor-questions, weigh-health-screening-invitation, build-medication-list, organize-family-medical-history]
  personas: [health-navigator]
args:
  - name: age
    description: Your age in years. Which screenings and vaccines are offered depends mostly on age.
    type: number
    required: true
  - name: sex
    description: Sex and, if relevant, gender or anatomy that matters for screening (for example "female", "male", "trans man, has a cervix"). Optional.
    type: string
  - name: changes
    description: What has changed since your last check-up, for example new symptoms, weight change, new medicines, sleep, mood, a new diagnosis in the family, pregnancy plans. Optional.
    type: text
  - name: history
    description: Existing conditions, medicines, smoking, alcohol, last screenings and vaccines you remember. Optional.
    type: text
  - name: country
    description: Country, because screening programmes, vaccine schedules and whether routine check-ups exist at all differ. Optional; the answer stays general without it.
    type: string
output_contract:
  format: markdown
  sections: [Before the visit, Changes since last time, Screenings and vaccines to ask about, Numbers to know, Questions for the visit, Your 30-second opening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone get the most out of a routine preventive visit: an annual physical, a periodic health check, or a "well person" appointment. Most people arrive with nothing prepared, the visit runs on the clinician's checklist, and the things the person actually wanted to raise get squeezed in at the door. Preventive care is also uneven: some countries offer an annual physical, others offer structured checks every few years (for example a cardiovascular risk check in mid-life) plus separate screening invitations by letter, so people often do not know what they are due. A prepared patient knows which screenings and vaccines to ask about, brings home readings and an up-to-date medicine list, and raises changes early. In some insurance systems a preventive visit is billed differently from a visit about a new problem, so it is worth asking before adding problems.

Age: {{age}}
{{#sex}}Sex: {{sex}}{{/sex}}
{{#changes}}Changes since last time: {{changes}}{{/changes}}
{{#history}}History: {{history}}{{/history}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Symptom check first: if the changes include anything that sounds urgent (chest pain, breathlessness, a lump, unexplained bleeding, rapid weight loss, thoughts of self-harm), say it should not wait for a routine check-up and they should book a prompt appointment or seek urgent care now.
2. Before the visit: a short checklist: medicine and supplement list with doses, home blood pressure or glucose readings if they have them, dates of last screenings and vaccines (or records to request), family history updates, results from care elsewhere, and whether to ask the clinic about fasting for any blood test. If they are in an insurance-based system, add "ask whether discussing a new problem changes what this visit costs".
3. Changes since last time: turn the changes they listed into a clear list in their words, grouped (body, mind and sleep, lifestyle, family history, plans such as pregnancy or travel). Where useful information is missing, add "[check before the visit]" prompts rather than guessing.
4. Screenings and vaccines to ask about: a table of the ones commonly offered at around this age and sex in many countries, such as blood pressure, cardiovascular risk and cholesterol, diabetes risk, cervical, breast, bowel and (as a shared decision) prostate screening, lung screening for long-term smokers, aneurysm screening, bone density, eye and dental checks; and vaccines such as flu, tetanus boosters, COVID-19, shingles, pneumococcal, and HPV or hepatitis B catch-up. Mark each "commonly offered", "depends on your risk" or "ask whether this applies", and say that ages and intervals are set by national programmes and must be checked. Include only what fits their age, sex and history.
5. Numbers to know: the measurements worth leaving with (blood pressure, weight or waist, cholesterol or overall cardiovascular risk, HbA1c or glucose if tested), with a column to write the result and a column for "what the clinician said it means". Do not give target values as personal advice.
6. Questions for the visit: top three first, then the rest, covering their changes, which screenings they are due, lifestyle changes that would matter most for them, and when to come back. Add a question about mood, alcohol, sleep or sexual health if their notes touch on them.
7. Your 30-second opening: a script that names the one or two things they most want covered, so these are not left to the end.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Screening is for people without symptoms. Anything new and worrying goes to a problem visit, not a screening list.
- Do not state screening ages, intervals, eligibility or vaccine schedules as fact for their country; frame them as "commonly offered" and tell them to check the national programme or ask the clinic.
- Do not interpret any numbers they already have as healthy or unhealthy for them, and do not recommend medicines or supplements.
- Do not add screenings for sex-specific organs without asking when sex or anatomy is not stated; list them under "ask whether this applies".
- Keep it to one page of preparation; drop sections that do not apply.
</constraints>

<output_format>
## Before the visit
Checklist.
## Changes since last time
## Screenings and vaccines to ask about
Table: Screening or vaccine | Why it is offered | Status (commonly offered / depends on risk / ask whether this applies) | Last done.
## Numbers to know
Table: Measurement | Your result | What the clinician said.
## Questions for the visit
Top 3, then the rest.
## Your 30-second opening
</output_format>
