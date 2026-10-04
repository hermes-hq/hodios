---
schema: 1
id: estimate-problem-cost
kind: prompt
title: Estimate what a problem costs
description: Estimates the yearly cost of a customer or operational problem from rough inputs, with every assumption visible, a low-base-high range and cash kept apart from capacity. Use to size a fix.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, business-analyst, operations-manager]
requires: [none]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cost-of-problem, business-case, sizing, assumptions, sensitivity]
pairs_with:
  prompts: [write-opportunity-assessment, map-internal-tool-workarounds, write-problem-statement]
args:
  - name: problem_description
    description: The problem, who it affects and how it shows up (time lost, errors, rework, refunds, churn, complaints, fines).
    type: text
    required: true
  - name: known_numbers
    description: Any numbers you have, even rough - volumes, people affected, minutes per case, hourly costs, refund amounts, churn, error rates - and where each comes from.
    type: text
    required: true
  - name: currency
    description: Currency code for the figures (USD, EUR, GBP, BRL).
    type: string
    default: USD
output_contract:
  format: markdown
  sections: [Headline range, Cost model, Cash versus capacity, Assumptions, The number to check first, What this does not include]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who sizes problems before teams spend money fixing them. Cost estimates lose credibility in three ways: they present one confident number built on a guess; they count the same loss twice (the support time to handle a complaint and the complaint itself, or churn and the lost revenue of the same customers); and they add up staff time as if it were cash, when saving ten minutes a day per person frees capacity but saves no money unless hours, overtime, agency staff or hiring actually change. A credible estimate shows each driver, keeps cash and capacity apart, gives a range, and says which input matters most.

Currency: {{currency}}
</context>

<task>
Problem:

<problem_description>
{{problem_description}}
</problem_description>

Known numbers:

<known_numbers>
{{known_numbers}}
</known_numbers>

1. Break the problem into cost drivers, each a separate line: staff time, rework, errors and write-offs, refunds and compensation, lost revenue (churn, abandoned purchases), extra support contacts, penalties or compliance exposure, and customer time if relevant (as a non-financial line).
2. For each driver, write the formula as volume x rate x unit cost per year, and fill it from the known numbers. Where a number is missing, use a clearly labelled assumption with a low, base and high value and a one-line reason. Annualise consistently (state working days per year, for example 220-250).
3. Check for double counting: if two drivers describe the same event or the same customers, keep one and note the other.
4. Classify every line as cash (money actually leaves or does not arrive) or capacity (time that could be redeployed). Load staff time at a fully loaded hourly cost if given; if only salary is given, say that on-costs typically add a meaningful percentage depending on country and ask for the real figure.
5. Total low, base and high separately for cash and capacity.
6. Sensitivity: identify the one assumption that moves the total the most (change it to its low and high and show the effect) and say how to check it cheaply (a week of tallying, a report query, a sample of 30 cases).
7. List what is excluded and why (reputational harm, staff morale, regulatory risk that cannot be priced).
</task>

<constraints>
- Show all arithmetic so a sceptical reader can check it; totals must add up.
- Never present an assumption as a fact. Every number is tagged as given or assumed.
- Do not add capacity to cash in a single headline figure.
- A driver with no given number at all (for example "some people churn") is not filled with invented values: list it as "not yet sized" under What this does not include, with the one question or count that would size it, and keep it out of the totals.
- If neither volumes nor any unit cost is given, ask for the two or three numbers that would make an estimate possible (how often it happens, how long or how much each time, how many people) and stop.
- Round sensibly: two significant figures in the headline.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline range
Two lines: cash cost per year (low-base-high) and capacity cost per year (low-base-high, in hours and in {{currency}}).

## Cost model
Table: driver | formula | volume | rate | unit cost | low | base | high | given or assumed | cash or capacity.

## Cash versus capacity
Short paragraph on what would have to change for capacity savings to become cash.

## Assumptions
Numbered list with each assumed value and its reason.

## The number to check first
The most sensitive input, its effect on the total, and how to check it.

## What this does not include
Bullets.
</output_format>
