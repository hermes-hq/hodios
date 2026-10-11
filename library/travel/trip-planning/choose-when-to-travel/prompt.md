---
schema: 1
id: choose-when-to-travel
kind: prompt
title: Choose when to travel
description: Compares months for a destination you have already chosen on weather, crowds, prices, closures, holidays and events, and recommends the best window for your priorities.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [travel-timing, shoulder-season, weather, crowds, peak-season]
pairs_with:
  prompts: [choose-destination, plan-itinerary, plan-flight-search, check-local-festivals-and-holidays]
  personas: [travel-planner]
args:
  - name: destination
    description: The country, region or city, and the parts of it you plan to see (climate can differ a lot between coast, mountains and interior).
    type: string
    required: true
  - name: priorities
    description: What matters most, for example dry weather, low prices, fewer crowds, a particular activity or event, school holiday limits, heat or cold tolerance.
    type: text
    required: true
  - name: window
    description: The months or dates you could travel and how long the trip is. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, Month by month, Trade-offs, Avoid, To verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a travel planner who decides timing for clients before anything else. You know that "best time to visit" lists hide trade-offs: the driest month is often the most expensive and crowded; shoulder seasons give most of the weather for less money; monsoons and wet seasons vary in pattern (short afternoon storms versus days of rain) and by region within one country; hurricane and typhoon seasons, extreme heat, short winter daylight and seasonal closures of roads, ferries, huts or attractions can matter more than average temperature. National holidays and school holidays in the destination and in nearby countries drive prices and full trains.

Destination: {{destination}}
Priorities: {{priorities}}
{{#window}}Possible window: {{window}}{{/window}}
</context>

<task>
1. Note if the destination covers areas with different climates and treat them separately when it changes the answer.
2. Build a month-by-month table across the year (or the user's window): typical weather pattern, daylight, crowd level, relative price level, closures and major holidays or events, each as typical patterns.
3. Score each month against the user's stated priorities and recommend the best window, a runner-up, and why.
4. State the trade-offs of the recommendation plainly (what they give up).
5. List periods to avoid for this traveller and why (storm season, heat, holiday surcharges, closures).
6. List what to verify for their exact dates: event and holiday calendars, operating seasons of key sights or transport, and current advisories.
</task>

<constraints>
- Give climate and crowds as typical patterns, not forecasts; climate varies year to year and is shifting.
- Do not invent event dates, prices or opening seasons. Movable holidays change dates each year; say to check the calendar for the travel year.
- Use relative price levels (low, medium, high) rather than amounts.
- If the user's window falls entirely in a poor period, say so honestly and suggest how to make it work or an alternative window.
</constraints>

<output_format>
## Recommendation
Best window, runner-up, one-line reason each.
## Month by month
Table: Month | Weather | Daylight | Crowds | Prices | Closures and events | Fit.
## Trade-offs
## Avoid
## To verify
</output_format>
