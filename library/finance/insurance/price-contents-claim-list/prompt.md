---
schema: 1
id: price-contents-claim-list
kind: prompt
title: Price a contents claim list
description: Turns lost or damaged belongings into a claim schedule with honest replacement values, the settlement basis, proof for each item and the limits that apply, after a theft, fire or flood.
category: insurance
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [contents-claim, proof-of-ownership, new-for-old, wear-and-tear, claim-schedule]
pairs_with:
  prompts: [build-home-inventory, review-claim-settlement-offer, explain-insurance-policy]
  workflows: [insurance-claim-track]
args:
  - name: items
    description: "What was lost or damaged: each item with a description (brand, model, size, age), what you paid if known, and the evidence you have (receipt, photo, bank statement, box, manual, email confirmation)."
    type: text
    required: true
  - name: policy_basis
    description: "How the policy settles contents claims (new for old, or indemnity with deductions for wear and tear), single-item and valuables limits, the excess, and any items you specified. Paste the relevant wording if you have it."
    type: text
  - name: event
    description: What happened and when (burglary, fire, flood, escape of water), and whether a police or fire report exists.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Claim schedule, Proof for each item, Limits and deductions that will apply, What to send and keep, Questions for the insurer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a loss, people under-claim because they forget items and over-claim by guessing high, and both cost them: forgotten items are never paid, and inflated values trigger investigation and can turn a valid claim into a refused one. A good claim schedule lists each item with enough description to identify a like-for-like replacement today, the current replacement price (not what was paid years ago, and not a premium upgrade), and the proof available. Proof does not have to be a receipt: photos showing the item, bank or card statements, online order histories, warranty registrations, manuals, boxes and serial numbers all help. Most contents policies pay new for old, but clothing and some other items are often settled with a deduction for wear and tear; insurers may replace items through their own suppliers or pay cash at their discounted rate. Pairs and sets, single-item limits, valuables limits and cash limits all cap what will be paid.

{{#event}}What happened: {{event}}{{/event}}
</context>

<task>
<items>
{{items}}
</items>
{{#policy_basis}}

<policy_basis>
{{policy_basis}}
</policy_basis>
{{/policy_basis}}

1. Prompt for commonly forgotten items for this kind of event, room by room (for example food in a freezer after a power cut, clothing and shoes, bedding, kitchen items, children's things, items in cupboards and the garage), and add those the person confirms.
2. Claim schedule: for each item, an identifying description, age, purchase price if known, a current like-for-like replacement price as a placeholder [price] with where to find it (the same or nearest current model at a mainstream retailer), and the settlement basis that likely applies.
3. Proof for each item: what evidence exists and what else could be found (photos in phone or social media backgrounds, statements, order histories, serial numbers registered online).
4. Limits and deductions that will apply: single-item, valuables, cash and pairs-or-sets rules, wear and tear on clothing where the policy says so, and the excess; show a rough expected payout range where figures exist.
5. What to send and keep: the schedule, evidence, report reference, photos of damaged items before disposal (keep damaged items until the insurer agrees), and a log of every contact.
6. Questions for the insurer, including how they settle (replacement via suppliers or cash) and how disputed values are resolved.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never inflate values or add items the person did not own; if asked, refuse and explain that exaggerating a claim is fraud and can void the whole claim.
- Do not invent current prices; leave a placeholder and say where to check.
- Quote the policy wording supplied for settlement basis and limits; if not supplied, describe common practice and mark it to check.
- Do not tell the person to dispose of damaged items before the insurer agrees.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Number of items, value range claimed, the limits most likely to bite, and the next step.

## Claim schedule
Table: item | description | age | paid | replacement price | basis.

## Proof for each item
Table: item | evidence held | evidence to look for.

## Limits and deductions that will apply
Bullets with a rough payout range.

## What to send and keep
Checklist.

## Questions for the insurer
Numbered.
</output_format>
