---
schema: 1
id: test-local-service-demand
kind: prompt
title: Test local service demand
description: Tests demand for a local service such as cleaning, dog walking, handyman work or tutoring over two weeks with community posts, leaflets and quote requests, against a go or no-go threshold set first.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, individual]
requires: [none]
inputs: [text]
output: [plan, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [demand-test, local-business, leaflets, community-groups, go-no-go, enquiries]
pairs_with:
  prompts: [plan-service-business-launch, price-services, plan-local-advertising, validate-business-idea]
args:
  - name: service
    description: The service you want to offer (for example "end-of-tenancy cleaning", "dog walking and pet visits", "GCSE maths tutoring").
    type: string
    required: true
  - name: area
    description: Town, neighbourhood or postcode area you would cover, and how far you would travel.
    type: string
    required: true
  - name: details
    description: Your price idea, hours available, what income you need from it, and any spare budget for leaflets or ads.
    type: text
output_contract:
  format: markdown
  sections: [Go or no-go threshold, Test offer, Fourteen-day plan, Copy to use, Tracking sheet, Reading the results]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone check whether people near them will actually pay for a local service before they buy equipment, insurance or branding. A two-week test works when it asks for a real action - a quote request, a booking, a deposit - instead of likes or "great idea!" comments, when it reaches strangers and not only friends, and when the threshold for going ahead is written before the test starts. It goes wrong when the founder posts once, gets polite reactions, and reads that as demand, or when it reaches the wrong area so the enquiries are too far to serve profitably.

Service: {{service}}
Area: {{area}}
</context>

<task>
{{#details}}
<details>
{{details}}
</details>
{{/details}}

1. Go or no-go threshold: before anything goes out, set targets for 14 days - enquiries from people who are not friends or family, quotes sent, bookings or deposits taken - derived from the income needed (bookings per week to make it worthwhile, then a realistic share of that from a two-week test). Include a "test again differently" band between go and no-go.
2. Test offer: one clear service package with a price or a "from" price, the area covered, availability, and a reason to book now (an introductory first visit, limited slots). It must be something they can deliver honestly if booked.
3. Fourteen-day plan: day by day, using free and cheap channels - local community and neighbourhood groups and apps (following each group's rules on business posts), a small batch of leaflets or door hangers in the two or three best streets, noticeboards in shops, schools or vets that fit the service, a listing on a local directory or quote site, asking a few local businesses that serve the same customers (estate agents, pet shops, schools) - with how many of each.
4. Copy to use: a community post, a leaflet (headline, three bullets, price, how to book), and a reply template for enquiries that asks the questions needed to quote.
5. Tracking sheet: every enquiry logged with date, channel, distance, what they asked for, quote, outcome and reason if lost.
6. Reading the results: compare with the threshold; look at which channel and street produced real bookings, prices people pushed back on, and requests for something different (a signal to adjust the offer); then the decision and the next step for each outcome.
</task>

<constraints>
- Never invent local prices, competitor names or demand figures; mark price assumptions to check against local listings.
- Remind the user to check what they need before doing any paid booked work (insurance, checks for work with children or in homes, registration); do not state the rules.
- Respect community group rules and privacy; no spam or mass messaging of people who did not ask.
- If price or income needed is missing, set the threshold with [X] placeholders and ask for them.
</constraints>

<output_format>
## Go or no-go threshold
The arithmetic, then a table: Result after 14 days | Decision.

## Test offer
Five lines: package, price, area, availability, reason to book now.

## Fourteen-day plan
Table: Day | Channel | Action | Quantity.

## Copy to use
The post, the leaflet text and the enquiry reply, each labelled.

## Tracking sheet
Table template.

## Reading the results
Bullets, then the next step for go, test again and no-go.
</output_format>
