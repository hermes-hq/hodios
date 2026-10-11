---
schema: 1
id: write-commercial-property-listing
kind: prompt
title: Write a commercial property listing
description: Writes the marketing particulars for a commercial unit to let or sell - office, retail, industrial - with measured space, use class, lease terms, costs on top of rent and a short portal version.
category: real-estate
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, marketer, copywriter]
subject: [real-estate]
inputs: [notes, document]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [commercial-property, property-particulars, office-space, retail-unit, industrial-unit, lettings]
pairs_with:
  prompts: [write-real-estate-listing, abstract-property-lease, analyze-property-comparables]
  personas: [real-estate-agent]
args:
  - name: property
    description: The facts - type, address area, floor areas and how they were measured, floors, specification (power, ceiling height, loading, parking, fit-out), permitted use, condition, energy rating, and nearby transport or occupiers.
    type: text
    required: true
  - name: terms
    description: To let or for sale; rent or price; lease length, breaks, rent reviews, repairing terms; service charge, property taxes and other occupier costs; incentives; tax treatment notes; availability date.
    type: text
    required: true
  - name: target_occupier
    description: Who the unit suits (for example a trade counter, a 20-person office, a food operator). Leave empty to have it inferred from the facts.
    type: string
output_contract:
  format: markdown
  sections: [Headline, Summary, Location, Description and specification, Accommodation, Terms, Costs of occupation, Portal version, Facts to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write commercial property particulars for agents. Commercial occupiers read particulars differently from home buyers: they scan for size, permitted use, the total cost of occupation and lease flexibility, and they rule a unit out on one missing fact (eaves height for a warehouse, extraction for a restaurant, power supply, parking). The headline rent is only part of the cost: service charge, property taxes, insurance and repairing obligations can add a large share on top. Measurement standards, use classes, energy rating rules and whether tax is charged on rent differ by country, and misdescribing a property can create legal liability for the agent.
</context>

<task>
Write the particulars.

<property>
{{property}}
</property>

<terms>
{{terms}}
</terms>

{{#target_occupier}}Target occupier: {{target_occupier}}{{/target_occupier}}

1. Headline: type, size and the single strongest selling point, under 12 words.
2. Summary: four or five bullets an occupier can scan in ten seconds: size, use, rent or price, availability, standout feature.
3. Location: access, transport and nearby occupiers, using only what is given.
4. Description and specification: the facts the target occupier will check first, grouped (structure, services, access, fit-out, condition).
5. Accommodation: a table of areas by floor or part, with the measurement basis stated, in the units given, and a conversion if the input asks.
6. Terms: tenure, lease length, breaks, reviews, repairing terms or sale terms, incentives, availability.
7. Costs of occupation: rent, service charge, property taxes, insurance and any other stated costs, with a total of the stated components labelled with what it excludes, and the missing components listed.
8. Portal version: under 120 words.
9. Facts to verify: every claim that needs checking against documents before publishing (areas, use, energy rating, tax on rent, rates figures).
</task>

<constraints>
- Use only facts given. Never invent areas, specification, rates, energy ratings, permitted use or nearby occupiers. Use `[confirm: ...]` for gaps.
- Do not state that a use is permitted unless the input says so; suggest the occupier confirm planning or zoning.
- State the measurement basis for every area; do not mix bases.
- No puffery that could mislead (for example "prime" or "best in town" without basis).
- Rules on property descriptions, energy ratings and tax differ by country; flag them in Facts to verify.
</constraints>

<output_format>
## Headline
## Summary
## Location
## Description and specification
## Accommodation
Table: Floor or part | Area | Basis.
## Terms
## Costs of occupation
Table: Cost | Annual amount | Source.
## Portal version
## Facts to verify
Checklist.
</output_format>
