---
schema: 1
id: plan-moving-in-together-finances
kind: prompt
title: Plan the finances of moving in together
description: Plans money when moving in together unmarried - splitting rent or mortgage and bills fairly, whose name goes on what, joint accounts, unequal incomes and what a cohabitation agreement should cover.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cohabitation, unmarried-couple, bill-splitting, joint-account, cohabitation-agreement]
pairs_with:
  prompts: [plan-couple-money-conversation, plan-co-buying-home, update-finances-after-marriage, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: couple
    description: Each person's take-home pay, debts, savings and money habits as you see them, and how long you have been together.
    type: text
    required: true
  - name: home
    description: Where you will live - renting a new place, one moving into the other's rented or owned home - and the rent or mortgage and expected bills.
    type: text
    required: true
  - name: country
    description: Country and region, because the rights of unmarried partners, tenancy rules and benefit effects differ.
    type: string
output_contract:
  format: markdown
  sections: [Your set-up, Splitting the costs, Accounts and names, If one owns the home, Points for a cohabitation agreement, First-month checklist, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples set up their money when moving in together without marrying. Three things are often missed. First, unmarried partners in many countries have few automatic financial rights if they separate or one dies, regardless of how long they lived together, so names on tenancies, deeds, accounts and bills matter more than people expect. Second, when one partner owns the home, the other paying towards the mortgage usually does not create a share in it unless that is written down, and paying "rent" to the owner may have tax and lender implications. Third, splitting costs 50/50 with unequal incomes can leave the lower earner with no savings while the higher earner builds wealth; splitting in proportion to income is a common alternative. A joint account for shared bills with individual accounts for the rest keeps things clear. Joint tenancies and joint accounts usually make each person liable for the whole amount. Benefits and tax credits may change once a couple lives together.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Couple:

<couple>
{{couple}}
</couple>

Home:

<home>
{{home}}
</home>

1. Summarise the set-up: combined income, shared costs, and the main risks in this arrangement.
2. Show two or three ways to split shared costs (50/50, proportional to income, fixed contributions plus a shared pot) with the monthly amounts and what each person has left to save, using their figures.
3. Advise on accounts and names: joint account for bills, whose name is on the tenancy and bills, liability for the whole amount, and keeping debts separate.
4. If one partner owns the home, explain the options (paying a contribution with no share, paying towards the mortgage with a written share agreement, and the lender, insurance and tax questions this raises), as general points to verify.
5. List what a cohabitation agreement typically covers and when it is worth a lawyer, plus wills and beneficiary nominations, since unmarried partners may not inherit automatically.
6. Give a first-month checklist and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state the rights of unmarried partners in a country as settled fact; describe them generally and mark them "verify locally".
- Stay neutral between the partners; show the fairness trade-offs of each split.
- Do not draft a binding agreement; list what it should cover.
- If either person mentions controlling behaviour around money or fear of their partner, respond with care and point to support before any planning.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your set-up
Short bullets.

## Splitting the costs
Table: method | partner A pays | partner B pays | A left over | B left over.

## Accounts and names
Bullets.

## If one owns the home
Bullets, or "not applicable".

## Points for a cohabitation agreement
Checklist.

## First-month checklist
Checklist.

## Assumptions
Bullets.
</output_format>
