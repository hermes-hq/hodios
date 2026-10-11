---
schema: 1
id: calculate-customer-lifetime-value
kind: prompt
title: Calculate customer lifetime value from transactions
description: Calculates historical and projected customer lifetime value from transaction data by cohort and segment, on gross margin, with young cohorts and the formula's traps handled honestly.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [data-analyst, marketer, founder, financial-analyst]
requires: [none]
subject: [ecommerce, saas, retail]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-lifetime-value, ltv, cohorts, gross-margin, cac-payback]
pairs_with:
  prompts: [build-cohort-analysis, segment-customers, model-unit-economics, analyze-customer-profitability]
  personas: [data-analyst]
args:
  - name: transaction_data
    description: Orders or invoices with customer id, date, revenue, and refunds, ideally with product or category. Say how many customers and months it covers. A sample or summary is fine.
    type: text
    required: true
  - name: business_model
    description: How customers buy (repeat retail purchases, subscription, contracts) and the gross margin or cost of goods per order or product, including shipping and payment fees if you know them.
    type: text
    required: true
  - name: purpose
    description: What the number is for (for example "set a cost per acquisition limit", "compare acquisition channels", "investor deck"), which decides the horizon and level of caution.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Definitions, Historical value by cohort, Projected value, By segment, Sensitivity, How to use it, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who calculates customer lifetime value (LTV) from real transactions. The common mistakes inflate it: using revenue instead of gross margin, applying the textbook "average order value times frequency divided by churn" formula with a churn rate measured over a few months, extrapolating young cohorts as if they behave like old ones, ignoring refunds, and quoting an unbounded "lifetime" when the business only has two years of history. The honest output is cumulative margin per customer by cohort over fixed horizons (12, 24, 36 months), observed where data exists and projected with a stated, conservative method where it does not.
</context>

<task>
Calculate customer lifetime value from this data.

<transaction_data>
{{transaction_data}}
</transaction_data>

Business model and margins: {{business_model}}
{{#purpose}}Purpose: {{purpose}}{{/purpose}}

1. Data checks: refunds and cancellations netted off, test or staff orders removed, duplicate customers (same email, different ids), B2B accounts mixed with consumers, currency and tax treatment (use revenue net of sales tax or VAT).
2. Definitions: customer cohort (month or quarter of first purchase), contribution per order (revenue minus cost of goods, shipping, payment fees and returns cost where known), horizon. State every margin assumption.
3. Historical value by cohort: cumulative contribution per acquired customer at months 3, 6, 12, 24 and 36 where observed, as a cohort table. Each cohort's value is divided by all customers acquired in it, not only those still active.
4. Projected value: extend younger cohorts using the ratio of later to earlier cumulative value seen in mature cohorts (for example month-24 over month-12), or for subscriptions a retention curve fitted to observed retention (which usually flattens, so a constant churn rate understates or overstates depending on period). Cap at 36 months unless the data supports longer, and apply a discount rate if the purpose is financial.
5. By segment: acquisition channel, first product, region or plan, with customer counts; mark segments too small to trust.
6. Sensitivity: show how the 24-month figure moves with margin plus or minus 5 points and with retention 10% better or worse.
7. How to use it: compare with acquisition cost (CAC) as a ratio and as months to pay back CAC from contribution; warn that blended CAC hides expensive channels.
8. Give runnable code (SQL or pandas) for the cohort table.
</task>

<constraints>
- Use margin, not revenue, for the headline. If no margin is given, ask for it or show both with revenue clearly labelled as an upper bound.
- Never present a projected figure as observed; label projections and their method.
- Do not invent margins, CAC or retention rates. Use labelled placeholders only when the user agrees, and show the effect.
- Do not quote a single "lifetime" figure with no horizon.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
The 12- and 24-month contribution per customer, whether observed or projected, and the main caveat.

## Data checks
Bullets.

## Definitions
Cohort, contribution, horizon, discount rate.

## Historical value by cohort
Table: Cohort | Customers | Month 3 | Month 6 | Month 12 | Month 24 | Month 36 (blank where not yet observed).

## Projected value
Method, then table of projected figures marked as projected.

## By segment
Table: Segment | Customers | 12-month value | 24-month value | Confidence.

## Sensitivity
Small table.

## How to use it
LTV to CAC and payback, with the warnings.

## Code
One code block.
</output_format>
