---
schema: 1
id: write-three-year-strategic-plan
kind: prompt
title: Write a three-year strategic plan
description: Writes a company's three-year strategic plan - where we are, the ambition, a few chosen priorities, what we stop, investments, yearly milestones and measures.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, consultant]
requires: [none]
inputs: [text, document, notes]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [strategic-plan, three-year-plan, strategic-priorities, milestones, board-approval]
pairs_with:
  prompts: [build-annual-operating-plan, prioritize-strategic-initiatives, build-strategy-map, build-strategy-presentation, run-swot-analysis]
  personas: [management-consultant]
args:
  - name: company
    description: The company - what it sells, to whom, size, results for the last two or three years, market trends, competitors, strengths and problems, and any existing strategy or analyses (SWOT, market sizing).
    type: text
    required: true
  - name: ambition
    description: What the owners or board want in three years (revenue, profit, market position, sale-readiness, impact), and constraints such as funding, risk appetite and team capacity.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Starting point, Ambition, Where we will play and how we will win, Strategic priorities, What we will stop, Investment and resources, Milestones by year, Measures, Risks and assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategy adviser writing a three-year plan for a company's leadership or board. Most strategic plans fail by being a list of everything the company hopes to do, with ten "priorities", no trade-offs, targets with no logic behind them, and no link to budgets. A useful plan makes choices: which customers and markets to focus on and how to win there, three to five priorities that follow from that, what the company will stop, what it costs, and milestones each year that show whether it is on track. Ambition must be tested against the starting point: a target that needs growth three times the market rate needs a reason.
</context>

<task>
Write a three-year strategic plan for:

<company>
{{company}}
</company>

<ambition>
{{ambition}}
</ambition>

1. Starting point: a frank summary of performance, position and the two or three issues that most shape the next three years. Use the figures given.
2. Ambition: restate the three-year goal in measurable terms, and sanity-check it against the starting point and market growth. If the ambition looks unrealistic or vague, say so and propose a calibrated version.
3. Where we will play and how we will win: target customers, offers, channels and geographies, and the basis of advantage. State the choices not made.
4. Strategic priorities: three to five, each with the rationale, the main initiatives, the owner role and what success looks like in three years.
5. What we will stop or deprioritise to free capacity and money.
6. Investment and resources: people, capital, technology and partnerships needed, with order-of-magnitude costs where the material allows, and how it is funded.
7. Milestones by year: what must be true at the end of year one, two and three.
8. Measures: a short scorecard (4 to 8 metrics) with baseline and targets per year.
9. Risks and assumptions: the assumptions the plan rests on, the biggest risks, and the review cadence.
</task>

<constraints>
- Use only facts and figures given; do not invent market data, competitor facts or financials. Mark estimates as `assumption`.
- No more than five priorities. Every priority must link to the ambition.
- Targets must come from a stated logic (for example customers times spend), not round numbers.
- If the material is too thin for a real plan, ask for the most important missing facts and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Starting point
Short paragraphs and a table of key figures.

## Ambition
The goal and the sanity check.

## Where we will play and how we will win
Bullets: play, win, not chosen.

## Strategic priorities
One subsection per priority: rationale, initiatives, owner, success.

## What we will stop
Bullets.

## Investment and resources
Table: Need | Year | Cost | Funding.

## Milestones by year
Table: Year | Milestones.

## Measures
Table: Metric | Baseline | Y1 | Y2 | Y3.

## Risks and assumptions
Bullets and review cadence.
</output_format>
