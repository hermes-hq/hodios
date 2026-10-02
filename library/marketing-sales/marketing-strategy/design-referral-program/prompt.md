---
schema: 1
id: design-referral-program
kind: prompt
title: Design a referral programme
description: Designs a referral programme with the incentive model, double-sided reward sizing from unit economics, fraud prevention, where to ask, copy and success metrics. Use for SaaS, e-commerce and services.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, founder, product-manager]
subject: [saas, ecommerce]
requires: [none]
inputs: [text, dataset]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [referral-program, word-of-mouth, incentives, viral-loop, fraud-prevention]
pairs_with:
  prompts: [plan-marketing-campaign, create-lead-magnet, write-email-sequence]
  personas: [growth-marketer]
args:
  - name: business
    description: What you sell, to whom, how customers find you today, how satisfied they are (NPS, reviews, repeat rate), and whether customers already recommend you without an incentive.
    type: text
    required: true
  - name: customer_economics
    description: Average order value or contract value, gross margin, customer acquisition cost by channel, retention or lifetime value, and refund rate. Optional; reward sizing is shown as a formula if empty.
    type: text
  - name: constraints
    description: Limits such as budget, what rewards you can deliver (credit, discounts, cash, product), platform or tooling, regulated industry rules, and markets you sell in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Incentive model, Reward economics, Fraud and abuse, Where to ask, Copy, Terms checklist, Metrics, Launch plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth marketer who has designed referral programmes for subscription software, online stores and service businesses. Referrals amplify existing word of mouth; they rarely create it. A programme works when customers are already happy, the product is easy to explain, the ask comes at a moment of success, sharing takes seconds, and the reward feels generous to both people while still costing less than other acquisition channels. Programmes fail through rewards nobody values, asks hidden in a settings page, slow or confusing payouts, and abuse (self-referrals, fake accounts, coupon sites) that eats the budget.
</context>

<task>
Design a referral programme.

<business>
{{business}}
</business>

{{#customer_economics}}<customer_economics>
{{customer_economics}}
</customer_economics>{{/customer_economics}}
{{#constraints}}<constraints_given>
{{constraints}}
</constraints_given>{{/constraints}}

1. **Fit check:** is a referral programme the right move now? Look at satisfaction, existing word of mouth, purchase frequency and how social or visible the product is. If the signals are weak (low satisfaction, a one-off purchase nobody talks about, a sensitive purchase people do not discuss), say so and suggest what to fix or try first instead of designing a generic scheme. If you cannot tell what is sold, to whom, or whether customers are satisfied, ask for those and stop. Missing economics are not a blocker: section 3 then gives the formula with the inputs to fill.
2. **Incentive model:** single- or double-sided, and the reward type (account credit, discount, cash or gift card, free product or upgrade, tiered rewards, donation). Recommend one with the reason, considering what customers value, the cost to deliver and brand fit.
3. **Reward economics:** the maximum affordable reward per referred customer, from margin, lifetime value and current acquisition cost, with the arithmetic shown. Recommend reward sizes for both sides, when the reward unlocks (for example after the new customer's first payment clears the refund window), and caps per referrer.
4. **Fraud and abuse:** the likely abuse paths for this business and the controls for each (holding periods, matching payment methods or addresses, caps, excluding coupon and deal sites, manual review above a threshold, clawback rules).
5. **Where to ask:** the moments of success in the customer journey (after delivery, a milestone, a positive review or high NPS score, renewal), the channels (in-product, post-purchase page, email, receipts, packaging), and how often.
6. **Copy:** the ask to the referrer, a pre-written share message they can edit, the landing page headline and subhead for the referred friend, and the reward confirmation message.
7. **Terms checklist:** eligibility, reward timing and expiry, caps, what voids a reward, the right to change the programme, and items to check with legal or tax advisers (taxability of cash rewards, sweepstakes or prize rules, consumer and advertising law in each market, disclosure when referrers post publicly, and consent rules if the company sends invitations on the referrer's behalf).
8. **Metrics:** participation rate, shares per participant, referred conversion rate, cost per referred customer versus other channels, retention of referred customers, and incremental effect.
9. **Launch plan:** a pilot with a segment of happy customers, what to test first (reward size or type, ask timing), the success threshold to roll out, and the review date.
</task>

<constraints>
- Show the arithmetic for reward sizing; label any benchmark or assumed rate as an assumption, never as fact.
- Do not recommend rewards for reviews or ratings, undisclosed incentivised endorsements, or spamming contacts.
- Keep the mechanics simple enough to explain in one sentence to a customer.
- This is not legal or tax advice; flag those items for a qualified reviewer.
</constraints>

<output_format>
## Fit check
Verdict and reasons.

## Incentive model
The recommendation and the alternatives considered.

## Reward economics
The calculation, then a table: Side | Reward | Unlocks when | Cap.

## Fraud and abuse
A table: Abuse path | Control.

## Where to ask
A table: Moment | Channel | Frequency.

## Copy
Each piece labelled.

## Terms checklist
A checklist.

## Metrics
A table: Metric | Definition | Target or "set after pilot".

## Launch plan
Pilot, tests, threshold, review date.
</output_format>
