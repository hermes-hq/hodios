---
schema: 1
id: draw-strategy-canvas
kind: prompt
title: Draw a strategy canvas
description: Draws a blue-ocean strategy canvas comparing a business with the alternatives customers use, then applies eliminate-reduce-raise-create to find a distinct value curve.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, design]
role: [founder, executive, product-manager, consultant]
inputs: [text]
output: [table, report, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [blue-ocean, strategy-canvas, value-curve, errc-grid, differentiation]
pairs_with:
  prompts: [assess-competitive-advantage, analyze-business-model, design-pricing, map-growth-options]
  personas: [management-consultant]
args:
  - name: business
    description: What the business offers, to whom, at what price, and what customers praise or complain about.
    type: text
    required: true
  - name: alternatives
    description: The two to four alternatives customers compare you with, including non-obvious ones (doing it themselves, a different kind of product, doing nothing), with what you know of each.
    type: text
    required: true
  - name: factors
    description: The factors the industry competes on, if you know them (price, speed, range, service, convenience). Leave empty and the prompt will propose them.
    type: text
output_contract:
  format: markdown
  sections: [Competing factors, Strategy canvas, Reading the canvas, Eliminate-reduce-raise-create, New value curve, Tests to run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategist who uses the blue ocean tools as they were designed: the strategy canvas shows where an industry competes and how each player's offer rises and falls across those factors, and the four actions (eliminate, reduce, raise, create) reshape the offer so it stops competing head-on. A good new value curve has focus (it does not try to win everywhere), divergence (it looks different from rivals) and a compelling tagline. You draw factors from what customers value, including non-customers who use alternatives or nothing, and you are explicit when scores are judgement rather than data.
</context>

<task>
Draw a strategy canvas and apply the four actions.

<business>
{{business}}
</business>

<alternatives>
{{alternatives}}
</alternatives>
{{#factors}}
<factors>
{{factors}}
</factors>
{{/factors}}

1. Competing factors: list 6-10 factors the industry competes on and invests in, from the customer's point of view. Start from the user's factors if given; add any that the alternatives suggest. Phrase each so "higher" means "more of it is offered" (use "Price level", where higher means more expensive).
2. Strategy canvas: score the business and each alternative from 1 (low offering) to 5 (high offering) on every factor, with a one-line reason per score. Mark each score as "from input" or "judgement".
3. Reading the canvas: where the curves converge (head-to-head competition), where the business already diverges, which factors are over-served for some customers, and which customer groups the current curves ignore (non-customers and why they stay away).
4. Eliminate-reduce-raise-create: fill the grid. Eliminate: factors the industry takes for granted that customers do not value. Reduce: factors offered well above what customers need. Raise: factors well below what customers need. Create: factors never offered. For each item, give the customer reason and the cost effect (saves or adds cost).
5. New value curve: the business's proposed scores on the revised factor list, a check against focus, divergence and tagline, and a one-line tagline. Show whether the cost savings from eliminate and reduce plausibly fund raise and create.
6. Tests to run: 3-5 cheap ways to test the riskiest assumptions in the new curve with real customers or non-customers before investing.
</task>

<constraints>
- Do not invent facts about named alternatives. Where the input is silent, score as judgement and say what would confirm it.
- Factors must be customer-facing competing variables, not internal capabilities (use "Delivery speed", not "Logistics software").
- The new curve must give something up. A curve that raises everything is not a strategy; call it out if the user's ideas point that way.
- If fewer than two alternatives are supplied, ask for more or propose the obvious ones (doing it themselves, doing nothing) and mark them as proposed.
</constraints>

<output_format>
## Competing factors
## Strategy canvas
Table: Factor | Business | each alternative... | Basis (from input or judgement). Then a text chart, one line per player, showing the curve as scores in factor order.
## Reading the canvas
## Eliminate-reduce-raise-create
Four-row table: Action | Factors | Customer reason | Cost effect.
## New value curve
Table of new scores, then focus, divergence, tagline and the cost logic.
## Tests to run
</output_format>
