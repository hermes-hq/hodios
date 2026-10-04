---
schema: 1
id: calculate-break-even-roas
kind: prompt
title: Calculate break-even ROAS
description: Works out break-even and target ROAS and cost per acquisition from price, costs, fees, returns and repeat purchase, showing every formula, so a shop owner knows when ads stop losing money.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [roas, break-even-cpa, contribution-margin, unit-economics, repeat-purchase, target-setting]
pairs_with:
  prompts: [calculate-product-margin, analyze-ad-performance, plan-media-budget, pace-ad-budget]
  personas: [paid-media-specialist]
args:
  - name: unit_economics
    description: Average order value and whether it includes sales tax or VAT and shipping charged; product cost per order; shipping and packaging you pay; payment and marketplace fees; return or refund rate and what a return costs you; any discount codes used in ads. Rough numbers are fine.
    type: text
    required: true
  - name: repeat_purchase
    description: How often customers buy again, for example "30% reorder within a year, average 1.5 extra orders". Optional; first-order numbers are used if empty.
    type: string
output_contract:
  format: markdown
  sections: [The numbers to remember, Working, Target settings, Sensitivity, Assumptions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs an online shop or small brand and sees ROAS (revenue divided by ad spend) in their ad dashboards without knowing what number they need. A "4x ROAS" can lose money on a low-margin product and a "1.5x" can be profitable on a high-margin subscription. Owners get this wrong in four ways: using gross margin that ignores shipping, fees and returns; comparing a platform ROAS that counts revenue including tax and shipping with a margin that does not; ignoring discount codes used in the ads; and either ignoring repeat purchases or counting optimistic lifetime value nobody has measured.
</context>

<task>
<unit_economics>
{{unit_economics}}
</unit_economics>

{{#repeat_purchase}}Repeat purchase: {{repeat_purchase}}{{/repeat_purchase}}

1. If average order value or product cost per order is missing, ask in one message and stop. Fill other gaps with a clearly labelled assumption.
2. Net revenue per order: average order value minus sales tax or VAT included in it, minus the average discount. State whether the ad platform's reported revenue is likely to include tax and shipping and how that shifts the target.
3. Contribution per order before ads: net revenue minus product cost, shipping and packaging paid, payment and marketplace fees, and expected return cost (return rate times cost per return, including unsellable stock). Show each line.
4. First-order numbers: break-even CPA = contribution per order; break-even ROAS = net revenue per order divided by contribution per order. Explain each in one sentence.
5. Target with profit: for a desired profit per order (offer 10%, 20% and 30% of net revenue as options), target CPA = contribution minus desired profit; target ROAS = net revenue divided by target CPA.
6. If repeat purchase data is given: 12-month contribution per customer (first order plus expected repeat orders times contribution, with repeat orders discounted by half if the data is a guess), and the resulting 12-month break-even CPA and ROAS. Say this is only safe with cash to wait for the repeat orders and with retargeting and email costs counted.
7. Sensitivity: how break-even ROAS moves if the return rate rises by 5 points, the average discount doubles, or the average order value drops 10%.
</task>

<constraints>
- Show every formula with the user's numbers; round money to two decimals and ROAS to one decimal.
- Do not invent costs or fee percentages; where a typical figure is used, label it an assumption and say where to find the real one (payment processor statement, carrier invoices, returns log).
- Do not give tax advice; just keep tax out of revenue and tell the user to confirm their tax treatment with an accountant if unsure.
- Point out that platform-reported ROAS overstates what ads caused, so the safer test compares total revenue with total ad spend over the same period.
</constraints>

<output_format>
## The numbers to remember
A short table: Measure | First order | 12-month (if available). Rows: break-even CPA, break-even ROAS, target CPA, target ROAS.

## Working
Numbered lines with formula and result.

## Target settings
Which number to enter as a target in the platform and how to adjust it if the platform counts tax or shipping.

## Sensitivity
A table: Change | New break-even ROAS.

## Assumptions to check
Bullets.
</output_format>
