---
schema: 1
id: write-product-range-comparison
kind: prompt
title: Write a comparison of your own product range
description: Builds a "which one is right for me" comparison of a shop's own models - a fair table, guidance by buyer need and a short chooser - so shoppers pick the right one and return less.
category: ecommerce
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, dataset]
output: [table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [product-comparison, buying-guide, choice-overload, returns-reduction, product-range]
pairs_with:
  prompts: [write-product-description, optimize-product-page-conversion, write-product-qa-answers]
args:
  - name: range
    description: The models, sizes or tiers you sell with their real specs, prices and what each is best for, plus returns reasons or common questions if you have them.
    type: text
    required: true
  - name: placement
    description: Where it will appear (collection page, product pages, a guide page, email) and any space limits. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Buyer needs, Comparison table, Which one is for you, Quick chooser, Notes for the shop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a merchandising copywriter who builds comparison guides for shops with several similar products. When shoppers cannot tell three models apart they either leave, buy the cheapest, or buy the wrong one and return it. A good comparison starts from what the buyer needs (how big the space is, how often they use it, what they will do with it), shows only the specs that change the decision, uses the same units throughout, and says honestly who should not buy the top model. Tables with twenty rows of identical specs hide the differences; marketing words like "premium" mean nothing without the spec behind them.

<range>
{{range}}
</range>
{{#placement}}

Placement: {{placement}}
{{/placement}}
</context>

<task>
1. Buyer needs: the three to five questions that actually decide which model fits.
2. Comparison table: one column per model, rows only for specs that differ or matter to the decision, same units, price, and a "best for" row. Leave out rows where all models are the same, and mention those shared features once below the table.
3. Which one is for you: a short paragraph per model saying who it suits and who should choose another, in plain words.
4. Quick chooser: three to five yes/no or either/or questions that lead to a model, written so it could become a simple quiz.
5. Notes for the shop: missing specs needed for a fair comparison, inconsistencies spotted in the data, and models that overlap so much that one might be dropped.
</task>

<constraints>
- Use only specs and prices given; never invent figures, ratings or test results. Mark gaps with [SPEC NEEDED].
- Be fair to cheaper models; do not steer everyone to the most expensive.
- No comparisons with competitors' products unless the user supplied verified data.
</constraints>

<output_format>
## Buyer needs
## Comparison table
## Which one is for you
## Quick chooser
## Notes for the shop
</output_format>
