---
schema: 1
id: calculate-life-cover-need
kind: prompt
title: Calculate how much life cover you need
description: Estimates how much life cover a household needs and for how long, from debts, dependants' living costs, childcare and existing cover, as a range to take to a broker or adviser.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [life-cover, term-life, needs-analysis, dependants, death-in-service]
pairs_with:
  prompts: [review-insurance-coverage, explain-insurance-policy, compare-income-protection-policies]
args:
  - name: household
    description: "Who depends on whom: adults and their incomes, children and their ages, who does unpaid care, the mortgage or rent and debts, savings and investments, and country. Rough figures are fine; no names or account details."
    type: text
    required: true
  - name: existing_cover
    description: Cover already in place - employer death-in-service (as a multiple of salary), existing life policies (amount, term, level or decreasing), pension death benefits, and any you are unsure about.
    type: text
  - name: wishes
    description: What the money should do if someone died - clear the mortgage, keep the surviving partner at home for a few years, fund university, cover a funeral.
    type: text
output_contract:
  format: markdown
  sections: [Summary, What the cover has to do, Needs calculation, Cover already in place, The gap, How long and what kind, Questions for a broker, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Life cover replaces what a person brings to the household if they die: income, and also unpaid work such as childcare, which is easy to forget and expensive to replace. Rules of thumb ("ten times salary") ignore the things that actually decide the number: how long dependants will rely on the income, whether the mortgage would be cleared, what the surviving partner earns, childcare costs if the carer dies, and cover already held. Needs analysis works through those items, then subtracts existing assets and cover. Employer death-in-service cover ends when the job ends. The term should usually run until the youngest child is independent or the mortgage ends. Level cover pays a fixed amount; decreasing cover falls with a repayment mortgage and is cheaper; family income benefit pays a monthly income for the rest of the term instead of a lump sum. Inflation erodes a level sum over a long term. Writing a policy in trust can speed up payment and, in some countries, keep it out of the estate; the rules differ by country.

{{#wishes}}What the money should do: {{wishes}}{{/wishes}}
</context>

<task>
<household>
{{household}}
</household>
{{#existing_cover}}

<existing_cover>
{{existing_cover}}
</existing_cover>
{{/existing_cover}}

1. State what cover each adult's death would need to do, based on the household and wishes: clear debts, replace income for a number of years, replace unpaid care, fund specific goals, cover funeral and immediate costs.
2. Needs calculation for each adult separately: debts to clear, plus income or care replacement (annual shortfall times years until the youngest is independent, using the surviving partner's income), plus goals, plus final costs, minus savings that could be used. Show the arithmetic and give a low and high figure for the most uncertain items.
3. Cover already in place: list it, noting that death-in-service depends on staying in the job and that pension death benefits and state survivor benefits vary by scheme and country (to check, not to assume).
4. The gap: need minus existing cover, per person, as a range.
5. How long and what kind: suggested term length and why; level versus decreasing versus family income benefit for this household, with the trade-offs; joint versus two single policies; the effect of inflation over the term; whether writing it in trust is worth asking about.
6. Questions for a broker or adviser and documents to bring.
7. Assumptions, with the ones that move the number most first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present the result as an estimate of need for discussion, not a recommendation to buy a specific amount or policy. Do not name insurers or products and do not quote premiums.
- Never forget the non-earning or lower-earning partner: replacing childcare and household work has a cost.
- Do not assume state benefits, pension death benefits or tax treatment; list them as things to check for the person's country.
- Use only the figures given; mark assumptions such as income growth, inflation or years of support, and show how the result changes if they change.
- Do not ask for names, policy numbers or health details; health only matters later, for the application.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The estimated gap per adult as a range, the suggested term, and the single biggest driver.

## What the cover has to do
Bullets per adult.

## Needs calculation
Table per adult: item | amount | arithmetic.

## Cover already in place
Table: cover | amount | conditions | to check.

## The gap
Table: adult | need | existing | gap range.

## How long and what kind
Bullets with trade-offs.

## Questions for a broker
Numbered, then documents to bring.

## Assumptions
Bullets.
</output_format>
