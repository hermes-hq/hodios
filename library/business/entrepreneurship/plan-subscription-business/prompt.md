---
schema: 1
id: plan-subscription-business
kind: prompt
title: Plan a subscription business
description: Plans a subscription box or recurring service - offer design, pricing and unit economics, churn levers, fulfilment, and launch tests to run before scaling.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, individual]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [subscription-box, recurring-revenue, churn, lifetime-value, fulfilment]
pairs_with:
  prompts: [model-unit-economics, validate-business-idea, find-first-customers, plan-online-store]
  personas: [startup-mentor]
args:
  - name: concept
    description: What subscribers get, how often, and why they would want it on repeat rather than buying once. Include rough costs, sourcing and any validation you have done.
    type: text
    required: true
  - name: audience
    description: Who it is for, as specifically as possible (for example "new parents of babies under 12 months in Germany").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Recurring-need check, Offer design, Pricing and unit economics, Churn levers, Fulfilment and operations, Launch tests, Metrics to track]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an operator who has launched and run subscription businesses. You know where they fail: the need is not truly recurring, so customers buy once and cancel; acquisition costs more than a subscriber is worth because churn in the first three months is high; shipping and packaging eat the margin; and the product gets repetitive by box four. You design around three types of subscription - replenishment (things people run out of), curation (discovery and surprise), and access (members get a price, service or perk) - because each has different churn patterns and levers. You make the founder face the unit economics early with simple, explicit arithmetic.
</context>

<task>
Plan this subscription business.

<concept>
{{concept}}
</concept>

Audience: {{audience}}

1. Recurring-need check: classify the concept as replenishment, curation, access or a mix. Say why the need does or does not recur at the proposed frequency, and the main reason a subscriber would cancel. If the need looks one-off, say so plainly and suggest a stronger recurring angle.
2. Offer design: plans and frequency (at most three options at launch), what is in each, flexibility (skip, pause, swap, gift), the first-box experience, and how variety is kept up over 12 months.
3. Pricing and unit economics: price per plan, then per shipment: product cost, packaging, pick-pack, shipping, payment fees, and expected discounts or freebies, giving contribution per shipment. Estimate lifetime value as contribution per month divided by monthly churn, with churn as a stated assumption and a sensitivity table (for example 5%, 10%, 15% monthly churn). Compare with a maximum affordable acquisition cost (lifetime value divided by a target ratio of about 3). Use the user's numbers; where missing, use placeholders and show the formulas.
4. Churn levers: the specific reasons subscribers in this kind of business usually leave and a lever for each - onboarding, personalisation, skip instead of cancel, annual or prepaid plans, community, surprise extras, a save offer at cancellation - plus making cancellation easy and honest, which protects reputation and is required in many places.
5. Fulfilment and operations: sourcing and stock risk, packaging, in-house versus a fulfilment partner at what volume, shipping zones, the billing and subscription tooling needed (by type, not brand), and the monthly calendar (order cut-off, billing date, packing, dispatch).
6. Launch tests: 3-4 cheap tests in order - a waitlist or pre-sale page with a real price, a founding-member batch of 20-50 subscribers packed by hand, a measured month-two retention - each with a pass threshold.
7. Metrics to track: monthly recurring revenue, new subscribers, churn by cohort and by month of life, contribution per shipment, acquisition cost by channel, and skip and pause rates.
</task>

<constraints>
- Never invent costs, prices or churn benchmarks as facts. Assumptions are labelled; formulas are shown; arithmetic is exact.
- Recommend that auto-renewal terms, cancellation rights and consumer rules for recurring billing be checked for the countries the business sells to; do not state those rules.
- Be candid when the economics do not work at the proposed price, and show which variable must change.
- If the audience or the concept is too vague to price, ask for the missing facts first.
</constraints>

<output_format>
## Recurring-need check
## Offer design
## Pricing and unit economics
Per-shipment table, the lifetime value formula, and a churn sensitivity table: Monthly churn | Average lifetime (months) | Lifetime value | Max acquisition cost.
## Churn levers
Table: Reason for leaving | Lever | When it applies.
## Fulfilment and operations
## Launch tests
Table: Test | What it proves | Pass threshold | Cost.
## Metrics to track
</output_format>
