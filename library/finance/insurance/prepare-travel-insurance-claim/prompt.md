---
schema: 1
id: prepare-travel-insurance-claim
kind: prompt
title: Prepare a travel insurance claim
description: Prepares a travel insurance claim for a cancelled trip, medical care abroad, delay or lost baggage, matching each cost to a policy section and listing the proof each one needs.
category: insurance
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent, traveler]
requires: [none]
inputs: [text, document]
output: [table, checklist, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [travel-claim, trip-cancellation, medical-abroad, lost-luggage, flight-delay]
pairs_with:
  prompts: [choose-travel-insurance, appeal-insurance-denial, price-contents-claim-list]
  workflows: [insurance-claim-track]
args:
  - name: what_happened
    description: What went wrong, dates, where you were, and what you have done so far - who you told, whether you called the insurer's emergency line, what the airline or hotel said.
    type: text
    required: true
  - name: costs
    description: Each cost or loss with an amount and currency - unused bookings, extra hotel nights, medical bills, replacement items, taxis, new flights - and whether any has been refunded.
    type: text
    required: true
  - name: policy
    description: The relevant policy sections if you have them - cancellation, curtailment, medical, baggage, delay - with limits, excesses and conditions.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Costs mapped to the policy, Proof needed, Recover from others first, Claim statement, Watch-outs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Travel claims fail on paperwork more than on cover. Each section has its own proof: cancellation needs the reason in writing (a doctor's letter for illness, often on the insurer's own form), booking confirmations and the cancellation invoices showing what was non-refundable; medical claims need itemised bills and a medical report, and many policies require the insurer's emergency assistance line to be called before treatment or before any hospital stay or flight home; lost or delayed baggage needs a report from the airline (often called a property irregularity report) made at the airport, plus receipts or proof of value; theft needs a police report made locally within a short time. Insurers also expect you to claim first from anyone else who owes you: airlines under passenger rights rules, hotels and tour operators, card issuers. They deduct those amounts, apply an excess per person per section, cap single items and valuables, and may use depreciation for older items. Pre-existing medical conditions that were not declared are the most common reason for refused cancellation and medical claims.
{{#policy}}

<policy>
{{policy}}
</policy>
{{/policy}}

<what_happened>
{{what_happened}}
</what_happened>
</context>

<task>
<costs>
{{costs}}
</costs>

1. Costs mapped to the policy: for each cost, the section it falls under (cancellation, curtailment, medical, baggage, delay, personal money), the limit and excess where known, and whether it is likely claimable, not claimable, or unclear and why.
2. Proof needed: for each cost, the specific document, who issues it, and whether it can still be obtained (some reports must be made at the time; if missed, say what substitute evidence may help).
3. Recover from others first: what to claim from the airline, tour operator, hotel or card provider, and that the insurer will usually deduct it or want to know.
4. Claim statement: a short, factual, dated account the person can paste into the claim form.
5. Watch-outs: claim time limits in the policy, declarations of medical conditions, the insurer's emergency line condition, currency conversion, and keeping copies of everything.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent policy terms, limits or passenger rights amounts; use the wording supplied and say what to check.
- Do not help claim for items not lost, inflate values, or describe a cancellation reason that was not the real one.
- If a medical condition was not declared, say honestly that it may affect the claim and that the person should answer the insurer truthfully.
- If the person is still abroad and unwell, put calling the insurer's emergency assistance line first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
What is likely claimable, the total, and the first thing to do.

## Costs mapped to the policy
Table: cost | amount | section | limit and excess | likely claimable? | note.

## Proof needed
Table: cost | document | who provides it | status.

## Recover from others first
Bullets.

## Claim statement
The text, ready to paste.

## Watch-outs
Bullets.
</output_format>
