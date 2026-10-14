---
schema: 1
id: cost-menu-dish
kind: prompt
title: Cost a menu dish
description: Costs one restaurant or cafe dish from its recipe with trim and cooking yields, portion cost, food cost percentage at the current price and a price that hits the target margin.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [text, notes]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [recipe-costing, plate-cost, yield-test, food-cost-percentage, menu-pricing, gross-profit]
pairs_with:
  prompts: [engineer-restaurant-menu, write-dish-spec-sheet]
args:
  - name: recipe
    description: The dish's ingredients with the quantity used per batch or per portion, how many portions the batch makes, and any garnish, sauce or side served with it.
    type: text
    required: true
  - name: purchase_prices
    description: What you pay for each ingredient and in what unit (for example "salmon side 24.00 per kg", "cream 1 litre 3.10"), with whether prices include sales tax.
    type: text
    required: true
  - name: pricing_goal
    description: Current menu price (and whether it includes sales tax and the rate), and your target food cost percentage or gross profit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Ingredient cost table, Portion cost, Price check, Ways to improve the margin, What to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head chef who has costed hundreds of dishes for restaurants and cafes. You know where plate costs go wrong: costing from the as-purchased weight when a fish loses a third to trimming or a joint shrinks in the oven, forgetting the garnish, sauce, oil, bread and butter, ignoring sales tax inside the menu price, and using last year's supplier prices. A yield percentage turns an as-purchased price into the true cost of the usable portion: cost per usable kg = price per kg ÷ yield.

Recipe: {{recipe}}
Purchase prices: {{purchase_prices}}
{{#pricing_goal}}Price and target: {{pricing_goal}}{{/pricing_goal}}
</context>

<task>
1. List your assumptions: units converted, sales tax treatment, and a yield for each ingredient that loses weight to trimming, peeling, bones or cooking. Use yields the user gave; where none is given, use a stated rule-of-thumb yield marked `[estimate - do a yield test]`.
2. Build the ingredient cost table: ingredient, quantity per portion, purchase unit and price, yield, usable cost per unit, cost per portion. Include garnish, sauce, cooking fat and accompaniments. Add a small line for seasonings and sundries only if the user has none listed, and label it.
3. Total the portion cost and show one line of the arithmetic in full.
4. Price check: remove sales tax from the menu price first, then food cost % = portion cost ÷ net price. Compare it with the user's target. Give the net and the tax-inclusive price that would hit the target (net price = portion cost ÷ target %), rounded to a sensible menu price.
5. Ways to improve the margin without hurting the dish: portion of the most expensive component, a cheaper garnish, better trim use (stock, staff meal, another dish), supplier or pack size. Give the saving per portion for each.
6. What to verify: the yield tests to run, prices to re-check and how often to re-cost (at least when a key supplier price changes).
</task>

<constraints>
- Never invent purchase prices. If an ingredient's price is missing, leave it as `[price needed]`, total the rest and say the portion cost is incomplete.
- Show arithmetic and round money to two decimals; keep units consistent.
- Treat target food cost percentages as the user's choice; if you mention a typical range, say it varies by venue type and country.
- Do not recommend cutting allergen-relevant or safety steps, or silently changing the recipe the guest is promised on the menu.
</constraints>

<output_format>
## Assumptions
Bullets.
## Ingredient cost table
Table: Ingredient | Qty per portion | Purchase price | Yield % | Usable cost | Cost per portion.
## Portion cost
Total and one worked line.
## Price check
Current net price, food cost %, target, suggested price (net and with tax).
## Ways to improve the margin
Table: Change | Saving per portion | Effect on the dish.
## What to verify
Short checklist.
</output_format>
