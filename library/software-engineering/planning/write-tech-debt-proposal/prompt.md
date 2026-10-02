---
schema: 1
id: write-tech-debt-proposal
kind: prompt
title: Write a tech debt proposal
description: Turns a piece of technical debt into a business case with evidence, cost of delay, options, the smallest valuable paydown and success measures. Use when you need product or leadership buy-in.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead, engineering-manager]
requires: [none]
inputs: [notes, text, document]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tech-debt, business-case, cost-of-delay, refactoring-budget, stakeholder-buy-in]
pairs_with:
  personas: [staff-engineer]
  prompts: [explain-tech-to-executives, plan-large-refactor, compare-design-options]
args:
  - name: debt
    description: The debt in plain words, where it lives and how it got there, for example "orders module has no tests and three copies of the pricing logic".
    type: text
    required: true
  - name: evidence
    description: Concrete evidence of its cost, such as incidents, bug counts, lead times, on-call pages, estimates that slipped, support tickets or developer survey results.
    type: text
    required: true
  - name: audience
    description: Who must say yes. product weighs roadmap trade-offs, leadership weighs risk and money, team weighs effort and sequencing.
    type: enum
    enum: [product, leadership, team]
    default: product
  - name: capacity
    description: Capacity you could realistically ask for, for example "one engineer for a sprint" or "20% of the team for a quarter".
    type: string
output_contract:
  format: markdown
  sections: [The ask, Problem, Evidence, Cost of delay, Options, Recommended first step, How we will measure success, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tech debt proposals usually fail for the same reasons: they describe the code instead of the consequences, ask for a big rewrite with no end date, rely on adjectives ("fragile", "a mess") instead of numbers, and leave the decision-maker unable to compare the request with feature work. A proposal that wins treats debt like any other investment: what it costs us now, what it will cost if we wait, the smallest piece of work that pays back first, and how everyone will know it worked.
</context>

<task>
Write a proposal to pay down this debt, aimed at a {{audience}} audience.

<debt>
{{debt}}
</debt>

<evidence>
{{evidence}}
</evidence>

{{#capacity}}
Capacity available to ask for: {{capacity}}
{{/capacity}}

1. Translate the debt into consequences the audience already cares about: slower delivery of named roadmap items, incidents and their customer impact, security or compliance exposure, on-call load and attrition risk, or infrastructure cost. Keep only consequences the evidence supports.
2. Quantify with the evidence given. Show the arithmetic (for example "6 incidents in 2 quarters × about 4 engineer-hours each"). Where a number is an estimate, say so and give a range. If the evidence is too thin to make the case, say what to measure first and how, and draft the proposal with clearly marked placeholders.
3. Explain the cost of delay: what gets worse each month the debt stays (a growing workaround, an end-of-life date, a hiring plan that doubles the people touching this code) and any deadline that makes now cheaper than later.
4. Give two to four options, always including "do nothing" and an incremental option. For each: scope, effort as a range, what it unlocks, risk and reversibility.
5. Recommend the smallest valuable paydown: a first slice that fits the available capacity, delivers a measurable benefit on its own and can stop cleanly. Prefer tying it to an upcoming feature that touches the same code over a standalone project.
6. Define success measures with a baseline, a target and a review date, using measures the audience trusts (lead time for changes in this area, change failure rate, incident count, time to onboard, cloud cost).
7. Tune for the audience: product wants the roadmap trade-off and the date impact; leadership wants risk, money and a one-paragraph decision; the team wants scope, sequencing, ownership and how the work coexists with feature work.
</task>

<constraints>
- Do not invent incidents, metrics, costs or quotes. Every figure comes from the evidence, is shown as arithmetic on it, or is marked as an estimate or placeholder.
- No jargon the audience would not use. Explain any technical term in a few words the first time.
- Do not ask for an open-ended rewrite. Every option has a defined end and a way to stop early.
- Keep the whole proposal readable in five minutes: about 600 words, plus tables.
{{> output/uncertainty}}
</constraints>

<output_format>
## The ask
Two or three sentences: what you want approved, how much capacity, for how long, and the decision date.
## Problem
The consequences in the audience's terms.
## Evidence
Bullets, each with its source.
## Cost of delay
## Options
Table: option, scope, effort range, benefit, risk, reversible.
## Recommended first step
What, who, how long, what it unlocks, and the stop point.
## How we will measure success
Table: measure, baseline, target, review date.
## Risks and open questions
Numbered.
</output_format>
