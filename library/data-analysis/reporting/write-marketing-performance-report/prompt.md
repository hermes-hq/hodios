---
schema: 1
id: write-marketing-performance-report
kind: prompt
title: Write a monthly marketing performance report
description: Writes a monthly cross-channel marketing report with spend, leads, cost per lead, pipeline or revenue contribution against plan, and next month's moves, using the CRM as the source of truth.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [marketer, manager, executive, founder]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketing-metrics, cost-per-lead, pipeline-contribution, channel-mix, monthly-report]
pairs_with:
  prompts: [analyze-ad-performance, analyze-web-analytics, write-monthly-business-review, check-report-figures]
args:
  - name: channel_data
    description: "This month's figures by channel: spend, leads, qualified leads, opportunities, pipeline or revenue, with last month and the same month last year if you have them. Say which figures come from ad platforms and which from the CRM or store."
    type: text
    required: true
  - name: plan
    description: The monthly plan or targets (budget by channel, lead, opportunity or revenue targets) and any notes on campaigns, launches or tracking changes this month.
    type: text
    required: true
  - name: business_context
    description: "B2B or B2C, typical sales cycle length, attribution model used (first touch, last touch, multi-touch, platform default), and who reads the report. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Results against plan, Channel performance, Pipeline and revenue contribution, What changed and why, Next month's moves, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A marketing report for leadership has to answer one question first: did marketing spend turn into qualified demand and revenue at an acceptable cost. Experienced marketing leads know where these reports go wrong. Ad platforms each claim credit for the same conversion, so channel conversions added up from platform dashboards usually exceed the real total; the CRM or store is the source of truth for leads, opportunities and revenue, and platform numbers are for in-channel optimisation only. Lead volume without lead quality misleads: a channel with cheap leads that never become opportunities is expensive, so cost per qualified lead and cost per opportunity (or cost per acquisition and return on ad spend in B2C) matter more than cost per lead. In B2B, pipeline from this month's spend arrives weeks or months later, so judge lagging channels on cohorts, not on this month alone. Monthly figures are seasonal, so compare with plan and the same month last year as well as last month, and check spend pacing against budget. Changes in tracking, consent banners or the attribution model can move numbers more than any campaign did.

{{#business_context}}Business context: {{business_context}}{{/business_context}}
</context>

<task>
<channel_data>
{{channel_data}}
</channel_data>

<plan>
{{plan}}
</plan>

1. Check the inputs: whether channel totals reconcile to the CRM or store total, which figures are platform-reported, and any tracking or attribution change that breaks comparability. State what you will treat as the source of truth.
2. Compute, per channel and in total: spend against budget, leads, qualified leads, conversion from lead to qualified lead and to opportunity, cost per lead, cost per qualified lead and cost per opportunity (or CPA and ROAS for B2C). Show the comparison with plan, last month and the same month last year where given.
3. Report pipeline and revenue contribution with the attribution model named, and separate pipeline sourced by marketing from pipeline it only influenced.
4. Explain the main movements using only the campaign and context notes supplied; where the cause is not in the data, say so and list what would confirm it.
5. Recommend next month's moves: budget shifts between channels based on cost per qualified result, tests to run, and anything to stop, each tied to a figure in the report.
</task>

<constraints>
- Never add up platform-reported conversions as if they were deduplicated; say when a total is a sum of platform claims.
- Do not judge a channel on cost per lead alone when quality data exists.
- Do not invent benchmarks, causes or campaign details; label any assumption.
- Keep sourced and influenced pipeline separate and name the attribution model every time pipeline is credited.
- Flag months where tracking, consent or attribution changes make the comparison unreliable instead of explaining the movement as performance.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: spend against budget, qualified demand against plan, pipeline or revenue contribution, the main reason for the result, the main move for next month.

## Results against plan
Table: Measure | Plan | Actual | Variance | Last month | Same month last year.

## Channel performance
Table: Channel | Spend | Leads | Qualified leads | Cost per lead | Cost per qualified lead | Cost per opportunity or CPA | Trend. Two or three sentences on standouts.

## Pipeline and revenue contribution
Sourced and influenced pipeline or revenue by channel, with the attribution model named and the lag noted.

## What changed and why
Bullets: movement, supported cause or "cause not in data", and what would confirm it.

## Next month's moves
Table: Move | Figure behind it | Expected effect | Owner.

## Data notes
Bullets: source of truth used, reconciliation gaps, tracking or attribution changes.
</output_format>
