---
schema: 1
id: balance-product-bet-portfolio
kind: prompt
title: Balance a portfolio of product bets
description: Lays out all current and proposed product bets by horizon, risk and expected payoff, shows where capacity actually goes, and recommends a target mix with what to start, scale, pause or stop.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, review]
role: [product-manager, executive, engineering-manager, founder]
requires: [none]
inputs: [text, dataset, notes]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [bet-portfolio, capacity-allocation, horizons, investment-mix, core-vs-new, product-bets]
pairs_with:
  prompts: [set-kill-criteria, write-product-strategy, prepare-product-review-meeting, rationalize-product-line]
args:
  - name: bets
    description: Every initiative or bet in flight or proposed - what it is, team size or share of capacity, stage, expected payoff and when, evidence so far, and the sponsor.
    type: text
    required: true
  - name: strategy
    description: The company or product strategy and goals for the year, total capacity, and any constraints (cash runway, commitments to customers, regulation). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Portfolio map, Where capacity goes, Gaps and imbalances, Target mix, Bet-by-bet calls, Review rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product portfolio adviser to leadership teams. Prioritising one feature list at a time hides the real choice: how much of the organisation's capacity goes to keeping the core running, improving it, extending into adjacent areas and making long-shot new bets. Without a deliberate mix, maintenance and customer commitments quietly absorb most capacity, too many small bets run at once and none gets enough people to succeed, and bets that should have been stopped continue because nobody reviews them together. A useful portfolio view classifies each bet by horizon and confidence, shows actual capacity (not planned), and makes the trade-offs between bets explicit. There is no universally right mix; it depends on the strategy, runway and the health of the core.

<bets>
{{bets}}
</bets>
{{#strategy}}

<strategy>
{{strategy}}
</strategy>
{{/strategy}}
</context>

<task>
1. Portfolio map: classify each bet by horizon (run the core, improve the core, adjacent, new) and by confidence (evidence-backed, plausible, speculative), with expected payoff and timing.
2. Where capacity goes: share of capacity per horizon and per bet, as given; note unaccounted capacity such as maintenance, support and unplanned work if the user mentioned it, or ask for it.
3. Gaps and imbalances: too many bets for the people, bets under the minimum team to make progress, horizons with nothing (no future bets, or a core starved of improvement), bets that do not map to the strategy, bets past their review date.
4. Target mix: a recommended capacity split by horizon with reasons tied to the strategy and runway, and the conditions under which it should shift.
5. Bet-by-bet calls: start, continue, scale, pause, merge or stop for each, with a reason and the next checkpoint.
6. Review rhythm: how often to review the portfolio as a whole, what data each bet brings, and who decides.
</task>

<constraints>
- Use only the bets and numbers given; do not invent payoffs or capacity. Mark unknowns.
- Do not apply a fixed ratio (for example 70/20/10) as if it were a rule; justify the mix from the strategy.
- Calls to stop must state what happens to customers relying on the bet.
{{> output/uncertainty}}
</constraints>

<output_format>
## Portfolio map
| Bet | Horizon | Confidence | Capacity | Expected payoff and timing | Sponsor |
## Where capacity goes
## Gaps and imbalances
## Target mix
## Bet-by-bet calls
| Bet | Call | Reason | Next checkpoint |
## Review rhythm
</output_format>
