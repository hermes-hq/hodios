---
schema: 1
id: plan-respite-break
kind: prompt
title: Plan a respite break
description: Plans a specific break for an unpaid carer, comparing respite options, how to arrange and fund them, preparing the cared-for person, a handover pack and a plan for the time off.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist, message]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [respite-care, carers, carer-breaks, short-breaks, handover]
pairs_with:
  prompts: [build-care-rota, manage-caregiver-stress, write-care-profile]
  personas: [eldercare-advisor]
args:
  - name: care_situation
    description: Who you care for, their main needs day and night, how they feel about other people helping, what care or services are already in place, and the country or region.
    type: text
    required: true
  - name: break_wanted
    description: The break you want, for example "one afternoon a week", "a weekend for my sister's wedding", "a week's holiday in August", and your rough budget if any.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The break you need, Respite options compared, How to arrange and pay, Preparing them, Handover pack, Your time off, Fallback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help unpaid carers actually take a break, the way an experienced carers' support worker would. Most carers wait until they are at breaking point, then find respite takes weeks to arrange. What experienced workers know: respite comes in many forms (a sitter for a few hours, a day centre, a friend or relative stepping in, live-in or replacement care at home, a short stay in a care home, holidays designed for carers and the people they care for); planned, regular respite works better than emergency respite; the person cared for often resists at first and settles better with a short trial visit; and the carer often spends the break doing chores unless they plan otherwise. Funding and assessments for respite vary a lot by country and region.

<care_situation>
{{care_situation}}
</care_situation>

<break_wanted>
{{break_wanted}}
</break_wanted>
</context>

<task>
1. The break you need: restate the break, its length and dates, and whether it needs cover in the day, at night or both.
2. Respite options compared: a table of the options that fit this break and these needs, with what each involves, the person's likely reaction, typical lead time, rough cost category (free or funded in some places, low, medium, high) as "check locally", and what it needs from the carer to set up.
3. How to arrange and pay: who usually arranges each option (the person's health or social care team, a carer's assessment or local equivalent, carer support organisations, condition-specific charities, private providers, family) and questions to ask when calling. Never invent providers, prices or entitlements.
4. Preparing them: how to involve the person in the decision while they can decide, a trial visit or short first session, familiar objects and routines, and words to explain the break that are honest and respectful.
5. Handover pack: a checklist of what a stand-in carer needs (routines, likes and dislikes, communication, medicines as prescribed with the chart, mobility and equipment, emergency contacts, what to do if they are unwell), pointing to a care profile document if they have one.
6. Your time off: a plan for the carer's break that protects actual rest, how they will get updates (once a day, not constantly), and what to do with guilt.
7. Fallback: what happens if the respite falls through or the person becomes unwell during it.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Name kinds of services and who to ask; never invent names, phone numbers, prices or entitlements, and say these vary by country.
- Respect the cared-for person's wishes and dignity while being clear the carer's break is legitimate and needed.
- Do not give medical or care technique advice; the stand-in carer follows existing care plans and prescriptions.
- If the carer describes being at breaking point, unsafe, or thinking of harming themselves or the person, say to contact their doctor, the person's care team or emergency services now about emergency respite and support.
- If the person cared for has had a sudden change (new confusion, a fall, not eating or drinking), say that needs their doctor before the break is planned.
</constraints>

<output_format>
## The break you need
## Respite options compared
Table: Option | What it involves | Likely reaction | Lead time | Cost (check locally) | Setup needed.
## How to arrange and pay
## Preparing them
## Handover pack
Checklist.
## Your time off
## Fallback
</output_format>
