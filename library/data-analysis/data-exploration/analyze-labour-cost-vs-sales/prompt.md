---
schema: 1
id: analyze-labour-cost-vs-sales
kind: prompt
title: Analyse labour cost against sales by hour
description: Compares staff hours and wage cost with sales by hour and weekday for a shop, cafe or restaurant to find over- and under-staffed periods, with a revised staffing pattern to test.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [operations-manager, manager, founder, business-analyst]
requires: [none]
subject: [hospitality, retail]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [labour-cost, staffing, sales-per-labour-hour, rota, scheduling]
pairs_with:
  prompts: [build-weekly-flash-report, analyze-sales-data, analyze-store-footfall-conversion, speed-up-cafe-morning-rush]
  personas: [data-analyst]
args:
  - name: sales_data
    description: Sales by hour (or by transaction with time) for at least four typical weeks, with transactions or covers if available. Note holidays, events or closures in the period.
    type: text
    required: true
  - name: staffing_data
    description: Rota or clock-in data by hour and role (for example kitchen, floor, till, stockroom), hourly wage cost including employer on-costs, and fixed tasks such as opening, closing, deliveries and prep that do not depend on customers.
    type: text
    required: true
  - name: business_context
    description: Type of business, opening hours, minimum staffing for safety or law, contract types (fixed-hours staff, flexible staff) and the labour cost target if you have one.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Daily picture, Hour-by-hour heatmap, Over- and under-staffed periods, Revised pattern to test, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail and hospitality operations analyst. A weekly labour percentage hides the real problem: most businesses are overstaffed in quiet hours and understaffed at peaks, and the two average out. The useful view is sales (or transactions, or covers) per labour hour for every hour of the week, alongside a fixed floor of hours for opening, closing, deliveries and prep, and a legal or safety minimum crew. Understaffed peaks cost sales through queues and walkouts, so cutting hours is not the only answer; often the right move is shifting hours from quiet afternoons into the lunch or evening rush.
</context>

<task>
Analyse labour cost against sales.

<sales_data>
{{sales_data}}
</sales_data>

<staffing_data>
{{staffing_data}}
</staffing_data>

{{#business_context}}Business context: {{business_context}}{{/business_context}}

1. Data checks: time zones and whether sales are stamped at order or payment, hours paid versus hours scheduled, breaks, managers who are partly on the floor, and unusual days (holidays, weather, events) to exclude from the typical pattern.
2. Daily picture: sales, labour hours, labour cost and labour cost as a percentage of sales by weekday, with the cost including employer on-costs.
3. Hour-by-hour heatmap: for each weekday and hour, average sales, transactions, labour hours on the customer-facing floor, and sales or transactions per labour hour. Separate fixed task hours from customer-driven hours.
4. Over- and under-staffed periods: set a target productivity band from the business's own better-run hours (for example its median to upper-quartile transactions per labour hour) and flag hours well below it (overstaffed) and well above it (understaffed, where service and lost sales are at risk). Rank by money: wage cost in overstaffed hours and estimated sales at risk in understaffed ones, with the method stated.
5. Revised pattern to test: a staffing pattern by hour and role that moves hours from overstaffed into understaffed periods, keeps the minimum crew and fixed tasks, and shows the change in total hours and cost. Note shift-length and contract constraints.
6. How to check it worked over four weeks: labour percentage, transactions per labour hour at peak, queue or ticket times, and sales in previously understaffed hours.
</task>

<constraints>
- Never go below the stated minimum crew or ignore safety, break rules or contracted hours; if these are not given, ask and leave a clearly marked gap.
- Do not invent wage rates, on-costs or sales figures. If on-costs are unknown, show cost with and without a labelled assumption.
- Estimates of lost sales during understaffed peaks are estimates; show the method and a range.
- Employment law on rotas, notice of shift changes and minimum hours differs by country; flag that the pattern must be checked against the user's local rules and contracts.
</constraints>

<output_format>
## Headline
Labour cost percentage, the most overstaffed and most understaffed periods, and the hours that could move.

## Data checks
Bullets.

## Daily picture
Table: Weekday | Sales | Labour hours | Labour cost | Labour percent.

## Hour-by-hour heatmap
Table with weekdays as columns and hours as rows, showing transactions per labour hour.

## Over- and under-staffed periods
Table: Period | Transactions per labour hour | Target band | Money at stake | Note.

## Revised pattern to test
Table by hour and role, with total hours and cost change, then the four-week check.

## Assumptions
Bullets.
</output_format>
