---
schema: 1
id: set-free-shipping-threshold
kind: prompt
title: Set a free shipping threshold
description: Works out a free shipping threshold for an online shop from order value spread, shipping cost and margin, models what it does to profit and basket size, and plans a test and the wording.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [free-shipping, average-order-value, shipping-costs, margin, basket-size, ab-testing]
pairs_with:
  prompts: [write-shipping-policy-page, plan-order-fulfilment, plan-cross-sells-and-upsells]
args:
  - name: orders
    description: Order values over a recent period (a list, a histogram or percentiles), number of orders, current shipping charges, and the share of orders already shipping free.
    type: text
    required: true
  - name: costs
    description: Average shipping cost per order by zone or weight band, packaging, gross margin percentage, and any shipping you charge or subsidise today.
    type: text
    required: true
  - name: context
    description: Competitors' thresholds if known, your countries, cheap add-on products that could help customers reach the threshold, and goals (profit, conversion, AOV). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the data says, Candidate thresholds, Recommendation, Test plan, Wording, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce analyst who has set and tested shipping thresholds. A threshold works by nudging customers whose basket sits just below it to add something, so the useful range is usually a little above the current median or average order value, where many orders cluster just below. Set it too low and you give away shipping on orders that would have paid; too high and nobody reaches it and it reads as a penalty. The cost is not just the shipping on qualifying orders: orders above the threshold that used to pay shipping now do not. The gain is the margin on extra items added, plus any lift in conversion. Heavy or bulky items, remote zones and returns can break the maths, and customers stretching to the threshold may return the add-on.

<orders>
{{orders}}
</orders>

<costs>
{{costs}}
</costs>
{{#context}}

<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. What the data says: the order value distribution (median, average, where orders cluster), how many orders sit within 10 to 30 percent below each candidate threshold, and current shipping revenue and cost.
2. Candidate thresholds: model three thresholds. For each: orders that would newly ship free, lost shipping revenue, shipping cost absorbed, how many orders would need to move up and by how much to break even, and the margin gained per moved order. Show the formulas so the user can rerun them.
3. Recommendation: one threshold with the break-even condition stated plainly ("this pays if at least X% of orders between A and B add an item worth C"). Note zones or product types to exclude.
4. Test plan: how to test (time-based or split by visitor if the platform allows), how long, minimum orders needed, metrics (conversion, AOV, contribution margin per visitor, return rate of add-ons), and the decision rule.
5. Wording: banner text, a cart progress message ("You're X away from free delivery"), and product page lines, with suggested low-cost add-ons from the user's catalogue.
6. Assumptions: every number you had to assume.
</task>

<constraints>
- Use only the user's numbers; mark assumptions and keep them adjustable.
- Judge on contribution margin, not revenue or AOV alone.
- Do not claim what competitors charge unless the user gave it.
- Warn when the data is too small to tell (for example under a few hundred orders).
{{> output/uncertainty}}
</constraints>

<output_format>
## What the data says
## Candidate thresholds
| Threshold | Newly free orders | Shipping cost absorbed | Lost shipping revenue | Orders needed to move | Break-even condition |
## Recommendation
## Test plan
## Wording
## Assumptions
</output_format>
