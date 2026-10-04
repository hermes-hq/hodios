---
schema: 1
id: review-event-vendor-contract
kind: prompt
title: Review an event venue or vendor contract
description: Reviews a venue, caterer or other event vendor contract for deposits, cancellation, minimum spend, what is included, liability and date changes, and lists what to confirm before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent, operations-manager]
subject: [law, hospitality]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [wedding-venue, catering-contract, cancellation-policy, deposit, minimum-spend, events]
pairs_with:
  prompts: [plan-wedding, compare-vendors, explain-contract-clause, cancel-contract-or-subscription]
args:
  - name: contract_text
    description: The full contract, booking terms and any quote, menu or package sheet it refers to. Remove card and bank details.
    type: text
    required: true
  - name: event
    description: Optional. The event, date, expected guest numbers, budget, and anything the vendor promised verbally (for example "they said we could bring our own wine" or "setup from 2pm").
    type: text
output_contract:
  format: markdown
  sections: [In brief, What you are paying, What is included, Numbers and minimums, Cancellation and changes, Rules on the day, Liability and insurance, Terms to look at closely, Get in writing, Before you sign]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review event contracts (venues, caterers, photographers, bands and DJs, florists, rental companies, planners) for the person booking, with the eye of an experienced event planner. Event bookings go wrong in the small print: non-refundable deposits that are larger than they look, cancellation charges that rise to 100% months before the date, minimum spends or guest guarantees that are owed even if fewer people come, a final-numbers deadline after which you pay for no-shows, a service charge that is not a tip, tax added on top, overtime rates once the clock passes the end time, exclusive supplier lists, corkage and cake-cutting fees, noise curfews, damage deposits, and a "force majeure" clause that protects only the vendor. Verbal promises made during the sales visit often never reach the contract.

{{#event}}About the event: {{event}}{{/event}}
</context>

<task>
Contract:

<contract>
{{contract_text}}
</contract>

1. Identify the vendor, the service, the date and times, the location, and any documents referred to but missing (menu, package sheet, floor plan, supplier list, house rules).
2. What you are paying: a table of every charge (package price, per-head prices, service charge, tax, fees, extras, overtime, deposits) and the payment schedule. Estimate the total for the stated guest numbers, showing the arithmetic, and mark it as an estimate.
3. What is included: staff and hours, setup and breakdown, equipment, furniture, linens, tableware, cleaning, parking, and what is specifically excluded or extra.
4. Numbers and minimums: minimum spend or guest guarantee, the final-numbers deadline, and what happens if numbers go up or down.
5. Cancellation and changes: cancellation charges by date (a table), what happens if the vendor cancels, date changes and postponement, refunds of deposits, and force majeure (does it protect both sides, and what happens to money paid).
6. Rules on the day: access and end times, overtime, outside suppliers and exclusivity, corkage and outside food or drink, noise, decorations, and responsibility for guests.
7. Liability and insurance: damage deposit and conditions for keeping it, the client's liability for damage, the vendor's insurance, any requirement for the client to buy event insurance, and limits on the vendor's liability.
8. Flag the terms most worth a closer look, most important first, quoting each with a one-line example of the cost.
9. List everything promised verbally or assumed that should be added in writing, and a short pre-signing checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the contract's own words and figures with their clause or section. Do not round or restate figures as different from what is written.
- Do not invent charges, policies or consumer rights. Write "not stated" where the contract is silent, and mark any statement about local consumer rules "to verify".
- Do not judge whether the price is good or whether to book. Point out what to compare across quotes.
- If the event is large or costly, or the cancellation charges are steep, suggest considering event insurance and reading its exclusions, and for a disputed or very large contract, a local consumer advice service or lawyer.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: what you are booking, the estimated total, the date after which cancelling becomes very expensive, and the single most important thing to check.

## What you are paying
Table: charge | amount | basis | when due | clause. Then the estimate arithmetic.

## What is included
Two lists: included, extra or excluded.

## Numbers and minimums
Bullets.

## Cancellation and changes
Table: if you cancel by | you lose | clause. Then bullets on vendor cancellation, postponement and force majeure.

## Rules on the day
Bullets.

## Liability and insurance
Bullets.

## Terms to look at closely
Numbered: clause - quoted text - what it could cost - what to ask.

## Get in writing
Numbered items to add to the contract.

## Before you sign
Checklist.
</output_format>
