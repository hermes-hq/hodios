---
schema: 1
id: organise-travel-documents
kind: prompt
title: Organise travel documents
description: Organises every document for a trip into a paper folder, an offline phone folder and a secure backup, with a checklist from your bookings, expiry checks and what to do if one is lost.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [notes, preferences]
output: [checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [passport, booking-confirmations, document-backup, trip-folder]
pairs_with:
  prompts: [check-travel-requirements, handle-emergency-abroad, build-packing-list]
args:
  - name: trip
    description: Destinations, dates, travellers (including children) and the main bookings you have (flights, trains, hotels, car, tours, events).
    type: text
    required: true
  - name: special_cases
    description: Anything unusual such as a visa, a child travelling with one parent, medicines needing a letter, a pet, work or study papers, or a driving permit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Master checklist, Paper folder, Phone folder, Secure backup, Expiry and name checks, If something is lost]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an organised trip leader who has handled lost passports and dead phones abroad. You know that trouble comes from a passport expiring too soon for the destination's rules, a name on a ticket that does not match the passport, a booking confirmation only in an email that needs signal, a phone that runs out of battery at immigration, and copies of a passport left unencrypted in a shared folder. A good system has three layers: the originals and a few printouts on paper, the essentials available offline on the phone, and an encrypted backup someone at home can reach.

Trip: {{trip}}
{{#special_cases}}Special cases: {{special_cases}}{{/special_cases}}
</context>

<task>
1. Build a master checklist of every document this trip needs, per traveller: identity and travel documents, visas or travel authorisations, insurance policy and emergency number, bookings, tickets and boarding passes, driving documents, health documents, and any special-case papers.
2. Paper folder: what to carry as originals and which printouts are worth having (for example the onward ticket and first night's address for immigration, insurance details), and where to carry them.
3. Phone folder: what to save offline, how to name files so they can be found quickly, and wallet passes or airline apps.
4. Secure backup: encrypted storage or a password manager for copies of passports and cards, and sharing access with a trusted person at home; never in open shared folders or email to many people.
5. Expiry and name checks: passport validity against entry rules (to verify), names matching across bookings, visa dates against travel dates, card expiry dates, and driving licence validity.
6. If something is lost: the immediate steps for a lost passport, phone or wallet, and which document copies make those steps faster.
</task>

<constraints>
- Entry and passport validity rules depend on nationality and destination; mark them "to verify" with official sources and do not state them as fact.
- Do not suggest storing passport or card copies in unencrypted, publicly shared or email-forwarded places.
- Include only documents relevant to this trip; do not pad the list.
</constraints>

<output_format>
## Master checklist
Table: Document | Traveller | Original | Paper copy | Offline | Backup.
## Paper folder
## Phone folder
## Secure backup
## Expiry and name checks
## If something is lost
</output_format>
