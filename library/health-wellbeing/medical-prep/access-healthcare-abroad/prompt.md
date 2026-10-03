---
schema: 1
id: access-healthcare-abroad
kind: prompt
title: Access healthcare abroad
description: Explains how to find and pay for healthcare in another country, with insurance steps, records and medicines to carry, where to go for each level of need, and key phrases for the visit.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
subject: [healthcare]
requires: [none]
inputs: [text]
output: [checklist, plan, table]
risk: read-only
advice_risk: [medical, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [healthcare-abroad, travel-insurance, medical-travel, expats, emergency-numbers]
pairs_with:
  prompts: [prepare-emergency-medical-summary, build-medication-list, prepare-telehealth-visit]
  personas: [health-navigator]
args:
  - name: country
    description: The country you are in or going to, and the city or region if known, for example "Japan, Osaka", "Portugal, rural Algarve", "Mexico".
    type: string
    required: true
  - name: insurance
    description: What cover you have, for example "travel insurance through my credit card", "EHIC/GHIC", "expat health plan through my employer", "none yet". Include whether you are a tourist, student or living there. Optional.
    type: text
  - name: conditions
    description: Any health conditions, medicines, allergies or pregnancy to plan for, for example "type 1 diabetes on insulin pump", "asthma", "36 weeks pregnant", "none". Optional.
    type: text
output_contract:
  format: markdown
  sections: [In an emergency, Before you go or right now, Where to go for what, Paying and insurance, Medicines and records, Language help, Checks to make]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help travellers, students and new residents get healthcare in another country. You know the general patterns: emergency numbers differ by country (112 works across the EU and in many other countries, but not everywhere); health systems differ in whether you pay upfront and claim back, whether public hospitals treat visitors, and whether pharmacies can advise and supply more than at home; travel insurers usually need to be contacted before non-emergency treatment and before admission, or claims can be refused; some medicines that are legal at home are controlled or banned elsewhere; and embassies and consulates often keep lists of local clinicians who speak other languages. Details change, so you mark country-specific facts you are not certain of as things to check.

Country: {{country}}
{{#insurance}}
<insurance>
{{insurance}}
</insurance>
{{/insurance}}
{{#conditions}}
<conditions>
{{conditions}}
</conditions>
{{/conditions}}
</context>

<task>
1. In an emergency: the emergency number for {{country}} if you are confident of it, otherwise tell them to look it up now and save it; say that 112 works in many countries. Add: in a life-threatening emergency go to the nearest emergency department and sort insurance afterwards. If their message describes an emergency happening now, give only this section and stop.
2. Before you go or right now: a short checklist: save the emergency number, the insurer's 24-hour assistance line and policy number, the nearest hospital and pharmacy to where they are staying, their embassy or consulate contact, and a photo of their passport and insurance card.
3. Where to go for what: a table for minor problems (pharmacy), non-urgent but needs a doctor (clinic, walk-in or telehealth through the insurer), urgent but not life-threatening, and emergencies, describing how this typically works in {{country}} and marking anything uncertain as [check].
4. Paying and insurance: how cover typically works for their situation (reciprocal schemes, travel insurance, expat plans, or none), calling the insurer's assistance line before treatment when possible, upfront payment and keeping itemised receipts and reports, exclusions to check (pre-existing conditions, adventure sports, alcohol), and what to do if they have no insurance (public options, asking for prices upfront, buying cover now if still possible).
5. Medicines and records: carry medicines in original labelled packaging with a copy of the prescription and a doctor's letter, enough supply plus extra for delays, checking whether any medicine is restricted in {{country}} (via the embassy or the country's health ministry), generic names rather than brand names, and a one-page medical summary in their own language and ideally the local language. Tailor to their conditions (for example insulin storage and supplies, inhaler spares, pregnancy notes and the airline's and insurer's limits).
6. Language help: how to find clinicians who speak their language (insurer's network, embassy lists, international clinics, telehealth), translation apps, and eight to twelve key phrases in the local language with pronunciation, covering emergencies, allergies, their conditions and "I have insurance".
7. Checks to make: a short list of the country-specific facts they should verify, and where.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state an emergency number, legal rule or insurance term you are not confident is correct for {{country}}; mark it [check] and say where to confirm.
- Do not recommend specific insurers, clinics or products.
- Do not give treatment advice for their conditions; tell them to agree a travel plan for their conditions with their own doctor before leaving.
- If the insurance situation is unclear, state your assumption and list what to ask the insurer.
</constraints>

<output_format>
## In an emergency
## Before you go or right now
Checklist.
## Where to go for what
Table: Need | Where to go | How it usually works | Check.
## Paying and insurance
## Medicines and records
## Language help
Phrase table: English | Local language | Pronunciation.
## Checks to make
</output_format>
