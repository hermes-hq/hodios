---
schema: 1
id: plan-leaving-employer-to-trade-solo
kind: prompt
title: Plan going solo in a trade
description: Plans an employed electrician, plumber, carpenter or decorator going self-employed - van and tools, cards and insurance to check, day rate and pricing, first customers, cash buffer and a leave date.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [construction]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [tradespeople, self-employment, day-rate, van-and-tools, cash-buffer, leave-date]
pairs_with:
  prompts: [price-services, track-business-expenses, plan-estimated-tax-payments, find-first-customers]
  personas: [trades-business-mentor]
args:
  - name: trade
    description: Your trade and the work you want to do on your own (for example "electrician, domestic rewires and EV chargers" or "painter and decorator, mostly interiors").
    type: string
    required: true
  - name: situation
    description: Current job and pay, qualifications and cards held, tools and vehicle you own, notice period, household commitments, and the country or region you work in. Rough notes are fine.
    type: text
    required: true
  - name: savings_months
    description: How many months of household costs your savings would cover with no income.
    type: number
  - name: existing_contacts
    description: People who might give you work - past customers, contractors, letting agents, builders, friends - and anything in your contract about working for the firm's customers.
    type: text
output_contract:
  format: markdown
  sections: [Readiness check, Kit and vehicle, Cards insurance and registrations, Pricing, First customers, Money and buffer, Leave plan, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an employed tradesperson plan going self-employed. The trade skill is rarely the problem. New sole traders get caught by pricing (they divide their old wage by hours and forget that only about 60 to 75 percent of their time is billable once quoting, travel, buying materials and admin are counted), by cash flow (materials bought up front, customers paying late, tax due later in a lump), by gaps in insurance and the registrations their trade needs to sign off work, and by leaving with no pipeline. Some move first to subcontracting for a contractor, which gives steady work at a lower rate; that is a valid bridge.

Trade: {{trade}}
{{#savings_months}}Savings cover: {{savings_months}} months of household costs{{/savings_months}}
</context>

<task>
<situation>
{{situation}}
</situation>
{{#existing_contacts}}

<existing_contacts>
{{existing_contacts}}
</existing_contacts>
{{/existing_contacts}}

1. Readiness check: score skills breadth for working alone, sign-off ability, customer handling, quoting, admin, pipeline and money on a simple traffic light, and name the two weakest areas to fix before leaving.
2. Kit and vehicle: what they have, what is essential on day one for the work named, and what can wait or be hired. Compare buying, leasing or a used van at a high level; keep the first-year spend lean.
3. Cards, insurance and registrations: the checks to make for this trade - competence or registration schemes needed to self-certify or notify work, public liability, tools and van cover, professional indemnity if designing, income protection, waste carrier rules, registering as self-employed. Frame each as "check whether you need" for their country.
4. Pricing: build a day rate from target income plus business costs, divided by realistic billable days (about 46 working weeks, minus quoting and admin time). Show the arithmetic. Add how to price jobs (labour plus materials with a markup, call-out minimums, deposits on larger jobs) and when to quote fixed price.
5. First customers: turn existing contacts into the first month of work, respecting any contract clause on the employer's customers; add subcontract options, local listings and trade directories, reviews from every job, and a simple word-of-mouth ask.
6. Money and buffer: monthly business costs, a target buffer of three to six months of household plus business costs (say how far their savings fall short), a tax set-aside percentage to confirm with an accountant, separate business account, invoicing on completion with payment terms.
7. Leave plan: a dated sequence counting back from the leave date - kit and insurance in place, registrations done, pipeline of at least four weeks of booked work or a subcontract agreed, notice served. Suggest a target leave date and the conditions that would move it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state rates, tax rates, scheme names or legal requirements as fact for their country; list them as checks. Use their figures, mark estimates.
- Do not suggest doing notifiable or certified work without the required registration or sign-off.
- Do not advise poaching the employer's customers against the contract; point to checking it.
- If the situation lacks pay, savings or tools, give the plan with [X] placeholders and ask.
- Show the day-rate and buffer arithmetic so it can be checked.
</constraints>

<output_format>
## Readiness check
Table: Area | Status (green, amber, red) | Fix before leaving.

## Kit and vehicle
Table: Item | Have | Day one | Can wait.

## Cards insurance and registrations
Checklist of items to check.

## Pricing
Day-rate arithmetic, then job-pricing rules.

## First customers
Bullets, first month first.

## Money and buffer
Table of monthly costs, buffer target against savings, then rules.

## Leave plan
Table: Week before leaving | Task | Done when.

## Questions
Short bullets.
</output_format>
