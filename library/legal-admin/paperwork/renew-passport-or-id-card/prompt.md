---
schema: 1
id: renew-passport-or-id-card
kind: prompt
title: Renew a passport or ID card
description: Plans renewing a passport or national ID card from home or abroad, with timing against upcoming travel, photo rules, documents, consulate steps and what to update afterwards.
category: paperwork
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
model_tier: mid
reasoning: optional
level: beginner
tags: [passport-renewal, national-id, consulate, passport-validity, emergency-travel-document]
pairs_with:
  prompts: [check-travel-requirements, handle-emergency-abroad, organize-important-documents]
args:
  - name: document
    description: Which document you are renewing.
    type: enum
    enum: [passport, id-card]
    default: passport
  - name: nationality
    description: The country that issues the document. Dual nationals list the one being renewed.
    type: string
    required: true
  - name: living_in
    description: Country you live in now. If it differs from the nationality, the plan covers renewing from abroad.
    type: string
    required: true
  - name: travel_date
    description: Date of your next international trip and the destination, if any, for example "15 March 2027, Thailand". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Timing verdict, Where and how to apply, Documents and photo, Steps, If you have to travel soon, After it arrives, Confirm on the official site]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Renewals go wrong in predictable ways: the passport is technically valid but not for long enough to enter the destination (many countries want validity for some months beyond departure and blank pages), the photo is rejected, a child's renewal needs both parents' consent, the consulate abroad has a months-long appointment queue, or the person discovers that their residence permit, visas, airline bookings and bank records are tied to the old document number. Emergency travel documents exist but are limited, and some destinations and visa-waiver schemes do not accept them.

Document: {{document}}
Nationality: {{nationality}}
Living in: {{living_in}}
{{#travel_date}}Next trip: {{travel_date}}{{/travel_date}}
</context>

<task>
1. Ask for the current document's expiry date if not given, and whether it is lost, stolen or damaged rather than expiring (a different process with a police report). Continue with the expiry as [EXPIRY] if unknown.
2. Timing verdict: if there is a trip, compare the expiry with the destination's likely entry validity rule (marked verify on the destination's official source) and the typical processing time from {{living_in}} (marked verify), and give a verdict: comfortable, tight, or at risk. If there is no trip, recommend when to start based on typical processing times.
3. Where and how to apply: from home or, if {{living_in}} differs from {{nationality}}, via the embassy, consulate or an official online service for citizens abroad. For an ID card, say whether renewing from abroad is commonly possible for this nationality or must be checked.
4. Documents and photo: the old document, proof of identity and residence, name-change evidence, photo specification and digital photo codes where used, and for children the consent of both parents or legal guardians.
5. Steps in order with appointment booking, fee payment, biometrics, collection or courier.
6. If the travel date is close: expedited service, emergency or temporary documents, their limits, and asking the airline and destination whether they are accepted.
7. After it arrives: what to update (residence permit or card, visas in the old passport, which are often still valid when carried with the new one, airline and frequent flyer profiles, electronic travel authorisations tied to the passport number, bank and employer records), and keep the old passport if it holds valid visas.
8. Before writing, check the verdict against the dates given.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state fees, processing times or validity rules as current fact; mark them "typical, verify on the official government site".
- Point only to official government channels. Warn about lookalike sites and agents charging large fees for free or cheap services.
- If the person has dual nationality, a name change, or a parent who will not consent, say that may change the process and needs confirming with the issuing authority.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Timing verdict
Bold verdict, then two or three lines.

## Where and how to apply
Bullets.

## Documents and photo
Checklist.

## Steps
Numbered, with typical durations marked verify.

## If you have to travel soon
Bullets, or "Not needed".

## After it arrives
Checklist of things to update.

## Confirm on the official site
Numbered questions.
</output_format>
