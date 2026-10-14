---
schema: 1
id: check-auto-renewal-compliance
kind: prompt
title: Check a subscription's auto-renewal compliance
description: Checks a subscription's sign-up, free trial, renewal reminders, price-rise notices and cancellation flow against automatic-renewal and easy-cancellation rules, with fixes ranked by risk.
category: compliance
version: 1.0.0
status: incubating
stage: [review]
role: [founder, product-manager, marketer]
subject: [law, saas, ecommerce]
requires: [none]
inputs: [text]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [subscriptions, auto-renewal, free-trials, cancellation-flow, price-increases, consumer-law]
pairs_with:
  prompts: [design-churn-save-flow, check-online-shop-consumer-law, write-terms-change-notice, write-terms-of-service]
args:
  - name: subscription
    description: What is sold and to whom (consumers or businesses), the sign-up screens and wording near the pay button, any free or discounted trial, renewal term and price, reminder emails, how to cancel (online, phone, chat) and every step of the cancel flow, and how price rises are handled.
    type: text
    required: true
  - name: markets
    description: Countries, and US states if relevant, where subscribers live.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Flow map, Findings, Required disclosures, Cancellation flow, Price changes, Fix list, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check a consumer subscription against the rules on automatic renewal, which regulators actively enforce. The recurring themes across countries: before taking payment details, disclose clearly and close to the consent point that the subscription renews automatically, how much, how often, until when, and how to cancel; get express consent to the recurring charge; send an acknowledgment that repeats those terms and how to cancel; warn before a free or discounted trial turns into a paid one and before longer renewals; let people cancel as easily as they signed up, usually online if they joined online, without forcing a phone call or chat; keep retention offers short and skippable; and get consent or give notice with a right to cancel before price increases, depending on the place. In the US, a federal law requires clear disclosure, express consent and simple cancellation for online negative option sales, many states have their own automatic renewal laws (California's is detailed and has been amended), and the federal regulator's broader "click to cancel" rule was struck down by a court in 2025, so the federal position must be checked. In Europe, general consumer and unfair terms law applies, Germany requires a cancellation button for online contracts and limits long tie-ins, and the UK has legislated a dedicated subscription contracts regime with commencement dates to confirm. Common failures: trial conversion with no reminder, cancellation only by phone, five-step save flows, unclear renewal length, and price rises applied without the notice or consent required.
</context>

<task>
Subscription:
<subscription>
{{subscription}}
</subscription>

Markets: {{markets}}

1. Flow map: sign-up, trial, first charge, reminders, renewal, price change and cancellation, as a short sequence.
2. Findings: at each step, what is compliant, missing or risky for the markets given.
3. Required disclosures: the information that must appear near the consent point, in the acknowledgment and in reminders, compared with what the user described.
4. Cancellation flow: whether it is as easy as sign-up, the channels allowed, number of steps, how retention offers are presented, confirmation of cancellation, and when access ends.
5. Price changes: what notice or consent is needed and how to handle existing subscribers.
6. Fix list: each fix with priority, effort and suggested wording or design change.
7. Points to verify, including which rules have changed recently and need checking.
If the subscription is sold only to businesses, say that most automatic renewal laws target consumers and adjust, while noting contract terms still need to be clear.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state the current status, effective dates or exact requirements of a law unless confident; mark "confirm current rule for [market]".
- Do not suggest dark patterns (hidden cancel links, confirm-shaming, forced calls, pre-checked renewals); if the user asks for them, explain the enforcement risk and offer a lawful retention approach.
- Judge only what the user described; mark the rest "not checked".
{{> output/uncertainty}}
</constraints>

<output_format>
## Flow map
Numbered sequence.

## Findings
Table: step | status | issue | market.

## Required disclosures
Table: where | required content | currently shown.

## Cancellation flow
Bulleted list.

## Price changes
Bulleted list.

## Fix list
Table: fix | priority | effort | wording or design.

## Points to verify
Numbered list.
</output_format>
