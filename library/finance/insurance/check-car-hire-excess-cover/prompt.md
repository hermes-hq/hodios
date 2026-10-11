---
schema: 1
id: check-car-hire-excess-cover
kind: prompt
title: Check rental car excess cover
description: Works out what a rental car excess or deductible could cost you, compares the rental desk's waiver with standalone excess cover and card benefits, and lists what to check at pick-up and return.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler, parent]
requires: [none]
inputs: [text, document]
output: [report, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [car-rental, collision-damage-waiver, excess-reimbursement, rental-deposit, travel-cover]
pairs_with:
  prompts: [choose-travel-insurance, choose-insurance-deductible]
args:
  - name: rental
    description: The rental booking - country, length, car type, what is included (collision damage waiver, theft protection, third party), the excess or deductible amount, the deposit hold, and what the desk will offer to reduce the excess, with prices.
    type: text
    required: true
  - name: other_cover
    description: Any cover you already have that might apply - an annual excess reimbursement policy, travel insurance with rental car cover, a credit card benefit, your own car policy - with limits and conditions if known.
    type: text
output_contract:
  format: markdown
  sections: [Summary, What you could be charged, Options compared, What each option leaves out, At pick-up and return]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most rental prices include a collision damage waiver and theft protection that still leave the renter liable for a large excess (deductible) if the car is damaged or stolen, and the rental company usually blocks that amount, or a deposit, on a credit card. At the desk the company sells a "super" waiver that reduces the excess to zero, often at a daily price that over a week or two costs more than an annual standalone policy. The alternatives work differently: standalone excess reimbursement insurance does not reduce what the rental company charges; the renter pays the damage charge first and claims it back, which needs the damage report, invoice and proof of payment, and the deposit block stays in place. Credit card rental benefits vary widely, may require paying for the whole rental with that card and declining the desk's waiver, and may exclude some countries or vehicle types. Both the desk waiver and the alternatives commonly exclude tyres, windscreen, undercarriage, roof, keys, misfuelling and driving off-road or by an unlisted driver, unless explicitly included. Disputes are usually about damage that was already there, so the pick-up inspection matters.
{{#other_cover}}

<other_cover>
{{other_cover}}
</other_cover>
{{/other_cover}}
</context>

<task>
<rental>
{{rental}}
</rental>

1. What you could be charged: the excess for damage and theft, the deposit hold, and typical extra charges (admin fee for handling damage, loss of use) if the booking mentions them.
2. Options compared: the desk waiver (total cost for the rental), standalone cover (if the person has it or is considering it), card benefit, and paying nothing extra (accepting the excess), each with what the person pays upfront, what they pay if there is damage, and how the money comes back.
3. What each option leaves out: tyres, glass, undercarriage, keys, misfuelling, additional drivers, countries, vehicle types, as far as the supplied documents show; otherwise what to check.
4. At pick-up and return: photograph and video the car including roof, wheels and interior with timestamps, check the damage sheet matches, note fuel and mileage, get a signed return check, and keep everything until the deposit is released and the card statement is clear.
5. A short reasoned view of which option fits this trip, leaving the decision to the person.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent prices, excess amounts or card benefit terms; work from what is supplied and say what to check.
- Do not say any cover "fully protects" the renter; name the exclusions to check.
- Be clear that standalone cover reimburses after the fact, so the person must be able to pay the charge first.
- Keep it short; this is often read at the rental desk.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The excess at risk, the cheapest option that covers it, and the main condition to check.

## What you could be charged
Bullets.

## Options compared
Table: option | cost for this rental | pay upfront if damaged? | how you get money back.

## What each option leaves out
Bullets.

## At pick-up and return
Checklist.
</output_format>
