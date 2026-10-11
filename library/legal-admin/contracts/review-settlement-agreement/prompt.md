---
schema: 1
id: review-settlement-agreement
kind: prompt
title: Review a dispute settlement and release
description: Reviews a proposed settlement and release for a consumer or business dispute, checking release scope, payment terms, confidentiality, admissions, default and what stays open.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, founder, operations-manager]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [settlement-agreement, release-of-claims, dispute-resolution, full-and-final, confidentiality-clause, debt-settlement]
pairs_with:
  prompts: [write-settlement-offer-letter, prepare-small-claims-case, explain-contract-clause]
args:
  - name: settlement
    description: The proposed settlement agreement, release or "full and final settlement" letter, with clause numbers. Remove account and ID numbers.
    type: text
    required: true
  - name: dispute
    description: What the dispute is about, which side you are, what you originally claimed or owe, what you were offered, any court or tribunal deadlines, and other related claims you might have.
    type: text
    required: true
  - name: country
    description: Country and region and the governing law named.
    type: string
output_contract:
  format: markdown
  sections: [In brief, What you get and what you give up, Clause check, What stays open, Changes to ask for, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Settlement agreements end disputes with builders, landlords, customers, suppliers, insurers' counterparts or neighbours, and they are drafted by whoever wants the dispute closed most cheaply. What dispute lawyers check: the release, which is often far wider than the dispute ("all claims, known or unknown, arising from any matter"), and whether it is mutual or only binds one side; whether claims the person wants to keep (a separate invoice, a warranty, a personal injury, claims against third parties such as an insurer or subcontractor) are carved out; the payment amount, date, method and what happens if payment is late or never arrives (the release should only bite once paid, or default should revive the claim or allow a quick judgment); whether payment is in instalments and secured; no-admission wording; confidentiality and non-disparagement, including whether existing online reviews must be removed; tax or VAT treatment of the payment; who bears legal costs; how pending court or tribunal proceedings are ended and by when; and whether the original contract obligations (warranties, ongoing service) survive. "Full and final settlement" wording on a cheque or letter can have legal effect in some places, so accepting a part-payment with that wording should be checked first.
{{#country}}

Country and law: {{country}}
{{/country}}

<dispute>
{{dispute}}
</dispute>
</context>

<task>
<settlement>
{{settlement}}
</settlement>

1. In brief: what the deal is, whether the release matches the dispute, and the three most important issues.
2. What you get and what you give up: a plain comparison of the payment or action received against the claims released, the original claim, and any costs.
3. Clause check, quoting each clause: parties, payment amount, timing and method, instalments and security, conditions, release scope and whether mutual, carve-outs, unknown claims, no admission, confidentiality, non-disparagement and reviews, return of property or documents, ongoing obligations and warranties, ending proceedings, costs, tax, default and remedies, governing law.
4. What stays open: claims, obligations or people not covered by the release, and claims the user may lose without realising.
5. Changes to ask for: ranked, each with a reason and fallback (narrow the release to this dispute, make it mutual, release only on receipt of payment, carve out warranties, add a default clause, clarify reviews).
6. Get a lawyer if: features that need one, including deadlines in any court or tribunal case, injuries, or large sums.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Do not invent amounts or deadlines.
- Recommend a lawyer review the agreement before signing when the sums matter to the user, a court or tribunal case is pending, personal injury is involved, or the release reaches beyond the dispute; signing usually ends the claims it releases.
- Do not say whether the offer is good enough or predict what a court would award; compare it with the stated claim and leave the decision to the user.
- Do not state local rules on "full and final settlement" wording, tax or limitation periods as fact; list them as points to check.
- This prompt is not for employment severance or settlement with an employer; for that, point to a severance review and an employment lawyer.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## What you get and what you give up
Two short lists and one line on the gap against the original claim.

## Clause check
Table: topic | clause and short quote | rating (fine / check / change) | why.

## What stays open
Bullets.

## Changes to ask for
Numbered: change - reason - fallback.

## Get a lawyer if
Bullets.
</output_format>
