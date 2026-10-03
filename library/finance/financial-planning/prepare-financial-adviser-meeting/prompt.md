---
schema: 1
id: prepare-financial-adviser-meeting
kind: prompt
title: Prepare for a financial adviser meeting
description: Prepares for a meeting with a financial adviser with a clear aim, a one-page financial snapshot, documents to bring, questions about fees and conflicts, and what to ask for afterwards.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, questions, summary]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [financial-adviser, meeting-prep, advisory-fees, conflicts-of-interest, suitability]
pairs_with:
  prompts: [choose-financial-advisor, compare-ways-to-invest, plan-retirement-drawdown, plan-windfall]
  workflows: [financial-checkup-track]
  personas: [investing-educator]
args:
  - name: goals
    description: What you want from this meeting and from your money - for example a retirement date, what to do with an inheritance, paying for children's education, reviewing pensions - and any decision you are facing.
    type: text
    required: true
  - name: finances_overview
    description: A rough picture of income, spending, savings, investments, pensions, property, debts and insurance, and anything already proposed by the adviser. Optional; a blank snapshot template is given without it.
    type: text
  - name: country
    description: Country, since adviser regulation, titles and disclosure rules differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your aim for the meeting, One-page snapshot, Documents to bring, Questions about the adviser, Questions about your goals, Listen for, After the meeting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People get far more from an adviser meeting when they arrive with a clear question, an organised picture of their finances, and the questions that reveal how the adviser is paid and whose interest they serve. Without that, the first meeting is spent gathering facts, the conversation drifts toward products, and fees are discussed as percentages that hide how much money they are. This preparation works for a first meeting, a review with an existing adviser, or a meeting about a specific proposal.

{{#country}}Country: {{country}}{{/country}}

<goals>
{{goals}}
</goals>
{{#finances_overview}}<finances_overview>
{{finances_overview}}
</finances_overview>{{/finances_overview}}
</context>

<task>
1. Your aim for the meeting: turn the goals into one primary question and two secondary ones, and state what a useful outcome would be (for example a written recommendation on pension consolidation with all costs).
2. One-page snapshot: organise their figures into income, spending, assets (cash, investments, pensions, property), debts with rates, insurance, family and dependants, and attitudes (how they reacted to past market falls, what worries them). Mark gaps as [X]. If no figures were given, give the blank template.
3. Documents to bring: a checklist tailored to the goals (recent pension and investment statements, payslips, tax return, mortgage statement, insurance policies, will, any proposal received), with a reminder to redact account numbers and not to share passwords.
4. Questions about the adviser: 10-12 questions grouped under regulation and duty (are you authorised, can I check the register, do you have a duty to act in my best interest, are you independent or restricted to certain products), fees in money (initial, ongoing, product, fund and platform costs, all as amounts for my situation, in writing), conflicts (commissions, in-house products, incentives), service (what ongoing service I get, how often we meet, how to stop).
5. Questions about your goals: 6-8 questions specific to their situation and decision.
6. Listen for: red flags in the meeting - pressure to decide quickly, guaranteed or unusually high returns, reluctance to put fees in money or in writing, recommending products before understanding the situation, unregulated investments, advice to move pensions with valuable guarantees without explaining what is lost.
7. After the meeting: ask for the recommendation and its reasons in writing (a suitability report or similar), the total cost in money, time to decide, comparing with a second opinion for large decisions, and checking the register again before signing.
8. If the amount at stake is small relative to likely fees, say so and mention free or low-cost guidance services that may exist in their country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Help the person prepare and question; do not evaluate the adviser's specific product recommendations as good or bad, or suggest alternative products.
- If they mention a proposal with red flags (guaranteed high returns, large upfront fees, unregulated schemes, transferring out of a guaranteed pension), name the red flags clearly and suggest verifying with the regulator's register and getting a second opinion.
- Do not name specific advisers or firms; you may name regulator or register types.
- Use only their figures; mark gaps.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your aim for the meeting
Primary question, two secondary ones, and the outcome to ask for.

## One-page snapshot
Compact tables or bullets.

## Documents to bring
Checklist.

## Questions about the adviser
Numbered, grouped.

## Questions about your goals
Numbered.

## Listen for
Bullets.

## After the meeting
Checklist.
</output_format>
