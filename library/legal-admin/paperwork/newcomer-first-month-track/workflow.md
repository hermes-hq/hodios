---
schema: 1
id: newcomer-first-month-track
kind: workflow
title: Newcomer first month track
description: "Guides a newcomer through their first month in a new country in gated steps: registration and ID numbers, bank and phone, health cover, work and school, each checked against official sources."
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [individual, traveler, parent]
subject: [law]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [newcomers, immigration, residence-registration, bureaucracy, first-month, settling-in]
pairs_with:
  prompts: [prepare-for-immigration-appointment, understand-residence-permit-conditions, exchange-driving-licence-abroad, get-qualifications-recognised, find-free-legal-help, learn-unwritten-rules-of-new-country]
  personas: [legal-information-guide]
  workflows: [international-move-track]
args:
  - name: new_country
    description: The country you have just moved to, and the city or region if known (rules often differ by region or municipality).
    type: string
    required: true
  - name: status
    description: The basis of your stay. refugee-or-asylum routes the plan towards specialist help first.
    type: enum
    enum: [work, study, family, refugee-or-asylum, other]
    default: work
  - name: household
    description: Who has arrived (adults and their nationalities, children's ages), the permit or visa each holds or is waiting for, your arrival date, and whether your address is temporary or a signed lease.
    type: text
    required: true
  - name: language_level
    description: Your level in the main local language. It decides how much interpreter help and ready-made phrases the plan includes.
    type: enum
    enum: [none, basic, fluent]
    default: basic
steps:
  - {id: situation-and-deadlines, file: steps/01-situation-and-deadlines.md, stage: plan, gate: approve}
  - {id: registration-and-numbers, file: steps/02-registration-and-numbers.md, stage: build, gate: approve}
  - {id: bank-phone-and-money, file: steps/03-bank-phone-and-money.md, stage: build, gate: approve}
  - {id: health-cover, file: steps/04-health-cover.md, stage: build, gate: approve}
  - {id: work-school-and-next-months, file: steps/05-work-school-and-next-months.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a newcomer to {{new_country}} (basis of stay: {{status}}) through the first month one approved step at a time. First-month trouble comes from order more than effort: in many countries address registration unlocks the ID or tax number, which unlocks the bank account, the phone contract and the salary. So the track maps that chain and the legal deadlines first, then works through registration, money, health cover, and work and school. Each step ends with one artifact and stops for approval; later steps build on approved versions.

No rule of {{new_country}} is stated as current fact. Every requirement, deadline and fee is a typical pattern marked "verify", with the kind of official source to check. The household's documents and the official source win over any typical pattern.

Local language level: {{language_level}}. At none or basic, every office visit includes how to ask for an interpreter and three or four sentences to show, in the local language with an English gloss.

If the basis of stay is refugee-or-asylum, or the household mentions a pending claim, an expired permit, a refusal or a removal letter, do not plan around it: say it needs a specialist, point to refugee and migrant support organisations and free legal help as items to find locally, and continue only with what does not depend on it (phone, emergency care, school, finding legal help).

If asked to skip the approvals, confirm once that later steps will build on unreviewed choices, then run the remaining steps in one reply and state the choice made at each skipped gate.

{{> guardrails/professional-limits}}
