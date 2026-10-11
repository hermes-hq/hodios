---
schema: 1
id: calculate-vehicle-business-use
kind: prompt
title: Calculate vehicle business use
description: Compares the mileage-rate and actual-cost methods for business use of a car or van, explains rules on switching and commuting, and sets up a mileage log that stands up to checks.
category: taxes
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder]
requires: [none]
inputs: [text]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mileage-log, vehicle-expenses, business-expenses, deductions]
pairs_with:
  prompts: [track-business-expenses, plan-freelance-tax-set-aside, plan-car-purchase]
  personas: [tax-educator]
args:
  - name: vehicle
    description: Vehicle type, owned or leased, purchase price and date, total and business distance for the year, typical business trips, and yearly costs (fuel or charging, insurance, servicing, repairs, tax or registration, finance interest or lease payments, parking and tolls).
    type: text
    required: true
  - name: country
    description: Country where you are tax resident.
    type: string
    required: true
  - name: first_year
    description: "Optional: whether this is the first year the vehicle is used for business and which method, if any, you used before."
    type: string
output_contract:
  format: markdown
  sections: [Business-use percentage, Mileage-rate method, Actual-cost method, Comparison, Rules on switching, Mileage log template, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a self-employed person or small business owner work out what they may claim for business use of a vehicle. Many countries let them choose between a mileage or per-distance rate, which covers running costs and depreciation, and actual costs multiplied by the business-use share, often with separate rules for the vehicle's purchase cost (depreciation or capital allowances, sometimes with caps or emission-based rates). Parking and tolls for business trips are often claimable on top of either method. The traps: ordinary commuting from home to a regular workplace is usually not business travel; choosing a method in the first year can restrict switching later; records made after the fact are weak, and a contemporaneous log of date, purpose, start and end point and distance, with odometer readings at the start and end of the year, is what most authorities expect. Employees using their own car may have different rules and reimbursements.

Country: {{country}}
{{#first_year}}History: {{first_year}}{{/first_year}}
</context>

<task>
Vehicle and use:

<vehicle>
{{vehicle}}
</vehicle>

1. Work out the business-use percentage: business distance / total distance. Check the trips described against the commuting rule and say which trips may not count.
2. Mileage-rate method: if {{country}} has a rate you are confident of, calculate business distance x rate (including any tiering by distance), with the rate labelled with tax year and "verify". Add parking and tolls if they are claimed separately. If unsure, show the formula with a placeholder rate.
3. Actual-cost method: total yearly running costs x business share, plus the depreciation or capital allowance treatment of the purchase cost (with any cap or emission rule marked "verify"), and lease or finance treatment.
4. Compare the two in money and record-keeping burden.
5. Rules on switching between methods and on selling the vehicle later (balancing charges or gains), marked "verify".
6. Give a mileage log template and a short routine to keep it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent rates, caps or allowances. Mark country-specific figures with the tax year and "verify", or use placeholders.
- Do not tell the person which method to file; show both.
- Do not help reconstruct or inflate a mileage log after the fact. If records are missing, explain how to rebuild a reasonable estimate from calendars, invoices and receipts, labelled as an estimate, and suggest an adviser.
- Note that employees using their own vehicle may have different rules.
{{> output/uncertainty}}
</constraints>

<output_format>
## Business-use percentage
Arithmetic and notes on trips that may not count.

## Mileage-rate method
Calculation.

## Actual-cost method
Table: cost | yearly amount | business share | claimable. Then the purchase-cost treatment.

## Comparison
Short table: method | amount | records needed.

## Rules on switching
Bullets marked "verify".

## Mileage log template
Table header: date | from | to | purpose | odometer start | odometer end | distance. Plus a three-line routine.

## Points to verify
Bullets with where to check each.
</output_format>
