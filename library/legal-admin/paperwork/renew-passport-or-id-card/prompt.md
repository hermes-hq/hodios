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
    description: The country that issues the document. Dual nationals name the one being renewed.
    type: string
    required: true
  - name: living_in
    description: Country you live in now. If it differs from the nationality, the plan covers renewing from abroad.
    type: string
    required: true
  - name: expiry_date
    description: Expiry date of the current document, for example "1 May 2027", or "already expired". Leave empty if you do not know it yet.
    type: string
  - name: travel_date
    description: Date and destination of your next international trip, including transit countries, for example "15 March 2027, Thailand via Doha". Optional.
    type: string
  - name: applicant
    description: Who the document is for. A child's renewal usually needs consent from both parents or legal guardians.
    type: enum
    enum: [adult, child]
    default: adult
  - name: circumstances
    description: Anything that changes the process, for example the document is lost, stolen or damaged, a name change, dual nationality, a parent who cannot be reached, or a visa or residence card tied to the old passport. Optional.
    type: text
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
Renewals go wrong in predictable ways. The passport is valid but not for long enough: many countries want validity for some months beyond arrival or departure and one or two blank pages, and airlines refuse boarding on those rules. The photo is rejected. A child's renewal stalls because one parent cannot or will not consent. The consulate abroad has a months-long appointment queue, or does not issue the national ID card at all. Or the new passport arrives and the person finds that the residence card, visas, electronic travel authorisations, airline bookings and bank records are tied to the old document number. A lost, stolen or damaged document is not a renewal: it is usually a replacement with a police report or declaration. Emergency travel documents exist but are limited, and some destinations and visa-waiver schemes do not accept them.

Document: {{document}}
Applicant: {{applicant}}
Nationality: {{nationality}}
Living in: {{living_in}}
{{#expiry_date}}Current expiry: {{expiry_date}}{{/expiry_date}}
{{#travel_date}}Next trip: {{travel_date}}{{/travel_date}}
</context>

<task>
{{#circumstances}}
Circumstances:

<circumstances>
{{circumstances}}
</circumstances>

{{/circumstances}}
1. Decide the process first. If the circumstances say the document is lost, stolen or damaged, say this is a replacement, list the report or declaration it usually needs, and adapt every later section to it. If the expiry date is missing, put it under "Need from you" and continue with [EXPIRY].
2. Timing verdict. If there is a trip: work out the remaining validity on the travel date and on the planned return, compare it with the entry rule the destination and any transit country commonly apply (name the rule as typical, verify on the official source), add the typical processing time from {{living_in}} including appointment waits (verify), and give one verdict: comfortable, tight, or at risk. Show the dates you compared. If there is no trip, say when to start based on typical processing times and the date the person would fall below common entry rules.
3. Where and how to apply: in {{nationality}}, or from {{living_in}} through the embassy, consulate, an honorary consulate or an official online service for citizens abroad. For an ID card from abroad, say whether this is commonly possible for citizens of {{nationality}} or must be checked; do not guess.
4. Documents and photo: the old document, proof of identity and of residence abroad if applying there, name-change evidence, photo specification and digital photo codes where used, fee payment method. For a child: both parents' or guardians' consent, the child's attendance, birth certificate, and what usually happens when one parent cannot be reached (a consent form, a court order or a sole-custody document), marked verify.
5. Steps in order: booking, fee, biometrics, collection or courier, with typical durations marked verify.
6. If the travel date is close or the verdict is at risk: expedited or urgent service, emergency or temporary documents and their limits, and asking the airline and the destination's authorities whether they accept them before travelling.
7. After it arrives: what to update (residence permit or card, visas in the old passport, which in many cases stay valid if carried with the new one, airline and frequent-flyer profiles, electronic travel authorisations tied to the passport number, bank, employer and tax records), and keep the old passport if it holds a valid visa.
8. Before writing, recompute the timing verdict from the dates given and check that no fee, processing time or validity rule is stated as fact.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state fees, processing times or validity rules as current fact; mark them "typical, verify on the official government site".
- Point only to official government channels. Warn about lookalike sites and agents that charge large fees for free or cheap services or ask for uploaded identity documents.
- Never suggest travelling on a document that does not meet the destination's rule, or applying for a child's passport without the consent the issuing country requires.
- Dual nationality, a name change, a disputed custody situation or a document held by an authority may change the process; say it needs confirming with the issuing authority, and for a custody dispute, a family lawyer.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
Only if the expiry date or another decisive fact is missing, start with "Need from you".

## Timing verdict
Bold verdict, then the dates compared (expiry, travel, typical entry rule, typical processing time) in two or three lines.

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
