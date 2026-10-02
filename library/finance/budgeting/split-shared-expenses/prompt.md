---
schema: 1
id: split-shared-expenses
kind: prompt
title: Split shared expenses fairly
description: Designs a fair way for couples or housemates to split shared costs, comparing equal, income-proportional and usage-based splits with the maths and a simple tracking routine.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [table, plan, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [couples-money, housemates, joint-account, fairness]
pairs_with:
  prompts: [build-monthly-budget, plan-savings-goal]
  personas: [personal-finance-coach]
args:
  - name: people_and_incomes
    description: Who shares the costs and each person's monthly take-home income (or say if someone prefers not to share it). Mention dependants, unequal room sizes, part-time work or caring responsibilities.
    type: text
    required: true
  - name: shared_costs
    description: The costs to split with amounts and frequency (rent or mortgage, bills, groceries, internet, childcare, car, holidays), and anything currently paid by one person.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is shared, Three ways to split, Things to agree, Tracking system, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who share a home agree how to share its costs. Arguments about shared money are rarely about arithmetic; they come from unspoken assumptions about what "fair" means. Equal shares feel fair to some people and leave a lower earner with nothing to spend. Income-proportional shares feel fair to others and can feel like a penalty to the higher earner. Housemates often care most about usage and room size. Laying the options side by side with real numbers, and naming the questions underneath, lets people choose deliberately and revisit the choice when things change.
</context>

<task>
People and incomes:

<people>
{{people_and_incomes}}
</people>

Shared costs:

<shared_costs>
{{shared_costs}}
</shared_costs>

1. List which costs are clearly shared, which are clearly personal, and which are ambiguous (for example one person's car used for joint errands, a pet, a partner's child, a home office). Convert everything to monthly amounts and total the shared costs.
2. Calculate three splits and show the arithmetic:
   - Equal: total divided by the number of people.
   - Income-proportional: each person pays shared total x (their income / combined income).
   - A third model that fits this household: equal leftover (each person keeps the same amount after shared costs, for couples who pool), usage-based (for housemates: rent weighted by room size or private bathroom, utilities by occupancy or days present), or a hybrid (rent proportional, groceries equal).
3. For each split, show what each person pays and what each has left from their income, as a table. Point out where a split leaves someone with very little.
4. Name the decisions underneath the numbers: what counts as shared, how unpaid work such as childcare or housework is recognised, personal spending money that nobody has to justify, how irregular costs and savings goals are handled, and when to review (pay rise, job loss, new baby, someone moves in).
5. Propose a simple tracking system: a joint account or pot funded by monthly transfers on payday, or a shared spreadsheet or split log with a fixed settle-up date. Give the spreadsheet columns or the transfer amounts.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present the options neutrally. Do not decide what is fair for them; you may say which split is common for their situation and why.
- If an income is not shared, offer equal or usage-based splits and show how income-proportional would work once the figure is known.
- If one person pays a mortgage or deposit on a home owned by only one of them, note that contributions to someone else's property can raise ownership questions, and suggest getting legal advice about a written agreement in their country.
- If anything suggests one person controls the other's money, blocks access to accounts or punishes spending, gently note that this can be a form of financial abuse and that confidential support services exist.
- Round to whole currency units and check that each split adds up to the total.
- Ask for missing amounts instead of inventing them.
</constraints>

<output_format>
## What is shared
Table: cost | monthly amount | shared, personal or to decide.

## Three ways to split
For each method: a one-line description and a table of person | pays | left over from income. Then two or three sentences comparing them.

## Things to agree
Bullets: the decisions from step 4, phrased as questions to discuss together.

## Tracking system
The set-up, the monthly transfer amounts or the log columns, and the settle-up and review dates.

## Assumptions and questions
Bullets.
</output_format>
