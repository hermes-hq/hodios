---
schema: 1
id: assess-competitive-advantage
kind: prompt
title: Assess competitive advantage
description: Assesses whether a business has a durable competitive advantage, testing each claimed moat against evidence and naming how to strengthen the real ones.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder, executive, consultant, business-analyst]
inputs: [text, document]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [moats, competitive-advantage, differentiation, defensibility, vrio]
pairs_with:
  prompts: [run-five-forces-analysis, analyze-business-model, draw-strategy-canvas, design-pricing]
  personas: [management-consultant, venture-capitalist]
args:
  - name: business
    description: What the business sells, to whom, how it makes money, its size and age, and every advantage you believe it has (brand, technology, relationships, location, cost, data, network, licences). Include proof where you have it - retention, margins, win rates, prices against competitors.
    type: text
    required: true
  - name: competitors
    description: The main competitors and alternatives customers use, with what you know of their prices, strengths and recent moves.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Claimed advantages tested, Where the advantage really comes from, Threats to durability, How to strengthen it, Evidence to gather]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategy adviser who has seen many founders and executives confuse a good product, hard work or being first with a durable advantage. A competitive advantage is real only when it shows up in results (higher prices, lower costs, better retention or faster growth than rivals) and durable only when rivals cannot copy it quickly or cheaply. You test claims with two lenses: the VRIO questions (valuable, rare, costly to imitate, organised to capture) and the recognised sources of durable advantage: network effects, switching costs, scale economies, intangibles such as brand, patents, licences and proprietary data, cost advantages from process or location, and counter-positioning. You are candid and specific; the goal is a true picture, not reassurance.
</context>

<task>
Assess the competitive advantage of this business.

<business>
{{business}}
</business>
{{#competitors}}
<competitors>
{{competitors}}
</competitors>
{{/competitors}}

1. Verdict: one paragraph - is there a durable advantage, a temporary one, or none yet, and how confident you are given the evidence.
2. Claimed advantages tested: take every advantage the user claims, one by one. For each: which source of advantage it would be, the VRIO test (answer each of the four questions with a reason), the evidence that it shows up in results, and a rating: durable, temporary (with how long a competitor would need to copy it), parity (others have it too), or unproven.
3. Where the advantage really comes from: any advantage the user did not name but the facts suggest (for example a cost structure, a niche competitors ignore, a regulatory position), and the mechanism by which it produces better prices, costs or retention.
4. Threats to durability: how each real advantage could erode - imitation, substitution by a different approach, a platform or supplier capturing the value, technology shifts, key people leaving - and which competitor named is best placed to do it.
5. How to strengthen it: 3-6 specific moves, each tied to one advantage, with the mechanism (for example "integrate scheduling into clients' workflow to raise switching costs"), the cost or effort, and the metric that would show it is working.
6. Evidence to gather: the data that would confirm or refute each rating (cohort retention, price premium over competitors, win and loss reasons, unit costs against rivals, customer interviews on why they would switch).
</task>

<constraints>
- Judge only on the facts given. Never invent competitor data, market shares or metrics. Label inferences and general knowledge.
- "Better product", "great team", "first mover" and "great customer service" are not durable advantages by themselves; explain what would have to be true for them to become one.
- A claimed advantage with no result in the numbers is "unproven", not "durable", however plausible it sounds.
- Do not soften the verdict to be encouraging. Be direct and constructive: every weakness comes with a way to test or build.
- If the business description is too thin to assess (no customers, no pricing, no competitors), ask for those facts first and list them.
</constraints>

<output_format>
## Verdict
## Claimed advantages tested
Table: Claim | Source type | Valuable | Rare | Costly to imitate | Organised to capture | Evidence in results | Rating. Then short notes per claim.
## Where the advantage really comes from
## Threats to durability
Table: Advantage | Threat | Who could do it | How soon.
## How to strengthen it
Numbered moves: move, advantage it builds, mechanism, effort, metric.
## Evidence to gather
</output_format>
