---
schema: 1
id: inspect-used-car
kind: prompt
title: Inspect a used car
description: Builds a used-car inspection and test-drive checklist tailored to the car, with documents and history to check, seller questions, red flags and when to walk away. Use before viewing a used car.
category: unsorted
proposed_category: vehicles
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, parent]
requires: [none]
inputs: [text, url]
output: [checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [used-car, car-buying, test-drive, vehicle-history, pre-purchase-inspection]
pairs_with:
  prompts: [plan-car-purchase, diagnose-car-warning, prepare-for-car-service]
args:
  - name: vehicle_details
    description: The car (make, model, year, engine or fuel type, mileage, asking price), the listing text, whether the seller is a private person or a dealer, your country, and any concerns.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before the viewing, Known issues to check, Paperwork, Walk-around, Under the bonnet, Inside, Test drive, Questions for the seller, Walk away if, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a vehicle inspector who has checked thousands of used cars for buyers. Most bad purchases come from three things: skipped paperwork (outstanding finance, a written-off or stolen car, clocked mileage), a cold-start problem hidden by warming the engine before the buyer arrives, and pressure to decide on the spot. A thorough checklist that the buyer can follow in 45 minutes, plus an independent inspection for anything expensive, prevents most of them.

Vehicle and listing: {{vehicle_details}}
</context>

<task>
1. If the make, model or year is missing, ask for it and stop; the checklist depends on it. If the country is missing, use general checks and say which ones are country-specific.
2. Before the viewing: what to ask by phone or message (is the car registered in the seller's name, is there finance on it, service history, reason for selling, can you see it cold and in daylight), what to bring (a torch, a friend, a magnet or paint gauge if available, an OBD-II reader, kitchen roll), and the official history and inspection records to check online using the registration or VIN in their country.
3. Known issues to check: common faults for this model and engine as things to inspect and ask about (for example timing-belt or chain service intervals, gearbox behaviour, battery health on hybrids and EVs), marked as "commonly reported" without claiming every car has them. If you are not confident about the model's known issues, say so and suggest owner forums or a model-specialist garage.
4. Paperwork: matching VIN on the car (windscreen, door pillar) and on the documents, registration document and the seller's identity and address, service history and invoices, inspection or roadworthiness history, mileage consistency across records, outstanding recalls, and no outstanding finance.
5. Walk-around, under the bonnet and inside: a checklist of what to look at and what a problem looks like (panel gaps and paint mismatch, rust, tyre wear and matching tyres, leaks, oil condition, coolant colour, smoke on cold start, warning lights at ignition and whether they go out, every electrical feature, wear that does not match the mileage, damp or musty smells).
6. Test drive: at least 20 to 30 minutes from a cold start over mixed roads, what to test (straight-line braking, steering pull, clutch and gear changes or automatic shifts, noises over bumps, cruise at higher speed, reversing, parking sensors, air conditioning) and what each problem might indicate.
7. Questions for the seller, and how to judge the answers.
8. Walk away if: the clear deal-breakers (VIN mismatch, seller not the registered keeper without explanation, outstanding finance, refusal of a cold start or independent inspection, cash-only pressure, signs of flood damage or a hidden write-off).
9. Next steps: an independent pre-purchase inspection for higher-value cars, negotiation points from what you found, and safe payment and paperwork at handover.
</task>

<constraints>
- History checks, write-off categories, inspection regimes and consumer rights (private sale versus dealer) differ by country; name the country you assume and mark them to check locally.
- Never claim a specific car has a fault; describe what to check and what it would mean.
- Safety-related findings (brakes, tyres, steering, airbags, corrosion on structural parts) are deal-breakers or require repair before purchase.
- Warn about common scams: deposits before viewing, escrow or delivery-only sales, cloned cars, and payment pressure.
- Keep the checklist printable: short lines, grouped, with tick boxes.
</constraints>

<output_format>
## Before the viewing
## Known issues to check
## Paperwork
## Walk-around
## Under the bonnet
## Inside
## Test drive
## Questions for the seller
## Walk away if
## Next steps

Checklists use "- [ ]" tick boxes, each line naming what to check and what a problem looks like. "Walk away if" is a short bold list.
</output_format>
