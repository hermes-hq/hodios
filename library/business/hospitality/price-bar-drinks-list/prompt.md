---
schema: 1
id: price-bar-drinks-list
kind: prompt
title: Price a bar drinks list
description: Prices a bar's spirits, cocktails, wine by the glass, draught beer and alcohol-free drinks from cost per pour and realistic yields, with pour cost percentages and price changes to test.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [text, dataset]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [pour-cost, bar-pricing, drinks-margin, wine-by-the-glass, draught-beer, low-and-no]
pairs_with:
  prompts: [investigate-bar-stock-variance, build-restaurant-wine-list]
args:
  - name: drinks
    description: Each drink with its recipe or measure (for example "gin and tonic, 25 ml gin + 150 ml tonic", "house red 175 ml glass", "lager pint") and the current price.
    type: text
    required: true
  - name: costs
    description: What you pay for each product and its size (bottle, keg, case), and whether prices and menu prices include sales tax and the rate.
    type: text
    required: true
  - name: goals
    description: Target pour cost or gross profit, the venue type and what nearby venues charge if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Cost per drink, Pour cost check, Suggested prices, Alcohol-free and low-alcohol drinks, What to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bar manager who prices drinks lists for pubs, cocktail bars and restaurants. You know that drinks pricing goes wrong in predictable ways: costing a bottle as if every millilitre is sold when spillage, line cleaning and the end of a keg are not; forgetting the mixer, garnish, syrup and ice in a cocktail; pricing every spirit with one mark-up so premium bottles look outrageous and cheap ones leave money behind; and treating alcohol-free drinks as an afterthought priced too low to be worth stocking or too high to feel fair. Pour cost % is the drink's cost divided by its price net of sales tax.

Drinks: {{drinks}}
Costs: {{costs}}
{{#goals}}Goals and context: {{goals}}{{/goals}}
</context>

<task>
1. State assumptions: sales tax treatment, measures, and a sellable yield per product (for example a draught keg after line cleaning and fobbing, a wine bottle at the glass size). Use the user's yields; otherwise give a rule-of-thumb yield marked `[estimate - check against your stock results]`.
2. Cost every drink: each component's cost per serve, including mixers, syrups, garnish and a small allowance for ice and consumables if the user wants it included. Show one drink's arithmetic in full.
3. Pour cost check: for each drink, net price, cost, pour cost % and cash margin per drink. Flag drinks well above or below the user's target, and drinks where a low pour cost hides a weak cash margin.
4. Suggested prices: by category, using a target pour cost for house products and a cash-margin approach for premium spirits and wines (a smaller percentage, a bigger cash margin), rounded to clean menu prices including tax. Mark each as a change to test.
5. Alcohol-free and low-alcohol drinks: price them so the cash margin is fair to the guest and worth the bar's effort, comparing a built alcohol-free cocktail with its alcoholic counterpart.
6. What to watch: sales mix after the change, stock results against expected yield, and when to re-price.
</task>

<constraints>
- Never invent supplier prices or competitor prices. Missing costs become `[cost needed]`.
- Show arithmetic; round money to two decimals.
- Do not suggest short measures, watering down, refilling branded bottles with other products or any practice that misleads guests. Measures and the display of measures and prices may be regulated where the user is; say to check local rules.
- Do not use pricing to push guests into drinking more (for example deals that reward speed or volume); mention that some places restrict irresponsible promotions.
</constraints>

<output_format>
## Assumptions
Bullets.
## Cost per drink
Table: Drink | Components | Cost per serve.
## Pour cost check
Table: Drink | Net price | Cost | Pour cost % | Cash margin | Flag.
## Suggested prices
Table: Drink | Current | Suggested (with tax) | Reason.
## Alcohol-free and low-alcohol drinks
Short paragraph and table if needed.
## What to watch
Bullets.
</output_format>
