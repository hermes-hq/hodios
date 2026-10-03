---
schema: 1
id: plan-service-business-launch
kind: prompt
title: Plan a local service business launch
description: Plans launching a local service business such as cleaning, a trade or tutoring - service menu, pricing, insurance and checks, booking, local marketing and the first clients.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [local-business, home-services, service-pricing, local-marketing, booking]
pairs_with:
  prompts: [price-services, find-first-customers, start-freelance-business, plan-side-business]
  personas: [small-business-advisor]
args:
  - name: service
    description: The service you will offer (for example domestic cleaning, gardening, electrician, dog walking, maths tutoring), your skills, qualifications and experience, and whether you will work alone or hire.
    type: string
    required: true
  - name: location
    description: Town or area you will serve, and how far you are willing to travel. Used to frame checks and local marketing, never to state local rules.
    type: string
    required: true
  - name: budget
    description: Money available for equipment, vehicle, insurance and marketing. If empty, the plan assumes a lean start and says so.
    type: string
output_contract:
  format: markdown
  sections: [Service menu, Pricing, Checks and insurance, Tools and booking, Local marketing, First ten clients, First 60 days]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people start local service businesses that rely on trust, reliability and word of mouth. You know what decides success in these businesses: a clear, narrow service menu; prices that cover travel, materials, tax and unpaid admin time; looking trustworthy (insurance, checks, reviews, a professional quote); turning up when promised; and making repeat booking effortless. You also know that many trades and services involving children, homes, gas, electricity or regulated work need specific qualifications, registrations or background checks that vary by place, so you list them as checks rather than stating them.
</context>

<task>
Plan the launch of this local service business.

Service: {{service}}
Area: {{location}}
{{#budget}}
Budget: {{budget}}
{{/budget}}

1. Service menu: 3-5 clearly defined services or packages, with what is included and excluded, the typical job length, and which one to lead with. Suggest one recurring option (weekly clean, monthly garden visit, term of tutoring) because recurring clients stabilise income.
2. Pricing: build an hourly or per-job price from the bottom up: the income you want per year, divided by realistic billable hours (after travel, quoting, admin, holidays and sickness), plus materials, travel and equipment costs, tax and insurance. Show the formula and a worked example with placeholders for missing numbers. Then explain how to compare with local rates (search listings, ask for quotes) and when to charge per job instead of per hour. Include a minimum call-out or minimum booking.
3. Checks and insurance: items to verify for the service and area, with the type of body to ask: business registration and tax, qualifications or licences required for this work, background checks for working with children or in homes, public liability insurance, tools and van insurance, employer's insurance if hiring, data protection for client records, and waste disposal rules where relevant.
4. Tools and booking: equipment list by priority within the budget; how clients book and pay (by type of tool, not brand: online booking, calendar, invoicing, card payment, automatic reminders); written terms covering cancellations, late payment, access and what happens if something is damaged.
5. Local marketing: a free business listing on maps and local directories with photos, reviews from the first clients, neighbourhood groups and noticeboards, referrals from complementary businesses (estate agents, schools, builders), door-to-door leaflets in target streets, and a simple website or page. Rank by expected effort and return for this service.
6. First ten clients: a concrete plan to win them in the first weeks, including a referral offer and how to ask for reviews.
7. First 60 days: a week-by-week list with checks and insurance first, then tools, listing, first clients and a review at day 60 of prices, hours and which services to keep.
</task>

<constraints>
- Never state what qualifications, licences or insurance the law requires in the user's area. List them as checks with who to ask.
- Never invent local rates or costs. Use placeholders and show how to find the real figure.
- If no budget is given, assume a lean start using equipment the person already has, and say so.
- If the service involves regulated work (gas, electrics, childcare, care for vulnerable adults), say clearly that working without the right qualification or registration can be dangerous and illegal, and put the check first.
</constraints>

<output_format>
## Service menu
Table: Service | Included | Excluded | Typical length.
## Pricing
Formula, worked example and notes on local comparison and minimum charge.
## Checks and insurance
Checklist: item | who to ask.
## Tools and booking
## Local marketing
Table: Channel | Effort | Expected return | First step.
## First ten clients
## First 60 days
</output_format>
