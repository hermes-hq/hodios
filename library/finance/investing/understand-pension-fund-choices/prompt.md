---
schema: 1
id: understand-pension-fund-choices
kind: prompt
title: Understand your workplace pension fund choices
description: Explains the fund options in a workplace pension or retirement plan - default, target-date or lifestyle, index and active - with costs in money and how glide paths work, without picking one.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [workplace-pension, default-fund, target-date-funds, glide-path]
pairs_with:
  prompts: [compare-retirement-accounts, understand-pension-statement, calculate-fee-drag, assess-risk-tolerance]
  personas: [investing-educator]
args:
  - name: fund_list
    description: The fund options your plan offers, with names, charges and descriptions (from the plan's fund guide), and which one you are in now.
    type: text
    required: true
  - name: about_you
    description: Your age or years to retirement, pot size, monthly contributions, and how you plan to take the money (lump sum, annuity, drawdown) if you know. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your options in plain words, The default fund, How the glide path works, Costs in money, Matching the fund to how you will take the money, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most workplace pension members stay in the default fund, which is designed for a typical member and is often reasonable, but members rarely know what it is. Common designs: target-date or lifecycle funds that hold mostly shares when retirement is far away and move gradually into bonds and cash as it approaches (the "glide path"); lifestyle strategies in which the plan switches funds on the member's behalf in the final 5-15 years; and self-select ranges of index, active, ethical, Shariah, property and cash funds. The glide path is built around an assumed retirement date and an assumed way of taking the money: one designed for buying an annuity or taking cash at retirement moves more into bonds and cash than one designed for staying invested in drawdown. If the member's real plan differs, or their selected retirement age is wrong, the de-risking may happen at the wrong time. Charges on workplace funds are often low but differ between options, and small differences matter over decades.

<fund_list>
{{fund_list}}
</fund_list>
{{#about_you}}About you: {{about_you}}{{/about_you}}
</context>

<task>
1. Your options in plain words: group the funds by type (default or lifecycle, equity index, active, bonds, cash, ethical or faith-based, property, other), each with one line on what it does and the charge.
2. The default fund: what it holds now for someone their age, how it changes, and the assumptions it is built on (retirement age and how the money is taken), from the fund guide or marked as unknown.
3. How the glide path works: an illustrative table of the share/bond/cash mix at 20, 10, 5 and 0 years before the selected retirement date, using the plan's figures if given or a labelled example.
4. Costs in money: the yearly cost of the current fund and two alternatives on their pot, and a rough difference over their years to retirement at an illustrative return, labelled.
5. Matching the fund to how you will take the money: explain why the selected retirement age and the intended way of taking the money matter for a lifestyle fund, and what to check if their plan differs from the fund's assumption.
6. Questions to check with the plan administrator, HR or a licensed adviser (including switching costs, whether contributions and existing pot switch separately, and whether the employer match is affected).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not choose a fund for them or say the default is right or wrong for them.
- Use only fund details supplied; mark missing information rather than describing a named fund from memory.
- Illustrative returns and glide paths must be labelled as such.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your options in plain words
Table: fund | type | what it does | charge.

## The default fund
Short paragraph.

## How the glide path works
Table: years to retirement | shares | bonds | cash.

## Costs in money
Table: fund | yearly cost now | rough difference to retirement.

## Matching the fund to how you will take the money
Short paragraph and checks.

## Questions to check
Bullets.
</output_format>
