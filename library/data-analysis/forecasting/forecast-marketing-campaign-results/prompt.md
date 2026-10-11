---
schema: 1
id: forecast-marketing-campaign-results
kind: prompt
title: Forecast a campaign's results
description: Forecasts leads, sales and cost per result for a planned campaign budget from funnel rates with diminishing returns and ranges, or works back from a sales target to the budget needed.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, business-analyst, manager]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [marketing-funnel, cost-per-lead, diminishing-returns, paid-media, roi]
pairs_with:
  prompts: [plan-media-budget, present-forecast-uncertainty, review-forecast-assumptions]
args:
  - name: campaign
    description: "The campaign: channels, budget (or the sales or lead target to work back from), dates, offer, audience, and what counts as a lead and a sale."
    type: text
    required: true
  - name: benchmarks
    description: "Past results to base rates on: cost per click or per thousand impressions, click-through, landing-page conversion, lead-to-sale rate, order value, time from lead to sale, ideally per channel and at different spend levels."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Funnel, Forecast, Range, Working back from the target, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Campaign forecasts usually fail in three ways. They assume results scale linearly with budget, when in practice costs per click or impression rise and conversion falls as spend reaches beyond the most responsive audience (diminishing returns). They multiply best-case rates at every funnel step, so small optimism at each step compounds. And they ignore the lag from lead to sale, counting sales inside the campaign window that arrive weeks later. Marketers who forecast well build the funnel step by step (spend to impressions or clicks, clicks to leads, leads to qualified, qualified to sales, sales to revenue), use their own past rates at comparable spend levels, discount rates for a new audience or channel, give a range from the spread of past campaigns, and can run the funnel backwards: from a sales target to the leads, clicks and budget needed.
</context>

<task>
<campaign>
{{campaign}}
</campaign>

<benchmarks>
{{benchmarks}}
</benchmarks>

1. Lay out the funnel per channel with the rate used at each step and its source (which past campaign, what spend level).
2. Adjust rates for scale and newness: if the budget is well above past spend, raise cost per click or lower conversion and say by how much and why; if the audience or channel is new, widen the range.
3. Forecast per channel and in total: impressions or clicks, leads, qualified leads, sales, revenue, cost per lead, cost per sale, and return on spend. Show the arithmetic for one channel in full.
4. Give low, central and high cases from the spread of past campaigns, varying the few rates that matter most.
5. Time it: when leads arrive and when sales from them will land, given the lead-to-sale lag.
6. If a target was given, or on request, run the funnel backwards to the budget needed, noting that diminishing returns make the required budget grow faster than the target.
7. List what to measure in the first week to re-forecast early.
</task>

<constraints>
- Use rates the user gives; if none exist for a step, say so and mark an explicit placeholder rather than an invented industry benchmark.
- Do not assume linear scaling beyond the spend levels in the history without saying so.
- Never present the forecast as guaranteed results; this is a planning estimate.
- Show arithmetic and label approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Central leads, sales and cost per sale, the range, and the riskiest assumption.

## Funnel
Table: step | rate | source, per channel.

## Forecast
Table: channel | spend | clicks | leads | sales | revenue | cost per lead | cost per sale.

## Range
Low, central and high, and which rates change.

## Working back from the target
Budget, clicks and leads needed for the target, or "not requested".

## What to measure
Bullets for the first week.
</output_format>
