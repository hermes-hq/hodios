---
schema: 1
id: write-company-vehicle-policy
kind: prompt
title: Write a company vehicle policy
description: Writes a company vehicle and van policy - who may drive, licence checks, daily vehicle checks, fuel cards, private use, defects, accidents, fines, phones and records.
category: operations
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [notes, text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [fleet-management, company-vehicles, driver-policy, vehicle-checks, driving-for-work]
pairs_with:
  prompts: [write-health-and-safety-policy, plan-equipment-maintenance, write-sop]
args:
  - name: fleet
    description: The vehicles (cars, vans, trucks, pool or allocated), how many, who drives them and for what, whether private or commuting use is allowed, fuel cards, telematics, and any recent accidents, fines or damage.
    type: text
    required: true
  - name: jurisdiction
    description: Country or state where the vehicles are used, because licence categories, driving hours, insurance, tax on private use and phone laws differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Purpose and scope, Who may drive, Vehicle checks and maintenance, Use of vehicles, Fuel and costs, Accidents defects and fines, Driver conduct, Records, Driver acknowledgement, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A vehicle policy protects people first and the business second. Employers whose staff drive for work typically carry legal duties for safe vehicles and safe driving, and they are often liable for what happens in their vehicles. The parts that matter in practice: checking every driver's licence before they drive and periodically after (including categories for heavier vans or trailers), a short daily walk-round check with a way to report defects and take a vehicle off the road, servicing and inspection on schedule, clear rules on private use and passengers (which affect insurance and, in many countries, tax), fuel card controls, what to do at an accident, who pays fines, and conduct rules on phones, alcohol, drugs, fatigue and speeding. Telematics and dashcams raise privacy obligations toward employees. Policies fail when they are copied from a big fleet, ignore vans and towing, or set rules nobody checks.
</context>

<task>
Fleet:
<fleet>
{{fleet}}
</fleet>

Jurisdiction: {{jurisdiction}}

1. Write the purpose and scope: which vehicles and which people (employees, contractors, staff using own cars for work, sometimes called grey fleet, if mentioned).
2. Who may drive: eligibility, licence checks before first drive and at a set frequency `[CONFIRM]`, categories needed for the vehicles described, reporting of penalty points or bans, and insurance approval.
3. Vehicle checks and maintenance: a daily or pre-use walk-round checklist suited to the vehicle types, defect reporting and the rule that unsafe vehicles are not driven, service and inspection schedule ownership, load and towing limits as `[CONFIRM]`.
4. Use of vehicles: business use, commuting, private use, passengers, pets, smoking, overseas trips, keys and parking at home, as allowed by the business.
5. Fuel and costs: fuel card rules, receipts, mileage records, tolls and parking, what personal costs are recovered.
6. Accidents, defects and fines: what to do at the scene, reporting to the employer within a set time, a short accident report, cooperation with insurers, and who pays fines and penalty charges.
7. Driver conduct: phones and hands-free, alcohol and drugs, fatigue and breaks, speed, seat belts, and consequences of breaches.
8. Records: licence checks, inspections, defects, accidents, fuel and mileage, and any telematics data with notice to drivers.
9. Driver acknowledgement form and a list of points to confirm for the jurisdiction.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state legal limits (alcohol, driving hours, phone rules, licence categories, weight limits, tax on private use) as fact for the jurisdiction unless supplied; mark them "confirm for [jurisdiction]".
- Do not include rules for vehicle types the business does not have.
- If the fleet description shows an immediate danger (drivers without valid licences, known unsafe vehicles still in use), say to stop that first.
- Fines and deductions from pay are governed by employment law and contracts; flag them to confirm rather than writing a deduction rule as settled.
</constraints>

<output_format>
# Company vehicle policy
## Purpose and scope
## Who may drive
## Vehicle checks and maintenance
Include the walk-round checklist.
## Use of vehicles
## Fuel and costs
## Accidents defects and fines
## Driver conduct
## Records
## Driver acknowledgement
## Points to confirm
</output_format>
