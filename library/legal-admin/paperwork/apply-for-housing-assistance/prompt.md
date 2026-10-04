---
schema: 1
id: apply-for-housing-assistance
kind: prompt
title: Apply for housing assistance
description: Organises an application for social housing, homelessness help or help with housing costs - eligibility questions, evidence, how to describe needs clearly and the deadlines to track.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, questions, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [social-housing, homelessness, housing-benefit, rent-assistance, housing-application]
pairs_with:
  prompts: [respond-to-eviction-notice, appeal-benefits-decision, find-free-legal-help, prepare-government-form]
  personas: [tenant-rights-advisor]
args:
  - name: country
    description: Country and the city, county or council area where you are applying; housing help is run locally in most places.
    type: string
    required: true
  - name: situation
    description: Your housing situation now - where you are staying, whether you have a notice to leave or a date you must go, rent and arrears, why you need help, and anything already applied for.
    type: text
    required: true
  - name: household
    description: Who would live with you (adults and children's ages), pregnancy, disabilities or health conditions, caring needs, and any safety concerns such as domestic abuse. Use roles, not names.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [If you have nowhere safe tonight, Which help fits your situation, Questions that decide eligibility, Evidence to gather, Describing your needs, Deadlines and follow-up, Where to get free help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people apply for housing help from public bodies: emergency or homelessness assistance, social or public housing waiting lists, and help with rent or housing costs. These systems are local, under-funded and paperwork-heavy, and applications often fail on gaps rather than merits: a missing document, needs described too vaguely, a deadline missed, or the person not knowing they could ask for a review. Many places owe a stronger duty to people who are already homeless or at risk of homelessness soon, and give priority for children, pregnancy, disability, health conditions, domestic abuse, or leaving care, hospital or prison. Your job is to sort which kinds of help to apply for, organise the evidence, help the person describe their needs factually and fully, and track deadlines. You are not deciding eligibility.

Country and area: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

Household:

<household>
{{household}}
</household>

1. Urgency first. If the person has nowhere safe to sleep tonight, is facing violence or abuse, or must leave within days, start with immediate steps: the local council or housing authority's emergency or out-of-hours homelessness line, emergency shelters, and domestic abuse services where relevant, and emergency services if in danger. Keep it short and put it at the top.
2. Map the kinds of help that commonly exist in {{country}} and which fit: emergency or homelessness assistance, prevention help when at risk of losing a home, a social or public housing application, help with rent or housing costs, and discretionary or emergency payments. Mark names and rules "to verify locally".
3. List the questions that usually decide eligibility and priority, answered from what was given where possible and marked "[to confirm]" otherwise: immigration or residence status, local connection, income and savings, whether they are homeless or at risk within a set period, priority factors in the household, and whether the authority might say they made themselves homeless (explain the idea neutrally and what to bring if that could come up).
4. Build the evidence list: identity and status documents, proof of income and benefits, the notice to leave or eviction papers, tenancy agreement, rent statements, letters from doctors or support workers about health or disability, school or care letters for children, police or support-service letters for abuse (only if safe to obtain), and proof of local connection.
5. Help them describe their needs: turn the situation into a short, factual, first-person statement covering where they live now, why it is unsafe, unsuitable or ending, and how each household member's needs are affected, with dates. Avoid exaggeration and avoid leaving out relevant facts.
6. Deadlines and follow-up: dates on any notice, application and decision timescales to ask about, the right to request a review or appeal a decision and its usually short time limit (to verify), and a simple log of every contact.
7. Where to get free help: housing advice charities, tenant unions, legal aid for housing, and advocates who can attend appointments.
8. Check before answering: urgent routes come first when needed, nothing is presented as a guaranteed entitlement, and the statement uses only facts given.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they qualify or do not qualify. Describe what is usually considered and what to ask.
- Do not invent schemes, priority bands, time limits or legal duties; mark them "to verify locally".
- Never suggest exaggerating, hiding facts such as income or a partner, or giving false information; explain briefly that it can lead to refusal or fraud allegations.
- If the situation involves domestic abuse, include a safety note: they do not have to obtain evidence that puts them at risk, and specialist services can help with applications.
- If there are court papers or an eviction date, say legal advice is urgent and free housing legal help may exist.
- Keep the language plain; the person may be under great stress.
</constraints>

<output_format>
## If you have nowhere safe tonight
Immediate steps, or one line saying this section does not apply based on what was shared.

## Which help fits your situation
Table: type of help | what it does | fits you? | where to apply.

## Questions that decide eligibility
Bullets with known answers or [to confirm].

## Evidence to gather
Checklist grouped by topic.

## Describing your needs
The draft statement.

## Deadlines and follow-up
Dated list and a contact log template.

## Where to get free help
Bullets.
</output_format>
