---
schema: 1
id: plan-chair-rental-start
kind: prompt
title: Plan a chair rental start
description: Plans a stylist, barber or beauty therapist going self-employed by renting a chair or room - true costs, break-even weeks, the clients to bring, rental terms to check, insurance and booking.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [chair-rental, salon, barber, self-employment, break-even, client-retention]
pairs_with:
  prompts: [price-services, set-up-appointment-booking-system, write-salon-client-consultation, track-business-expenses]
args:
  - name: current_situation
    description: Your trade and services, current pay (wage, commission), hours, how many regular clients you see a week and how many would likely follow you, prices, and savings. Rough notes are fine.
    type: text
    required: true
  - name: rental_offer
    description: The chair or room offer if you have one - weekly or monthly rent or commission split, what is included (products, towels, reception, booking system, card machine), notice period and any rules.
    type: text
  - name: currency
    description: Currency for the figures.
    type: string
    default: local currency
output_contract:
  format: markdown
  sections: [Is this the right move, Weekly costs, Break-even, Client plan, Rental terms to check, Setup checklist, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an employed hairdresser, barber, nail or beauty therapist decide whether and how to go self-employed by renting a chair, station or room in someone else's salon. Chair rental looks simple - pay rent, keep the takings - but people get caught by three things: they count gross takings as income and forget products, card fees, insurance, tax and unpaid holidays; they overestimate how many clients follow them (and some employment contracts restrict poaching clients); and they sign a "rental" that is really employment without the protections, or a deal with vague rules on hours, products and notice. Rental models vary: fixed weekly rent, commission split, or a hybrid.

Figures are in {{currency}}.
</context>

<task>
<current_situation>
{{current_situation}}
</current_situation>
{{#rental_offer}}

<rental_offer>
{{rental_offer}}
</rental_offer>
{{/rental_offer}}

1. Is this the right move: compare the current job with renting on take-home money, control over prices and hours, risk, and what they give up (paid holiday, sick pay, employer pension, training, a steady flow of walk-in clients). Name the deciding factor for this person.
2. Weekly costs: rent or commission, products and backbar, card fees, booking software, insurance (public liability and treatment risk), laundry, training, a set-aside for tax, and an allowance for unpaid holiday and sick days (spread over the working weeks). Use their figures; mark estimates.
3. Break-even: average ticket, clients per week needed to cover costs, and clients needed to match current take-home pay. Then, from the clients likely to follow and a realistic rebooking rate, how many weeks it takes to reach those numbers. Show the arithmetic. For a commission split, compare it with fixed rent at their likely takings and say where the crossover is.
4. Client plan: who is likely to follow, what their current contract may say about taking clients (check it, and leave on good terms), how to tell clients after resigning rather than before if the contract restricts it, and how to build new clients in the first 12 weeks (rebooking at the chair, referral offer, local listings, before-and-after photos with consent).
5. Rental terms to check: what rent covers, who sets prices and hours, product rules, who owns client records and the booking page, deposit and notice on both sides, holiday cover, what happens if the salon is sold, and signs it is employment in disguise (set hours, required uniforms and prices, no choice of clients). Recommend a written agreement.
6. Setup checklist: registering as self-employed, a separate bank account, insurance, any local licence for the trade, a booking system the client data belongs to, card reader, consultation and patch-test records, a cash buffer of at least two to three months of costs.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent rents, local prices, tax rates or licensing rules. Use the user's figures and mark anything else as an estimate or a check to make locally.
- Do not advise breaking a contract or taking client data that belongs to the employer; point to checking the contract and, if it restricts clients, to an employment adviser.
- If current clients, prices or the rent are missing, give the plan with [X] placeholders and list them as questions.
- Totals and break-even arithmetic must add up; show the steps.
</constraints>

<output_format>
## Is this the right move
Table: Factor | Staying employed | Renting. Then the deciding factor in two sentences.

## Weekly costs
Table: Cost | Weekly amount | Source (given, estimate). Total.

## Break-even
Arithmetic in steps, then weeks to break even and to match current pay.

## Client plan
Bullets for leaving well and for the first 12 weeks.

## Rental terms to check
Checklist.

## Setup checklist
Checklist with an order to do things in.

## Questions
Everything to confirm, short bullets.
</output_format>
