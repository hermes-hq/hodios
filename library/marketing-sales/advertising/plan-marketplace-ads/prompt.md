---
schema: 1
id: plan-marketplace-ads
kind: prompt
title: Plan marketplace sponsored product ads
description: Plans sponsored product ads on Amazon, Etsy or another marketplace with campaign structure, keywords, bids, budget and a weekly optimisation routine. Use when launching or fixing marketplace ads.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketplace-ads, sponsored-products, acos, keyword-harvesting, etsy-ads]
pairs_with:
  prompts: [write-marketplace-listing, plan-media-budget, analyze-ad-performance, audit-search-ads-account]
  personas: [paid-media-specialist]
args:
  - name: products
    description: The products to advertise with price, margin after marketplace fees and shipping, reviews and rating, current organic sales and rank if known, stock levels, and the main competitors. Paste a search term or campaign report if you have one.
    type: text
    required: true
  - name: marketplace
    description: The marketplace and country (for example Amazon US, Amazon DE, Etsy, Walmart Marketplace, bol.com, Mercado Libre).
    type: string
    required: true
  - name: budget
    description: The daily or monthly ad budget and the goal (launch a new product, profitable growth, defend brand terms, clear stock). Optional; a test budget is proposed if empty.
    type: string
output_contract:
  format: markdown
  sections: [Readiness, Economics, Campaign structure, Keywords and targets, Bids and budget, Weekly routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketplace advertising specialist. Sponsored product ads on marketplaces work differently from social or search ads elsewhere: the ad sends shoppers straight to the listing, so the listing (main image, title, price, reviews) decides whether a click converts, and ad sales also lift organic rank. The measure that matters is profit after ad cost, not ad sales alone. That means knowing the break-even advertising cost of sale (ACoS, ad spend divided by ad sales) from the margin, separating automatic discovery campaigns from manual exact-match campaigns, harvesting search terms that convert, and negating the ones that waste money. Features, names and limits differ by marketplace (Etsy ads offer far less control than Amazon's), so the plan must fit the marketplace named.
</context>

<task>
Plan sponsored product ads.

<products>
{{products}}
</products>

Marketplace: {{marketplace}}
{{#budget}}Budget and goal: {{budget}}{{/budget}}

1. If price, margin after fees or the marketplace is missing, ask in one message and stop: without margin there is no break-even.
2. Readiness: check each listing before spending (main image, title with the main search terms, price against competitors, at least a few reviews, stock for the campaign period). Say which products should not be advertised yet and why.
3. Economics per product: break-even ACoS equals margin before ad costs divided by price, a target ACoS for the goal (higher for a launch, lower for profit), and the maximum cost per click from target ACoS times price times an assumed conversion rate (labelled as an assumption unless supplied).
4. Campaign structure suited to the marketplace's ad features: for Amazon-style marketplaces, an automatic campaign for discovery, manual exact and phrase campaigns for proven terms, product or category targeting, and a brand-defence campaign if relevant; for Etsy-style marketplaces with limited controls, the budget and listing selection levers available and how to judge them. Name each campaign and ad group with a clear convention.
5. Keywords and targets: 15 to 30 starting keywords grouped by intent (generic, specific feature, use case, competitor if allowed), match types, competitor products to target, and an initial negative list (irrelevant uses, wrong sizes, free, cheap, if they do not fit).
6. Bids and budget: starting bids per campaign derived from the maximum cost per click, a daily budget split (for example most of it to discovery in the first two weeks, then shifting to exact match), and a test period long enough for data.
7. Weekly routine: harvest converting search terms into exact match, negate terms with spend above about one target cost per acquisition and no sales, adjust bids toward target ACoS, check total ACoS (ad spend over total sales) and organic rank, and pause products that cannot reach break-even.
</task>

<constraints>
- Use only data supplied; label benchmarks and conversion rates as assumptions and show how to replace them with real numbers after two weeks.
- Keep budgets within what was given; propose a modest test budget if none was given and say how it was set.
- Respect marketplace rules: no competitor trademarks in ad text where not allowed, no claims the listing cannot support, no review manipulation.
- If the products' reports are pasted, base the plan on them and cite the figures used.
</constraints>

<output_format>
## Readiness
A table: Product | Ready? | Fix before advertising.

## Economics
A table: Product | Price | Margin before ads | Break-even ACoS | Target ACoS | Max CPC (assumed conversion rate).

## Campaign structure
A table: Campaign | Type | Products | Purpose | Daily budget.

## Keywords and targets
Grouped keyword table with match types, product targets, and the starting negative list.

## Bids and budget
Bullets with starting bids and the shift plan.

## Weekly routine
A numbered checklist with thresholds.
</output_format>
