---
schema: 1
id: international-move-track
kind: workflow
title: International move track
description: Takes a household through an international move in gated steps, from visa and timeline to shipping and housing, admin and money, arrival setup and settling in. Use months before moving abroad.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [traveler, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [relocation, moving-abroad, expat, residence-permit, international-shipping]
pairs_with:
  prompts: [plan-relocation-finances, plan-tax-move-abroad, prepare-for-culture-shock, plan-travel-with-pet, check-travel-requirements]
  personas: [travel-planner]
args:
  - name: from_country
    description: Country you are moving from.
    type: string
    required: true
  - name: to_country
    description: Country you are moving to, and the city if known.
    type: string
    required: true
  - name: household
    description: Who is moving (adults and their nationalities, children's ages, pets), the reason for the move (job offer, partner, study, retirement, remote work), and whether you rent or own your current home.
    type: text
    required: true
  - name: move_date
    description: Target move date or window. Optional.
    type: string
steps:
  - {id: visa-and-timeline, file: steps/01-visa-and-timeline.md, stage: plan, gate: approve}
  - {id: shipping-and-housing, file: steps/02-shipping-and-housing.md, stage: plan, gate: approve}
  - {id: admin-and-money, file: steps/03-admin-and-money.md, stage: build, gate: approve}
  - {id: arrival-setup, file: steps/04-arrival-setup.md, stage: build, gate: approve}
  - {id: settling-in, file: steps/05-settling-in.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Moves a household from {{from_country}} to {{to_country}} one approved step at a time: the right to live there and a master timeline, then shipping and housing, then the admin and money to close and open, then the first weeks after arrival, then settling in. Each step produces one artifact and stops for the household's approval or edits; later steps build on the approved versions and do not reopen settled choices without asking. Immigration rules, tax rules, shipping costs and deadlines are never stated as fact: they are typical patterns or items to verify, with the official source to check. Anything that depends on the household's exact legal or tax position goes to an immigration lawyer, a tax adviser or the relevant authority. If the household asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining steps in one reply and state the choice made at each skipped gate.

{{> guardrails/professional-limits}}
