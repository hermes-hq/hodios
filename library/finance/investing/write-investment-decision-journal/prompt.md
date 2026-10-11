---
schema: 1
id: write-investment-decision-journal
kind: prompt
title: Write an investment decision journal entry
description: Writes a journal entry before an investment decision - reason, evidence, what would prove it wrong, exit rule, mood - and reviews past entries for biases and process rather than outcome.
category: investing
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [report, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [decision-journal, behavioural-finance, investor-biases, pre-mortem]
pairs_with:
  prompts: [write-investment-policy-statement, evaluate-stock-tip, make-sense-of-market-drop, calculate-investment-returns]
  personas: [investing-educator]
args:
  - name: mode
    description: Write a new entry before a decision, or review past entries after the fact.
    type: enum
    enum: [new-entry, review]
    default: new-entry
  - name: material
    description: For a new entry, the decision you are considering and why. For a review, your past entries and what happened.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Entry or review, Bias check, Process verdict, What to do differently]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Investors remember their reasons selectively: after a gain they recall being confident, after a loss they recall doubts. A decision journal written **before** acting fixes the reasoning in time, so it can be judged on process rather than luck. A good entry records the decision and amount, the thesis in one or two sentences, the evidence and its source, what the investor expects and over what period, what would show the thesis is wrong, the exit or review rule, how this fits the investment policy or target mix, the alternatives considered, and their emotional state (excited, fearful, rushed, influenced by social media or a friend). Reviews look for recurring biases: recency, overconfidence, confirmation, herding and fear of missing out, loss aversion and the disposition effect (selling winners too early, holding losers), anchoring on purchase price. Good decisions can lose money and bad ones can make money; the review judges the process.

Mode: {{mode}}

<material>
{{material}}
</material>
</context>

<task>
1. Entry or review:
   - For new-entry: write the journal entry under the headings above, using their words, and fill gaps with direct questions instead of assumptions. Add a pre-mortem: "it is a year later and this went badly; the three most likely reasons are...".
   - For review: for each past entry, compare the thesis and expected outcome with what happened, and whether the exit or review rule was followed.
2. Bias check: name any biases visible in the wording or pattern, quoting the phrase that suggests each, with one question that tests it.
3. Process verdict: for a new entry, whether the decision is well-specified (clear thesis, evidence, falsifier, exit rule, fit with plan, sized sensibly); for a review, separate good process from good outcome in a two-by-two (good or bad process, good or bad outcome).
4. What to do differently: two or three changes to their process.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not judge whether the investment itself is good, or recommend buying, selling or holding.
- Do not add evidence or facts about the asset from memory; work only with what they wrote.
- Name biases gently and as possibilities, not diagnoses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Entry or review
The journal entry (headed fields) or the review table: entry | thesis | what happened | rule followed?

## Bias check
Table: possible bias | phrase | test question.

## Process verdict
Short checklist or two-by-two table.

## What to do differently
Two or three bullets.
</output_format>
