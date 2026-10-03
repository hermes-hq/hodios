---
schema: 1
id: write-marketing-plan
kind: prompt
title: Write a one-year marketing plan
description: Writes a one-year marketing plan for a small business with goals worked back from revenue, audience, positioning, a focused channel plan, monthly calendar, budget split and measures.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [annual-plan, local-business, channel-plan, marketing-budget, marketing-calendar]
pairs_with:
  prompts: [plan-marketing-campaign, write-positioning-statement, build-ideal-customer-profile, plan-media-budget]
  personas: [growth-marketer]
args:
  - name: business_and_goals
    description: What the business sells, to whom and where, average sale value and margin, how customers find you today, seasonality, the team's time for marketing each week, and the goal for the year (for example "grow revenue from 400k to 520k" or "fill 30 more memberships").
    type: text
    required: true
  - name: budget
    description: The marketing budget for the year or per month, and whether it includes tools, freelancers and ad spend (for example "1,500 USD a month including ads").
    type: string
    required: true
  - name: current_channels
    description: Channels you use now and what each has produced (for example "Instagram 2 posts a week, few enquiries; Google Business Profile, most calls; email list of 900, rarely sent"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Situation, Goals and funnel math, Audience and positioning, Channel plan, Monthly calendar, Budget, Measures and review rhythm, Risks and assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a fractional marketing director for small businesses. Small-business marketing plans fail in two ways: they copy a big-company template and list every channel, or they are a wish list with no numbers. A plan that gets used is short, built on the business's real numbers, focused on the two to four channels the team can run well with the time and money available, and reviewed monthly against a few measures.

You work backwards from the goal: revenue needed, then customers, then leads or visits, then what each channel must deliver. Where the business has no data, you make assumptions explicit so the first months of the plan replace them with real numbers.
</context>

<task>
Write a one-year marketing plan.

<business_and_goals>
{{business_and_goals}}
</business_and_goals>

Budget: {{budget}}

{{#current_channels}}
<current_channels>
{{current_channels}}
</current_channels>
{{/current_channels}}

1. If you cannot tell what the business sells, who buys it, or what the goal for the year is, ask up to three short questions and stop. If average sale value, margin, conversion rates or the team's time are missing, use labelled assumptions.
2. Situation: what is working and what is not in the current channels, the main constraint (money, time, awareness, conversion or retention), and seasonality.
3. Goals and funnel math: turn the revenue or customer goal into new customers per month, then into leads or visits using the business's conversion rates (or labelled assumptions), and show the arithmetic. Add one retention or repeat-purchase goal if repeat business matters.
4. Audience and positioning: one or two priority customer segments described by need and situation, and a one-sentence positioning with the reason to choose this business.
5. Channel plan: choose two to four channels that fit the audience, the budget and the weekly time available. Keep what works, fix what nearly works, and drop what does not. For each channel: role in the funnel, monthly objective, core tactics, weekly time, cost and the measure that shows it works.
6. Monthly calendar for twelve months: seasonal peaks, launches, campaigns and content themes, with the one priority for each month.
7. Budget: split by channel and purpose (ads, tools, freelance help, content production), with about 10% held back for tests, monthly and annual totals matching the budget.
8. Measures and review rhythm: five to seven measures (leading and lagging), targets per quarter, and a monthly 30-minute review agenda with rules for when to cut or double down.
9. Risks and assumptions, each with how to check it in the first 90 days.
</task>

<constraints>
- Never plan more channels than the team's time allows; if the time is unknown, assume one person with a few hours a week and say so.
- No invented market statistics or benchmarks presented as facts. Any typical rate is labelled an assumption to replace with the business's own data.
- The budget table must add up to the stated budget.
- Practical over theoretical: every tactic is something the team could start next week.
- Keep the plan readable in ten minutes: tables for the plan, short bullets for reasoning.
</constraints>

<output_format>
## Summary
Five bullets: goal, focus segment, chosen channels, budget split, first 90-day priority.

## Situation
Bullets.

## Goals and funnel math
The arithmetic from revenue to leads, with each rate marked "your data" or "assumption".

## Audience and positioning
Segments and the positioning sentence.

## Channel plan
A table: Channel | Role | Monthly objective | Tactics | Weekly time | Monthly cost | Measure.

## Monthly calendar
A table: Month | Priority | Campaigns or themes | Notes.

## Budget
A table: Item | Monthly | Annual | Share.

## Measures and review rhythm
Measures with quarterly targets, the monthly review agenda and decision rules.

## Risks and assumptions
A table: Assumption or risk | How to check | By when.
</output_format>
