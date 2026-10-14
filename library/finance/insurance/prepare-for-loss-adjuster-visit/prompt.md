---
schema: 1
id: prepare-for-loss-adjuster-visit
kind: prompt
title: Prepare for a loss adjuster visit
description: Prepares a household or small business for an insurer's loss adjuster visit after a fire, flood, leak or break-in - what to have ready, how to walk them round, what to ask and what not to sign.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder]
requires: [none]
inputs: [text, notes]
output: [checklist, questions, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [loss-adjuster, property-damage, escape-of-water, fire-damage, site-visit]
pairs_with:
  prompts: [price-contents-claim-list, review-claim-settlement-offer, check-home-sum-insured]
  workflows: [insurance-claim-track]
args:
  - name: loss
    description: What happened and when, which rooms or areas are affected, what has been done so far (emergency repairs, drying, items thrown away), and whether you can still live or trade there.
    type: text
    required: true
  - name: policy
    description: The relevant parts of the policy if you have them - buildings or contents or both, sums insured, excesses, alternative accommodation or business interruption cover, and any conditions about notifying or keeping damaged items.
    type: text
  - name: visit
    description: When the visit is and anything the insurer said about it - in person or video, the adjuster's firm, documents requested.
    type: string
output_contract:
  format: markdown
  sections: [What the adjuster is there to do, Before the visit, On the day, Questions to ask, What not to do, After the visit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A loss adjuster is appointed and paid by the insurer to check the cause of the loss, whether it is covered, and how much it should cost to put right. Most are professional and fair, but their report shapes the outcome, so the visit matters. Adjusters look for: the cause and whether an exclusion applies (gradual leaks, wear and tear, lack of maintenance, unoccupied property), whether the sum insured is adequate (an underinsurance finding reduces every payment proportionally on many policies), proof of ownership and value, and whether the policyholder has acted to limit the damage. People lose out by throwing away damaged items before they are seen, letting the visit become an informal chat in which they guess at dates or causes, not mentioning losses they have not noticed yet (smoke in cupboards, damp in walls, food in the freezer, alternative accommodation, extra costs), or signing a form they do not understand. A loss assessor is different: hired by the policyholder, usually for a percentage of the settlement.
{{#policy}}

<policy>
{{policy}}
</policy>
{{/policy}}
{{#visit}}

Visit: {{visit}}
{{/visit}}
</context>

<task>
<loss>
{{loss}}
</loss>

1. What the adjuster is there to do: a short, neutral explanation tailored to this loss, including the cause and exclusion questions they are likely to ask.
2. Before the visit: a checklist - timeline of events with dates, photos and video from before clean-up, damaged items kept (or photographed with a reason if they had to go), receipts and proof of ownership, repair quotes and emergency repair invoices, a first list of every room and item affected, the policy documents, and a note of extra costs so far.
3. On the day: walk the adjuster through room by room, point out hidden damage, answer factual questions accurately and say "I'll check and confirm in writing" rather than guessing, take your own notes, and ask for anything requested to be confirmed by email.
4. Questions to ask: what the next steps and timescales are, whether the insurer will repair through its own contractors or cash settle, what is accepted as covered so far, whether interim payments or alternative accommodation are available, whether any underinsurance concern has been raised, and who to contact.
5. What not to do: do not sign a settlement or "satisfaction" form on the day, do not exaggerate or guess, do not throw away more items without agreement, do not agree to a cash figure before you have your own quotes.
6. After the visit: send a short email summarising what was agreed and listing items still to be added, with a date for a response.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest exaggerating, inventing items or hiding facts that point to an exclusion; say plainly that a false statement can void the whole claim.
- Do not state what the policy covers beyond the wording supplied; mark assumptions.
- If the property is unsafe (structural damage, electrics after a flood, fire damage), safety and professional checks come first.
- Mention loss assessors and their fees neutrally if the loss is large or complex; do not push either way.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the adjuster is there to do
Short paragraph and the questions they will likely ask.

## Before the visit
Checklist.

## On the day
Numbered.

## Questions to ask
Numbered.

## What not to do
Bullets.

## After the visit
Steps and a short draft follow-up email.
</output_format>
