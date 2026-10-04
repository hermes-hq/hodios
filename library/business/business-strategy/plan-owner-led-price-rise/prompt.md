---
schema: 1
id: plan-owner-led-price-rise
kind: prompt
title: Plan a small business price rise
description: Decides how much to raise prices and on which items after costs go up, for a cafe, salon, trade or shop - margin effect, sales you can afford to lose, rounding and timing.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [retail, hospitality]
requires: [none]
inputs: [text, dataset]
output: [table, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [price-increase, cost-inflation, gross-margin, price-rounding, menu-prices]
pairs_with:
  prompts: [design-pricing, price-services, calculate-break-even]
  personas: [small-business-advisor]
args:
  - name: business
    description: What you sell, who your customers are, how often they buy, and what nearby competitors charge for comparable items if you know.
    type: text
    required: true
  - name: cost_changes
    description: The cost increases - ingredients, products, wages, rent, energy, fuel - with old and new amounts or percentages, and when they take effect.
    type: text
    required: true
  - name: current_prices
    description: Your price list with the cost per item or job if known, and your best sellers. Optional; the plan uses rough splits without it.
    type: text
output_contract:
  format: markdown
  sections: [Cost pressure, Price rise needed, Where to raise, New price list, Sales you can afford to lose, Timing and rollout, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an owner of a cafe, salon, trades firm or shop respond to cost increases with a price rise they can defend. Owners usually wait too long and then raise everything by the same percentage, which over-charges on the items customers compare (a flat white, a men's cut, a call-out fee) and under-charges where nobody notices. A better rise protects cash margin, not just percentage margin, treats "known value items" carefully, rounds to natural price points, and knows how much volume it can lose before profit falls. You work with the figures given and say plainly where you are estimating.
</context>

<task>
<business>
{{business}}
</business>

<cost_changes>
{{cost_changes}}
</cost_changes>

{{#current_prices}}
<current_prices>
{{current_prices}}
</current_prices>
{{/current_prices}}

1. Cost pressure: convert each increase to an annual amount and to a share of sales. Total it. A percentage rise needs the annual spend on that cost ("suppliers up 10%" needs the yearly supplier bill). If annual sales are not given, estimate them only from figures the user gave (average price x customers or jobs per week x weeks open) and say so; otherwise ask for annual sales, gross margin and the spend behind each percentage, and mark them [X].
2. Price rise needed: the average rise that keeps last year's cash profit, and the rise that keeps the gross margin percentage. Show both with the arithmetic.
3. Where to raise: sort items into known value items (the ones customers remember and compare), add-ons and extras, premium or loyal-customer items, and items whose own costs rose most. Raise least on known value items, more on extras, specialised services and low-visibility items; check each against competitor prices if given.
4. New price list: round to natural price points (for example .50 or whole units, or the local equivalent) and avoid crossing a psychological threshold on best sellers unless the margin requires it. If no price list is given, show the method on three example items and ask for the list.
5. Sales you can afford to lose: for the average rise, the volume drop that leaves gross profit unchanged = rise % / (gross margin % + rise %). Explain what that means in customers per week.
6. Timing and rollout: when to change (start of a month, with new menus or a season change), one rise rather than many small ones, giving regular and contract customers notice, and a four-week check on sales, average spend and complaints.
7. Check that all arithmetic adds up before answering.
</task>

<constraints>
- Use only given prices and costs. Never invent competitor prices; if they matter, list which to check.
- Label any rule of thumb as such.
- If cost changes or what the business sells are missing, ask and stop. If sales or spend figures are missing, ask for them, and still show the method with [X] placeholders.
- Do not suggest hidden fees, shrinking portions without telling customers, or misleading price displays.
- Do not write customer announcements here; give one short line staff can use when a customer asks why prices changed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cost pressure
Table: Cost | Annual increase | Share of sales. Total row.
## Price rise needed
Two figures with arithmetic, then which one you recommend and why, in two sentences.
## Where to raise
Table: Group | Items | Suggested rise | Reason.
## New price list
Table: Item | Old price | New price | Change % | Note.
## Sales you can afford to lose
Formula, result, and the result in customers or jobs per week.
## Timing and rollout
Bullets with dates or weeks.
## Assumptions and questions
Bullets.
</output_format>
