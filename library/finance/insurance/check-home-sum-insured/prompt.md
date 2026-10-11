---
schema: 1
id: check-home-sum-insured
kind: prompt
title: Check your home's sum insured
description: Checks whether a home's buildings and contents sums insured are enough by estimating rebuild cost and contents value, explaining the underinsurance penalty, and listing what to ask the insurer.
category: insurance
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [rebuild-cost, underinsurance, average-clause, contents-value, sum-insured]
pairs_with:
  prompts: [build-home-inventory, compare-home-insurance-quotes, explain-insurance-policy]
args:
  - name: policy
    description: "Current buildings and/or contents sums insured, whether contents is unlimited or bedroom-rated, whether sums are index-linked, and any underinsurance or average clause wording."
    type: text
    required: true
  - name: home
    description: "The property (type, floor area, age, construction, special features such as a listed status or unusual materials, outbuildings, walls and fences), recent improvements, and country or region."
    type: text
    required: true
  - name: contents
    description: Rough totals or an inventory by room, plus valuables, bikes, electronics and anything high value.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Rebuild cost estimate, Contents estimate, What underinsurance would cost you, Questions for the insurer, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Buildings insurance should cover the cost to rebuild the home from scratch, which is not the market value: it excludes the land, but includes demolition and site clearance, professional fees, meeting current building regulations, and outbuildings, walls and fences. Rebuild cost can be higher than market value for older, larger or unusual homes and lower for small homes in expensive areas. Many insurers apply an underinsurance or average clause: if the sum insured is, say, 70% of the true value, they may pay only 70% of every claim, even a small one. Contents sums insured are usually guessed and too low, because people forget the value of clothes, kitchen items, furniture and books, and value items at what they paid years ago rather than current replacement cost. Improvements (an extension, a new kitchen) raise rebuild and contents values. Rebuild cost calculators run by insurers' or surveyors' bodies exist in some countries; a surveyor gives the best figure for unusual properties.

<home>
{{home}}
</home>
</context>

<task>
<policy>
{{policy}}
</policy>
{{#contents}}

<contents>
{{contents}}
</contents>
{{/contents}}

1. Rebuild cost: list the elements a rebuild includes for this home and explain how to estimate it (floor area times a local rebuild rate from a recognised calculator or surveyor, plus outbuildings, external works, demolition and fees). If the person gives a rate or calculator figure, compute it; otherwise show the method with the rate left as [X] to look up. Flag features that make standard calculators unreliable.
2. Contents: estimate replacement value room by room from what is given, prompting for commonly forgotten categories, and list valuables and items that may exceed single-item limits and need specifying.
3. Compare both estimates with the current sums insured and say whether each looks low, about right or high, with the size of the gap.
4. What underinsurance would cost: explain the average clause in plain words and work an example using their figures for a modest claim and a large one. If the policy has no such clause or uses unlimited or bedroom-rated cover, say what conditions apply instead and to check them.
5. Questions for the insurer or broker, and when to recheck (after improvements, big purchases, or every renewal).
6. Assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never use market value or purchase price as the rebuild cost.
- Do not invent rebuild rates per square metre; use only a figure the person supplies or leave a placeholder with where to find it.
- Do not tell the person to set a specific sum insured; show the estimate, the gap and the method, and suggest a surveyor for listed, large or non-standard homes.
- Quote the policy's own wording for the average clause if supplied; otherwise describe it as common and to be checked.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Whether buildings and contents look underinsured, by roughly how much, and the first action.

## Rebuild cost estimate
Table: element | basis | amount or [X].

## Contents estimate
Table: room or category | estimate | items to specify.

## What underinsurance would cost you
Worked examples.

## Questions for the insurer
Numbered, plus when to recheck.

## Assumptions
Bullets.
</output_format>
