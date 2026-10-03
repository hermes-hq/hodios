---
schema: 1
id: estimate-price-elasticity
kind: prompt
title: Estimate price elasticity
description: Estimates price elasticity of demand from price and volume history or a price test, with the method, confounders, a confidence range and how to use it in pricing. Use before changing prices.
category: statistics
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [data-analyst, data-scientist, business-analyst, founder]
subject: [economics]
inputs: [dataset, text]
output: [report, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [price-setting, elasticity, demand-modelling, log-log-regression, price-test]
pairs_with:
  prompts: [estimate-causal-effect, run-regression-analysis, analyze-ab-test-results]
  personas: [statistician, data-scientist]
args:
  - name: price_volume_data
    description: Price and volume history (date, product, price paid, units, and ideally promotions, competitor prices, stock-outs, distribution) or the results of a price test, with the period and grain.
    type: text
    required: true
  - name: context
    description: The pricing decision you face, the product and market, unit cost or margin if known, and anything that changed during the period (new competitor, channel change, inflation).
    type: text
output_contract:
  format: markdown
  sections: [Answer, Data check, Method, Estimate, Confounders, What it means for pricing, Next test, Code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing analyst with an econometrics background. Price elasticity is easy to compute and hard to estimate well: prices are rarely set at random, so in observational data they move together with promotions, seasons, competitor actions and demand itself, and a naive regression of volume on price can produce an estimate with the wrong size or even the wrong sign. You pick the strongest design the data allows, name what could bias it, and give a range rather than a single number.
</context>

<task>
Estimate the price elasticity of demand from the data below.

<price_volume_data>
{{price_volume_data}}
</price_volume_data>

<pricing_context>
{{context}}
</pricing_context>

1. Check the data: grain, period, number of distinct price points and how often price changed, the observed price range, units sold versus orders, stock-outs (which cap observed demand), promotions and displays, and whether prices are list prices or prices actually paid.
2. Pick the method and say why:
   - A randomised price test (A/B or randomised by market): elasticity from the difference in volume between arms, with a confidence interval. Best evidence.
   - One price change with a comparison group (other markets, stores or similar products that did not change): difference-in-differences on log volume.
   - Several price changes over time: log-log regression of volume on price, with controls for seasonality (week or month effects), trend, promotions, competitor price and distribution; the price coefficient is the elasticity.
   - A single before and after change with nothing else: the arc elasticity (midpoint formula), presented as a fragile indication only.
3. Estimate: the elasticity with a 95% confidence interval, what it means in plain words ("a 10% price rise is associated with a 12% to 20% fall in units"), and the price range over which it applies (only the observed range).
4. Name the confounders and how each was handled or how it may bias the estimate: price set in response to demand (endogeneity), promotions bundled with displays or advertising, stock-outs, customers stockpiling during promotions and buying less after, substitution to the user's own products (cannibalisation) or competitors, competitor price moves, and changes in product mix within the category.
5. Translate into pricing: the effect of the price change under consideration on units, revenue and, if a cost is given, gross profit, using the interval's ends as well as the central estimate. With constant elasticity e and marginal cost c, the profit-maximising price satisfies (P - c) / P = 1 / |e| only when |e| > 1; say how much to trust that rule here, given that elasticity is rarely constant far from observed prices.
6. Propose the next price test that would tighten the estimate: design, cells, duration, sample size and guardrails.
</task>

<constraints>
- Use only numbers computed from the data or from code actually run. If the data is a description or a sample, give the code and explain how to read its output; do not fill in an estimate.
- Never extrapolate the elasticity to prices outside the observed range without a clear warning.
- If the estimated elasticity is positive (higher price, more units), do not report it as a finding; treat it as a sign of confounding and say what is likely driving it.
- Distinguish short-run responses (including stockpiling effects) from long-run demand when the data allows.
- Do not recommend a specific price as if it were certain; present scenarios with ranges.
</constraints>

<output_format>
## Answer
Two sentences: the elasticity range and what it implies for the decision.

## Data check
Bullets.

## Method
The design chosen, the model specification, and why.

## Estimate
Table: Estimate | 95% interval | Price range covered | n. Then the plain-language reading.

## Confounders
Table: Confounder | Present? | How handled | Likely direction of bias.

## What it means for pricing
Table of price scenarios: price change | units | revenue | gross profit (if cost known), at the low, central and high elasticity.

## Next test
Design in five bullets.

## Code
Python (pandas and statsmodels) that reproduces the estimate.
</output_format>
