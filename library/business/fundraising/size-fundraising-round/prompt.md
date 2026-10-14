---
schema: 1
id: size-fundraising-round
kind: prompt
title: Decide how much to raise
description: Sizes a startup round from the milestones the next round will need, the monthly plan, runway with a buffer and the dilution it implies, and turns it into a use-of-funds breakdown.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, financial-analyst]
advice_risk: [financial]
inputs: [dataset, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [round-size, use-of-funds, runway, milestones, burn-rate]
pairs_with:
  prompts: [calculate-cash-runway, write-pitch-deck-outline, model-round-dilution]
  personas: [venture-capitalist]
args:
  - name: plan
    description: Your operating plan for the next 18-30 months - hires by month, other costs, expected revenue, and current cash and monthly burn.
    type: text
    required: true
  - name: milestones
    description: What the company must prove before the next round (for example revenue level, product shipped, retention) and roughly when you expect to hit each.
    type: text
    required: true
  - name: valuation_range
    description: The pre-money valuation range you expect, if you have a view. Used only to show dilution at each round size.
    type: string
output_contract:
  format: markdown
  sections: [Milestones and timing, Cost to reach them, Round size options, Dilution at each size, Use of funds, Risks and what would change the answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders decide how much to raise. The right number is not "as much as possible" or "18 months of burn": it is the cash needed to reach the milestones that make the next round (or profitability) possible, plus a buffer for things taking longer, because they almost always do. Founders commonly under-budget hiring ramp time, the 3-6 months a fundraise itself takes, and the cost of revenue arriving later than planned. Raising too little forces a weak bridge; raising too much at a low valuation costs ownership and can set expectations the company cannot meet.
</context>

<task>
Size this round.

<plan>
{{plan}}
</plan>

<milestones>
{{milestones}}
</milestones>

{{#valuation_range}}Expected pre-money range: {{valuation_range}}{{/valuation_range}}

1. Milestones and timing: list the milestones, when the plan reaches each, and which ones the next round depends on. Flag milestones that look unrealistic given the plan's hiring or revenue (for example revenue starting before the team that produces it is hired).
2. Cost to reach them: cumulative net burn month by month until the last milestone, using the plan's numbers. Add the time a next fundraise takes (assume about 6 months unless told otherwise) as months the company must still fund.
3. Round size options: a lean, base and comfortable size. Base = cumulative burn to the milestones plus the fundraising period, minus current cash. Lean and comfortable apply a shorter and longer buffer (for example 3 and 9 months of burn). Show each formula.
4. Dilution at each size: if a valuation range was given, the investor ownership (amount / post-money) at the low and high end. If not, show it at three labelled illustrative valuations.
5. Use of funds for the base size: hires, product, go-to-market, other, buffer, as amounts and percentages, tied to the milestones.
6. Risks and what would change the answer: the two or three assumptions the size is most sensitive to, with the effect of a three-month delay.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the plan's numbers and arithmetic on them. Label every assumption, including the fundraising period and buffers.
- Do not quote what investors in a market currently pay or the "typical" round size as fact.
- Present the options and their trade-offs; the founder chooses.
- Flag gaps in the plan (for example no salary on-costs, no tax, no hiring lag) rather than silently filling them.
</constraints>

<output_format>
## Milestones and timing
Table: Milestone | Target month | Needed for next round (yes/no) | Realism note.
## Cost to reach them
Table of cumulative net burn by quarter.
## Round size options
Table: Option | Amount | Runway after close (months) | Formula.
## Dilution at each size
## Use of funds
Table: Category | Amount | % | Milestone it serves.
## Risks and what would change the answer
</output_format>
