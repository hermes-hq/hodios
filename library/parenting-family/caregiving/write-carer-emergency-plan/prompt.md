---
schema: 1
id: write-carer-emergency-plan
kind: prompt
title: Write a carer emergency plan
description: Writes the plan for what happens to the person you care for if you are suddenly ill, injured or delayed, with who steps in, a grab sheet for them, who to tell and how to register it.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, message]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [contingency-plan, carers, emergency-plan, carer-card, backup-carers]
pairs_with:
  prompts: [write-care-profile, build-care-rota, prepare-emergency-medical-summary]
  personas: [eldercare-advisor]
args:
  - name: care_situation
    description: Who you care for, what they cannot do safely without you (medicines, meals, moving, being left alone), when you are usually with them, and the country or region.
    type: text
    required: true
  - name: possible_helpers
    description: Family, friends, neighbours or services who could step in, how close they live, keys, and anything they already know. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What breaks if you are not there, Who steps in, Grab sheet for the stand-in, Telling people you are a carer, Registering the plan, Keeping it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help unpaid carers write a plan for the day they cannot be there: an accident, a sudden hospital admission, a train cancelled overnight. Experienced carers' workers know that most carers hold everything in their head, that the first few hours are the dangerous part (someone who cannot get up, take medicines or eat alone is left on their own), and that paramedics and hospital staff will not know a dependent person exists unless the carer carries something that says so. A good plan names a first and a second person who can be there within hours, gives them a one-page grab sheet and a way in, and is shared before it is needed. Many areas run carer emergency card or contingency schemes through councils or carer organisations; they differ by country and region.

<care_situation>
{{care_situation}}
</care_situation>
{{#possible_helpers}}Possible helpers: {{possible_helpers}}{{/possible_helpers}}
</context>

<task>
1. What breaks if you are not there: list, hour by hour from the moment the carer is missing, what the person would be unable to do safely (medicines, meals and drinks, toileting, mobility, being alone at night, pets), and rank the gaps by how fast they become dangerous.
2. Who steps in: name a first and a backup contact for the first 24 hours and for a longer absence (a week or more) from the helpers given, with what each covers, how they get in (key safe, spare key holder) and what to do if neither answers. If there are not enough people, say which kinds of services to ask about locally (emergency replacement care, the person's social care team, carer support organisations).
3. Grab sheet for the stand-in: a one-page sheet in a code block with the person's name and how they like to be addressed, how they communicate, daily routine, medicines "as on the current chart" with where the chart and medicines are kept, mobility and equipment, risks (falls, wandering, choking), key contacts (doctor, care team, family), and where the full care profile is. Fill only from what was given and leave blanks to complete.
4. Telling people you are a carer: a wallet card wording for the carer in a code block ("I am the main carer for... If I am taken ill, call..."), and a note to set the same contact as an emergency contact on the carer's phone.
5. Registering the plan: who to share it with (the stand-ins, the person's doctor or care team, a carer support service, a neighbour), and suggest checking whether a local carer emergency scheme exists, without naming one.
6. Keeping it current: when to review it (medicine change, new diagnosis, helper moves away) and a two-minute test run with the first stand-in.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent medicines, doses, phone numbers, schemes or services; copy medicines only as given and otherwise point to the current chart.
- Involve the cared-for person in the plan where they are able, and keep their dignity in how the grab sheet describes them.
- If the person cannot be left alone at all and there is no one to step in, say clearly this is a gap to raise with their care team or social care services now, not after an emergency.
- Do not recommend leaving keys in unsecured places; mention key safes or trusted key holders.
</constraints>

<output_format>
## What breaks if you are not there
Table: Time without you | What they cannot do | How serious.
## Who steps in
## Grab sheet for the stand-in
Code block.
## Telling people you are a carer
Wallet card in a code block.
## Registering the plan
## Keeping it current
</output_format>
