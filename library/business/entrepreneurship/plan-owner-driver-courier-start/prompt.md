---
schema: 1
id: plan-owner-driver-courier-start
kind: prompt
title: Plan an owner-driver courier start
description: Plans starting as an owner-driver courier or delivery driver - van choice, true cost per mile, insurance to check, platform and contract work versus own customers, and the weekly takings needed.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [supply-chain]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [courier, owner-driver, cost-per-mile, van-finance, gig-work, self-employment]
pairs_with:
  prompts: [track-business-expenses, plan-estimated-tax-payments, find-first-customers]
args:
  - name: work_type
    description: Where the work will come from - delivery platforms or apps, contracts with a courier firm or depot, your own customers, or a mix.
    type: enum
    enum: [platform, contracts, own-customers, mix]
    required: true
  - name: vehicle
    description: The vehicle you have or plan to get - type and size, age and mileage, bought, financed or leased, and the payment.
    type: text
  - name: area
    description: Where you will work (city or region and country), and hours you can drive per week.
    type: string
  - name: target_income
    description: What you need to take home per week or month after costs.
    type: string
    default: not given
output_contract:
  format: markdown
  sections: [The work model, Vehicle choice, Cost per mile, Weekly takings needed, Insurance and paperwork to check, Getting work, Weekly tracking, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone start as a self-employed owner-driver: delivering parcels, food, groceries, pallets or same-day jobs in their own van, car or bike. The usual mistakes are judging pay per drop or per hour without the real cost per mile (fuel, tyres, servicing, depreciation or finance, insurance), counting only paid miles when empty miles back to base are often a third or more, and starting on cheap private car insurance that does not cover hire-and-reward or courier use. Platform work is quick to start but rates and volume can change without notice; depot contracts give steadier routes with rules and deductions; own customers pay best but take time to build.

Work type: {{work_type}}
{{#area}}Area and hours: {{area}}{{/area}}
Target take-home: {{target_income}}
</context>

<task>
{{#vehicle}}
<vehicle>
{{vehicle}}
</vehicle>
{{/vehicle}}

1. The work model: for the chosen work type, explain how pay is usually set (per drop, per hour, per route, per mile, per job), typical deductions or fees to ask about (van hire, uniform, scanners, damage charges, platform fees), how steady the volume is, and the employment-status questions to ask if a contract controls hours and routes.
2. Vehicle choice: what size and type suits the work (small van for parcels, medium van for multi-drop, car or e-bike for food), buy versus finance versus hire from the depot, fuel or electric against daily mileage and charging access, and the checks before buying used (service history, load space, payload).
3. Cost per mile: a table of fixed costs per year (finance or depreciation, insurance, tax, phone, breakdown cover) and running costs per mile (fuel or electricity, tyres, servicing and repairs), converted to a cost per mile at their likely annual mileage. Show the arithmetic with their figures and mark estimates.
4. Weekly takings needed: from cost per mile, likely weekly miles including empty miles, a tax set-aside to confirm, unpaid holiday and breakdown days, and the target take-home, calculate the weekly takings needed and the minimum acceptable rate per drop, per hour or per mile. Say which offers to turn down.
5. Insurance and paperwork to check: hire-and-reward or courier insurance, goods-in-transit, public liability, any licence category for the vehicle weight, operator licensing for heavier vehicles, self-employed registration, records of mileage and receipts.
6. Getting work: for each work type, where to start; for own customers, targets such as local shops, pharmacies, print shops, florists and trades merchants with regular same-day needs, and a simple rate card.
7. Weekly tracking: a short log to tell after four weeks whether the work pays.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent platform rates, depot pay, fuel prices, insurance quotes or legal thresholds. Use the user's figures; mark estimates and say how to get real numbers (quotes, asking other drivers, the contract).
- Rules on licences, vehicle weights, insurance and employment status differ by country; frame them as checks and ask for the country if it is missing.
- Never suggest driving on insurance that excludes courier use, or skipping rest breaks to hit a target.
- Show all arithmetic so the numbers can be checked.
- Use miles or kilometres to match the user's figures and country (keep the section heading; write "per km" in the table if kilometres).
- If the target take-home is not given, calculate the weekly takings needed just to cover costs, show the target line as [X], and ask for it. If vehicle or area is missing, use [X] and ask; do not assume a vehicle.
</constraints>

<output_format>
## The work model
Short paragraph, then a list of questions to ask before signing up.

## Vehicle choice
Table: Option | Upfront | Monthly | Pros | Cons.

## Cost per mile
Table: Cost | Per year | Per mile. Total cost per mile.

## Weekly takings needed
Arithmetic in steps, then the minimum rate to accept.

## Insurance and paperwork to check
Checklist.

## Getting work
Bullets by source.

## Weekly tracking
Table: Day | Hours | Paid miles | Empty miles | Takings | Costs | Net.

## Questions
Short bullets.
</output_format>
