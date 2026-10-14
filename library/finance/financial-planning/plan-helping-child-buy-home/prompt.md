---
schema: 1
id: plan-helping-child-buy-home
kind: prompt
title: Plan helping a child buy a home
description: Compares ways parents can help a child buy a home - gift, loan, guarantor, joint mortgage, buying a share - with lender rules, the parents' own security, tax questions and fairness between children.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [deposit-help, gifted-deposit, guarantor-mortgage, family-loan, intergenerational-wealth]
pairs_with:
  prompts: [plan-supporting-family-financially, estimate-home-buying-costs, plan-retirement-scenarios, prepare-will-questions]
  personas: [personal-finance-coach]
args:
  - name: parents
    description: Parents' ages, income, savings, pensions, home value and mortgage, and how much they could part with without affecting their own retirement.
    type: text
    required: true
  - name: child
    description: The child's income, savings, relationship status (and whether a partner is buying too), the price range and what help they are asking for.
    type: text
    required: true
  - name: family
    description: Other children and how you want to treat them, and any wishes about getting the money back. Optional.
    type: text
  - name: country
    description: Country, because gift tax, inheritance rules, transfer taxes on second homes and lender rules on gifted deposits differ.
    type: string
output_contract:
  format: markdown
  sections: [Can you afford to help, The ways to help, How each one plays out, Protecting the money, Fairness between children, Questions for a lender and lawyer, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents decide how to help a child onto the property ladder. The first question is whether the parents can afford it: a gift made in their fifties can leave a gap in their own retirement or care funding that the child cannot later fill. The main routes each have consequences. A gift is simplest for lenders, who usually require a signed letter confirming it is not a loan; it may have gift or inheritance tax effects in some countries. A family loan keeps the money recoverable but lenders may count it as debt or refuse it, and it needs documenting. Being a guarantor or joining the mortgage puts the parents' income or home at risk, and owning part of the child's home can trigger extra transfer taxes on additional properties and tax on gains later. Many parents want protection if the child's relationship ends: a declaration of trust, a cohabitation or prenuptial agreement, or a recorded charge can help, depending on the country. Treating siblings fairly does not have to mean equal amounts now; it can be recorded and equalised in a will.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Parents:

<parents>
{{parents}}
</parents>

Child:

<child>
{{child}}
</child>
{{#family}}

Family:

<family>
{{family}}
</family>
{{/family}}

1. Check affordability for the parents first: what they can give or lend while keeping their emergency fund, retirement plan and possible care costs intact. Show the arithmetic and say plainly if the amount asked for looks too much.
2. Describe each route that fits (gift, loan, guarantor or family-assisted mortgage, joint mortgage, buying a share, helping with costs instead of the deposit), with what lenders usually require, the parents' risk, and the child's benefit.
3. Show how each plays out over time with a worked example: what happens on a sale, if the child cannot pay, if the parents need the money back, and on a parent's death.
4. Explain options to protect the money if the child's relationship ends, as general mechanisms to verify locally.
5. Address fairness between children: equal now, equal later through the will, or recorded as an advance on inheritance.
6. List questions for the child's lender or broker and a lawyer or tax adviser, and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent gift tax allowances, inheritance rules, transfer tax surcharges or lender rules. Mark any you mention with country and "verify".
- Put the parents' financial security first and say so if the help would put it at risk.
- Do not draft legal documents; list what they should cover.
- Warn that lenders must be told about any help and whether it is a gift or loan; do not help disguise a loan as a gift.
{{> output/uncertainty}}
</constraints>

<output_format>
## Can you afford to help
Short calculation and a plain verdict on the amount.

## The ways to help
Table: route | lender view | risk to parents | benefit to child.

## How each one plays out
Table: route | sale | child cannot pay | parents need money | parent dies.

## Protecting the money
Bullets.

## Fairness between children
Bullets.

## Questions for a lender and lawyer
Bullets grouped by who to ask.

## Assumptions
Bullets.
</output_format>
