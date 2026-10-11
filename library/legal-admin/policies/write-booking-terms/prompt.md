---
schema: 1
id: write-booking-terms
kind: prompt
title: Write booking terms
description: Drafts booking terms for a service business such as a photographer, tutor, venue, tour or class - deposits, payment, cancellation and rescheduling by either side, no-shows, liability and changes.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [booking-terms, deposits, cancellation-terms, no-show-fees, rescheduling]
pairs_with:
  prompts: [set-up-appointment-booking-system, reduce-appointment-no-shows, write-refund-policy]
args:
  - name: service
    description: What is booked, prices, how far ahead people book, deposits taken, current cancellation and no-show rules, costs you cannot recover when people cancel (venue hire, staff, materials), and whether customers are consumers or businesses.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Fairness check, Booking terms, Summary at checkout, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Booking terms are mostly about who carries the cost when plans change. Consumer law in many places allows a business to keep a reasonable deposit or charge for cancellation, but treats charges as unfair when they exceed the business's real loss or are hidden until after booking; "non-refundable deposit" wording does not always hold if the deposit is a large share of the price. Distance and online bookings may carry a cooling-off right, with exceptions for services booked for a specific date, such as leisure and events, that vary by country. Terms often forget the business's side: what happens if the provider cancels, is ill, or the venue closes, and what a customer gets then. Clear tiers (for example full refund up to a date, partial after, none within a short window except rebooking) and a short summary at checkout prevent most disputes and chargebacks.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Service:
<service>
{{service}}
</service>

1. Fairness check: each current rule, whether it is likely to be seen as fair given the real costs described, and a recommendation.
2. Booking terms in plain language:
   - Who you are [BRACKETS] and what the booking includes.
   - How a booking is confirmed, deposit amount and what it covers, balance due date.
   - Cancellation by the customer: tiers by notice period, linked to real costs, and rescheduling options.
   - No-shows and late arrival.
   - Cancellation or changes by the business, including illness, weather or venue problems, and the customer's options (full refund or rebooking).
   - Cooling-off for online bookings where it applies, and the exception for dated services, marked to confirm.
   - Customer responsibilities (accurate details, health or access needs, behaviour, children supervised).
   - Liability: limits that do not exclude liability for negligence causing injury, and insurance where relevant.
   - Photos, recordings or deliverables if part of the service.
   - Complaints and governing law.
3. Summary at checkout: four to six bullets the customer sees before paying.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend charges that exceed the business's genuine loss or that are only revealed after payment.
- Never exclude liability for death or personal injury caused by negligence.
- Do not invent prices, deposits or notice periods; use [PLACEHOLDERS] where not supplied.
- Do not state cooling-off rules or exceptions as fact; mark them to confirm for the jurisdiction.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fairness check
Table: rule | fair? | recommendation.

## Booking terms
Numbered sections.

## Summary at checkout
Bullets.

## Points to confirm
Numbered.
</output_format>
