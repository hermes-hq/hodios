---
schema: 1
id: reduce-concentrated-stock-position
kind: prompt
title: Think through reducing a large single-stock holding
description: Explains the options for reducing a large holding in one stock, such as employer shares - staged selling, tax-aware lot choice, gifting, hedging - with the risk and tax trade-offs in money.
category: investing
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [concentration-risk, employer-stock, capital-gains, diversification, selling-plan]
pairs_with:
  prompts: [explain-equity-compensation, check-portfolio-diversification, write-investment-decision-journal]
  personas: [investing-educator]
args:
  - name: position
    description: The holding - number of shares, current value, what you paid (by lot if known), how it came to you (bought, RSUs, options, ESPP, inherited), and its share of your total investments and net worth.
    type: text
    required: true
  - name: constraints
    description: Anything limiting sales - working for the company, trading windows or blackout periods, unvested shares, insider status, account type - plus your country.
    type: text
    required: true
  - name: goals
    description: What the money is for, your timeline, and how you would feel if the stock halved or doubled after you sold. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How concentrated you are, The risk in money, The tax cost in money, Ways to reduce it, An illustrative selling schedule, Feelings that get in the way, Questions for a tax or financial adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A large single-stock position is one of the most common and least diversified risks individual investors carry, especially when it is their employer: job, bonus and savings then depend on one company. Individual stocks are far more volatile than the market and many lose most of their value at some point, even well-known ones. People hold on for predictable reasons: reluctance to pay tax on gains (letting the tax tail wag the dog), anchoring to a past high, loyalty, and fear of selling just before a rise. Experts frame it as comparing a certain, known tax cost now with an uncertain but potentially much larger loss later, then reducing in stages to spread both tax and regret. Common tools, depending on country and situation: a written schedule of sales by date or price; selling the highest-cost lots first where lot selection is allowed; spreading sales across tax years to use annual allowances or lower brackets; moving shares into tax-advantaged accounts where rules allow; giving appreciated shares to charity or family where tax rules favour it; pre-arranged trading plans for insiders; and, for large positions, hedging with options collars or pooled exchange funds, which are complex, costly and may be prohibited by employer policy. ESPP and option shares may have holding-period tax rules that change the cost of selling early.

Position: {{position}}

Constraints and country: {{constraints}}
{{#goals}}Goals: {{goals}}{{/goals}}
</context>

<task>
1. How concentrated: the position as a share of investments and of net worth, and, if it is the employer, the combined exposure with salary and unvested awards.
2. The risk in money: what a 30%, 50% and 80% fall would do to their total wealth and to their goals, compared with the same fall in a diversified portfolio.
3. The tax cost in money: an estimate of the tax from selling all now versus in stages, using their cost basis and tax rates they give; if they gave no rates, show the method and mark rates to verify. Point out lots with little gain or a loss that could be sold first.
4. Ways to reduce it: staged sales, lot selection, using tax years, tax-advantaged accounts, gifting, insider trading plans, hedging and exchange funds. For each, how it works, cost, complexity, and whether it is likely relevant for them.
5. An illustrative selling schedule toward a target share they choose (if none, show two, such as reaching 20% and 10% of investments), by quarter or tax year, respecting their trading windows.
6. Name the feelings and biases that usually stall the plan, and suggest writing rules in advance.
7. Questions for a tax adviser or financial adviser, and for the company's equity plan administrator.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them how much to sell or predict the stock. Show the trade-off and the options; the target is theirs.
- Never state tax rates, allowances or holding-period rules for their country as fact unless supplied; mark them "verify".
- If they may be an insider or work for the company, say that company trading rules and securities law come first and must be checked with the company's compliance team.
- Describe hedging and exchange funds as complex tools that need specialist advice, not as easy fixes.
{{> output/uncertainty}}
</constraints>

<output_format>
## How concentrated you are
Short paragraph with percentages.

## The risk in money
Table: fall | loss in money | share of net worth | effect on goals.

## The tax cost in money
Table: approach | estimated tax | working.

## Ways to reduce it
Table: method | how it works | cost and complexity | likely relevant.

## An illustrative selling schedule
Table by quarter or tax year.

## Feelings that get in the way
Bullets.

## Questions for a tax or financial adviser
Bullets.
</output_format>
