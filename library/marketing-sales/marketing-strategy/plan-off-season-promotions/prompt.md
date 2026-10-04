---
schema: 1
id: plan-off-season-promotions
kind: prompt
title: Plan off-season promotions
description: Plans a seasonal business's quiet-month promotions - pre-booking deposits, season passes, vouchers and maintenance plans sold to past customers - with offer wording and a contact calendar.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
subject: [hospitality, retail]
requires: [none]
inputs: [text]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [seasonality, off-season, pre-booking, maintenance-plans, early-bird, past-customers]
pairs_with:
  prompts: [build-annual-marketing-calendar, plan-promotional-offer, design-loyalty-program, evaluate-new-service-line]
args:
  - name: business
    description: What you sell in the busy season, prices, typical customers, where you are, anything you already sell in the quiet months, and what promotions you have tried before.
    type: text
    required: true
  - name: quiet_months
    description: Which months are quiet and how quiet (for example "November to February, revenue drops to about a quarter").
    type: string
    required: true
  - name: capacity
    description: How many bookings, plan visits or season places you can deliver next season and in the quiet months, and who is around to run the promotions. Optional.
    type: text
  - name: monthly_costs
    description: Fixed monthly costs that continue in the quiet months (rent, loan, insurance, kept-on wages) and typical margins, plus your customer list size and how you can contact them. Optional; the target is shown as a formula without it.
    type: text
output_contract:
  format: markdown
  sections: [Cash target, Promotions, Offer wording, Contact calendar, Numbers to track, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the marketing side of the quiet months for seasonal businesses (ice cream shops, landscapers, holiday lets, ski and surf shops, garden centres, wedding suppliers, outdoor activity providers). The cheapest money in a quiet season comes from people who already bought last season: they can be sold next season early (pre-booking deposits, early-bird season passes, gift vouchers for the spring) and signed up to recurring plans (maintenance, servicing, storage, membership) that pay through the winter. Common mistakes: discounting the main product when nobody wants it, early-bird deals so generous that the busy season is sold at a loss, deposits spent as if they were profit, and four months of silence so customers forget you and book a competitor in spring.

This prompt plans promotions for what the business already sells. Deciding whether to add new off-season services, change prices or close for some months is a separate business decision; if the owner mainly needs that, say so in one line and keep to the promotions.

Quiet months: {{quiet_months}}
</context>

<task>
<business>
{{business}}
</business>

{{#capacity}}<capacity>
{{capacity}}
</capacity>{{/capacity}}

{{#monthly_costs}}<monthly_costs>
{{monthly_costs}}
</monthly_costs>{{/monthly_costs}}

1. If you do not know what the business sells or who its past customers are, ask and stop. If costs, margins or list size are missing, ask for them and continue with [X] figures.
2. Cash target: fixed costs over the quiet months minus expected quiet-month revenue. Show the arithmetic. This is the amount the promotions aim to bring in as cash (deposits, plan payments, voucher sales), not profit.
3. Promotions: pick three to five that suit this business from these types: early-bird booking for next season with a deposit; season passes or bundles paid now; gift vouchers timed to the quiet-month gift dates the owner names; a recurring plan with monthly payments; a quiet-month version of an existing service or product already sold (for example winter visits on a maintenance round, hot drinks at a gelato counter). For each: who it targets, the offer, the price or deposit (from supplied prices or [X]), the limit sized to next season's capacity, expected take-up as a range labelled as an assumption, cash in now, and the margin effect next season.
4. Guard the busy season: early-bird benefits stay modest (priority dates, an included extra, a small saving) and the number of early-bird places is capped so the peak is not sold below normal margin.
5. Offer wording: a short headline, the offer, terms in plain words (deposit, deadline, refund and cancellation, what happens if weather or availability changes) and the call to action, for each promotion.
6. Contact calendar across the quiet months: past customers first, then the email list and social, roughly every two to four weeks, each touch useful (a tip, a booking reminder, a gift date) as well as selling, ending with a pre-season push before the first busy weeks.
7. Numbers to track monthly: deposits and plan sign-ups against the cash target, take-up per promotion, list growth, and early-bird places left.
</task>

<constraints>
- Use only supplied figures; never invent prices, demand, list sizes or take-up rates. Rules of thumb and take-up ranges are labelled as assumptions.
- Pre-paid bookings, passes and vouchers create obligations: terms for refunds, cancellations and expiry must be clear and checked against local consumer rules, and deposits are not profit until delivered.
- Contact past customers only through channels they agreed to; flag local marketing consent rules.
- No deep discount on the core product without showing the margin impact per sale.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cash target
Arithmetic in three lines, or the formula with [X] figures.

## Promotions
Table: Promotion | Target customers | Offer and price | Places | Expected take-up (assumption) | Cash now | Margin effect next season.

## Offer wording
For each promotion: headline, offer, terms, call to action.

## Contact calendar
Table: Week or month | Audience | Message or offer | Channel.

## Numbers to track
Bullets, with the monthly figure that means it is on track.

## Assumptions and questions
Bullets.
</output_format>
