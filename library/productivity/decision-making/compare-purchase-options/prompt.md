---
schema: 1
id: compare-purchase-options
kind: prompt
title: Compare products before buying
description: Compares products before a purchase against your needs and budget - must-haves, trade-offs, total cost of ownership and the facts to verify before paying. Use when choosing between products.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder]
requires: [none]
inputs: [text, preferences]
output: [table, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [buying-guide, total-cost-of-ownership, product-comparison, price-ceiling, trade-offs]
pairs_with:
  prompts: [compare-options-matrix]
args:
  - name: options
    description: The products you are considering, with any specs, prices and links or notes you have, for example "Dyson V15 at 650, Shark Stratos at 380".
    type: text
    required: true
  - name: needs
    description: What you need it for and how you will use it, for example "flat with two cats, mostly hard floors, I have asthma, use it daily".
    type: text
    required: true
  - name: budget
    description: Optional - your budget or price ceiling, for example "under 500 EUR".
    type: string
output_contract:
  format: markdown
  sections: [What matters for you, Comparison, Total cost of ownership, Trade-offs, Verify before buying, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Product comparisons go wrong in three ways: they compare spec sheets instead of the buyer's actual use, they ignore what the product costs over its life (consumables, subscriptions, repairs, energy, resale), and they state prices and specs that may be outdated or wrong. You compare against this buyer's needs, separate what you were told from what you believe from general knowledge, and send them to verify the facts the decision hinges on.

<options>
{{options}}
</options>
<needs>
{{needs}}
</needs>
{{#budget}}
Budget: {{budget}}
{{/budget}}
</context>

<task>
1. Turn the needs into criteria: two to four must-haves (a product that fails one is out; if a need is occasional or could be met another way, such as a feature used twice a year that could be borrowed or rented, make it a nice-to-have and say so) and three to six nice-to-haves, ordered by importance for this use. Add any criterion the buyer did not mention but that matters for this kind of product (warranty, repairability, running costs, noise, compatibility), marked as your addition.
2. Compare the options on those criteria. For every fact, mark the source: "given" (from the user), "typical" (general knowledge, may be out of date or vary by model year and region) or "unknown". Never present a guessed spec, price or rating as fact.
3. Estimate total cost of ownership over a sensible life for the category (say which, for example three or five years): purchase price, consumables, subscriptions, energy, expected repairs or battery replacement, minus likely resale. Show the arithmetic and label every estimate.
4. Name the real trade-offs in one line each ("A cleans better on carpets; B is half the price and you have hard floors").
5. List the facts to verify before buying, ordered by how much they could change the decision, with where to check (manufacturer spec page, independent reviews and long-term tests, the retailer's return policy, warranty terms).
6. Recommend one option for this buyer, or say it is a close call and what single fact would settle it. Mention when a cheaper option, a used or refurbished unit, or not buying covers the need.
</task>

<constraints>
- If needs are too vague to compare (no use case), ask up to three questions and stop.
- If an option exceeds the budget, keep it in the table but say so; do not drop it silently.
- No affiliate-style hype, no invented review scores, no claims about current prices or stock.
- For safety-relevant products (car seats, helmets, electrical items, medical devices), point to the official safety certification or standard to check.
</constraints>

<output_format>
## What matters for you
Must-haves and nice-to-haves, in order.
## Comparison
A table: Criterion | each option. Each cell ends with (given), (typical) or (unknown).
## Total cost of ownership
A table per option over the stated years, with labelled estimates and a total.
## Trade-offs
Bullets.
## Verify before buying
A numbered checklist with where to check.
## Recommendation
Two or three sentences.
</output_format>
