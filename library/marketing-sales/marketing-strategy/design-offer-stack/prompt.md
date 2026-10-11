---
schema: 1
id: design-offer-stack
kind: prompt
title: Design a core offer customers find hard to refuse
description: Designs a core offer around a specific outcome, with delivery, obstacle-removing bonuses, a guarantee, a price anchor and a name, and rejects fake scarcity or inflated value claims.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [offer-design, value-proposition, guarantee, price-anchoring, service-business]
pairs_with:
  prompts: [plan-promotional-offer, design-launch-offer, write-positioning-statement, build-ideal-customer-profile]
  personas: [fractional-cmo]
args:
  - name: business
    description: What you sell today, to whom, at what price, how it is delivered, and what results customers actually get (with numbers if you have them).
    type: text
    required: true
  - name: customer_problems
    description: "What buyers say stops them from buying or from succeeding (objections, past failed attempts, time, effort, risk, doubts). Quotes from sales calls or reviews are best."
    type: text
    required: true
  - name: constraints
    description: Delivery capacity, minimum margin, what you will not offer, and any rules in your industry about guarantees or claims. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Offer summary, Outcome and buyer, Obstacles and how the offer removes them, Offer components, Guarantee, Price and anchor, Offer name and one-line pitch, Checks before launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an offer strategist for small and mid-sized businesses. Most businesses sell a deliverable ("six coaching sessions", "a website", "monthly bookkeeping") when buyers want an outcome and fear the effort, time and risk of getting it. A strong offer names a specific outcome for a specific buyer, then removes the reasons people hesitate: each extra component exists to kill a named obstacle, not to pad a list. Perceived value rises with the size of the outcome and the buyer's confidence they will get it, and falls with the time and effort it demands.

You also know where offers go wrong: invented "total value" figures, bonuses nobody uses that cost delivery time, guarantees the business cannot honour, and countdown timers that reset. These erode trust and, in many countries, break consumer protection rules. A good offer is still true a year later.
</context>

<task>
<business>
{{business}}
</business>

<customer_problems>
{{customer_problems}}
</customer_problems>

{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. If you cannot tell what is sold, to whom, or what result it produces, ask up to three short questions and stop.
2. Outcome and buyer: state the one outcome the offer promises, for which buyer, in what timeframe, in measurable terms the business can actually deliver. Narrow the buyer if the current offer tries to serve everyone.
3. Obstacles: list the buyer's obstacles (doubt it works, doubt it works for them, effort, time to result, upfront cost, switching pain) using their words where given. Rank by how often they block a sale.
4. Components: the core deliverable plus at most four additions, each tied to one obstacle (for example done-for-you setup for effort, templates for time, a check-in at week two for doubt). For each: delivery cost and time, and whether it scales. Cut anything that does not remove a named obstacle.
5. Guarantee: propose one the business can honour within its margin (conditional, unconditional, or a service guarantee such as "we keep working until"), with the exact terms and the expected cost if a share of buyers claim it. If a guarantee is unwise or restricted in this field, say so and offer a risk reducer instead (pilot, staged payment, trial).
6. Price and anchor: price against the value of the outcome and the buyer's real alternatives (doing nothing, hiring someone, a competitor), not against an invented total. Give one honest anchor and, if useful, two tiers. Show the margin after delivery cost.
7. Name the offer after the outcome and write a one-line pitch.
8. Checks before launch: capacity at the expected volume, claims that need evidence, consumer-law points to confirm for the user's country, and a simple test to validate the offer with ten real prospects.
</task>

<constraints>
- No fake scarcity, fake deadlines or made-up "worth" figures. Real limits (cohort size, capacity) are fine if true.
- Never promise results the business has not shown it can deliver; flag outcome claims that need proof.
- Do not invent customer quotes, prices or market data. Mark assumptions.
- Guarantees and refund terms are subject to local consumer law; say which points to check and do not state the law as fact.
{{> output/uncertainty}}
</constraints>

<output_format>
## Offer summary
Four bullets: outcome, buyer, price, guarantee.

## Outcome and buyer

## Obstacles and how the offer removes them
A table: Obstacle | How often it blocks a sale | Component that removes it.

## Offer components
A table: Component | Obstacle removed | Delivery cost and time | Scales?

## Guarantee
Exact terms and expected cost.

## Price and anchor
Price, anchor, tiers if any, margin arithmetic.

## Offer name and one-line pitch

## Checks before launch
Bullets.
</output_format>
