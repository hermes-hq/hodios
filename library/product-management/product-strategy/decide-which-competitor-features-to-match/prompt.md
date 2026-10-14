---
schema: 1
id: decide-which-competitor-features-to-match
kind: prompt
title: Decide which competitor features to match
description: Sorts a competitor feature gap list into match, beat, ignore or reframe using lost-deal evidence, customer jobs, strategy and cost, so the team stops chasing parity lists.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [feature-parity, competitive-gaps, lost-deals, table-stakes, differentiation]
pairs_with:
  prompts: [plan-competitive-response, analyze-competitor-reviews, write-competitive-battlecard, write-product-strategy]
args:
  - name: gap_list
    description: The competitor features you are being asked about, which competitor has each, and who is asking (sales, customers, leadership).
    type: text
    required: true
  - name: evidence
    description: Lost-deal reasons, churn reasons, win/loss notes, support requests or review quotes that mention these features, with counts and deal sizes where you have them.
    type: text
    required: true
  - name: strategy
    description: Your target customers, the jobs you win on, your current product strategy or bets, and rough engineering capacity. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Evidence check, Feature decisions, Match list, Beat bets, Deliberate ignores, Sales guidance, Review triggers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who has watched teams lose a year copying a rival's feature list. Most "we lost because they have X" claims are weak: sales reps cite the missing feature when the real reason was price, relationship or timing, and a feature mentioned in ten lost deals may have decided only one. Expert teams separate four kinds of gap. Table stakes are features buyers use to disqualify you; you must match them, cheaply and well enough, not better. Differentiators sit on the jobs you win on; there you beat the competitor rather than copy them. Some gaps belong to a segment you do not target and should be ignored on purpose. Others are a competitor's answer to a problem you can solve another way (a workflow, an integration, a default) and should be reframed. Matching everything makes the product converge on the competitor's and removes the reason to choose you.

<gap_list>
{{gap_list}}
</gap_list>

<evidence>
{{evidence}}
</evidence>
{{#strategy}}

<strategy>
{{strategy}}
</strategy>
{{/strategy}}
</context>

<task>
1. Evidence check: for each feature, count how often it appears in the evidence, in which segment, at what deal size, and whether it was the deciding reason or one of several. Flag anecdote-only items.
2. Classify each feature as table stakes (disqualifier), differentiator opportunity, out-of-segment, or reframe (the underlying job can be met another way). State the reason in one line.
3. For each, decide: match (minimum viable parity), beat (invest to do it clearly better), ignore (with the segment you accept losing), or reframe (describe the alternative).
4. Estimate relative cost (S, M, L) only from what is given; mark unknown cost as a question for engineering.
5. Match list: order by deals affected per unit of cost, with the minimum version that removes the objection.
6. Beat bets: at most two, tied to jobs in the strategy, with how you would know you are winning.
7. Deliberate ignores: what to tell sales and customers, and the evidence that would change the decision.
8. Sales guidance: how to handle each gap in a deal before anything ships, without promising dates.
</task>

<constraints>
- Do not treat a feature request count as proof of lost revenue; say when evidence shows correlation, not cause.
- Do not invent competitor capabilities, deal values or engineering estimates; list unknowns as questions.
- Recommend at most two beat bets; a list where everything is a priority is a failure.
- Every ignore must name who is affected and the trigger for revisiting it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Evidence check
| Feature | Mentions | Segment | Deal size | Deciding reason? | Strength |
## Feature decisions
| Feature | Type | Decision | Cost | Reason |
## Match list
## Beat bets
## Deliberate ignores
## Sales guidance
## Review triggers
</output_format>
