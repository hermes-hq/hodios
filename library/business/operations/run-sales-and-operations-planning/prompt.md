---
schema: 1
id: run-sales-and-operations-planning
kind: prompt
title: Set up a monthly S&OP cycle
description: Sets up a monthly sales and operations planning (S&OP) cycle for a small or mid-sized company - data, demand review, supply review, gap options, the executive decision meeting and the pack.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, executive, founder]
subject: [supply-chain]
inputs: [notes, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [s-and-op, demand-review, supply-planning, capacity, consensus-plan, cross-functional, monthly-cycle]
pairs_with:
  prompts: [plan-inventory, plan-production-schedule, map-supply-risk, choose-small-business-kpis]
args:
  - name: business
    description: What the company makes or sells, channels, number of products, rough revenue size, and whether it makes, buys or both.
    type: text
    required: true
  - name: pain
    description: The problems S&OP should fix, for example stockouts and excess at the same time, constant expediting, missed sales targets, sales promising what operations cannot deliver.
    type: text
    required: true
  - name: people
    description: Who would take part - sales, marketing, operations, purchasing, finance, leadership - and their names or roles.
    type: text
    required: true
  - name: data
    description: Optional. What data and tools exist - sales history, forecasts, inventory levels, capacity figures, ERP or spreadsheets.
    type: text
output_contract:
  format: markdown
  sections: [Scope and goals, Monthly calendar, Step 1 Data gathering, Step 2 Demand review, Step 3 Supply review, Step 4 Pre-meeting, Step 5 Executive meeting, Meeting pack, Metrics, First three months]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a supply chain planning lead who has introduced sales and operations planning (S&OP) in growing companies. S&OP is a monthly process where sales, operations and finance agree one plan for the next 3 to 18 months, at product family level, and leadership makes the trade-off decisions. It fails when it becomes a forecast meeting with no decisions, when it works at SKU level and drowns in detail, when sales and operations bring separate numbers, when finance is absent so the plan never ties to the budget, or when leadership skips the meeting and decisions are made in corridors. A good cycle has a fixed calendar, product families, a consensus demand plan with assumptions written down, a supply plan that shows constraints, gap options with costs, and a decisions log.
</context>

<task>
Design a monthly S&OP cycle.

<business>
{{business}}
</business>

<pain>
{{pain}}
</pain>

<people>
{{people}}
</people>
{{#data}}
<data>
{{data}}
</data>
{{/data}}

1. Scope and goals: the planning horizon (suggest a length and why), product families to plan at (propose how to group the user's products), units (volume, value or both), and two to three goals tied to the stated pain.
2. Monthly calendar: a timeline of the five steps in working days after month end, with owner and output of each.
3. Step 1 Data gathering: what data to close and refresh, who does it, and simple quality checks. If data is weak, say what minimum is enough to start.
4. Step 2 Demand review: how sales and marketing build an unconstrained demand plan by family from history plus known changes (promotions, new customers, price changes, launches), with assumptions recorded and forecast accuracy reviewed.
5. Step 3 Supply review: operations and purchasing check the demand plan against capacity, materials, lead times and inventory targets, and show where supply cannot meet demand and at what cost it could.
6. Step 4 Pre-meeting: the cross-functional group prepares options for each gap (for example build ahead, overtime, outsource, allocate, change prices or promotions, accept lower service) with finance putting money on each, and lists decisions needed.
7. Step 5 Executive meeting: a 60 to 90 minute agenda that ends in decisions, with rules (the plan in the meeting is the one plan, no new data on the day, decisions logged with owners).
8. Meeting pack: the pages to include, each as a title and what it shows.
9. Metrics: a short set to track the process and results, for example forecast accuracy or bias, on-time delivery, inventory against target, and plan adherence, with how each is calculated.
10. First three months: how to start simply, which families to begin with, what to expect to go wrong, and how to improve each month.
</task>

<constraints>
- Fit the process to the company's size; for a small company, keep it light (fewer people, a spreadsheet, a shorter meeting) and say so.
- Do not invent the user's sales numbers, capacity or targets; use placeholders where needed.
- Keep S&OP at family level; send SKU scheduling to the separate production or purchasing routines.
- Make sure finance and a decision-maker are in the cycle; if the user has no one in that role, say what that costs and who could fill it.
</constraints>

<output_format>
## Scope and goals
Bullets.
## Monthly calendar
Table: Working day | Step | Owner | Output.
## Step 1 Data gathering
## Step 2 Demand review
## Step 3 Supply review
## Step 4 Pre-meeting
## Step 5 Executive meeting
Each step: inputs, activities, outputs; the executive meeting as a timed agenda.
## Meeting pack
Numbered list of pages.
## Metrics
Table: Metric | Formula | Target-setting note.
## First three months
Month-by-month bullets.
</output_format>
