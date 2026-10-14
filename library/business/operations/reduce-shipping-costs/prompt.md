---
schema: 1
id: reduce-shipping-costs
kind: prompt
title: Audit and cut shipping costs
description: Audits parcel or freight shipping spend by carrier, service, zone, weight and packaging, finds the leaks such as dimensional weight and surcharges, and ranks savings with the numbers.
category: operations
version: 1.0.0
status: incubating
stage: [review, operate]
role: [operations-manager, founder]
subject: [ecommerce, supply-chain]
inputs: [dataset, notes, document]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [shipping-costs, parcel-carriers, dimensional-weight, packaging, carrier-negotiation, surcharges, cost-reduction]
pairs_with:
  prompts: [plan-order-fulfilment, set-free-shipping-threshold, find-business-cost-savings, evaluate-3pl-provider]
args:
  - name: shipping_data
    description: Shipping data for a recent period - invoices or an export with carrier, service, destination or zone, actual weight, box dimensions, charge and surcharges. A summary works if that is all you have.
    type: text
    required: true
  - name: business
    description: What you ship, typical order sizes, number of shipments a month, your carriers and contracts, and what customers are promised (speed, free shipping).
    type: text
    required: true
  - name: packaging
    description: Optional. The box and mailer sizes you use, with dimensions, and how packers choose them.
    type: text
output_contract:
  format: markdown
  sections: [Where the money goes, Leaks found, Savings options, Ranked plan, Carrier negotiation prep, What to track]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a parcel and freight cost analyst for e-commerce and wholesale businesses. Shipping spend leaks in the same places again and again: boxes too big, so carriers charge dimensional (volumetric) weight instead of actual weight; one premium service used for everything when most customers would accept a slower one; surcharges (residential, remote area, fuel, oversize, address correction) that nobody checks; list rates paid because volume was never used to negotiate; and no audit of invoices for billing errors or late-delivery refunds where the contract allows them. Savings usually come from right-sizing packaging, a service and carrier mix by zone and weight band, fixing address quality, and negotiating with data in hand. Dimensional weight divisors and surcharge rules differ by carrier and country, so they must come from the user's own rate cards.
</context>

<task>
Audit the shipping spend and find savings.

<shipping_data>
{{shipping_data}}
</shipping_data>

<business>
{{business}}
</business>
{{#packaging}}
<packaging>
{{packaging}}
</packaging>
{{/packaging}}

1. Where the money goes: break spend down by carrier, service, zone or region, weight band, and base charge versus surcharges. Show cost per shipment for each group. Note what the data does not allow you to see.
2. Leaks found: check for billed weight above actual weight (dimensional weight), premium services used where not needed, high surcharge share and which surcharges, shipments in weight bands just above a price break, and possible billing errors. Quantify each leak from the data, or say how to measure it if the data is missing.
3. Savings options: right-size boxes (suggest a smaller set of box sizes from the order profile), lighter packaging, service mix by zone, a second carrier for some zones or weights, consolidating shipments, address validation, invoice auditing and refund claims where the contract allows, and changing what customers are offered (for example a slower free option).
4. Ranked plan: rank options by estimated annual saving and effort, with the arithmetic and assumptions behind each estimate. Mark the customer-experience impact.
5. Carrier negotiation prep: the data to bring (annual volume, profile by zone and weight, growth), what to ask for (base discount, dimensional divisor, surcharge waivers or caps, minimums), and a competing quote process.
6. What to track: monthly metrics such as cost per order, cost as a share of order value, surcharge share, billed versus actual weight and delivery performance.
</task>

<constraints>
- Use only the user's data and rate cards; do not invent carrier rates, dimensional divisors or surcharge amounts. Where needed, tell the user to take them from their carrier contract.
- Label all saving estimates as estimates with their assumptions.
- Do not recommend cutting packaging protection to the point of raising damage; weigh damage and return costs.
- Do not recommend misdeclaring weights, dimensions or contents to carriers.
</constraints>

<output_format>
## Where the money goes
Tables by carrier and service, by zone, by weight band, with cost per shipment.
## Leaks found
Table: Leak | Evidence | Estimated annual cost.
## Savings options
Bullets with a one-line explanation each.
## Ranked plan
Table: Option | Est. annual saving | Effort | Customer impact | Assumptions.
## Carrier negotiation prep
Bullets.
## What to track
Table: Metric | How calculated.
</output_format>
