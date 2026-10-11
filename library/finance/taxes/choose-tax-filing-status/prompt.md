---
schema: 1
id: choose-tax-filing-status
kind: prompt
title: Choose a US tax filing status
description: Compares US filing statuses such as married filing jointly, married filing separately and head of household using the household's own numbers and the eligibility rules that decide each.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [table, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [filing-status, head-of-household, married-filing-separately, united-states, irs, tax-return]
pairs_with:
  prompts: [compare-standard-vs-itemized-deductions, prepare-us-federal-tax-return, explain-family-tax-credits]
  personas: [tax-educator]
args:
  - name: household
    description: Tax year, marital status on December 31, whether and when you lived apart, who lives with you and their ages, who pays the household costs, and any spouse who died in the last two years.
    type: text
    required: true
  - name: money
    description: Each spouse's income by type, big deductions (mortgage interest, medical, charity, student loan interest), state of residence, and concerns such as income-driven student loan repayments or a spouse's tax debts. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Facts that decide this, Which statuses you can use, Comparison of allowed statuses, Other things that matter, Recommendation, Check before filing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a US household pick the filing status that is both allowed and best for them. Eligibility comes first: marital status is fixed on the last day of the year; head of household needs the taxpayer to be unmarried or "considered unmarried" (married but lived apart for the last six months of the year and meeting other tests), to pay more than half the cost of keeping up the home, and to have a qualifying person who lived there more than half the year, with an exception for a dependent parent; qualifying surviving spouse applies for up to two years after a spouse's death with a dependent child. Only then compare. Married filing jointly is usually lowest, but separate returns can make sense when one spouse has large medical expenses against a lower income floor, when income-driven student loan payments are based on the borrower's own income, or when one spouse wants to avoid liability for the other's return. Separate filing has costs that people miss: loss or limits of several credits and deductions (earned income credit except in some separated cases, education credits, student loan interest deduction), a rule that if one spouse itemizes the other must too, and community property rules in some states that split income in ways that surprise people.

Household: {{household}}
{{#money}}Money: {{money}}{{/money}}
</context>

<task>
1. Confirm the tax year (if missing, ask and stop) and the facts that decide eligibility. List any missing fact that changes the answer and ask for it before comparing if it is decisive.
2. Eligibility table: each status (single, married filing jointly, married filing separately, head of household, qualifying surviving spouse) marked allowed, not allowed or depends, with the specific rule and the fact it turns on.
3. For the allowed statuses, compare using their numbers: income, standard deduction or itemized, credits gained or lost, and the direction of the tax result. Use relative statements or a rough illustration with "check the brackets and amounts for your tax year"; never present an exact tax figure.
4. Non-tax factors: joint and several liability, student loan repayment plans, health insurance subsidies that depend on filing jointly, and state return effects including community property states.
5. Recommend a status, or a short decision rule if it depends on a missing number, and say what would change it.
6. Note that people can usually amend from separate to joint later, but generally not from joint to separate after the deadline, with "check the rule".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never recommend a status the facts do not support. Head of household is a common error; say plainly when it is not allowed.
- Do not invent amounts or bracket figures; mark every figure as to check.
- If there is domestic abuse, a spouse who refuses to cooperate, or fear of a spouse's tax debts, mention innocent spouse relief and recommend a tax professional or a low income taxpayer clinic.
- Recommend a professional for: community property states with separate filing, a non-resident alien spouse, divorce in progress, or a spouse who died during the year with an estate to settle.
{{> output/uncertainty}}
</constraints>

<output_format>
## Facts that decide this
## Which statuses you can use
Table: Status | Allowed? | Rule | Fact it turns on.
## Comparison of allowed statuses
Table: Item | Option A | Option B.
## Other things that matter
## Recommendation
## Check before filing
</output_format>
