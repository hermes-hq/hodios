---
schema: 1
id: compare-sell-vs-rent-out-home
kind: prompt
title: Compare selling versus renting out your home
description: Compares selling your current home with keeping it as a rental when you move - net rental yield, cash tied up, tax and mortgage questions, landlord duties and a break-even view.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [accidental-landlord, rental-yield, home-sale, property-decision]
pairs_with:
  prompts: [compare-rent-vs-buy, estimate-home-buying-costs, compare-mortgage-options, plan-relocation-finances]
  personas: [personal-finance-coach]
args:
  - name: property
    description: The home - rough market value, mortgage balance, rate and type, monthly payment, how long you have owned and lived in it, and its condition.
    type: text
    required: true
  - name: rental_estimate
    description: Expected rent and the source (agent estimate, comparable listings), plus any known costs - service charges, insurance, repairs, letting agent fees, property taxes.
    type: text
    required: true
  - name: plans
    description: Why you are moving, where, whether you need the equity for the next home, how long you might keep the property, and how you feel about being a landlord. Optional.
    type: text
  - name: country
    description: Country and region of the property, and the country you will live in if different.
    type: string
output_contract:
  format: markdown
  sections: [The real question, Selling, Keeping and renting, Side by side, Questions to settle first, What would tip it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide whether to sell their home or rent it out when they move. People often keep a home "because the rent covers the mortgage", but that comparison misses most of the picture. The fair comparison is net rental income (rent minus voids, letting fees, repairs, insurance, compliance costs, service charges, property taxes and income tax on the profit) against the return the released equity could earn or the debt it could avoid, plus the change in the property's value, which is uncertain. Several things often change when a home becomes a rental: residential mortgages usually need lender consent or a switch to a landlord product at a different rate; insurance must change; landlord safety, deposit and licensing duties may apply; and the tax treatment of a later sale can change after the owner moves out, sometimes with a time-limited relief. Keeping a rental also concentrates wealth in one asset and needs time or a paid agent.

{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
Property:

<property>
{{property}}
</property>

Rental estimate and costs:

<rental_estimate>
{{rental_estimate}}
</rental_estimate>
{{#plans}}

Plans:

<plans>
{{plans}}
</plans>
{{/plans}}

1. State the real question in one or two lines, including whether the equity is needed for the next home, which can decide it on its own.
2. Selling: estimate net proceeds as a range (price minus selling costs minus mortgage redemption and any early repayment charge), and what that cash could do (next deposit, debt repaid, savings).
3. Keeping and renting: monthly and annual net cash flow with every cost line, using the person's figures and marking typical allowances you add (voids, repairs) as assumptions. Show income tax on rental profit as "to estimate with an adviser". List mortgage, insurance and landlord duties to check.
4. Put both side by side over the person's time horizon (or 5 and 10 years if none) with low, middle and high house price changes, showing cash flow, equity, and money tied up. Show the arithmetic and make clear the price changes are illustrations, not forecasts.
5. List questions to settle before deciding: lender consent and rate, tax on rent and on a later sale (including any relief tied to having lived there), landlord rules, and, if moving abroad, the tax and management issues of renting from overseas.
6. Say what would tip the decision each way.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict house prices or rents. Use the person's estimates and labelled scenarios.
- Never invent tax rates, reliefs, landlord rules or mortgage terms. If you name one, give the country and mark it "verify".
- Do not tell the person to keep or sell. Show the trade-off and the deciding factors.
- Warn that letting a property without the lender's consent can breach the mortgage terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## The real question
One or two lines.

## Selling
Short calculation and bullets.

## Keeping and renting
Table: line | monthly | annual | source or assumption.

## Side by side
Table: scenario | sell | keep, with a short note on each.

## Questions to settle first
Bullets grouped by lender, tax adviser and local rules.

## What would tip it
Bullets for each direction.
</output_format>
