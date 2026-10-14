---
schema: 1
id: write-membership-terms
kind: prompt
title: Write membership terms
description: Drafts membership terms for a gym, club, coworking space or studio - joining, fees and price changes, minimum terms, freezing, cancellation, conduct, facility rules and ending membership.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [membership-terms, gym-contracts, minimum-term, membership-cancellation, house-rules]
pairs_with:
  prompts: [handle-membership-cancellation-requests, write-refund-policy, write-terms-of-service]
args:
  - name: membership
    description: The kind of venue, membership types and prices, minimum term, how people join and pay (direct debit, card, annual), freezes, guest passes, facilities and any risky activities, and what happens today when people want to leave.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state, because cancellation, auto-renewal and price-change rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Fairness check, Membership terms, Key facts summary, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Membership contracts are among the most complained-about consumer agreements, so regulators look at them closely. Problems that lead to disputes or enforcement: long minimum terms with no way out after moving or illness, auto-renewal that people did not understand, cancellation only in person or by post when joining was online, price rises with no notice or right to leave, and terms allowing the operator to change anything. Many places have rules on unfair terms, cooling-off for distance contracts, easy online cancellation and auto-renewal reminders (some US states and the EU and UK have specific rules), and some regulate health club contracts directly. Fair, clear terms reduce chargebacks and bad reviews as well as legal risk.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Membership:
<membership>
{{membership}}
</membership>

1. Fairness check: for each current practice in the description, whether it is likely to be seen as unfair or non-compliant, and a recommendation.
2. Membership terms in plain language:
   - Who you contract with [BRACKETS], membership types and what each includes.
   - Joining, age limits, health declaration where activities carry risk, and induction.
   - Fees, payment method, failed payments, and price changes with notice [PERIOD] and the right to cancel.
   - Minimum term, renewal and how renewal reminders are given.
   - Freezing: when allowed (medical, travel), how to request, limits.
   - Cancellation: how (at least as easy as joining), notice period, early-exit cases (moving away, long-term illness, job loss) and fees if any.
   - Cooling-off for online or distance sign-ups where it applies.
   - Rules of use, guests, behaviour, lockers and property, and the operator's right to suspend or end membership with reasons.
   - Closures and changes to facilities, and what members get if the service is significantly reduced.
   - Liability: what the operator is responsible for, without excluding liability for negligence causing injury.
   - Personal data, complaints, governing law.
3. Key facts summary: a short box of the terms people most need before signing.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft terms that exclude liability for death or personal injury caused by negligence, or that make cancellation harder than joining.
- Do not invent prices, periods or fees; use [PLACEHOLDERS].
- Do not state legal rules as fact for the jurisdiction unless supplied; mark them to confirm.
- Keep the key facts summary consistent with the terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fairness check
Table: practice | risk | recommendation.

## Membership terms
Numbered sections.

## Key facts summary
Short box of bullets.

## Points to confirm
Numbered.
</output_format>
