---
schema: 1
id: screen-acquisition-targets
kind: prompt
title: Screen acquisition targets
description: Screens a list of companies to acquire against strategic fit, size, financial and integration criteria, producing a ranked shortlist and notes on how to approach each.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover]
role: [executive, founder, financial-analyst, consultant]
advice_risk: [financial]
requires: [none]
inputs: [dataset, text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [m-and-a, target-screening, acquisition-criteria, buy-and-build, deal-pipeline]
pairs_with:
  prompts: [evaluate-buying-a-business, plan-acquisition-integration, analyze-competitor-financials, map-growth-options]
args:
  - name: rationale
    description: Why you want to acquire (new region, product, capability, customers, scale), your company's size and finances, budget or financing capacity, and any must-haves or deal-breakers.
    type: text
    required: true
  - name: targets
    description: The candidate companies with what you know about each - business, location, size, revenue or profit if public, ownership, reputation, any contact so far.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Acquisition thesis, Screening criteria, Scorecard, Shortlist, Approach notes, Information to gather]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a company screen acquisition targets. Most acquisitions that disappoint fail on the thesis, not the price: the buyer did not know what the deal was meant to achieve, so it bought what was for sale rather than what fitted. Screening starts with a clear thesis and explicit criteria (must-haves, weighted nice-to-haves, deal-breakers), scores each target consistently, and separates what is known from what must be found out. Integration difficulty (culture, systems, location, owner dependence) and the owners' likely willingness to sell matter as much as financials. A shortlist of three to five well-understood targets beats a long list of names.
</context>

<task>
Screen these targets:

<rationale>
{{rationale}}
</rationale>

<targets>
{{targets}}
</targets>

{{> guardrails/professional-limits}}

1. Write the acquisition thesis in three sentences: what the deal must achieve, why buying beats building or partnering, and how value will be created.
2. Set screening criteria: must-haves (pass or fail), weighted criteria (strategic fit, size within budget, profitability and quality of earnings signals, customer overlap or complement, integration ease, owner dependence, willingness to sell), and deal-breakers. Show the weights.
3. Score each target against the criteria using only the information given. Mark each score with its evidence or as unknown; unknowns score neutral and are flagged, not guessed.
4. Rank the targets and pick a shortlist of three to five with the reasons, and say why the others are out or on hold.
5. Approach notes for the shortlist: who to contact, the angle that fits the owner's likely motives (succession, growth capital, partial exit), and what not to reveal early.
6. Information to gather before any offer: the key questions and the order to resolve them, and the point to bring in advisers (corporate finance, legal, tax, due diligence).
</task>

<constraints>
- Do not invent revenues, profits, owners or valuations. Never give a price or valuation as fact; at most explain how valuation will be approached, for advisers to confirm.
- Approaches must be honest and respect confidentiality; do not suggest misleading targets about intentions or using a target's confidential information obtained improperly.
- Flag where competition or foreign investment approval might be needed so the user asks advisers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Acquisition thesis
Three sentences.

## Screening criteria
Table: Criterion | Type (must-have, weighted, deal-breaker) | Weight.

## Scorecard
Table: Target | each criterion score with evidence or unknown | Total.

## Shortlist
Ranked list with reasons; then out or on hold.

## Approach notes
One block per shortlisted target.

## Information to gather
Numbered questions and when to involve advisers.
</output_format>
