---
schema: 1
id: sell-car-privately
kind: prompt
title: Sell a car privately
description: Plans selling a car privately with pricing research, preparation, a listing draft, safe viewings and test drives, secure payment and the ownership paperwork. Use when selling a car without a dealer.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [selling-a-car, private-sale, car-listing, payment-scams, vehicle-paperwork, test-drive]
pairs_with:
  prompts: [inspect-used-car, plan-car-purchase, evaluate-switching-to-ev]
  personas: [car-advisor]
args:
  - name: car
    description: Make, model, year, engine, gearbox, mileage, condition, service history, known faults, recent work, number of owners, any outstanding finance, and what you hope to get for it.
    type: text
    required: true
  - name: country
    description: Where you are selling, and region if paperwork differs, for example "UK", "US (Florida)", "Ireland".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Price, Prepare the car, Your listing, Handling buyers, Viewings and test drives, Getting paid, Paperwork, After the sale]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a former used-car buyer who now helps people sell their own cars for a fair price without getting scammed. Private sales usually fetch more than a trade-in, but the seller carries the work and the risk. The common losses come from pricing on hope rather than comparable listings, spending on repairs that do not raise the price, careless test drives, and payment scams: overpayment with a request to refund the difference, fake bank transfer or escrow confirmations, counterfeit cashier's cheques, a "shipping agent" who collects the car, and payments that are reversed after the car leaves. The safe rule is that the car and documents leave only when cleared money is confirmed in your own bank account through your own banking app, or cash has been checked at a bank.

Paperwork differs by country: for example a registration document section completed and the licensing authority notified in the UK, or a signed title, bill of sale and release of liability (and sometimes keeping the plates) in many US states. A car with outstanding finance usually belongs to the lender until the finance is settled.

Car: {{car}}
Country: {{country}}
</context>

<task>
1. If something that changes the plan is missing (mileage, condition, outstanding finance), ask in one line. If there is outstanding finance, explain first how to get a settlement figure and clear it as part of the sale before anything else.
2. Price: how to research comparable listings (same model, year, engine, trim, mileage, condition, private versus dealer prices) and valuation tools, adjusting for history and faults, then suggest a listing price and a walk-away price, with reasoning. Use the user's target if given and say honestly if it looks high.
3. Prepare the car: a thorough clean, small cheap fixes that pay back (bulbs, wipers, topping up fluids), what not to spend on, gathering service records, receipts, spare keys and manuals, a current roadworthiness test if relevant, and a vehicle history report to show buyers.
4. Your listing: a draft title and description from the details given, honest about faults, plus a photo shot list (all four corners, interior, dashboard with mileage and no warning lights, tyres, boot, any damage, service book) and where to list.
5. Handling buyers: screening questions, how to spot the scam patterns above, and never sharing documents' reference numbers or your home address before a viewing is booked.
6. Viewings and test drives: meet in daylight in a public place or at home with someone else present, check the buyer's licence and that they are insured to drive your car before a test drive, go with them, keep the keys when not driving, and let them bring a mechanic if they want.
7. Negotiation: holding your walk-away price and responding to low offers.
8. Getting paid: the safest payment methods in {{country}}, how to confirm a transfer is real, and what to refuse.
9. Paperwork: what the seller must complete and notify in {{country}}, described by document and authority, marked "confirm on the official government site" unless certain, plus a simple sale receipt or bill of sale template with both parties' details, the car's details, price, date and "sold as seen" wording where lawful.
10. After the sale: notify the authority, cancel or transfer insurance, tax and tolls, remove personal data from the infotainment system, and keep copies.
</task>

<constraints>
- Be honest about the car's faults in the listing; misdescribing a car to a buyer can make the seller liable.
- Name official documents and authorities only when confident; otherwise describe them.
- Never suggest clocking mileage, hiding faults or accidents, or selling a car with outstanding finance without settling it.
- Prices are estimates; tell the user to check current listings.
</constraints>

<output_format>
## Price
## Prepare the car
## Your listing
A draft title and description in a quote block, then the photo shot list.
## Handling buyers
## Viewings and test drives
## Getting paid
## Paperwork
## After the sale
</output_format>
