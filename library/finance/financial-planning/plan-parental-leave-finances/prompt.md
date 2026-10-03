---
schema: 1
id: plan-parental-leave-finances
kind: prompt
title: Plan finances around parental leave
description: Plans a household's money around parental leave - the income gap month by month, benefits to verify, baby costs, a pre-leave savings target and a leave-period budget.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [parental-leave, maternity-leave, new-baby, income-gap, childcare-costs]
pairs_with:
  prompts: [build-monthly-budget, plan-savings-goal, review-insurance-coverage, split-shared-expenses]
  personas: [personal-finance-coach]
args:
  - name: incomes_and_leave
    description: Each parent's take-home pay, planned leave (dates, length, who takes what), what you know of employer leave pay and state benefits, current monthly costs, savings and debts, and childcare plans after leave.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant), since leave pay and benefits differ widely. Optional; asked for if needed.
    type: string
output_contract:
  format: markdown
  sections: [The answer, Income month by month, Benefits and leave pay to verify, Baby costs, Savings target before leave, Leave-period budget, After leave, Checklist and deadlines]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help expecting parents plan the money side of parental leave so the months with a new baby are not spent worrying about the bank balance. Leave income usually changes in stages (full pay for a period, then a reduced rate, then a flat statutory amount, then nothing), and those stages differ between parents, employers and countries. Costs change too: one-off baby purchases, higher utility and grocery bills, and the big one, childcare when leave ends. A good plan maps income month by month, sets a savings target that covers the gap plus a buffer, and lists the claims and deadlines that cannot be missed.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Incomes, leave and costs:

<incomes_and_leave>
{{incomes_and_leave}}
</incomes_and_leave>

1. Income month by month: for each month from the start of leave to one month after return, each parent's expected take-home pay at each stage, combined household income, normal monthly costs and the gap. Use the leave-pay stages stated; where a stage is unknown, use [X] and list it to verify. Note that leave pay may be taxed and may affect pension contributions.
2. Benefits and leave pay to verify: the general kinds to check (employer leave policy, statutory or state leave pay, parental allowance, child benefit or credits, tax changes, health insurance for the baby) with the questions to ask and who to ask. Name specific schemes only when confident, labelled "verify".
3. Baby costs: one-off costs (essential versus nice-to-have) and monthly costs, with ways to lower them (second-hand, borrowing, gift lists), using placeholders the parents fill in rather than invented prices.
4. Savings target before leave: sum of the monthly gaps plus one-off costs plus a buffer (for example one month of essential costs), minus savings already set aside; the monthly amount to save from now until leave starts, with arithmetic.
5. Leave-period budget: a slimmer monthly budget for the leave months, with what to pause (subscriptions, extra pension contributions only if they choose) and what never to cut (essential bills, minimum debt payments, insurance).
6. After leave: childcare cost against the returning parent's take-home pay, and options (part-time, staggered returns, shared care) as trade-offs, with the long-term career and pension effect of reduced hours noted.
7. Checklist and deadlines: notifying the employer, claiming benefits, adding the baby to health insurance, updating wills, guardianship and beneficiaries, and reviewing life cover, each with "confirm deadline".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Leave pay, benefits, eligibility rules and notice deadlines differ by country and employer and change often. Never state them as fact unless confident; mark "verify" and say where to check (employer HR policy, the government's official site).
- Use only figures given; missing figures become [X] placeholders and questions, never invented amounts.
- Show arithmetic; the month-by-month table and savings target must add up.
- Do not recommend specific products, insurers or providers.
- Treat both parents' leave and careers with equal weight; do not assume which parent takes leave.
- If the gap cannot be covered even with savings, say so and list options (spreading leave, unpaid leave timing, benefits to claim) and free money advice services.
{{> output/uncertainty}}
</constraints>

<output_format>
## The answer
Total gap, savings target and monthly amount to save before leave, in three lines.

## Income month by month
Table: month | parent A | parent B | household income | costs | gap.

## Benefits and leave pay to verify
Table: item | what to check | who to ask | status.

## Baby costs
Two short tables: one-off and monthly, with placeholders.

## Savings target before leave
Arithmetic.

## Leave-period budget
Table: category | normal | during leave.

## After leave
Short paragraph with the childcare comparison.

## Checklist and deadlines
Checklist with confirm-deadline markers.
</output_format>
