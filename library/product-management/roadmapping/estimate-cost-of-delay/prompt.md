---
schema: 1
id: estimate-cost-of-delay
kind: prompt
title: Estimate cost of delay
description: Estimates the cost of delay for roadmap items, gives each an urgency profile, and sequences them by cost of delay divided by duration, with every assumption shown.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, executive, founder, business-analyst]
requires: [none]
inputs: [text, dataset]
output: [table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [cost-of-delay, cd3, wsjf, sequencing, urgency-profiles, economic-prioritisation]
pairs_with:
  prompts: [prioritize-features, forecast-roadmap-dates-with-ranges, run-quarterly-planning]
args:
  - name: items
    description: The items to sequence, each with what it is, expected value (revenue, savings, risk avoided, or a relative score), how long it takes, and any deadline or window.
    type: text
    required: true
  - name: context
    description: Optional. Team capacity, whether items can run in parallel, and the currency or unit to use.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Cost of delay per item, Sequence, Comparison with current order, Sensitivity, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You sequence work by the economic cost of waiting. Most prioritisation scores value and effort but ignore time: two items of equal value are not equally urgent if one loses its market window next quarter. Cost of delay is the value lost per unit of time an item is not delivered. Dividing it by duration (often called CD3, and close to the weighted shortest job first used in SAFe) puts short, urgent, valuable items first. Urgency profiles matter: some items lose value at a steady rate (standard), some lose most of it after a date (fixed deadline), some lose value permanently with each week (a closing window, such as a competitor locking in customers), and some have little cost now but rising risk later (intangible, such as platform health). The method is sensitive to rough estimates, so the ranking must be tested against the uncertainty, and relative estimates are fine when money figures are not available.
{{#context}}
Context: {{context}}
{{/context}}
</context>

<task>
Items:

<items>
{{items}}
</items>

1. State assumptions: the unit (money per week, or relative points), the time unit, whether items are done one after another or in parallel, and how missing values were handled.
2. For each item, estimate cost of delay per week from the user's figures, showing the arithmetic. If only relative values are available, use a consistent relative scale and say so.
3. Assign an urgency profile (standard, fixed deadline, closing window, intangible) with the reason, and adjust: for fixed deadlines, show the cost of missing the date; for intangible items, describe the rising risk rather than inventing a number.
4. Compute cost of delay divided by duration and sequence the items. Show the total cost of delay of this sequence compared with the user's current order, if they gave one.
5. Test sensitivity: which items change position if their value or duration is off by 50 percent, and which positions are robust.
6. List the estimates most worth confirming before committing, and who could confirm them.
</task>

<constraints>
- Use only the user's values, durations and deadlines. Never invent revenue, market sizes or costs; when a value is missing, use a labelled relative estimate or ask.
- Show every calculation so it can be checked.
- Do not present the ranking as precise; say where it is fragile.
- Note when an item should be split because a smaller first slice captures most of the value sooner.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Cost of delay per item
Table: item | value basis | cost of delay per week | urgency profile | duration | CD3 score.

## Sequence
Numbered list in recommended order with a one-line reason.

## Comparison with current order
Short table or paragraph: total delay cost of each order.

## Sensitivity
Bullets.

## What to confirm
Bullets: estimate, why it matters, who can confirm.
</output_format>
