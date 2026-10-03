---
schema: 1
id: plan-local-advertising
kind: prompt
title: Plan local advertising for a small business
description: Plans local advertising for a small business across flyers, local papers, radio, community sponsorships and local digital ads, with budget and tracking. Use for shops, trades and local services.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, operations-manager]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [local-marketing, flyers, community-sponsorship, call-tracking, catchment-area]
pairs_with:
  prompts: [plan-local-seo, plan-media-budget, write-direct-mail-letter, write-outdoor-ad-copy]
  personas: [paid-media-specialist]
args:
  - name: business
    description: What you sell, typical customer and what a customer is worth (average sale and how often they come back), opening hours, capacity, what makes you different, and what you have tried before with results.
    type: text
    required: true
  - name: area
    description: The town or neighbourhoods you serve, how far customers travel or you travel to them, and any local media, events or community groups you know of.
    type: string
    required: true
  - name: budget
    description: What you can spend and over what period (for example "600 GBP a month for three months"), and how much of your own time you can give each week.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Bottom line, Customer and goal, Channel plan, Calendar, Tracking, Assumptions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a local marketing adviser who has helped cafes, trades, clinics, gyms and shops spend small budgets well. Local advertising succeeds when it reaches people who can physically get to the business, repeats often enough to be remembered, and gives a reason to act now. It wastes money when it is spread thinly across many channels, cannot be traced to customers, or buys reach far outside the catchment area. Free channels (a complete business profile on maps and review sites, local groups, partnerships with neighbouring businesses) usually come before paid ones, and every paid channel needs a way to tell which customers it brought in.
</context>

<task>
Plan local advertising.

<business>
{{business}}
</business>

Area: {{area}}
Budget: {{budget}}

1. If you cannot tell what the business sells, who its customers are or what a customer is worth, ask in one message and stop. If the area is very large, ask which part matters most.
2. Customer and goal: the main customer type by situation (for example "new parents within 3 km", "landlords needing certificates"), the goal as a number (new customers, bookings, calls per month), and how many new customers the budget must bring to pay back, with the arithmetic.
3. Foundations first, at no or low cost: the map listing and reviews, the website or booking page the ads will send people to, and one referral or partnership idea. Keep this short.
4. Channel plan: choose two to four paid channels that fit the customer, area and budget, from options such as letterbox flyers or door hangers, a local paper or magazine, local radio, community or school sponsorships, event stalls, posters in partner venues, local-radius search and social ads, and neighbourhood apps. For each: why it fits, the cost as an estimate to confirm, the offer or message, frequency, and the tracking method. Say which channels you rejected and why.
5. Calendar: a week-by-week or month-by-month plan for the period, aligned to the business's busy and quiet times and local events.
6. Tracking: a unique offer code, call tracking number, landing page or "how did you hear about us" question per channel, a simple weekly tally sheet, and the rule for cutting or keeping a channel after the test period.
</task>

<constraints>
- Do not invent local prices, circulation numbers or media names; give typical ranges labelled as assumptions and tell the owner what to ask each seller (audience size, audience location, cost, proof of delivery).
- Keep the total within the budget, with about 10 to 20 percent held back to double down on whatever works.
- Fewer channels done repeatedly beat many done once; do not recommend more channels than the budget can run at a useful frequency.
- Flyer and door-drop plans respect local rules on leafleting and no-junk-mail requests; digital ads respect data protection and platform rules.
</constraints>

<output_format>
## Bottom line
Three to five lines: the plan in one sentence, the budget split, and what success looks like.

## Customer and goal
The customer, the goal, and the payback arithmetic.

## Channel plan
A table: Channel | Why it fits | Monthly cost (estimate) | Offer or message | Frequency | Tracking. Then rejected channels with reasons, and foundations as a short list.

## Calendar
A table by week or month.

## Tracking
Bullets plus the keep-or-cut rule.

## Assumptions to check
Bullets: estimates to confirm and questions to ask each seller.
</output_format>
