---
schema: 1
id: draft-bill-of-sale
kind: prompt
title: Draft a bill of sale for a private sale
description: Drafts a bill of sale for a private sale of a vehicle, boat, equipment, horse or other valuable item, with condition and defects statement, payment, handover, ownership and debt checks.
category: contracts
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [bill-of-sale, private-sale, sale-receipt, sold-as-seen, transfer-of-ownership, second-hand]
pairs_with:
  prompts: [sell-car-privately, draft-simple-agreement, check-contract-execution]
args:
  - name: item
    description: What is being sold, with identifying details (make, model, year, serial, hull or chassis number, registration, microchip or passport number for an animal) and its condition, including known faults.
    type: text
    required: true
  - name: deal
    description: Price, deposit, how and when payment is made, handover date and place, anything included (accessories, trailer, tack, manuals), whether you are buyer or seller, and any outstanding loan or finance on the item.
    type: text
    required: true
  - name: country
    description: Country and state or region. Registration, title transfer and tax steps for vehicles, boats and animals vary by place.
    type: string
output_contract:
  format: markdown
  sections: [Before you use this, Bill of sale, Notes on the wording, Handover checklist, Check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bill of sale is the written record that ownership of an item passed from seller to buyer, for a price, on a date, in a stated condition. In a private sale it protects both sides: the seller can prove they no longer own the item (useful for fines, tolls, accidents or registration), and the buyer can prove title and what they were told. What experienced private sellers and buyers include: precise identification (serial, chassis or hull numbers, registration, microchip), so the document cannot be argued to refer to something else; an honest condition statement listing known defects, because "sold as seen" or "as is" wording usually does not protect a seller who hid or misdescribed a known fault; a statement that the seller owns the item and that it is free of loans, liens or finance, since in many places an item still under finance can be repossessed from the new owner; the exact payment amount and method, and that ownership passes only once cleared funds are received; deposit terms if any; handover date, time and what is included; and signatures from both parties, with a copy each. Vehicles, boats, firearms and some animals also need official registration or transfer steps that the bill of sale does not replace.
{{#country}}

Country and region: {{country}}
{{/country}}

<item>
{{item}}
</item>
</context>

<task>
<deal>
{{deal}}
</deal>

1. Check the details for anything a bill of sale needs that is missing (identifiers, known defects, payment method, encumbrances, handover) and mark each as a [BRACKET] in the draft.
2. Draft a one- to two-page bill of sale in plain English: title, seller and buyer blocks with placeholders, item description and identifiers, price and payment method, deposit terms if any, statement that ownership and risk pass on receipt of cleared funds and handover, seller's statement of ownership and that there is no outstanding finance or lien, condition statement with known defects listed, "sold as seen" wording only alongside that disclosure, items included, handover details, signatures and date, and a receipt line for payment.
3. Add short notes explaining the important wording choices.
4. Give a handover checklist for the user's side (identity checks, payment cleared before handover, keys, documents, manuals, photos of condition, cancelling or transferring insurance).
5. List what to check locally: registration or title transfer, notifications to authorities, taxes on private sales, and anything specific to the item type, described by type of authority rather than as confirmed rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the details given; put every missing name, number, date and amount in [BRACKETS]. Do not invent identifiers or prices.
- Always include a known-defects section; if the user says there are none, write "None known to the seller" and remind them it must be true.
- Do not draft wording that misdescribes the item or hides a known defect, even if asked.
- Do not state registration, tax or notification rules as fact; list them under "Check locally".
- If the item is a firearm, a regulated animal or anything with special legal controls, say a bill of sale is not enough and point to the official authority.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you use this
Two lines: what this document does and does not do.

## Bill of sale
The full document.

## Notes on the wording
Short bullets.

## Handover checklist
Checklist.

## Check locally
Bullets.
</output_format>
