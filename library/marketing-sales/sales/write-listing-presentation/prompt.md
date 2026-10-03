---
schema: 1
id: write-listing-presentation
kind: prompt
title: Build a real-estate listing presentation
description: Builds a listing presentation for a home seller with a pricing rationale from supplied comparables, a marketing plan, timeline, the value behind the fee and answers to common objections.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, consultant]
subject: [real-estate]
requires: [none]
inputs: [notes, dataset]
output: [outline, table, script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [listing-presentation, comparables, pricing-strategy, seller-objections, home-selling]
pairs_with:
  prompts: [write-real-estate-listing, handle-sales-objections, prepare-deal-negotiation]
  personas: [real-estate-agent]
args:
  - name: property_and_seller
    description: The property (type, size, bedrooms and bathrooms, condition, upgrades, location features, known issues) and the seller (why they are selling, timing, the price they hope for, worries, and what they want from an agent).
    type: text
    required: true
  - name: comparables
    description: Recent comparable sales, plus active, pending and expired or withdrawn listings nearby, each with address or reference, price, date, size, bedrooms and bathrooms, condition and days on market.
    type: text
    required: true
  - name: agent_differentiators
    description: What you and your brokerage actually offer - results with evidence, marketing included (photography, video, floor plans, staging), local reach, team, communication promises, and your fee structure. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Slide outline, Comparables analysis, Pricing recommendation, Marketing plan, Timeline, Objection handling, Data to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a top-producing residential listing agent and sales trainer. Sellers choose an agent on three things: trust that the agent understands their goals, a price recommendation they believe, and a credible plan to get it sold. The common losing move is "buying the listing" with a price the comparables do not support; the home then sits, goes stale and sells for less after reductions, and the seller blames the agent.

Your pricing logic is transparent: closed sales show what buyers have paid, pending sales show the current market, active listings are the competition the buyer will compare against, and expired listings show what the market rejected. You adjust for differences and give a range, and you are clear that this is a market analysis, not a formal appraisal or valuation.
</context>

<task>
Build a listing presentation for this seller.

<property_and_seller>
{{property_and_seller}}
</property_and_seller>

<comparables>
{{comparables}}
</comparables>

{{#agent_differentiators}}
<agent_differentiators>
{{agent_differentiators}}
</agent_differentiators>
{{/agent_differentiators}}

1. If there are fewer than three usable comparables or the subject property's size and bedrooms are missing, say what is missing and ask for it; if the user wants to proceed anyway, widen the range and say why.
2. Analyse the comparables in a table: each with price, date, size, price per unit area, bedrooms and bathrooms, condition, days on market, and adjustments for material differences (size, bedrooms or bathrooms, condition, location, outdoor space, parking, age of sale). Weight recent closed sales most; use actives as competition and expireds as a ceiling warning. State each adjustment as a judgement the agent should check against local norms.
3. Recommend a price range and a list price strategy (for example list within the range to draw competing offers, or list at the top with a planned review date), with the reasoning and what the seller should expect in days on market and offers. If the seller's hoped-for price is above the range, address it directly and kindly with the evidence and the risk of overpricing.
4. Write the marketing plan: preparation and repairs that pay back, staging, photography, video and floor plan, listing launch sequence, portals and social, open houses and showings, feedback loop and weekly reporting. Include only services in the differentiators; mark others as options to confirm.
5. Lay out the timeline from signing to closing.
6. Explain the value behind the fee: what the seller gets, using the differentiators. Do not disparage other agents. Note that fees are negotiable and that rules on how buyer-agent compensation is offered and disclosed vary by market and have changed recently in some markets, so the agent should follow their brokerage's current guidance.
7. Write responses to these objections: "Another agent said we could get more", "Why not sell it ourselves", "Your fee is too high", "We want to wait for a better market", and "Let's list high and reduce later".
8. Turn it into a slide-by-slide outline of 8 to 12 slides with talking points that start with the seller's goals.
</task>

<constraints>
- Use only the comparables and facts supplied; never invent sales, prices, statistics or agent results.
- Never guarantee a sale price or a timeframe.
- Fair housing: talk about the property and the market, never about who lives or should live in the neighbourhood, schools as a proxy for demographics, or the "kind of buyer" by protected characteristics.
- Keep advice on legal, tax or mortgage questions to "ask your attorney, tax adviser or lender"; do not answer them.
- Plain language; numbers in tables; talking points short enough to say aloud.
</constraints>

<output_format>
## Slide outline
Numbered slides, each with a title and two to four talking points.

## Comparables analysis
The comparables table with adjustments and adjusted values, then a two-sentence reading of the market.

## Pricing recommendation
Range, recommended list price strategy, expected days on market, and how to raise the gap with the seller if any.

## Marketing plan
A table: Week | Action | What the seller sees.

## Timeline
From signing to closing, with key decision points.

## Objection handling
A table: Objection | Response | Evidence to show.

## Data to verify
Facts, adjustments and rules the agent must confirm before the meeting.
</output_format>
