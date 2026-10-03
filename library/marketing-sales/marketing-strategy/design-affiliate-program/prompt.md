---
schema: 1
id: design-affiliate-program
kind: prompt
title: Design an affiliate programme
description: Designs an affiliate programme with commission sized from margins, partner types, tracking and attribution rules, programme terms, fraud controls, recruitment and incrementality checks.
category: marketing-strategy
version: 1.1.0
status: incubating
stage: [plan, design]
role: [marketer, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [affiliate-marketing, partner-marketing, commission-structure, affiliate-terms, incrementality]
pairs_with:
  prompts: [design-referral-program, plan-influencer-campaign, analyze-marketing-attribution]
args:
  - name: offer
    description: What you sell, price points, purchase model (one-off, subscription, B2B contract), average order value, conversion rate and refund rate if known, and where customers come from today.
    type: text
    required: true
  - name: margins
    description: Gross margin per sale or per customer, customer lifetime value if known, and what you currently pay to acquire a customer through other channels.
    type: text
    required: true
  - name: audience
    description: Who your customers are and which publishers, creators or partners they already trust. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Economics, Commission structure, Partner types, Tracking and attribution, Programme terms, Fraud controls, Recruitment, Launch plan, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Economics state whether lifetime value is revenue or gross profit before sizing the commission."}
---
<context>
You are a partner marketing manager who has built affiliate programmes for e-commerce and subscription businesses. An affiliate programme pays partners only for results, which makes it look risk-free, but badly designed programmes leak money: coupon and cashback sites claim credit for sales that would have happened anyway, affiliates bid on the brand name in search, commission is paid on orders later refunded, and fraud inflates sign-ups. A sound programme starts from what a customer is worth, pays enough to motivate the partners who create new demand, and writes rules that protect margin and the brand.
</context>

<task>
Design an affiliate programme for this offer.

<offer>
{{offer}}
</offer>

<margins>
{{margins}}
</margins>

{{#audience}}Audience: {{audience}}{{/audience}}

1. Economics: calculate the maximum commission the business can afford per sale or per customer from the margin, lifetime value and current acquisition cost, and set a target commission below it. First state whether the lifetime value given is revenue or gross profit (assume revenue and apply the margin if it is unclear, and say so). Show the math, with every assumption labelled.
2. Commission structure: percentage or flat fee, one-off or recurring for subscriptions (with a duration cap), tiers or bonuses for top partners, and different rates by partner type if justified. Explain the choice.
3. Partner types: content and review sites, creators, newsletters, communities, complementary businesses, coupon and cashback sites, and B2B partners or agencies. For each, say the likely value, the incrementality risk, and whether to recruit, accept with limits or exclude.
4. Tracking and attribution: tracking via an affiliate network or in-house software, cookie or attribution window, last-click versus other rules, how conflicts with other channels are resolved, and coupon code handling.
5. Programme terms: the main clauses: approval process, prohibited methods (brand keyword bidding, trademark misuse, spam, misleading claims, cookie stuffing, incentivised clicks), required disclosure of the affiliate relationship, commission reversal for refunds and chargebacks with a locking period, payout threshold and schedule, and termination.
6. Fraud controls: signals to monitor and actions to take.
7. Recruitment: where to find the first 20 to 50 good partners, an outreach message, and what to give them (creative, product access, a contact person).
8. Launch plan: a 90-day plan from setup to first review.
9. Measurement: revenue and customers by partner, refund rate, new versus returning customers, an incrementality check (for example comparing order rates with and without a partner type, or a holdout), and the effective cost per acquisition against other channels.
</task>

<constraints>
- Show all economics with units; never present an assumed conversion or refund rate as known.
- Do not recommend platforms by brand as the only option; describe the choice criteria.
- Disclosure of the affiliate relationship is required, under rules such as the FTC Endorsement Guides in the US and similar laws elsewhere.
- Remind the user to have the programme terms reviewed by a lawyer and checked for tax reporting on partner payouts in their country.
- If margins are missing or the offer cannot support any commission, say so and stop after Economics.
</constraints>

<output_format>
## Economics
The calculation, then the target commission.
## Commission structure
## Partner types
A table: Partner type | Value | Incrementality risk | Decision.
## Tracking and attribution
## Programme terms
A clause checklist.
## Fraud controls
## Recruitment
Including the outreach message.
## Launch plan
## Measurement
</output_format>
