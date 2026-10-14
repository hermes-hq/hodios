---
schema: 1
id: plan-blended-family-finances
kind: prompt
title: Plan the finances of a blended family
description: Plans money in a blended family - shared and separate costs, child support and ex-partner obligations, protecting each partner's children in wills and beneficiary nominations, and the home.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
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
depth: specific
tags: [stepfamily, second-marriage, child-support, beneficiary-nominations, inheritance]
pairs_with:
  prompts: [plan-blended-family-transition, prepare-will-questions, plan-couple-money-conversation, update-finances-after-marriage]
  personas: [personal-finance-coach]
args:
  - name: family
    description: Both partners, each one's children (ages, who they live with), whether you are married or living together, and any children together.
    type: text
    required: true
  - name: money
    description: Each partner's income, assets, debts, pensions and life cover; who owns the home; child support paid or received; and existing wills and beneficiary nominations.
    type: text
    required: true
  - name: concerns
    description: What worries you most - fairness in daily costs, what happens to the children if one partner dies, the home, university costs, ex-partners. Optional.
    type: text
  - name: country
    description: Country, because inheritance law, the effect of marriage on wills and stepchildren's rights differ.
    type: string
output_contract:
  format: markdown
  sections: [Your family's money map, Day-to-day costs, Obligations from past relationships, Protecting each partner's children, The home, Questions for a lawyer and adviser, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help blended families organise their money. The daily question is fairness: two incomes, children from different relationships, child support flowing in or out, and different spending habits. The bigger risk is what happens on death or separation. In many countries, if one partner dies, the default rules or a simple "everything to my spouse" will can mean that the surviving partner's children inherit everything later, while the first partner's own children receive nothing; stepchildren often have no automatic right to inherit. Pensions and life cover pass by beneficiary nomination, not by the will, and old nominations naming an ex-partner are common. In some countries marriage revokes an earlier will. Tools that help, described generally, include separate wills that leave a life interest in the home to the surviving partner and the capital to one's own children, trusts, updated nominations, life cover written for specific children, and pre- or post-nuptial or cohabitation agreements. Daily money often works best with a shared pot for household costs and separate money for each partner's own children's extras.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Family:

<family>
{{family}}
</family>

Money:

<money>
{{money}}
</money>
{{#concerns}}

Concerns:

<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. Draw a money map: each partner's income, assets, debts and obligations, and each child's connection to each adult.
2. Propose a day-to-day system: what is shared (housing, food, bills, family activities), what stays separate (each partner's children's extras, child support, personal spending), and how contributions are set, with monthly figures.
3. Set out obligations from past relationships: child support, court orders, assets or debts from a previous divorce, and how they fit the budget.
4. Show how to protect each partner's children: review of wills, beneficiary nominations on pensions and life cover, life cover sized for each partner's children, and general mechanisms such as a life interest or trust to discuss with a lawyer. Flag any nomination that still names an ex-partner.
5. Address the home: who owns it and in what form, what happens to it if one dies or you separate, and points for an agreement.
6. List questions for a lawyer and a financial adviser, and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state inheritance law, the effect of marriage on wills or stepchildren's rights as settled fact; describe generally and mark "verify with a lawyer".
- Stay neutral between partners and between children; show trade-offs rather than declaring what is fair.
- Do not draft wills or agreements; list what they should cover.
- Keep the children's wellbeing in view; money conversations should not be held in front of them or through them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your family's money map
Short bullets or table.

## Day-to-day costs
Table: cost | shared or separate | who pays | monthly.

## Obligations from past relationships
Bullets.

## Protecting each partner's children
Table: risk | current position | change to discuss.

## The home
Bullets.

## Questions for a lawyer and adviser
Bullets.

## Assumptions
Bullets.
</output_format>
