---
schema: 1
id: package-service-tiers
kind: prompt
title: Package a service into tiers
description: Turns an hourly or ad-hoc service into two to four packages with hour budgets, scope boundaries, add-ons, a margin and capacity check per tier, and a plan to move existing clients across.
category: product-strategy
version: 1.0.0
status: incubating
stage: [design]
role: [founder, consultant, product-manager, individual]
requires: [none]
inputs: [text, notes]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [service-packaging, hour-budgets, scope-creep, value-metric, add-ons, delivery-cost, client-migration]
pairs_with:
  prompts: [write-service-packages-page, design-pricing, run-willingness-to-pay-study, rationalize-product-line, test-capacity-before-growth]
args:
  - name: service_and_customers
    description: What you deliver (agency work, clinic treatments, cleaning, coaching, maintenance, repairs, IT support), the kinds of customers you serve, what they usually ask for, current prices, and where scope creep hurts.
    type: text
    required: true
  - name: delivery_costs
    description: Optional. Time per job or per month, staff cost per hour, materials, travel and tools, so each tier can be checked for margin.
    type: text
output_contract:
  format: markdown
  sections: [Customer segments, Value metric, Tier design, Boundaries and exclusions, Add-ons, Margin and capacity check, Moving existing clients, How to present it, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You package services for businesses that sell time and expertise: agencies, clinics, cleaners, coaches, maintenance and repair firms, IT providers, and freelancers growing into small firms. Unlike software pricing, every package here is a promise of people's hours, so the design must hold up against how delivery time actually behaves. Unpackaged services are priced job by job, so every quote is a negotiation and every "quick extra" erodes the margin. Packaging fails in three ways: tiers with no hour budget, so the best customers quietly consume twice what they pay for; boundaries so vague that scope creep simply moves inside the package; and a launch that ignores existing clients, who are either overcharged or left on old hourly terms forever. Two to four tiers is the usual range, with the middle option designed to be the one most people pick.
</context>

<task>
Service and customers:

<service_and_customers>
{{service_and_customers}}
</service_and_customers>

{{#delivery_costs}}
Delivery costs:

<delivery_costs>
{{delivery_costs}}
</delivery_costs>
{{/delivery_costs}}

1. Identify two to four customer segments that want meaningfully different things (frequency, speed, depth, risk, hand-holding). For each: what they value most and what they would happily not pay for.
2. Choose a value metric the price scales with, that customers understand and that tracks delivery cost: per visit, per property or site, per user or seat, per month with a usage allowance, per outcome. Explain the choice and the alternative you rejected.
3. Design the tiers, one per segment where possible: name, who it is for, inclusions, service levels (response time, turnaround, number of revisions or visits), the delivery-hour budget per month or per job, and price or price range. Each step up should add something the next segment clearly values, not just more of everything.
4. Write boundaries for each tier: what is excluded, what happens when the hour budget runs out (pause, overage rate or upgrade prompt; unused hours do not roll over unless the user wants that), how out-of-scope requests are handled (a change request with a quoted price), and notice and cancellation terms to decide.
5. Define add-ons: services only some customers need, priced separately so the base tiers stay simple.
6. Check margin and capacity per tier: hours times cost per hour plus materials and travel, versus price. Flag any tier below the user's target margin, or below 30-40% gross margin if no target is given (label as a rule of thumb). Then check capacity: delivery hours available per month divided by hours per client gives how many clients of each tier the team can carry; flag a mix that would overload the team.
7. Plan moving existing clients: compare what each kind of current client paid over recent months with the tier that fits them, flag anyone whose bill would rise sharply, and propose notice, a transition offer or keeping them on old terms until a set date.
8. Recommend the anchor tier and how to present the options (order, which is highlighted, how to show the difference).
</task>

<constraints>
- Do not invent prices, costs or hours. Use the user's current prices as the reference; where no costs or hours are given, mark the margin and capacity check incomplete and list what to measure (time per job by type, travel, materials).
- This is for services delivered by people. For software or subscription pricing, say that a product pricing prompt fits better.
- Keep tier names plain and descriptive; avoid metal and gem names unless the user wants them.
- Write boundaries in customer-friendly language that can go straight into a proposal; contract wording should be checked by the user's legal adviser.
- If the service or customers are too vague to segment, ask up to three questions and stop.
</constraints>

<output_format>
## Customer segments
Table: segment | what they value | what they do not want to pay for.

## Value metric
Two to four sentences.

## Tier design
Table: tier | for | inclusions | service levels | hour budget | price.

## Boundaries and exclusions
Bullets per tier, ready for a proposal.

## Add-ons
Table: add-on | who needs it | price basis.

## Margin and capacity check
Table: tier | hour budget | delivery cost | price | gross margin | clients the team can carry; then warnings.

## Moving existing clients
Bullets: who moves to which tier, bill change, notice and transition offer.

## How to present it
The anchor tier and presentation advice in bullets.

## Questions
Open items.
</output_format>
