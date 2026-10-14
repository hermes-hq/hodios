---
schema: 1
id: forecast-bookings-from-pickup
kind: prompt
title: Forecast bookings from pickup pace
description: Forecasts final bookings for future dates (hotel nights, flights, classes, tours, events) from bookings already on the books and how bookings usually build up, with cancellations and a range.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, data-analyst, founder, business-analyst]
subject: [hospitality]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pickup, booking-curve, on-the-books, revenue-management, occupancy]
pairs_with:
  prompts: [plan-hotel-room-rate-calendar, project-month-end-from-partial-data, present-forecast-uncertainty]
args:
  - name: on_the_books
    description: "Bookings currently held for each future date (or week), the capacity for each date, and today's date."
    type: text
    required: true
  - name: booking_history
    description: "For past dates of the same kind: bookings on the books at several days before arrival (for example 90, 60, 30, 14, 7 days) and the final figure actually used, plus cancellation and no-show rates."
    type: text
    required: true
  - name: context
    description: Events, price changes, new channels or anything that makes this year different. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Method, Forecast by date, Dates to act on, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Revenue managers in hotels, airlines, tour operators and venues forecast from the booking curve, not from last year's total alone. For each future date, the bookings already held are known; what is uncertain is the pickup still to come. Two standard approaches: additive pickup (final equals on-the-books plus the average number of bookings that historically arrive between this many days out and the date) and multiplicative pickup (final equals on-the-books divided by the typical share of final bookings held at this lead time). Additive is steadier when bookings are low; multiplicative tracks pace changes but can explode when early bookings are unusual. Both must account for cancellations and no-shows, which differ by rate type, and both are capped by capacity, so a sold-out date's true demand is unknown (denied demand). Comparing pace with the same lead time last year ("we are 12% ahead of last year at 30 days out") is the most useful early signal, provided like dates are compared (same weekday, same event, not just the same calendar date).
</context>

<task>
<on_the_books>
{{on_the_books}}
</on_the_books>

<booking_history>
{{booking_history}}
</booking_history>
{{#context}}

<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Align comparison dates: match each future date to past dates by weekday, season and events, not calendar date alone.
2. For each future date, compute days to arrival and look up the historical pickup from that lead time: average additional bookings (additive) and share of final held (multiplicative). Show both.
3. Net off expected cancellations and no-shows using the supplied rates, and cap at capacity; flag dates likely to sell out.
4. Choose a central forecast per date (or a blend) and give a range from the spread of historical pickup.
5. Compare pace with like dates last year at the same lead time.
6. Identify dates to act on: likely sell-outs (room to raise price or tighten restrictions) and dates well behind pace (promotion or staffing changes), with the lead time left to act.
</task>

<constraints>
- Compute only from figures supplied and show arithmetic for at least one date in full.
- Never let a forecast exceed capacity; report it as sell-out with unconstrained demand unknown.
- Do not invent last year's pace or cancellation rates; if missing, state the assumption and how it changes the result.
- Pricing actions are suggestions for the revenue owner; do not set prices.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Overall pace versus last year, dates likely to sell out, dates behind.

## Method
Additive and multiplicative pickup, cancellations, capacity cap.

## Forecast by date
Table: Date | Days out | On the books | Additive | Multiplicative | Chosen (net of cancellations) | Range | Capacity | Pace vs last year.

## Dates to act on
Bullets: date, signal, possible action, time left.

## Caveats
Bullets.
</output_format>
