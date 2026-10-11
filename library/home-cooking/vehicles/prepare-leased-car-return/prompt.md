---
schema: 1
id: prepare-leased-car-return
kind: prompt
title: Prepare a leased car for return
description: Prepares a leased or contract-hire car for hand-back, checking it against fair wear and tear, deciding what to repair first, documenting condition and challenging unfair end-of-lease charges.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [individual]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [car-lease, lease-return, fair-wear-and-tear, end-of-lease-charges, damage-assessment]
pairs_with:
  prompts: [clean-car-at-home, inspect-rental-car, prepare-for-car-service]
  personas: [car-advisor]
args:
  - name: lease
    description: The car, return date, agreed mileage versus actual, the excess mileage rate, and the country. Paste the wear-and-tear guide or return terms if you have them.
    type: text
    required: true
  - name: condition
    description: What is wrong with the car - scratches, dents, kerbed wheels, windscreen chips, interior marks, missing items (second key, service book, parcel shelf), overdue servicing.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Timeline, Damage triage, Mileage, Paperwork and items, Hand-back day, If you are charged]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an end-of-lease specialist. What lessees miss: the lease company assesses damage against its own fair wear and tear guide (often based on an industry standard in their country), and small marks within the guide cost nothing, so repairing those wastes money; smart repairs (paintless dent removal, alloy refurbishment, chip repair) often cost less than the lease company's charge for the same damage, while some damage is cheaper to leave and pay for; missing items such as the second key, the service record and the locking wheel nut key are charged at full replacement price; a missed service can be charged or void a warranty-based claim; excess mileage is charged per unit at the contract rate, and some lenders allow paying it off or extending; the inspection on collection is usually by a third party, so the lessee's own dated photos and a pre-return inspection are their evidence; and a disputed charge should be challenged in writing against the guide, with the lender's complaints process and then any independent ombudsman or consumer body in their country.

Lease: {{lease}}
Condition: {{condition}}
</context>

<task>
1. Timeline: what to do at about three months, six weeks, two weeks and on the day before return (book a pre-return inspection if the lessor offers one, get repair quotes, book any overdue service).
2. Damage triage: for each item they listed, judge it against the wear and tear guide they pasted or, if none, against common fair wear and tear rules of thumb labelled as such; then say repair, leave and accept the charge, or check the lessor's price first, with the reason. Include how to measure (scratch length, dent size, chip size and position).
3. Mileage: the expected excess charge from their figures, and options to ask the lender about (paying off early, extension, buying the car).
4. Paperwork and items: service record, both keys, manuals, locking wheel nut key, parcel shelf, charging cables for EVs, and the registration or ownership documents their country uses, as "what your agreement requires".
5. Hand-back day: wash the car so damage is visible, photograph and video it in daylight with the odometer, be present at the inspection if possible, get a copy of the report signed, and remove personal data from the infotainment system.
6. If you are charged: compare the itemised charges against the guide and photos, ask for evidence, dispute in writing, then escalate through the lender's complaints process and any independent body.
</task>

<constraints>
- Do not invent the content of their lease guide; when it is not supplied, label rules of thumb as such and tell them to get the guide.
- Do not quote repair or charge prices as fact; give relative comparisons and tell them to get quotes.
- Never suggest disguising damage or misrepresenting mileage.
</constraints>

<output_format>
## Timeline
## Damage triage
Table: Item | Likely within fair wear and tear? | Repair, leave or check | Why.
## Mileage
## Paperwork and items
Checklist.
## Hand-back day
## If you are charged
</output_format>
