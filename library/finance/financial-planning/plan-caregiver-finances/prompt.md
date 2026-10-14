---
schema: 1
id: plan-caregiver-finances
kind: prompt
title: Plan your finances when becoming a carer
description: Plans the carer's own finances when cutting work to look after a relative - lost income, carer benefits and work rights to check, pension gaps, sharing costs with family and protecting your future.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [family-carer, unpaid-care, carer-benefits, pension-gaps, reduced-hours]
pairs_with:
  prompts: [manage-parent-finances, plan-long-term-care-costs, plan-switch-to-part-time-finances, propose-flexible-work]
  personas: [personal-finance-coach]
args:
  - name: care
    description: Who you care for, roughly how many hours a week, how long it may last, whether they live with you, and what support they already get.
    type: text
    required: true
  - name: work_and_money
    description: Your job, hours and take-home pay now, what change you are considering (fewer hours, leave, stopping), savings, debts, household spending, partner's income and pension contributions.
    type: text
    required: true
  - name: family
    description: Other relatives who could share costs or care, and whether the person cared for has income or savings that could pay for help. Optional.
    type: text
  - name: country
    description: Country, because carer benefits, pension credits for carers, leave rights and care funding differ widely.
    type: string
output_contract:
  format: markdown
  sections: [Your situation, Income change, Support to claim or ask for, Protecting your future, Sharing the cost, Questions to check, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who are taking on care for a parent, partner, child or other relative and need to protect their own finances. Unpaid carers often leave work or cut hours without checking alternatives, and the cost lasts long after the caring ends: lost earnings, lost employer pension contributions, gaps in state pension records, and a harder return to work. Many countries offer carer allowances or credits that protect pension records, rights to request flexible work or carer's leave, and benefits for the person cared for that can fund paid help; these are often unclaimed. The person being cared for may have income, savings or benefits that should pay for their own care costs rather than the carer's money, with proper legal authority and records. Siblings and other relatives can share either costs or time, and the conversation goes better with numbers. Carers also need to protect their health and a little time off, which affects whether the arrangement lasts.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Care:

<care>
{{care}}
</care>

Work and money:

<work_and_money>
{{work_and_money}}
</work_and_money>
{{#family}}

Family:

<family>
{{family}}
</family>
{{/family}}

1. Summarise the situation and the main money risk in two or three lines.
2. Compare work options (flexible hours, carer's leave, part-time, unpaid leave, stopping) on take-home pay, pension contributions and how easy it is to go back, showing the arithmetic with the person's figures.
3. List support to check: carer benefits or allowances, pension or social insurance credits for carers, benefits the cared-for person may be entitled to that could pay for help, local care assessments, workplace rights. Describe them generally and mark "verify with the local benefits agency or a carers' organisation".
4. Show how to protect the carer's future: keeping pension contributions going if possible, an emergency fund, record gaps to fill, keeping skills current, and a review date.
5. Suggest how to share the cost: who pays for what, using the cared-for person's own money properly with legal authority and records, and a conversation outline for siblings with the numbers.
6. List questions to check and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent benefit names, amounts, eligibility rules or leave rights. Describe types of support generally and mark them "verify" with the country.
- Use the cared-for person's money only with proper legal authority and records; say so.
- Be warm and practical; carers are often exhausted. Mention carers' support organisations and the carer's own health without lecturing.
{{> guardrails/crisis-safety}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Your situation
Two or three lines.

## Income change
Table: option | take-home | pension contributions | ease of return | note.

## Support to claim or ask for
Table: type of support | for whom | what to check.

## Protecting your future
Bullets.

## Sharing the cost
Bullets and a short conversation outline.

## Questions to check
Bullets grouped by who to ask.

## Assumptions
Bullets.
</output_format>
