---
schema: 1
id: plan-buyer-offer-strategy
kind: prompt
title: Plan an offer strategy for a buyer client
description: Prepares a buyer's agent to advise a client on one property - value evidence, opening and walk-away figures, terms that strengthen the offer, conditions to keep, and the negotiation sequence.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep]
subject: [real-estate]
requires: [none]
inputs: [dataset, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [buyers-agent, offer-negotiation, comparables, home-buying, contingencies]
pairs_with:
  prompts: [prepare-buyer-consultation, analyze-property-comparables]
  personas: [real-estate-agent]
args:
  - name: property
    description: The home - asking price, time on market, price history, condition, survey or inspection findings so far, and what the listing agent has said about the seller's position and other interest.
    type: text
    required: true
  - name: evidence
    description: Comparable sales and competing listings with prices, sizes, condition and dates.
    type: text
    required: true
  - name: buyer
    description: Your client's position - budget ceiling, financing status, deposit, chain or sale to complete, flexibility on dates, how much they want this home and what would make them walk away.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region. Offer formats, binding points, deposits and common conditions differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Value evidence, Figures, Strength of position, Terms and conditions, Negotiation sequence, Offer cover note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a buyer's agent plan an offer the way a seasoned negotiator does. Price is only one lever. Sellers weigh certainty and timing heavily: proof of funds or a financing approval, no onward chain, a flexible completion or closing date, and fewer or shorter conditions often beat a slightly higher but shakier offer. The figures that matter are decided before the first call: what the evidence says the home is worth, what the client would pay to secure it, and the point at which they walk away. Writing the walk-away figure down in advance is what stops bidding drift in a competitive situation. Conditions that protect the buyer (inspection or survey, financing, title) should be removed only when the client understands the risk they are taking.

<property>
{{property}}
</property>

<evidence>
{{evidence}}
</evidence>

<buyer>
{{buyer}}
</buyer>

Jurisdiction: {{jurisdiction}}
</context>

<task>
1. Assess value from the evidence: adjust each comparable openly and give a likely value range. Note what the time on market and price history suggest about the seller's flexibility.
2. Set three figures with reasons: opening offer, target, and walk-away (never above the client's stated ceiling). Show how each relates to the evidence.
3. Rate the client's position against likely competition: financing, chain, deposit size, timing. Say what would strengthen it before the offer goes in.
4. Recommend terms and conditions: which protections to keep, which could be shortened or adjusted and the risk of doing so, completion timing, items included, and any escalation or best-and-final approach common in {{jurisdiction}}, marked `[CHECK locally]` where the format is legally specific.
5. Plan the negotiation sequence: how to present, likely counter-moves, when to move and by how much, and the point to stop and talk with the client again.
6. Draft a short offer cover note to the listing agent highlighting the client's strengths, without revealing their ceiling.
</task>

<constraints>
- Never reveal or hint at the client's ceiling or motivation in anything addressed to the seller's side.
- Do not invent comparables, rival bids or seller circumstances. Rumours from the listing agent are labelled as unverified.
- Do not recommend waiving inspection, survey or financing protections without stating the specific risk to the client.
- Mark legal points such as when an offer becomes binding, deposit handling and contingency deadlines as `[CHECK with conveyancer or attorney]`.
{{> output/uncertainty}}
</constraints>

<output_format>
## Value evidence
Adjusted comparables table and value range.

## Figures
Opening, target, walk-away, each with reasoning.

## Strength of position
Ratings and what to improve.

## Terms and conditions
Bullets with risks.

## Negotiation sequence
Numbered moves with stop point.

## Offer cover note
Under 150 words.
</output_format>
