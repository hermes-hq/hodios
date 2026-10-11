---
schema: 1
id: claim-refund-for-cancelled-booking
kind: prompt
title: Claim a refund for a cancelled booking
description: Writes a refund claim when a holiday, event, class or other booking is cancelled or changed by the provider, using the terms, consumer rights and card or payment protection.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual, traveler]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [refund-claim, cancelled-event, holiday-cancellation, deposit-refund, voucher-instead-of-refund, chargeback]
pairs_with:
  prompts: [dispute-card-charge, write-complaint-letter, prepare-travel-insurance-claim, complain-to-ombudsman]
args:
  - name: booking
    description: What was booked (package holiday, flight, hotel, concert, wedding venue, course, class), with whom, the dates, the amount paid, deposit or full, how you paid and when.
    type: text
    required: true
  - name: what_happened
    description: Who cancelled or changed it and when, the reason given, what they have offered (voucher, new date, partial refund, nothing), and the relevant booking terms if you have them.
    type: text
    required: true
  - name: country
    description: Your country and the provider's country if different. Refund rights and payment protection differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where you stand, Your routes to a refund, Letter to the provider, Card or payment claim, Deadlines and evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone get their money back when a booking is cancelled or materially changed by the provider. The key question is who cancelled: when the provider cancels or cannot deliver what was sold, the customer is usually entitled to their money back, including deposits described as "non-refundable" (that label normally covers the customer changing their mind, not the provider failing to perform). Package holidays, flights and some event tickets often have specific refund rules and deadlines in many countries. Providers commonly offer a voucher or a new date first; accepting it may give up the cash refund, so the customer should decide knowingly. A significant change (different dates, venue, headline act or hotel) can count as a cancellation in many systems, letting the customer choose a refund. If the provider is unresponsive or insolvent, the payment route matters: card chargeback schemes and, in some countries, credit card provider liability, plus booking protection or bonding schemes for travel. Chargeback windows run from the transaction or the expected service date and can be short, so the customer should not wait months for the provider.

Location: {{country}}

<booking>
{{booking}}
</booking>

<what_happened>
{{what_happened}}
</what_happened>
</context>

<task>
1. Establish who cancelled or changed what, whether the change is significant enough to be treated as a cancellation, and whether the customer has accepted any alternative. If the customer cancelled themselves, say clearly that refund rights are usually much narrower and point them to the terms and travel insurance instead.
2. List the routes to a refund in order: the provider directly, any sector-specific refund rule (package travel, flights, events) marked "[to verify]", the payment route (card chargeback, credit provider liability, payment app or bank transfer protections), travel insurance, and any bonding or protection scheme the provider belongs to.
3. Explain the voucher choice: what the customer gives up by accepting, and wording to decline it politely if they want cash.
4. Write the letter or email to the provider: booking reference, what was cancelled or changed and when, the refund requested in full including deposit and fees, a statement that a voucher is not accepted if that is the choice, a deadline of 14 days or the sector deadline if shorter, and what the customer will do next. Under 280 words.
5. Draft the key points for a card or payment dispute if the provider does not pay: reason code type ("service not provided" or "cancelled"), the evidence, and the timing risk.
6. List deadlines to check and evidence to keep: booking confirmation, the cancellation notice, terms at the time of booking, all messages, and proof of payment.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state refund deadlines, chargeback windows or scheme names as fact; mark them "[to verify]".
- Never suggest disputing a charge while also keeping a voucher or the service, or claiming from two routes for the same money.
- If the provider may be insolvent, say to move to the card or protection route quickly rather than waiting.
- Use only facts given; put unknowns in [brackets].
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Four to six lines.

## Your routes to a refund
Numbered list in the order to use them.

## Letter to the provider
The draft.

## Card or payment claim
Bullets for the dispute if needed.

## Deadlines and evidence
Checklist with dates marked "[to verify]".
</output_format>
