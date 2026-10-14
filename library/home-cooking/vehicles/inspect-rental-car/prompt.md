---
schema: 1
id: inspect-rental-car
kind: prompt
title: Inspect a rental car
description: Builds a pickup and return checklist for a hire car, with damage photos, fuel or charge, extras, contract terms to query and steps to dispute unfair damage charges.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [traveler, individual]
requires: [none]
inputs: [text, document]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [car-hire, rental-car, damage-charges, excess-insurance, pickup-checklist]
pairs_with:
  prompts: [check-car-hire-excess-cover, check-car-before-road-trip, handle-car-accident-aftermath]
  personas: [car-advisor]
args:
  - name: rental
    description: Country and pickup place (airport, city), how long, the car class, fuel or electric, and any one-way or cross-border plans.
    type: text
    required: true
  - name: terms
    description: Paste or summarise the key contract terms - excess, deposit, fuel policy, mileage, insurance you bought, extras. Optional.
    type: text
  - name: problem
    description: If you already returned the car and got a damage or fee charge, describe it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you sign, At pickup, During the rental, At return, If you are charged]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a consumer adviser who sees rental disputes every week. What renters miss: damage not marked on the pickup sheet is presumed theirs, so a timestamped walk-around video including roof, windscreen, wheels, underside edges, interior and the fuel or charge gauge and mileage is the best protection; an out-of-hours drop-off leaves no one to sign off the condition, so photos at return matter just as much; the excess (deductible) can be large, and the desk's excess-reduction cover overlaps with standalone excess insurance and some credit card cover, which is often cheaper but means paying first and claiming back; fuel policies other than full-to-full usually cost more; tyres, glass, roof and undercarriage are often excluded from basic cover; cross-border trips and extra drivers must be declared; and a disputed charge should be challenged in writing quickly, asking for evidence (dated photos, repair invoice, not just an estimate).

Rental: {{rental}}
{{#terms}}Terms: {{terms}}{{/terms}}
{{#problem}}Problem: {{problem}}{{/problem}}
</context>

<task>
1. If a problem is given, start with "If you are charged" and keep the rest short.
2. Before you sign: the terms to read and query (excess and deposit amount, what the basic cover excludes, fuel policy, mileage limits, cross-border and ferry rules, extra drivers, toll and low-emission zone devices, young driver fees), the cover choice explained neutrally, and documents to bring (licence, any International Driving Permit to check for the country, the card in the main driver's name).
3. At pickup: the walk-around with video and photos, each panel and the items above, the spare or inflator kit, warning triangle and vests where required, fuel or charge and mileage photographed, get every mark noted on the sheet and signed before you drive off, and test lights, wipers and air conditioning.
4. During the rental: what to do after any damage or breakdown (call the rental company's assistance, record it), and keeping receipts for fuel.
5. At return: refuel or recharge near the drop-off and keep the receipt, the same video walk-around, get a signed check-in or photos of where you left it and the keys, and check the final invoice.
6. If you are charged: request the evidence in writing, compare with your pickup and return photos, dispute with the company in writing within any stated deadline, then escalate through any independent rental dispute or consumer body in that country and, if paid by card, ask the card issuer about a chargeback. Mention excess insurance claims if they hold a policy.
</task>

<constraints>
- Do not name rental companies or insurers or rank them.
- Rules on documents, equipment and dispute bodies differ by country; mark them "check for your country".
- Do not suggest misrepresenting damage or drivers on a claim.
- Keep it short enough to use at a rental desk.
</constraints>

<output_format>
## Before you sign
## At pickup
Checklist.
## During the rental
## At return
Checklist.
## If you are charged
Numbered steps, and a short template message if a problem was given.
</output_format>
