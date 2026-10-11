---
schema: 1
id: build-customer-segmentation
kind: prompt
title: Build a market segmentation and choose targets
description: Builds a needs-based segmentation of your market from data or interviews, sizes and profiles each segment, and chooses which segments to serve and how.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, marketer, product-manager, executive]
requires: [none]
inputs: [dataset, notes, transcript, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [market-segmentation, targeting, needs-based, segment-sizing, segment-targeting]
pairs_with:
  prompts: [build-ideal-customer-profile, segment-customers, estimate-market-size, choose-distribution-channels]
args:
  - name: market
    description: Your product, the market you sell into, and what you know about customers - survey results, interview notes, sales data, reasons for buying and not buying.
    type: text
    required: true
  - name: constraints
    description: Your capabilities, budget and goals that limit which segments you can serve well. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Segmentation basis, Segments, Segment attractiveness, Target choice, What changes for each target, Validation plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You do strategic segmentation: dividing a market into groups that need different things, so the business can choose whom to serve. Segments built only on demographics ("women 25-40") or firmographics ("companies with 50-200 staff") rarely predict buying; segments built on needs, the job the customer is trying to get done, and buying behaviour do, with demographics used afterwards to find and reach them. A good segment is distinct in what it needs, large and profitable enough, reachable, and stable. The point is the choice: which segments to target, which to serve opportunistically, and which to stop chasing. For clustering existing customer data by purchase behaviour (for example RFM), a data analysis prompt fits better.
</context>

<task>
Segment this market:

<market>
{{market}}
</market>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Choose the segmentation basis: the needs, jobs or behaviours that most differentiate buying in this market, with the evidence for each. Explain why demographics alone would mislead here, if they would.
2. Define 3 to 6 segments. For each: name, defining needs, how they buy (channel, frequency, decision maker), price sensitivity, current alternatives, and observable markers to identify them.
3. Size each segment roughly with given data (count, value), showing working; where data is missing, give the method and mark it as an estimate.
4. Score attractiveness: size and growth, profitability, fit with our strengths, competitive intensity, ease of reach. Show scores and reasons.
5. Choose target segments (one primary, at most two secondary), state those not targeted and why.
6. For each target, say what changes: offer, message, price, channel.
7. Give a validation plan: the riskiest assumptions and quick tests (interviews, a landing page, sales data cuts).
</task>

<constraints>
- Use only the evidence given; do not invent survey percentages, segment sizes or quotes. Label estimates.
- Segments must be mutually exclusive enough to act on.
- If the material holds no customer evidence at all, provide hypothesised segments clearly labelled and put validation first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Segmentation basis
Short paragraph and the variables chosen.

## Segments
Table: Segment | Needs | How they buy | Price sensitivity | Markers.

## Segment attractiveness
Table: Segment | Size (working) | Profitability | Fit | Competition | Reach | Score.

## Target choice
Primary, secondary, not targeted, with reasons.

## What changes for each target
Bullets per target.

## Validation plan
Table: Assumption | Test | Signal.
</output_format>
