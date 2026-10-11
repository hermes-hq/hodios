---
schema: 1
id: review-first-months-of-trading
kind: prompt
title: Review your first months of trading
description: Reviews the first three to six months of a new business - sales, margins and cash against the plan, what is working, what to stop, and the priorities for the next quarter.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [review]
role: [founder, individual]
requires: [none]
inputs: [dataset, notes, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [post-launch-review, plan-vs-actual, early-traction, cash-check, next-quarter-priorities]
pairs_with:
  prompts: [write-business-plan, forecast-cash-flow, evaluate-pivot, plan-first-90-days-of-startup, review-small-business-pnl]
  personas: [small-business-advisor]
args:
  - name: plan
    description: What you expected before launch - sales, customers, prices, costs, cash and milestones. Paste your plan or the key numbers.
    type: text
    required: true
  - name: actuals
    description: What happened month by month - sales, number of customers, average order or project size, costs, cash in the bank, where customers came from, and notable events.
    type: text
    required: true
  - name: observations
    description: What you have noticed - customer feedback, what took more time than expected, what you enjoy or dread, and questions on your mind. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Plan versus actual, What is working, What is not, Cash position, Stop start continue, Next quarter priorities]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders take stock a few months after opening. Early numbers are noisy, but they already show the things that matter: whether customers come back, which channel actually brings paying customers, whether the price covers the true cost of delivery, how fast cash is going, and where the founder's time goes. Founders tend to read the review through hope or panic. A useful review separates the volume of sales from the drivers behind it (traffic or leads, conversion, order size, repeat rate, margin), compares with the plan line by line, and ends with a few decisions rather than a long to-do list.

<plan>
{{plan}}
</plan>

<actuals>
{{actuals}}
</actuals>
{{#observations}}
<observations>
{{observations}}
</observations>
{{/observations}}
</context>

<task>
1. Headline: two or three sentences on how the business is doing against the plan and the single most important finding.
2. Plan versus actual: compare each key number and show the variance. Break revenue into its drivers where data allows (customers × average order × frequency, or leads × conversion × project size) to find which driver is off.
3. What is working: channels, products, customer types and practices with evidence.
4. What is not: the gaps, with the most likely causes and how confident the evidence is given the small sample.
5. Cash position: months of runway at the current burn, including the founder's pay and upcoming known costs; when the business would need more money if nothing changes.
6. Stop, start, continue: a short list for each, tied to the findings.
7. Next quarter priorities: at most three, each with a measurable target and a review date. Say whether the evidence suggests persevering, adjusting the offer or channel, or considering a bigger change.
</task>

<constraints>
- Use only the founder's figures; show calculations and do not fill gaps with invented numbers. Mark missing data and say how to start collecting it.
- Be honest about small samples; avoid strong conclusions from one or two months.
- Do not shame the founder about missed targets; plans made before launch are guesses.
- If cash runway is short (for example under three months), make that the top item.
</constraints>

<output_format>
## Headline
## Plan versus actual
Table: Measure | Plan | Actual | Variance | Note.
## What is working
## What is not
## Cash position
The runway sum.
## Stop start continue
Three short lists.
## Next quarter priorities
Table: Priority | Target | Review date.
</output_format>
