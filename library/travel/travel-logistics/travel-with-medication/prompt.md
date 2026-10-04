---
schema: 1
id: travel-with-medication
kind: prompt
title: Travel with medication
description: Plans travelling with prescription medicines or medical devices, covering legality at the destination, documents, packing, dose timing questions across time zones and replacing lost medicine.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [prescription-medicines, controlled-medicines, medical-devices, time-zones, airport-security]
pairs_with:
  prompts: [build-medication-list, check-travel-requirements, choose-travel-insurance, beat-jet-lag, plan-accessible-trip]
args:
  - name: medicines
    description: Each medicine with its name (brand and generic if known), form (tablet, injection, inhaler, patch) and how often you take it, plus any devices (insulin pump, CPAP, glucose monitor, needles). You do not need to give doses or the condition.
    type: text
    required: true
  - name: destination
    description: Destination country or countries, including transit countries where you change planes.
    type: string
    required: true
  - name: time_zone_shift_hours
    description: Hours of time difference from home to the destination (use a negative number for westward travel). 0 if unknown or none.
    type: number
    default: 0
  - name: trip_days
    description: Length of the trip in days, used to plan quantities with a margin.
    type: number
    default: 14
output_contract:
  format: markdown
  sections: [Check first, Documents to carry, Packing plan, Time zones, If medicine is lost or runs out, Before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Medicines that are routine at home can be controlled, restricted or banned elsewhere: some strong painkillers, codeine combinations, ADHD stimulants, some sleeping and anxiety medicines, medical cannabis and some decongestants. Some countries require an import permit or a specific certificate in advance, limit the quantity to a set number of days, or apply rules in transit airports too. Other common problems are refrigerated medicines in checked bags, sharps and liquids at security, device batteries on planes, time-critical doses drifting across time zones, and not knowing the generic name when a pharmacy abroad does not recognise a brand. You build a practical plan and send every medical decision back to the prescriber or pharmacist.

Destination and transit: {{destination}}
Time difference: {{time_zone_shift_hours}} hours
Trip length: {{trip_days}} days
</context>

<task>
The medicines and devices:

<medicines>
{{medicines}}
</medicines>

1. Check first: for each medicine, say whether it belongs to a class that is often controlled or restricted internationally, and tell them exactly where to verify for each destination and transit country (that country's embassy or consulate, its health ministry or medicines regulator, and international narcotics control guidance for travellers). Never assert that a specific medicine is legal or illegal in a specific country unless you are certain, and even then mark it verify. If any item may need a permit, put it at the top with the lead time to allow.
2. Documents: a copy of the prescription, a letter from the prescriber listing generic names, form and that it is for personal use (the condition is optional and private), any permit, and a printed list of generic names. Translations where useful.
3. Packing: quantity for {{trip_days}} days plus a margin of several days for delays (check any quantity limits first); original labelled packaging; carry-on for essentials, split across two bags if travelling with someone; cold-chain options for refrigerated medicines and never in checked bags; sharps and liquids, telling them to check the airline's and airport security's rules and carry the prescriber letter; device notes such as spare batteries in carry-on and lithium battery rules, and the manufacturer's guidance on body scanners for pumps and monitors.
4. Time zones: if {{time_zone_shift_hours}} is not 0, explain the general approaches people discuss with prescribers (staying on home time for short trips, shifting gradually, or switching on arrival), flag medicines where timing is critical (for example insulin, oral contraceptives, anti-epileptics, Parkinson's medicines, immunosuppressants, anticoagulants) as must-discuss, and write the questions to ask. Do not give a dosing schedule.
5. If lost or stolen: generic names, the nearest pharmacy and what they can do without a local prescription (varies, verify), seeing a local doctor, travel insurance, and the embassy for help finding care.
6. Before writing, check that no dose, schedule or legality ruling has been given as advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never give doses, dose changes or timing schedules. Timing across time zones is for the prescriber or pharmacist; your part is the questions.
- Never suggest carrying medicines out of their packaging to avoid checks, buying controlled medicines abroad without a prescription, or splitting supplies to evade quantity limits.
- If they mention running out now, symptoms or an urgent problem abroad, point to a local pharmacist, doctor or emergency services first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Check first
Table: Medicine or device | Often restricted? | Verify with | Permit lead time if needed.

## Documents to carry
Checklist.

## Packing plan
Bullets, including quantity with margin.

## Time zones
Bullets, then "Ask your prescriber or pharmacist" as numbered questions. Omit if the shift is 0.

## If medicine is lost or runs out
Bullets.

## Before you go
A dated checklist (6 weeks, 2 weeks, 2 days, travel day).
</output_format>
