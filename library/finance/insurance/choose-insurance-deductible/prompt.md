---
schema: 1
id: choose-insurance-deductible
kind: prompt
title: Choose an insurance excess or deductible
description: Works out whether a higher excess or deductible pays off by comparing premium savings with the extra cost per claim, how often you claim, and whether savings could absorb it.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [excess, deductible, break-even, premium-savings, self-insurance]
pairs_with:
  prompts: [compare-home-insurance-quotes, compare-car-insurance, decide-whether-to-make-claim]
args:
  - name: options
    description: "The excess or deductible options and the premium for each (for example 250 excess at 620 a year, 500 at 540, 1,000 at 470), plus any compulsory excess that applies on top, and the type of insurance."
    type: text
    required: true
  - name: situation
    description: Your claims in the last five or so years, how much you could pay at short notice without hardship, and anything that makes a claim more or less likely.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Options compared, Break-even, Can you absorb it, Other things that change the answer, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Choosing a higher excess (deductible) is a bet that you will claim rarely enough for the premium savings to exceed the extra you pay on the claims you do make. The arithmetic is simple: extra cost per claim divided by yearly premium saving gives the number of years without a claim needed to break even. Most households claim on a given policy far less than once a year, which often favours a higher excess, but only if the higher amount could be paid without hardship, because insurance exists for the bills you cannot absorb. Other details change the answer: compulsory excesses add to the voluntary one; some policies have separate, larger excesses for particular perils; small losses are often not worth claiming anyway because of the effect on future premiums, so a low excess can buy cover you would never use; and for health plans the deductible interacts with co-pays and out-of-pocket caps.

{{#situation}}Situation: {{situation}}{{/situation}}
</context>

<task>
<options>
{{options}}
</options>

1. List the options with total excess per claim (voluntary plus compulsory) and annual premium.
2. For each step up in excess, compute the premium saving per year, the extra cost per claim, and the break-even: years without a claim needed for the higher excess to come out ahead.
3. Compare with the person's claim history: expected yearly cost of each option as premium plus (claims per year times excess), for a low and a higher claims rate, labelled as assumptions.
4. Can you absorb it: check each excess against what the person says they could pay at short notice; flag options that would cause hardship regardless of the maths.
5. Other things that change the answer: separate excesses for specific perils, the effect of claiming on future premiums and no-claims discounts, whether small claims would be made at all, and any excess protection products (explain what they are without recommending one).
6. Summarise the trade-off in plain words without choosing for the person.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the premiums and excesses supplied; never invent prices.
- Label any claim frequency not from the person's own history as an assumption.
- Do not recommend a specific product or insurer.
- If the higher excess exceeds what the person can afford at short notice, say so plainly even if the maths favours it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two or three sentences on the trade-off.

## Options compared
Table: option | total excess per claim | annual premium.

## Break-even
Table: step | yearly saving | extra per claim | years to break even.

## Can you absorb it
Bullets.

## Other things that change the answer
Bullets.

## Assumptions
Bullets.
</output_format>
