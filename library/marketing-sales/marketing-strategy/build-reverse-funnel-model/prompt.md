---
schema: 1
id: build-reverse-funnel-model
kind: prompt
title: Build a reverse funnel model from a revenue target
description: Works back from a revenue target to the deals, opportunities, qualified leads, leads and traffic needed each month by source, with sales-cycle lag, gaps against today and the implied budget.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, sales-rep]
requires: [none]
inputs: [text, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [demand-waterfall, pipeline-targets, conversion-rates, funnel-math, target-setting]
pairs_with:
  prompts: [plan-b2b-demand-generation, forecast-marketing-campaign-results, define-marketing-kpis, write-marketing-plan]
args:
  - name: target
    description: The revenue or new-customer target and period (for example 2.4M USD new annual revenue next fiscal year), and whether it is new business, expansion or both.
    type: text
    required: true
  - name: funnel_data
    description: Average deal size, conversion rates between stages (visit to lead, lead to qualified, qualified to opportunity, opportunity to won), sales cycle length, and how deals split by source (marketing, sales outbound, partners, referrals). Real history beats guesses.
    type: text
    required: true
  - name: current_volumes
    description: What you produce today per month at each stage, and cost per lead or per opportunity by channel if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Inputs and assumptions, Funnel by period, Split by source, Gap against today, Implied budget, Sensitivity, What to track monthly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a revenue operations analyst. A reverse funnel (sometimes called a demand waterfall) turns a revenue target into the volume each stage must produce and when. The common mistakes: using a single blended conversion rate across sources that convert very differently, ignoring the sales cycle so leads created in month eleven are counted toward this year's revenue, mixing new and expansion revenue, and treating the output as precise when small changes in win rate swing the whole model. A good model is built per source, shifted by cycle length, compared with today's volumes, and shows which rate matters most.
</context>

<task>
Target:
{{target}}

<funnel_data>
{{funnel_data}}
</funnel_data>

{{#current_volumes}}
<current_volumes>
{{current_volumes}}
</current_volumes>
{{/current_volumes}}

1. If deal size or win rate is missing and cannot be reasonably assumed, ask and stop. Otherwise list every input and mark each "your data" or "assumption".
2. Deals needed: target divided by deal size, by period. Flag if the target mixes new and expansion revenue and model them separately.
3. Work back stage by stage to opportunities, qualified leads, leads and visits, per source, using source-specific rates where given.
4. Apply the sales cycle: shift each stage back by the typical time to close so the model shows when leads must be created for revenue to land in each period. Point out the months where it is already too late for this year's target.
5. Gap against today: compare required monthly volumes with current volumes per stage and source.
6. Implied budget: if cost per lead or per opportunity is given, compute the spend implied for the marketing-sourced share; otherwise leave the formula.
7. Sensitivity: show how the required volumes change if win rate or the weakest conversion rate moves by plus or minus 20%, and say which lever is cheapest to improve.
8. What to track monthly: the four or five numbers that show early whether the plan is on track.
</task>

<constraints>
- Show every calculation; round up deals and opportunities to whole numbers.
- Never use made-up industry benchmark rates as facts; label assumptions and say how to replace them.
- If the user's data is a spreadsheet extract, use its actual numbers and say which columns you used.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three bullets: volumes needed per month, biggest gap, cheapest lever.

## Inputs and assumptions
A table: Input | Value | Source.

## Funnel by period
A table: Period | Visits | Leads | Qualified | Opportunities | Deals | Revenue.

## Split by source
A table per source or one table with a source column.

## Gap against today

## Implied budget

## Sensitivity
A small table of scenarios.

## What to track monthly
</output_format>
