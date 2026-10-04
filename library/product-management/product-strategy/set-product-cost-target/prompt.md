---
schema: 1
id: set-product-cost-target
kind: prompt
title: Set a target cost for a product
description: Works back from target retail price through channel margins, sales tax, shipping, returns and warranty reserve to a target landed and BOM cost, showing the gap and levers to close it.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, founder, financial-analyst]
subject: [retail, engineering]
requires: [none]
inputs: [text, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [target-costing, margin-stack, landed-cost, bill-of-materials, design-to-cost, unit-economics]
pairs_with:
  prompts: [calculate-landed-cost, build-hardware-product-roadmap, rationalize-product-line, plan-retail-shelf-launch]
args:
  - name: target_price_and_channels
    description: The retail price you want to sell at, whether it includes VAT or sales tax, and each channel with its share of volume and margin or fee (own web store, marketplace, retailer, distributor plus retailer).
    type: text
    required: true
  - name: current_cost_estimate
    description: Your current cost estimate - bill of materials, assembly, packaging, freight, duty, fulfilment, expected return rate and warranty - and the volume it assumes.
    type: text
    required: true
  - name: currency
    description: Currency for all amounts.
    type: string
    default: USD
output_contract:
  format: markdown
  sections: [Price waterfall by channel, Target costs, Gap to current estimate, Levers to close the gap, Verdict, Assumptions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You do target costing for physical products the way experienced hardware and consumer-goods teams do: start from the price the customer will pay and subtract everyone else's share until you reach what the product is allowed to cost. Founders often do it the other way round, adding a markup to cost, and discover too late that a retailer's margin, a distributor's cut, returns and warranty leave nothing. Two more traps: confusing margin with markup (a 50% margin is a 100% markup), and quoting a retail price that includes sales tax as if it were revenue.

Currency: {{currency}}.
</context>

<task>
Target price and channels:

<price_and_channels>
{{target_price_and_channels}}
</price_and_channels>

Current cost estimate:

<current_cost>
{{current_cost_estimate}}
</current_cost>

1. For each channel, build the waterfall from the shelf price: remove VAT or sales tax if the price includes it; subtract retailer margin (as a margin on their selling price, not a markup), distributor margin, marketplace or payment fees, and co-op marketing or promotional allowances if given. The result is the brand's net revenue per unit.
2. From net revenue, subtract variable costs below the product: outbound shipping and fulfilment, returns (return rate x cost of a return, including unsellable units), warranty reserve (expected claim rate x cost per claim, often 1-3% of revenue for simple products; label if assumed), and payment fees. What remains must cover the landed cost and the brand's target gross margin.
3. Apply the brand's target gross margin (use the user's; if none, show results at 40%, 50% and 60% and say which is typical for their channel mix as an assumption to check). Compute the target landed cost per channel, then a blended target weighted by channel volume.
4. From landed cost, remove inbound freight, duty and packaging to reach the target ex-works cost, then the target bill of materials plus assembly.
5. Compare with the current estimate at the stated volume and show the gap per unit and as a percentage.
6. Rank levers by effect and effort: design to cost (part count, materials, tolerances), supplier and volume, packaging and freight density, channel mix, price, and dropping a channel that cannot work.
7. Give a verdict: works, works only at a different price, volume or channel mix, or does not work. Be blunt if the gap is above about 20%.
</task>

<constraints>
- Use only the user's numbers; label every assumption and show the arithmetic per step so it can be checked.
- Never mix margin and markup. State the formula once: price = cost / (1 - margin).
- Do not state tax rates, duty rates or retailer terms as fact; mark them as items to confirm with an accountant, customs broker or the buyer.
- If the price, the channels or any cost estimate is missing, ask for it and stop.
</constraints>

<output_format>
## Price waterfall by channel
Table per channel: step | amount | running total.

## Target costs
Table: channel | net revenue | target landed cost | target ex-works | target BOM plus assembly; then the blended target.

## Gap to current estimate
Current versus target per unit, and the gap in money and percentage.

## Levers to close the gap
Table: lever | estimated saving per unit | effort | risk.

## Verdict
Two to four sentences.

## Assumptions to confirm
Bullets with who to confirm each with.
</output_format>
