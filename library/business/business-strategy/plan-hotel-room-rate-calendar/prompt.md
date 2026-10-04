---
schema: 1
id: plan-hotel-room-rate-calendar
kind: prompt
title: Plan a hotel room rate calendar
description: Builds a seasonal rate calendar for a small hotel, inn or B&B from last year's occupancy - demand periods, events, minimum stays, rate fences and a direct-booking advantage.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [hospitality]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [room-rates, revenue-management, occupancy, adr, revpar, direct-bookings, minimum-stay]
pairs_with:
  personas: [hospitality-revenue-manager, hospitality-manager]
  prompts: [design-pricing]
args:
  - name: property
    description: The property - number and types of rooms, location and guest mix (leisure, business, weddings, walkers), current rates by room type and season, channels used (own website, booking sites, phone) and their commission.
    type: text
    required: true
  - name: last_year_occupancy
    description: Last year's occupancy and average rate by month, or better by week and day of week; note any closures, renovations or one-off events that distorted it.
    type: text
    required: true
  - name: local_events
    description: Events, school holidays, festivals, conferences, university dates or weddings nearby that drive demand next year, with dates. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Demand read, Demand periods, Rate calendar, Stay rules and fences, Direct-booking advantage, Review routine, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the owner of a small hotel, inn or B&B set next year's room rates as a calendar instead of one summer price and one winter price. Small properties typically leave money on the table in two places: they sell peak nights (events, Saturdays in season) too cheaply and too early, and they discount quiet nights so far that they lose money and train guests to wait. A good calendar groups dates into a handful of demand periods, sets a base rate per room type for each, adds minimum-stay rules where they protect peak nights, uses fences (non-refundable, advance purchase, length of stay) so discounts reach only price-sensitive guests, and gives guests a reason to book direct. Measures: occupancy, average daily rate (ADR) and revenue per available room (RevPAR = occupancy x ADR).
</context>

<task>
<property>
{{property}}
</property>

<last_year>
{{last_year_occupancy}}
</last_year>

{{#local_events}}
<local_events>
{{local_events}}
</local_events>
{{/local_events}}

1. Demand read: from last year, compute RevPAR by month (and by weekday versus weekend if the data allows). Name the periods that sold out early (rates too low), the periods with low occupancy and low rate, and distortions to ignore.
2. Demand periods: group next year's dates into four or five bands (for example peak, high, shoulder, low, special event). Map events and holidays onto the calendar.
3. Rate calendar: a base rate per room type per band, stepped from the current rates (state the step and why), with weekend uplifts where demand differs. Keep the gap between room types sensible.
4. Stay rules and fences: minimum stays for peak and event nights, closed-to-arrival on key days if useful, and two or three rate plans (flexible, non-refundable at a stated discount, longer stay). Say which channels get which plans.
5. Direct-booking advantage: a perk or small saving for booking direct that respects any rate-parity terms in channel contracts (check them), and the commission saved per booking.
6. Review routine: a weekly pick-up check (bookings on the books against the same point last year) with simple rules to raise or hold rates, and a monthly review of occupancy, ADR and RevPAR.
7. Check the arithmetic before answering.
</task>

<constraints>
- Use only given occupancy and rates. Never invent competitor rates or market occupancy; if useful, say which comparable properties to check and how (public booking pages for the same dates).
- Label any rule of thumb (for example, raise rates when a date is a set share full a set time out) as a starting rule to tune.
- If last year's data is missing or only annual, ask for monthly figures; you may show the method with placeholders.
- No hidden fees or drip pricing; quoted rates include mandatory charges where local rules require it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Demand read
Table: Month | Occupancy | ADR | RevPAR | Note. Then three bullets on what stands out.
## Demand periods
Table: Band | Dates | Why.
## Rate calendar
Table: Band | Room type | Weekday rate | Weekend rate.
## Stay rules and fences
Bullets, then a table: Rate plan | Conditions | Discount | Channels.
## Direct-booking advantage
Two to four bullets with the commission saved.
## Review routine
Weekly and monthly checklist with the trigger rules.
## Assumptions and questions
Bullets.
</output_format>
