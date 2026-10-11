---
schema: 1
id: prepare-for-tenancy-check-out
kind: prompt
title: Prepare for your tenancy check-out
description: Gets a tenant ready for the check-out inspection by comparing the home with the check-in record, sorting fair wear and tear from damage, and deciding what to fix, leave and document.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [individual, student, parent]
subject: [law]
requires: [none]
inputs: [document, notes]
output: [checklist, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [deposit, fair-wear-and-tear, check-out-inspection, end-of-tenancy, moving-out]
pairs_with:
  prompts: [deep-clean-for-move-out, demand-deposit-return, document-rental-move-in, write-tenant-notice-to-leave]
  personas: [tenant-rights-advisor]
args:
  - name: condition
    description: The current condition room by room - marks, holes, stains, breakages, anything you changed or added - and how long you have lived there and with how many people or pets.
    type: text
    required: true
  - name: check_in
    description: What the check-in inventory or move-in photos recorded, if you have them. Optional, but deposit outcomes depend on it.
    type: text
  - name: country
    description: Country or region, for how deposits are held and disputed. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Item by item, Fix before you go, Leave as it is, Evidence to collect, On the day, Message to the landlord]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare tenants for check-out the way a deposit adjudicator would want them prepared. Deductions are judged by comparing the condition at the start with the condition at the end, allowing for fair wear and tear given how long the tenancy lasted and how many people lived there. Tenants lose money in three predictable ways: doing amateur repairs that look worse than the original mark (a badly patched wall or mismatched paint can turn wear into damage); leaving items or alterations the inventory does not show; and having no dated evidence of their own. Some things are worth fixing because a professional charge would be higher (a broken blind, a missing bulb, a burnt-out extractor filter), while normal scuffs, faded paint and flattened carpet after years of use are usually wear and tear and better left alone. This entry does not plan the cleaning; it decides what to repair, what to leave and what to prove.

<condition>
{{condition}}
</condition>
{{#check_in}}

<check_in>
{{check_in}}
</check_in>
{{/check_in}}
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Go item by item: compare each issue with the check-in record (or note that there is none), and classify it as likely fair wear and tear, likely chargeable damage, an alteration to undo, or already present at check-in. Give the reason.
2. List what to fix before leaving, with whether a tenant should do it or a professional, and the risk of a poor DIY repair. Only include fixes likely to cost less than a probable deduction.
3. List what to leave as it is and why, so effort and money are not wasted.
4. List the evidence to collect: dated photos and video of every room and item listed, close-ups of disputed areas next to check-in photos, meter readings, receipts for cleaning or repairs, and the condition of the outside space.
5. Plan the day: attend the check-out if possible, walk through with the inventory, note disagreements at the time, return all keys and get a receipt, and leave a forwarding address.
6. Draft a short message to the landlord or agent confirming the check-out date and time, the forwarding address and the request for any proposed deductions in writing with evidence. Mention that the deposit return timeline and the dispute route should be checked locally `[CHECK locally]`.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state deposit rules or deadlines as fact; mark them `[CHECK locally]`.
- Classifications are judgement calls; say "likely" and explain, rather than promising an outcome.
- Do not suggest hiding damage, removing inventory items or misdescribing condition. If asked, decline and explain the risk.
- Do not plan the cleaning in detail; point to a move-out cleaning plan instead.
{{> output/uncertainty}}
</constraints>

<output_format>
## Item by item
Table: item, check-in record, now, classification, reason.

## Fix before you go
Table: item, who, rough effort, why it is worth it.

## Leave as it is
Bullets.

## Evidence to collect
Checklist.

## On the day
Numbered steps.

## Message to the landlord
Under 120 words.
</output_format>
