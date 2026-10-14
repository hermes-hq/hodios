---
schema: 1
id: compare-state-pension-claiming-ages
kind: prompt
title: Compare state pension claiming ages
description: Compares claiming a state pension or Social Security at different ages - lifetime totals, breakeven age, survivor effects, how to fund the gap and what to check with the pension agency.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
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
depth: specific
tags: [state-pension, social-security, deferral, breakeven-age, retirement-income]
pairs_with:
  prompts: [understand-pension-statement, plan-retirement-drawdown, compare-pension-lump-sum-vs-income, plan-early-retirement-bridge]
  personas: [personal-finance-coach]
args:
  - name: entitlement
    description: The amounts from your official statement at each claiming age you can choose (earliest, normal, latest), or the normal amount and the country's increase or reduction rules if you have them.
    type: text
    required: true
  - name: situation
    description: Age, health and family longevity as you see it, whether still working, other income and savings, partner's age and pension, and whether a survivor benefit depends on your claim.
    type: text
    required: true
  - name: country
    description: Country of the state pension, plus country of residence if different.
    type: string
output_contract:
  format: markdown
  sections: [The choice, Lifetime comparison, Breakeven and longevity, Couple and survivor effects, Funding the gap, Questions for the pension agency, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide when to claim a state pension or Social Security. Many systems let you claim earlier for a permanently reduced amount or later for a permanently increased one; others have a fixed age with only deferral. The decision is less about "getting your money back" and more about insurance: a larger lifetime income, often inflation-linked (check the rules in your country), protects against living a long time, which is the expensive risk. The breakeven age, where the cumulative total from waiting overtakes claiming early, is useful but should be read against realistic life expectancy, which for a healthy person reaching their sixties is often well into the eighties, and longer for at least one member of a couple. For couples, the higher earner's claiming age can set a survivor's income for decades. Claiming early can make sense with poor health, no other way to fund the gap, or when an earnings test or benefit rule favours it; waiting needs savings or work to bridge the years. Rules on working while claiming, taxation, and whether deferral increases are inflation-linked vary by country.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Entitlement:

<entitlement>
{{entitlement}}
</entitlement>

Situation:

<situation>
{{situation}}
</situation>

1. State the choice in one or two lines: which ages are available and the yearly amount at each, using the person's figures. If they gave only rules, compute the amounts and mark them "check against your official statement".
2. Build a lifetime comparison in today's money: cumulative total received by ages 75, 80, 85, 90 and 95 for each claiming age, with the arithmetic shown once.
3. Give the breakeven age between each pair of options and put it next to the longevity the person describes, without claiming to know their life expectancy.
4. For couples, show how the claiming choice affects the household now and the survivor's income later, where the person has said such a link exists or where it commonly exists in that country (marked "verify").
5. Show how the gap years would be funded if waiting (savings drawn, work, partner's income), and what that does to savings, including the option of drawing private savings first and claiming later.
6. List rules to confirm: earnings tests or limits on working while claiming, tax, whether increases are inflation-linked, record gaps that voluntary contributions could fill, and any deadlines.
7. State assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent claiming ages, reduction or increase rates, or benefit rules. Mark any rule you state with country and "verify against the official agency".
- Do not predict the person's lifespan. Use their own view and say it is uncertain.
- Do not tell the person when to claim. Show the trade-off between early cash and a larger lifelong income.
- Use today's money and say so; note whether the pension is inflation-linked if the person or the official rules say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## The choice
One or two lines and a small table: claiming age | yearly amount.

## Lifetime comparison
Table: claiming age | total by 75 | 80 | 85 | 90 | 95.

## Breakeven and longevity
Short explanation.

## Couple and survivor effects
Bullets, or "not applicable".

## Funding the gap
Short plan with figures.

## Questions for the pension agency
Bullets.

## Assumptions
Bullets.
</output_format>
