---
schema: 1
id: build-three-year-projections
kind: prompt
title: Build three-year financial projections
description: Builds three-year financial projections for a startup or small business with driver-based revenue, costs, headcount, cash and funding needs, and an assumption register with every figure labelled.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, financial-analyst, executive]
requires: [none]
inputs: [text, dataset]
output: [table, report, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [financial-model, projections, revenue-drivers, startup-finance]
pairs_with:
  prompts: [calculate-cash-runway, build-small-business-budget, forecast-cash-flow]
  personas: [fractional-cfo]
args:
  - name: business_model
    description: What you sell, to whom, how you charge (subscription, one-off sales, services, marketplace fees), how customers are acquired, and the stage of the business.
    type: text
    required: true
  - name: assumptions
    description: The numbers you have or believe (current revenue, customers, prices, conversion, churn, costs, planned hires and salaries, payment terms), each with where it comes from.
    type: text
    required: true
  - name: funding
    description: Cash today, funding already raised or planned (amount and timing), loans or grants. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Assumption register, Revenue build, Costs and headcount, Profit and loss, Cash flow and funding, Scenarios, Sanity checks, Spreadsheet layout]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build three-year projections that an investor, lender or the founders themselves can interrogate. Good projections are driver-based: revenue comes from things the business can measure and influence (leads, conversion, price, churn, capacity), costs follow from a headcount plan and unit economics, and cash differs from profit because of payment terms, stock and capital spending. Every number traces to an assumption in one register, so changing an assumption changes the whole model, and readers can see which assumptions carry the most weight. Projections that start from a target and work backwards to make it fit are the commonest failure; avoid them.

Year 1 is shown monthly, years 2 and 3 quarterly, unless the user asks otherwise.
</context>

<task>
Business model:

<business_model>
{{business_model}}
</business_model>

Assumptions:

<assumptions>
{{assumptions}}
</assumptions>

{{#funding}}Funding: {{funding}}{{/funding}}

1. Build the assumption register first: every driver with its value, unit, source (user data, user belief, benchmark, placeholder) and confidence. Fill gaps with clearly labelled placeholders and list them as questions.
2. Build revenue from drivers suited to the model, for example new customers from leads and conversion, churn and expansion for subscriptions; traffic, conversion, order value and repeat rate for e-commerce; billable headcount, utilisation and rate for services.
3. Build direct costs and gross margin, then operating costs by function from a dated headcount plan (salary plus employer costs) and non-people costs.
4. Produce the profit and loss by period.
5. Produce the cash flow: profit adjusted for customer payment terms, supplier terms, stock, capital spending, tax and loan repayments, plus funding inflows. Show the lowest cash point and when it occurs, and the funding needed to keep a stated minimum balance.
6. Run base, downside and upside scenarios by changing the two or three assumptions that matter most, and show the effect on revenue, profit and lowest cash.
7. Run sanity checks: growth rates, margins and headcount productivity compared with what is plausible for this kind of business, with any outlier called out.
8. Describe a spreadsheet layout (tabs and how they link) so the user can rebuild or extend the model.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent a figure without labelling it. Placeholders say "placeholder, replace" and appear in the register.
- Keep the arithmetic consistent across periods and statements: revenue in the cash flow ties to the profit and loss, and closing cash rolls forward.
- Do not tune assumptions to hit a target; if the user's target is not reached on their assumptions, show the gap and which assumptions would need to change.
- Present projections as scenarios built on assumptions, not forecasts of what will happen.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Five bullets: revenue and profit by year, lowest cash and when, funding need, the two assumptions that matter most.

## Assumption register
Table: driver | value | unit | source | confidence.

## Revenue build
Table by period.

## Costs and headcount
Headcount plan table, then cost table by period.

## Profit and loss
Table by period.

## Cash flow and funding
Table by period with opening cash, operating cash flow, investing, funding and closing cash.

## Scenarios
Table: scenario | changed assumptions | year 3 revenue | year 3 profit | lowest cash.

## Sanity checks
Bullets.

## Spreadsheet layout
Short list of tabs and links.
</output_format>
