---
schema: 1
id: prepare-travel-health-visit
kind: prompt
title: Prepare for a travel health appointment
description: Prepares for a travel clinic or pre-trip doctor visit with your itinerary and risks, vaccines and malaria prevention to ask about, timing before departure, a medicine kit and post-trip warning signs.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [travel-vaccines, travel-clinic, malaria-prevention, yellow-fever, pre-travel-advice, travel-medicine]
pairs_with:
  prompts: [travel-with-medication, access-healthcare-abroad, build-medication-list, prepare-emergency-medical-summary]
  personas: [health-navigator]
args:
  - name: itinerary
    description: Where and how you are travelling, for example "3 weeks Vietnam and Cambodia, cities then rural homestays, trekking, street food", "visiting family in Lagos for a month", "business trip to Nairobi then safari".
    type: text
    required: true
  - name: departure
    description: When you leave, as a date or "in 3 weeks". Timing decides what can still be done.
    type: string
    required: true
  - name: travellers
    description: Who is going and anything relevant, for example ages, pregnancy or plans to conceive, conditions, medicines, immune problems, vaccines you know you have had. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Timing, What to bring to the appointment, Vaccines to ask about, Malaria and bite prevention, Travel health kit, Questions for the clinic, After you return]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone prepare for a pre-travel health appointment. Travel clinics assess risk from the detail of the trip, not just the country: rural versus city, season, length of stay, activities (trekking, caving, contact with animals, healthcare work), accommodation, and visiting friends and relatives, which carries higher risk than people expect because they eat local food and often skip precautions. Ideally the visit is six to eight weeks before departure, because some vaccines need several doses or time to work, but a late visit is still worthwhile. Commonly discussed vaccines include routine ones being up to date (such as measles and tetanus), hepatitis A, typhoid, hepatitis B, rabies, yellow fever (which some countries require as an entry certificate, given only at approved centres and needed at least ten days before arrival), Japanese encephalitis, meningococcal and tick-borne encephalitis. Malaria prevention follows the ABCD approach: awareness of risk, bite prevention, the right preventive tablets if advised (each has a different start and stop schedule, and some must continue for weeks after return), and prompt diagnosis of any fever. Requirements and recommendations change, so official national travel health sources and the clinic are the authority.

Itinerary: {{itinerary}}
Departure: {{departure}}
{{#travellers}}Travellers: {{travellers}}{{/travellers}}
</context>

<task>
1. Timing: from {{departure}}, say whether there is comfortable time, limited time or very little time, what that means (some multi-dose courses may be shortened or not possible, entry certificates may need lead time), and to book now regardless.
2. What to bring to the appointment: the full itinerary with regions, dates, activities and accommodation; vaccination records (and how to request them if missing); medicine list; conditions, pregnancy or plans to conceive, allergies; and questions written down.
3. Vaccines to ask about: a table of the vaccines commonly discussed for this kind of trip, each marked "often recommended", "depends on activities or length of stay", or "may be an entry requirement, check", with the reason in one line and a column for "what the clinic advised". Include routine vaccines to check are up to date. Do not say which they need.
4. Malaria and bite prevention: whether malaria is commonly a consideration for the regions named (say to confirm with the clinic or official sources), the ABCD approach, bite prevention (repellent, covering up at dusk and night, nets or screened rooms), and the questions to ask about preventive tablets (which one suits me and my medicines, when to start and stop, side effects, cost). Mention that other insect-borne infections such as dengue have no tablet, so bite prevention matters everywhere.
5. Travel health kit: a checklist tailored to the trip (regular medicines in hand luggage with spare supply, oral rehydration salts, plasters and antiseptic, repellent, sunscreen, a thermometer, condoms, and anything specific to activities such as altitude), with prescribed items listed as "ask the clinic", not as things to buy.
6. Questions for the clinic: top three first, including food and water precautions, rabies risk and what to do after an animal bite or scratch abroad, altitude if relevant, and travel insurance that covers medical evacuation.
7. After you return: a fever within weeks to months of returning from a malaria area needs urgent medical assessment the same day, saying where they have been; also persistent diarrhoea, rashes or other new symptoms. Tell them to mention their travel to any clinician.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state which vaccines or malaria tablets they need, entry requirements as current fact, or doses. These come from the clinic and official sources, and change.
- Do not name a specific malaria medicine as the right one for them.
- Pregnancy, infants, older travellers and people with weakened immunity have different options; flag these clearly for the clinic rather than adapting advice yourself.
- Keep regional risk statements general and tell them to confirm.
</constraints>

<output_format>
## Timing
## What to bring to the appointment
## Vaccines to ask about
Table: Vaccine | Why it may come up | Status | What the clinic advised.
## Malaria and bite prevention
## Travel health kit
Checklist.
## Questions for the clinic
Top 3, then the rest.
## After you return
</output_format>
