---
schema: 1
id: set-promotion-budget-for-small-business
kind: prompt
title: Set a small business marketing budget
description: Sets a yearly and monthly marketing budget for a small business from revenue, margin, goal and customer value, splits it across always-on, seasonal pushes and tests, and states kill rules.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketing-budget, customer-acquisition-cost, lifetime-value, kill-rules, unit-economics]
pairs_with:
  prompts: [plan-media-budget, write-marketing-plan, choose-marketing-channels, build-annual-marketing-calendar]
  personas: [main-street-growth-advisor, fractional-cmo]
args:
  - name: financials
    description: Last year's revenue, gross margin, average sale or job value, how often customers buy again, how many new customers you get a month, and anything seasonal. Rough numbers are fine; say which are guesses.
    type: text
    required: true
  - name: goal
    description: What the budget is for (for example "grow revenue 20% next year", "fill Tuesday to Thursday", "get 10 more kitchen jobs a quarter").
    type: string
    required: true
  - name: current_spend
    description: What you spend now on marketing, by item (ads, directories, print, sponsorship, agency, software), and what you think each brings in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Numbers used, Budget range, Yearly and monthly split, Kill and scale rules, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help owners of small businesses (trades, shops, restaurants, salons, studios) decide how much to spend on marketing and how to split it. Most small businesses either spend whatever is left at the end of the month or copy a percentage-of-revenue figure with no link to what a customer is worth. A sound budget is worked out two ways and reconciled: top-down (what the business can afford from margin) and bottom-up (customers needed for the goal multiplied by what the business can afford to pay to win each one, based on the gross profit a customer brings over time). Then it is split so the always-on basics are protected, seasonal pushes land when demand is there, and a small slice tests new ideas under clear stop rules.

Goal: {{goal}}
</context>

<task>
<financials>
{{financials}}
</financials>

{{#current_spend}}<current_spend>
{{current_spend}}
</current_spend>{{/current_spend}}

1. If revenue, margin or average sale value are missing, ask for them and stop; a budget cannot be set without them.
2. Numbers used: list each input, marking guesses.
3. Customer value: gross profit per sale (sale value x margin) and over a customer's typical lifetime (purchases per year x years). Show the arithmetic. Set an allowable cost to win a customer as a share of that value, stating the share chosen and why (lower when cash is tight or repeat buying is uncertain).
4. Bottom-up: new customers needed for the goal (allowing for repeat customers and normal churn) x allowable cost per customer.
5. Top-down: a share of revenue the business can afford from its margin. Rules of thumb for small businesses are often a low single-digit to around ten percent of revenue, varying widely by sector and growth stage; label it as such.
6. Reconcile into a budget range (floor, recommended, stretch) and say what each level buys.
7. Split the recommended amount by year and month: always-on (profile, website, reviews, email, directories that work) usually the largest share, seasonal pushes timed to demand, and a test slice (often around a tenth). Show a monthly table that follows the seasonality.
8. Kill and scale rules: for each paid line, the cost per enquiry or customer at which it is cut, the review date, and the result that earns more budget. Review the current spend against these rules.
</task>

<constraints>
- Use only supplied numbers; label every rule of thumb and assumption. Arithmetic must add up exactly.
- Do not recommend borrowing to fund marketing, specific financial products or tax treatments; for cash-flow or tax questions, suggest talking to an accountant.
- If the goal is unrealistic for the margin (the allowable cost per customer is below any plausible cost), say so plainly and show which lever (price, repeat rate, conversion) would change it.
- Do not promise results from spend.
{{> output/uncertainty}}
</constraints>

<output_format>
## Numbers used
Table: Input | Value | Source (given or guess).

## Budget range
Customer value and allowable cost arithmetic, bottom-up and top-down figures, then floor, recommended and stretch with what each buys.

## Yearly and monthly split
Table: Line | Type (always-on, seasonal, test) | Yearly | Monthly or months active. A month-by-month total row.

## Kill and scale rules
Table: Line | Measure | Cut if | Scale if | Review date.

## Assumptions and questions
Bullets.
</output_format>
