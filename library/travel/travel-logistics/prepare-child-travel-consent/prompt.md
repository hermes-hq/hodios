---
schema: 1
id: prepare-child-travel-consent
kind: prompt
title: Prepare a child travel consent letter
description: Prepares a consent letter and document checklist for a child travelling abroad with one parent, grandparents or a group, with official requirements to verify and border questions to expect.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, traveler]
requires: [none]
inputs: [notes]
output: [checklist, docs]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [minors, consent-letter, single-parent-travel, border-control, family-travel]
pairs_with:
  prompts: [check-travel-requirements, organise-travel-documents, plan-family-trip]
args:
  - name: situation
    description: Who the child is travelling with, who is not travelling (the other parent or both parents), the countries of departure, transit and destination, and the dates.
    type: text
    required: true
  - name: family_details
    description: Anything that affects the papers, such as different surnames, a sole custody order, a deceased or absent parent, or adoption. Leave out names and ID numbers; the letter will use placeholders. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Requirements to verify, Documents checklist, Consent letter draft, Border questions to expect, When you need more than a letter]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a family travel adviser. To prevent child abduction, many countries and airlines expect proof that a child travelling without one or both parents has permission. Some countries require a specific official form or a notarised authorisation, sometimes from the country the child lives in rather than the one they visit; others have no legal requirement but border officers may still ask questions. Different surnames between parent and child often trigger questions, so birth certificates and custody papers help. Where parents disagree, or a court order limits travel, a letter is not enough and legal advice is needed.

Situation: {{situation}}
{{#family_details}}Family details: {{family_details}}{{/family_details}}
</context>

<task>
1. List the requirements to verify for each country involved (departure, transit, destination) and for the airline: whether a consent letter is recommended or a specific official form or notarisation is required, and where to check (government travel or immigration sites, the embassy, the airline).
2. Build a documents checklist: the child's passport and any visa, the consent letter, copies of the absent parent's ID, birth certificate showing parentage, custody or death certificate or adoption papers where relevant, and contact details for the absent parent.
3. Draft a consent letter with placeholders in square brackets for names, dates of birth, passport numbers, travel dates, destinations, the accompanying adult, contact details and signatures, with a line for notarisation or witness if required.
4. List questions border officers commonly ask the child and adult, and how to prepare a child calmly.
5. Say when a letter is not enough: a custody dispute, a court order, the other parent refusing, or a destination with mandatory official forms, and which professional or authority to contact.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Requirements differ by country and change; mark every requirement "to verify" with an official source and do not state that a letter alone is sufficient.
- Use placeholders for all personal details; do not ask for or include real ID numbers in the draft.
- Never help a parent take a child abroad without the other parent's consent where it is needed, or work around a court order; refer to a family lawyer.
</constraints>

<output_format>
## Requirements to verify
Table: Country or carrier | What may be required | Where to check.
## Documents checklist
## Consent letter draft
Letter with [placeholders].
## Border questions to expect
## When you need more than a letter
</output_format>
