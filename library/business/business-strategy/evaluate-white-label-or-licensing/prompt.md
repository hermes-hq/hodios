---
schema: 1
id: evaluate-white-label-or-licensing
kind: prompt
title: Evaluate white-labelling or licensing your product
description: Evaluates a white-label or licensing deal for your product, brand or IP - deal models, how to price it, risks to your brand and the key terms to agree.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive]
advice_risk: [legal]
requires: [none]
inputs: [text, document]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [white-label, licensing-deal, private-label, royalties, ip-commercialisation]
pairs_with:
  prompts: [choose-distribution-channels, evaluate-joint-venture, design-revenue-model]
args:
  - name: business
    description: What you make or own (product, software, recipe, brand, content, process), your costs and current sales, and your goals (reach, cash, focus).
    type: text
    required: true
  - name: proposal
    description: The proposal or idea - who the partner is, what they want to do (sell your product under their brand, use your brand on their products, use your software or method), and any terms offered so far.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is being proposed, Deal models compared, Economics, Strategic fit and risks, Key terms, Recommendation, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business decide whether to let another company sell its product under their own name (white label or private label) or use its brand, technology or know-how for a fee (licensing). These deals can bring volume and cash with little selling cost, but they often go wrong in predictable ways: the partner becomes a competitor using your product against you, cheap private-label versions cannibalise your own brand, one partner becomes too large a share of revenue, royalty reporting is unverifiable, quality failures damage your name, or the IP terms quietly let the partner keep improvements. A good evaluation compares deal models, models the economics including cannibalisation, and lists the terms that protect the business.
</context>

<task>
Evaluate this proposal:

<business>
{{business}}
</business>

<proposal>
{{proposal}}
</proposal>

{{> guardrails/professional-limits}}

1. Restate the proposal clearly: what rights or products are given, to whom, where, for how long, and what you receive.
2. Compare the relevant deal models: white label or private label supply (you make, they brand), brand licence (they make, use your brand, pay royalty), technology or IP licence (fee or royalty for use), and a reseller or OEM arrangement. For each: control, effort, revenue shape, risk.
3. Model the economics: expected volume, price per unit or royalty rate, your costs, contribution, minimum guarantees, and the cannibalisation of your own sales. Show arithmetic with given figures; mark assumptions.
4. Assess strategic fit and risks: competition with your own brand, dependency on one partner, quality and reputational exposure, loss of know-how, effect on existing distributors, exit difficulty.
5. List the key terms to negotiate: scope (products, territory, channels, field of use), exclusivity and its conditions, term and renewal, pricing or royalty and minimums, audit rights and reporting, quality control and approval, brand use guidelines, IP ownership of improvements, non-compete and non-solicit, termination and what happens to stock and customers.
6. Recommend: proceed, proceed with conditions, or decline, and the walk-away points.
7. List questions to take to a lawyer and an accountant.
</task>

<constraints>
- Do not draft the contract or state what a clause legally means in a jurisdiction; list the points for a lawyer.
- Use only figures given; never invent royalty rates as market standard. Label any range as an assumption that varies by sector.
- Warn against giving exclusivity without minimum performance commitments.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is being proposed
Short paragraph.

## Deal models compared
Table: Model | What they get | What we get | Control | Risk.

## Economics
Table with working, including cannibalisation.

## Strategic fit and risks
Bullets rated high, medium or low.

## Key terms
Checklist with our preferred position on each.

## Recommendation
Decision, conditions, walk-away points.

## Questions for a lawyer
Bullets, plus questions for an accountant.
</output_format>
