---
schema: 1
id: test-hobby-for-selling
kind: prompt
title: Test a hobby as a business
description: Tests whether a hobby such as baking, pottery, woodworking or photography can become a paid business without killing the joy - true unit price, hours, a small demand test and limits on custom work.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, artist]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [hobby-to-business, true-cost-pricing, makers, demand-test, custom-orders, creative-burnout]
pairs_with:
  prompts: [plan-side-business, plan-market-stall, price-services]
  personas: [craft-maker-mentor]
args:
  - name: hobby
    description: The hobby and what you would sell (for example "wheel-thrown mugs and bowls", "celebration cakes", "pet portraits from photos").
    type: string
    required: true
  - name: current_sales
    description: Anything you already sell or make for others - what, how often, for how much, and how people found you. Leave empty if you have not sold yet.
    type: text
  - name: hours_willing
    description: Hours a week you would happily give to making to sell, on top of making for yourself.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [What you want from this, True price per item, Hours reality check, Small demand test, Limits that protect the joy, Verdict and next step]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide whether to turn a hobby into something that earns money. Friends saying "you should sell these!" is not demand. The usual story: the maker prices from materials only, sells to friends at a "mates' rate", says yes to every custom request, and within months the thing they loved has become late-night unpaid work they dread. The honest test has two parts: does it pay when all time and costs are counted, and does selling still leave the parts of the hobby they love. Sometimes the right answer is a small, capped side income, or staying a hobby.

Hobby: {{hobby}}
Hours a week for selling: {{hours_willing}}
</context>

<task>
{{#current_sales}}
<current_sales>
{{current_sales}}
</current_sales>
{{/current_sales}}

1. What you want from this: ask the person to rank pocket money, covering the cost of the hobby, a real second income, recognition, and an eventual full-time business; tailor the rest to the top two. If unknown, give the plan for each of the two most likely and ask.
2. True price per item: for one typical item, add materials, a share of tools and equipment wear, energy (kiln, oven), packaging, selling fees, and the maker's time at a stated hourly rate (including design, photography, messaging, delivery); compare with what similar items sell for on local markets or online (as a range to check, not invented). Show the arithmetic with their numbers and placeholders.
3. Hours reality check: how many items the hours given allow per week and month, the income that produces at the true price, and what admin and selling time eats from making time.
4. Small demand test: a four-week test that asks strangers to pay - a small batch at the true price at a market, online shop listing, a local shop on consignment, or an open studio - with a target number of sales to strangers and what to record.
5. Limits that protect the joy: rules decided before selling - a cap on custom orders per month, a fixed menu instead of anything-goes commissions, lead times, a deposit for custom work, days that are hobby-only, work they will never take, and a rule for friends and family pricing.
6. Verdict and next step: based on the numbers, one of - keep it a hobby, a small capped side income, or test growing it - with the reason and the next action.
</task>

<constraints>
- Never invent market prices or demand; give ranges only as things to check by looking at comparable listings and stalls.
- Mention that selling food, cosmetics, candles, toys or anything for children usually involves safety rules to check before selling; do not state them.
- Encouraging but honest: if the true price is far above what people pay, say so plainly.
- If they do not give costs or time per item, use [X] placeholders and ask for them.
</constraints>

<output_format>
## What you want from this
Ranked list or the question to answer.
## True price per item
Table: Cost | Amount | Notes. Then the price at the stated hourly rate.
## Hours reality check
Arithmetic in three to five lines.
## Small demand test
Plan with the target and a tracking table.
## Limits that protect the joy
Numbered rules.
## Verdict and next step
Two to four sentences.
</output_format>
