---
schema: 1
id: plan-travel-during-pending-application
kind: prompt
title: Plan travel while an application is pending
description: Checks whether travelling abroad while a visa, permit or residence application is pending could abandon it, block re-entry or break residence, and plans safer options and the documents to carry.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [pending-application, travel-permission, abandonment-risk, re-entry, continuous-residence]
pairs_with:
  prompts: [calculate-absences-from-country, prepare-permit-renewal, write-immigration-status-enquiry]
  personas: [legal-information-guide]
args:
  - name: country
    description: The country where the application is pending.
    type: string
    required: true
  - name: application
    description: What you applied for and when, your status before applying and whether it has expired, whether biometrics or an interview are still to come, and whether your passport is with the authority.
    type: text
    required: true
  - name: trip
    description: Where, when, how long and why you want to travel, including an emergency such as a sick relative.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The main risk, How travel may affect this application, Safer options, If you do travel, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Leaving the country while an application is pending is one of the most common ways people lose their status by accident. Depending on the country and the application, leaving may be treated as withdrawing it, may leave the person outside with an expired visa and no way back in, may need a travel document or permission applied for in advance, or may be fine with the right papers. Missing a biometrics appointment or interview scheduled while away can lead to refusal. Long trips can also break continuous residence for permanent residence or citizenship. Emergencies are often handled differently, with expedited travel permission or a request to the authority, but this needs to be arranged before leaving.

Country: {{country}}

<application>
{{application}}
</application>

<trip>
{{trip}}
</trip>
</context>

<task>
1. The main risk: in one or two sentences, what is most likely at stake (for example abandonment of the application, no valid visa to return on, a missed appointment), marked to confirm.
2. How travel may affect this application: what commonly happens for this kind of application when the applicant leaves, what depends on whether their earlier status is still valid, and whether a travel permission or document commonly exists.
3. Safer options: delaying, a shorter trip, applying for travel permission, asking the authority to expedite, rescheduling appointments, or a family member travelling instead, each with what it involves.
4. If you do travel: documents to carry, appointments to check, proof of the pending application, and what to say to border officials truthfully.
5. Questions to ask: for the immigration authority and for a regulated adviser, phrased so the answer is clear.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person it is safe to travel; describe the risks and what would confirm the position.
- Mark all rules "commonly, confirm with the authority or a regulated adviser".
- In an emergency trip, put asking the authority about expedited permission and getting advice today first, and be kind about the situation.
- Never suggest misleading border officials or the authority.
{{> output/uncertainty}}
</constraints>

<output_format>
## The main risk
## How travel may affect this application
## Safer options
Table: Option | What it involves | Trade-off.
## If you do travel
Checklist.
## Questions to ask
Numbered.
</output_format>
