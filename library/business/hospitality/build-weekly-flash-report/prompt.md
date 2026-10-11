---
schema: 1
id: build-weekly-flash-report
kind: prompt
title: Build a weekly flash report for a restaurant
description: Turns a week's till, purchase and rota figures into a one-page flash report for a restaurant or bar - sales against forecast, covers, food, drink and labour cost, prime cost and three actions.
category: hospitality
version: 1.0.0
status: incubating
stage: [review, operate]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [flash-report, prime-cost, labour-cost, weekly-kpis, covers, average-spend]
pairs_with:
  prompts: [build-staff-schedule, engineer-restaurant-menu, investigate-bar-stock-variance]
args:
  - name: week_figures
    description: This week's figures - net sales by food and drink, covers, purchases (or opening and closing stock) for food and drink, labour hours and cost, comps and waste if recorded - plus last week and the forecast or budget if you have them.
    type: text
    required: true
  - name: notes
    description: Anything that explains the week - weather, an event, a closed day, a new menu, staff off sick. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Key numbers, Costs, What changed and why, Three actions, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hospitality operations director who reads a weekly flash report from each site every Monday. A flash is not the monthly accounts: it is quick, uses the figures available now, and exists so the manager can act this week. The numbers that matter are few: net sales against forecast, covers and average spend, food and drink cost percentages (purchases adjusted for stock movement where possible, since purchases alone swing with delivery timing), labour cost as a share of sales, and prime cost (food, drink and labour cost together). Trends over three or four weeks matter more than one week.

Week figures: {{week_figures}}
{{#notes}}Notes: {{notes}}{{/notes}}
</context>

<task>
1. Headline: one or two sentences on the week in plain words.
2. Key numbers: net sales (food, drink, total) against last week and forecast, covers, average spend per cover, and the change in money and percent.
3. Costs: food cost %, drink cost %, labour cost % and prime cost % with arithmetic. Say whether each is based on purchases only or adjusted for stock, and how that affects reliability. Compare with the site's own previous weeks or budget, not with generic benchmarks.
4. What changed and why: link movements to causes in the figures or notes, separating evidence from guesses.
5. Three actions for this week, each with an owner and the number it should move.
6. Data gaps: what is missing and what to start recording.
</task>

<constraints>
- Use only the figures given. Mark anything missing as `[not given]` and do not estimate it silently.
- Show every calculation once. Round money to whole units and percentages to one decimal.
- Make sure sales are net of sales tax and service charge for cost percentages; if unclear, state the assumption.
- Keep it to one page; the manager reads it in two minutes.
- If you mention a typical range for a cost percentage, say it varies by concept and country and that the site's own history comes first.
</constraints>

<output_format>
## Headline
## Key numbers
Table: Measure | This week | Last week | Forecast | Change.
## Costs
Table: Cost | Amount | % of sales | Basis | Trend.
## What changed and why
Bullets.
## Three actions
Numbered with owner and target.
## Data gaps
Bullets.
</output_format>
