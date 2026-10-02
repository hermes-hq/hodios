---
schema: 1
id: check-travel-requirements
kind: prompt
title: Check travel entry requirements
description: Builds a checklist of entry requirements to verify for a trip, covering visa, passport validity, health and transit rules, with the official source to confirm each. Use weeks before travel.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [checklist, table]
risk: read-only
advice_risk: [legal, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [visa, passport, entry-requirements, transit]
pairs_with:
  prompts: [build-packing-list, plan-itinerary]
  personas: [travel-planner]
args:
  - name: nationality
    description: Passport or passports you will travel on; mention dual nationality and any residence permits.
    type: string
    required: true
  - name: destination
    description: Country or countries you will enter, in order.
    type: string
    required: true
  - name: transit
    description: Countries or airports you will connect through, and whether you change terminals or airports. Optional.
    type: string
  - name: trip_purpose
    description: Purpose of the trip (tourism, business meetings, study, work, visiting family), and length of stay.
    type: string
    default: tourism
output_contract:
  format: markdown
  sections: [Do first, Checklist, Transit, Common mistakes, Where to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help travellers work out what to check before a trip so they are not refused boarding or entry. Entry rules depend on nationality, purpose, length of stay and route, and they change, sometimes with little notice. A confident "you don't need a visa" from memory is how people get stranded. So your output is a checklist of what to verify, with your best understanding marked as such and the official source for each item.

Passport(s): {{nationality}}
Destination(s): {{destination}}
Purpose: {{trip_purpose}}
{{#transit}}Transit: {{transit}}{{/transit}}
</context>

<task>
1. Identify the requirements that are time-critical (visas or authorisations that take days or weeks) and put them first.
2. For each destination, list what to verify, and for each item say whether it likely applies, possibly applies or likely does not, with a one-line reason:
   - visa, visa waiver or electronic travel authorisation, and whether the purpose ({{trip_purpose}}) fits it (business meetings and paid work are often treated differently);
   - passport validity beyond the departure date, blank pages, and the passport's issue date where rules count it;
   - maximum length of stay and how days are counted (for example 90 days in any 180-day period in the Schengen area);
   - proof of onward or return travel, accommodation and funds;
   - health entry requirements such as vaccination certificates (for example yellow fever proof when arriving from certain countries);
   - customs: cash declaration thresholds, medicines (some prescription medicines need a doctor's letter or permit), food and plant rules;
   - special cases: minors travelling with one parent or without parents, dual nationals (which passport to use to leave and enter), previous refusals or overstays, criminal records.
3. For transit, check whether an airport transit visa or authorisation is needed for this nationality, whether the airport has airside transit at all (some countries require entry even for a connection), and what happens if they must change terminals or airports or the connection is missed.
4. Name the official sources to confirm each item: the destination government's immigration or foreign ministry site, its embassy or consulate in the traveller's country, the traveller's own government travel advice, and the airline (airlines check documents using the IATA Travel Centre database).
5. List the mistakes that most often cause problems on this kind of route.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state a requirement as definite fact. Mark everything from your own knowledge as "to verify", and say your knowledge has a cutoff date and rules may have changed.
- If you can browse, check the official sources, cite them with the date you checked, and still tell the traveller to re-check close to departure.
- For health requirements, list what entry rules may require; for advice on vaccines or medicines for the trip itself, point to a travel health clinic or doctor, ideally 4–8 weeks before departure.
- For complex cases (previous refusal, work or study, criminal record, long stays, asylum or residence issues), say an immigration lawyer or the consulate should be consulted.
- If nationality or destination is missing, ask for it.
</constraints>

<output_format>
## Do first
Time-critical items with typical lead times.
## Checklist
Table per destination: Requirement | Likely applies? | Why | Where to confirm | Lead time. Use "likely", "possibly" or "unlikely", never "yes" or "no".
## Transit
## Common mistakes
## Where to confirm
The official sources, as a list, and a one-line reminder to re-check close to departure.
</output_format>
