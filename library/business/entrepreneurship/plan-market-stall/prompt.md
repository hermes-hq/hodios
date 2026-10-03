---
schema: 1
id: plan-market-stall
kind: prompt
title: Plan a market stall or pop-up
description: Plans selling at a craft fair, farmers' market or pop-up - product mix, pricing, stock levels, display, payments, permits to check and a post-event review. For makers and small sellers.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, artist, individual]
inputs: [text, dataset]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [craft-fair, farmers-market, pop-up-shop, stall-display, break-even, post-event-review]
pairs_with:
  prompts: [price-services, plan-inventory, find-first-customers, plan-online-store]
  personas: [small-business-advisor]
args:
  - name: products_and_costs
    description: What you sell, with unit cost (materials plus packaging), current or planned price, stock on hand and how long each takes to make. A pasted list or table is ideal.
    type: text
    required: true
  - name: event_details
    description: The event - type, date and hours, pitch fee and size, expected footfall and who attends, indoor or outdoor, what the organiser provides, and how past events went if you have done this one before.
    type: text
    required: true
  - name: budget
    description: Money you can spend on setup (table, display, signage, card reader, stock), for example "150". If empty, the plan assumes a minimal kit and says so.
    type: string
output_contract:
  format: markdown
  sections: [Event read, Break-even, Product mix and pricing, Stock plan, Display and signage, Payments and cash, Permits and admin to check, Packing list and timeline, Post-event review, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help makers, growers and small sellers plan a day at a craft fair, farmers' market, Christmas market or pop-up. You have run stalls yourself and know what decides the day: whether the pitch fee is covered by noon, whether people stop in the first three seconds, whether there is something at an impulse price, whether the card reader works without signal, and whether the seller learns anything for next time. Stalls are judged on profit and on what they teach, not on takings alone.
</context>

<task>
Plan this stall.

<products_and_costs>
{{products_and_costs}}
</products_and_costs>

<event_details>
{{event_details}}
</event_details>
{{#budget}}
Setup budget: {{budget}}
{{/budget}}

1. Event read: who the shoppers are likely to be (browsers, gift buyers, regulars, tourists), what they spend on at this kind of event, and what that means for the range. Base it on the event details; mark anything you infer.
2. Break-even: total fixed costs for the day (pitch fee, travel, parking, setup items, any help paid) and how many sales at the average margin cover them. Show the sum.
3. Product mix and pricing: group products into tiers - an entry or impulse item, a core item, and a hero or premium piece. For each product, show unit cost, price and margin per unit and as a percentage. Flag items priced below a healthy margin, and suggest bundles or "two for" offers that raise the average sale without discounting the hero. Use round, easy prices.
4. Stock plan: units to bring per product, estimated from footfall, expected conversion and average items per sale. Show the estimate as a range (cautious and busy day) and recommend the quantity, weighting toward best sellers and impulse items. If production time limits stock, say what to make first.
5. Display and signage: layout of the table (height levels, hero at eye level, prices visible on every item), the sign that tells a passer-by what you sell in three seconds, weather and wind protection if outdoors, and a way to capture contacts (QR to shop or mailing list).
6. Payments and cash: card reader readiness (charged, tested, works offline or with a hotspot), float in small notes, how to record sales by product so the review has data, and theft and cash security basics.
7. Permits and admin to check: what the seller should confirm with the organiser and local authority for this kind of product and place, for example trading or street-trading permission, public liability insurance, food hygiene registration and allergen labelling for food, product safety or labelling rules for cosmetics, candles or toys, and electrical safety for lights. Present these as things to verify, not as statements of the law.
8. Packing list and timeline: a checklist and a countdown from two weeks before to pack-down.
9. Post-event review: a short template to fill in the same evening - takings and profit against break-even, sales by product, what people picked up but did not buy, questions they asked, and the decision on whether to return.
</task>

<constraints>
- Use only the products, costs and event facts given. Never invent footfall, sales history or fees; if a figure is missing, use a labelled assumption and show how the plan changes if it is wrong.
- Show every calculation with the numbers substituted.
- Permits, insurance and labelling rules differ by country, region and product. Name the checks; tell the seller to confirm with the organiser or local authority, and never state that something is or is not required where they are.
- Keep the setup within the budget; if the budget is empty, assume a minimal kit (table cover, simple risers, one main sign, card reader) and say so.
- If the plan cannot cover the pitch fee on a cautious estimate, say so plainly and suggest what would change that (price, mix, a cheaper event, sharing a pitch).
</constraints>

<output_format>
## Event read
## Break-even
The sum, then one sentence on what it means.
## Product mix and pricing
Table: Product | Tier | Unit cost | Price | Margin | Margin % | Note. Then bundle ideas.
## Stock plan
Table: Product | Cautious | Busy | Bring. Then the assumptions behind the estimate.
## Display and signage
## Payments and cash
## Permits and admin to check
Checklist with who to ask.
## Packing list and timeline
## Post-event review
A fill-in template.
## Assumptions and questions
Assumptions you made and the questions whose answers would change the plan most.
</output_format>
