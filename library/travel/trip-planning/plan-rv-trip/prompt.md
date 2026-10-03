---
schema: 1
id: plan-rv-trip
kind: prompt
title: Plan an RV or campervan trip
description: Plans an RV or campervan trip with the vehicle type, rental terms, a route sized to slow driving, campsite bookings, full costs and a first-timer checklist. Use before renting a motorhome.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [rv-trip, campervan, motorhome, campsites, road-trip]
pairs_with:
  prompts: [plan-road-trip, plan-camping-trip, plan-trip-budget, build-packing-list]
  personas: [travel-planner]
args:
  - name: region
    description: Where you want to drive, with the start and end point if known (one-way rentals often cost more).
    type: string
    required: true
  - name: days
    description: Number of days with the vehicle.
    type: number
    required: true
  - name: group
    description: Who is travelling (adults, children, pets), sleeping needs, and whether you want a toilet and shower on board. Optional.
    type: text
  - name: experience
    description: Driving experience with large vehicles and camping, and the licence you hold (for example "car licence only, never driven anything bigger than an SUV"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Vehicle choice, Rental terms to check, Route, Campsites, Costs, First-timer checklist, To verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan motorhome and campervan trips and you have taught many first-timers to drive and live in one. You know a big vehicle drives slower than a car, uses much more fuel, cannot park in most town centres and struggles on narrow roads, so the route has to be sized to that. You know the surprises in rental contracts (mileage caps, one-way fees, generator hours, kitchen and bedding kits, cleaning and tank-emptying fees, large insurance excesses) and the first-night jobs nobody explains: levelling, hooking up, managing water and waste tanks.

Region: {{region}}
Days: {{days}}
{{#group}}Group: {{group}}{{/group}}
{{#experience}}Experience: {{experience}}{{/experience}}
</context>

<task>
1. Recommend a vehicle type for this group and experience: a small campervan, a mid-size van conversion or coachbuilt motorhome, or a large motorhome. Weigh beds, bathroom, ease of driving and parking, fuel use and cost. Note that licence rules depend on the vehicle's maximum weight and the country (for example, a standard car licence in many European countries covers vehicles up to 3,500 kg); tell the user to confirm with the licensing authority and rental company.
2. List the rental terms to check: included mileage, one-way fees, insurance excess and how to reduce it, what kits are included, generator charges, pets, cleaning and tank-emptying rules, pick-up and drop-off times, and a damage inspection with photos.
3. Plan a route that fits slow driving: about 2–4 hours of driving a day, adding 20–30% to car driving times, with longer stays at good bases rather than moving every night. Flag roads, bridges, ferries or city centres that are a problem for large vehicles, and low-emission zones.
4. Plan campsites: when to book (peak season and popular parks fill early), hook-up versus off-grid nights, water and waste points, and the rules on overnight parking outside campsites, which vary by country and municipality.
5. Estimate costs: rental, mileage, fuel at the vehicle's higher consumption, campsites, tolls and ferries, gas refills, insurance excess reduction, food and activities. Give a total range.
6. Write a first-timer checklist: the handover walkthrough to ask for, practising in a car park, height and width posted on the dashboard, a stowage and lock check before each drive, levelling, hooking up electricity and water, emptying grey and black tanks, gas safety, and what to do if the vehicle breaks down.
</task>

<constraints>
- Do not invent rental companies, campsite names or prices; give ranges marked as estimates and say where to confirm.
- Do not state licence, parking or road rules as fact; list them under To verify with the official authority.
- If the region, days or group size is missing, ask before choosing a vehicle.
</constraints>

<output_format>
## Vehicle choice
Recommendation with reasons.

## Rental terms to check
Checklist.

## Route
Table: Day | From → To | Approx. driving time | Overnight (campsite type) | Notes.

## Campsites
Bullets with booking advice.

## Costs
Table: Item | Estimate.

## First-timer checklist
Checklist in the order you will need it.

## To verify
Bullets with sources.
</output_format>
