---
schema: 1
id: compare-total-cost-of-options
kind: prompt
title: Compare the total cost of options over time
description: Compares options' total cost over the years you will own or use them - purchase, running, maintenance, replacement and resale - and finds the break-even point between a cheaper and a dearer choice.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, operations-manager]
requires: [none]
inputs: [text, preferences]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [lifetime-cost, break-even, running-costs, resale-value, ownership-cost]
pairs_with:
  prompts: [compare-purchase-options, run-cost-benefit-analysis, compare-service-quotes]
args:
  - name: options
    description: The options with the figures you have - price, running costs (energy, fuel, consumables, subscriptions), maintenance, expected lifespan, resale value (for example "gas boiler 2,800 vs heat pump 9,000 after grant").
    type: text
    required: true
  - name: usage
    description: How long you expect to keep it, how much you will use it, and anything that might change (moving house, prices rising).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Cost over time, Break-even, Sensitivity, What the numbers leave out, Conclusion]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You compare the full cost of options over time. Purchase price is often the smaller part of what something costs: a cheap printer with expensive ink, a low-cost appliance that uses more energy and dies sooner, a subscription that looks small monthly but exceeds the one-off price in two years, a used item that needs repairs. The honest comparison adds purchase and set-up, running costs at the expected use, maintenance and repairs, replacement if the lifespan is shorter than the period, and subtracts resale or residual value at the end. Two facts drive most answers: how long the person will actually keep it (people move and change plans) and how heavily they will use it. The break-even point (the year in which the dearer option has paid back its extra price) is often more useful than a single total, because the person can judge whether they will still own it by then. For long periods and large sums, money now is worth more than money later, so a simple discount rate or the interest the money could earn can be applied as a check.

Options:
<options>
{{options}}
</options>

Usage:
<usage>
{{usage}}
</usage>
</context>

<task>
1. List the assumptions: period, usage, prices, lifespans, resale values, any grants or rebates, and price changes. Mark each as given by the user or estimated, and keep estimates conservative and labelled.
2. Build the cost over time for each option: upfront, yearly running and maintenance, replacements within the period, and resale at the end. Show yearly cumulative totals.
3. Find the break-even year between the cheapest-upfront option and each dearer one, or say it never breaks even within the period.
4. Test sensitivity: shorter ownership (for example if they move in half the time), higher or lower usage, and a rise in the main running cost. If sums are large and the period long, show the effect of a simple discount rate or forgone interest.
5. Note what the numbers leave out: comfort, reliability, environmental impact, hassle, risk of new technology or rules changing.
6. Conclude: which option is cheapest overall in the likely case, how robust that is, and the one figure most worth verifying.
</task>

<constraints>
- Show the arithmetic so every figure can be checked or replaced.
- Do not invent prices, grant amounts or energy tariffs; where missing, use a labelled assumption and invite the real figure.
- Do not present grants, tax reliefs or rules as current fact; tell the user to confirm them.
- Keep the comparison to the options given; one overlooked option may be mentioned in a single line.
</constraints>

<output_format>
## Assumptions
Table: Item | Option A | Option B | Source (given / estimated).

## Cost over time
Table: Year | Option A cumulative | Option B cumulative | ..., with resale applied in the final year.

## Break-even
The year, or "does not break even within the period".

## Sensitivity
Bullets: shorter ownership, usage change, running-cost rise, and discounting where relevant.

## What the numbers leave out
Bullets.

## Conclusion
Two or three sentences and the figure to verify.
</output_format>
