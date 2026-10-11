---
schema: 1
id: reject-faulty-used-car
kind: prompt
title: Reject a faulty car bought from a dealer
description: Writes a letter to a car dealer about a vehicle that developed a fault soon after purchase, choosing between rejection, repair or a price cut, with the evidence, finance-company angle and deadlines.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [car-dealer, faulty-vehicle, consumer-rights, right-to-reject, car-finance]
pairs_with:
  prompts: [review-car-purchase-contract, dispute-card-charge, complain-to-ombudsman]
  workflows: [small-claims-track]
args:
  - name: purchase
    description: The car (make, model, year, mileage), the dealer, the purchase and collection dates, price, how you paid (cash, card, dealer finance, hire purchase, lease), any warranty, and what the advert or salesperson said.
    type: text
    required: true
  - name: fault
    description: What went wrong and when, the mileage then, what the dealer has said or done so far, and any inspection or garage report.
    type: text
    required: true
  - name: remedy
    description: What you want - reject (return for a refund), repair, replacement, or a price reduction - or "not sure".
    type: string
    required: true
  - name: country
    description: Country and region. Consumer rights for used cars differ a lot, and private sales usually have fewer protections. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your position, Letter to the dealer, Finance company, Evidence and inspection, Do not, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a buyer whose used car from a trader went wrong soon after purchase. In many countries, goods bought from a business must be of reasonable quality, fit for purpose and as described, judged against the car's age, mileage and price. Several systems give a short early window to reject and get a refund, then a repair or replacement stage, then a final right to reject or a price reduction, and some presume a fault that appears within the first months existed at delivery. Rights against private sellers are usually much weaker. Two points buyers miss: if the car was bought on hire purchase or similar finance, the finance company may legally be the seller and is often the right party to write to; and continuing to drive the car heavily, letting the dealer's choice of garage strip it without a record, or accepting repeated "fixes" without agreeing in writing can all weaken a rejection. An independent inspection report is often the decisive evidence.

Remedy wanted: {{remedy}}
{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
Purchase:

<purchase>
{{purchase}}
</purchase>

Fault:

<fault>
{{fault}}
</fault>

1. Your position: from the dates, mileage and seller type, say which stage the buyer appears to be at in the common rights framework (early rejection window, repair stage, final remedy), marked "verify locally", and whether the remedy wanted seems realistic. If the remedy is "not sure", explain the trade-offs.
2. Draft the letter to the dealer (or to the finance company, if that seems to be the seller): vehicle details and registration as [BRACKETS]; purchase facts; the fault with dates and mileage; the evidence; the remedy requested, stated clearly ("I am rejecting the vehicle and request a full refund of [amount]"), with collection arrangements; a response deadline; and what happens next.
3. Finance company: if finance was used, explain the likely role of the lender, what to send them, and that the buyer should keep paying instalments unless advised otherwise, because missed payments can harm credit.
4. Evidence and inspection: suggest an independent inspection with a written report on whether the fault likely existed at sale, keeping the advert and messages, dated photos and a mileage log, and any repair invoices.
5. Do not: list actions that commonly weaken the claim.
6. Next steps if the dealer refuses: a trade association or ADR scheme for motor dealers, a card payment dispute if paid by card, a regulator or ombudsman for finance complaints, and small claims, all marked "verify".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent statute names, rejection periods, mileage rules or scheme names. Describe the framework in general terms and mark periods "verify locally".
- Do not promise a refund. Explain which facts decide it.
- Use only the facts given; [BRACKETS] for missing details.
- If the fault affects safety (brakes, steering, warning lights for engine overheating), say not to drive the car until it is checked.
- For large sums, an injury, or a dealer that has ceased trading, suggest a consumer advice service or lawyer.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your position
Short bullets, marked verify.

## Letter to the dealer
Complete letter with [BRACKETS].

## Finance company
Bullets, or "Not applicable".

## Evidence and inspection
Checklist.

## Do not
Bullets.

## Next steps
Ordered bullets, marked verify.
</output_format>
