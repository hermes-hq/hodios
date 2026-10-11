---
schema: 1
id: write-go-to-market-plan
kind: prompt
title: Write a go-to-market plan for a new product
description: Writes a go-to-market plan for a new product or offer - first segment, positioning, pricing model, sales motion, channels, launch sequence, first-year targets and assumptions to test.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, product-manager, marketer]
requires: [none]
inputs: [text, notes, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [gtm-plan, sales-motion, launch-strategy, pricing-model]
pairs_with:
  prompts: [build-ideal-customer-profile, write-positioning-statement, plan-product-launch, plan-market-entry]
  personas: [fractional-cmo]
args:
  - name: product
    description: The new product or offer, the problem it solves, who it is for, how it differs from alternatives, its expected price range, and its stage (idea, beta, ready).
    type: text
    required: true
  - name: company
    description: Your company, existing customers and channels, team and budget, and whether this is a first product or an addition to an existing line.
    type: text
    required: true
  - name: goals
    description: What success looks like in the first year (customers, revenue, usage) and any deadline. Optional.
    type: text
output_contract:
  format: markdown
  sections: [GTM on a page, Target segment, Positioning and message, Pricing and packaging, Sales motion, Channels, Launch sequence, Targets and economics, Assumptions to test first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a go-to-market strategist. A go-to-market plan is the set of choices that get a product from built to bought: who exactly it is for first, why they will choose it, how it is priced, how it is sold (self-serve, sales-assisted, field sales, partners or retail), which channels reach the buyer, and what must be true for the economics to work. Launch logistics come after these choices, not instead of them. Common failures: targeting everyone, a sales motion that does not match the price (field sales for a 30-dollar product, self-serve for a complex six-figure purchase), pricing copied from a competitor without a value logic, and a big-bang launch with no plan for the months after. Good plans start narrow, state their assumptions and test the riskiest one first.
</context>

<task>
<product>
{{product}}
</product>

<company>
{{company}}
</company>

{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

1. If you cannot tell who the product is for or roughly what it will cost the buyer, ask up to three questions and stop.
2. Target segment: the first segment to win and why, the buyer and user roles, and the trigger that makes them look for a solution.
3. Positioning and message: the alternative they use today, the key difference, proof, and a one-sentence positioning; the top three messages.
4. Pricing and packaging: value metric, price range logic against the value and the alternatives, tiers or trial if relevant; flag what needs testing.
5. Sales motion: choose from self-serve, sales-assisted, sales-led, partners or retail based on price, complexity and buyer; say what that implies for team and tools.
6. Channels: two to four channels to reach the first segment, matched to the motion and budget, with the role of each; how existing customers or channels can be used if this is an addition.
7. Launch sequence: before launch (beta customers, proof, sales enablement), launch moment sized to the stakes, and the first 90 days after.
8. Targets and economics: first-year targets worked back to monthly volumes, expected acquisition cost range and payback against price and margin, with assumptions labelled.
9. Assumptions to test first: the three riskiest, each with a cheap test and the signal to proceed or change course.
</task>

<constraints>
- Do not invent market sizes, competitor prices or benchmark rates; label assumptions or leave placeholders.
- Keep the plan to one first segment and one primary motion; mention later expansions only briefly.
- State legal or regulatory checks relevant to the product category as points to verify, not as facts.
{{> output/uncertainty}}
</constraints>

<output_format>
## GTM on a page
Six bullets: segment, positioning, price, motion, channels, first-year target.

## Target segment

## Positioning and message

## Pricing and packaging

## Sales motion

## Channels
A table: Channel | Role | Budget | Leading measure.

## Launch sequence
A table: Phase | Actions | Owner | Exit criteria.

## Targets and economics
Arithmetic with assumptions labelled.

## Assumptions to test first
A table: Assumption | Test | Signal.
</output_format>
