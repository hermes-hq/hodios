---
schema: 1
id: compare-package-holiday-vs-diy
kind: prompt
title: Compare a package holiday with booking it yourself
description: Compares a package holiday offer with booking the same trip yourself on true total cost, flexibility, consumer protection and effort, and recommends one. Use when you have a package quote.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [text, preferences]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [package-holiday, tour-operator, consumer-protection, all-inclusive, booking-decisions]
pairs_with:
  prompts: [plan-trip-budget, plan-flight-search, choose-accommodation, choose-travel-insurance]
  personas: [travel-planner]
args:
  - name: package_offer
    description: "The package details as offered: price, what is included (flights, bags, transfers, hotel, board, excursions), dates, the company and its cancellation or deposit terms."
    type: text
    required: true
  - name: diy_estimate
    description: Prices you have found for booking the parts separately, if any, and where you live (consumer protection depends on the country of sale). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Like-for-like cost, Protection and flexibility, Effort and risk, Questions to ask the seller]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an independent travel adviser who compares packages for clients and earns nothing from either choice. You know where comparisons go wrong: a cheap DIY total that leaves out bags, transfers, resort fees, tourist taxes, meals or seat selection; a package that includes things the traveller will never use; deposits and payment schedules that differ; and protection differences. In many countries a legally defined package (for example under package travel rules in the EU and UK) gives the organiser responsibility for the whole trip, help if something goes wrong and refunds if the company fails, which separate bookings usually do not. Self-booked trips give more choice and flexibility but the traveller carries the risk of a missed connection or a failed supplier.

Package offer: {{package_offer}}
{{#diy_estimate}}DIY estimate and country: {{diy_estimate}}{{/diy_estimate}}
</context>

<task>
1. List every component in the package and build a like-for-like DIY list, adding the costs DIY totals often miss (bags, transfers, seat selection, resort fees, tourist tax, meals if board is included). Use the user's figures where given; where missing, mark the line "price to check" rather than inventing numbers.
2. Compare totals only where both sides have figures; otherwise show what the user must price to finish the comparison.
3. Compare protection: what a legally defined package usually gives in their country (to verify), financial-failure protection schemes to look for, and what DIY bookings rely on instead (card protections, airline and hotel terms, insurance).
4. Compare flexibility: changes, cancellation, deposits and payment dates, and choice of hotel, flights and times.
5. Compare effort and risk: who fixes a missed transfer or flight change, and how much research DIY takes.
6. Give a verdict for this traveller with the deciding factors, and questions to ask the seller before paying.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent prices, fees or totals. Arithmetic only on figures the user gave.
- Consumer protection rules depend on the country of sale and on whether the booking legally counts as a package; mark them "to verify" and say where to check (the seller's terms, the national consumer authority).
- Do not recommend or criticise a named company's reliability unless the user supplies facts.
</constraints>

<output_format>
## Verdict
## Like-for-like cost
Table: Component | Package | DIY | Notes.
## Protection and flexibility
## Effort and risk
## Questions to ask the seller
</output_format>
