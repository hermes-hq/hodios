---
schema: 1
id: plan-co-buying-home
kind: prompt
title: Plan buying a home with someone you are not married to
description: Plans buying a home with a friend, sibling or unmarried partner - unequal deposits and shares, the joint mortgage, running costs, exit terms and the points a written agreement should cover.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [co-ownership, joint-mortgage, unequal-deposits, exit-terms, home-buying]
pairs_with:
  prompts: [estimate-home-buying-costs, prepare-mortgage-application, plan-couple-money-conversation, plan-separation-finances]
  personas: [personal-finance-coach]
args:
  - name: buyers
    description: Who is buying together and the relationship, each person's deposit, income, debts, and how long each expects to stay.
    type: text
    required: true
  - name: property
    description: Target price range, mortgage size you expect, and any plans such as one person living there and paying rent to the other.
    type: text
    required: true
  - name: country
    description: Country and region, because forms of joint ownership, the protections for unmarried couples and transfer taxes vary.
    type: string
output_contract:
  format: markdown
  sections: [The set-up, Ownership shares, Monthly costs and who pays, What happens if, Points for a written agreement, Questions for a lawyer and lender, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan buying a home with someone they are not married to: a friend, sibling, parent or unmarried partner. Most problems appear years later and come from things never agreed: unequal deposits treated as equal by the form of ownership, one person losing their job, one wanting to sell, a new partner moving in, or a death. Many legal systems give unmarried co-owners far less protection than spouses, and the form of joint ownership chosen at purchase decides what happens to each share on death (some forms pass the whole home to the survivor automatically regardless of a will). A joint mortgage usually makes each borrower liable for the whole debt, not just their share, so one person's missed payments become the other's problem. A written co-ownership agreement, drafted by a lawyer at purchase, normally covers shares, contributions, running costs, improvements, buyouts, a forced-sale process, and what happens on death or a new relationship. Wills and life cover often need updating alongside.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Buyers:

<buyers>
{{buyers}}
</buyers>

Property:

<property>
{{property}}
</property>

1. Summarise the set-up: who contributes what, combined borrowing, and the main risks in this particular arrangement.
2. Show two or three ways to set ownership shares (equal, by deposit, by deposit plus mortgage payments over time), with a worked example of what each person would get on a sale at the same price, a higher price and a lower price, after repaying the mortgage.
3. Lay out the monthly costs (mortgage, insurance, maintenance, bills) and options for splitting them, including what happens if one person pays more for a period or makes improvements.
4. Walk through "what happens if": one wants to sell, one cannot pay, one dies, one gets a new partner who moves in, one wants to buy the other out (with a valuation method).
5. List the points a written co-ownership agreement should cover, and related steps such as wills and life cover.
6. List questions for a lawyer and the lender, and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state the forms of ownership, survivorship rules or tax rules for a country as fact; describe them generally and mark them "verify with a lawyer".
- Do not draft the legal agreement; list what it should cover and say it should be drafted or reviewed by a lawyer.
- Explain joint and several liability on a joint mortgage plainly.
- Stay neutral between the buyers; show the fairness trade-offs of each split rather than picking one.
{{> output/uncertainty}}
</constraints>

<output_format>
## The set-up
Short bullets.

## Ownership shares
Table: split method | person A share | person B share | outcome at sale price low, same and high.

## Monthly costs and who pays
Table: cost | amount | split options.

## What happens if
Table: event | risk | what to agree in advance.

## Points for a written agreement
Checklist.

## Questions for a lawyer and lender
Bullets.

## Assumptions
Bullets.
</output_format>
