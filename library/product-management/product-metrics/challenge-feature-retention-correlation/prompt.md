---
schema: 1
id: challenge-feature-retention-correlation
kind: prompt
title: Challenge a feature-retention claim
description: Tests a claim like "users who use feature X retain twice as well" for selection, reverse causation, tenure and survivorship, and says what analysis or experiment would show whether X causes retention.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review]
role: [product-manager, data-analyst, executive, founder]
subject: [statistics]
requires: [none]
inputs: [text, dataset, document]
output: [explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [correlation-vs-causation, selection-bias, retention-claims, confounding, power-users, decision-quality]
pairs_with:
  prompts: [define-activation-metric, design-ab-test, design-holdout-experiment, estimate-feature-impact]
args:
  - name: claim
    description: The claim as stated, where it came from, and the decision it is being used for (for example "push every new user into feature X").
    type: text
    required: true
  - name: evidence
    description: The numbers behind it - how users and retention were defined, time windows, group sizes, and any breakdowns by plan, tenure or engagement.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the claim says and does not say, Alternative explanations, Quick checks with existing data, A test that would settle it, What to tell the decision maker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check one of the most common and costly claims in product analytics: "users who do X retain much better, so let's get everyone to do X." Usually X is a marker of engaged users rather than a cause of engagement. The usual traps: selection (motivated or high-intent users find X), reverse causation (users who stay longer have more time to discover X), tenure and survivorship (users counted as X-users only if they stayed long enough to use it), mechanical overlap (X requires being active, so retention is partly built into the definition), confounding by plan or company size, and the denominator (comparing X users to everyone, including those who never had a chance). Pushing everyone into X may then cost effort and annoy users without moving retention at all.
</context>

<task>
<claim>
{{claim}}
</claim>

<evidence>
{{evidence}}
</evidence>

1. What the claim says and does not say: restate it precisely in terms of the definitions given, and separate the observed association from the causal claim the decision assumes.
2. Alternative explanations: for each trap above that could apply, explain how it could produce the gap with these definitions, and how large its effect might be. Rank them.
3. Quick checks with existing data: specific re-cuts, such as defining X-use within the first N days and measuring retention after that window only, comparing users matched on early activity, plan and acquisition channel, and checking whether users who adopted X later saw retention change after adoption.
4. A test that would settle it: a randomised nudge into X (encouragement design) or a holdout, with the metric, unit, rough size and what result would support or reject the claim. Note that the effect of a nudge is diluted by those who would not adopt.
5. What to tell the decision maker: a short, plain message on how much weight the claim can bear now and what it would take to act on it.
</task>

<constraints>
- Do not declare the claim false either; say what the evidence can and cannot support.
- Do not invent numbers; when estimating how much a bias could explain, show the reasoning and label it.
- If the definitions of X-users or retention are missing, ask for them, because most of the analysis depends on them.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the claim says and does not say
Two short paragraphs.

## Alternative explanations
Ranked table: explanation | how it creates the gap here | likely size.

## Quick checks with existing data
Numbered checks with the expected pattern if the claim is causal versus not.

## A test that would settle it
Design and decision rule.

## What to tell the decision maker
Three to five sentences, ready to forward.
</output_format>
