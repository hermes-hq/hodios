---
schema: 1
id: estimate-market-size
kind: prompt
title: Estimate market size (TAM, SAM, SOM)
description: Estimates TAM, SAM and SOM bottom-up with explicit assumptions and low-base-high ranges, then cross-checks top-down. Use for a pitch, a business plan or a go/no-go on a new market.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, product-manager, business-analyst, consultant]
inputs: [text, notes, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tam-sam-som, market-sizing, bottom-up, sensitivity-analysis]
pairs_with:
  prompts: [write-pitch-deck-outline, write-business-plan, run-swot-analysis]
  personas: [management-consultant]
args:
  - name: product
    description: What you sell, to which kind of customer, the price or expected annual revenue per customer, and how it is bought (self-serve, sales-led, retail).
    type: text
    required: true
  - name: geography
    description: Markets in scope, for example "UK", "DACH" or "global, English-speaking". Leave empty to have the primary market inferred and stated.
    type: string
  - name: data_points
    description: Any numbers you already have, with their sources (customer counts, industry reports, census or registry data, your conversion rates). Leave empty if none.
    type: text
output_contract:
  format: markdown
  sections: [Definitions, Assumptions, Bottom-up estimate, Top-down cross-check, Reconciliation, Sensitivity, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a market analyst who sizes markets the way a sceptical investor checks them: bottom-up from countable customers and real prices, with every assumption visible and every number given as a range. A single top-down figure ("the global wellness market is $5T, we take 1%") is not an estimate; it is the mistake you are here to prevent.
</context>

<task>
Size the market for:

<product>
{{product}}
</product>

Geography: {{geography}}

<data_points>
{{data_points}}
</data_points>

1. Define the customer unit (a business, a location, a household, a person, a seat) and the revenue per unit per year. If the product is unclear on price or buyer, ask once for those two facts and stop.
2. Write the definitions you will use, tied to this product:
   - TAM: annual revenue if every customer unit that has this problem bought this kind of solution, in the stated geography.
   - SAM: the part of TAM this business can actually serve with its current product, channel, language, segment and regulatory reach.
   - SOM: the share of SAM it can realistically win in 3 to 5 years, given sales capacity, competition and typical adoption.
3. Bottom-up: number of customer units × share with the problem × share reachable × revenue per unit. Give each factor a low, base and high value and its source type: `given` (from the data points), `public` (a public statistic you believe exists; name the kind of source to verify it, such as a national business register) or `assumption`.
4. Top-down: start from an industry or spend figure in the data points, or a clearly labelled public figure to verify, and narrow it with stated percentages.
5. Reconcile. If the two base cases differ by more than about 3×, find which assumption explains the gap and say which estimate you trust more and why.
6. Sensitivity: show which two or three assumptions move the SOM most, and the result if each moves to its low and high value.
7. Recommend the cheapest ways to firm up the biggest assumptions (for example a registry count, ten customer calls on budget, a pilot conversion rate).
</task>

<constraints>
- Show the arithmetic for every figure so a reader can recompute it. Round results to two significant figures.
- Do not present remembered statistics as facts. Label them `public` with the source to check, or `assumption`.
- SOM must be justified by a go-to-market mechanism (for example "4 sales reps × 60 deals a year"), not by picking a percentage.
- Keep currency and year consistent and state them.
- If the geography is empty, state the market you assumed and why.
{{> output/uncertainty}}
</constraints>

<output_format>
## Definitions
Customer unit, revenue per unit, and one line each for TAM, SAM and SOM as defined here.

## Assumptions
Table: # | Assumption | Low | Base | High | Source type | How to verify.

## Bottom-up estimate
The calculation step by step, then a table: Metric | Low | Base | High.

## Top-down cross-check
Calculation and result.

## Reconciliation
Two to four sentences.

## Sensitivity
Table: Assumption | SOM at low | SOM at high.

## Next steps
Numbered, cheapest first.
</output_format>
