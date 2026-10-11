---
schema: 1
id: check-rent-affordability
kind: prompt
title: Check how much rent you can afford
description: Works out a comfortable and a maximum rent from take-home pay and real costs, adds the move-in costs and bills that come with a tenancy, and tests specific listings against the budget.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [table, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rent-affordability, moving-out, rental-costs, move-in-costs]
pairs_with:
  prompts: [build-monthly-budget, compare-rent-vs-buy, split-shared-expenses, plan-first-job-finances]
  personas: [personal-finance-coach]
args:
  - name: income_and_costs
    description: Take-home pay (and how stable it is), debts, and your other monthly costs or a rough list, plus savings available for moving.
    type: text
    required: true
  - name: listings
    description: Specific places you are considering with rent, what is included, deposit, fees and commute cost. Optional.
    type: text
  - name: country
    description: Country or city, so deposit rules, fees and landlord income checks can be framed. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your rent range, What a tenancy really costs, Move-in money, Listings tested, Before you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rules of thumb such as "rent should be 30% of gross income" or a landlord's "income must be 30-40 times the monthly rent" are quick screens, not budgets. They ignore take-home pay, debts, commuting and the bills that come with a tenancy (energy, water, local property tax, internet, contents insurance), and in expensive cities they are often impossible. A better test starts from take-home pay, subtracts real non-housing costs and a savings amount, and treats what remains as the ceiling for total housing cost, then sets a comfortable figure below it. A cheaper flat with a long commute can cost more in money and time than a pricier one close by. Moving in also needs cash up front: deposit, often rent in advance, any permitted fees, furniture, transport and overlap with the old place.

<income_and_costs>
{{income_and_costs}}
</income_and_costs>
{{#listings}}<listings>
{{listings}}
</listings>{{/listings}}
{{#country}}Location: {{country}}{{/country}}
</context>

<task>
1. Your rent range: from take-home pay subtract non-housing costs, debt payments and a savings amount; the remainder is the ceiling for rent plus housing bills. Estimate housing bills (labelled) and give a comfortable rent and a maximum rent. Show the common percentage rules alongside for comparison and say why the budget-based figure is the one to trust.
2. What a tenancy really costs: list the extra monthly costs to include, with their figures or labelled estimates, and ask which are included in the listed rent.
3. Move-in money: deposit, rent in advance, any fees (noting some places cap or ban letting fees), moving, basics to buy, and overlap. Compare with their savings.
4. Listings tested: if listings are given, a table comparing total monthly cost (rent, bills, commute) against the range, plus move-in cash, and which pass. If none are given, give a one-line formula they can apply to listings.
5. Before you sign: checks to make (deposit protection rules, what the rent review clause allows, notice period, inventory, who pays which bills) framed as questions for their location, and when to get free tenancy advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state local rent levels, deposit caps or tenancy laws as fact; frame as things to check for the location.
- Use their figures; label every estimate.
- If the only affordable rent is clearly unrealistic for their area, say so honestly and list options (sharing, a different area, guarantor, income options) without judgement.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your rent range
Calculation, then comfortable and maximum rent.

## What a tenancy really costs
Table: cost | monthly | included in rent?

## Move-in money
Table: item | amount. Then the comparison with savings.

## Listings tested
Table: listing | rent | bills | commute | total | pass?

## Before you sign
Checklist.
</output_format>
