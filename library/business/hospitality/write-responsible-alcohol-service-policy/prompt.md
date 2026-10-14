---
schema: 1
id: write-responsible-alcohol-service-policy
kind: prompt
title: Write a responsible alcohol service policy
description: Writes a venue's responsible alcohol service policy and staff guide - age checks, spotting intoxication, refusing service safely, guest care, incident records and points to confirm locally.
category: hospitality
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, founder]
subject: [hospitality]
advice_risk: [legal]
requires: [none]
inputs: [text, document]
output: [docs, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [responsible-service, age-verification, refusal-of-service, licensing, staff-training, incident-log]
pairs_with:
  prompts: [prepare-for-food-safety-inspection, write-frontline-service-standards]
  personas: [hospitality-manager]
args:
  - name: venue
    description: The venue and how alcohol is served - type (pub, restaurant, nightclub, hotel bar, event bar), opening hours, typical guests, door staff or not, and any delivery or takeaway alcohol.
    type: text
    required: true
  - name: location
    description: Country and region, so the policy can name the licensing authority and the points to confirm.
    type: string
    required: true
  - name: licence_conditions
    description: Conditions written on your licence or local rules you already know about (for example an age-check scheme, last entry time, incident book requirement). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and scope, Age checks, Spotting intoxication, Refusing service, Looking after guests, Incidents and records, Promotions and pricing, Training and sign-off, Points to confirm locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a licensed premises trainer who has written responsible service policies for pubs, restaurants, clubs and event bars. A policy only works if staff use it on a busy night: short rules, the words to say, who backs them up, and a record of what happened. Staff most often struggle with refusing a regular, a large group or a guest who is not obviously drunk, and with the moment of saying no without starting a fight. Guests refused service still need care: water, food, a seat, a call for a lift or a taxi, and never being put out alone in a vulnerable state. Rules on minimum age, accepted ID, serving intoxicated people, drink promotions and record keeping differ by country and licence.

Venue: {{venue}}
Location: {{location}}
{{#licence_conditions}}Licence conditions and known rules: {{licence_conditions}}{{/licence_conditions}}
</context>

<task>
1. Purpose and scope: who the policy covers (all staff serving or selling alcohol, door staff, managers) and the licence holder's commitment.
2. Age checks: the age threshold to check at (a "check anyone who looks under X" rule above the legal age) as `[CONFIRM local legal age and any scheme]`, accepted ID types `[CONFIRM]`, what to do with fake or borrowed ID, and proxy purchases.
3. Spotting intoxication: observable signs grouped by speech, balance, behaviour and appearance, plus things that are not proof (an accent, a disability, a medical condition) so staff do not misjudge.
4. Refusing service: the steps (alert a manager, refuse early and calmly, offer water and food, no further alcohol for the group member), short scripts for a regular, a group and a guest who argues, and what to do if a friend tries to buy for them.
5. Looking after guests: water and soft drinks freely available, help getting home, vulnerable guest care (separated from friends, unwell, possibly spiked), when to call emergency services.
6. Incidents and records: what goes in a refusals and incidents log, who reviews it, and how long to keep it `[CONFIRM]`.
7. Promotions and pricing: what the venue will not run (for example deals that reward drinking fast or a lot), with a note that some places restrict these by law.
8. Training and sign-off: induction, refresher frequency, a short quiz and a staff signature line.
9. Points to confirm locally: every placeholder with where to check (licensing authority, police licensing team, a licensing solicitor).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state the legal drinking age, accepted ID, penalties or record retention periods for the user's location as fact unless the user supplied them; use `[CONFIRM]` placeholders.
- Staff safety first: no instruction to physically remove guests unless trained door staff do it; staff can always refuse and call a manager or the police.
- Treat guests with dignity in every script; no humiliating language.
- Keep it short enough to read at induction: plain words, short lists.
</constraints>

<output_format>
## Purpose and scope
## Age checks
## Spotting intoxication
Table: Sign | What it looks like | Not proof on its own.
## Refusing service
Steps, then scripts as short quoted lines.
## Looking after guests
## Incidents and records
Log template: Date | Time | What happened | Action | Staff | Manager.
## Promotions and pricing
## Training and sign-off
## Points to confirm locally
Numbered.
</output_format>
