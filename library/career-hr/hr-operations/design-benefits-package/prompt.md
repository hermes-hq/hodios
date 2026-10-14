---
schema: 1
id: design-benefits-package
kind: prompt
title: Design an employee benefits package
description: Designs an employee benefits package within a per-head budget, separating statutory from optional benefits, matching options to the workforce and listing what to confirm with a broker.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, operations-manager, executive]
requires: [none]
inputs: [text, dataset]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [employee-benefits, benefits-budget, total-rewards, health-cover, pension-contributions]
pairs_with:
  prompts: [write-total-rewards-statement, design-salary-bands, design-engagement-survey]
args:
  - name: workforce
    description: Headcount, countries or states, rough age and life-stage mix (for example many young parents, mostly remote, shift workers), and any employee feedback about benefits. No names.
    type: text
    required: true
  - name: budget
    description: The benefits budget per head per year or in total, the currency, and whether it must cover statutory employer costs too.
    type: string
    required: true
  - name: current_benefits
    description: What you offer today, with costs and take-up if known, and what you want to fix (for example "nobody uses the gym perk", "losing candidates to firms with better parental leave"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What is statutory, Workforce needs, Options, Recommended package, Budget check, Rollout, Questions for a broker or adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employers design benefits the way a reward specialist would. The first split is between what the law requires the employer to provide or fund (which differs greatly by country: in some, health cover and pension contributions are statutory; in others they are the main optional benefits) and what is optional. Optional benefits are worth their cost only if people value and use them: a perk with 5 percent take-up is mostly a cost line. Experts match benefits to the workforce's life stages (parental leave and childcare for young parents, pension matching for older staff, flexibility for carers), prefer a few well-communicated benefits over a long list, check tax treatment before promising anything (the same benefit can be tax-free in one country and a taxable benefit in kind in another), and remember that benefits are hard to take away once given. Multi-country teams usually need a common principle with local packages, not one identical list.

<workforce>
{{workforce}}
</workforce>
Budget: {{budget}}
{{#current_benefits}}
<current_benefits>
{{current_benefits}}
</current_benefits>
{{/current_benefits}}
</context>

<task>
1. What is statutory: for each country or state named, list the categories of benefit that are commonly mandatory there (marked "typical, confirm locally"), so the optional budget is not spent on what is already required. If no location is given, ask for it and continue with this section marked [LOCATION].
2. Workforce needs: from the workforce description and feedback, name the three to five needs that matter most and the evidence for each. Say where you are inferring and suggest a short pulse survey if evidence is thin.
3. Options: a table of candidate benefits that address those needs, each with the need it meets, the cost driver (per head, per use, percentage of salary), a rough cost estimate only if the user gave prices or you mark it as "get a quote", expected take-up, tax treatment to confirm, and how hard it is to withdraw later.
4. Recommended package: a core set everyone gets, plus any choice element (a flexible allowance or menu), with the reasoning. For multi-country teams, a common principle and local variations.
5. Budget check: per-head and total cost against budget using only the user's figures or clearly labelled placeholders, and what to cut or phase if it does not fit.
6. Rollout: timing (renewal dates of existing contracts, enrolment window), how to explain the change to employees, how to handle anyone who loses something, and how to measure take-up after six to twelve months.
7. Questions for a benefits broker, tax adviser or employment lawyer.
</task>

<constraints>
- Do not invent insurer prices, statutory rates, tax rules or provider names; mark each "to confirm" or "get a quote".
- Do not recommend benefits that treat people differently by age, sex, disability or other protected characteristic without flagging the legal risk.
- Do not ask for or use individual health information.
- Mark every point that depends on the country's law.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is statutory
Table: Location | Commonly mandatory | Confirm with.
## Workforce needs
Bullets with evidence.
## Options
Table: Benefit | Need met | Cost driver | Cost | Expected take-up | Tax treatment to confirm | Hard to withdraw?
## Recommended package
## Budget check
## Rollout
Numbered steps.
## Questions for a broker or adviser
Numbered.
</output_format>
