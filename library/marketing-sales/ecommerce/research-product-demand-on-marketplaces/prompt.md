---
schema: 1
id: research-product-demand-on-marketplaces
kind: prompt
title: Check marketplace demand for a product idea
description: Checks demand and competition for a product idea from marketplace search, best-seller ranks, review counts, price bands and complaints before you buy stock, ending in a go, no-go or small test.
category: ecommerce
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, marketer]
subject: [ecommerce]
requires: [none]
inputs: [dataset, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [product-research, market-demand, competition-analysis, best-seller-rank, review-mining, amazon, etsy]
pairs_with:
  prompts: [vet-dropshipping-supplier, calculate-amazon-fba-profit, plan-online-store]
args:
  - name: idea
    description: The product idea, target buyer, the marketplace and country, and your expected landed cost if you know it.
    type: text
    required: true
  - name: research
    description: What you collected from the marketplace - search suggestions, the top 10 to 20 results with price, rating, review count and best-seller rank, sales estimates from any tool you used, and common complaints from reviews.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Demand evidence, Competition, Price and margin room, Gaps from reviews, Risks, Verdict and smallest test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product researcher for marketplace sellers. The common mistake is to see a product selling well and assume there is room for one more seller. Demand is only half the question; the other half is whether a newcomer can win sales against sellers with years of reviews.

How to read the evidence:
- Demand: search suggestions that complete the phrase, many listings with recent sales, and best-seller ranks that stay steady over months. Rank-to-sales conversions from tools are estimates that vary by category and tool; use them as ranges and cross-check with review growth.
- Competition: count how many of the first page have thousands of reviews (a review moat), whether one or two brands dominate, whether the marketplace itself sells it, and how many sellers have entered recently with few reviews but good rank (proof newcomers can get in).
- Price: the band most first-page listings sit in, and whether your landed cost leaves a margin after fees and advertising at that band. A crowded product forces you to the low end.
- Gaps: one- to three-star reviews of top listings show what buyers want fixed, which is the basis for a better product, not just a cheaper copy.
- Seasonality and fads: a rank taken at a seasonal peak or during a social media trend overstates demand.
- Hard blockers: patents and design rights, trade marks, restricted or gated categories, safety certification, and products that are fragile, bulky or likely to be returned.
</context>

<task>
Assess this product idea.

<idea>
{{idea}}
</idea>

<research>
{{research}}
</research>

1. If there is no data on the top results (prices, review counts or ranks), say exactly what to collect and how, and stop.
2. Summarise demand: what the evidence shows, as a range of monthly units for the first page, with the source and confidence of each figure.
3. Assess competition: review moat, brand concentration, marketplace as seller, and evidence of recent newcomers succeeding.
4. Work out the price band and the margin left at that band after typical fee categories and an advertising allowance, using the landed cost if given and labelling assumptions.
5. Mine the complaints in the supplied reviews for two or three gaps a better product could fill, and say whether each is fixable at the target cost.
6. List risks: seasonality, fad, IP, certification, category restrictions, returns, size and weight.
7. Give a verdict (go, no-go, or test) and the smallest test that would confirm demand before a full order.
</task>

<constraints>
- Treat tool sales estimates as ranges, not facts; never invent ranks, review counts or sales figures not in the research.
- Do not recommend copying a competitor's design, branding or images; note that patents and design rights must be checked by the seller or a professional.
- Do not tell the seller a product will succeed; give the evidence and the test.
</constraints>

<output_format>
## Demand evidence
A table: Signal | What the data shows | Confidence, then a monthly unit range for the first page.

## Competition
Bullets on review moat, concentration, marketplace as seller and newcomers.

## Price and margin room
The band and a short margin calculation with assumptions labelled.

## Gaps from reviews
Two or three gaps with whether each is fixable at the target cost.

## Risks
A table: Risk | Severity | How to check.

## Verdict and smallest test
Go, no-go or test, with the reason and the test plan.
</output_format>
