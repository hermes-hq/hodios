---
schema: 1
id: share-family-car-with-new-driver
kind: prompt
title: Share the family car with a new driver
description: Sets up how a household shares one car once a teen or young adult starts driving, with booking, insurance checks, costs, house driving rules and a staged plan for passengers and night driving.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [new-driver, teen-driving, car-booking, insurance-check, driving-agreement, household-costs]
pairs_with:
  prompts: [write-family-agreement-with-teen, plan-child-independence-ladder, coordinate-family-calendar]
args:
  - name: household
    description: Who drives the car and when, the new driver's age and how long they have held their licence, and the family's regular car needs.
    type: text
    required: true
  - name: new_driver_needs
    description: What the new driver wants the car for, for example "college 3 days a week, part-time job weekend evenings, seeing friends".
    type: text
    required: true
  - name: country
    description: Country or region, so licence conditions and insurance points can be flagged to check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Check first, Who gets the car when, Booking and handover, Costs, House driving rules, Stepping up, If something goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a household share one car once a teenager or young adult passes their test. Two things go wrong: logistics (the car is gone when a parent needs it, it comes back empty, nobody knows who booked it) and risk. Newly qualified drivers are at their highest crash risk in the first year or two, especially at night, with friends as passengers, and when tired or distracted; many places attach conditions to new licences for exactly these reasons. Insurance is a frequent blind spot: a new driver must be properly covered on the policy, and listing a parent as the main driver of a car the young person mainly drives (sometimes called fronting) can be fraud and void the cover. A good arrangement combines a simple booking system with a written agreement that relaxes in stages as experience grows.

<household>
{{household}}
</household>
<new_driver_needs>
{{new_driver_needs}}
</new_driver_needs>
{{#country}}Country or region: {{country}}{{/country}}
</context>

<task>
1. Check first: a checklist: the new driver is correctly named on the insurance (and as main driver if they are), any licence conditions for new drivers in {{country}} or the user's location such as passenger limits, night limits or display plates, roadside cover, and that the car is roadworthy. Mark each "check" without stating rules.
2. Who gets the car when: a weekly priority table: fixed needs first (work commutes, school runs), then the new driver's regular needs, then flexible use. Flag clashes and how to resolve them (lifts, public transport, swapping times).
3. Booking and handover: a simple booking method using a calendar the family already shares, a booking cut-off, and handover rules: fuel or charge level, nothing left in the car, report any warning lights or damage straight away.
4. Costs: a fair way to share fuel, insurance increase and wear: by use, a flat contribution, or work in kind; use only numbers the family gives.
5. House driving rules: phones out of reach, no alcohol or drugs at all, seatbelts for everyone, no driving tired, check-in on long or late trips, and how many passengers for now.
6. Stepping up: a staged plan (for example the first months daytime and familiar routes, then night driving, then passengers, then motorways or long trips) with what earns each step, plus suggested extra practice with a parent.
7. If something goes wrong: steps after a breakdown, a minor collision or being stopped by police, a safe-ride rule (call home for a lift, no questions asked that night), and what happens if house rules are broken.
</task>

<constraints>
- Never suggest misrepresenting who drives the car to an insurer.
- Do not state licence conditions, insurance terms or laws as fact; mark them "check".
- Keep the safe-ride rule free of punishment on the night so the young driver will use it.
- Do not invent insurance prices or costs.
</constraints>

<output_format>
## Check first
Checklist marked "check".
## Who gets the car when
Table: Day | Time | Who | Purpose | Clash?
## Booking and handover
## Costs
## House driving rules
## Stepping up
Table: Stage | Allowed | To move on.
## If something goes wrong
</output_format>
