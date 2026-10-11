---
schema: 1
id: plan-career-change-finances
kind: prompt
title: Plan the finances of a career change
description: Plans the money side of a career change or retraining - course and living costs, the income dip, funding options, runway, a break-even year and the conditions for a go decision.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [retraining, income-dip, career-switch, cash-runway, adult-education]
pairs_with:
  prompts: [career-change-track, plan-switch-to-part-time-finances, build-monthly-budget, prioritize-financial-goals]
  personas: [personal-finance-coach]
args:
  - name: change
    description: Current job and take-home pay, the target career, the training needed (length, cost, full or part-time), and the expected starting and later pay in the new field with your source.
    type: text
    required: true
  - name: household
    description: Monthly essential and other spending, savings, debts, partner's income, dependants, and any fixed commitments such as a mortgage.
    type: text
    required: true
  - name: country
    description: Country, because training grants, student loans, tax relief on training and benefit rules differ.
    type: string
output_contract:
  format: markdown
  sections: [The plan in brief, Cost of the transition, Funding options, Runway and budget, Break-even, Go conditions, Questions to check, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan the money side of changing career. The true cost of a career change is usually the income gap, not the course fee: a year of reduced or no earnings plus a lower starting salary in the new field can cost several times the training itself. Common mistakes are using the senior pay of the new field instead of the entry pay, ignoring lost employer pension contributions, and quitting before testing the new field. Ways to lower the risk include training part-time while working, employer or government funding, a trial through volunteering or short courses, and building a dedicated transition fund on top of the normal emergency fund. Break-even, the year when cumulative earnings in the new path overtake staying put, is a useful test, but non-money reasons (health, satisfaction, long-term prospects) can justify a change that never breaks even.

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

1. Summarise the plan in brief: route (full-time study, part-time while working, direct switch), length and the key money figures.
2. Calculate the cost of the transition: fees, materials, equipment, lost earnings, lost employer pension contributions and benefits, and any relocation. Show the arithmetic.
3. List funding options to check: savings, employer support, grants, loans for adult learners, part-time work during training, a partner's income, and the trade-offs of each (marked "verify" where rules apply).
4. Build runway and a transition budget: months the household can cover essentials during the gap, what has to be cut, and the transition fund target on top of the emergency fund.
5. Calculate break-even: cumulative earnings on the new path versus staying, by year, using entry pay in the new field and a realistic progression the person gives (or a labelled assumption).
6. Set go conditions: the fund saved, a trial done, funding confirmed, a minimum entry salary confirmed.
7. List questions to check and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent salaries, grants, loan terms or course fees. Use the person's figures and mark gaps as assumptions to research.
- Use entry-level pay for the new career unless the person has evidence otherwise, and say why.
- Respect the person's reasons for changing; the aim is to make the move workable, not to talk them out of it.
- Keep the emergency fund separate from the transition fund.
{{> output/uncertainty}}
</constraints>

<output_format>
## The plan in brief
Short bullets.

## Cost of the transition
Table: cost | amount | note.

## Funding options
Table: option | amount possible | trade-off | to verify.

## Runway and budget
Short budget and runway calculation.

## Break-even
Table: year | cumulative earnings staying | cumulative earnings new path | gap.

## Go conditions
Checklist.

## Questions to check
Bullets.

## Assumptions
Bullets.
</output_format>
