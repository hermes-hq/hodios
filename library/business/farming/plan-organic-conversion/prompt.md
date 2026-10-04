---
schema: 1
id: plan-organic-conversion
kind: prompt
title: Plan an organic conversion
description: Plans converting a farm or part of it to organic, covering rules to verify with a certifier, changes to rotation, feed, medicines and records, a market check, a timeline and honest trade-offs.
category: farming
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, individual]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [organic-conversion, organic-certification, fertility-building, conversion-period, farm-transition]
pairs_with:
  prompts: [plan-arable-crop-rotation, plan-livestock-record-keeping, prepare-farm-assurance-audit]
  personas: [farm-business-advisor]
args:
  - name: farm_description
    description: The farm - area, soils, enterprises and stocking, current rotation, inputs used (fertiliser, sprays, bought-in feed, routine medicines), labour, and why you are considering organic.
    type: text
    required: true
  - name: country
    description: Country and region, so the organic regulation and certifiers to check can be named.
    type: string
    required: true
  - name: market
    description: Optional. Who you would sell to and what you know about organic demand and premiums for your products locally.
    type: text
  - name: scope
    description: Whether to convert the whole farm or start with part of it.
    type: enum
    enum: [whole-farm, part-farm, undecided]
    default: undecided
output_contract:
  format: markdown
  sections: [Fit check, Rules to verify with a certifier, Farm changes, Market check, Money during conversion, Timeline, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer think through converting to organic before committing. Conversions that go badly usually share three problems: the farmer is caught by the conversion period, when yields drop and costs change but produce cannot yet be sold as organic; the farm has no reliable buyer or premium for organic output in its products and volumes; and fertility, weed and parasite control are not redesigned, so the system struggles once inputs are removed. Rules also differ by country and certifier: conversion periods for land, crops and each livestock species, parallel production of the same crop, permitted inputs, feed sourcing, medicine use and withdrawal periods, and record keeping. A good plan sets out what to verify with a certifier, how the farm system must change, whether the market is there, how money flows during conversion, and a timeline.

Country: {{country}}
Scope: {{scope}}
</context>

<task>
<farm_description>
{{farm_description}}
</farm_description>

{{#market}}
<market>
{{market}}
</market>
{{/market}}

1. Fit check: what in this farm makes conversion easier (grass-based, low inputs, mixed enterprises) or harder (continuous arable, heavy reliance on bought feed or routine medicines, difficult weeds, intensive housing), and the farmer's reasons.
2. List the rules to verify with a certifier for this farm, as questions: conversion periods for land and each crop or species; whether part-farm conversion and parallel production are allowed; feed rules; permitted fertilisers and crop protection; livestock housing, outdoor access and stocking density; medicine use and withdrawal periods; buying in stock; records and inspection. Do not state the answers as fact.
3. Farm changes: rotation with fertility-building leys or legumes; nutrient planning from manure and clover; weed control by rotation, cultivation and timing; livestock health plan with the vet focused on prevention (parasites, mastitis, lameness); feed self-sufficiency; buffer zones if converting part of the farm; records.
4. Market check: who buys this product as organic, at what volumes, with what specifications, whether premiums are stable, and whether conversion-period produce gets any premium. If no market information was given, list exactly what to find out and from whom.
5. Money during conversion: lay out the cash-flow shape (likely yield change, input savings, certification fees, any support payments to check) as a framework using the farmer's figures; where figures are missing, show the table with blanks rather than invented numbers.
6. Timeline: decision and certifier choice, registration, conversion start, land and livestock conversion milestones, first organic sales, with dates left as `[CHECK with certifier]` where rules set them.
7. Trade-offs: say honestly what the farmer gives up and gains, and a "do not convert if" list.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state conversion periods, permitted inputs, premiums or support payment rates as current fact; they vary by country, certifier and year. Frame them as items to verify.
- Do not recommend a specific certifier; say how to compare them (fees, inspection approach, market recognition).
- Animal health changes go through the farm's vet; financing and support scheme decisions through an adviser or accountant.
- If the farm description or country is missing, ask and stop.
</constraints>

<output_format>
## Fit check
Two short lists, easier and harder, then one line on the farmer's reasons.

## Rules to verify with a certifier
Numbered questions to take to two or three certifiers.

## Farm changes
Table: area (rotation, fertility, weeds, livestock health, feed, records) | change | when | risk.

## Market check
Bullets: what is known, what to find out, who to ask.

## Money during conversion
Table by year: yield change | input savings | extra costs | price received | net effect, using given figures or blanks.

## Timeline
Dated or year-by-year bullets.

## Questions
Including a "do not convert if" list.
</output_format>
