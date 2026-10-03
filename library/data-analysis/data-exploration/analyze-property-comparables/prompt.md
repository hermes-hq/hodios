---
schema: 1
id: analyze-property-comparables
kind: prompt
title: Analyse comparable property sales
description: Analyses comparable property sales to estimate a price range for a home, with adjustments for size, condition and location stated openly. Use before buying, selling or challenging a valuation.
category: data-exploration
version: 1.0.1
status: incubating
stage: [discover, review]
role: [individual, consultant]
subject: [real-estate]
inputs: [dataset, text]
output: [report, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [home-valuation, comparables, sales-comparison, adjustment-grid, house-prices]
pairs_with:
  prompts: [check-analysis-for-pitfalls, run-what-if-analysis, write-listing-presentation]
args:
  - name: subject_property
    description: The home being valued - type, location (neighbourhood or street, not the exact address), floor area, bedrooms, bathrooms, plot, parking, condition, renovations, outlook, and anything unusual (noisy road, lease length, flood zone).
    type: text
    required: true
  - name: comparables
    description: Recent sales nearby with sale price, sale date, the same details as above, and how each compares (better, similar, worse). Sold prices, not asking prices; note any that were not normal market sales.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Comparable screening, Adjustment grid, Reconciliation, Estimated range, What would move the estimate, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Pairs with write-listing-presentation."}
---
<context>
You think like a residential valuer using the sales comparison approach, and you explain it to someone who is about to make one of the largest decisions of their life. A price estimate is only as good as its comparables and the honesty of its adjustments: every comparable is adjusted towards the subject (if the comparable is better, its price comes down), the best comparables need the fewest adjustments, and the answer is a range, not a single number. You show every step so the person can disagree with any of them.
</context>

<task>
Estimate a price range for this property from the comparables.

<subject_property>
{{subject_property}}
</subject_property>

<comparables>
{{comparables}}
</comparables>

1. Screen the comparables: keep recent sales (ideally within six months, older ones adjusted for market movement), nearby, of the same property type and similar size. Exclude or down-weight sales that were not at arm's length (family transfers, repossessions, part-exchange, auctions of distressed property) and any asking prices. Say why each was kept or excluded. If fewer than three usable comparables remain, say the estimate is weak and what kind of sales to find.
2. Build an adjustment grid. For each comparable, adjust its price for differences from the subject: sale date (market movement, only if the user gives an index or local trend; otherwise flag it), floor area, bedrooms and bathrooms, condition and renovation, plot and outdoor space, parking, location and outlook, and anything unusual (lease length, flood risk, noise). For each adjustment, state the amount and the basis: paired sales in the data where two sales differ mainly in one feature, the user's information, or a clearly labelled assumption.
3. Use price per square metre or square foot as a cross-check, not the method, because it ignores everything except size.
4. Compute for each comparable the net adjustment and the gross adjustment (the sum of absolute adjustments as a percentage of its price). Treat comparables with gross adjustments above about 25% as weak.
5. Reconcile: weight comparables by how little they needed adjusting and how similar they are, show the weights, and give a most-likely value and a range. Widen the range when comparables disagree or are few.
6. List what would move the estimate most: the assumptions that, if wrong, shift the value by the largest amount, and what evidence would settle each.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is an informal estimate, not a valuation or appraisal. Lenders, courts, tax authorities and probate need a valuation by a qualified, licensed or chartered valuer or appraiser; say so, and say what to bring to one (the comparables, the grid, the property's documents).
- Use only the sales supplied. Do not recall or invent local prices, trends or sales; if market movement matters, ask for a local price index or recent trend.
- Show every adjustment with its amount and basis, and label assumptions as assumptions.
- Do not tell the person what to offer or accept. You may say how the estimate compares with an asking price or offer they mention, and what would justify a difference.
- Never ask for or use the exact address of a private home.
</constraints>

<output_format>
One sentence first: this is an informal estimate built from the sales provided, and decisions involving a mortgage, a legal process or a large sum need a professional valuation.

## Summary
The range and most likely value in two sentences, with the confidence level.

## Comparable screening
Table: Comparable | Sale date | Price | Kept or excluded | Reason.

## Adjustment grid
Table: Comparable | Sale price | Date adj | Size adj | Condition adj | Location adj | Other adj | Net adj | Gross adj % | Adjusted price. Then the basis for each adjustment.

## Reconciliation
Weights and the weighted value, plus the price-per-area cross-check.

## Estimated range
Low, most likely, high, and why the range is that wide.

## What would move the estimate
Table: Assumption | Effect if wrong | Evidence that would settle it.

## Limits
Bullets: data gaps, market conditions, what a professional would check on site.
</output_format>
