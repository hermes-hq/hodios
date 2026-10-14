---
schema: 1
id: design-launch-offer
kind: prompt
title: Design a launch offer
description: Designs a launch offer - founding price, first-term discount, longer trial or bonus - with eligibility, a real end date, the switch to full price at renewal, a margin check and honest wording.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, product-manager, marketer]
requires: [none]
inputs: [text, dataset]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [introductory-offer, founding-price, discount-strategy, offer-terms, price-anchoring]
pairs_with:
  prompts: [design-pricing, plan-promotional-offer, plan-product-launch, plan-price-change-communication, write-launch-announcement]
  rules: [marketing-claims-rules]
args:
  - name: product
    description: The product, its standard price and billing (one-off, monthly, annual), unit costs or margin if known, the audience, and the launch goal (first customers, reviews, cash, case studies).
    type: text
    required: true
  - name: ideas
    description: Offers you are considering and any limits (maximum discount, budget, number of spots), plus the country or countries you sell in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goal and recommendation, Options compared, Offer terms, End of offer, Margin check, Offer copy, Checks before launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing-minded product lead. Launch offers help when they serve a clear goal (first paying customers, reviews, early cash, design partners) and end cleanly. They hurt when the discount anchors the product as cheap, when "limited time" never ends and customers learn to wait, when founding prices are forever and quietly eat margin at scale, when the end of the offer surprises people on their invoice, and when a "was" price was never actually charged. Many countries regulate reference prices, fake urgency and auto-renewal terms, so the offer must be checked for the markets it runs in. Often a bonus (onboarding call, extra seats, a longer trial) achieves the goal better than a price cut.
{{#ideas}}

Ideas and limits:

<ideas>
{{ideas}}
</ideas>
{{/ideas}}
</context>

<task>
Product:

<product>
{{product}}
</product>

1. Restate the launch goal and recommend one offer type that serves it, or recommend no offer if the goal does not need one.
2. Compare 3-4 options (for example founding price locked for a period, percentage off the first term, extended trial, bonus instead of discount, limited founding spots) on: fit with the goal, anchoring risk, margin cost, complexity, and how cleanly it ends.
3. Write the terms of the recommended offer: who is eligible, how to claim, start and end date, cap on spots if any, how long the benefit lasts, and whether it stacks with other discounts.
4. Explain what happens when the offer ends for buyers (renewal price, notice before the first full-price charge, how to cancel) and for the public (the offer actually stops).
5. Check margin with the inputs given: cost per customer at the offer price and how many offer customers the business can carry. Use placeholders if costs are missing.
6. Write short offer copy for the landing page and the announcement, with the end date and renewal terms visible.
7. List checks before launch: payment setup for the discount and its expiry, rules on reference prices, urgency claims and auto-renewal in the selling countries (these differ; check locally), and support macros.
</task>

<constraints>
- Never invent prices, costs, or "regular" prices that were not charged; a struck-through price must be a price actually charged or genuinely planned under the applicable rules.
- No fake urgency: deadlines and spot caps must be real and enforced.
- Do not state legal rules for a country as fact; flag them as checks.
- Make renewal terms as prominent as the discount.
</constraints>

<output_format>
## Goal and recommendation
Two or three sentences.

## Options compared
Table: option | goal fit | anchoring risk | margin cost | complexity | clean end.

## Offer terms
Bullets.

## End of offer
Bullets for buyers and for the public.

## Margin check
Short calculation or placeholders, with assumptions.

## Offer copy
Landing-page block and announcement lines.

## Checks before launch
Checklist.
</output_format>
