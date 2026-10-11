---
schema: 1
id: write-tenancy-check-out-report
kind: prompt
title: Write an end-of-tenancy check-out report
description: Compares a landlord's check-out notes with the check-in inventory item by item, separates fair wear and tear from damage, and proposes deposit deductions that would survive a dispute.
category: real-estate
version: 1.0.0
status: incubating
stage: [review]
role: [individual, operations-manager]
subject: [real-estate]
requires: [none]
inputs: [notes, document]
output: [report, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [landlord, deposit-deductions, fair-wear-and-tear, inventory, end-of-tenancy]
pairs_with:
  prompts: [write-property-inspection-report, check-landlord-obligations]
  personas: [property-manager]
args:
  - name: check_in
    description: The check-in inventory or its relevant parts - condition of each room and item at the start, with dates and whether photos exist.
    type: text
    required: true
  - name: check_out
    description: Your check-out notes - condition now, room by room, with photos taken, meter readings and keys returned.
    type: text
    required: true
  - name: tenancy
    description: Tenancy length, deposit amount and where it is held, number of occupants, pets allowed or not, and any quotes or invoices for repairs or cleaning.
    type: text
    required: true
  - name: country
    description: Country or region. Deposit protection, deadlines and dispute schemes vary. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Item comparison, Proposed deductions, Items not claimed, Letter to the tenant, Deadlines and process]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare a check-out report the way an independent inventory clerk and a deposit dispute adjudicator would read it. Deposit disputes are decided on evidence and proportion, not on how annoyed the landlord is. Three principles decide most cases. The landlord must show the condition at the start (a dated, detailed check-in) and at the end; without the first, a claim usually fails. Fair wear and tear, meaning deterioration from normal use over the tenancy's length and occupancy, is not chargeable. And a landlord is not entitled to "new for old": a deduction for damage is usually limited to a proportion of the cost that reflects the item's age and expected life, or to the loss in value, rather than the full replacement price. Cleaning claims succeed when the check-in recorded a professional standard and the check-out shows it was not returned to that standard.

<check_in>
{{check_in}}
</check_in>

<check_out>
{{check_out}}
</check_out>

<tenancy>
{{tenancy}}
</tenancy>
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Compare check-in and check-out for every item where the condition changed. Classify each as no change, fair wear and tear, damage, missing, or cleaning, giving the reason in light of the tenancy length and occupancy.
2. For each chargeable item, propose a deduction: the cost evidence given, the item's age and an assumed useful life (stated), the apportioned amount, and the evidence that supports it. Where no cost evidence is supplied, say a quote or invoice is needed and leave the figure open.
3. List items the landlord should not claim and why, so the final claim is credible.
4. Draft a clear, neutral letter to the tenant setting out the proposed deductions, the evidence available, the balance to be returned, and how the tenant can agree or dispute.
5. List deadlines and process points to verify locally, marked `[CHECK locally]`: time limits to propose deductions and return the undisputed balance, the deposit scheme's dispute process, and what evidence an adjudicator will expect.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent condition, ages, prices or photos. Use only what is in the notes; mark missing evidence.
- Do not charge for fair wear and tear, for betterment (new for old), or for conditions already recorded at check-in.
- Do not state deposit deadlines or rules as fact; mark them `[CHECK locally]`.
- Keep the letter factual and under 250 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two or three lines: total proposed, balance to return, strongest and weakest items.

## Item comparison
Table: room and item, check-in, check-out, classification, reason.

## Proposed deductions
Table: item, cost evidence, age and life assumed, proposed amount, evidence.

## Items not claimed
Bullets with reasons.

## Letter to the tenant
The draft.

## Deadlines and process
Bullets marked `[CHECK locally]`.
</output_format>
