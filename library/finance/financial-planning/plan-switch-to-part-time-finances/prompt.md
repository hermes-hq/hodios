---
schema: 1
id: plan-switch-to-part-time-finances
kind: prompt
title: Plan the finances of going part-time
description: Works out whether a household can afford a move to part-time or reduced hours - real take-home change after tax, knock-on effects on pension, benefits and childcare, and the budget that makes it work.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [reduced-hours, work-life-balance, caring-responsibilities, pension-impact]
pairs_with:
  prompts: [propose-flexible-work, build-monthly-budget, plan-parental-leave-finances, prioritize-financial-goals]
  personas: [personal-finance-coach]
args:
  - name: change
    description: Current hours and gross pay, the hours you are considering (one or more options), and why (caring, health, study, children, a side business, easing toward retirement).
    type: text
    required: true
  - name: household
    description: Current take-home pay, partner's income, essential and regular costs, childcare costs, savings, debts, and pension contributions (yours and your employer's).
    type: text
    required: true
  - name: country
    description: Country, because tax, benefits and childcare support change with income and hours.
    type: string
output_contract:
  format: markdown
  sections: [Take-home change, Knock-on effects, Budget at the new income, Long-term cost, Questions to check, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people work out whether they can afford to cut their working hours. The drop in take-home pay is usually smaller than the drop in gross pay, because income tax and social contributions are progressive, and reduced hours may also cut childcare or commuting costs or raise eligibility for income-based support. Other effects go the other way: lower pension contributions (often the employer's too), lower sick pay, parental pay, life cover and other benefits tied to salary, and sometimes the loss of a threshold-linked benefit. Mortgage lenders assess current income, so a remortgage may be harder after the change. The fair comparison therefore needs the after-tax figure, the knock-on effects, and the long-term cost to retirement savings, set against what the time is for.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The change:

<change>
{{change}}
</change>

Household:

<household>
{{household}}
</household>

1. Estimate the take-home change for each option: gross pay at the new hours, and an approximate after-tax figure. If you cannot calculate tax reliably for the country, show the gross change, explain why the net change will be smaller, and tell the person to use the official tax calculator or a recent payslip; mark any estimate "approximate".
2. List knock-on effects for each option: pension contributions and employer match, childcare or commuting costs saved or added, income-based support or credits that may change, other salary-linked benefits, and any effect on borrowing plans.
3. Build a monthly budget at the new household income: essentials, regular costs, what has to give, and the remaining surplus or gap. Use the person's figures and show the arithmetic.
4. Show the long-term cost: the reduction in yearly pension contributions and a simple illustration of what that adds up to by retirement, labelled as illustrative, with options to soften it.
5. List questions to check with the employer (pro-rata benefits, a trial period, the right to return to full hours), the tax authority or a benefits adviser, and the mortgage lender if a remortgage is coming.
6. State assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent tax rates, thresholds or benefit amounts; mark any you use with country and year and "verify".
- Respect the reason for the change; the aim is to make it work or show honestly what it costs, not to talk the person out of it.
- If the switch is for health reasons, mention that sick pay, phased return or disability support may be options worth checking before a permanent change.
{{> output/uncertainty}}
</constraints>

<output_format>
## Take-home change
Table: option | gross monthly | approx take-home | change.

## Knock-on effects
Table: effect | option A | option B.

## Budget at the new income
Table: line | now | after, with the surplus or gap.

## Long-term cost
Short explanation and illustration.

## Questions to check
Bullets grouped by who to ask.

## Assumptions
Bullets.
</output_format>
