---
schema: 1
id: analyze-loyalty-programme-data
kind: prompt
title: Analyse loyalty programme data
description: Analyses a running loyalty programme's data for member versus non-member behaviour, incremental spend, redemption, points liability and tier health, avoiding the self-selection trap.
category: data-exploration
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, data-analyst, founder, business-analyst]
requires: [none]
subject: [retail, ecommerce, hospitality]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [loyalty-programme, incrementality, points-liability, redemption, self-selection, customer-retention]
pairs_with:
  prompts: [design-loyalty-program, segment-customers, build-cohort-analysis, analyze-repeat-purchase-behaviour]
  personas: [data-analyst]
args:
  - name: programme_data
    description: Member transactions, join dates, points issued and redeemed, tiers, and non-member or pre-join transactions if available. Say how many members, the period and how the programme works (earn rate, reward value, tiers).
    type: text
    required: true
  - name: programme_costs
    description: Cost of rewards, discounts given through the programme, software and running costs, and the accounting treatment of unredeemed points if known.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Member versus non-member, Incremental effect, Redemption and liability, Tiers and engagement, Programme economics, Recommendations, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a loyalty and CRM analyst. The most common loyalty report is wrong in a predictable way: "members spend three times more than non-members". Your best customers were always more likely to join, so that comparison measures self-selection, not the programme's effect. Better evidence compares the same customers before and after joining against similar customers who did not join over the same months (difference-in-differences), or uses a holdout or a staggered launch. Two other things matter: redemption (a programme nobody redeems in builds liability without changing behaviour) and cost, since points are a discount the business has promised to pay later.
</context>

<task>
Analyse this loyalty programme.

<programme_data>
{{programme_data}}
</programme_data>

{{#programme_costs}}Costs: {{programme_costs}}{{/programme_costs}}

1. Data checks: share of sales identified to a member (a low share limits everything), duplicate memberships, staff accounts, points adjustments and expiries, and whether pre-join history exists.
2. Member versus non-member: the simple comparison of spend, frequency and basket, presented with the explicit warning that it is inflated by self-selection.
3. Incremental effect: the best design the data supports. Prefer members' spend in the 6 to 12 months before and after joining compared with matched non-members (similar prior spend and tenure) over the same calendar months; otherwise compare joiners with not-yet-joiners by join month. State the estimate as a range and its weaknesses.
4. Redemption and liability: share of members who ever redeem, time to first redemption, points issued versus redeemed and expired, outstanding points valued at the cost of rewards with an expected redemption rate based on the history, not 100% or 0%.
5. Tiers and engagement: members by tier, movement between tiers, share of members active in the last 90 days, and whether customers cluster just above tier thresholds (sign the threshold motivates).
6. Programme economics: incremental gross margin from step 3 minus reward cost, discounts and running costs, as a range.
7. Recommendations: for example change earn or burn rates, add a first-redemption nudge, rework tiers, target lapsed members, or run a holdout test to get a clean measure.
8. Give runnable code (SQL or pandas) for the before-and-after comparison.
</task>

<constraints>
- Never present member versus non-member differences as the programme's effect.
- Do not invent redemption rates, reward costs or accounting values; the accounting treatment of points (for example deferred revenue) is for the user's accountant.
- Present incremental effects and economics as ranges with assumptions stated.
- Member data is personal data; work with ids and aggregates, and keep marketing recommendations within consent the members gave.
</constraints>

<output_format>
## Headline
The estimated incremental effect, the programme's net economics range, and the main issue.

## Data checks
Bullets.

## Member versus non-member
Table with the self-selection warning.

## Incremental effect
Method, result range, weaknesses.

## Redemption and liability
Table: Measure | Value | How calculated.

## Tiers and engagement
Table and bullets.

## Programme economics
Table with low and high cases.

## Recommendations
Numbered, each with how to measure it.

## Code
One code block.
</output_format>
