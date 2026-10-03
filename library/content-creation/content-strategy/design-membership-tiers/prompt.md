---
schema: 1
id: design-membership-tiers
kind: prompt
title: Design paid membership tiers
description: Designs paid membership tiers for Patreon, channel memberships or a paid newsletter with sustainable perks, pricing logic and a launch message. Use before launching or reworking memberships.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, writer]
inputs: [text, preferences]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [memberships, patreon, paid-newsletter, pricing-tiers, creator-revenue]
pairs_with:
  prompts: [plan-creator-monetization, plan-online-community-launch, write-newsletter-welcome-email]
  personas: [content-strategist]
args:
  - name: creator_and_audience
    description: What you make, on which platforms, audience size and engagement (for example average views, email open rate), what your most loyal fans ask for, and the platform you want to use.
    type: text
    required: true
  - name: capacity
    description: Hours per month you can give to member perks, and help you have (editor, moderator).
    type: text
    required: true
  - name: current_monetisation
    description: What you earn from now (ads, sponsors, products, services), and any past membership attempt and how it went.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Tiers, Perks to avoid, Pricing logic, Revenue scenarios, Launch message, Keep members]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design memberships for creators. Members pay for some mix of three things: support (keeping work they love going), access (closeness to the creator and to each other), and exclusive value (content, early access, resources, discounts). Memberships fail most often because the creator promises perks that eat their time (monthly custom videos, one-to-one calls for every member, daily posts) and then burns out or quietly stops delivering, and members cancel. Strong designs have few tiers (usually two or three), a clear middle tier most people should choose, perks that scale (made once, enjoyed by all) rather than perks that cost time per member, and an honest pitch. Platform fees, payment processing and taxes reduce what the creator keeps, and they vary by platform and country.
</context>

<task>
<creator_and_audience>
{{creator_and_audience}}
</creator_and_audience>

<capacity>
{{capacity}}
</capacity>

<current_monetisation>
{{current_monetisation}}
</current_monetisation>

1. **Recommendation.** Whether a membership fits now, on which platform, and why in three lines. If the audience or capacity is too small, say so and suggest what to do first.
2. **Tiers.** Two or three tiers: name, price (or a price range with the reasoning), who it is for, perks, and the hours per month each perk costs. The middle tier should be the obvious choice; the top tier exists for superfans and as an anchor.
3. **Perks to avoid.** Perks the creator should not offer at this capacity, and cheaper alternatives that feel as good to members.
4. **Pricing logic.** How the prices relate to each other and to what the audience already pays for (for example other creators in the niche, the cost of the creator's products), an annual option, a founding-member offer, and a reminder to check the platform's current fee schedule.
5. **Revenue scenarios.** Low, middle and high scenarios: the share of the engaged audience that joins (state the assumption and make it easy to change), the tier mix, gross monthly revenue, and an estimate after fees with the fee rate as a variable. Compare total perk hours with capacity.
6. **Launch message.** A short announcement for the creator's main channel or email: why now, what members get, what stays free, the founding offer and the call to action.
7. **Keep members.** A first-week welcome sequence, a monthly delivery rhythm, and what to do when people cancel (a short exit question).
</task>

<constraints>
- Total perk hours must fit within the stated capacity; show the sum and cut perks if it does not.
- Keep free content free: do not suggest moving what the audience already gets behind a paywall without saying the trade-off.
- Mark every revenue figure as an estimate built on stated assumptions; never present conversion rates or fees as facts.
- Do not suggest perks that break platform rules or that require the creator to share personal contact details they have not offered.
</constraints>

<output_format>
## Recommendation
Three lines.

## Tiers
A table: tier | price | for whom | perks | hours per month.

## Perks to avoid
Bullets with alternatives.

## Pricing logic
Bullets.

## Revenue scenarios
A table: scenario | members | tier mix | gross per month | after fees, with the assumptions above it.

## Launch message
The message in a quote block.

## Keep members
Bullets.
</output_format>
