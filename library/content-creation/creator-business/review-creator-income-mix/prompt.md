---
schema: 1
id: review-creator-income-mix
kind: prompt
title: Review creator income mix
description: Reviews a creator's actual income by source and month - concentration on one platform or sponsor, volatility, hours behind each source, slow payers - and sets a cash buffer and next priorities.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, writer]
inputs: [dataset, notes]
output: [report, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [income-diversification, revenue-concentration, cash-flow, quarterly-review, effective-hourly-rate]
pairs_with:
  prompts: [plan-creator-monetization, reduce-platform-dependence, evaluate-platform-exclusive-deal]
  personas: [creator-business-manager]
args:
  - name: income
    description: Income by source by month for at least the last six months if you have it (platform payouts, ads, sponsors by brand, affiliates, memberships, merch, services), when each was paid, and your monthly business and personal costs.
    type: text
    required: true
  - name: time
    description: Optional. Rough hours per month on each income source or type of content.
    type: text
  - name: country
    description: Optional. Your country and currency.
    type: string
output_contract:
  format: markdown
  sections: [Income at a glance, Concentration, Volatility and cash flow, Time and return, Cash buffer, Next quarter priorities, For your accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Creator income is lumpy and fragile in ways a single monthly total hides. The risks to look for: concentration (one platform's payouts or one sponsor making up most of the income, so a policy change or a lost deal halves it), volatility (big months followed by empty ones), payment timing (sponsors paying 30 to 90 days after work, platforms paying monthly with thresholds), and time cost (a source that looks healthy but eats most of the week). A useful quarterly review sorts income into stable or recurring (memberships, retainer sponsors) and one-off, calculates rough earnings per hour by source, and sets a cash buffer in months of costs sized to the volatility. It informs decisions about what to grow; it is not tax planning.
</context>

<task>
<income>
{{income}}
</income>

{{#time}}
<time>
{{time}}
</time>
{{/time}}

{{#country}}Country: {{country}}{{/country}}

1. **Income at a glance:** totals by source and month in a table, the average month, the worst month, and the share of each source. Show the arithmetic. If data is missing or mixed (paid versus earned dates), say how you treated it.
2. **Concentration:** the share from the largest platform, the largest single sponsor and the largest source, and what would happen to the average month if each disappeared.
3. **Volatility and cash flow:** recurring versus one-off income, the spread between best and worst months, money earned but not yet paid, and slow payers.
4. **Time and return:** if hours are given, rough earnings per hour by source, with caveats.
5. **Cash buffer:** a suggested buffer in months of costs, explained by the volatility, and how to build it from good months.
6. **Next quarter priorities:** two or three actions (for example grow a recurring source, reduce dependence on one sponsor, chase overdue invoices, drop a low-return activity), each tied to a number above.
7. **For your accountant:** questions about tax set-asides, quarterly payments, and business structure for an accountant, without giving tax advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the user's figures; do not invent income, benchmarks or what other creators earn.
- Do not give tax, investment or business-structure advice; list questions for an accountant.
- Label any assumption (for example treating a payment as earned in the month it was invoiced).
- Keep recommendations within the creator's stated time.
</constraints>

<output_format>
## Income at a glance
Table: source | month columns | total | share.

## Concentration
## Volatility and cash flow
## Time and return
Table: source | hours | income | per hour.

## Cash buffer
## Next quarter priorities
Numbered, each with the number behind it.

## For your accountant
</output_format>
