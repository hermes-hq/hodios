---
schema: 1
id: map-incentives-in-situation
kind: prompt
title: Map the incentives in a situation
description: Maps who gains and who loses from each outcome in a situation - a negotiation, workplace change, sale or family matter - to explain people's behaviour and predict what they will do.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, founder, consultant]
requires: [none]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [incentives, stakeholders, conflicts-of-interest, predicting-behaviour, game-theory]
pairs_with:
  prompts: [weigh-conflicting-advice, run-second-order-thinking, apply-mental-models-to-problem]
args:
  - name: situation
    description: The situation, the people or organisations involved, and the outcomes on the table.
    type: text
    required: true
  - name: puzzle
    description: What you are trying to understand or predict (for example "why the agent keeps pushing us to accept the first offer", "how the board will vote").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The players, Incentive map, What explains the behaviour, Predictions, How to use this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse incentives. Behaviour that looks irrational or unfair often makes sense once you see what each person is rewarded or punished for: commissions paid on closing rather than price, managers measured on this quarter rather than next year, departments that bear the cost of a change but not its benefit, advisers paid by the provider whose product they recommend. Incentives are not only money; they include status, workload, job security, avoiding blame, reputation, relationships, and the comfort of the status quo. People respond to the incentives they actually face, which may differ from the official ones, and the person who decides is often not the person who pays. Mapping incentives helps predict behaviour, spot advice that may be conflicted, and design a proposal that gives the key people a reason to say yes. It does not prove bad intent; most people follow their incentives without noticing.

Situation:
<situation>
{{situation}}
</situation>

What you want to understand or predict:
<puzzle>
{{puzzle}}
</puzzle>
</context>

<task>
1. List the players, including the user, and any who are easy to overlook (whoever pays, whoever implements, whoever gets blamed).
2. For each player and each main outcome, map what they gain and lose: money, workload, status, security, blame, relationships. Mark incentives that are inferred rather than stated.
3. Note where the decider and the payer differ, and where an adviser's incentive differs from the user's interest.
4. Explain the puzzle: which incentives best account for the behaviour the user described. Offer the most charitable explanation alongside any less charitable one.
5. Predict what each key player is likely to do, with a rough confidence (likely, possible, unlikely) and what would change it.
6. Say how to use this: questions to ask, terms or proposals that align incentives, and where to get independent advice.
</task>

<constraints>
- Separate what is known from what is inferred; do not state anyone's motives as fact.
- Do not assume malice; prefer explanations based on ordinary incentives.
- Do not invent commission rates, pay structures or rules; describe how they often work and suggest asking.
- Do not help manipulate or deceive the other parties; aligning incentives openly is the aim.
</constraints>

<output_format>
## The players
Bullets, with overlooked players marked.

## Incentive map
Table: Player | Gains if... | Loses if... | Stated or inferred.

## What explains the behaviour
Short paragraph with the charitable and less charitable readings.

## Predictions
Table: Player | Likely action | Confidence | What would change it.

## How to use this
Bullets: questions, proposals, independent checks.
</output_format>
