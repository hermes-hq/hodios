---
schema: 1
id: forecast-website-traffic
kind: prompt
title: Forecast website traffic
description: Forecasts site sessions or users by channel with seasonality, tracking changes, content and campaign plans and known events, plus a weekly alert band to spot problems early.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, data-analyst, content-creator, product-manager]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [web-analytics, organic-search, channels, seasonality, alert-thresholds]
pairs_with:
  prompts: [diagnose-organic-traffic-drop, forecast-time-series, monitor-forecast-drift]
args:
  - name: history
    description: "Weekly or monthly sessions or users by channel (organic search, paid, direct, referral, email, social) for as long as available, ideally two years or more."
    type: text
    required: true
  - name: changes
    description: "Known past and planned changes: analytics or consent-banner changes, site migrations, redesigns, content plans, campaigns, paid budgets, launches. Optional."
    type: text
  - name: horizon
    description: How far ahead, and what the forecast is for (targets, server capacity, ad inventory, content planning).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Data checks, Forecast by channel, Planned effects, Total and range, Alert band]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Web traffic is a sum of channels that behave differently. Organic search follows seasonality of searches plus slow trends from content and rankings, and shifts suddenly with search-engine updates nobody can predict. Paid traffic follows budget. Email and social follow the send and posting calendar. Direct traffic grows with brand awareness and absorbs tracking gaps. Experienced analysts forecast each channel separately and then add them up. Before forecasting, they check the history for measurement breaks rather than real changes: a switch of analytics tool, a cookie consent banner (which can remove a large share of measured sessions overnight), bot filtering, or changed channel rules. Those are level shifts to adjust, not trends. A useful traffic forecast also produces an alert band so a drop outside normal variation is noticed in days, not at month end.
</context>

<task>
Forecast traffic {{horizon}}.

<history>
{{history}}
</history>
{{#changes}}

<changes>
{{changes}}
</changes>
{{/changes}}

1. Check the data: measurement breaks (tool changes, consent banners, filters, channel definition changes), spikes from one-off events or bots, and missing periods. Adjust or split the history at breaks and say how.
2. Forecast each channel on its own: organic with yearly and weekly seasonality and its recent trend; paid from planned budget times recent sessions per unit of spend (with diminishing returns noted); email and social from planned volume; direct and referral from trend and seasonality.
3. Add planned effects separately and modestly: new content takes months to rank, so ramp its expected traffic; campaigns have a start and an end; migrations often dip traffic temporarily. State each effect's size and source.
4. Add channels to a total; give ranges per channel and in total, wider for organic beyond a few months because of search-engine changes.
5. Build an alert band for weekly monitoring: the expected value per week with a lower bound (for example the 10th percentile from backtest errors) and what to check when traffic falls below it.
6. Give the method and, if the user wants code, a short Python or spreadsheet approach.
</task>

<constraints>
- Do not invent search volumes, ranking gains or industry growth rates; use the data and plans given or label assumptions.
- Never promise organic traffic growth from content or SEO work; give a range and a lag.
- Treat measurement breaks as adjustments, not as demand changes.
- If history is under a year, say yearly seasonality cannot be estimated and use what is known.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Total forecast, range, the largest channel risk.

## Data checks
Bullets: breaks found and how they were handled.

## Forecast by channel
Table: period | organic | paid | direct | referral | email | social | total.

## Planned effects
Table: change | channel | size | timing | source.

## Total and range
Low, central and high totals.

## Alert band
Weekly expected values and lower bounds, and the triage checklist.
</output_format>
