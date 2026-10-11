---
schema: 1
id: plan-peak-season-ad-push
kind: prompt
title: Plan a peak season ad push
description: Plans paid ads for Black Friday or another seasonal peak, with a budget ramp, bid targets, creative calendar, audience build-up, stock and shipping checks and post-peak retargeting.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, consultant]
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
tags: [black-friday, seasonality, budget-ramp, creative-calendar, cyber-week, peak-trading]
pairs_with:
  prompts: [plan-holiday-sale-campaign, pace-ad-budget, calculate-break-even-roas, choose-bidding-strategy]
  personas: [paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: business
    description: What you sell, price range, margins, countries, and the peak event (Black Friday and Cyber Monday, Christmas, Mother's Day, back to school, a local holiday).
    type: text
    required: true
  - name: offer_and_dates
    description: The promotion, its dates, and shipping cut-off dates.
    type: text
    required: true
  - name: budget_and_targets
    description: Peak budget, platforms, normal daily spend, break-even ROAS or CPA, and last year's peak results if any.
    type: text
    required: true
  - name: constraints
    description: Stock limits on key products, warehouse or team capacity, creative production capacity. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Timeline, Budget and bids, Creative calendar, Operations checks, After the peak]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants to make the most of a seasonal peak with paid ads. Peaks reward preparation and punish improvisation. What experts know: costs per thousand impressions rise sharply as every advertiser bids at once, so the margin of the offer must survive higher acquisition costs (compute the peak break-even, not the normal one); the weeks before the peak are for building audiences (engagers, site visitors, email sign-ups for early access) more cheaply; new campaigns and creative should launch early enough to leave learning before the peak days, and edits during the peak should be minimal; automated bidding needs warning of a short-term conversion rate jump (Google Ads offers seasonality adjustments for this) and targets may need loosening to win volume when conversion rates rise; budget is front-loaded to the highest-converting days and caps checked so campaigns do not run out by midday; creative changes by phase (teaser, early access, main sale, last chance, shipping cut-off, extended or Cyber offer); and after the peak, buyers are excluded from sale ads and moved to retention, while non-buyers who engaged are retargeted.
</context>

<task>
Business: {{business}}
Offer and dates: {{offer_and_dates}}
Budget and targets: {{budget_and_targets}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Assumptions: peak break-even ROAS or CPA after the discount (show the calculation), expected cost increase stated as an assumption to check against last year's data, and the role of email and SMS alongside ads.
2. Timeline: phases from about six weeks out to two weeks after, with dates: audience building, launch of peak campaigns and creative, early access, main sale, last chance and shipping cut-off, extensions, and post-peak.
3. Budget and bids: daily budget per phase and platform, budget caps to check, bid targets per phase, seasonality adjustments for automated bidding where available (with dates), and a rule for adding budget when results beat target.
4. Creative calendar: assets per phase and platform, messages, offer display, countdowns and cut-off messaging, with production deadlines working back from launch dates.
5. Operations checks: stock levels on promoted products and what to do when items sell out (feed and ad updates), site speed and checkout tests, promo code tests, customer service capacity, shipping cut-offs shown in ads.
6. After the peak: exclusions for buyers, retargeting of engagers, data exclusions or adjustments so automated bidding does not learn from the peak, and a debrief template.
</task>

<constraints>
- Do not invent CPM increases, conversion rates or platform feature availability; use last year's data or labelled assumptions and tell the user to confirm features in each platform.
- Do not plan fake urgency (false countdowns, fake stock levels); all deadlines must be real.
- Keep total spend within the stated budget and show the phase totals.
- Advertised discounts must match real prices; flag that many countries regulate reference prices for discounts.
</constraints>

<output_format>
## Assumptions
Break-even calculation and stated assumptions.

## Timeline
A table: Phase | Dates | Goal | Key actions.

## Budget and bids
A table: Phase | Platform | Daily budget | Bid target | Notes. Then phase totals.

## Creative calendar
A table: Phase | Asset | Platform | Message | Due date.

## Operations checks
Checklist with owner and date.

## After the peak
Checklist and debrief questions.
</output_format>
