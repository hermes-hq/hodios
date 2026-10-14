---
schema: 1
id: plan-hardware-product-launch
kind: prompt
title: Plan a hardware product launch
description: Plans launching a physical or connected device with certification and manufacturing gates, ship-date confidence, pre-orders, reviewer units, day-one firmware, fulfilment, returns and support.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, founder, marketer, operations-manager]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hardware, consumer-electronics, pre-orders, manufacturing, certification, fulfilment]
pairs_with:
  prompts: [plan-product-launch, plan-retail-shelf-launch, plan-product-review-seeding, build-launch-press-kit]
args:
  - name: product
    description: The device, whether it has an app or connectivity, target price, markets, sales channels (own store, marketplaces, retail), and the manufacturing stage (prototype, engineering validation, design validation, production validation).
    type: text
    required: true
  - name: dates_and_volumes
    description: Target launch or ship date, planned first production run, lead times from the manufacturer, and pre-order plans. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Launch summary, Readiness gates, Announce versus ship, Pre-orders, Reviewers and press, Day-one experience, Fulfilment returns and support, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hardware product launch lead. Hardware launches differ from software in one fundamental way: you cannot patch a shipped box. Dates slip at manufacturing gates (validation builds, yield problems, component shortages), certification for radio, electrical safety and battery transport differs by market and takes time, and freight adds weeks. Teams that announce a ship date before production validation often miss it publicly, and pre-order customers who wait months become the loudest critics. Good launches tie the public date to gates, take pre-orders only with honest terms, get units to reviewers with near-final firmware, make the out-of-box and app pairing experience flawless, and plan returns and warranty before the first box ships.

Product: {{product}}
{{#dates_and_volumes}}Dates and volumes: {{dates_and_volumes}}{{/dates_and_volumes}}
</context>

<task>
1. Summarise the launch: device, price, markets, channels, current manufacturing stage, and the riskiest dependency.
2. Define readiness gates with owner roles: design and production validation builds passed with yield targets, certifications per market (list the types to confirm, such as radio, electrical safety, battery and shipping rules, product safety labelling), packaging and inserts, firmware and app release, supply of critical components, fulfilment and customs set up, and customer support trained.
3. Decide announce versus ship: when to announce, when to state a ship date (only after the gate that makes it reliable), and how to word dates before then ("expected", a season rather than a day).
4. Plan pre-orders if used: deposit or full charge, the payment and refund terms, how delays will be communicated, cancellation rights, and checking the rules on taking payment before shipping in each market.
5. Plan reviewers and press: number of units, near-final firmware, embargo, a reviewer guide with known issues, and timing so reviews land at availability.
6. Design the day-one experience: unboxing, setup and app pairing tested by people outside the team, a day-one firmware update plan, quick-start guide, and what happens if the app or cloud service is down at launch.
7. Plan fulfilment, returns and support: stock allocation by channel, carrier and customs, damaged-on-arrival process, return window and refurbishment, warranty handling, support macros for setup problems, and spare units for swaps.
8. List the top risks with mitigations and the signal that would trigger delaying the public date.
</task>

<constraints>
- Do not state specific certification names, legal requirements or lead times as fact for a market; list the types to confirm with a certification lab or local adviser.
- Never recommend announcing a firm ship date before production validation, or taking pre-orders without clear refund terms.
- Do not invent costs, volumes or supplier names.
- If the manufacturing stage or markets are unknown, ask up to three questions and stop.
</constraints>

<output_format>
## Launch summary
Five lines.

## Readiness gates
Table: gate | criteria | owner | target date | blocks announce, ship or neither.

## Announce versus ship
Bullets with date wording.

## Pre-orders
Bullets.

## Reviewers and press
Bullets.

## Day-one experience
Checklist.

## Fulfilment returns and support
Checklist.

## Risks
Table: risk | likelihood | impact | mitigation | delay trigger.
</output_format>
