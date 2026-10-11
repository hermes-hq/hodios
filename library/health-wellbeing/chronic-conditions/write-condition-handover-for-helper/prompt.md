---
schema: 1
id: write-condition-handover-for-helper
kind: prompt
title: Write a condition handover for a helper
description: Writes a short handover sheet about your or your child's long-term condition for a babysitter, respite carer, relative or house guest, with what is normal, what to do if, and who to call.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [docs, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [handover-sheet, babysitters, carers, care-plan, emergency-contacts]
pairs_with:
  prompts: [write-up-sick-day-plan, write-invisible-illness-explainer, plan-flare-day-logistics]
args:
  - name: condition
    description: Whose condition it is, the condition, and the care plan or instructions from the care team copied as written (seizure plan, hypo treatment, asthma action plan, allergy plan), including any emergency medicine and how it is given.
    type: text
    required: true
  - name: helper
    description: Who will be helping, how long for, what they already know, and the daily routine they will cover (meals, medicines, bedtime, school run).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Call emergency services if, About the condition, What normal looks like, If this happens, Daily routine, Where things are, Contacts, Gaps to fill before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write handover sheets that a non-medical helper can follow under stress. When a parent leaves a child with type 1 diabetes, epilepsy, severe asthma or a serious allergy with a babysitter or grandparent, or someone with a long-term condition has a friend staying to help after a flare, the information usually lives in the person's head or in a long clinic letter. Good handovers are short, put emergencies first, use "if this, do this" lines copied from the care plan, describe what normal looks like so the helper does not panic over the expected, list where everything is kept, and give contacts in the order to call. They never add instructions that the care team did not give, because a helper will follow the sheet exactly.

<condition>
{{condition}}
</condition>

<helper>
{{helper}}
</helper>
</context>

<task>
1. Call emergency services if: the emergency triggers from the care plan, copied exactly, plus the local emergency number as a placeholder "[your local emergency number]". If the plan gives none, add only universal triggers (not breathing or breathing with great difficulty, unresponsive, a seizure that does not stop, a severe allergic reaction) and flag the gap.
2. About the condition: two or three plain sentences a helper needs, nothing more.
3. What normal looks like: expected things the helper might otherwise worry about (for example a sensor alarm that just needs a snack per the plan, tiredness after a seizure, a cough at night).
4. If this happens: a table of situations and actions copied from the care plan word for word, including any emergency medicine exactly as written.
5. Daily routine: the routine for the time they are helping, with medicine times exactly as given.
6. Where things are: medicines, emergency kit, copies of the plan, devices and chargers.
7. Contacts: in the order to call.
8. Gaps to fill before you go: anything missing or unclear, and a suggestion to walk the helper through the plan in person, including any emergency medicine training the care team or the device leaflet recommends.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Copy all medical instructions, numbers and doses exactly as written. Never fill a gap with general medical knowledge, never convert units and never round.
- If the plan is ambiguous or seems inconsistent, flag it in Gaps rather than resolving it.
- No jargon; if the plan uses a medical term, add a short plain explanation in brackets only when you are sure of the meaning.
- Keep it to one or two printed pages.
- Include only personal details the user provided and needs on the sheet.
</constraints>

<output_format>
## Call emergency services if
## About the condition
## What normal looks like
## If this happens
Table: If | Do this (from the care plan).
## Daily routine
## Where things are
## Contacts
## Gaps to fill before you go
</output_format>
