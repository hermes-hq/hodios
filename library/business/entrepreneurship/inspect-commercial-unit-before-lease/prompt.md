---
schema: 1
id: inspect-commercial-unit-before-lease
kind: prompt
title: Inspect a commercial unit before leasing
description: Gives a viewing checklist for a shop, cafe, salon or workshop unit - permitted use, services, access, condition, costs on top of rent and lease points for a solicitor - and scores units.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder]
subject: [real-estate, retail]
requires: [none]
inputs: [text, notes]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [property-viewing, commercial-premises, planning-use, fit-out, total-occupancy-cost, site-scoring]
pairs_with:
  prompts: [review-commercial-lease, plan-shop-opening, plan-restaurant-opening, plan-second-location]
args:
  - name: business_type
    description: What you will run in the unit (for example "takeaway with hot food", "nail salon, 4 stations", "furniture restoration workshop").
    type: string
    required: true
  - name: needs
    description: Your must-haves - floor area, frontage, footfall, water and drainage, power, extraction, storage, parking or loading, opening hours, budget for rent.
    type: text
  - name: units
    description: Units you have seen or will view, with what you know (address area, size, asking rent, service charge, condition, lease length offered). Leave empty for a blank checklist.
    type: text
output_contract:
  format: markdown
  sections: [Deal-breakers for this business, Viewing checklist, Costs on top of rent, Questions for the agent or landlord, Lease points for a solicitor, Unit comparison]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone opening a shop, cafe, salon or workshop judge commercial units at the viewing stage, before heads of terms are agreed. People fall for the frontage and miss what costs money later: the unit is not approved for their use (hot food, beauty treatments, light industrial) and a change of use takes months or is refused; there is no route for a kitchen extraction flue; the electrical supply is too small; there is no water or drainage where the basins must go; the toilets are not accessible; the condition will be their cost to repair under the lease. And the real monthly cost is often well above the asking rent once service charge, local property taxes, insurance and utilities are added.

Business: {{business_type}}
</context>

<task>
{{#needs}}
<needs>
{{needs}}
</needs>
{{/needs}}
{{#units}}

<units>
{{units}}
</units>
{{/units}}

1. Deal-breakers for this business: the five to eight checks that, for this type of business, can rule a unit out (for example permitted use, extraction route, three-phase power, floor loading, drainage falls, delivery access, licensing for alcohol or late hours, neighbours sensitive to noise or smells).
2. Viewing checklist, grouped: location and footfall (count passers-by at the hours you would trade), permitted use and planning history, services (electric capacity, gas, water, drainage, internet), extraction and ventilation, access and accessibility (step-free entrance, toilet), condition (roof, damp, windows, shutters, floor, ceiling, fire exits, alarms, asbestos survey), layout against your plan, signage possibilities, security.
3. Costs on top of rent: service charge, local property taxes or business rates (and any small-business relief to check), building insurance recharged, utilities, waste collection, fit-out for this business, legal fees, deposit or guarantee, and dilapidations risk at the end. Turn them into a monthly total cost of occupancy.
4. Questions for the agent or landlord: why the unit is vacant and for how long, previous use, incentives (rent-free months, landlord works, capped service charge), flexibility on term and break clauses, who pays for which works.
5. Lease points for a solicitor: length and breaks, rent reviews, repairing obligations and a schedule of condition, use clause, assignment and subletting, personal guarantees, alterations and reinstatement, whether security of tenure applies. These are for a property solicitor to review, not to decide yourself.
6. Unit comparison: if units are given, score each 1 to 5 on the deal-breakers and key factors with a weighted total, and fill in what is known; otherwise give the blank scoring table.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state whether a unit has a particular permitted use, rates amount or legal status; say how to check (the planning portal or local authority, the agent, a surveyor, a solicitor).
- Planning, licensing, property taxes and lease law differ by country; name the assumption and ask for the country if it matters.
- Use only the figures given; mark estimates and gaps as [X].
- Recommend a building surveyor for older or poorly maintained units and a property solicitor before signing anything, including heads of terms.
</constraints>

<output_format>
## Deal-breakers for this business
Numbered list, each with how to check it.

## Viewing checklist
Checklist grouped under the headings in step 2.

## Costs on top of rent
Table: Cost | Monthly | Source (given, estimate, to ask). Total monthly occupancy cost.

## Questions for the agent or landlord
Bullets.

## Lease points for a solicitor
Bullets.

## Unit comparison
Table: Factor | Weight | Unit A | Unit B | ... with weighted totals and one line on the front-runner and what must be confirmed.
</output_format>
