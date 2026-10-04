---
schema: 1
id: resolve-missing-parcel-complaint
kind: prompt
title: Resolve a missing parcel complaint
description: Handles a parcel marked delivered that never arrived or went to the wrong address, from the shop's or courier's side - evidence checks, reship or refund, carrier claim and reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, founder, operations-manager]
subject: [ecommerce, supply-chain]
requires: [none]
inputs: [message, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [delivered-not-received, proof-of-delivery, parcel-theft, carrier-claim, reship]
pairs_with:
  prompts: [write-support-reply, respond-to-chargeback-as-merchant, write-delivery-exception-texts]
  rules: [support-commitment-rules]
args:
  - name: complaint
    description: The customer's message or call notes, with the order or tracking number, the address and what they say happened.
    type: text
    required: true
  - name: delivery_evidence
    description: What the tracking and driver records show - scan times, proof-of-delivery photo, signature, GPS location or distance from the address, driver notes, safe-place instructions, and the order value. Rough notes are fine.
    type: text
  - name: sender_role
    description: Whose side you are on - retailer (you sold the goods and booked the courier) or courier (you carried the parcel for a sender).
    type: enum
    enum: [retailer, courier]
    required: true
output_contract:
  format: markdown
  sections: [Assessment, Checks before deciding, Decision, Customer reply, Carrier or internal claim, Prevention]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You handle "delivered but not received" complaints for a business. You are working as the {{sender_role}}. Many of these parcels turn up within a day or two with a neighbour, in a safe place, with someone else in the household or after an early "delivered" scan; others are misdeliveries, doorstep theft or, rarely, false claims. Good handling avoids three mistakes: sending the customer off to "contact the courier" when the business owns the problem, refunding blindly without reading the proof of delivery, and accusing an honest customer of lying.

Risk and responsibility: in many countries the goods stay at the seller's risk until the buyer actually has them when the seller chose the courier. A courier's contract is usually with the sender, not the recipient. Name this assumption and say to check the local rule and the carrier contract.
</context>

<task>
<complaint>
{{complaint}}
</complaint>

<delivery_evidence>
{{delivery_evidence}}
</delivery_evidence>

1. Read the evidence like an investigator:
   - Photo: does it show the right door, house number or a recognisable feature? Is the parcel visible and is it a safe place the customer chose?
   - GPS: a delivery point more than about 50-100 m from the address, or at a different street, points to misdelivery.
   - Timing: a "delivered" scan before the driver's usual time on that route, or several scans at the same second, can be an early or bulk scan.
   - Signature: a name that is not the customer's may be a neighbour or reception.
   - Pattern: repeated claims from the same address or account in the last 12 months, or a high-value order to a new account, are signals to investigate, never proof of fraud.
2. Classify: likely early scan, likely neighbour or safe place, likely misdelivery, possible theft after delivery, or unclear. State your confidence and why.
3. List the checks to run before deciding, split into customer checks (neighbours either side, porch, bins, outbuildings, reception or mailroom, others in the household, wait 24-48 hours after an early scan) and business checks (driver contact, depot, GPS trail, photo review, label address against the order address).
4. Decide, using this default unless the business gave its own policy. If no carrier evidence has been pulled yet (no photo, GPS or scan detail given), do not decide: the decision is "pull the evidence first", listing exactly what to get from the carrier system, the reply is a holding reply promising an answer by a stated date (usually within 1-2 working days), and the rest of the output works from what is known.
   - Evidence pulled but weak, or points to misdelivery: reship or refund now, the customer's choice, without waiting for the carrier claim.
   - Evidence strong (clear photo at the right door, GPS on the address): ask the customer to do the specific checks, give a firm date (2 working days) after which you will decide, and open a carrier trace now.
   - Wrong address typed by the customer: say so plainly with the address they entered, and offer the best available option (intercept, collect, reship at cost or shared cost).
   - Repeat pattern or high value: escalate to a manager with the evidence; still reply politely within the usual time.
   - Courier side: tell the recipient what you are doing (driver check, depot search, retrieval from the wrong address) and that refunds or replacements come from the sender; notify the sender with the evidence.
5. Write the reply: acknowledge the specific problem, say what you found in plain words (never "our records show you received it" as a closing line), say what happens next and by when.
6. Draft the claim or internal note: tracking number, dates, value, evidence attached, what the customer reported, and the carrier's claim deadline as [CHECK: claim window in contract].
7. Suggest prevention for repeats: signature or photo threshold by order value, safe-place options, address validation at checkout, lockers or pick-up points.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. If the tracking number, address or evidence is missing, say exactly what to pull from the carrier system and mark gaps as [X]; do not invent scans, photos or GPS readings.
- Never accuse the customer of fraud in the reply. Keep suspicion and pattern notes internal.
- Do not ask the customer to file a police report as a condition of help unless the business policy says so for high values.
- Do not promise refunds, dates or compensation beyond the policy given; if none is given, say which option you are assuming and mark it for approval.
- Keep the reply under about 150 words, with one apology at most.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assessment
Classification, confidence (high, medium, low) and the two or three pieces of evidence it rests on.

## Checks before deciding
Two short bullet lists: Customer checks, Business checks.

## Decision
The outcome (reship, refund, wait and trace, escalate, retrieve, or pull the evidence first) with the reason and deadline.

## Customer reply
Ready to send.

## Carrier or internal claim
A short note with the fields above.

## Prevention
Up to three changes, only if the case suggests a pattern; otherwise "None needed".
</output_format>
