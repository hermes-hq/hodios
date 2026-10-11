---
schema: 1
id: apply-for-disabled-parking-permit
kind: prompt
title: Apply for a disabled parking permit
description: Prepares an application for a disabled parking permit such as a Blue Badge or accessible parking placard - eligibility, describing mobility honestly, medical evidence, using it abroad and renewals.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [blue-badge, disabled-parking, accessible-parking-placard, mobility-evidence, non-visible-disability]
pairs_with:
  prompts: [prepare-disability-benefits-application, prepare-government-form]
args:
  - name: applicant
    description: Who the permit is for (you, a child, a person you care for), their condition and how it affects walking, getting in and out of a car, or safety near traffic, including bad days, and whether they drive or are driven.
    type: text
    required: true
  - name: location
    description: Country and state, region or local authority where you live.
    type: string
    required: true
  - name: situation
    description: Anything else that matters - an existing benefit that may qualify automatically, a previous refusal, a renewal, a temporary condition, or travel abroad planned. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Likely route, Describing daily impact, Evidence, Steps, Using the permit, Confirm with the issuing office]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Disabled parking permits are issued locally (a council, state motor vehicle department, or regional authority) under rules that differ by place. Most schemes have two routes: automatic eligibility through certain benefits or conditions, and an assessed route where the applicant describes how far and how safely they can walk, sometimes with a mobility assessment. Many schemes now also cover non-visible conditions (for example severe anxiety in traffic, dementia, or conditions causing sudden incapacity) and children under a certain age with medical equipment. Applications fail when people describe their best day, give vague answers ("I find walking hard") instead of distances, time, pain, breathlessness and need for rests or aids, or send general medical letters that do not address mobility. Permits are personal: they belong to the disabled person, not the car, and misuse can lead to fines and confiscation. Recognition abroad varies (the EU parking card model and reciprocal arrangements exist but local rules apply).

Location: {{location}}
</context>

<task>
Applicant:
<applicant>
{{applicant}}
</applicant>
{{#situation}}

Situation:
<situation>
{{situation}}
</situation>
{{/situation}}

1. Likely route: automatic or assessed, temporary or permanent permit, and which criteria this person's situation may meet in {{location}}, all marked verify. Note non-visible condition criteria if relevant.
2. Describing daily impact: help the person describe honestly and specifically, with prompts: how far before pain, breathlessness or needing to stop; how long that takes; aids used; falls or near falls; what happens on bad days and how often; safety risks near traffic; effects that last after walking. Give an example answer structure, not invented facts.
3. Evidence: what usually helps (benefit award letters, letters from specialists or therapists that address mobility, prescriptions for mobility aids, care plans), and what usually does not.
4. Steps: where to apply officially, photo and ID needs, fee if common, assessment if any, typical timing, all marked verify; for a refusal, how to ask for a review.
5. Using the permit: rules of use, the person must be travelling, displaying correctly, where it does not allow parking, using it abroad (marked verify), and renewal.
6. Confirm with the issuing office: questions to ask.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never encourage exaggeration or invented symptoms; honest, specific descriptions including bad days are what assessors need.
- Do not state eligibility criteria, fees or processing times as fact; mark them verify.
- Do not help someone use or obtain a permit for a person who does not travel in the vehicle, or a relative's permit after their death.
- Point to official channels only, and warn about sites that charge to "process" free or low-cost applications.
{{> output/uncertainty}}
</constraints>

<output_format>
## Likely route
Short paragraph, marked verify.

## Describing daily impact
Prompts and an example answer structure.

## Evidence
Checklist with notes.

## Steps
Numbered.

## Using the permit
Bullets.

## Confirm with the issuing office
Numbered questions.
</output_format>
