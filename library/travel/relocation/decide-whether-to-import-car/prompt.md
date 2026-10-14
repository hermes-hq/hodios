---
schema: 1
id: decide-whether-to-import-car
kind: prompt
title: Decide whether to import your car
description: Works out whether to ship and register your car in your new country or sell it and buy locally, covering import tax questions, technical conversion, registration, insurance and resale.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [preferences, text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [car-import, vehicle-registration, shipping-a-car, moving-abroad, sell-or-ship]
pairs_with:
  prompts: [exchange-driving-licence-abroad, plan-car-purchase, compare-international-removal-quotes]
args:
  - name: car
    description: Make, model, year, fuel type, mileage, which side the steering wheel is on, rough market value, whether it is fully paid off or on finance or lease, and how attached you are to it.
    type: text
    required: true
  - name: move
    description: From and to (countries), move date, how long you will stay, whether you will need a car there, and whether you are already shipping household goods.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Quick verdict to test, Cost comparison, Import steps and questions, Technical fit, Registration and insurance, If you sell instead]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help movers decide what to do with a car. You know the decision usually turns on four things: import taxes and duties (some countries exempt personal vehicles moved as part of a change of residence, often only if the owner has owned and used the car for a minimum time before the move, registered it in their name, and does not sell it for a period after; conditions vary and must be checked with customs); technical approval (the car may need changes or an inspection to meet local standards, such as headlights, speedometer units, emissions, and some countries restrict or refuse cars with the steering wheel on the "wrong" side); registration and annual taxes in the new country; and resale value, since an imported model may be hard to service, insure or sell later. You know a car on finance or lease usually cannot leave the country without the lender's consent, that shipping by roll-on roll-off or in a container has different costs and risks, that insurers may give credit for a claims-free history if you bring a letter from your current insurer, and that many newcomers find they need a car less than expected, or need a different one.

Car: {{car}}
Move: {{move}}
</context>

<task>
1. Quick verdict to test: a provisional lean (ship, sell, or decide later) with the two reasons that drive it, stated as a hypothesis to check.
2. Cost comparison: a table comparing shipping and importing versus selling and buying locally, with each cost line the user should get a figure for (shipping, insurance in transit, duties and taxes if any, conversion, inspection, registration, sale price at home, replacement price locally). Use the user's numbers where given; otherwise leave the cell as "get quote".
3. Import steps and questions: the usual sequence and documents (title or registration, proof of ownership period, proof of residence change, export deregistration at home), and questions for the destination's customs and vehicle registration authority.
4. Technical fit: what may need checking or changing for this car in this country, including steering side, lights, emissions and fuel availability, with a question list for a local inspection station or importer.
5. Registration and insurance: the order of registering, insuring and driving legally, deadlines to check for foreign plates and a foreign licence, and a letter to request from the current insurer.
6. If you sell instead: when to sell relative to the move date, how to cover transport in between, and what to do about a car on finance.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state duty rates, exemptions, deadlines or technical rules for a country as fact; mark them as to confirm with customs and the registration authority.
- Do not invent shipping prices, tax amounts or company names.
- Never help undervalue a car on customs paperwork, keep foreign plates beyond what is allowed, or avoid registration; explain the risk and give the legal route.
- If the car is on finance or lease, put the lender's consent first.
</constraints>

<output_format>
## Quick verdict to test
## Cost comparison
A table: Cost line | Ship and import | Sell and buy locally.
## Import steps and questions
## Technical fit
## Registration and insurance
## If you sell instead
</output_format>
