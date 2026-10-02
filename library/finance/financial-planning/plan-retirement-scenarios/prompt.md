---
schema: 1
id: plan-retirement-scenarios
kind: prompt
title: Project retirement scenarios
description: Projects retirement savings under low, middle and high return assumptions after inflation and fees, translates each into sustainable annual income, and lists the questions to take to an adviser.
category: financial-planning
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [retirement-income, pension, compounding, withdrawal-rate]
pairs_with:
  prompts: [explain-investment-concept, plan-savings-goal]
  personas: [personal-finance-coach]
args:
  - name: current_savings
    description: Total retirement savings today across all accounts (in today's money).
    type: number
    required: true
  - name: contribution
    description: Total yearly contribution including any employer contribution, in today's money.
    type: number
    required: true
  - name: years
    description: Years until you plan to start drawing on the savings.
    type: number
    required: true
  - name: assumptions
    description: Anything you want used or considered - expected state or public pension, contribution increases, fees you pay, target retirement income, current age, other assets. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline range, Scenarios, What it could pay each year, What moves the result most, Not included, Questions for an adviser]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Scenario returns are now stated before fees, and stated fees (or a labelled default) are subtracted exactly once."}
---
<context>
You help someone see a range of plausible retirement outcomes, not a single number to rely on. A projection is only as good as its assumptions, and the honest answer to "how much will I have?" is "somewhere in a range, depending mostly on how long you save, how much, what returns markets deliver, fees and inflation". Working in today's money (real terms) keeps the numbers meaningful: 1,000,000 in thirty years is not 1,000,000 today.

Current savings: {{current_savings}}
Yearly contribution: {{contribution}}
Years to retirement: {{years}}
{{#assumptions}}Stated assumptions and context:

<assumptions>
{{assumptions}}
</assumptions>{{/assumptions}}
</context>

<task>
1. Set three real (after-inflation) annual return scenarios **before fees**: low 2%, middle 4%, high 6%, unless the person supplied their own. Then subtract the yearly fees they stated (all-in: fund charges plus platform or adviser fees) to get the net real return for each scenario. If they stated no fees, assume 0.5% a year, label it as an assumption, and ask what they actually pay. Subtract fees exactly once: never apply them to a return that is already net of fees. Say clearly that these are illustrative assumptions, not forecasts.
2. Project the balance at retirement for each scenario: future value of current savings plus future value of yearly contributions (end-of-year contributions), in today's money. Show the formula once and the inputs.
3. Translate each balance into an annual income in today's money using a range of withdrawal rates (for example 3% and 4%), and explain in two sentences why a withdrawal rate is a rule of thumb with real risks (sequence of returns, longevity, spending changes).
4. If the person gave a target income or expects a state or public pension, compare and show the gap or surplus for each scenario. Do not estimate state pension amounts yourself; use what they give.
5. Show sensitivity: the effect on the middle scenario of contributing 10% more, retiring 3 years later, and fees 0.5 percentage points higher.
6. List what is not included and the questions to take to a regulated financial adviser or pension provider.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend funds, asset allocations, pension products, annuities, or whether to take a lump sum. Explain what those decisions involve only if asked, and refer them to an adviser.
- Show ranges, never a single "you will have" number. Round results to a sensible precision (nearest thousand) to avoid false accuracy.
- Do not model taxes on contributions or withdrawals; state that tax treatment depends on the country and account type and can change the result materially.
- Check the arithmetic: the high scenario must exceed the middle, which must exceed the low.
- If any required input is missing or implausible (negative years, contribution larger than plausible income), ask before projecting.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline range
Two lines: balance range at retirement and income range, in today's money.

## Scenarios
Table: scenario | real return before fees | fees | net real return | balance at retirement | income at 3% | income at 4%.

## What it could pay each year
Short paragraph, including the gap or surplus against any target.

## What moves the result most
Table: change | middle-scenario balance | difference.

## Not included
Bullets (tax, state pension estimates, health costs, other assets).

## Questions for an adviser
Numbered.
</output_format>
