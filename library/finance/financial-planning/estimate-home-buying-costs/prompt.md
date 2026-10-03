---
schema: 1
id: estimate-home-buying-costs
kind: prompt
title: Estimate home buying costs
description: Estimates the full upfront and ongoing costs of buying a home - deposit, transfer taxes, fees, surveys, moving and maintenance - as ranges with the rules to verify locally.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
subject: [real-estate]
tags: [home-buying, closing-costs, stamp-duty, first-time-buyer, homeownership-costs]
pairs_with:
  prompts: [prepare-mortgage-application, compare-mortgage-options, compare-rent-vs-buy, analyze-rental-property]
  workflows: [home-buying-track]
args:
  - name: price
    description: The purchase price or price range you are looking at, and your planned deposit if you know it.
    type: string
    required: true
  - name: location
    description: Country and region or city, since transfer taxes, legal processes and typical fees vary even within a country. Also say flat, house or new build if known.
    type: string
    required: true
  - name: first_time_buyer
    description: Whether you are a first-time buyer, which affects some tax reliefs and schemes.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Cash needed on completion, Upfront costs, Ongoing yearly costs, Often forgotten, What to verify locally]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Buyers budget for the deposit and are surprised by everything else: transfer taxes (stamp duty, land transfer tax, Grunderwerbsteuer and their equivalents), legal or notary fees, surveys and inspections, lender and broker fees, title insurance or registration, moving, and the first-year costs of owning (repairs, furniture, insurance, property tax, service or association charges). These vary by country, region, property type and buyer status, and the rules change, so an honest estimate gives ranges, shows how each one is calculated, and says what to confirm with a local solicitor, notary, conveyancer, agent or lender.

Price: {{price}}
Location: {{location}}
First-time buyer: {{first_time_buyer}}
</context>

<task>
1. Cash needed on completion: deposit (the stated one, or a labelled example such as 10% and 20%) plus all upfront costs, as a low-high range.
2. Upfront costs, each with how it is calculated and a low-high range:
   - Transfer or purchase tax: apply the bands or rate you believe apply for this location and buyer status, show the calculation, and flag any first-time buyer relief. If you are not confident of the current rules, say so and show the method with a placeholder rate the person must replace.
   - Legal, conveyancing or notary fees and land or title registration.
   - Survey, inspection, valuation or appraisal.
   - Mortgage-related fees: arrangement or origination, broker, valuation, points if relevant.
   - Title insurance, escrow or closing fees where used (for example in the US).
   - Agent or buyer's commission where buyers pay it.
   - Moving, immediate repairs, basic furniture and appliances, changing locks.
3. Ongoing yearly costs: property tax or council tax, buildings and contents insurance, service charge, ground rent or homeowners association fees, maintenance (rule of thumb 1-2% of value a year, more for older houses), utilities change versus renting, and mortgage payments if the person gives loan details.
4. Often forgotten: a short list specific to the location and property type (for example leasehold charges, special assessments, survey-triggered repairs, mortgage insurance at high loan-to-value, rate-lock or valuation fees on failed purchases).
5. What to verify locally: the exact tax calculation, who pays which fees in this market, typical professional fee quotes, and the questions to ask each professional.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present every amount as a range or an estimate, and label tax figures with "check the current rules". Never present a guess as a quote.
- Show the arithmetic for percentage-based costs on the stated price.
- If the price is a range, calculate at both ends.
- Do not recommend lenders, brokers, solicitors, agents or schemes; you may name the type of professional.
- If location is too vague to apply local rules (country only where rules differ by region), say so and show both the method and the region question.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cash needed on completion
Two lines: low and high totals, with the deposit assumption.

## Upfront costs
Table: cost | how it is calculated | low | high | verify with.

## Ongoing yearly costs
Table: cost | yearly low | yearly high | notes.

## Often forgotten
Bullets.

## What to verify locally
Checklist and questions per professional.
</output_format>
