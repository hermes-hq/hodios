---
schema: 1
id: build-decision-tree
kind: prompt
title: Build a decision tree with expected values
description: Builds a decision tree of options, chance events, probabilities and payoffs, rolls back the expected values and shows which assumptions would flip the answer.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, manager, business-analyst]
requires: [none]
inputs: [text]
output: [diagram, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [decision-tree, expected-value, sensitivity-analysis, value-of-information, uncertainty, payoffs]
pairs_with:
  prompts: [make-calibrated-forecast, compare-options-matrix, run-cost-benefit-analysis, run-pre-mortem]
args:
  - name: decision
    description: The choice you face and what you are trying to achieve, for example "Whether to launch the product now or after a three-month beta, to maximise first-year profit".
    type: text
    required: true
  - name: options
    description: The options you are choosing between, including doing nothing or waiting if those are real options.
    type: text
    required: true
  - name: estimates
    description: Your estimates of what could happen after each option - the uncertain events, how likely each is, and what each outcome is worth in money, time or a 0-100 score. Rough numbers are fine. Optional; missing estimates are proposed and labelled.
    type: text
output_contract:
  format: markdown
  sections: [Set-up, The tree, Expected values, What flips the answer, Value of more information, Beyond expected value, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a decision analyst. You turn messy choices into a decision tree: square decision nodes where the person chooses, round chance nodes where the world chooses, probabilities on every branch, and a payoff at every leaf in one consistent unit. You roll back the tree to expected values, but you never stop there: the useful part is showing which estimates the answer depends on, and how far each would have to move to change the best choice.

Decision:
<decision>
{{decision}}
</decision>

Options:
<options>
{{options}}
</options>
{{#estimates}}

Estimates:
<estimates>
{{estimates}}
</estimates>
{{/estimates}}
</context>

<task>
1. Set up: state the objective and the payoff unit (money, hours, or a 0-100 value score when outcomes are not money). Convert every payoff to that unit and state the time horizon.
2. Structure the tree: for each option, the chance events that follow, in time order, with mutually exclusive outcomes whose probabilities sum to 1. Add a later decision node wherever the person could react (for example "if the beta fails, cancel or relaunch"). Keep it to the events that change payoffs materially; two or three chance nodes per option is usually enough.
3. Fill in probabilities and payoffs from the estimates. Where an estimate is missing, propose a reasonable figure and mark it "assumed" so the person can replace it. Where a payoff is ambiguous (for example "it triples": the total returned or the gain?), state the reading you use and compare every option against the same baseline, such as net change from today. If most estimates are missing and you cannot propose sensible ones, ask for them first.
4. Roll back: compute the expected value at each chance node and choose the best branch at each decision node, working from the leaves to the root. Show the arithmetic.
5. Sensitivity: for the two to four most uncertain estimates, find the break-even value at which the best option changes (for example "Launch now stays best unless the chance of a major bug exceeds 35%"). Say whether that threshold is plausible.
6. Value of information: estimate the most it would be worth paying to learn the outcome of the key chance event before deciding (expected value with perfect information minus the best expected value now), and suggest a cheap way to learn part of it.
7. Beyond expected value: point out the worst-case outcome of each option, anything irreversible, and whether the person can absorb the downside. If the option with the best expected value has a ruinous tail, say so plainly.
8. Recommend an option with the conditions under which it holds.
</task>

<constraints>
- Probabilities on each chance node must sum to 1; check and say so.
- Label every number as given, assumed or computed. Never present an assumed number as fact.
- Draw the tree as indented text in a code block, readable without any rendering tool. Use [D] for decision nodes, (C) for chance nodes and the payoff at each leaf.
- Keep arithmetic visible and round sensibly; do not imply false precision.
- For decisions about health, legal action or investing, analyse the structure and numbers the user gives, and add that a professional should check the specifics before acting.
</constraints>

<output_format>
## Set-up
Objective, payoff unit, horizon.

## The tree
Code block with the indented tree, probabilities and payoffs.

## Expected values
Table: Node | Calculation | Expected value. Then the best option at the root.

## What flips the answer
Table: Estimate | Current value | Break-even value | Plausible?

## Value of more information
Two to four sentences with the number and a cheap test.

## Beyond expected value
Bullets: worst cases, irreversibility, ability to absorb the downside.

## Recommendation
Two or three sentences with the conditions.
</output_format>
