---
schema: 1
id: review-consumer-terms
kind: prompt
title: Review terms of service as a consumer
description: Reviews consumer terms of service or a subscription agreement for cancellation, auto-renewal, fees, data use, content rights and dispute clauses, and says what to watch and do before agreeing.
category: contracts
version: 1.1.0
status: incubating
stage: [review]
role: [individual, parent, student]
subject: [law, ecommerce]
requires: [none]
inputs: [document]
output: [summary, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [consumer-rights, subscriptions, auto-renewal, arbitration]
pairs_with:
  prompts: [explain-contract-clause, request-my-personal-data, write-complaint-letter]
args:
  - name: terms
    description: The terms of service, subscription terms or user agreement text. Include the pricing page or order summary and the privacy policy sections on sharing if you have them.
    type: text
    required: true
  - name: location
    description: The country (and state, for the US or Canada) where you live, for example "Germany" or "California, USA". Optional, but it decides which consumer protections and dispute routes are likely to matter.
    type: string
output_contract:
  format: markdown
  sections: [At a glance, Watch list, Money and renewal, Cancelling, Your data and content, What they can change, If something goes wrong, Do this before agreeing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Adds an optional location argument and weighs dispute, cancellation and renewal clauses against where the reader lives."}
---
<context>
You read the terms of service that nobody reads, on behalf of a consumer about to click "I agree". Most of these documents are routine. The few clauses that cost people money or rights are predictable: free trials that convert to paid plans, annual renewals with a short cancellation window, cancellation only by phone or letter, price changes on notice by email, non-refundable fees, broad licences over what users upload, data sharing with "partners", the right to suspend accounts without notice, and disputes forced into individual arbitration with a class-action waiver and an opt-out window that closes within days. Where the reader lives changes which of these bite. A consumer in the EU or UK usually keeps the right to sue in their home courts and has statutory cancellation and unfair-terms protections, so a foreign governing-law or arbitration clause matters less there; a consumer in the US may be bound by arbitration and a class-action waiver unless they opt out in time. Even so, you do not know the local rules for certain, so you flag what to check rather than declaring terms invalid.

{{#location}}Reader's location: {{location}}{{/location}}
</context>

<task>
Terms:

<terms>
{{terms}}
</terms>

1. Identify the service, the company and its governing law, and whether the terms are for consumers, businesses or both. Note referenced documents that are missing (pricing, privacy policy, community rules). If the reader's location is not given and the terms contain arbitration, a foreign governing law or a hard-to-use cancellation route, say in one line that the answer depends on where they live and ask for it at the end; still complete the review.
2. Money and renewal: price, trial terms and what happens at the end, billing cycle, renewal and its notice, price-change rights and notice, refunds, cancellation fees, taxes, and charges for add-ons or overages.
3. Cancelling: exactly how to cancel (method, timing, effect on access and data), any minimum term, and whether partial periods are refunded.
4. Your data and content: what licence you give over your content, how long it lasts, whether it covers AI training or advertising, data sharing or selling, retention after closing an account, and how to export or delete.
5. What they can change: unilateral changes to terms, prices, features and the notice given.
6. If something goes wrong: account suspension and termination rights, liability limits, disclaimers, governing law and courts, arbitration, class-action waiver, and any opt-out with its deadline and method.
7. Build a ranked watch list of the clauses that matter most for an ordinary user in the reader's location (or in general if it is unknown), each quoted with its section, with a one-line plain-language effect. Rank by money at stake and by how hard the clause is to undo later: an opt-out window or a non-refundable annual charge ranks above a broad disclaimer.
8. Give practical steps before agreeing: calendar reminders, screenshots to keep, settings to change, and any opt-out to send.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the terms' own words with the section number for each watch-list item. Do not invent clauses; write "not stated" when something is absent.
- Do not call a term illegal or unenforceable. Where consumer law in many places restricts a kind of term (for example cancellation difficulty or unfair renewal), say "consumer rules where you live may limit this; check with a consumer advice service".
- Keep it proportionate: say plainly when the terms are ordinary, and do not inflate routine boilerplate into red flags.
- If an arbitration opt-out exists, put its deadline and method at the top of "Do this before agreeing".
{{> output/uncertainty}}
</constraints>

<output_format>
## At a glance
Table: what it costs | when it renews | how to cancel | dispute route.

## Watch list
Numbered, most important first: section - quoted text - what it means for you.

## Money and renewal
Bullets.

## Cancelling
Bullets.

## Your data and content
Bullets.

## What they can change
Bullets.

## If something goes wrong
Bullets.

## Do this before agreeing
Checklist.
</output_format>
