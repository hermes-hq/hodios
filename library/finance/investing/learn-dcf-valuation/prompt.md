---
schema: 1
id: learn-dcf-valuation
kind: prompt
title: Learn discounted cash flow valuation by doing one
description: Walks a learner through a simple discounted cash flow valuation from figures they supply, step by step with the arithmetic shown, and a sensitivity table showing how much assumptions drive it.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, financial-analyst]
subject: [economics]
requires: [none]
inputs: [text, dataset]
output: [explanation, table, quiz]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dcf, valuation, free-cash-flow, discount-rate]
pairs_with:
  prompts: [read-company-financials, summarize-earnings-call, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: company_figures
    description: Recent free cash flow (or operating cash flow and capital spending), revenue and growth history, net debt or net cash, and shares outstanding, from the company's reports.
    type: text
    required: true
  - name: assumptions
    description: Your own assumptions for growth, discount rate and terminal growth, if you have them. Optional; otherwise teaching defaults are used and labelled.
    type: text
output_contract:
  format: markdown
  sections: [The idea, Step 1 Free cash flow, Step 2 Forecast, Step 3 Discount rate, Step 4 Terminal value, Step 5 From enterprise value to per share, Sensitivity, What this does and does not tell you, Check your understanding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A discounted cash flow (DCF) values a business as the present value of the cash it will generate for its owners. It is a disciplined way to make assumptions explicit, not a machine that produces the "true" value. Experienced analysts know where DCFs go wrong: using profit instead of free cash flow; forecasting growth that is far above the economy forever; a terminal value that makes up 70-80% of the result, so small changes in terminal growth or discount rate swing the answer widely; forgetting to subtract net debt (or add net cash) when moving from enterprise value to equity value; and using a discount rate that does not match the cash flows (unlevered free cash flow pairs with a weighted average cost of capital). A sensitivity table across discount rate and terminal growth is the honest way to present the result: as a range.

<company_figures>
{{company_figures}}
</company_figures>
{{#assumptions}}Assumptions: {{assumptions}}{{/assumptions}}
</context>

<task>
1. The idea: explain present value with a one-line example (100 received in a year at 8% is worth about 92.6 today).
2. Step 1 Free cash flow: compute the starting free cash flow from their figures (operating cash flow minus capital spending), and explain any adjustments you made or could not make.
3. Step 2 Forecast: project five years using their growth assumption or a labelled teaching default that fades toward a modest rate; show each year.
4. Step 3 Discount rate: explain in plain terms what the discount rate represents and use theirs or a labelled teaching default, mentioning how analysts build one without requiring the full calculation.
5. Step 4 Terminal value: use the perpetuity growth formula, FCF in year 5 x (1 + g) / (r - g), discount it back, and show what share of the total it makes up.
6. Step 5 From enterprise value to per share: sum the present values, adjust for net debt or net cash, divide by shares outstanding.
7. Sensitivity: a table of value per share across three discount rates and three terminal growth rates.
8. What this does and does not tell you: compare with the price only as a learning exercise, list the assumptions that drive the answer, and note what a DCF misses.
9. Check your understanding: three short questions with answers at the end.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a teaching exercise. Do not say the share is under- or overvalued as advice, or whether to buy or sell it.
- Use only figures supplied; do not pull current financial data for a named company from memory. Mark missing inputs.
- Show every calculation; check the arithmetic, and ensure discount rate exceeds terminal growth.
{{> output/uncertainty}}
</constraints>

<output_format>
## The idea
Short explanation.

## Step 1 Free cash flow
Calculation.

## Step 2 Forecast
Table: year | growth | FCF | discount factor | present value.

## Step 3 Discount rate
Short explanation and the rate used.

## Step 4 Terminal value
Calculation and share of total.

## Step 5 From enterprise value to per share
Calculation.

## Sensitivity
Table: discount rate by terminal growth.

## What this does and does not tell you
Bullets.

## Check your understanding
Three questions with answers.
</output_format>
