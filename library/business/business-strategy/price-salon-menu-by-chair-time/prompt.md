---
schema: 1
id: price-salon-menu-by-chair-time
kind: prompt
title: Price a salon menu by chair time
description: Prices a salon or barber menu from cost per chair hour, product cost and stylist level, flags services that lose money and suggests a simpler menu with add-ons.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, individual]
requires: [none]
inputs: [text, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [salon, barber, chair-hour, service-menu, stylist-levels, add-ons]
pairs_with:
  prompts: [plan-owner-led-price-rise, set-up-appointment-booking-system, test-capacity-before-growth]
args:
  - name: services
    description: Your menu - each service with price, booked time (including processing and clean-down) and how many you do a month if known.
    type: text
    required: true
  - name: costs
    description: Monthly costs - rent, utilities, wages or commission, product and colour per service, booking software, card fees, insurance - plus number of chairs, opening hours and roughly how full the book is.
    type: text
    required: true
  - name: stylist_levels
    description: Levels or tiers of stylists and how pay or commission differs (junior, senior, director). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Cost per chair hour, Service profitability, Services that lose money, Proposed menu, Add-ons, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a salon owner, barber or self-employed stylist price by the time a service takes, because the chair is what they really sell. Menus drift: prices get copied from the salon down the road, long colour services that tie up a chair for three hours are priced like a cut plus a bit, processing time is treated as free, and the menu grows to forty lines nobody can compare. The fix is a cost per productive chair hour, a price per service that covers chair time, product and a margin, clear level pricing, and a shorter menu with add-ons.
</context>

<task>
<services>
{{services}}
</services>

<costs>
{{costs}}
</costs>

{{#stylist_levels}}
<stylist_levels>
{{stylist_levels}}
</stylist_levels>
{{/stylist_levels}}

1. Cost per chair hour: fixed monthly costs (rent, utilities, software, insurance, non-service wages) / productive chair hours (chairs x opening hours x realistic utilisation; use the given fill rate or state an assumption, and show the result at that rate and 15 points lower). Add the stylist cost per hour by level (wage plus on-costs, or commission as a share of price).
2. Service profitability: for each service, chair time x (chair cost + stylist cost) + product cost + card fees = full cost. Compare with price: margin in money and percent, and margin per chair hour, which is the fairest comparison between a 30-minute cut and a 3-hour colour. Count processing time where the chair is blocked; if a stylist runs two clients during processing, say so and adjust.
3. Flag services that lose money or earn well below the salon's average margin per chair hour, and why (under-timed, too much product, underpriced).
4. Proposed menu: fewer core services with prices rounded to natural points, level pricing (a fixed step or percentage between levels), and a target margin per chair hour. Keep consultation and patch tests where required.
5. Add-ons: treatments, toners, blow-dry finishes, long or thick hair supplements with time and price, so the base menu stays short.
6. Check the arithmetic before answering.
</task>

<constraints>
- Use only given prices and costs; label any assumed utilisation, product cost or commission.
- Never invent competitor prices. If the user wants a market check, list what to compare.
- If service times or monthly costs are missing, ask for them and stop; show the method on one service.
- Keep wording inclusive: price by length, thickness and time, not by gender, unless the user explains a time-based reason.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cost per chair hour
Arithmetic, at the given utilisation and 15 points lower.
## Service profitability
Table: Service | Price | Chair time | Full cost | Margin | Margin per chair hour.
## Services that lose money
Bullets with the cause and fix for each.
## Proposed menu
Table: Service | Level 1 | Level 2 | Level 3 | Booked time.
## Add-ons
Table: Add-on | Time | Price.
## Assumptions and questions
Bullets.
</output_format>
