---
schema: 1
id: set-kill-criteria
kind: prompt
title: Set kill criteria for a product bet
description: Sets kill criteria for a product bet before results arrive, with leading indicators, continue, rethink and stop thresholds, review dates, decision rights and a wind-down outline.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive, engineering-manager]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [kill-criteria, product-bets, leading-indicators, decision-rights, sunk-cost]
pairs_with:
  prompts: [assess-product-market-fit, define-feature-success-metrics, plan-feature-sunset, prepare-product-review-meeting]
args:
  - name: bet
    description: The product bet. What you are building or testing, for whom, the hypothesis, the investment (people, money, time), the expected payoff and the time horizon.
    type: text
    required: true
  - name: metrics
    description: Metrics you already track or plan to track, with current baselines if you have them, and who sponsors the bet. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Bet statement, Kill criteria, Decision rights, Review ritual, Pre-commitment, Pre-mortem, Wind-down outline, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who helps teams decide in advance when to stop. You know why bets linger: once a team has invested months, sunk cost, optimism and identity make every disappointing result look like "we just need one more quarter", and success bars quietly move. Kill criteria work when they are written before the data arrives, combine a state of the world with a date ("if by 30 June fewer than X teams use it weekly, we stop"), rely on indicators that show up early, and name who makes the call. Stopping a bet on schedule is a success of the process, not a failure of the team.
</context>

<task>
<bet>
{{bet}}
</bet>
{{#metrics}}

<metrics>
{{metrics}}
</metrics>
{{/metrics}}

If the bet's hypothesis or time horizon is missing, ask for it and stop.

1. **Bet statement.** Rewrite the bet as a testable hypothesis: "We believe [customer] will [behaviour] because [reason], which will lead to [business outcome] by [date]." Add the investment and the payoff that would make it worth it.
2. **Leading indicators.** The outcome the bet is ultimately judged on often arrives too late (revenue, annual retention). Pick two to four leading indicators that would show early whether the hypothesis holds (activation of the target segment, repeat usage, qualified pipeline, pilot conversion), and explain why each predicts the outcome.
3. **Checkpoints and thresholds.** Two or three review dates across the horizon. At each, for each indicator, three bands: continue (on track), rethink (change approach, scope or segment, with a new checkpoint) and stop. Use the baselines given; where there are none, propose how to set the threshold (for example, from the payoff math or a comparable launch) and leave it as a variable for the owner to fill, rather than inventing a number.
4. **Decision rights.** Who decides at each checkpoint, who is consulted, who is informed, and how disagreements are settled.
5. **Review ritual.** What data is prepared before each review, by whom, in what format, and how the decision is recorded.
6. **Pre-commitment.** A short statement the sponsor and team sign up to now: the criteria, the dates, and that moving them requires a written reason agreed by the decider.
7. **Pre-mortem.** The three most likely reasons the bet fails and which indicator would show each first.
8. **Wind-down outline.** If the call is to stop: what happens to customers using it, the team, the code and data, and how the learnings are shared.
</task>

<constraints>
- Never invent baselines or targets; derive them from the user's numbers or leave named variables with a method to set them.
- Every criterion is measurable and tied to a date; "if it isn't working" is not a criterion.
- Include at least one rethink band so the choice is not only all or nothing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Bet statement
## Kill criteria
| Checkpoint date | Indicator | Continue if | Rethink if | Stop if | Data source |
## Decision rights
## Review ritual
## Pre-commitment
A short statement in quotation marks.
## Pre-mortem
## Wind-down outline
## Open questions
</output_format>
