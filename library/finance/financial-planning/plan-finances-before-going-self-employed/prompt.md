---
schema: 1
id: plan-finances-before-going-self-employed
kind: prompt
title: Plan personal finances before going self-employed
description: Prepares a household's finances before leaving a job for self-employment - cash runway, income gap scenarios, lost employee benefits, borrowing to arrange first, tax set-aside and a go or wait test.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [career-change, cash-runway, employee-benefits, irregular-income]
pairs_with:
  prompts: [start-freelance-business, plan-freelance-tax-set-aside, budget-irregular-income, build-emergency-fund-plan]
  personas: [personal-finance-coach]
args:
  - name: plan
    description: What you plan to do, when you want to leave, expected income in the first year (a realistic range), and any start-up costs.
    type: text
    required: true
  - name: household
    description: Current take-home pay, partner's income if any, essential monthly costs, savings, debts, mortgage or rent, dependants, and the benefits your job gives you (pension contributions, health or life cover, sick pay, parental leave).
    type: text
    required: true
  - name: country
    description: Country, because tax, social insurance and benefits for self-employed people differ.
    type: string
output_contract:
  format: markdown
  sections: [Your runway, Income scenarios, Benefits you lose and how to replace them, Do before you resign, Tax and admin, Go or wait test, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get their personal finances ready before they leave a salaried job to work for themselves. The business plan is a separate job; this is the household side. New self-employed people commonly underestimate three things: how long the first payments take to arrive (invoices are paid weeks after work, and work takes time to win), the value of employee benefits they lose (employer pension contributions, sick pay, life and health cover, paid leave, parental pay), and the tax due later on money already spent. Borrowing is also harder for the first year or two: lenders usually want accounts covering a period of self-employment, so remortgaging, moving home or refinancing is often easier done before resigning. A sound plan sets a cash runway in months of essential spending, a minimum income line, and a decision date to go back to employment if the line is not met.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The plan:

<plan>
{{plan}}
</plan>

Household:

<household>
{{household}}
</household>

1. Calculate the runway: essential monthly household costs, minus any partner income, against savings set aside for this. Show months of runway, and the target (commonly six to twelve months of essentials for a new venture, stated as a rule of thumb).
2. Model income scenarios for the first twelve months (slow, expected, good), with a delay before first payments, tax set aside from income, and start-up costs. Show the month savings would run out in each.
3. List benefits lost and the cost or option to replace each: pension contributions, sick pay and income protection, life cover, health cover, parental pay, paid leave. Present replacement as things to price, not products to buy.
4. List what to do before resigning: remortgage or fix a rate if due, apply for any credit or rental you may need, check notice period, holiday pay and any bonus timing, use workplace benefits, and build the buffer.
5. Tax and admin: registering as self-employed, keeping records, and a set-aside percentage for tax and social contributions to confirm with an accountant or the tax authority.
6. Give a go or wait test: conditions that should be met before resigning, and a decision date and minimum income line for reviewing after launch.
7. List assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent tax rates, social insurance rules or benefit entitlements; mark country-specific points "verify".
- Do not recommend specific insurers, lenders or products.
- Respect the person's decision to go; the aim is to make it safer, not to talk them out of it. Be honest if the runway is very short.
- Mention the partner or household explicitly when their income is part of the plan; it is a shared risk.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your runway
Calculation and months.

## Income scenarios
Table: month | slow | expected | good, with savings balance.

## Benefits you lose and how to replace them
Table: benefit | what it was worth | option to price.

## Do before you resign
Checklist.

## Tax and admin
Bullets.

## Go or wait test
Conditions, decision date and minimum income line.

## Assumptions
Bullets.
</output_format>
