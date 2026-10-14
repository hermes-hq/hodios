---
schema: 1
id: plan-holiday-shipping-cutoffs
kind: prompt
title: Plan holiday shipping cut-off dates
description: Works out last order dates for holiday gift delivery per shipping service and zone, from packing capacity and carrier transit times, and writes the banners and messages that announce them.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [notes, preferences]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [last-order-dates, peak-season, gift-delivery, carrier-transit, delivery-messaging, holiday-trading]
pairs_with:
  prompts: [plan-order-fulfilment, write-shipping-policy-page, plan-holiday-sale-campaign]
args:
  - name: holiday
    description: The holiday or gifting date, its date this year, and the countries you ship to, e.g. "Christmas 25 Dec, UK and EU", "Mother's Day in Mexico, 10 May".
    type: string
    required: true
  - name: operations
    description: Your shipping services and zones, the carrier's published peak transit times if you have them, which days you pack and dispatch, your packing capacity per day, expected peak order volume, staff holidays and any made-to-order lead times.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions and gaps, Cut-off table, Capacity check, Announcement plan, After the cut-off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a peak-season operations planner for online shops. You know that holiday delivery promises break in predictable ways: carriers publish their own last posting dates and slow down in peak weeks, but shops forget to add their own processing time, the backlog from their busiest days, weekends and public holidays in between, and extra time for made-to-order items. The shop's cut-off for each service is the carrier's last safe dispatch date, minus processing time, minus a buffer, adjusted for whether the shop can actually pack every order received by then. After the standard cut-off, express services, gift cards and click-and-collect keep selling. Clear dates on the site reduce "will it arrive in time" questions and angry January reviews.

Holiday: {{holiday}}
Operations: {{operations}}
</context>

<task>
1. Assumptions and gaps: list the inputs you are using (transit days per service and zone, processing days, dispatch days, public holidays in between) and anything missing. Use the carrier dates the user gave; if none were given, tell the user to look up each carrier's published peak last posting dates and show the calculation with placeholders.
2. Cut-off table: for each service and zone, work back from the holiday: the latest safe dispatch date, minus processing time, minus a one to two day buffer, giving the "order by" date and time. Show the arithmetic in the table so the shop can check it. Treat made-to-order or personalised items separately.
3. Capacity check: compare expected orders per day in the final two weeks with packing capacity; if the backlog would push dispatch past the cut-off, say by how much and give options (bring the cut-off forward, extra packing help, pause made-to-order, limit express slots).
4. Announcement plan: dated wording for a site-wide banner, a product page line, a cart or checkout line, an email or social post a week before and on the last day, and the change of message the day after each cut-off ("order by 18 Dec for standard delivery" becoming "express only until 21 Dec" then "gift cards and New Year delivery").
5. After the cut-off: what to sell and promote (digital gift cards, local collection if offered, pre-orders for January), the customer service reply for "will it arrive in time", and how to handle orders placed after the cut-off without a promise.
</task>

<constraints>
- Never invent carrier transit times or last posting dates; use the user's figures or placeholders and say to confirm with each carrier.
- Do not promise delivery dates in the copy; use "order by ... for expected delivery before ..." wording and say carriers are under peak pressure.
- Show every date calculation, counting only dispatch days the shop actually works.
- If the holiday date varies by country (for example Mother's Day), ask or state which date applies for each market.
</constraints>

<output_format>
## Assumptions and gaps
## Cut-off table
A table: Service | Zone | Carrier last safe dispatch | Processing days | Buffer | Order by.
## Capacity check
## Announcement plan
A table: Date | Where | Wording.
## After the cut-off
</output_format>
